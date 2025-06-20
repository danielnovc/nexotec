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

    // For RunPod Serverless, we need to submit the job and then poll for results
    const submitResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${runpodApiKey}`
      },
      body: JSON.stringify(requestPayload),
    });

    console.log('RunPod submit response status:', submitResponse.status);

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      console.error('RunPod submit error response:', errorText);
      throw new Error(`Backend error: ${submitResponse.status} ${errorText}`);
    }

    const submitResult = await submitResponse.json();
    console.log('RunPod submit result:', JSON.stringify(submitResult, null, 2));

    // Check if we got an immediate response (synchronous) or need to poll (asynchronous)
    if (submitResult.output || submitResult.data || submitResult.chunks) {
      // Synchronous response - process immediately
      console.log('Received synchronous response from RunPod');
      let result = submitResult;
      
      // Handle different possible RunPod response formats
      if (submitResult.output && (submitResult.output.chunks || submitResult.output.full_text)) {
        console.log('Found transcription data in submitResult.output');
        result = submitResult.output;
      }
      
      if (submitResult.data && (submitResult.data.chunks || submitResult.data.full_text)) {
        console.log('Found transcription data in submitResult.data');
        result = submitResult.data;
      }
      
      if (isSummaryRequest) {
        return NextResponse.json({ 
          message: 'Summary generated successfully', 
          status: 'success', 
          summary: result.summary
        }, { status: 200 });
      } else {
        return NextResponse.json({ 
          message: 'Audio processed successfully', 
          status: 'success', 
          chunks: result.chunks || [],
          full_text: result.full_text || ''
        }, { status: 200 });
      }
    } else {
      // Asynchronous response - need to poll for results
      console.log('Received asynchronous response, need to poll for results');
      
      // For now, return a status indicating the job is being processed
      // In a real implementation, you would:
      // 1. Store the job ID
      // 2. Set up a polling mechanism
      // 3. Return the job ID to the frontend
      // 4. Frontend polls for results
      
      return NextResponse.json({ 
        message: 'Job submitted successfully', 
        status: 'processing',
        jobId: submitResult.id || 'unknown'
      }, { status: 202 });
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