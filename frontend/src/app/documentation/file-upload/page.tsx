"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, AudioLines, Video, Clock, Download, Shield, Zap, Users, Database, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FileUploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">File Upload</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary">Coming Soon</Badge>
          <p className="text-muted-foreground">
            File upload functionality is currently in development. For now, please use our live recording feature for transcription.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Current Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our file upload feature is currently being developed and will be available soon. This will allow you to upload existing audio and video files for transcription.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Use Live Recording Instead</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              While file upload is being developed, you can use our live recording feature which provides the same high-quality transcription with speaker diarization and timestamps.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Planned Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AudioLines className="h-4 w-4" />
                Audio Formats
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• MP3 (up to 320 kbps)</li>
                <li>• WAV (PCM, 16-bit, 44.1kHz)</li>
                <li>• M4A (AAC encoding)</li>
                <li>• FLAC (lossless compression)</li>
                <li>• OGG (Vorbis encoding)</li>
                <li>• WMA (Windows Media Audio)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Formats
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• MP4 (H.264 video, AAC audio)</li>
                <li>• AVI (various codecs)</li>
                <li>• MOV (QuickTime format)</li>
                <li>• MKV (Matroska format)</li>
                <li>• WebM (VP8/VP9 video)</li>
                <li>• FLV (Flash Video)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Planned Upload Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Select Files</h4>
                <p className="text-sm text-muted-foreground">Drag and drop files or click to browse. You'll be able to upload multiple files at once for batch processing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Configure Settings</h4>
                <p className="text-sm text-muted-foreground">Choose language, enable speaker diarization, and set processing options before upload.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Upload & Process</h4>
                <p className="text-sm text-muted-foreground">Files will be securely uploaded and processed using our AI transcription engine.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">Download Results</h4>
                <p className="text-sm text-muted-foreground">Download transcriptions in multiple formats including PDF, TXT, SRT, and VTT.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Planned Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Speaker Diarization</h4>
                  <p className="text-sm text-muted-foreground">Automatically identify and label different speakers in your audio files</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Language Detection</h4>
                  <p className="text-sm text-muted-foreground">Automatic language detection for 50+ languages and dialects</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Timestamp Generation</h4>
                  <p className="text-sm text-muted-foreground">Precise timestamps for every word and sentence in the transcription</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Cloud Storage</h4>
                  <p className="text-sm text-muted-foreground">Secure cloud storage for your files and transcriptions with easy access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Multiple Export Formats</h4>
                  <p className="text-sm text-muted-foreground">Export in PDF, TXT, SRT, VTT, JSON, and other formats</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <h4 className="font-semibold">Batch Processing</h4>
                  <p className="text-sm text-muted-foreground">Upload and process multiple files simultaneously for efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planned File Size & Duration Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">File Size</h3>
              <p className="text-sm text-muted-foreground">Up to 2GB per file</p>
              <p className="text-xs text-muted-foreground mt-1">Larger files supported for enterprise plans</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-sm text-muted-foreground">Up to 4 hours per file</p>
              <p className="text-xs text-muted-foreground mt-1">Longer files supported for enterprise plans</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Batch Upload</h3>
              <p className="text-sm text-muted-foreground">Up to 10 files at once</p>
              <p className="text-xs text-muted-foreground mt-1">Higher limits for enterprise plans</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We'll notify you when file upload functionality becomes available. In the meantime, you can:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use our live recording feature for immediate transcription needs</li>
            <li>• Check our documentation for updates</li>
            <li>• Contact support for any questions about upcoming features</li>
            <li>• Follow our development progress</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 