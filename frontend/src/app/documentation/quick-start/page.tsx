"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, FileText, Clock, Shield, Zap, Users, Database } from "lucide-react"

export default function QuickStartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Welcome to Nexogen AI! This quick start guide will help you get up and running with our transcription service in just a few minutes. Learn how to create your first transcription and explore our powerful features.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Getting Started in 3 Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Create Your Account</h4>
                <p className="text-sm text-muted-foreground">Sign up for a free account and verify your email address to get started.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Choose Your Method</h4>
                <p className="text-sm text-muted-foreground">Select between live recording or file upload based on your needs.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Get Your Transcription</h4>
                <p className="text-sm text-muted-foreground">Receive accurate transcriptions with speaker identification and timestamps.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Live Recording
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Perfect for meetings, interviews, and professional transcription needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">How to Use</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click the microphone button to start recording</li>
                  <li>• Speak clearly into your microphone</li>
                  <li>• Watch transcription results appear</li>
                  <li>• Click stop when finished</li>
                  <li>• Download or copy your transcription</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Best For</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business meetings and calls</li>
                  <li>• Interviews and conversations</li>
                  <li>• Lectures and presentations</li>
                  <li>• Quick voice notes</li>
                  <li>• Professional documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ideal for existing audio files, podcasts, and batch processing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">How to Use</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Drag and drop audio files or click to browse</li>
                  <li>• Select language and processing options</li>
                  <li>• Enable speaker diarization if needed</li>
                  <li>• Wait for processing to complete</li>
                  <li>• Download in your preferred format</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Supported Formats</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Audio: MP3, WAV, M4A, FLAC, OGG</li>
                  <li>• Video: MP4, AVI, MOV, MKV, WebM</li>
                  <li>• Up to 2GB per file</li>
                  <li>• Up to 4 hours duration</li>
                  <li>• Batch upload available</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Key Features to Explore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Speaker Diarization</h4>
                  <p className="text-sm text-muted-foreground">Automatically identify and label different speakers in your recordings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Precise Timestamps</h4>
                  <p className="text-sm text-muted-foreground">Every word and sentence comes with exact timing for easy navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-muted-foreground">Save your transcriptions securely in the cloud for easy access</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">Your audio and transcriptions are encrypted for maximum security</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multiple Export Formats</h4>
                  <p className="text-sm text-muted-foreground">Export as PDF, TXT, SRT, VTT, JSON, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Note-taking Mode</h4>
                  <p className="text-sm text-muted-foreground">Simplified transcription without speaker labels for faster processing</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Learn More</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <a href="/documentation/first-note" className="underline">Create your first note</a> - Learn about note-taking mode</li>
                <li>• <a href="/documentation/first-transcription" className="underline">Create your first transcription</a> - Step-by-step guide</li>
                <li>• <a href="/documentation/live-recording" className="underline">Live Recording</a> - Detailed live recording guide</li>
                <li>• <a href="/documentation/file-upload" className="underline">File Upload</a> - Complete file upload documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Get Help</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check our <a href="/documentation#faq" className="underline">FAQ section</a> for common questions</li>
                <li>• Contact support at support@nexogen.ai</li>
                <li>• Join our community for tips and best practices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 