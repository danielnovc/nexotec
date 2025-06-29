"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Edit2, X, Check } from 'lucide-react'

interface EditableTextProps {
  text: string
  itemId: string
  itemType: 'transcription' | 'note'
  encryptionKey: string
  onUpdate?: () => void
  className?: string
}

export function EditableText({ 
  text, 
  itemId, 
  itemType, 
  encryptionKey, 
  onUpdate,
  className = "" 
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedWord, setSelectedWord] = useState('')
  const [newWord, setNewWord] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [words, setWords] = useState<string[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Split text into words while preserving punctuation and spacing
    const wordRegex = /\b\w+\b/g
    const wordMatches = text.match(wordRegex) || []
    setWords(wordMatches)
  }, [text])

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    setNewWord(word)
    setIsEditing(true)
  }

  const handleUpdate = async () => {
    if (!newWord.trim() || newWord === selectedWord) {
      setIsEditing(false)
      return
    }

    setIsUpdating(true)

    try {
      const endpoint = itemType === 'transcription' ? '/api/update-transcription' : '/api/update-note'
      const payload = {
        [itemType === 'transcription' ? 'transcriptionId' : 'noteId']: itemId,
        originalWord: selectedWord,
        newWord: newWord.trim(),
        encryptionKey
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update')
      }

      toast.success(`Word updated successfully`)
      setIsEditing(false)
      
      // Call the onUpdate callback to refresh the parent component
      if (onUpdate) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error updating word:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update word')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  // Render text with clickable words
  const renderText = () => {
    const wordRegex = /\b\w+\b/g
    const parts = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = wordRegex.exec(text)) !== null) {
      // Add text before the word
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.slice(lastIndex, match.index)}
          </span>
        )
      }

      // Add the clickable word
      parts.push(
        <button
          key={`word-${match.index}`}
          onClick={() => handleWordClick(match![0])}
          className="hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 px-1 py-0.5 rounded transition-colors duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
          title="Click to edit this word"
        >
          {match[0]}
        </button>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex)}
        </span>
      )
    }

    return parts
  }

  return (
    <>
      <div className={`whitespace-pre-wrap ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Edit2 className="h-3 w-3" />
            <span>Click any word to edit</span>
          </div>
        </div>
        {renderText()}
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent ref={dialogRef} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Edit Word
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Original word:
              </label>
              <div className="mt-1 p-2 bg-muted rounded-md text-sm">
                "{selectedWord}"
              </div>
            </div>
            <div>
              <label htmlFor="newWord" className="text-sm font-medium">
                New word:
              </label>
              <Input
                id="newWord"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter the corrected word"
                className="mt-1"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isUpdating}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating || !newWord.trim() || newWord === selectedWord}
              >
                {isUpdating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 