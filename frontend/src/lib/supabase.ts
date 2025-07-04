import { createClient } from '@supabase/supabase-js'
import { EncryptedData } from './encryption'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging
console.log('Environment variables check:')
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set (length: ' + supabaseAnonKey.length + ')' : 'Missing')

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.')
  console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
}

// Create Supabase client with fallback for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Database types
export interface User {
  id: string
  email: string
  credits: number
  encryption_key_hash?: string
  two_factor_enabled?: boolean
  two_factor_secret_encrypted?: string
  two_factor_secret_iv?: string
  two_factor_secret_salt?: string
  two_factor_backup_codes_encrypted?: string
  two_factor_backup_codes_iv?: string
  two_factor_backup_codes_salt?: string
  onboarding_completed?: boolean
  onboarding_data?: any
  show_2fa_reminder?: boolean
  created_at: string
  updated_at: string
}

export interface Transcription {
  id: string
  user_id: string
  title: string
  content: string | EncryptedData
  duration: number
  credits_used: number
  take_notes: boolean
  is_encrypted: boolean
  encryption_metadata?: EncryptedData
  created_at: string
}

export interface Note {
  id: string
  user_id: string
  transcription_id?: string
  title: string
  content: string | EncryptedData
  is_encrypted: boolean
  encryption_metadata?: EncryptedData
  created_at: string
  updated_at: string
}

export interface CreditTransaction {
  id: string
  user_id: string
  amount: number
  type: 'purchase' | 'usage' | 'refund'
  description: string
  created_at: string
}

// Helper functions for encryption
export async function saveEncryptedTranscription(
  transcription: any,
  title: string,
  duration: number,
  creditsUsed: number,
  takeNotes: boolean,
  encryptionKey: string
) {
  const { encryptTranscription } = await import('./encryption')
  
  try {
    // Encrypt the transcription data
    const encryptedData = await encryptTranscription(transcription, encryptionKey)
    
    // Save to database
    const { data, error } = await supabase
      .from('transcriptions')
      .insert({
        title,
        content: JSON.stringify(encryptedData),
        duration,
        credits_used: creditsUsed,
        take_notes: takeNotes,
        is_encrypted: true,
        encryption_metadata: encryptedData
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error saving encrypted transcription:', error)
    return { data: null, error }
  }
}

export async function loadEncryptedTranscription(
  transcriptionId: string,
  encryptionKey: string
) {
  const { decryptTranscription } = await import('./encryption')
  
  try {
    // Load from database
    const { data, error } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('id', transcriptionId)
      .single()

    if (error) throw error
    if (!data.is_encrypted) return { data: data.content, error: null }

    // Decrypt the content
    const encryptedData = JSON.parse(data.content)
    const decryptedData = await decryptTranscription(encryptedData, encryptionKey)
    
    return { data: decryptedData, error: null }
  } catch (error) {
    console.error('Error loading encrypted transcription:', error)
    return { data: null, error }
  }
}

export async function saveEncryptedNote(
  note: any,
  title: string,
  transcriptionId?: string,
  encryptionKey?: string
) {
  const { encryptTranscription } = await import('./encryption')
  
  try {
    let content: string | EncryptedData
    let isEncrypted = false
    let encryptionMetadata: EncryptedData | undefined

    if (encryptionKey) {
      // Encrypt the note data
      const encryptedData = await encryptTranscription(note, encryptionKey)
      content = JSON.stringify(encryptedData)
      isEncrypted = true
      encryptionMetadata = encryptedData
    } else {
      // Store as plain text
      content = JSON.stringify(note)
      isEncrypted = false
    }
    
    // Save to database
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title,
        content,
        transcription_id: transcriptionId,
        is_encrypted: isEncrypted,
        encryption_metadata: encryptionMetadata
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error saving note:', error)
    return { data: null, error }
  }
}

export async function loadEncryptedNote(
  noteId: string,
  encryptionKey?: string
) {
  const { decryptTranscription } = await import('./encryption')
  
  try {
    // Load from database
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single()

    if (error) throw error
    if (!data.is_encrypted || !encryptionKey) {
      return { data: JSON.parse(data.content), error: null }
    }

    // Decrypt the content
    const encryptedData = JSON.parse(data.content)
    const decryptedData = await decryptTranscription(encryptedData, encryptionKey)
    
    return { data: decryptedData, error: null }
  } catch (error) {
    console.error('Error loading note:', error)
    return { data: null, error }
  }
} 