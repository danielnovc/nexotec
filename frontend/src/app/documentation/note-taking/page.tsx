"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, Save, Download, Clock, Users, Zap, Shield, Database, CreditCard } from "lucide-react"

export default function NoteTakingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Note-taking Mode</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Note-taking Mode is a streamlined transcription feature perfect for single-speaker recordings where you don't need speaker identification. Get faster processing, lower costs, and clean text output ideal for lectures, podcasts, personal notes, and solo presentations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            How Note-taking Mode Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Enable Note-taking Mode</h4>
                <p className="text-sm text-muted-foreground">Toggle the "Take Notes" option in your recording settings to activate this simplified mode.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Simplified Processing</h4>
                <p className="text-sm text-muted-foreground">Your audio is processed without speaker identification, resulting in faster processing times.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Clean Text Output</h4>
                <p className="text-sm text-muted-foreground">Receive continuous text with timestamps but without speaker labels, perfect for note-taking and content creation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Save & Export</h4>
                <p className="text-sm text-muted-foreground">Save your notes to cloud storage with optional encryption, or export in various formats for further editing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Key Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Faster Processing</h4>
                  <p className="text-sm text-muted-foreground">Skip speaker identification for quicker transcription results</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Lower Cost</h4>
                  <p className="text-sm text-muted-foreground">Reduced processing costs compared to full speaker identification</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Clean Output</h4>
                  <p className="text-sm text-muted-foreground">Continuous text without speaker interruptions or labels</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure Processing</h4>
                  <p className="text-sm text-muted-foreground">Optional encryption for sensitive notes and transcriptions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-muted-foreground">Save notes to cloud storage with automatic backup</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multiple Formats</h4>
                  <p className="text-sm text-muted-foreground">Export as PDF, TXT, JSON, or copy to clipboard</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfect Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Academic Content</h4>
                <p className="text-sm text-muted-foreground">Transcribe lectures, presentations, and educational content where speaker identification isn't needed.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Podcasts & Media</h4>
                <p className="text-sm text-muted-foreground">Create transcripts for solo podcasts, interviews, and media content for accessibility and SEO.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Personal Notes</h4>
                <p className="text-sm text-muted-foreground">Capture personal thoughts, ideas, and voice memos with clean, searchable text output.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Content Creation</h4>
                <p className="text-sm text-muted-foreground">Generate transcripts for videos, webinars, and online courses for better accessibility.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Research & Documentation</h4>
                <p className="text-sm text-muted-foreground">Document research findings, field notes, and observations with precise timestamps.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Solo Presentations</h4>
                <p className="text-sm text-muted-foreground">Transcribe solo presentations, speeches, and monologues for review and sharing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What You Get</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Processing Details</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High-accuracy transcription</li>
                <li>• Automatic language detection</li>
                <li>• Precise timestamps</li>
                <li>• Clean text formatting</li>
                <li>• Multiple language support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Output Format</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Continuous text with timestamps</li>
                <li>• No speaker labels or interruptions</li>
                <li>• Clean paragraph formatting</li>
                <li>• Preserved punctuation and structure</li>
                <li>• Detailed metadata available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Note-taking Mode</h3>
              <p className="text-sm text-muted-foreground mb-2">Simplified processing</p>
              <p className="text-lg font-bold">Lower Cost</p>
              <p className="text-xs text-muted-foreground">Faster processing time</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Full Speaker ID</h3>
              <p className="text-sm text-muted-foreground mb-2">Complete processing</p>
              <p className="text-lg font-bold">Higher Cost</p>
              <p className="text-xs text-muted-foreground">Includes speaker detection</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Optional Encryption</h4>
                <p className="text-sm text-muted-foreground">Enable encryption for sensitive notes and transcriptions with automatic key generation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Cloud Storage Options</h4>
                <p className="text-sm text-muted-foreground">Save notes to cloud storage or local storage with automatic backup and version control.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Automatic Cleanup</h4>
                <p className="text-sm text-muted-foreground">Temporary files are automatically deleted after processing unless saved to cloud storage.</p>
              </div>
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
              <h4 className="font-semibold mb-2">When to Use Note-taking Mode</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Single-speaker recordings (lectures, podcasts, presentations)</li>
                <li>• Content where speaker identification isn't important</li>
                <li>• Cost-sensitive projects with large audio files</li>
                <li>• Quick transcription needs with faster processing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Getting Better Results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use high-quality audio for better transcription accuracy</li>
                <li>• Enable auto-save to cloud storage for important notes</li>
                <li>• Use encryption for sensitive content</li>
                <li>• Export in appropriate formats for your workflow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Workflow Integration</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Copy transcriptions to note-taking apps</li>
                <li>• Use for content creation and editing</li>
                <li>• Integrate with document management systems</li>
                <li>• Share transcripts for accessibility compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 