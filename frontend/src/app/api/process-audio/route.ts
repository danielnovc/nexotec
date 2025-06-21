import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('=== API ROUTE CALLED ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  try {
    const body = await req.json();
    console.log('Request body received:', Object.keys(body));
    const { audio, file_extension, take_notes, text, action, jobId } = body.input;
    console.log('Extracted input data:', { audio: !!audio, file_extension, take_notes, text: !!text, action, jobId });

    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'http://localhost:8000';
    const runpodApiKey = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    console.log('API Route - Using RunPod endpoint:', backendUrl);
    console.log('API Route - API key present:', !!runpodApiKey);

    // If jobId is provided, this is a status check request
    if (jobId) {
      console.log('Checking status for job:', jobId);
      
      // Use RunPod status endpoint
      const statusUrl = backendUrl.replace('/run', `/status/${jobId}`);
      console.log('Status check URL:', statusUrl);
      
      const statusResponse = await fetch(statusUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${runpodApiKey}`
        }
      });

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('RunPod status check error:', errorText);
        throw new Error(`Status check failed: ${statusResponse.status} ${errorText}`);
      }

      const statusResult = await statusResponse.json();
      console.log('RunPod status result:', JSON.stringify(statusResult, null, 2));

      // RunPod wraps status responses in 'output' field
      const actualStatusResult = statusResult.output || statusResult;
      console.log('Actual status result:', actualStatusResult);

      // Check if job is complete
      if (actualStatusResult.status === 'COMPLETED' && actualStatusResult.result) {
        const result = actualStatusResult.result;
        return NextResponse.json({ 
          message: 'Job completed successfully', 
          status: 'success', 
          chunks: result.chunks || [],
          full_text: result.full_text || ''
        }, { status: 200 });
      } else if (actualStatusResult.status === 'IN_PROGRESS' || actualStatusResult.status === 'IN_QUEUE' || actualStatusResult.status === 'WAITING_FOR_INIT') {
        return NextResponse.json({ 
          message: `Job ${actualStatusResult.status.toLowerCase().replace('_', ' ')}`, 
          status: 'processing',
          jobId: jobId
        }, { status: 202 });
      } else if (actualStatusResult.status === 'FAILED') {
        throw new Error(`Job failed: ${actualStatusResult.error || 'Unknown error'}`);
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
    console.log('=== RUNPOD RESPONSE DEBUG ===');
    console.log('RunPod raw response:', JSON.stringify(result, null, 2));
    console.log('RunPod response type:', typeof result);
    console.log('RunPod response keys:', Object.keys(result));
    console.log('RunPod response.output:', result.output);
    console.log('RunPod response.id:', result.id);
    console.log('RunPod response.status:', result.status);
    console.log('=== END RUNPOD RESPONSE DEBUG ===');
    
    // RunPod wraps responses in an 'output' field
    let actualResult = result.output || result;
    console.log('Actual result after unwrapping:', actualResult);
    
    // Check if there's an error in the response
    if (actualResult.error) {
      console.error('RunPod returned error:', actualResult.error);
      throw new Error(actualResult.error);
    }
    
    if (isSummaryRequest) {
      return NextResponse.json({ 
        message: 'Summary generated successfully', 
        status: 'success', 
        summary: actualResult.summary
      }, { status: 200 });
    } else {
      // For transcription, check if we got a job ID (asynchronous) or immediate result
      console.log('Checking for job ID in response...');
      console.log('actualResult.jobId exists:', !!actualResult.jobId);
      console.log('actualResult.jobId value:', actualResult.jobId);
      console.log('actualResult.id exists:', !!actualResult.id);
      console.log('actualResult.id value:', actualResult.id);
      
      // Check for both camelCase and snake_case job ID, and RunPod's 'id' field
      const jobId = actualResult.jobId || actualResult.job_id || actualResult.id;
      
      if (jobId) {
        // Check if this is a completed job (synchronous processing)
        if (actualResult.status === 'COMPLETED' && actualResult.result) {
          console.log('Received completed job result:', jobId);
          const result = actualResult.result;
          return NextResponse.json({ 
            message: 'Audio processed successfully', 
            status: 'success', 
            chunks: result.chunks || [],
            full_text: result.full_text || ''
          }, { status: 200 });
        } else if (actualResult.status === 'FAILED') {
          console.error('Job failed:', actualResult.error);
          throw new Error(actualResult.error || 'Job failed during processing');
        } else {
          // Asynchronous processing - return job ID for polling
          console.log('Received job ID for asynchronous processing:', jobId);
          return NextResponse.json({ 
            message: 'Job submitted successfully', 
            status: 'processing',
            jobId: jobId
          }, { status: 202 });
        }
      } else {
        // Synchronous processing - immediate result
        console.log('No job ID found, treating as synchronous processing');
        console.log('Received immediate result from RunPod');
        
        // Handle different possible RunPod response formats
        let transcriptionData = actualResult;
        
        // Check if result is wrapped in an 'output' field (common in RunPod serverless)
        if (actualResult.output && (actualResult.output.chunks || actualResult.output.full_text)) {
          console.log('Found transcription data in actualResult.output');
          transcriptionData = actualResult.output;
        }
        
        // Check if result is wrapped in a 'data' field
        if (actualResult.data && (actualResult.data.chunks || actualResult.data.full_text)) {
          console.log('Found transcription data in actualResult.data');
          transcriptionData = actualResult.data;
        }
        
        console.log('Final transcription data:', transcriptionData);
        console.log('Final chunks:', transcriptionData.chunks);
        console.log('Final full_text:', transcriptionData.full_text);
        
        if (!transcriptionData.chunks && !transcriptionData.full_text) {
          console.error('Backend returned success but no transcription data:', actualResult);
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
    console.error('Full error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    return NextResponse.json({ 
      message: 'Failed to process audio', 
      status: 'error', 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 