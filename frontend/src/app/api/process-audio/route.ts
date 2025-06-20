import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { audio, file_extension, take_notes, text, action, jobId } = body.input;

    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'http://localhost:8000';
    const runpodApiKey = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    console.log('API Route - Using RunPod endpoint:', backendUrl);
    console.log('API Route - API key present:', !!runpodApiKey);

    // If jobId is provided, this is a status check request
    if (jobId) {
      console.log('Checking status for job:', jobId);
      
      const statusResponse = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${runpodApiKey}`
        },
        body: JSON.stringify({
          input: {
            jobId: jobId
          }
        }),
      });

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('RunPod status check error:', errorText);
        throw new Error(`Status check failed: ${statusResponse.status} ${errorText}`);
      }

      const statusResult = await statusResponse.json();
      console.log('RunPod status result:', JSON.stringify(statusResult, null, 2));

      // Check if job is complete
      if (statusResult.status === 'COMPLETED' && statusResult.result) {
        const result = statusResult.result;
        return NextResponse.json({ 
          message: 'Job completed successfully', 
          status: 'success', 
          chunks: result.chunks || [],
          full_text: result.full_text || ''
        }, { status: 200 });
      } else if (statusResult.status === 'IN_PROGRESS') {
        return NextResponse.json({ 
          message: 'Job still processing', 
          status: 'processing',
          jobId: jobId
        }, { status: 202 });
      } else if (statusResult.status === 'FAILED') {
        throw new Error(`Job failed: ${statusResult.error || 'Unknown error'}`);
      } else {
        return NextResponse.json({ 
          message: 'Job status unknown', 
          status: 'unknown',
          jobId: jobId
        }, { status: 202 });
      }
    }

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RunPod error response:', errorText);
      throw new Error(`Backend error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('RunPod raw response:', JSON.stringify(result, null, 2));
    console.log('RunPod response type:', typeof result);
    console.log('RunPod response keys:', Object.keys(result));
    
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
      // For transcription, check if we got a job ID (asynchronous) or immediate result
      if (result.jobId) {
        // Asynchronous processing - return job ID
        console.log('Received job ID for asynchronous processing:', result.jobId);
        return NextResponse.json({ 
          message: 'Job submitted successfully', 
          status: 'processing',
          jobId: result.jobId
        }, { status: 202 });
      } else {
        // Synchronous processing - immediate result
        console.log('Received immediate result from RunPod');
        
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