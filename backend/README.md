# Transcription Backend

This is a backend service for a transcription software using FastAPI, designed to process audio streams in real-time for Lithuanian speech-to-text conversion and summarization.

## Setup

1. **Install Dependencies**: Run `pip install -r requirements.txt` to install all necessary packages.
2. **Run the Server**: Execute `python main.py` to start the FastAPI server with Uvicorn.

## Usage

- Connect to the WebSocket endpoint at `ws://localhost:8000/ws` to send audio data.
- The server will transcribe the audio using the Wav2Vec2-Large-XLSR-53-Lithuanian model and provide a summary using a placeholder summarization model.

## Next Steps

- Test the ASR with Lithuanian audio samples to verify transcription accuracy.
- Replace the placeholder summarization function with a pre-trained Lithuanian model or fine-tune mBART/mT5 on a medical dataset.
- Add security features and optimize for GPU or server deployment. 