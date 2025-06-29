import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { encryptTranscription, decryptTranscription } from '@/lib/encryption'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function PUT(request: NextRequest) {
  try {
    const { noteId, originalWord, newWord, encryptionKey } = await request.json()

    if (!noteId || !originalWord || !newWord || !encryptionKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the current note
    const { data: note, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single()

    if (fetchError || !note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    // Decrypt the content if it's encrypted
    let content = note.content
    if (note.is_encrypted && note.encryption_metadata) {
      try {
        content = await decryptTranscription(note.encryption_metadata, encryptionKey)
      } catch (decryptError) {
        return NextResponse.json(
          { error: 'Failed to decrypt note' },
          { status: 400 }
        )
      }
    }

    // Replace the word in the content
    let updatedContent = content
    let wordReplaced = false

    if (typeof content === 'string') {
      // Simple string replacement
      const regex = new RegExp(`\\b${originalWord}\\b`, 'gi')
      if (regex.test(content)) {
        updatedContent = content.replace(regex, newWord)
        wordReplaced = true
      }
    } else if (typeof content === 'object') {
      // Handle different content structures
      if (content.full_text) {
        // Handle full_text format
        updatedContent = {
          ...content,
          full_text: content.full_text.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), newWord)
        }
        wordReplaced = true
      } else if (Array.isArray(content)) {
        // Handle array format
        updatedContent = content.map((item: any) => ({
          ...item,
          text: item.text.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), newWord)
        }))
        wordReplaced = true
      }
    }

    if (!wordReplaced) {
      return NextResponse.json(
        { error: 'Word not found in note' },
        { status: 404 }
      )
    }

    // Encrypt the updated content if it was originally encrypted
    let finalContent = updatedContent
    let encryptionMetadata = note.encryption_metadata

    if (note.is_encrypted) {
      try {
        const encrypted = await encryptTranscription(updatedContent, encryptionKey)
        finalContent = encrypted.encrypted
        encryptionMetadata = encrypted
      } catch (encryptError) {
        return NextResponse.json(
          { error: 'Failed to encrypt updated note' },
          { status: 500 }
        )
      }
    }

    // Update the note in the database
    const { error: updateError } = await supabase
      .from('notes')
      .update({
        content: finalContent,
        encryption_metadata: encryptionMetadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', noteId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update note' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Note updated successfully'
    })

  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 