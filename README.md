# Transcrib

A real-time speech-to-text application with multilingual support and summarization capabilities.

## Project Structure

- `backend/`: Python backend with Whisper-based transcription and summarization
- `transcrip/`: Next.js frontend with real-time audio recording and transcription display

## Features

- Real-time audio recording and transcription
- Multilingual support with automatic language detection
- Text summarization
- PDF export functionality
- Modern, responsive UI

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the server:
   ```bash
   python main.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd transcrip
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The project uses separate branches for frontend and backend development:
- `main`: Production-ready code
- `frontend`: Frontend development branch
- `backend`: Backend development branch

## License

MIT 