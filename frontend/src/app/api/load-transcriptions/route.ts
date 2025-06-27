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

    // Fetch transcriptions from database
    const { data: transcriptions, error } = await supabase
      .from('transcriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching transcriptions:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch transcriptions',
        tls_version: '1.3'
      }, { 
        status: 500,
        headers: securityHeaders
      })
    }

    // Decrypt transcriptions if encryption key is provided
    if (encryptionKey) {
      const decryptedTranscriptions = await Promise.all(
        transcriptions.map(async (transcription) => {
          if (transcription.is_encrypted) {
            try {
              const encryptedData = JSON.parse(transcription.content)
              const decryptedData = await decryptTranscription(encryptedData, encryptionKey)
              return {
                ...transcription,
                content: decryptedData,
                decrypted: true
              }
            } catch (error) {
              console.error('Error decrypting transcription:', error)
              return {
                ...transcription,
                content: null,
                decrypted: false,
                error: 'Failed to decrypt'
              }
            }
          } else {
            // Return plain text content
            return {
              ...transcription,
              content: JSON.parse(transcription.content),
              decrypted: true
            }
          }
        })
      )
      return NextResponse.json({ 
        transcriptions: decryptedTranscriptions,
        tls_version: '1.3'
      }, {
        headers: securityHeaders
      })
    } else {
      // Return encrypted content without decryption
      return NextResponse.json({ 
        transcriptions: transcriptions.map(t => ({
          ...t,
          content: t.is_encrypted ? '[ENCRYPTED]' : JSON.parse(t.content)
        })),
        tls_version: '1.3'
      }, {
        headers: securityHeaders
      })
    }

  } catch (error) {
    console.error('Error in load-transcriptions API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      tls_version: '1.3'
    }, { 
      status: 500,
      headers: securityHeaders
    })
  }
} 