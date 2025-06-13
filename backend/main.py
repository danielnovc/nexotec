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

# Check if CUDA is available and configure device
device = "cuda:0" if torch.cuda.is_available() else "cpu"
if torch.cuda.is_available():
    torch.backends.cudnn.benchmark = True
    torch.backends.cudnn.deterministic = False
    torch.cuda.empty_cache()
    logger.info("CUDA configured successfully")
else:
    logger.warning("CUDA is not available. Using CPU instead.")

def initialize_models():
    global whisper_pipeline
    try:
        logger.info("Initializing Whisper pipeline...")
        torch.cuda.empty_cache()
        
        # Initialize the pipeline with chunking support and automatic language detection
        whisper_pipeline = pipeline(
            "automatic-speech-recognition",
            model="openai/whisper-medium",  # Using medium model for better accuracy
            chunk_length_s=30,  # Process audio in 30-second chunks
            stride_length_s=5,  # 5-second overlap between chunks
            device=device,
            return_timestamps=True,  # Enable timestamp generation
            generate_kwargs={"task": "transcribe", "language": None}  # Enable automatic language detection
        )
        
        logger.info("Whisper pipeline initialized successfully with automatic language detection")
        if torch.cuda.is_available():
            logger.info(f"GPU Memory allocated: {torch.cuda.memory_allocated(0) / 1024**2:.2f} MB")
            logger.info(f"Cached: {torch.cuda.memory_reserved(0) / 1024**2:.2f} MB")
    except Exception as e:
        logger.error(f"Error initializing pipeline: {str(e)}", exc_info=True)
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

def transcribe_audio(audio_data: np.ndarray, sample_rate: int) -> dict:
    try:
        if len(audio_data.shape) > 1:
            audio_data = audio_data.mean(axis=1)
        
        # Calculate total duration
        total_duration = len(audio_data) / sample_rate
        logger.info(f"Starting transcription of {total_duration:.2f} seconds audio with chunking and automatic language detection...")
        
        # Process audio with the pipeline
        result = whisper_pipeline(
            {"array": audio_data, "sampling_rate": sample_rate},
            batch_size=8,  # Process 8 chunks at a time
            return_timestamps=True,
            generate_kwargs={"task": "transcribe", "language": None}  # Ensure language detection is enabled
        )
        
        # Log detected language if available
        if isinstance(result, dict) and "language" in result:
            logger.info(f"Detected language: {result['language']}")
        
        # Process the result to extract chunks with timestamps
        processed_chunks = []
        full_text = ""
        
        if isinstance(result, dict) and "chunks" in result:
            # Handle chunked output with timestamps
            total_chunks = len(result["chunks"])
            logger.info(f"Processing {total_chunks} chunks of transcribed audio...")
            
            for i, chunk in enumerate(result["chunks"], 1):
                text = chunk["text"].strip()
                start_time = chunk["timestamp"][0]
                end_time = chunk["timestamp"][1]
                
                if text:
                    processed_chunks.append({
                        "text": text,
                        "speaker": "Speaker 1",  # Placeholder for speaker diarization
                        "start_time": float(start_time),  # Ensure these are floats
                        "end_time": float(end_time)
                    })
                    full_text += text + " "
                
                # Log progress every 10 chunks
                if i % 10 == 0:
                    logger.info(f"Processed {i}/{total_chunks} chunks ({(i/total_chunks)*100:.1f}%)")
        else:
            # Handle single output
            text = result["text"] if isinstance(result, dict) else str(result)
            processed_chunks.append({
                "text": text.strip(),
                "speaker": "Speaker 1",
                "start_time": 0.0,
                "end_time": float(total_duration)
            })
            full_text = text.strip()
        
        logger.info(f"Transcription completed: {len(processed_chunks)} chunks processed, total duration: {total_duration:.2f} seconds")
        return {
            "chunks": processed_chunks,
            "full_text": full_text.strip()
        }
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}", exc_info=True)
        raise

def process_audio_data(audio_data: bytes, file_extension: str) -> dict:
    audio_array, sample_rate = convert_to_wav(audio_data, file_extension)
    result = transcribe_audio(audio_array, sample_rate)
    return result

initialize_models()

# The API endpoints are now handled in api.py  