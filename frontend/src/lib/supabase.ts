import { createClient } from '@supabase/supabase-js'

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
  created_at: string
  updated_at: string
}

export interface Transcription {
  id: string
  user_id: string
  title: string
  content: string
  duration: number
  credits_used: number
  created_at: string
  take_notes: boolean
}

export interface CreditTransaction {
  id: string
  user_id: string
  amount: number
  type: 'purchase' | 'usage' | 'refund'
  description: string
  created_at: string
} 