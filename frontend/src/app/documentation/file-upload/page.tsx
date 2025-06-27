"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, AudioLines, Video, Clock, Download, Shield, Zap, Users, Database } from "lucide-react"

export default function FileUploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">File Upload</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Nexogen AI's file upload feature allows you to upload audio and video files for transcription. Support multiple formats, batch processing, and secure cloud storage with advanced speaker diarization and language detection.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Supported File Formats
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
            Upload Process
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
                <p className="text-sm text-muted-foreground">Drag and drop files or click to browse. You can upload multiple files at once for batch processing.</p>
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
                <p className="text-sm text-muted-foreground">Files are securely uploaded and processed using our AI transcription engine.</p>
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
            Advanced Features
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
          <CardTitle>File Size & Duration Limits</CardTitle>
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
          <CardTitle>Processing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Language Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Automatic Detection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI-powered language detection</li>
                    <li>• Supports 50+ languages</li>
                    <li>• Handles mixed-language content</li>
                    <li>• Dialect recognition</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Manual Selection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Choose specific language</li>
                    <li>• Improved accuracy for known languages</li>
                    <li>• Faster processing time</li>
                    <li>• Better handling of accents</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Speaker Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Speaker Diarization</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic speaker identification</li>
                    <li>• Up to 10 speakers per file</li>
                    <li>• Speaker labels (Speaker 1, Speaker 2, etc.)</li>
                    <li>• Custom speaker naming</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Single Speaker</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Optimized for monologue content</li>
                    <li>• Faster processing</li>
                    <li>• Lower cost per minute</li>
                    <li>• Ideal for podcasts and lectures</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Output Formats</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">Text Formats</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Plain text (.txt)</li>
                    <li>• Rich text with timestamps</li>
                    <li>• JSON with metadata</li>
                    <li>• CSV for data analysis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Subtitle Formats</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SRT (SubRip)</li>
                    <li>• VTT (WebVTT)</li>
                    <li>• ASS/SSA subtitles</li>
                    <li>• Custom timestamp formats</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">End-to-End Encryption</h4>
                <p className="text-sm text-muted-foreground">All files are encrypted during upload, processing, and storage to ensure maximum security.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Secure Storage</h4>
                <p className="text-sm text-muted-foreground">Files are stored in secure, EU-based data centers with redundant backups and disaster recovery.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Automatic Deletion</h4>
                <p className="text-sm text-muted-foreground">Files are automatically deleted after processing unless you choose to save them permanently.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Access Control</h4>
                <p className="text-sm text-muted-foreground">Only you have access to your files and transcriptions. No third-party access is permitted.</p>
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
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">File Preparation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use high-quality audio files (16-bit, 44.1kHz or higher)</li>
                <li>• Ensure clear audio with minimal background noise</li>
                <li>• Avoid heavily compressed formats for better accuracy</li>
                <li>• Split very long files into smaller segments if needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Processing Optimization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Choose the correct language for better accuracy</li>
                <li>• Enable speaker diarization for multi-speaker content</li>
                <li>• Use batch upload for multiple files to save time</li>
                <li>• Check processing status regularly for large files</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Output Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Download results promptly to avoid expiration</li>
                <li>• Use appropriate export formats for your needs</li>
                <li>• Review and edit transcriptions for accuracy</li>
                <li>• Save important files to cloud storage for backup</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 