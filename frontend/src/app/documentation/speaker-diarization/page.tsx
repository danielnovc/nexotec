"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mic, FileText, Clock, Download, Shield, Database, Zap, CreditCard } from "lucide-react"

export default function SpeakerDiarizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Speaker Diarization</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Speaker diarization automatically identifies and labels different speakers in your audio recordings. This powerful feature helps you distinguish between multiple speakers, making it perfect for meetings, interviews, panel discussions, and any multi-speaker content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            How Speaker Diarization Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Audio Analysis</h4>
                <p className="text-sm text-muted-foreground">Your audio is analyzed to identify unique voice patterns and characteristics of each speaker.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Speaker Detection</h4>
                <p className="text-sm text-muted-foreground">The system automatically detects when different speakers are talking and assigns unique labels to each.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Transcription with Labels</h4>
                <p className="text-sm text-muted-foreground">Each word and sentence is transcribed with precise speaker labels and timestamps for easy reference.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Customization Options</h4>
                <p className="text-sm text-muted-foreground">Customize speaker names, adjust detection sensitivity, and fine-tune the results to match your needs.</p>
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
                <Users className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multi-Speaker Support</h4>
                  <p className="text-sm text-muted-foreground">Accurately identify and label multiple speakers in any recording</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Precise Timestamps</h4>
                  <p className="text-sm text-muted-foreground">Every speaker change is marked with exact timing for easy navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Custom Speaker Names</h4>
                  <p className="text-sm text-muted-foreground">Replace generic labels with actual names for better readability</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure Processing</h4>
                  <p className="text-sm text-muted-foreground">Your audio and speaker data are processed securely with optional encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-muted-foreground">Save speaker-labeled transcriptions to cloud storage for easy access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multiple Formats</h4>
                  <p className="text-sm text-muted-foreground">Export with speaker labels in PDF, TXT, JSON, and other formats</p>
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
                <h4 className="font-semibold mb-2">Business Meetings</h4>
                <p className="text-sm text-muted-foreground">Track who said what in team meetings, client calls, and conference calls for better follow-up and accountability.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interviews & Podcasts</h4>
                <p className="text-sm text-muted-foreground">Distinguish between interviewer and interviewee, or multiple guests in podcast recordings.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Proceedings</h4>
                <p className="text-sm text-muted-foreground">Accurately attribute statements to specific speakers in depositions, court hearings, and legal consultations.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Panel Discussions</h4>
                <p className="text-sm text-muted-foreground">Identify different panelists and moderators in conferences, webinars, and group discussions.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Medical Consultations</h4>
                <p className="text-sm text-muted-foreground">Distinguish between healthcare providers and patients for accurate medical documentation.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Educational Content</h4>
                <p className="text-sm text-muted-foreground">Track multiple instructors, students, and participants in educational recordings and training sessions.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Speaker Detection Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Detection Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Automatic Detection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatically identify all speakers</li>
                    <li>• Assign generic labels (Speaker 1, Speaker 2, etc.)</li>
                    <li>• Optimized for most recording scenarios</li>
                    <li>• Works with 2+ speakers</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Custom Configuration</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Specify expected number of speakers</li>
                    <li>• Adjust detection sensitivity</li>
                    <li>• Set minimum speaker duration</li>
                    <li>• Fine-tune for specific scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Speaker Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Custom Names</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Replace generic labels with real names</li>
                    <li>• Add speaker roles or titles</li>
                    <li>• Maintain consistency across recordings</li>
                    <li>• Export with custom speaker names</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Speaker Profiles</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Save speaker information for reuse</li>
                    <li>• Quick speaker identification</li>
                    <li>• Consistent labeling across projects</li>
                    <li>• Team collaboration features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Example Output:</h4>
              <div className="text-sm space-y-2">
                <p><span className="font-semibold">[00:00:05] Speaker 1:</span> Welcome everyone to today's meeting.</p>
                <p><span className="font-semibold">[00:00:08] Speaker 2:</span> Thank you for organizing this.</p>
                <p><span className="font-semibold">[00:00:12] Speaker 1:</span> Let's start with the agenda items.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Format Options</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PDF with speaker labels and timestamps</li>
                  <li>• Plain text with speaker indicators</li>
                  <li>• JSON with detailed speaker metadata</li>
                  <li>• CSV for data analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Speaker time statistics</li>
                  <li>• Turn-taking analysis</li>
                  <li>• Speaker overlap detection</li>
                  <li>• Export speaker segments separately</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Transparent Pricing</h4>
                <p className="text-sm text-muted-foreground">Speaker diarization adds a small additional cost per minute to your transcription, clearly shown before processing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Processing Time</h4>
                <p className="text-sm text-muted-foreground">Speaker identification adds minimal processing time to your transcription, typically just a few extra minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Accuracy</h4>
                <p className="text-sm text-muted-foreground">High accuracy speaker detection works best with clear audio and distinct speaker voices.</p>
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
              <h4 className="font-semibold mb-2">Recording Quality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use high-quality microphones for each speaker</li>
                <li>• Minimize background noise and echo</li>
                <li>• Ensure speakers don't talk over each other</li>
                <li>• Maintain consistent audio levels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Getting Better Results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Specify the expected number of speakers</li>
                <li>• Use custom speaker names for clarity</li>
                <li>• Review and adjust speaker assignments if needed</li>
                <li>• Save speaker profiles for future recordings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Workflow Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Export in appropriate formats for your needs</li>
                <li>• Use speaker statistics for meeting analysis</li>
                <li>• Share transcripts with speaker labels for better collaboration</li>
                <li>• Archive speaker profiles for team consistency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 