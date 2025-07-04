"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Download, Sparkles, Clock, FileText, Loader2, Play, Square, Copy, Sun, Moon, CreditCard, Shield, Database, Zap, Monitor, RotateCcw } from "lucide-react"

export default function LiveRecordingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Live Recording</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Nexogen AI's live recording feature lets you record audio directly in your browser and get accurate transcriptions with speaker identification. Perfect for meetings, interviews, lectures, and any situation where you need professional transcription results.
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
                <h4 className="font-semibold">Get Your Results</h4>
                <p className="text-sm text-muted-foreground">Download transcriptions as PDF, copy text, or generate summaries. You can also save to cloud storage if enabled.</p>
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
                <Monitor className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Device Audio Recording</h4>
                  <p className="text-sm text-muted-foreground">Capture system audio in addition to microphone input for complete audio capture</p>
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
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Mode Switching</h4>
                  <p className="text-sm text-muted-foreground">Switch between transcription and notes mode to optimize for your content type</p>
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
                  <h5 className="font-semibold mb-2">Device Audio Recording</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Capture system audio output</li>
                    <li>• Perfect for online meetings</li>
                    <li>• Combines with microphone input</li>
                    <li>• Browser-based implementation</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Processing Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Transcription Mode</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Speaker diarization included</li>
                    <li>• Support for multiple speakers</li>
                    <li>• Automatic speaker labeling</li>
                    <li>• Higher cost per minute</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Notes Mode</h5>
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
                <li>• Copy to clipboard functionality</li>
                <li>• Summary generation</li>
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
                <li>• Enable device audio recording for online meetings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Getting Better Results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use transcription mode for multi-speaker content</li>
                <li>• Use notes mode for single-speaker recordings</li>
                <li>• Generate summaries for long recordings</li>
                <li>• Save important recordings to cloud storage</li>
                <li>• Switch modes based on your content type</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Managing Costs</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check cost estimates before processing</li>
                <li>• Use notes mode to reduce costs for single speakers</li>
                <li>• Enable auto-download to avoid re-processing</li>
                <li>• Review your usage patterns regularly</li>
                <li>• Monitor your credit balance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 