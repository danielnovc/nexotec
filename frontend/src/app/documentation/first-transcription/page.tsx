"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Users, Download, FileText } from "lucide-react"

export default function FirstTranscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Your First Transcription</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Follow these steps to create your first transcription with speaker diarization and timestamps.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Select Live Recording or File Upload</h4>
                <p className="text-sm text-muted-foreground">Choose to record audio live or upload an existing audio file from your device.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Enable Speaker Diarization</h4>
                <p className="text-sm text-muted-foreground">For multi-speaker content, enable speaker diarization to automatically label different speakers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Start Recording or Upload</h4>
                <p className="text-sm text-muted-foreground">Click the microphone to record, or upload your file. Wait for the transcription to process.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Review and Export</h4>
                <p className="text-sm text-muted-foreground">Review your transcription, check speaker labels and timestamps, then export as PDF, TXT, or copy to clipboard.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use speaker diarization for meetings, interviews, and group discussions</li>
            <li>• Ensure each speaker talks clearly and doesn't overlap</li>
            <li>• Use high-quality audio for best accuracy</li>
            <li>• Edit speaker names for clarity after processing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 