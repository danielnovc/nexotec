import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { audio, file_extension, take_notes } = body.input;

    if (!audio) {
      return NextResponse.json({ message: 'No audio data provided', status: 'error' }, { status: 400 });
    }

    console.log('Processing audio data');

    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'http://localhost:8000';
    const runpodApiKey = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    // Make request to RunPod endpoint
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${runpodApiKey}`
      },
      body: JSON.stringify({
        input: {
          audio,
          file_extension,
          take_notes
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    // Check if there's an error in the response
    if (result.error) {
      throw new Error(result.error);
    }
    
    return NextResponse.json({ 
      message: 'Audio processed successfully', 
      status: 'success', 
      chunks: result.output?.chunks || result.chunks,
      full_text: result.output?.full_text || result.full_text
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