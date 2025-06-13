import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
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
          return NextResponse.json({ message: 'Failed to start recording', status: 'error', error: error.message }, { status: 500 });
        }
        console.log('Python script output:', stdout);
        if (stderr) {
          console.error('Python script error output:', stderr);
        }
      });

      return NextResponse.json({ message: 'Recording started', status: 'success' }, { status: 200 });
    } else if (data.action === 'stop') {
      // Logic to stop recording could be implemented here if needed
      return NextResponse.json({ message: 'Recording stopped', status: 'success' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action', status: 'error' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error handling recording request:', error);
    return NextResponse.json({ message: 'Failed to start recording', status: 'error' }, { status: 500 });
  }
} 