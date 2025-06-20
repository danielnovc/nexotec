import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { audio, file_extension, take_notes, text, action } = body.input;

    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'http://localhost:8000';
    const runpodApiKey = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    console.log('API Route - Using RunPod endpoint:', backendUrl);
    console.log('API Route - API key present:', !!runpodApiKey);

    // Determine if this is a transcription or summary request
    const isSummaryRequest = action === 'summarize' && text;
    const isTranscriptionRequest = audio;

    if (!isSummaryRequest && !isTranscriptionRequest) {
      return NextResponse.json({ message: 'No audio data or text provided', status: 'error' }, { status: 400 });
    }

    console.log(isSummaryRequest ? 'Processing summary request' : 'Processing audio data');

    // Prepare the request payload
    const requestPayload = {
      input: isSummaryRequest ? {
        text,
        action: 'summarize'
      } : {
        audio,
        file_extension,
        take_notes
      }
    };

    console.log('Sending request to RunPod with payload structure:', Object.keys(requestPayload.input));

    // Make request to RunPod endpoint
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${runpodApiKey}`
      },
      body: JSON.stringify(requestPayload),
    });

    console.log('RunPod response status:', response.status);
    console.log('RunPod response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RunPod error response:', errorText);
      throw new Error(`Backend error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('RunPod raw response:', JSON.stringify(result, null, 2));
    console.log('RunPod response type:', typeof result);
    console.log('RunPod response keys:', Object.keys(result));
    console.log('RunPod result.chunks:', result.chunks);
    console.log('RunPod result.chunks type:', typeof result.chunks);
    console.log('RunPod result.chunks length:', result.chunks?.length);
    
    // Check if there's an error in the response
    if (result.error) {
      console.error('RunPod returned error:', result.error);
      throw new Error(result.error);
    }
    
    if (isSummaryRequest) {
      return NextResponse.json({ 
        message: 'Summary generated successfully', 
        status: 'success', 
        summary: result.summary
      }, { status: 200 });
    } else {
      // For transcription, check if we actually got transcription data
      console.log('Checking transcription data in result:', {
        hasChunks: !!result.chunks,
        hasFullText: !!result.full_text,
        resultKeys: Object.keys(result),
        chunksType: typeof result.chunks,
        chunksLength: result.chunks?.length
      });
      
      // Handle different possible RunPod response formats
      let transcriptionData = result;
      
      // Check if result is wrapped in an 'output' field (common in RunPod serverless)
      if (result.output && (result.output.chunks || result.output.full_text)) {
        console.log('Found transcription data in result.output');
        transcriptionData = result.output;
      }
      
      // Check if result is wrapped in a 'data' field
      if (result.data && (result.data.chunks || result.data.full_text)) {
        console.log('Found transcription data in result.data');
        transcriptionData = result.data;
      }
      
      console.log('Final transcription data:', transcriptionData);
      console.log('Final chunks:', transcriptionData.chunks);
      console.log('Final full_text:', transcriptionData.full_text);
      
      if (!transcriptionData.chunks && !transcriptionData.full_text) {
        console.error('Backend returned success but no transcription data:', result);
        throw new Error('Backend returned success but no transcription data. Check if models are properly initialized.');
      }
      
      // For transcription, the RunPod response should have chunks and full_text directly
      return NextResponse.json({ 
        message: 'Audio processed successfully', 
        status: 'success', 
        chunks: transcriptionData.chunks || [],
        full_text: transcriptionData.full_text || ''
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error handling audio processing request:', error);
    return NextResponse.json({ 
      message: 'Failed to process audio', 
      status: 'error', 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 