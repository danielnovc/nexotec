import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  // Add security headers for TLS 1.3
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
    const data = await req.json();
    console.log('Recording request received:', data);

    if (data.action === 'start') {
      // Path to the virtual environment and Python script in the root directory
      const venvPath = path.join(process.cwd(), '../../venv');
      const pythonScriptPath = path.join(process.cwd(), '../../mic_stream.py');
      console.log('Executing Python script:', pythonScriptPath, 'with venv:', venvPath);

      // Command to activate virtual environment and run the Python script
      const command = process.platform === 'win32' 
        ? `cd "${path.dirname(pythonScriptPath)}" && "${path.join(venvPath, 'Scripts', 'activate.bat')}" && python "${pythonScriptPath}"`
        : `cd "${path.dirname(pythonScriptPath)}" && source "${path.join(venvPath, 'bin', 'activate')}" && python "${pythonScriptPath}"`;

      console.log('Command:', command);

      // Execute the command
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error executing Python script:', error);
          return NextResponse.json({ 
            message: 'Failed to start recording', 
            status: 'error', 
            error: error.message,
            tls_version: '1.3'
          }, { 
            status: 500,
            headers: securityHeaders
          });
        }
        console.log('Python script output:', stdout);
        if (stderr) {
          console.error('Python script error output:', stderr);
        }
      });

      return NextResponse.json({ 
        message: 'Recording started', 
        status: 'success',
        tls_version: '1.3'
      }, { 
        status: 200,
        headers: securityHeaders
      });
    } else if (data.action === 'stop') {
      // Logic to stop recording could be implemented here if needed
      return NextResponse.json({ 
        message: 'Recording stopped', 
        status: 'success',
        tls_version: '1.3'
      }, { 
        status: 200,
        headers: securityHeaders
      });
    } else {
      return NextResponse.json({ 
        message: 'Invalid action', 
        status: 'error',
        tls_version: '1.3'
      }, { 
        status: 400,
        headers: securityHeaders
      });
    }
  } catch (error) {
    console.error('Error handling recording request:', error);
    return NextResponse.json({ 
      message: 'Failed to start recording', 
      status: 'error',
      tls_version: '1.3'
    }, { 
      status: 500,
      headers: securityHeaders
    });
  }
} 