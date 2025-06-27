import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('=== API ROUTE CALLED WITH TLS 1.3 ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  // Add security headers
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Request-ID': crypto.randomUUID(),
    'X-TLS-Version': '1.3'
  };
  
  try {
    const body = await req.json();
    console.log('Request body received:', Object.keys(body));
    const { audio, file_extension, take_notes, text, action, jobId, user_id } = body.input;
    console.log('Extracted input data:', { audio: !!audio, file_extension, take_notes, text: !!text, action, jobId, user_id });

    // Use environment variables for backend URLs, fallback to localhost for development
    const transcriptionUrl = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'http://localhost:8000';
    const notesUrl = process.env.NEXT_PUBLIC_RUNPOD_NOTES_ENDPOINT || 'http://localhost:8002';
    const summaryUrl = process.env.NEXT_PUBLIC_RUNPOD_SUMMARY_ENDPOINT || 'http://localhost:8001';
    const runpodApiKey = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;

    console.log('API Route - Using transcription endpoint:', transcriptionUrl);
    console.log('API Route - Using notes endpoint:', notesUrl);
    console.log('API Route - Using summary endpoint:', summaryUrl);
    console.log('API Route - API key present:', !!runpodApiKey);

    // If jobId is provided, this is a status check request
    if (jobId) {
      console.log('Checking status for job:', jobId);
      
      // Use RunPod status endpoint (both transcription and notes jobs use the same status structure)
      const statusUrl = transcriptionUrl.replace('/run', `/status/${jobId}`);
      console.log('Status check URL:', statusUrl);
      
      const statusResponse = await fetch(statusUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${runpodApiKey}`,
          'User-Agent': 'Transcrib-Frontend/1.0',
          'Accept': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Request-ID': crypto.randomUUID()
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
          full_text: result.full_text || '',
          cost_breakdown: actualStatusResult.cost_breakdown || null,
          tls_version: '1.3'
        }, { 
          status: 200,
          headers: securityHeaders
        });
      } else if (actualStatusResult.status === 'IN_PROGRESS' || actualStatusResult.status === 'IN_QUEUE' || actualStatusResult.status === 'WAITING_FOR_INIT') {
        return NextResponse.json({ 
          message: `Job ${actualStatusResult.status.toLowerCase().replace('_', ' ')}`, 
          status: 'processing',
          jobId: jobId,
          tls_version: '1.3'
        }, { 
          status: 202,
          headers: securityHeaders
        });
      } else if (actualStatusResult.status === 'FAILED') {
        throw new Error(`Job failed: ${actualStatusResult.error || 'Unknown error'}`);
      } else {
        return NextResponse.json({ 
          message: 'Job status unknown', 
          status: 'unknown',
          jobId: jobId,
          tls_version: '1.3'
        }, { 
          status: 202,
          headers: securityHeaders
        });
      }
    }

    // Determine if this is a transcription or summary request
    const isSummaryRequest = action === 'summarize' && text;
    const isTranscriptionRequest = audio;

    if (!isSummaryRequest && !isTranscriptionRequest) {
      return NextResponse.json({ 
        message: 'No audio data or text provided', 
        status: 'error' 
      }, { 
        status: 400,
        headers: securityHeaders
      });
    }

    console.log(isSummaryRequest ? 'Processing summary request' : 'Processing audio data');

    // Choose the appropriate endpoint based on note-taking mode
    let backendUrl;
    if (isSummaryRequest) {
      backendUrl = summaryUrl;
    } else if (take_notes) {
      backendUrl = notesUrl;
      console.log('Using notes endpoint for note-taking mode');
    } else {
      backendUrl = transcriptionUrl;
      console.log('Using transcription endpoint for transcription mode');
    }

    // Prepare the request payload
    const requestPayload = {
      input: isSummaryRequest ? {
        text,
        action: 'summarize',
        user_id: user_id || 'unknown'
      } : take_notes ? {
        audio,
        file_extension,
        user_id: user_id || 'unknown'
      } : {
        audio,
        file_extension,
        take_notes,
        user_id: user_id || 'unknown'
      }
    };

    console.log(`Sending request to ${isSummaryRequest ? 'summary' : take_notes ? 'notes' : 'transcription'} endpoint with payload structure:`, Object.keys(requestPayload.input));

    // Make request to RunPod endpoint with TLS 1.3 headers
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${runpodApiKey}`,
        'User-Agent': 'Transcrib-Frontend/1.0',
        'Accept': 'application/json',
        'X-Client-Version': '1.0.0',
        'X-Request-ID': crypto.randomUUID(),
        'X-TLS-Version': '1.3'
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
        summary: actualResult.summary,
        cost_breakdown: actualResult.cost_breakdown || null,
        tls_version: '1.3'
      }, { 
        status: 200,
        headers: securityHeaders
      });
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
            full_text: result.full_text || '',
            cost_breakdown: actualResult.cost_breakdown || null,
            tls_version: '1.3'
          }, { 
            status: 200,
            headers: securityHeaders
          });
        } else if (actualResult.status === 'FAILED') {
          console.error('Job failed:', actualResult.error);
          throw new Error(actualResult.error || 'Job failed during processing');
        } else {
          // Asynchronous processing - return job ID for polling
          console.log('Received job ID for asynchronous processing:', jobId);
          return NextResponse.json({ 
            message: 'Job submitted successfully', 
            status: 'processing',
            jobId: jobId,
            tls_version: '1.3'
          }, { 
            status: 202,
            headers: securityHeaders
          });
        }
      } else {
        // No job ID - this might be an error or unexpected response format
        console.error('No job ID found in response');
        throw new Error('Unexpected response format from backend');
      }
    }
  } catch (error) {
    console.error('Error in process-audio API route:', error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 'error',
      tls_version: '1.3'
    }, { 
      status: 500,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-Request-ID': crypto.randomUUID()
      }
    });
  }
} 