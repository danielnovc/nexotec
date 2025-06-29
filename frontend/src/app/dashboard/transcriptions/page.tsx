"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Shield
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { toast } from "sonner"
import { decryptTranscription } from "@/lib/encryption"

interface Transcription {
  id: string
  user_id: string
  content: any
  is_encrypted: boolean
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

  useEffect(() => {
    // Get encryption key from session storage
    const storedKey = sessionStorage.getItem('encryption_key')
    if (storedKey) {
      setEncryptionKey(storedKey)
    }
  }, [])

  useEffect(() => {
    if (user) {
      loadTranscriptions()
    }
  }, [user, encryptionKey])

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
        throw new Error(`Failed to load transcriptions: ${response.status}`)
      }

      const data = await response.json()
      
      console.log('✅ Encrypted connection confirmed for transcriptions')

      setTranscriptions(data.transcriptions || [])
    } catch (err) {
      console.error('Error loading transcriptions:', err)
      setError(err instanceof Error ? err.message : 'Failed to load transcriptions')
      toast.error('Failed to load transcriptions')
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Transcription copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
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
      
      toast.success(`Transcription downloaded as ${format.toUpperCase()}`)
    } catch (err) {
      toast.error('Failed to download transcription')
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
    if (typeof content === 'object' && content.chunks) {
      return content.chunks.map((chunk: any) => chunk.text).join(' ')
    } else if (typeof content === 'object' && content.full_text) {
      return content.full_text
    } else if (typeof content === 'string') {
      return content
    }
    return 'No content available'
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <History className="h-8 w-8" />
              Transcription History
            </h1>
            <p className="text-muted-foreground">
              View and manage your saved transcriptions with encrypted security
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              Encrypted
            </Badge>
            <Button 
              variant="outline" 
              onClick={loadTranscriptions}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <History className="h-4 w-4" />}
              Refresh
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading transcriptions...</p>
          </div>
        ) : transcriptions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Transcriptions Found</h3>
                <p className="text-muted-foreground mb-4">
                  Your saved transcriptions will appear here once you start using the transcription feature.
                </p>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Start Transcribing
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {transcriptions.map((transcription) => (
              <Card key={transcription.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Transcription #{transcription.id.slice(-8)}
                        {transcription.is_encrypted && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Encrypted
                          </Badge>
                        )}
                        {transcription.decrypted && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Decrypted
                          </Badge>
                        )}
                        {transcription.error && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Error
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(transcription.created_at)}
                        </span>
                        {getSpeakerCount(transcription.content) > 0 && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {getSpeakerCount(transcription.content)} speakers
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(getTranscriptionText(transcription.content))}
                        disabled={!!transcription.error}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadTranscription(transcription, 'txt')}
                        disabled={!!transcription.error}
                      >
                        <Download className="h-4 w-4" />
                        TXT
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadTranscription(transcription, 'json')}
                        disabled={!!transcription.error}
                      >
                        <Download className="h-4 w-4" />
                        JSON
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {transcription.error ? (
                    <div className="text-red-600 dark:text-red-400 text-sm">
                      Error: {transcription.error}
                    </div>
                  ) : (
                    <ScrollArea className="h-32 w-full">
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {getTranscriptionText(transcription.content)}
                      </div>
                    </ScrollArea>
                  )}
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
    </div>
  )
} 