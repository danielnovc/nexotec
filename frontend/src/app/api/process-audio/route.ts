import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ message: 'No audio file provided', status: 'error' }, { status: 400 });
    }

    console.log('Processing audio file:', audioFile.name);

    // Forward the audio file to the FastAPI backend
    const backendFormData = new FormData();
    backendFormData.append('file', audioFile, audioFile.name);

    const response = await fetch('http://localhost:8000/process-audio', {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const result = await response.json();
    
    return NextResponse.json({ 
      message: 'Audio processed successfully', 
      status: 'success', 
      chunks: result.chunks,
      full_text: result.full_text
    }, { status: 200 });
  } catch (error) {
    console.error('Error handling audio processing request:', error);
    return NextResponse.json({ 
      message: 'Failed to process audio', 
      status: 'error', 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 