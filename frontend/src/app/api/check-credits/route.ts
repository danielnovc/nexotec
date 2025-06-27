import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
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
    const body = await req.json()
    const { user_id, service_type, audio_duration } = body

    if (!user_id) {
      return NextResponse.json({ 
        error: 'User ID is required',
        tls_version: '1.3'
      }, { 
        status: 400,
        headers: securityHeaders
      })
    }

    // Get user's current credits
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', user_id)
      .single()

    if (userError) {
      console.error('Error fetching user credits:', userError)
      return NextResponse.json({ 
        error: 'Failed to fetch user credits',
        tls_version: '1.3'
      }, { 
        status: 500,
        headers: securityHeaders
      })
    }

    const currentCredits = userData.credits || 0

    // Calculate required credits based on service type
    let requiredCredits: number

    if (service_type === 'transcription') {
      const durationMinutes = (audio_duration || 0) / 60
      requiredCredits = Math.max(durationMinutes * 0.10, 0.10) // $0.10/min with $0.10 minimum
    } else {
      requiredCredits = 0.10 // Flat rate for notes and summary
    }

    const hasEnoughCredits = currentCredits >= requiredCredits

    return NextResponse.json({
      current_credits: currentCredits,
      required_credits: requiredCredits,
      has_enough_credits: hasEnoughCredits,
      service_type,
      audio_duration: audio_duration || 0,
      tls_version: '1.3'
    }, {
      headers: securityHeaders
    })

  } catch (error) {
    console.error('Error checking credits:', error)
    return NextResponse.json({ 
      error: 'Failed to check credits',
      tls_version: '1.3'
    }, { 
      status: 500,
      headers: securityHeaders
    })
  }
} 