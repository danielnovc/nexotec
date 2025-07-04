"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EditableText } from "@/components/editable-text"
import { 
  History, 
  Download, 
  Copy, 
  Clock, 
  FileText, 
  Users, 
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle,
  Lock,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { toast } from "sonner"
import { decryptTranscription } from "@/lib/encryption"
import { TwoFactorAuthModal } from "@/components/two-factor-auth-modal"
import { is2FAEnabled } from "@/lib/2fa-api"
import { useI18n } from "@/lib/i18n"

interface Transcription {
  id: string
  user_id: string
  title: string
  content: any
  duration: number
  credits_used: number
  take_notes: boolean
  is_encrypted: boolean
  encryption_metadata?: any
  created_at: string
  updated_at: string
  decrypted?: boolean
  error?: string
}

export default function TranscriptionsPage() {
  const { user } = useAuth()
  const { credits } = useCredits()
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [encryptionKey, setEncryptionKey] = useState("")
  const [expandedTranscription, setExpandedTranscription] = useState<string | null>(null)
  const [show2FA, setShow2FA] = useState(false)
  const [is2FAVerified, setIs2FAVerified] = useState(false)
  const [verificationSuccessful, setVerificationSuccessful] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    // Get encryption key from localStorage (same as settings page)
    const storedKey = localStorage.getItem('encryptionKey')
    if (storedKey) {
      setEncryptionKey(storedKey)
    } else {
      // Generate a new key if none exists
      const { generateEncryptionKey } = require('@/lib/encryption')
      const newKey = generateEncryptionKey()
      localStorage.setItem('encryptionKey', newKey)
      setEncryptionKey(newKey)
    }
  }, [])

  useEffect(() => {
    const check2FAAndLoad = async () => {
      if (user) {
        if (!is2FAVerified) {
          setShow2FA(true)
        } else {
          loadTranscriptions()
        }
      }
    }
    
    check2FAAndLoad()
  }, [user, encryptionKey, is2FAVerified])

  const loadTranscriptions = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        userId: user.id,
        ...(encryptionKey && { encryptionKey })
      })

      const response = await fetch(`/api/load-transcriptions?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': crypto.randomUUID(),
          'X-TLS-Version': '1.3'
        }
      })

      if (!response.ok) {
        throw new Error(`${t('failedToLoadTranscriptions')}: ${response.status}`)
      }

      const data = await response.json()
      
      console.log('✅ Encrypted connection confirmed for transcriptions')

      setTranscriptions(data.transcriptions || [])
    } catch (err) {
      console.error('Error loading transcriptions:', err)
      setError(err instanceof Error ? err.message : t('failedToLoadTranscriptions'))
      toast.error(t('failedToLoadTranscriptions'))
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatTimestamp = (timestamp: Date | number | undefined): string => {
    if (!timestamp) return '';
    
    // If it's a number (seconds), convert to minutes and seconds
    if (typeof timestamp === 'number') {
      const minutes = Math.floor(timestamp / 60);
      const seconds = Math.floor(timestamp % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // If it's a Date object, format it
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return '';
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(t('transcriptionCopiedToClipboard'))
    } catch (err) {
      toast.error(t('failedToCopyToClipboard'))
    }
  }

  const downloadTranscription = (transcription: Transcription, format: 'txt' | 'json') => {
    try {
      let content = transcription.content
      let filename = `transcription-${transcription.id}`

      if (format === 'txt') {
        if (typeof content === 'object' && content.chunks) {
          content = content.chunks.map((chunk: any) => 
            `[${chunk.speaker || 'Unknown'}] ${chunk.text}`
          ).join('\n\n')
        } else if (typeof content === 'object' && content.full_text) {
          content = content.full_text
        } else if (typeof content === 'string') {
          content = content
        }
        filename += '.txt'
      } else {
        content = JSON.stringify(content, null, 2)
        filename += '.json'
      }

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success(`${t('transcriptionDownloaded')} ${format.toUpperCase()}`)
    } catch (err) {
      toast.error(t('failedToDownloadTranscription'))
    }
  }

  const getSpeakerCount = (content: any) => {
    if (typeof content === 'object' && content.chunks) {
      const speakers = new Set(content.chunks.map((chunk: any) => chunk.speaker).filter(Boolean))
      return speakers.size
    }
    return 0
  }

  const getTranscriptionText = (content: any) => {
    if (!content) return t('noContentAvailable')
    
    // Handle decrypted content structure
    if (Array.isArray(content)) {
      // If content is an array of transcription objects
      return content.map((item: any) => item.text || item).join(' ')
    } else if (typeof content === 'object') {
      if (content.chunks && Array.isArray(content.chunks)) {
        // Handle chunks format
        return content.chunks.map((chunk: any) => chunk.text).join(' ')
      } else if (content.full_text) {
        // Handle full_text format
        return content.full_text
      } else if (content.transcription && Array.isArray(content.transcription)) {
        // Handle transcription array within object
        return content.transcription.map((item: any) => item.text || item).join(' ')
      } else {
        // Try to extract text from any object structure
        return JSON.stringify(content, null, 2)
      }
    } else if (typeof content === 'string') {
      return content
    }
    
    return t('noContentAvailable')
  }

  const getFormattedTranscription = (content: any) => {
    if (!content) return t('noContentAvailable')
    
    if (Array.isArray(content)) {
      return content.map((item: any, index: number) => {
        const timestamp = item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ''
        const speaker = item.speaker || 'Unknown'
        return `[${timestamp}] ${speaker}: ${item.text || item}`
      }).join('\n\n')
    } else if (typeof content === 'object') {
      if (content.chunks && Array.isArray(content.chunks)) {
        return content.chunks.map((chunk: any) => 
          `[${chunk.speaker || 'Unknown'}] ${chunk.text}`
        ).join('\n\n')
      } else if (content.full_text) {
        return content.full_text
      } else if (content.transcription && Array.isArray(content.transcription)) {
        return content.transcription.map((item: any, index: number) => {
          const timestamp = item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ''
          const speaker = item.speaker || 'Unknown'
          return `[${timestamp}] ${speaker}: ${item.text || item}`
        }).join('\n\n')
      }
    }
    
    return getTranscriptionText(content)
  }

  const generatePDF = async (transcription: Transcription) => {
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default

      // Create a temporary container for the PDF content
      const pdfContainer = document.createElement('div')
      pdfContainer.style.position = 'absolute'
      pdfContainer.style.left = '-9999px'
      pdfContainer.style.top = '0'
      pdfContainer.style.width = '800px'
      pdfContainer.style.padding = '40px'
      pdfContainer.style.backgroundColor = '#ffffff'
      pdfContainer.style.fontFamily = 'Arial, sans-serif'
      pdfContainer.style.color = '#000000'
      pdfContainer.style.fontSize = '14px'
      pdfContainer.style.lineHeight = '1.4'
      
      // Parse the transcription content
      let transcriptionData: any[] = []
      let isNotesMode = false
      
      if (typeof transcription.content === 'string') {
        try {
          const parsed = JSON.parse(transcription.content)
          if (Array.isArray(parsed)) {
            transcriptionData = parsed
          } else if (parsed.transcription && Array.isArray(parsed.transcription)) {
            transcriptionData = parsed.transcription
            isNotesMode = true
          } else if (parsed.chunks && Array.isArray(parsed.chunks)) {
            transcriptionData = parsed.chunks
          }
        } catch {
          transcriptionData = [{ text: transcription.content, speaker: 'Unknown' }]
        }
      } else if (Array.isArray(transcription.content)) {
        transcriptionData = transcription.content
      }
      
      // Create the PDF content HTML with explicit styles
      const pdfContent = `
        <div style="max-width: 720px; margin: 0 auto; font-family: Arial, sans-serif; color: #000000;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #cccccc; padding-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #ffffff; font-weight: bold; font-size: 16px;">N</span>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #333333;">Nexogen AI</h1>
            </div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #555555;">Transcription Report</h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666;">
              Generated on ${new Date(transcription.created_at).toLocaleDateString()} at ${new Date(transcription.created_at).toLocaleTimeString()}
            </p>
          </div>

          <!-- Metadata -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 16px; background-color: #f5f5f5; border-radius: 8px; border: 1px solid #dddddd;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Duration</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${transcription.duration ? formatDuration(transcription.duration) : 'N/A'}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Words</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${transcriptionData.reduce((acc, item) => acc + (item.text?.split(' ').length || 0), 0)}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Speakers</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${new Set(transcriptionData.map(item => item.speaker || 'Unknown')).size}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Cost</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">$${transcription.credits_used?.toFixed(2) || '0.00'}</div>
            </div>
          </div>

          <!-- Transcription Section -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #333333; display: flex; align-items: center; gap: 8px;">
              <span style="width: 16px; height: 16px; background-color: #10b981; border-radius: 4px;"></span>
              ${transcription.take_notes ? 'Notes' : 'Transcription'}
            </h3>
            <div style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px; min-height: 200px;">
              ${transcription.take_notes ? 
                // Notes mode - continuous text
                transcriptionData.map((item, index) => `
                  <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; line-height: 1.6; color: #333333; white-space: pre-line;">${item.text}</div>
                    <div style="font-size: 11px; color: #666666; margin-top: 4px;">${item.start ? formatTimestamp(item.start) : ''}</div>
                  </div>
                `).join('') :
                // Transcription mode - bubble style
                transcriptionData.map((item, index) => {
                  const speaker = item.speaker || 'Unknown';
                  const speakerNumber = speaker.replace(/[^0-9]/g, '');
                  const displaySpeaker = speakerNumber ? `Speaker ${parseInt(speakerNumber) + 1}` : speaker;
                  const speakerColors = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#f97316'];
                  const color = speakerColors[index % speakerColors.length];
                  const align = index % 2 === 0 ? 'left' : 'right';
                  
                  return `
                    <div style="display: flex; justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'}; margin-bottom: 16px;">
                      <div style="max-width: 70%; background-color: #f5f5f5; border: 1px solid #dddddd; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="display: flex; align-items: flex-start; gap: 8px;">
                          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; flex-shrink: 0; margin-top: 2px;"></div>
                          <div style="flex: 1;">
                            <div style="font-size: 11px; font-weight: 600; color: #666666; margin-bottom: 4px;">${displaySpeaker}</div>
                            <div style="font-size: 14px; line-height: 1.5; color: #333333; white-space: pre-line;">${item.text}</div>
                            <div style="font-size: 10px; color: #999999; margin-top: 4px;">${item.start ? formatTimestamp(item.start) : ''}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')
              }
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #dddddd; color: #666666; font-size: 12px;">
            <p style="margin: 0;">Generated by Nexogen AI Transcription Service</p>
            <p style="margin: 4px 0 0 0;">All transcriptions are processed with advanced AI technology</p>
          </div>
        </div>
      `
      
      pdfContainer.innerHTML = pdfContent
      document.body.appendChild(pdfContainer)

      // Convert to canvas with explicit settings
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: pdfContainer.scrollHeight,
        logging: false,
        removeContainer: true
      })

      // Remove the temporary container
      document.body.removeChild(pdfContainer)

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF
      const filename = `transcription-${transcription.id.slice(-8)}-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(filename)

      toast.success('PDF generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to view your transcription history.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Transcription History</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your saved transcriptions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={loadTranscriptions}
              disabled={loading}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <History className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : transcriptions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transcriptions found</h3>
                <p className="text-muted-foreground mb-4">
                  Your transcriptions will appear here once you start recording and saving them.
                </p>
                <Button asChild>
                  <a href="/dashboard">Start Recording</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {transcriptions.map((transcription) => (
              <Card key={transcription.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base lg:text-lg truncate">
                        {transcription.title || `Transcription ${transcription.id.slice(0, 8)}`}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="h-3 w-3" />
                          {formatDate(transcription.created_at)}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {transcription.is_encrypted && (
                        <Badge variant="secondary" className="text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Encrypted
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {transcription.take_notes ? 'Notes' : 'Transcription'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDuration(transcription.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{getSpeakerCount(transcription.content)} speakers</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Content Preview</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedTranscription(
                          expandedTranscription === transcription.id ? null : transcription.id
                        )}
                        className="h-6 px-2 text-xs"
                      >
                        {expandedTranscription === transcription.id ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    
                    {expandedTranscription === transcription.id ? (
                      <ScrollArea className="h-32 w-full rounded-md border p-2">
                        <div className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {getTranscriptionText(transcription.content)}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {getTranscriptionText(transcription.content)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(getTranscriptionText(transcription.content))}
                      className="flex-1 sm:flex-none text-xs"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadTranscription(transcription, 'txt')}
                      className="flex-1 sm:flex-none text-xs"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      Download TXT
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadTranscription(transcription, 'json')}
                      className="flex-1 sm:flex-none text-xs"
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Download JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>All transcriptions are loaded securely via encrypted connection</p>
          <p className="mt-1">Total transcriptions: {transcriptions.length}</p>
        </div>
      </div>

      {/* 2FA Modal */}
              <TwoFactorAuthModal
          isOpen={show2FA}
          onClose={() => {
            setShow2FA(false)
            // Only redirect if verification was not successful
            if (!verificationSuccessful) {
              window.location.href = '/dashboard'
            }
          }}
          onSuccess={() => {
            setIs2FAVerified(true)
            setVerificationSuccessful(true)
            setShow2FA(false)
            // Load transcriptions after successful verification
            loadTranscriptions()
          }}
          title={t('2fa.required')}
          description={t('2fa.enterCodeToAccessTranscriptions')}
          encryptionKey={encryptionKey}
        />
    </div>
  )
} 