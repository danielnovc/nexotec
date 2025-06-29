"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EditableText } from "@/components/editable-text"
import { 
  FileText, 
  Download, 
  Copy, 
  Clock, 
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle,
  Lock,
  RefreshCw,
  Shield,
  Eye,
  ChevronUp
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { toast } from "sonner"

interface Note {
  id: string
  user_id: string
  content: any
  is_encrypted: boolean
  created_at: string
  updated_at: string
  decrypted?: boolean
  error?: string
}

export default function NotesPage() {
  const { user } = useAuth()
  const { credits } = useCredits()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [encryptionKey, setEncryptionKey] = useState("")
  const [expandedNote, setExpandedNote] = useState<string | null>(null)

  useEffect(() => {
    // Get encryption key from session storage
    const storedKey = sessionStorage.getItem('encryption_key')
    if (storedKey) {
      setEncryptionKey(storedKey)
    }
  }, [])

  useEffect(() => {
    if (user) {
      loadNotes()
    }
  }, [user, encryptionKey])

  const loadNotes = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        userId: user.id,
        ...(encryptionKey && { encryptionKey })
      })

      const response = await fetch(`/api/load-notes?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': crypto.randomUUID(),
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to load notes: ${response.status}`)
      }

      const data = await response.json()
      
      console.log('✅ Encrypted connection confirmed for notes')

      setNotes(data.notes || [])
    } catch (err) {
      console.error('Error loading notes:', err)
      setError(err instanceof Error ? err.message : 'Failed to load notes')
      toast.error('Failed to load notes')
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
      toast.success('Note copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadNote = (note: Note, format: 'txt' | 'json') => {
    try {
      let content = note.content
      let filename = `note-${note.id}`

      if (format === 'txt') {
        if (typeof content === 'object' && content.full_text) {
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
      
      toast.success(`Note downloaded as ${format.toUpperCase()}`)
    } catch (err) {
      toast.error('Failed to download note')
    }
  }

  const getNoteText = (content: any) => {
    if (typeof content === 'object' && content.full_text) {
      return content.full_text
    } else if (typeof content === 'string') {
      return content
    }
    return 'No content available'
  }

  const generatePDF = async (note: Note) => {
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
      
      // Parse the note content
      let noteData: any[] = []
      let noteText = ''
      
      if (typeof note.content === 'string') {
        try {
          const parsed = JSON.parse(note.content)
          if (Array.isArray(parsed)) {
            noteData = parsed
            noteText = parsed.map((item: any) => item.text || item).join(' ')
          } else if (parsed.full_text) {
            noteText = parsed.full_text
            noteData = [{ text: parsed.full_text }]
          } else {
            noteText = note.content
            noteData = [{ text: note.content }]
          }
        } catch {
          noteText = note.content
          noteData = [{ text: note.content }]
        }
      } else if (Array.isArray(note.content)) {
        noteData = note.content
        noteText = noteData.map((item: any) => item.text || item).join(' ')
      } else if (typeof note.content === 'object' && note.content.full_text) {
        noteText = note.content.full_text
        noteData = [{ text: note.content.full_text }]
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
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #555555;">Notes Report</h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666;">
              Generated on ${new Date(note.created_at).toLocaleDateString()} at ${new Date(note.created_at).toLocaleTimeString()}
            </p>
          </div>

          <!-- Metadata -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 16px; background-color: #f5f5f5; border-radius: 8px; border: 1px solid #dddddd;">
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Created</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${new Date(note.created_at).toLocaleDateString()}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Words</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${noteText.split(' ').length}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Characters</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${noteText.length}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 12px; color: #666666; margin-bottom: 4px;">Status</div>
              <div style="font-size: 16px; font-weight: 600; color: #333333;">${note.is_encrypted ? 'Encrypted' : 'Plain Text'}</div>
            </div>
          </div>

          <!-- Notes Section -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #333333; display: flex; align-items: center; gap: 8px;">
              <span style="width: 16px; height: 16px; background-color: #10b981; border-radius: 4px;"></span>
              Notes Content
            </h3>
            <div style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px; min-height: 200px;">
              ${noteData.map((item, index) => `
                <div style="margin-bottom: 16px;">
                  <div style="font-size: 14px; line-height: 1.6; color: #333333; white-space: pre-line;">${item.text}</div>
                  ${item.start ? `<div style="font-size: 11px; color: #666666; margin-top: 4px;">${item.start}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #dddddd; color: #666666; font-size: 12px;">
            <p style="margin: 0;">Generated by Nexogen AI Notes Service</p>
            <p style="margin: 4px 0 0 0;">All notes are processed with advanced AI technology</p>
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
      const filename = `note-${note.id.slice(-8)}-${new Date().toISOString().split('T')[0]}.pdf`
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
          <p className="text-muted-foreground">Please log in to view your notes history.</p>
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
              <FileText className="h-8 w-8" />
              Notes History
            </h1>
            <p className="text-muted-foreground">
              View and manage your saved notes with encrypted security
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              Encrypted
            </Badge>
            <Button 
              variant="outline" 
              onClick={loadNotes}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
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
            <p className="text-muted-foreground">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Notes Found</h3>
                <p className="text-muted-foreground mb-4">
                  Your saved notes will appear here once you start using the note-taking feature.
                </p>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Start Taking Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => {
              const isExpanded = expandedNote === note.id
              const noteText = getNoteText(note.content)
              
              return (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Note #{note.id.slice(-8)}
                          {note.is_encrypted && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              Encrypted
                            </Badge>
                          )}
                          {note.decrypted && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Decrypted
                            </Badge>
                          )}
                          {note.error && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Error
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(note.created_at)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                          disabled={!!note.error}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {isExpanded ? 'Hide' : 'View'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(noteText)}
                          disabled={!!note.error}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadNote(note, 'txt')}
                          disabled={!!note.error}
                        >
                          <Download className="h-4 w-4" />
                          TXT
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadNote(note, 'json')}
                          disabled={!!note.error}
                        >
                          <Download className="h-4 w-4" />
                          JSON
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePDF(note)}
                          disabled={!!note.error}
                        >
                          <Download className="h-4 w-4" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {note.error ? (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        Error: {note.error}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Preview */}
                        <div>
                          <ScrollArea className="h-20 w-full">
                            <EditableText
                              text={noteText.length > 200 
                                ? `${noteText.substring(0, 200)}...` 
                                : noteText
                              }
                              itemId={note.id}
                              itemType="note"
                              encryptionKey={encryptionKey}
                              onUpdate={loadNotes}
                              className="text-sm text-muted-foreground"
                            />
                          </ScrollArea>
                        </div>
                        
                        {/* Expanded View */}
                        {isExpanded && (
                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Full Note</h4>
                              <Badge variant="outline" className="text-xs">
                                {noteText.split(' ').length} words
                              </Badge>
                            </div>
                            <ScrollArea className="h-64 w-full border rounded-md p-4">
                              <EditableText
                                text={noteText}
                                itemId={note.id}
                                itemType="note"
                                encryptionKey={encryptionKey}
                                onUpdate={loadNotes}
                                className="text-sm"
                              />
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>All notes are loaded securely via encrypted connection</p>
          <p className="mt-1">Total notes: {notes.length}</p>
        </div>
      </div>
    </div>
  )
} 