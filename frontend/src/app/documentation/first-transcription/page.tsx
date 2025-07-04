"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Users, Download, FileText, RotateCcw } from "lucide-react"

export default function FirstTranscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Your First Transcription</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Follow these steps to create your first transcription with speaker diarization and timestamps using our live recording feature.
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
                <h4 className="font-semibold">Choose Your Mode</h4>
                <p className="text-sm text-muted-foreground">Use the toggle in the sidebar to switch between <b>Transcription Mode</b> (with speaker diarization) and <b>Notes Mode</b> (simplified for single speakers).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Select Your Microphone</h4>
                <p className="text-sm text-muted-foreground">Choose from available audio devices in the microphone dropdown. You can also enable device audio recording to capture system sounds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Start Recording</h4>
                <p className="text-sm text-muted-foreground">Click the microphone button to begin recording. You'll see a recording timer and can monitor the duration in real-time.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Stop & Process</h4>
                <p className="text-sm text-muted-foreground">Click stop to end recording. Your audio is then processed to generate accurate transcriptions with speaker identification and timestamps.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">5</span>
              </div>
              <div>
                <h4 className="font-semibold">Review and Export</h4>
                <p className="text-sm text-muted-foreground">Review your transcription, check speaker labels and timestamps, then export as PDF, copy to clipboard, or generate a summary.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transcription vs Notes Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Transcription Mode
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speaker diarization for multiple speakers</li>
                <li>• Speaker labels (Speaker 1, Speaker 2, etc.)</li>
                <li>• Ideal for meetings, interviews, and group discussions</li>
                <li>• Higher cost per minute</li>
                <li>• More detailed output format</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes Mode
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Simplified transcription for single speakers</li>
                <li>• No speaker labels</li>
                <li>• Perfect for lectures, podcasts, and personal memos</li>
                <li>• Lower cost per minute</li>
                <li>• Cleaner, note-like output</li>
              </ul>
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
            <li>• Use transcription mode for meetings, interviews, and group discussions</li>
            <li>• Use notes mode for lectures, solo podcasts, and personal recordings</li>
            <li>• Ensure each speaker talks clearly and doesn't overlap</li>
            <li>• Use a good quality microphone for better accuracy</li>
            <li>• Minimize background noise for clearer results</li>
            <li>• Enable device audio recording if you need to capture system sounds</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 