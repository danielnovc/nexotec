"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Download, Sparkles, Clock, FileText, Loader2, Play, Square, Copy, Sun, Moon, CreditCard } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AppSidebar } from "@/components/app-sidebar"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"
import { SupabaseConnectModal } from "@/components/supabase-connect-modal"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { supabase } from "@/lib/supabase"

interface Transcription {
  id: string;
  text: string;
  timestamp: Date | number;
  startTime?: number;
  endTime?: number;
  speaker?: string;
  start?: number;
  end?: number;
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

// Add a color palette for speaker dots
const SPEAKER_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-teal-500',
  'bg-orange-500',
];

export default function TranscriptionDashboard() {
  const { user } = useAuth()
  const { credits, loading: creditsLoading, deductCredits, estimateCost, hasEnoughCredits } = useCredits()
  
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

  // Theme toggle state
  const [isDark, setIsDark] = useState(false);
  const [autoDownloadRecordings, setAutoDownloadRecordings] = useState(false)
  const [saveTranscripts, setSaveTranscripts] = useState(false)
  const [autoDownloadTranscripts, setAutoDownloadTranscripts] = useState(false)
  const [autoSummarize, setAutoSummarize] = useState(false)
  const [moreThanTwoSpeakers, setMoreThanTwoSpeakers] = useState(false)
  const [isConnectingSupabase, setIsConnectingSupabase] = useState(false)
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false)
  const [takeNotes, setTakeNotes] = useState(false)

  // Load toggle states from localStorage on mount
  useEffect(() => {
    setAutoDownloadRecordings(localStorage.getItem("autoDownloadRecordings") === "true")
    setSaveTranscripts(localStorage.getItem("saveTranscripts") === "true")
    setAutoDownloadTranscripts(localStorage.getItem("autoDownloadTranscripts") === "true")
    setAutoSummarize(localStorage.getItem("autoSummarize") === "true")
    setMoreThanTwoSpeakers(localStorage.getItem("moreThanTwoSpeakers") === "true")
  }, [])

  // Persist toggle states to localStorage
  useEffect(() => {
    localStorage.setItem("autoDownloadRecordings", String(autoDownloadRecordings))
  }, [autoDownloadRecordings])
  useEffect(() => {
    localStorage.setItem("saveTranscripts", String(saveTranscripts))
  }, [saveTranscripts])
  useEffect(() => {
    localStorage.setItem("autoDownloadTranscripts", String(autoDownloadTranscripts))
  }, [autoDownloadTranscripts])
  useEffect(() => {
    localStorage.setItem("autoSummarize", String(autoSummarize))
  }, [autoSummarize])
  useEffect(() => {
    localStorage.setItem("moreThanTwoSpeakers", String(moreThanTwoSpeakers))
  }, [moreThanTwoSpeakers])

  useEffect(() => {
    // On mount, set initial theme
    const isDarkMode =
      typeof window !== "undefined" &&
      (localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches));
    setIsDark(isDarkMode);
  }, []);
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

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
    // Check if user is authenticated
    // if (!user) {
    //   toast.error("Please sign in to use transcription services");
    //   return;
    // }

    // Estimate recording duration and check credits
    // const estimatedDuration = 300; // 5 minutes estimate
    // const estimatedCost = estimateCost(estimatedDuration);
    
    // if (!hasEnoughCredits(estimatedDuration)) {
    //   toast.error(`Insufficient credits. Need ${estimatedCost.toFixed(2)} credits, have ${credits.toFixed(2)}.`);
    //   return;
    // }

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
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        audioChunks.push(new Float32Array(inputData));
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

  // Add a utility function to convert blob to base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:audio/wav;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processRecording = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    try {
      // Convert audio blob to base64
      const base64Audio = await blobToBase64(audioBlob);
      
      // Get file extension from blob
      const fileExtension = audioBlob.type.split('/')[1] || 'wav';
      
      console.log('Sending audio to RunPod, size:', audioBlob.size);
      
      // Send to our Next.js API route which will forward to RunPod
      const response = await fetch('/api/process-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            audio: base64Audio,
            file_extension: fileExtension,
            take_notes: takeNotes
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Transcription failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('API response received:', data); 
      console.log('Response status:', data.status);

      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }

      // Handle different response statuses
      if (data.status === 'processing') {
        // Asynchronous processing - job submitted but not complete
        console.log('Job submitted for processing, job ID:', data.jobId);
        setError('Transcription is being processed. This may take a few moments.');
        
        // Start polling for results
        await pollForResults(data.jobId);
        return;
      }

      if (data.status === 'success') {
        // Synchronous processing - results available immediately
        console.log('Transcription completed successfully');
        await processTranscriptionData(data);
      } else {
        throw new Error(`Unexpected response status: ${data.status}`);
      }

    } catch (err) {
      console.error('Error processing recording:', err);
      setError(err instanceof Error ? err.message : 'Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Poll for job completion
  const pollForResults = async (jobId: string) => {
    const maxAttempts = 60; // 60 seconds max (1 minute)
    const pollInterval = 2000; // 2 seconds
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        console.log(`Polling attempt ${attempt + 1}/${maxAttempts} for job: ${jobId}`);
        
        const response = await fetch('/api/process-audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              jobId: jobId
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Status check failed: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Poll response:', data);

        if (data.status === 'success') {
          console.log('Job completed successfully!');
          await processTranscriptionData(data);
          return;
        } else if (data.status === 'processing' || data.status === 'unknown') {
          console.log('Job still processing, waiting...');
          setError(`Transcription is being processed... (${attempt + 1}/${maxAttempts})`);
          await new Promise(resolve => setTimeout(resolve, pollInterval));
        } else {
          throw new Error(`Unexpected poll response status: ${data.status}`);
        }
      } catch (err) {
        console.error(`Error during polling attempt ${attempt + 1}:`, err);
        if (attempt === maxAttempts - 1) {
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }
    
    throw new Error('Polling timeout - job did not complete within expected time');
  };

  // Process transcription data
  const processTranscriptionData = async (data: any) => {
    console.log('Processing transcription data:', data);
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data));
    console.log('Data.chunks:', data.chunks);
    console.log('Data.chunks type:', typeof data.chunks);
    console.log('Data.chunks length:', data.chunks?.length);

    // Check if chunks exist before trying to map
    if (!data.chunks || !Array.isArray(data.chunks)) {
      console.error('No chunks array in response:', data);
      throw new Error('Invalid response format: missing chunks array');
    }

    // Process chunks and ensure proper formatting
    const newTranscriptions = data.chunks.map((chunk: any, index: number) => ({
      id: `${Date.now()}-${index}`,
      text: chunk.text.trim(),
      timestamp: new Date(chunk.start * 1000), // Convert to Date object
      startTime: chunk.start,
      endTime: chunk.end,
      speaker: chunk.speaker || 'Speaker 1',
    }));

    // Sort chunks by start time to ensure proper order
    newTranscriptions.sort((a: any, b: any) => a.startTime - b.startTime);

    setTranscription(prev => [...newTranscriptions, ...prev]);
    setCurrentText('');
    setError(null); // Clear any previous errors
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

      const response = await fetch('/api/process-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: fullText,
            action: 'summarize'
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Summary generation failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      
      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }
      
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
    if (!timestamp) return '';
    
    // If it's a number (seconds), convert to minutes and seconds
    if (typeof timestamp === 'number') {
      const minutes = Math.floor(timestamp / 60);
      const seconds = Math.floor(timestamp % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // If it's a Date object, format it
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return '';
  };

  // Add a copy handler
  const handleCopyTranscription = () => {
    const text = transcription.map(t => t.text).join("\n");
    navigator.clipboard.writeText(text);
  };

  // Map speakers to consistent color and alignment
  const speakerOrder: string[] = Array.from(
    new Set(transcription.map((item) => item.speaker || 'Unknown'))
  );
  const speakerMap = speakerOrder.reduce((acc, speaker, idx) => {
    acc[speaker] = {
      color: SPEAKER_COLORS[idx % SPEAKER_COLORS.length],
      align: idx % 2 === 0 ? 'left' : 'right',
    };
    return acc;
  }, {} as Record<string, { color: string; align: 'left' | 'right' }>);

  const handleConnectSupabase = async () => {
    try {
      setIsConnectingSupabase(true)
      // TODO: Implement Supabase connection logic
      toast.success("Successfully connected to Supabase")
    } catch (error) {
      console.error("Error connecting to Supabase:", error)
      toast.error("Failed to connect to Supabase")
    } finally {
      setIsConnectingSupabase(false)
    }
  }

  return (
    <div className="flex flex-1 h-[100dvh] bg-[#f5faff] dark:bg-neutral-900">
      <AppSidebar 
        className="w-64 border-r" 
        isDark={isDark}
        onThemeToggle={toggleTheme}
        autoDownloadRecordings={autoDownloadRecordings}
        onAutoDownloadRecordingsChange={setAutoDownloadRecordings}
        saveTranscripts={saveTranscripts}
        onSaveTranscriptsChange={setSaveTranscripts}
        autoDownloadTranscripts={autoDownloadTranscripts}
        onAutoDownloadTranscriptsChange={setAutoDownloadTranscripts}
        autoSummarize={autoSummarize}
        onAutoSummarizeChange={setAutoSummarize}
        moreThanTwoSpeakers={moreThanTwoSpeakers}
        onMoreThanTwoSpeakersChange={setMoreThanTwoSpeakers}
        takeNotes={takeNotes}
        onTakeNotesChange={setTakeNotes}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
      />
      <SupabaseConnectModal open={supabaseModalOpen} onClose={() => setSupabaseModalOpen(false)} />
      <main className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
        {/* Credit Display */}
        {user && (
          <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{creditsLoading ? '...' : credits.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Available credits</p>
                </div>
                <Badge variant="outline" className="text-sm">
                  $0.10/min
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recording Controls */}
        <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader>
            <CardTitle>Audio Recording</CardTitle>
            <CardDescription>
              Record audio for transcription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                className={`transition-all duration-150 font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white scale-105 shadow-lg'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 shadow-md'
                }`}
                variant="default"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                size="lg"
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4 animate-pulse" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
              {/* Recording indicator and timer */}
              {isRecording && (
                <div className="flex items-center gap-2 ml-2 animate-fade-in">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-sm text-red-700">Recording in progress</span>
                  <span className="font-mono text-xs bg-gray-100 rounded px-2 py-0.5 ml-2 border border-gray-300">
                    {formatDuration(recordingDuration)}
                  </span>
                </div>
              )}
              <Select
                value={selectedMicrophone}
                onValueChange={handleMicrophoneChange}
              >
                <SelectTrigger className="w-[240px] bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 font-semibold shadow-md border-none">
                  <Mic className="mr-2 h-4 w-4" />
                  <span>Microphone</span>
                </SelectTrigger>
                <SelectContent className="w-[240px] bg-white dark:bg-neutral-900">
                  {availableMicrophones.map((mic) => (
                    <SelectItem key={mic.deviceId} value={mic.deviceId}>
                      {mic.label || `Microphone ${mic.deviceId.slice(0, 4)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 ml-2 font-semibold shadow-md"
                variant="default"
                size="lg"
                onClick={clearTranscription}
                disabled={transcription.length === 0}
              >
                Clear
              </Button>
              <Button
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 ml-2 font-semibold shadow-md"
                variant="default"
                size="lg"
                onClick={generateSummary}
                disabled={transcription.length === 0 || isGeneratingSummary}
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader size="sm" color="currentColor" className="mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
              <Button
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 ml-2 font-semibold shadow-md"
                variant="default"
                size="lg"
                onClick={downloadPDF}
                disabled={transcription.length === 0 || isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader size="sm" color="currentColor" className="mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Transcription Display */}
        <Card className="flex-1 flex flex-col shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transcription</CardTitle>
                <CardDescription>
                  {isRecording ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Recording in progress...
                    </div>
                  ) : (
                    "Transcription will appear here"
                  )}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTranscription}
                disabled={transcription.length === 0}
                className="border-black text-black dark:border-white dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all duration-150"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col relative">
            <ScrollArea className="flex-1 w-full">
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-6">
                    <Loader size="lg" color="currentColor" className="w-24 h-24" />
                    <span className="text-lg font-medium text-muted-foreground">Processing audio...</span>
                  </div>
                </div>
              ) : takeNotes ? (
                <div className="flex flex-col gap-4 p-4">
                  <div className="prose dark:prose-invert max-w-none">
                    {transcription.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="text-sm whitespace-pre-line">{item.text}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(item.start)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {transcription.map((item, index) => {
                    const speaker = item.speaker || 'Unknown';
                    const speakerNumber = speaker.replace(/[^0-9]/g, '');
                    const displaySpeaker = speakerNumber ? `Speaker ${parseInt(speakerNumber) + 1}` : speaker;
                    const { color, align } = speakerMap[speaker] || { color: 'bg-gray-400', align: 'left' };
                    return (
                      <div
                        key={index}
                        className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 shadow bg-gray-50 dark:bg-neutral-900 flex items-start gap-2 ${
                            align === 'right' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <span className={`mt-1 w-3 h-3 rounded-full ${color} shrink-0`}></span>
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-1">{displaySpeaker}</div>
                            <div className="text-sm whitespace-pre-line">{item.text}</div>
                            <span className="text-[10px] text-muted-foreground block mt-1">
                              {formatTimestamp(item.start)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        {/* Summary Section always under Transcription */}
        <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {summary ? (
              <Textarea
                value={summary}
                readOnly
                className="min-h-[100px] bg-gray-50 dark:bg-neutral-900"
              />
            ) : (
              <div className="text-muted-foreground text-sm">No summary generated yet.</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

