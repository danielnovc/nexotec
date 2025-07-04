import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Clear the 2FA reminder flag
    const { error: updateError } = await supabase
      .from('users')
      .update({ show_2fa_reminder: false })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error clearing 2FA reminder:', updateError)
      return NextResponse.json({ error: 'Failed to clear reminder' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Clear 2FA reminder error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 