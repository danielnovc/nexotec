"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, Save, Download } from "lucide-react"

export default function FirstNotePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Your First Note</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Note-taking mode is perfect for lectures, solo podcasts, and personal memos. Follow these steps to create your first note.
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
                <h4 className="font-semibold">Select Note-taking Mode</h4>
                <p className="text-sm text-muted-foreground">On the dashboard, choose <b>Note-taking Mode</b> before you start recording or uploading your audio.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Record or Upload Audio</h4>
                <p className="text-sm text-muted-foreground">Click the microphone to record, or upload an audio file. Note-taking mode works best for single-speaker content.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Review and Edit</h4>
                <p className="text-sm text-muted-foreground">Once processing is complete, review your note. You can edit the text directly in the editor for clarity or corrections.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Save or Export</h4>
                <p className="text-sm text-muted-foreground">Save your note to the cloud, or export it as PDF, TXT, or copy to clipboard for use elsewhere.</p>
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
            <li>• Use a good quality microphone for clear audio</li>
            <li>• Minimize background noise</li>
            <li>• Speak clearly and at a steady pace</li>
            <li>• Edit your note for accuracy before saving or exporting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 