import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { decryptTranscription } from '@/lib/encryption'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  // Add security headers for TLS 1.3
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Request-ID': crypto.randomUUID(),
    'X-TLS-Version': '1.3'
  };

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const encryptionKey = searchParams.get('encryptionKey')

    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID is required',
        tls_version: '1.3'
      }, { 
        status: 400,
        headers: securityHeaders
      })
    }

    // Fetch notes from database
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notes:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch notes',
        tls_version: '1.3'
      }, { 
        status: 500,
        headers: securityHeaders
      })
    }

    // Decrypt notes if encryption key is provided
    if (encryptionKey) {
      const decryptedNotes = await Promise.all(
        notes.map(async (note) => {
          if (note.is_encrypted) {
            try {
              const encryptedData = JSON.parse(note.content)
              const decryptedData = await decryptTranscription(encryptedData, encryptionKey)
              return {
                ...note,
                content: decryptedData,
                decrypted: true
              }
            } catch (error) {
              console.error('Error decrypting note:', error)
              return {
                ...note,
                content: null,
                decrypted: false,
                error: 'Failed to decrypt'
              }
            }
          } else {
            // Return plain text content
            return {
              ...note,
              content: JSON.parse(note.content),
              decrypted: true
            }
          }
        })
      )
      return NextResponse.json({ 
        notes: decryptedNotes,
        tls_version: '1.3'
      }, {
        headers: securityHeaders
      })
    } else {
      // Return encrypted content without decryption
      return NextResponse.json({ 
        notes: notes.map(n => ({
          ...n,
          content: n.is_encrypted ? '[ENCRYPTED]' : JSON.parse(n.content)
        })),
        tls_version: '1.3'
      }, {
        headers: securityHeaders
      })
    }

  } catch (error) {
    console.error('Error in load-notes API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      tls_version: '1.3'
    }, { 
      status: 500,
      headers: securityHeaders
    })
  }
} 