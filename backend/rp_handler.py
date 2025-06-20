import runpod
import torch
import numpy as np
import soundfile as sf
from pydub import AudioSegment
import io
import tempfile
import os
import librosa
import base64
from transformers import pipeline
from logger import setup_logger
from pyannote.audio import Pipeline, Model
from pyannote.audio.pipelines import VoiceActivityDetection, OverlappedSpeechDetection
import torchaudio
import re
import uuid
from datetime import datetime, timedelta

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

# In-memory job storage (in production, use Redis or database)
job_results = {}
job_status = {}

def initialize_models(hf_token: str):
    """Initialize all required models."""
    global whisper_pipeline, diarization_pipeline, vad_pipeline, osd_pipeline
    
    logger.info("==================================================")
    logger.info("CUDA Information:")
    logger.info(f"CUDA available: {torch.cuda.is_available()}")
    logger.info(f"CUDA version: {torch.version.cuda}")
    logger.info(f"Number of GPUs: {torch.cuda.device_count()}")
    
    for i in range(torch.cuda.device_count()):
        logger.info(f"GPU {i}: {torch.cuda.get_device_name(i)}")
    
    current_device = torch.cuda.current_device()
    logger.info(f"Current GPU: {current_device}")
    logger.info(f"GPU memory allocated: {torch.cuda.memory_allocated(current_device) / 1024**2:.2f} MB")
    logger.info(f"GPU memory cached: {torch.cuda.memory_reserved(current_device) / 1024**2:.2f} MB")
    logger.info("CUDA configured successfully")
    logger.info("==================================================")
    
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

def create_job(audio_data: bytes, file_extension: str, take_notes: bool = False) -> str:
    """Create a new job and return job ID."""
    job_id = str(uuid.uuid4())
    job_status[job_id] = {
        "status": "IN_PROGRESS",
        "created_at": datetime.now(),
        "audio_data": audio_data,
        "file_extension": file_extension,
        "take_notes": take_notes
    }
    logger.info(f"Created job {job_id}")
    return job_id

def get_job_status(job_id: str) -> dict:
    """Get the status of a job."""
    if job_id not in job_status:
        return {"error": "Job not found"}
    
    job = job_status[job_id]
    
    if job["status"] == "COMPLETED":
        return {
            "status": "COMPLETED",
            "result": job_results.get(job_id)
        }
    elif job["status"] == "FAILED":
        return {
            "status": "FAILED",
            "error": job.get("error", "Unknown error")
        }
    else:
        return {
            "status": "IN_PROGRESS",
            "created_at": job["created_at"].isoformat()
        }

def process_job(job_id: str):
    """Process a job in the background."""
    try:
        job = job_status[job_id]
        logger.info(f"Processing job {job_id}")
        
        # Process the audio
        result = process_audio_data(
            job["audio_data"], 
            job["file_extension"], 
            job["take_notes"]
        )
        
        # Store the result
        job_results[job_id] = result
        job_status[job_id]["status"] = "COMPLETED"
        job_status[job_id]["completed_at"] = datetime.now()
        
        logger.info(f"Job {job_id} completed successfully")
        
    except Exception as e:
        logger.error(f"Job {job_id} failed: {str(e)}")
        job_status[job_id]["status"] = "FAILED"
        job_status[job_id]["error"] = str(e)

def process_audio_data(audio_data: bytes, file_extension: str, take_notes: bool = False) -> dict:
    try:
        logger.info(f"Starting process_audio_data - file_extension: {file_extension}, take_notes: {take_notes}")
        
        # Convert audio to WAV format
        logger.info("Converting audio to WAV format...")
        audio_array, sample_rate = convert_to_wav(audio_data, file_extension)
        logger.info(f"Audio converted - shape: {audio_array.shape}, sample_rate: {sample_rate}")
        
        # Transcribe and diarize
        logger.info("Starting transcription...")
        result = transcribe_audio(audio_array, sample_rate, take_notes)
        logger.info(f"Transcription completed - result type: {type(result)}")
        logger.info(f"Transcription result keys: {list(result.keys()) if isinstance(result, dict) else 'Not a dict'}")
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}", exc_info=True)
        raise

def handler(event):
    """
    This function processes incoming requests to your Serverless endpoint.
    
    Args:
        event (dict): Contains the input data and request metadata
       
    Returns:
        dict: The job status or result
    """
    try:
        logger.info("Worker Start")
        logger.info(f"Event received: {event}")
        input_data = event['input']
        
        # Check if this is a status check request
        if 'jobId' in input_data:
            job_id = input_data['jobId']
            logger.info(f"Status check request for job: {job_id}")
            return get_job_status(job_id)
        
        # Extract input parameters for new job
        audio_base64 = input_data.get('audio')
        file_extension = input_data.get('file_extension', 'wav')
        take_notes = input_data.get('take_notes', False)
        
        logger.info(f"Processing new job - file_extension: {file_extension}, take_notes: {take_notes}")
        logger.info(f"Audio data length: {len(audio_base64) if audio_base64 else 0}")
        
        if not audio_base64:
            logger.error("No audio data provided")
            return {"error": "No audio data provided"}
        
        # Decode base64 audio
        try:
            # Validate base64 string
            if not re.match(r'^[A-Za-z0-9+/]*={0,2}$', audio_base64):
                logger.error("Invalid base64 string format")
                return {"error": "Invalid base64 string format"}
            
            # Add padding if needed
            padding = 4 - (len(audio_base64) % 4)
            if padding != 4:
                audio_base64 += '=' * padding
            
            audio_data = base64.b64decode(audio_base64)
            logger.info(f"Decoded audio data size: {len(audio_data)} bytes")
        except Exception as e:
            logger.error(f"Failed to decode base64 audio data: {str(e)}")
            return {"error": f"Invalid base64 audio data: {str(e)}"}
        
        # Check if models are initialized
        if whisper_pipeline is None:
            logger.error("Models not initialized. Please check server configuration.")
            return {"error": "Models not initialized. Please check server configuration."}
        
        logger.info("Models are initialized, proceeding with job creation...")
        
        # Create a new job
        job_id = create_job(audio_data, file_extension, take_notes)
        
        # Process the job (this will run in the background)
        process_job(job_id)
        
        # Return the job ID immediately
        return {
            "jobId": job_id,
            "status": "IN_PROGRESS",
            "message": "Job created and processing started"
        }
        
    except Exception as e:
        logger.error(f"Error in handler: {str(e)}", exc_info=True)
        return {"error": str(e)}

# Initialize models when the module is loaded
logger.info("=== INITIALIZING MODELS ===")
hf_token = os.getenv("HF_TOKEN")
logger.info(f"HF_TOKEN from environment: {bool(hf_token)}")
logger.info(f"HF_TOKEN length: {len(hf_token) if hf_token else 0}")
logger.info(f"HF_TOKEN starts with: {hf_token[:10] if hf_token else 'None'}...")
logger.info(f"All environment variables: {dict(os.environ)}")

if not hf_token:
    logger.error("HF_TOKEN environment variable not set. Models will not be initialized.")
else:
    try:
        logger.info("Initializing models...")
        initialize_models(hf_token)
        logger.info("Models initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize models: {str(e)}")
        logger.error("This will prevent transcription from working properly")

# Start the RunPod Serverless handler
runpod.serverless.start({"handler": handler}) 