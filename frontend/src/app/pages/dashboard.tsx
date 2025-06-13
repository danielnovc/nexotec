"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Download, Sparkles, Clock, FileText, Loader2, Play, Square } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Transcription {
  id: string;
  text: string;
  timestamp: Date | number;
  startTime?: number;
  endTime?: number;
  speaker?: string;
}

interface MediaRecorderState {
  stream: MediaStream;
  audioContext: AudioContext;
  source: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
  audioChunks: Float32Array[];
  startTime: number;
}

interface TranscriptionChunk {
  text: string;
  speaker: string;
  start_time: number;
  end_time: number;
}

interface TranscriptionResponse {
  chunks: TranscriptionChunk[];
  full_text: string;
}

interface Language {
  name: string;
  code: string;
}

export default function TranscriptionDashboard() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState<Transcription[]>([])
  const [currentText, setCurrentText] = useState("")
  const [summary, setSummary] = useState("")
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMic, setSelectedMic] = useState<string>('default')
  const [micOptions, setMicOptions] = useState<MediaDeviceInfo[]>([])
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorderState | null>(null)
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("")
  const [availableMicrophones, setAvailableMicrophones] = useState<MediaDeviceInfo[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only run browser-specific code on client side after mount
    if (typeof window === 'undefined') return;

    // Initialize audio recording
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined } })
      .then(stream => {
        const options = { mimeType: 'audio/webm' };
        try {
          mediaRecorderRef.current = new MediaRecorder(stream, options);
          console.log('MediaRecorder initialized with mimeType audio/webm');
        } catch (e) {
          console.warn('audio/webm not supported, falling back to default mimeType:', e);
          mediaRecorderRef.current = new MediaRecorder(stream);
          console.log('Fallback MIME type used:', mediaRecorderRef.current.mimeType);
        }
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log('Data available:', event.data.size, 'bytes');
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          console.log('Recording completed:', audioBlob.size, 'bytes');
          setRecordedAudio(audioBlob);
          audioChunksRef.current = [];
        };
      })
      .catch(err => console.error("Error accessing microphone:", err));

    // Get available microphones
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const mics = devices.filter(device => device.kind === 'audioinput')
        setMicOptions(mics)
        if (mics.length > 0) {
          setSelectedMic(mics[0].deviceId)
        }
      })
      .catch(err => console.error('Error enumerating devices:', err))

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    }
  }, [selectedMic]);

  // Separate useEffect to handle processing when recordedAudio changes
  useEffect(() => {
    if (recordedAudio) {
      console.log('Audio available, starting processing...');
      processRecording(recordedAudio);
    }
  }, [recordedAudio]);

  useEffect(() => {
    // Initial load of microphones
    loadMicrophones();
    
    // Set up device change listener
    const handleDeviceChange = async () => {
      console.log('Device change detected');
      await loadMicrophones();
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []);

  const loadMicrophones = async () => {
    try {
      // Request permission to access devices
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      console.log('Available audio inputs:', audioInputs.map(d => ({ id: d.deviceId, label: d.label })));
      
      if (audioInputs.length === 0) {
        console.error('No audio input devices found');
        return;
      }

      setAvailableMicrophones(audioInputs);
      
      // If no microphone is selected, select the first one
      if (!selectedMicrophone || !audioInputs.find(d => d.deviceId === selectedMicrophone)) {
        console.log('Setting default microphone:', audioInputs[0].label);
        setSelectedMicrophone(audioInputs[0].deviceId);
      }
    } catch (error) {
      console.error('Error loading microphones:', error);
    }
  };

  const handleMicrophoneChange = async (deviceId: string) => {
    console.log('Attempting to change microphone to:', deviceId);
    
    // If we're currently recording, stop it
    if (isRecording) {
      stopRecording();
    }

    try {
      // Test the new microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: deviceId },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());

      // If successful, update the selection
      console.log('Successfully switched to new microphone');
      setSelectedMicrophone(deviceId);
    } catch (error) {
      console.error('Error switching microphone:', error);
      alert('Failed to switch microphone. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      setTranscription([]);
      setCurrentText("");
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined,
          channelCount: 1,
          sampleRate: 16000
        }
      });
      
      const audioContext = new AudioContext({
        sampleRate: 16000,
        latencyHint: 'interactive'
      });
      
      const source = audioContext.createMediaStreamSource(stream);
      // Increase buffer size to reduce number of chunks
      const processor = audioContext.createScriptProcessor(16384, 1, 1);
      
      const audioChunks: Float32Array[] = [];
      let totalSamples = 0;
      const MAX_SAMPLES = 16000 * 30; // 30 seconds of audio at 16kHz
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        totalSamples += inputData.length;
        
        // Only store chunks if we haven't exceeded the maximum
        if (totalSamples <= MAX_SAMPLES) {
          audioChunks.push(new Float32Array(inputData));
        } else {
          console.warn('Maximum recording length reached');
          stopRecording();
        }
      };
      
      source.connect(processor);
      processor.connect(audioContext.destination);
      
      setMediaRecorder({
        stream,
        audioContext,
        source,
        processor,
        audioChunks,
        startTime: Date.now()
      });
      
      setIsRecording(true);
      console.log('Recording started');
      
      // Start duration counter
      const startTime = Date.now();
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Error starting recording. Please check your microphone connection and permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;
    
    const { stream, audioContext, source, processor, audioChunks, startTime } = mediaRecorder;
    
    // Disconnect audio nodes
    source.disconnect();
    processor.disconnect();
    
    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());
    
    // Calculate duration
    const duration = (Date.now() - startTime) / 1000;
    console.log('Recording duration:', duration);
    console.log('Number of audio chunks:', audioChunks.length);
    
    if (audioChunks.length === 0) {
      console.error('No audio data was captured!');
      setMediaRecorder(null);
      setIsRecording(false);
      return;
    }
    
    // Convert audio chunks to WAV
    const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
    console.log('Total audio samples:', totalLength);
    
    const audioData = new Float32Array(totalLength);
    let offset = 0;
    for (const chunk of audioChunks) {
      audioData.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Create WAV file
    const wavBlob = createWavFile(audioData, audioContext.sampleRate);
    console.log('WAV file created, size:', wavBlob.size);
    
    setRecordedAudio(wavBlob);
    setMediaRecorder(null);
    setIsRecording(false);
    
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    
    console.log('Recording stopped, WAV file created');
  };

  const createWavFile = (audioData: Float32Array, sampleRate: number): Blob => {
    const numChannels = 1;
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = audioData.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write audio data
    let index = 44;
    for (let i = 0; i < audioData.length; i++) {
      view.setInt16(index, audioData[i] * 0x7FFF, true);
      index += 2;
    }

    return new Blob([buffer], { type: 'audio/wav' });
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const processRecording = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      console.log('Sending audio file for transcription, size:', audioBlob.size);
      const response = await fetch('http://localhost:8000/process-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Transcription failed: ${response.status} ${errorText}`);
      }

      const data: TranscriptionResponse = await response.json();
      console.log('Transcription received:', data);

      // Process chunks and ensure proper formatting
      const newTranscriptions = data.chunks.map((chunk, index) => ({
        id: `${Date.now()}-${index}`,
        text: chunk.text.trim(),
        timestamp: new Date(chunk.start_time * 1000), // Convert to Date object
        startTime: chunk.start_time,
        endTime: chunk.end_time,
        speaker: chunk.speaker || 'Speaker 1',
      }));

      // Sort chunks by start time to ensure proper order
      newTranscriptions.sort((a, b) => a.startTime - b.startTime);

      setTranscription(prev => [...newTranscriptions, ...prev]);
      setCurrentText('');
    } catch (err) {
      console.error('Error processing recording:', err);
      setError(err instanceof Error ? err.message : 'Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateSummary = async () => {
    if (!transcription.length) {
      setError("No transcription available to summarize");
      return;
    }

    setIsGeneratingSummary(true);
    setError(null);

    try {
      // Combine all transcription text
      const fullText = transcription.map(t => t.text).join(" ");

      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: fullText }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Error generating summary:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true)

    // Mock PDF generation
    setTimeout(() => {
      const content = `TRANSCRIPTION REPORT
Generated: ${new Date().toLocaleString()}
Duration: ${formatDuration(recordingDuration)}
FULL TRANSCRIPTION:
${transcription.map((segment, index) => {
  const timestamp = segment.timestamp instanceof Date 
    ? segment.timestamp.toLocaleTimeString()
    : new Date(segment.timestamp).toLocaleTimeString();
  return `[${timestamp}] ${segment.text}`;
}).join("\n\n")}

${summary ? `\nSUMMARY:\n${summary}` : ""}
`

      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `transcription-${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setIsGeneratingPDF(false)
    }, 1500)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const clearTranscription = () => {
    setTranscription([])
    setSummary("")
    setCurrentText("")
    setRecordingDuration(0)
  }

  const changeMic = (deviceId: string) => {
    setSelectedMic(deviceId)
    // Reinitialize audio stream with new device
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: deviceId } } })
      .then(stream => {
        if (mediaRecorderRef.current) {
          // Stop existing tracks
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
          // Update MediaRecorder with new stream
          mediaRecorderRef.current = new MediaRecorder(stream)
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data)
            }
          }
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
            setRecordedAudio(audioBlob)
            audioChunksRef.current = []
          }
        }
      })
      .catch(err => console.error('Error changing microphone:', err))
  }

  // Add a utility to format timestamp for display
  const formatTimestamp = (timestamp: Date | number | undefined): string => {
    if (typeof timestamp === 'number') {
      // Convert seconds to Date object (assuming timestamp is relative to recording start)
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      return date.toLocaleTimeString();
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString();
    }
    return 'Unknown time';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Speech-to-Text Dashboard</h1>
            <p className="text-muted-foreground">Real-time transcription and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isRecording ? "destructive" : "secondary"} className="px-3 py-1">
              {isRecording ? (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                  Recording
                </>
              ) : (
                <>
                  <MicOff className="w-3 h-3 mr-2" />
                  Stopped
                </>
              )}
            </Badge>
            {recordingDuration > 0 && (
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="w-3 h-3 mr-2" />
                {formatDuration(recordingDuration)}
              </Badge>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Recording Controls
            </CardTitle>
            <CardDescription>Start or stop recording to begin real-time transcription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                className="px-8"
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <Button
                onClick={generateSummary}
                disabled={isGeneratingSummary || !transcription.length}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Summarize
                  </>
                )}
              </Button>

              <Button onClick={downloadPDF} disabled={transcription.length === 0 || isGeneratingPDF} variant="outline">
                {isGeneratingPDF ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download PDF
              </Button>

              <Button onClick={clearTranscription} disabled={transcription.length === 0} variant="outline">
                Clear All
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <select 
                className="border rounded-md p-2 text-sm bg-background text-foreground w-[200px]"
                value={selectedMic}
                onChange={(e) => changeMic(e.target.value)}
                aria-label="Select microphone"
              >
                {micOptions.map(mic => (
                  <option key={mic.deviceId} value={mic.deviceId}>{mic.label || `Mic ${mic.deviceId.slice(0, 5)}`}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transcription Panel */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Transcription Output
                </CardTitle>
                <CardDescription>
                  Recorded audio will be processed after stopping
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-120px)]">
                {recordedAudio && !isProcessing && transcription.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-2 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                      <p className="text-muted-foreground">Preparing to process recording...</p>
                    </div>
                  </div>
                )}
                {isProcessing && (
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-2 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                      <p className="text-muted-foreground">Processing your recording...</p>
                    </div>
                  </div>
                )}
                {!isRecording && !isProcessing && transcription.length > 0 && (
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      {transcription.map((segment, index) => (
                        <div key={segment.id}>
                          {index === 0 && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Started at: {formatTimestamp(segment.startTime)}
                            </p>
                          )}
                          <p className="mb-1">{segment.text}</p>
                        </div>
                      ))}
                      {currentText && (
                        <div className="mt-2 text-muted">
                          <p>{currentText}</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                )}
                {isRecording && (
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-2 text-center">
                      <Mic className="w-8 h-8 mx-auto text-red-500 animate-pulse" />
                      <p className="text-muted-foreground">Recording in progress...</p>
                      <p className="text-sm text-muted-foreground">Duration: {formatDuration(recordingDuration)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Summary
                </CardTitle>
                <CardDescription>Intelligent summary of the transcription</CardDescription>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <ScrollArea className="h-[200px]">
                    <Textarea
                      value={summary}
                      readOnly
                      className="min-h-[180px] resize-none border-0 p-0 focus-visible:ring-0"
                    />
                  </ScrollArea>
                ) : (
                  <div className="flex items-center justify-center h-[200px] text-center">
                    <div className="space-y-2">
                      <Sparkles className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Generate a summary from your transcription</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Segments</span>
                  <Badge variant="secondary">{transcription.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Recording Time</span>
                  <Badge variant="secondary">{formatDuration(recordingDuration)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Word Count</span>
                  <Badge variant="secondary">
                    {transcription.reduce((acc, seg) => acc + seg.text.split(" ").length, 0)}
                  </Badge>
                </div>
                {transcription.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Words/Segment</span>
                    <Badge variant="secondary">
                      {Math.round(transcription.reduce((acc, seg) => acc + seg.text.split(" ").length, 0) / transcription.length)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

