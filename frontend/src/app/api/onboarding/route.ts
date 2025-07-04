import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const onboardingData = await request.json()
    
    // Store onboarding data in users table
    const { error: userError } = await supabase
      .from('users')
      .update({
        onboarding_completed: true,
        onboarding_data: onboardingData,
        show_2fa_reminder: true, // Set 2FA reminder flag
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (userError) {
      console.error('User update error:', userError)
      return NextResponse.json({ error: 'Failed to save onboarding data' }, { status: 500 })
    }

    // Store analytics data (anonymized for privacy)
    const { error: analyticsError } = await supabase
      .from('onboarding_analytics')
      .insert({
        user_id: user.id,
        source: onboardingData.source,
        occupation: onboardingData.occupation,
        primary_use_case: onboardingData.primaryUseCase,
        team_size: onboardingData.teamSize,
        security_level: onboardingData.securityLevel,
        monthly_volume: onboardingData.monthlyVolume,
        languages_count: onboardingData.languages?.length || 0,
        completed_at: new Date().toISOString()
      })

    if (analyticsError) {
      console.error('Analytics insert error:', analyticsError)
      // Don't fail the request if analytics fails
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 