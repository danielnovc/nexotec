import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { encryptTranscription, decryptTranscription } from '@/lib/encryption'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function PUT(request: NextRequest) {
  try {
    const { transcriptionId, originalWord, newWord, encryptionKey } = await request.json()

    if (!transcriptionId || !originalWord || !newWord || !encryptionKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get the current transcription
    const { data: transcription, error: fetchError } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('id', transcriptionId)
      .single()

    if (fetchError || !transcription) {
      return NextResponse.json(
        { error: 'Transcription not found' },
        { status: 404 }
      )
    }

    // Decrypt the content if it's encrypted
    let content = transcription.content
    if (transcription.is_encrypted && transcription.encryption_metadata) {
      try {
        content = await decryptTranscription(transcription.encryption_metadata, encryptionKey)
      } catch (decryptError) {
        return NextResponse.json(
          { error: 'Failed to decrypt transcription' },
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
      if (content.chunks && Array.isArray(content.chunks)) {
        // Handle chunks format
        updatedContent = {
          ...content,
          chunks: content.chunks.map((chunk: any) => ({
            ...chunk,
            text: chunk.text.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), newWord)
          }))
        }
        wordReplaced = true
      } else if (content.full_text) {
        // Handle full_text format
        updatedContent = {
          ...content,
          full_text: content.full_text.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), newWord)
        }
        wordReplaced = true
      } else if (content.transcription && Array.isArray(content.transcription)) {
        // Handle transcription array format
        updatedContent = {
          ...content,
          transcription: content.transcription.map((item: any) => ({
            ...item,
            text: item.text.replace(new RegExp(`\\b${originalWord}\\b`, 'gi'), newWord)
          }))
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
        { error: 'Word not found in transcription' },
        { status: 404 }
      )
    }

    // Encrypt the updated content if it was originally encrypted
    let finalContent = updatedContent
    let encryptionMetadata = transcription.encryption_metadata

    if (transcription.is_encrypted) {
      try {
        const encrypted = await encryptTranscription(updatedContent, encryptionKey)
        finalContent = encrypted.encrypted
        encryptionMetadata = encrypted
      } catch (encryptError) {
        return NextResponse.json(
          { error: 'Failed to encrypt updated transcription' },
          { status: 500 }
        )
      }
    }

    // Update the transcription in the database
    const { error: updateError } = await supabase
      .from('transcriptions')
      .update({
        content: finalContent,
        encryption_metadata: encryptionMetadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', transcriptionId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update transcription' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Transcription updated successfully'
    })

  } catch (error) {
    console.error('Error updating transcription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 