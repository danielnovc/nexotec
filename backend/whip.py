import torch
import numpy as np
import soundfile as sf
from pydub import AudioSegment
import io
import tempfile
import os
import librosa
from transformers import pipeline
from logger import setup_logger
from pyannote.audio import Pipeline, Model
from pyannote.audio.pipelines import VoiceActivityDetection, OverlappedSpeechDetection
import torchaudio

# Configure logging
logger = setup_logger()

logger.info("="*50)
logger.info("CUDA Information:")
logger.info(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    logger.info(f"CUDA version: {torch.version.cuda}")
    logger.info(f"Number of GPUs: {torch.cuda.device_count()}")
    for i in range(torch.cuda.device_count()):
        logger.info(f"GPU {i}: {torch.cuda.get_device_name(i)}")
    logger.info(f"Current GPU: {torch.cuda.current_device()}")
    logger.info(f"GPU memory allocated: {torch.cuda.memory_allocated(0) / 1024**2:.2f} MB")
    logger.info(f"GPU memory cached: {torch.cuda.memory_reserved(0) / 1024**2:.2f} MB")
logger.info("="*50)

# Set device
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
if torch.cuda.is_available():
    torch.backends.cudnn.benchmark = True
    torch.backends.cudnn.deterministic = False
    torch.cuda.empty_cache()
    logger.info("CUDA configured successfully")
else:
    logger.warning("CUDA is not available. Using CPU instead.")

# Global variables for models
whisper_pipeline = None
diarization_pipeline = None
vad_pipeline = None
osd_pipeline = None

def initialize_models(hf_token: str):
    global whisper_pipeline, diarization_pipeline, vad_pipeline, osd_pipeline
    try:
        logger.info("Initializing Whisper pipeline...")
        torch.cuda.empty_cache()
        
        # Initialize Whisper with chunking support for long-form transcription
        whisper_pipeline = pipeline(
            "automatic-speech-recognition",
            model="openai/whisper-medium",
            chunk_length_s=30,  # Process in 30-second chunks
            stride_length_s=(5, 5),  # 5-second overlap on both sides
            device=device,
            return_timestamps=True,
            generate_kwargs={"task": "transcribe", "language": None}
        )
        logger.info("Whisper pipeline initialized successfully")
        
        # Initialize Pyannote segmentation model
        segmentation_model = Model.from_pretrained(
            "pyannote/segmentation-3.0",
            use_auth_token=hf_token
        ).to(device)
        
        # Initialize VAD pipeline
        vad_pipeline = VoiceActivityDetection(segmentation=segmentation_model)
        vad_pipeline.instantiate({
            "min_duration_on": 0.0,
            "min_duration_off": 0.0
        })
        
        # Initialize OSD pipeline
        osd_pipeline = OverlappedSpeechDetection(segmentation=segmentation_model)
        osd_pipeline.instantiate({
            "min_duration_on": 0.0,
            "min_duration_off": 0.0
        })
        
        # Initialize diarization pipeline
        diarization_pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token=hf_token
        ).to(device)
        
        logger.info("All pipelines initialized successfully")
        if torch.cuda.is_available():
            logger.info(f"GPU Memory allocated: {torch.cuda.memory_allocated(0) / 1024**2:.2f} MB")
            logger.info(f"Cached: {torch.cuda.memory_reserved(0) / 1024**2:.2f} MB")
        
    except Exception as e:
        logger.error(f"Error initializing models: {str(e)}", exc_info=True)
        raise

def convert_to_wav(audio_data: bytes, file_extension: str) -> tuple:
    try:
        with tempfile.NamedTemporaryFile(suffix=f'.{file_extension}', delete=False) as temp_file:
            temp_file.write(audio_data)
            temp_path = temp_file.name
        audio = AudioSegment.from_file(temp_path)
        wav_path = temp_path + '.wav'
        audio.export(wav_path, format='wav')
        audio_array, sample_rate = librosa.load(wav_path, sr=None)
        logger.info(f"Original audio shape: {audio_array.shape}, sample rate: {sample_rate}")
        if sample_rate != 16000:
            logger.info(f"Resampling audio from {sample_rate}Hz to 16000Hz")
            audio_array = librosa.resample(audio_array, orig_sr=sample_rate, target_sr=16000)
            sample_rate = 16000
            logger.info(f"Resampled audio shape: {audio_array.shape}, sample rate: {sample_rate}")
        os.unlink(temp_path)
        os.unlink(wav_path)
        return audio_array, sample_rate
    except Exception as e:
        logger.error(f"Error converting audio: {str(e)}", exc_info=True)
        raise

def transcribe_audio(audio_data: np.ndarray, sample_rate: int, take_notes: bool = False) -> dict:
    try:
        if len(audio_data.shape) > 1:
            audio_data = audio_data.mean(axis=1)
        
        # Calculate total duration
        total_duration = len(audio_data) / sample_rate
        logger.info(f"Starting transcription of {total_duration:.2f} seconds audio...")
        
        # First, transcribe with Whisper
        logger.info("Running Whisper transcription...")
        
        # Convert audio to the format expected by Whisper
        audio_dict = {
            "array": audio_data,
            "sampling_rate": sample_rate
        }
        
        # Process audio with the pipeline using chunking and stride
        result = whisper_pipeline(
            audio_dict,
            batch_size=8,  # Process 8 chunks at a time
            return_timestamps=True,
            generate_kwargs={"task": "transcribe", "language": None}
        )
        
        logger.info("Whisper transcription completed")
        
        # If take_notes is True, skip speaker diarization and return simple transcription
        if take_notes:
            processed_chunks = []
            full_text = ""
            
            # Handle both chunked and non-chunked results
            if isinstance(result, dict) and "chunks" in result:
                chunks = result["chunks"]
            else:
                chunks = [{"text": result["text"], "timestamp": [0.0, total_duration]}]
            
            for chunk in chunks:
                text = chunk["text"].strip()
                if not text:  # Skip empty chunks
                    continue
                    
                # Get timestamps, defaulting to None if not present
                start_time = chunk.get("timestamp", [None, None])[0]
                end_time = chunk.get("timestamp", [None, None])[1]
                
                processed_chunks.append({
                    "text": text,
                    "start": start_time,
                    "end": end_time
                })
                
                full_text += text + " "
            
            return {
                "chunks": processed_chunks,
                "full_text": full_text.strip()
            }
        
        # Convert audio to torch tensor for Pyannote
        audio_tensor = torch.from_numpy(audio_data).unsqueeze(0)
        
        # Perform VAD
        logger.info("Running Voice Activity Detection...")
        vad_result = vad_pipeline({"waveform": audio_tensor, "sample_rate": sample_rate})
        logger.info(f"VAD detected {len(list(vad_result.itersegments()))} speech segments")
        
        # Perform OSD
        logger.info("Running Overlapped Speech Detection...")
        osd_result = osd_pipeline({"waveform": audio_tensor, "sample_rate": sample_rate})
        logger.info(f"OSD detected {len(list(osd_result.itersegments()))} overlapped speech segments")
        
        # Perform diarization
        logger.info("Running Speaker Diarization...")
        diarization_result = diarization_pipeline(
            {"waveform": audio_tensor, "sample_rate": sample_rate}
        )
        
        # Log diarization results
        speakers = set()
        speaker_segments = []
        for turn, _, speaker_id in diarization_result.itertracks(yield_label=True):
            speakers.add(speaker_id)
            speaker_segments.append((turn.start, turn.end, speaker_id))
            logger.info(f"Speaker {speaker_id} spoke from {turn.start:.2f}s to {turn.end:.2f}s")
        
        logger.info(f"Total number of unique speakers detected: {len(speakers)}")
        
        # Process results
        processed_chunks = []
        full_text = ""
        
        logger.info("Processing transcription chunks with speaker information...")
        
        # Handle both chunked and non-chunked results
        if isinstance(result, dict) and "chunks" in result:
            chunks = result["chunks"]
        else:
            chunks = [{"text": result["text"], "timestamp": [0.0, total_duration]}]
        
        for i, chunk in enumerate(chunks, 1):
            text = chunk["text"].strip()
            if not text:  # Skip empty chunks
                continue
                
            # Get timestamps, defaulting to None if not present
            start_time = chunk.get("timestamp", [None, None])[0]
            end_time = chunk.get("timestamp", [None, None])[1]
            
            # If timestamps are missing, try to estimate from the chunk index
            if start_time is None or end_time is None:
                chunk_duration = total_duration / len(chunks)
                start_time = i * chunk_duration - chunk_duration
                end_time = i * chunk_duration
            
            logger.info(f"\nProcessing chunk {i}:")
            logger.info(f"Time: {start_time:.2f}s - {end_time:.2f}s")
            logger.info(f"Text: {text}")
            
            # Find the speaker for this time segment
            speaker = "Unknown"
            max_overlap = 0
            for seg_start, seg_end, speaker_id in speaker_segments:
                overlap = min(end_time, seg_end) - max(start_time, seg_start)
                if overlap > max_overlap:
                    max_overlap = overlap
                    speaker = f"Speaker {speaker_id}"
            
            logger.info(f"Detected speaker: {speaker}")
            
            # Check for overlapped speech
            is_overlapped = False
            for segment in osd_result.itersegments():
                if segment.start <= start_time and segment.end >= end_time:
                    is_overlapped = True
                    break
            
            if is_overlapped:
                logger.info("Overlapped speech detected in this segment")
            
            processed_chunks.append({
                "text": text,
                "speaker": speaker,
                "start": start_time,
                "end": end_time,
                "is_overlapped": is_overlapped
            })
            
            full_text += text + " "
            
            # Log progress every 10 chunks
            if i % 10 == 0:
                logger.info(f"Processed {i}/{len(chunks)} chunks ({(i/len(chunks))*100:.1f}%)")
        
        logger.info("\nTranscription summary:")
        logger.info(f"Total chunks processed: {len(processed_chunks)}")
        logger.info(f"Total speakers detected: {len(speakers)}")
        logger.info(f"Total overlapped segments: {len(list(osd_result.itersegments()))}")
        
        return {
            "chunks": processed_chunks,
            "full_text": full_text.strip()
        }
        
    except Exception as e:
        logger.error(f"Error in transcription: {str(e)}", exc_info=True)
        raise

def process_audio_data(audio_data: bytes, file_extension: str, hf_token: str, take_notes: bool = False) -> dict:
    try:
        # Convert audio to WAV format
        audio_array, sample_rate = convert_to_wav(audio_data, file_extension)
        
        # Transcribe and diarize
        result = transcribe_audio(audio_array, sample_rate, take_notes)
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}", exc_info=True)
        raise

# Note: initialize_models() should be called with your Hugging Face token when the application starts 