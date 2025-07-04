"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Download, Sparkles, Clock, FileText, Loader2, Play, Square, Copy, Sun, Moon, CreditCard, Shield, RotateCcw, Plus, Monitor } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { supabase } from "@/lib/supabase"
import { s3Storage, uploadAudioToStorage, initializeS3Storage } from "@/lib/s3-storage"
import { uploadEncryptedAudioToStorage, downloadEncryptedAudioFromStorage } from "@/lib/encrypted-audio-storage"
import { Switch } from "@/components/ui/switch"
import { 
  generateEncryptionKey, 
  encryptTranscription, 
  decryptTranscription,
  isEncrypted 
} from "@/lib/encryption"
import { saveEncryptedTranscription, saveEncryptedNote } from "@/lib/supabase"
import { useDashboard } from "./layout"
import { CreditTopUpModal } from "@/components/credit-topup-modal"
import { useI18n } from "@/lib/i18n"
import { TwoFAReminder } from "@/components/2fa-reminder"

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
  source: MediaStreamAudioSourceNode | ChannelMergerNode;
  processor: ScriptProcessorNode | null;
  audioChunks: Float32Array[];
  startTime: number;
  micStream?: MediaStream;
  systemStream?: MediaStream;
}

interface TranscriptionChunk {
  text: string;
  speaker: string;
  start: number;
  end: number;
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

export default function DashboardPage() {
  const { user } = useAuth()
  const { takeNotes, recordDeviceAudio, refreshCredits } = useDashboard()
  const { t } = useI18n()
  const { 
    credits, 
    loading: creditsLoading, 
    deductCredits, 
    estimateCost, 
    estimateFlatRateCost,
    hasEnoughCredits, 
    hasEnoughCreditsForFlatRate,
    checkCreditsBeforeProcessing
  } = useCredits()
  
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

  // Cost calculation state
  const [estimatedCost, setEstimatedCost] = useState<number>(0)
  const [actualCost, setActualCost] = useState<number>(0)
  const [audioDuration, setAudioDuration] = useState<number>(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Encryption state - automatically enabled when saveTranscripts is true
  const [encryptionKey, setEncryptionKey] = useState("")

  // Load encryption key on mount
  useEffect(() => {
    // Initialize encryption key if not already set
    let storedKey = sessionStorage.getItem('encryption_key')
    if (!storedKey) {
      storedKey = generateEncryptionKey()
      sessionStorage.setItem('encryption_key', storedKey)
    }
    setEncryptionKey(storedKey)
  }, [])

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
      
      let stream: MediaStream;
      
      if (recordDeviceAudio) {
        // Try to get both microphone and system audio
        try {
          // First, try to get system audio using getDisplayMedia
          const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: false,
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false
            }
          });
          
          // Get microphone audio
          const micStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
              deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined,
              channelCount: 1,
              sampleRate: 16000,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
          
          // Combine both streams
          const audioContext = new AudioContext({
            sampleRate: 16000,
            latencyHint: 'interactive'
          });
          
          const micSource = audioContext.createMediaStreamSource(micStream);
          const systemSource = audioContext.createMediaStreamSource(displayStream);
          
          // Create a merger to combine the audio streams
          const merger = audioContext.createChannelMerger(2);
          micSource.connect(merger, 0, 0);
          systemSource.connect(merger, 0, 1);
          
          // Create a destination stream
          const destination = audioContext.createMediaStreamDestination();
          merger.connect(destination);
          
          stream = destination.stream;
          
          // Store the original streams for cleanup
          setMediaRecorder({
            stream: destination.stream,
            audioContext,
            source: merger,
            processor: null,
            audioChunks: [],
            startTime: Date.now(),
            micStream,
            systemStream: displayStream
          });
          
        } catch (displayError) {
          console.warn('Could not capture system audio, falling back to microphone only:', displayError);
          // Fallback to microphone only
          stream = await navigator.mediaDevices.getUserMedia({ 
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
        }
      } else {
        // Microphone only recording
        stream = await navigator.mediaDevices.getUserMedia({ 
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
      }
      
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

  const stopRecording = async () => {
    if (!mediaRecorder) return;
    
    const { stream, audioContext, source, processor, audioChunks, startTime, micStream, systemStream } = mediaRecorder;
    
    // Disconnect audio nodes
    source.disconnect();
    if (processor) {
      processor.disconnect();
    }
    
    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
    }
    if (systemStream) {
      systemStream.getTracks().forEach(track => track.stop());
    }
    
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
    let responseData: any = null;
    
    try {
      // Convert audio blob to base64
      const base64Audio = await blobToBase64(audioBlob);
      
      // Get file extension from blob
      const fileExtension = audioBlob.type.split('/')[1] || 'wav';
      
      // Calculate audio duration for cost estimation
      const audio = new Audio(URL.createObjectURL(audioBlob));
      await new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          setAudioDuration(audio.duration);
          const estimatedCost = estimateCost(audio.duration);
          setEstimatedCost(estimatedCost);
          resolve(null);
        };
      });
      
      // Check if user has enough credits before processing
      try {
        await checkCreditsBeforeProcessing(audio.duration, 'transcription');
      } catch (creditError) {
        setError(`Insufficient credits: ${creditError instanceof Error ? creditError.message : 'Not enough credits'}`);
        setIsProcessing(false);
        return;
      }
      
      console.log('Sending audio to RunPod, size:', audioBlob.size, 'duration:', audio.duration);
      
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
            take_notes: takeNotes,
            user_id: user?.id || 'unknown'
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Transcription failed: ${response.status} ${errorText}`);
      }

      responseData = await response.json();
      console.log('API response received:', responseData); 
      console.log('Response status:', responseData.status);

      // Check if there's an error in the response
      if (responseData.error) {
        throw new Error(responseData.error);
      }

      // Handle cost information from response
      if (responseData.cost_breakdown) {
        setActualCost(responseData.cost_breakdown.user_charge);
        console.log('Cost breakdown:', responseData.cost_breakdown);
      }

      // Handle different response statuses
      if (responseData.status === 'processing') {
        // Asynchronous processing - job submitted but not complete
        console.log('Job submitted for processing, job ID:', responseData.jobId);
        
        // Start polling for results - keep loading state active
        await pollForResults(responseData.jobId);
        return;
      }

      if (responseData.status === 'success') {
        // Synchronous processing - results available immediately
        console.log('Transcription completed successfully');
        await processTranscriptionData(responseData);
      } else {
        throw new Error(`Unexpected response status: ${responseData.status}`);
      }

    } catch (err) {
      console.error('Error processing recording:', err);
      setError(err instanceof Error ? err.message : 'Failed to process audio. Please try again.');
    } finally {
      // Only stop loading if we're not in polling mode
      // The loading state will be stopped in pollForResults or processTranscriptionData
      if (!responseData || responseData.status !== 'processing') {
        setIsProcessing(false);
      }
    }
  };

  // Poll for job completion
  const pollForResults = async (jobId: string) => {
    const maxAttempts = 120; // 10 minutes max (120 attempts * 5 seconds = 600 seconds = 10 minutes)
    const pollInterval = 5000; // 5 seconds
    
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

        // Handle cost information from response
        if (data.cost_breakdown) {
          setActualCost(data.cost_breakdown.user_charge);
          console.log('Cost breakdown from poll:', data.cost_breakdown);
        }

        if (data.status === 'success') {
          console.log('Job completed successfully!');
          await processTranscriptionData(data);
          setIsProcessing(false); // Stop loading when transcription is complete
          return;
        } else if (data.status === 'processing' || data.status === 'unknown') {
          console.log('Job still processing, waiting...');
          // Don't set error message, just continue polling
          await new Promise(resolve => setTimeout(resolve, pollInterval));
        } else {
          throw new Error(`Unexpected poll response status: ${data.status}`);
        }
      } catch (err) {
        console.error(`Error during polling attempt ${attempt + 1}:`, err);
        if (attempt === maxAttempts - 1) {
          setError(err instanceof Error ? err.message : 'Polling timeout - job did not complete within 10 minutes');
          setIsProcessing(false); // Stop loading on final error
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }
    
    setError('Polling timeout - job did not complete within 10 minutes');
    setIsProcessing(false); // Stop loading on timeout
    throw new Error('Polling timeout - job did not complete within 10 minutes');
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
      timestamp: new Date((chunk.start || chunk.start_time || 0) * 1000), // Handle both field names
      startTime: chunk.start || chunk.start_time || 0, // Handle both field names
      endTime: chunk.end || chunk.end_time || 0, // Handle both field names
      speaker: chunk.speaker || 'Speaker 1',
    }));

    // Sort chunks by start time to ensure proper order
    newTranscriptions.sort((a: any, b: any) => a.startTime - b.startTime);

    setTranscription(prev => [...newTranscriptions, ...prev]);
    setCurrentText('');
    setError(null); // Clear any previous errors
    setIsProcessing(false); // Stop loading when transcription is processed successfully

    // Deduct credits after successful transcription
    try {
      const costToDeduct = actualCost > 0 ? actualCost : estimateCost(audioDuration);
      await deductCredits(costToDeduct);
      console.log(`Successfully deducted ${costToDeduct} credits for transcription`);
      // Refresh credits in sidebar
      await refreshCredits();
    } catch (deductionError) {
      console.error('Error deducting credits:', deductionError);
      // Don't throw error here as transcription was successful, just log it
    }

    // Automatically save encrypted transcription if saveTranscripts is enabled
    if (user && encryptionKey) {
      try {
        const allTranscriptions = [...newTranscriptions, ...transcription];
        const title = `Transcription ${new Date().toLocaleString()}`;
        const duration = Math.round(audioDuration);
        const creditsUsed = actualCost;

        // Encrypt and save the transcription
        const encryptedData = await encryptTranscription(allTranscriptions, encryptionKey);
        
        const { error } = await supabase
          .from('transcriptions')
          .insert({
            user_id: user.id,
            title,
            content: JSON.stringify(encryptedData),
            duration,
            credits_used: creditsUsed,
            take_notes: takeNotes,
            is_encrypted: true,
            encryption_metadata: encryptedData
          });

        if (error) {
          console.error('Error saving encrypted transcription:', error);
          toast.error('Failed to save transcription');
        } else {
          toast.success('Encrypted transcription saved successfully!');
        }
        
        // Automatically save encrypted notes if in notes mode
        if (takeNotes) {
          try {
            const notesData = {
              transcription: allTranscriptions,
              mode: 'notes',
              timestamp: new Date().toISOString(),
              duration: duration,
              creditsUsed: creditsUsed
            };

            // Encrypt and save the notes
            const encryptedNotesData = await encryptTranscription(notesData, encryptionKey);
            
            const { error: notesError } = await supabase
              .from('notes')
              .insert({
                user_id: user.id,
                title: `Notes ${new Date().toLocaleString()}`,
                content: JSON.stringify(encryptedNotesData),
                is_encrypted: true,
                encryption_metadata: encryptedNotesData
              });

            if (notesError) {
              console.error('Error saving encrypted notes:', notesError);
              toast.error('Failed to save encrypted notes');
            } else {
              toast.success('Encrypted notes saved successfully!');
            }
          } catch (notesError) {
            console.error('Error encrypting and saving notes:', notesError);
            toast.error('Failed to save encrypted notes');
          }
        }
      } catch (error) {
        console.error('Error encrypting and saving transcription:', error);
        toast.error('Failed to save encrypted transcription');
      }
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
      // Check if user has enough credits before processing
      try {
        await checkCreditsBeforeProcessing(0, 'summary');
      } catch (creditError) {
        setError(`Insufficient credits: ${creditError instanceof Error ? creditError.message : 'Not enough credits'}`);
        setIsGeneratingSummary(false);
        return;
      }

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
            action: 'summarize',
            user_id: user?.id || 'unknown'
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
      
      // Handle cost information from response
      if (data.cost_breakdown) {
        setActualCost(data.cost_breakdown.user_charge);
        console.log('Summary cost breakdown:', data.cost_breakdown);
      }
      
      setSummary(data.summary);
      
      // Deduct credits after successful summary generation
      try {
        const costToDeduct = data.cost_breakdown?.user_charge || estimateFlatRateCost();
        await deductCredits(costToDeduct);
        console.log(`Successfully deducted ${costToDeduct} credits for summary generation`);
        // Refresh credits in sidebar
        await refreshCredits();
      } catch (deductionError) {
        console.error('Error deducting credits for summary:', deductionError);
        // Don't throw error here as summary was successful, just log it
      }
      
      // Automatically save encrypted notes if saveTranscripts is enabled
      if (user && encryptionKey && data.summary) {
        try {
          const notesData = {
            transcription: transcription,
            summary: data.summary,
            timestamp: new Date().toISOString()
          };

          // Encrypt and save the notes
          const encryptedData = await encryptTranscription(notesData, encryptionKey);
          
          const { error } = await supabase
            .from('notes')
            .insert({
              user_id: user.id,
              title: `Notes ${new Date().toLocaleString()}`,
              content: JSON.stringify(encryptedData),
              is_encrypted: true,
              encryption_metadata: encryptedData
            });

          if (error) {
            console.error('Error saving encrypted notes:', error);
            toast.error('Failed to save notes');
          } else {
            toast.success('Encrypted notes saved successfully!');
          }
        } catch (error) {
          console.error('Error encrypting and saving notes:', error);
          toast.error('Failed to save encrypted notes');
        }
      }
    } catch (err) {
      console.error('Error generating summary:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const downloadPDF = async () => { 
    setIsGeneratingPDF(true)

    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default

      // Create a temporary container for the PDF content
      const pdfContainer = document.createElement('div')
      pdfContainer.style.position = 'absolute'
      pdfContainer.style.left = '-9999px'
      pdfContainer.style.top = '0'
      pdfContainer.style.width = '800px'
      pdfContainer.style.padding = '40px'
      pdfContainer.style.backgroundColor = '#ffffff'
      pdfContainer.style.fontFamily = 'Arial, sans-serif'
      pdfContainer.style.color = '#000000'
      
      // Create the PDF content HTML
      const pdfContent = `
        <div style="max-width: 720px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 16px;">N</span>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1f2937;">Nexogen AI</h1>
            </div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #374151;">Transcription Report</h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #6b7280;">
              Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>

          <!-- Metadata -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Duration</div>
              <div style="font-size: 16px; font-weight: 600; color: #1f2937;">${formatDuration(recordingDuration)}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Words</div>
              <div style="font-size: 16px; font-weight: 600; color: #1f2937;">${transcription.reduce((acc, item) => acc + (item.text?.split(' ').length || 0), 0)}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Speakers</div>
              <div style="font-size: 16px; font-weight: 600; color: #1f2937;">${new Set(transcription.map(item => item.speaker || 'Unknown')).size}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Cost</div>
              <div style="font-size: 16px; font-weight: 600; color: #1f2937;">$${actualCost.toFixed(2)}</div>
            </div>
          </div>

          <!-- Transcription Section -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
              <span style="width: 16px; height: 16px; background-color: #10b981; border-radius: 4px;"></span>
              ${takeNotes ? 'Notes' : 'Transcription'}
            </h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; min-height: 200px;">
              ${takeNotes ? 
                // Notes mode - continuous text
                transcription.map((item, index) => `
                  <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-line;">${item.text}</div>
                    <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">${formatTimestamp(item.start)}</div>
                  </div>
                `).join('') :
                // Transcription mode - bubble style
                transcription.map((item, index) => {
                  const speaker = item.speaker || 'Unknown';
                  const speakerNumber = speaker.replace(/[^0-9]/g, '');
                  const displaySpeaker = speakerNumber ? `Speaker ${parseInt(speakerNumber) + 1}` : speaker;
                  const speakerColors = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#f97316'];
                  const color = speakerColors[index % speakerColors.length];
                  const align = index % 2 === 0 ? 'left' : 'right';
                  
                  return `
                    <div style="display: flex; justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'}; margin-bottom: 16px;">
                      <div style="max-width: 70%; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: flex-start; gap: 8px;">
                          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; flex-shrink: 0; margin-top: 2px;"></div>
                          <div style="flex: 1;">
                            <div style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 4px;">${displaySpeaker}</div>
                            <div style="font-size: 14px; line-height: 1.5; color: #1f2937; white-space: pre-line;">${item.text}</div>
                            <div style="font-size: 10px; color: #9ca3af; margin-top: 4px;">${formatTimestamp(item.start)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')
              }
            </div>
          </div>

          <!-- Summary Section -->
          ${summary ? `
            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; background-color: #f59e0b; border-radius: 4px;"></span>
                Summary
              </h3>
              <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px;">
                <div style="font-size: 14px; line-height: 1.6; color: #92400e; white-space: pre-line;">${summary}</div>
              </div>
            </div>
          ` : ''}

          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">Generated by Nexogen AI Transcription Service</p>
            <p style="margin: 4px 0 0 0;">All transcriptions are processed with advanced AI technology</p>
          </div>
        </div>
      `
      
      pdfContainer.innerHTML = pdfContent
      document.body.appendChild(pdfContainer)

      // Convert to canvas
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: pdfContainer.scrollHeight
      })

      // Remove the temporary container
      document.body.removeChild(pdfContainer)

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF
      const filename = `transcription-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(filename)

      toast.success('PDF generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const clearTranscription = () => {
    setTranscription([]);
    setCurrentText("");
    setSummary("");
    setError(null);
    setEstimatedCost(0);
    setActualCost(0);
    setAudioDuration(0);
  };

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

  return (
    <div className="flex flex-1 h-[100dvh] bg-[#f5faff] dark:bg-neutral-900">
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-32 lg:pb-8 flex flex-col gap-4 lg:gap-8 pt-2 lg:pt-4">
        <TwoFAReminder />
        {/* Recording Controls - Hidden on mobile */}
        <Card className="hidden lg:block shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg lg:text-xl">{t('audioRecording')}</CardTitle>
            <CardDescription className="text-sm">
              {t('recordAudioForTranscription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-3 lg:gap-4">
              <Button
                className={`transition-all duration-150 font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white w-full lg:w-auto h-12 lg:h-10 ${
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
                    {t('stopRecording')}
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    {t('startRecording')}
                  </>
                )}
              </Button>
              
              {/* Recording indicator and timer */}
              {isRecording && (
                <div className="flex items-center gap-2 w-full lg:w-auto lg:ml-2 animate-fade-in">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-sm text-red-700">{t('recordingInProgress')}</span>
                  {recordDeviceAudio && (
                    <span className="font-mono text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 border border-blue-300">
                      <Monitor className="w-3 h-3 inline mr-1" />
                      {t('deviceAudio')}
                    </span>
                  )}
                  <span className="font-mono text-xs bg-gray-100 rounded px-2 py-0.5 ml-2 border border-gray-300">
                    {formatDuration(recordingDuration)}
                  </span>
                </div>
              )}
              
              <Select
                value={selectedMicrophone}
                onValueChange={handleMicrophoneChange}
              >
                <SelectTrigger className="w-full lg:w-[240px] bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 font-semibold shadow-md border-none h-12 lg:h-10">
                  <Mic className="mr-2 h-4 w-4" />
                  <span>{t('microphone')}</span>
                </SelectTrigger>
                <SelectContent className="w-full lg:w-[240px] bg-white dark:bg-neutral-900">
                  {availableMicrophones.map((mic) => (
                    <SelectItem key={mic.deviceId} value={mic.deviceId}>
                      {mic.label || t('microphone') + ' ' + mic.deviceId.slice(0, 4)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-2 w-full lg:w-auto">
                <Button
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 font-semibold shadow-md h-12 lg:h-10 flex-1 lg:flex-none"
                  variant="default"
                  size="lg"
                  onClick={clearTranscription}
                  disabled={transcription.length === 0}
                >
                  {t('clear')}
                </Button>
                <Button
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 font-semibold shadow-md h-12 lg:h-10 flex-1 lg:flex-none"
                  variant="default"
                  size="lg"
                  onClick={generateSummary}
                  disabled={transcription.length === 0 || isGeneratingSummary}
                >
                  {isGeneratingSummary ? (
                    <>
                      <Loader size="sm" color="currentColor" className="mr-2" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {t('generateSummary')}
                    </>
                  )}
                </Button>
                <Button
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all duration-150 font-semibold shadow-md h-12 lg:h-10 flex-1 lg:flex-none"
                  variant="default"
                  size="lg"
                  onClick={downloadPDF}
                  disabled={transcription.length === 0 || isGeneratingPDF}
                >
                  {isGeneratingPDF ? (
                    <>
                      <Loader size="sm" color="currentColor" className="mr-2" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      {t('downloadPDF')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Transcription Display */}
        <Card className="flex-1 flex flex-col shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <motion.div
                  key={takeNotes ? "notes-title" : "transcription-title"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    {takeNotes ? t('notes') : t('transcription')}
                    <Shield className="h-4 w-4 text-green-600" />
                  </CardTitle>
                </motion.div>
                <motion.div
                  key={takeNotes ? "notes-desc" : "transcription-desc"}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <CardDescription className="text-sm">
                    {isRecording ? (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        {t('recordingInProgress')}
                      </div>
                    ) : (
                      takeNotes ? t('notesWillAppearHere') : t('transcriptionWillAppearHere')
                    )}
                  </CardDescription>
                </motion.div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTranscription}
                disabled={transcription.length === 0}
                className="border-black text-black dark:border-white dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all duration-150 w-full sm:w-auto h-10"
              >
                <Copy className="mr-2 h-4 w-4" />
                {t('copy')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col relative">
            <ScrollArea className="flex-1 w-full">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div 
                    key="processing"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="flex flex-col items-center gap-6">
                      <Loader size="lg" color="currentColor" className="w-16 h-16 lg:w-24 lg:h-24" />
                      <span className="text-base lg:text-lg font-medium text-muted-foreground text-center">{t('processingAudio')}</span>
                    </div>
                  </motion.div>
                ) : takeNotes ? (
                  <motion.div 
                    key="notes"
                    className="flex flex-col gap-4 p-2 lg:p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {transcription.length > 0 ? (
                      <motion.div 
                        className="prose dark:prose-invert max-w-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {transcription.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <div className="text-sm whitespace-pre-line">{item.text}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatTimestamp(item.start)}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="text-muted-foreground text-sm pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t('noNotesGeneratedYet')}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="transcription"
                    className="flex flex-col gap-3 lg:gap-4 p-2 lg:p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {transcription.length > 0 ? (
                      transcription.map((item, index) => {
                        const speaker = item.speaker || 'Unknown';
                        const speakerNumber = speaker.replace(/[^0-9]/g, '');
                        const displaySpeaker = speakerNumber ? t('speaker') + ' ' + (parseInt(speakerNumber) + 1) : speaker;
                        const { color, align } = speakerMap[speaker] || { color: 'bg-gray-400', align: 'left' };
                        return (
                          <motion.div
                            key={index}
                            className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                          >
                            <motion.div
                              className={`max-w-[85%] lg:max-w-[70%] rounded-lg px-3 lg:px-4 py-2 shadow bg-gray-50 dark:bg-neutral-900 flex items-start gap-2 ${
                                align === 'right' ? 'flex-row-reverse' : ''
                              }`}
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className={`mt-1 w-3 h-3 rounded-full ${color} shrink-0`}></span>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-semibold text-muted-foreground mb-1">{displaySpeaker}</div>
                                <div className="text-sm whitespace-pre-line break-words">{item.text}</div>
                                <span className="text-[10px] text-muted-foreground block mt-1">
                                  {formatTimestamp(item.start)}
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <motion.div 
                        className="text-muted-foreground text-sm pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t('noTranscriptionGeneratedYet')}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Summary Section always under Transcription */}
        <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg lg:text-xl">{t('summary')}</CardTitle>
          </CardHeader>
          <CardContent>
            {summary ? (
              <Textarea
                value={summary}
                readOnly
                className="min-h-[100px] bg-gray-50 dark:bg-neutral-900 text-sm"
              />
            ) : (
              <div className="text-muted-foreground text-sm pt-2">{t('noSummaryGeneratedYet')}</div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Mobile Bottom Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800 p-4 shadow-lg">
        {/* Recording Timer - Mobile */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mb-3 p-2 bg-red-50 dark:bg-red-950 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-sm text-red-700 dark:text-red-300">{t('recording')}</span>
            {recordDeviceAudio && (
              <span className="font-mono text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded px-2 py-1 border border-blue-200 dark:border-blue-800">
                <Monitor className="w-3 h-3 inline mr-1" />
                {t('deviceAudio')}
              </span>
            )}
            <span className="font-mono text-xs bg-red-100 dark:bg-red-900 rounded px-2 py-1 border border-red-200 dark:border-red-800">
              {formatDuration(recordingDuration)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-around">
          {/* Recording Button */}
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white scale-110'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
              }`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
            >
              {isRecording ? (
                <Square className="h-6 w-6 animate-pulse" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
            <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
              {isRecording ? t('stop') : t('record')}
            </span>
          </div>

          {/* Clear Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={clearTranscription}
              disabled={transcription.length === 0}
              className="w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200"
            >
              <RotateCcw className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
            <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">{t('clear')}</span>
          </div>

          {/* Generate Summary Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={generateSummary}
              disabled={transcription.length === 0 || isGeneratingSummary}
              className="w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200"
            >
              {isGeneratingSummary ? (
                <Loader size="sm" color="currentColor" className="h-6 w-6" />
              ) : (
                <Sparkles className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              )}
            </button>
            <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">{t('summary')}</span>
          </div>

          {/* Download PDF Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={downloadPDF}
              disabled={transcription.length === 0 || isGeneratingPDF}
              className="w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-all duration-200"
            >
              {isGeneratingPDF ? (
                <Loader size="sm" color="currentColor" className="h-6 w-6" />
              ) : (
                <FileText className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              )}
            </button>
            <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">{t('pdf')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}