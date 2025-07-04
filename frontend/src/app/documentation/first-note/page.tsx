"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, Save, Download, RotateCcw } from "lucide-react"

export default function FirstNotePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Your First Note</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Notes mode is perfect for lectures, solo podcasts, and personal memos. Follow these steps to create your first note using our live recording feature.
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
                <h4 className="font-semibold">Switch to Notes Mode</h4>
                <p className="text-sm text-muted-foreground">Use the toggle in the sidebar to switch to <b>Notes Mode</b>. This mode is optimized for single-speaker content and provides a cleaner, note-like output.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Select Your Microphone</h4>
                <p className="text-sm text-muted-foreground">Choose from available audio devices in the microphone dropdown. Notes mode works best with clear, single-speaker audio.</p>
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
                <p className="text-sm text-muted-foreground">Click stop to end recording. Your audio is then processed to generate a clean, note-like transcription without speaker labels.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">5</span>
              </div>
              <div>
                <h4 className="font-semibold">Review and Export</h4>
                <p className="text-sm text-muted-foreground">Review your note, then export as PDF, copy to clipboard, or generate a summary. Notes mode provides a cleaner, more readable format.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes Mode Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Cost Efficiency</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lower cost per minute than transcription mode</li>
                <li>• Optimized for single-speaker content</li>
                <li>• Faster processing time</li>
                <li>• Ideal for budget-conscious users</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Output Quality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clean, note-like format</li>
                <li>• No speaker labels to clutter the text</li>
                <li>• Better for reading and editing</li>
                <li>• Perfect for documentation</li>
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
            <li>• Use a good quality microphone for clear audio</li>
            <li>• Minimize background noise</li>
            <li>• Speak clearly and at a steady pace</li>
            <li>• Use notes mode for lectures, podcasts, and personal recordings</li>
            <li>• Switch to transcription mode if you have multiple speakers</li>
            <li>• Generate summaries for longer recordings to capture key points</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 