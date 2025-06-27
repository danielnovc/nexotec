"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Download, Sparkles, Clock, FileText, Loader2, Play, Square, Copy, Sun, Moon, CreditCard, Shield, Database, Zap } from "lucide-react"

export default function LiveRecordingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Live Recording</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Transcrib's live recording feature lets you record audio directly in your browser and get accurate transcriptions with speaker identification. Perfect for meetings, interviews, lectures, and any situation where you need professional transcription results.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            How Live Recording Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Start Recording</h4>
                <p className="text-sm text-muted-foreground">Click the microphone button to begin recording. Choose from available audio devices and ensure you have the right permissions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Record Your Audio</h4>
                <p className="text-sm text-muted-foreground">Speak clearly into your microphone while the system captures high-quality audio. You can see the recording duration and audio levels during recording.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Stop & Process</h4>
                <p className="text-sm text-muted-foreground">Click stop to end recording. Your audio is then processed to generate accurate transcriptions with speaker identification and timestamps.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Get Your Results</h4>
                <p className="text-sm text-muted-foreground">Download transcriptions as PDF, copy text, or save to cloud storage. You can also generate summaries and export in various formats.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multi-Microphone Support</h4>
                  <p className="text-sm text-muted-foreground">Choose from available audio devices and switch between microphones during your session</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Precise Timestamps</h4>
                  <p className="text-sm text-muted-foreground">Every word and sentence comes with exact timing for easy navigation and reference</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Speaker Identification</h4>
                  <p className="text-sm text-muted-foreground">Automatically identify and label different speakers in your recordings for clear attribution</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Smart Summaries</h4>
                  <p className="text-sm text-muted-foreground">Generate concise summaries of your recordings to quickly capture key points and insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure Processing</h4>
                  <p className="text-sm text-muted-foreground">Your audio and transcriptions are processed securely with optional encryption for privacy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-muted-foreground">Save your recordings and transcriptions to the cloud for easy access and backup</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recording Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Audio Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Microphone Selection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic detection of available devices</li>
                    <li>• Easy switching between microphones</li>
                    <li>• Permission management</li>
                    <li>• Audio quality optimization</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Recording Quality</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High-quality audio capture</li>
                    <li>• Background noise reduction</li>
                    <li>• Professional audio processing</li>
                    <li>• Multiple format support</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Processing Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Speaker Detection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Enable/disable speaker identification</li>
                    <li>• Support for multiple speakers</li>
                    <li>• Automatic speaker labeling</li>
                    <li>• Custom speaker names</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Note-taking Mode</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Simplified transcription</li>
                    <li>• No speaker labels</li>
                    <li>• Faster processing</li>
                    <li>• Lower cost per minute</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost & Usage Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Transparent Pricing</h4>
                <p className="text-sm text-muted-foreground">Get clear cost estimates before processing and see exactly what you're paying for.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Usage Monitoring</h4>
                <p className="text-sm text-muted-foreground">Track your recording duration, processing time, and credit usage during processing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Detailed Breakdown</h4>
                <p className="text-sm text-muted-foreground">See exactly what each part of the process costs, from transcription to speaker identification.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export & Storage Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Export Formats</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF with timestamps and speaker labels</li>
                <li>• Plain text for easy copying</li>
                <li>• JSON with detailed metadata</li>
                <li>• Audio file download (WAV format)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Storage Options</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Local browser storage</li>
                <li>• Cloud storage integration</li>
                <li>• Automatic backup</li>
                <li>• Secure encrypted storage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Recording Setup</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use a good quality microphone for better results</li>
                <li>• Minimize background noise and echo</li>
                <li>• Ensure stable internet connection for processing</li>
                <li>• Test your microphone before important recordings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Getting Better Results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enable speaker identification for multi-speaker content</li>
                <li>• Use note-taking mode for single-speaker recordings</li>
                <li>• Generate summaries for long recordings</li>
                <li>• Save important recordings to cloud storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Managing Costs</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check cost estimates before processing</li>
                <li>• Use note-taking mode to reduce costs</li>
                <li>• Enable auto-download to avoid re-processing</li>
                <li>• Review your usage patterns regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 