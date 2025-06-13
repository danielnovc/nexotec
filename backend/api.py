from fastapi import UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from config import app
from logger import setup_logger

logger = setup_logger()
logger.info("api.py loaded")

# Configure maximum file size (100MB)
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB in bytes

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Import processing function from main.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from main import process_audio_data

# Import summarization function
import summarize

@app.post("/process-audio")
async def process_audio(file: UploadFile = File(...)):
    try:
        if file.size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File too large")
        contents = await file.read()
        file_extension = file.filename.split('.')[-1].lower()
        result = process_audio_data(contents, file_extension)
        return result
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Transcription API is running"}

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint is working"}

@app.post('/summarize')
async def summarize_endpoint(request: Request):
    """
    Endpoint to summarize text on demand.
    Expects a JSON payload with a 'text' field containing the text to summarize.
    """
    try:
        data = await request.json()
        if 'text' not in data:
            raise HTTPException(status_code=400, detail='No text provided')
        
        text = data['text']
        summary = summarize.summarize_text(
            text,
            max_length=250,
            min_length=50,
            num_beams=6,
            length_penalty=1.2
        )
        return {'summary': summary}
    except Exception as e:
        logger.error(f"Error in summarize endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/test_summarize')
async def test_summarize_endpoint():
    """
    Test endpoint to check if summarization works.
    Uses a predefined test text to generate a summary.
    """
    test_text = "This policy note addresses the challenge of maintaining non-discriminatory communication at a community dance battle event, inspired by the scenario depicted in the teaser for a short film. The event, a high-energy, competitive dance battle held in an urban community center on June 7, 2025, at 22:00, brings together diverse participants and spectators from various cultural, socioeconomic, and experiential backgrounds. The competitive nature of the event, combined with its informal and emotionally charged atmosphere, creates a space where non-discriminatory communication is particularly difficult to maintain. Dance battles often involve spontaneous verbal exchanges, such as trash-talking or commentary by emcees, which can unintentionally or deliberately veer into discriminatory territory (e.g., remarks based on gender, race, body type, or skill level). Social media interactions before and after the event, including posts on platforms like X, can amplify tensions by perpetuating stereotypes or mocking participants. The pressure to perform and the presence of a diverse audience heighten the risk of miscommunication or biased remarks, making this a complex environment for ensuring respectful dialogue."
    summary = summarize.summarize_text(
        test_text,
        max_length=250,
        min_length=50,
        num_beams=6,
        length_penalty=1.2
    )
    return {'original_text': test_text, 'summary': summary} 