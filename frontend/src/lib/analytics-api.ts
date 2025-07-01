import { supabase } from './supabase'
import { ServiceType } from './enterprise-types'

// Types for analytics data
export interface DailyUsageData {
  date: string
  minutes: number
  cost: number
}

export interface ServiceBreakdownData {
  name: string
  value: number
  color: string
  minutes: number
}

export interface MonthlyUsageData {
  month: string
  minutes: number
  cost: number
}

export interface AnalyticsStats {
  currentBalance: number
  totalMinutes: number
  totalCost: number
  usageTrend: number
  averageDailyUsage: number
  peakUsageDay: string
  mostUsedService: string
}

export interface RecentActivity {
  id: string
  date: string
  minutes: number
  cost: number
  service_type: ServiceType
  title: string
}

// Get user's daily usage for the last 7 days
export async function getUserDailyUsage(userId: string): Promise<DailyUsageData[]> {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('created_at, minutes_used, cost')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    // Group by date and aggregate
    const dailyData: Record<string, DailyUsageData> = {}
    
    data?.forEach(record => {
      const date = new Date(record.created_at).toISOString().split('T')[0]
      
      if (!dailyData[date]) {
        dailyData[date] = { date, minutes: 0, cost: 0 }
      }
      
      dailyData[date].minutes += record.minutes_used
      dailyData[date].cost += record.cost
    })

    // Fill in missing dates with zeros
    const result: DailyUsageData[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      result.unshift({
        date: dateStr,
        minutes: dailyData[dateStr]?.minutes || 0,
        cost: dailyData[dateStr]?.cost || 0
      })
    }

    return result
  } catch (error) {
    console.error('Error fetching daily usage:', error)
    return []
  }
}

// Get service breakdown for user
export async function getUserServiceBreakdown(userId: string): Promise<ServiceBreakdownData[]> {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('service_type, minutes_used')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (error) throw error

    // Aggregate by service type
    const serviceTotals: Record<ServiceType, number> = {
      transcription: 0,
      notes: 0,
      summarization: 0
    }

    data?.forEach(record => {
      serviceTotals[record.service_type as ServiceType] += record.minutes_used
    })

    const totalMinutes = Object.values(serviceTotals).reduce((sum, minutes) => sum + minutes, 0)
    
    const colors = {
      transcription: '#3B82F6',
      notes: '#8B5CF6',
      summarization: '#10B981'
    }

    const names = {
      transcription: 'Transcription',
      notes: 'Notes',
      summarization: 'Summarization'
    }

    return Object.entries(serviceTotals)
      .filter(([_, minutes]) => minutes > 0)
      .map(([service, minutes]) => ({
        name: names[service as ServiceType],
        value: totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0,
        color: colors[service as ServiceType],
        minutes
      }))
  } catch (error) {
    console.error('Error fetching service breakdown:', error)
    return []
  }
}

// Get monthly usage for the last 6 months
export async function getUserMonthlyUsage(userId: string): Promise<MonthlyUsageData[]> {
  try {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('created_at, minutes_used, cost')
      .eq('user_id', userId)
      .gte('created_at', sixMonthsAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    // Group by month and aggregate
    const monthlyData: Record<string, MonthlyUsageData> = {}
    
    data?.forEach(record => {
      const date = new Date(record.created_at)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthName = date.toLocaleDateString('en-US', { month: 'short' })
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthName, minutes: 0, cost: 0 }
      }
      
      monthlyData[monthKey].minutes += record.minutes_used
      monthlyData[monthKey].cost += record.cost
    })

    return Object.values(monthlyData)
  } catch (error) {
    console.error('Error fetching monthly usage:', error)
    return []
  }
}

// Get analytics statistics
export async function getUserAnalyticsStats(userId: string): Promise<AnalyticsStats> {
  try {
    // Get current balance
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single()

    if (userError) throw userError

    // Get usage for current week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    
    // Try usage_tracking first, fallback to usage table
    let weekUsage: any[] = []
    let weekError: any = null
    let prevWeekUsage: any[] = []
    let prevWeekError: any = null
    
    try {
      const weekResult = await supabase
        .from('usage_tracking')
        .select('minutes_used, cost, created_at')
        .eq('user_id', userId)
        .gte('created_at', weekStart.toISOString())
      weekUsage = weekResult.data || []
      weekError = weekResult.error
    } catch {
      // Fallback to usage table
      const weekResult = await supabase
        .from('usage')
        .select('duration, cost, created_at')
        .eq('user_id', userId)
        .gte('created_at', weekStart.toISOString())
      weekUsage = weekResult.data?.map(record => ({
        minutes_used: record.duration / 60,
        cost: record.cost,
        created_at: record.created_at
      })) || []
      weekError = weekResult.error
    }

    if (weekError) throw weekError

    // Get usage for previous week for trend calculation
    const prevWeekStart = new Date(weekStart)
    prevWeekStart.setDate(prevWeekStart.getDate() - 7)
    
    try {
      const prevWeekResult = await supabase
        .from('usage_tracking')
        .select('minutes_used, cost')
        .eq('user_id', userId)
        .gte('created_at', prevWeekStart.toISOString())
        .lt('created_at', weekStart.toISOString())
      prevWeekUsage = prevWeekResult.data || []
      prevWeekError = prevWeekResult.error
    } catch {
      // Fallback to usage table
      const prevWeekResult = await supabase
        .from('usage')
        .select('duration, cost')
        .eq('user_id', userId)
        .gte('created_at', prevWeekStart.toISOString())
        .lt('created_at', weekStart.toISOString())
      prevWeekUsage = prevWeekResult.data?.map(record => ({
        minutes_used: record.duration / 60,
        cost: record.cost
      })) || []
      prevWeekError = prevWeekResult.error
    }

    if (prevWeekError) throw prevWeekError

    // Calculate stats
    const currentWeekMinutes = weekUsage?.reduce((sum, record) => sum + record.minutes_used, 0) || 0
    const currentWeekCost = weekUsage?.reduce((sum, record) => sum + record.cost, 0) || 0
    const prevWeekMinutes = prevWeekUsage?.reduce((sum, record) => sum + record.minutes_used, 0) || 0
    
    const usageTrend = prevWeekMinutes > 0 
      ? ((currentWeekMinutes - prevWeekMinutes) / prevWeekMinutes) * 100 
      : 0

    // Get most used service (simplified for now since usage table might not have service_type)
    let serviceTotals: Record<ServiceType, number> = {
      transcription: 0,
      notes: 0,
      summarization: 0
    }

    try {
      const { data: serviceUsage, error: serviceError } = await supabase
        .from('usage_tracking')
        .select('service_type, minutes_used')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      if (!serviceError && serviceUsage) {
        serviceUsage.forEach(record => {
          serviceTotals[record.service_type as ServiceType] += record.minutes_used
        })
      }
    } catch {
      // Fallback - assume transcription is most used
      console.warn('Could not fetch service usage, defaulting to transcription')
    }

    const mostUsedService = Object.entries(serviceTotals)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'transcription'

    // Get peak usage day
    const dayUsage: Record<string, number> = {}
    weekUsage?.forEach(record => {
      const day = new Date(record.created_at).toLocaleDateString('en-US', { weekday: 'long' })
      dayUsage[day] = (dayUsage[day] || 0) + record.minutes_used
    })

    const peakUsageDay = Object.entries(dayUsage)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Monday'

    return {
      currentBalance: userData.credits || 0,
      totalMinutes: currentWeekMinutes,
      totalCost: currentWeekCost,
      usageTrend: Math.round(usageTrend * 10) / 10,
      averageDailyUsage: weekUsage?.length ? Math.round((currentWeekMinutes / weekUsage.length) * 10) / 10 : 0,
      peakUsageDay,
      mostUsedService: mostUsedService.charAt(0).toUpperCase() + mostUsedService.slice(1)
    }
  } catch (error) {
    console.error('Error fetching analytics stats:', error)
    return {
      currentBalance: 0,
      totalMinutes: 0,
      totalCost: 0,
      usageTrend: 0,
      averageDailyUsage: 0,
      peakUsageDay: 'Monday',
      mostUsedService: 'Transcription'
    }
  }
}

// Get recent activity
export async function getUserRecentActivity(userId: string): Promise<RecentActivity[]> {
  try {
    const { data, error } = await supabase
      .from('usage_tracking')
      .select(`
        id,
        created_at,
        minutes_used,
        cost,
        service_type,
        metadata
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error

    return data?.map(record => ({
      id: record.id,
      date: new Date(record.created_at).toISOString().split('T')[0],
      minutes: record.minutes_used,
      cost: record.cost,
      service_type: record.service_type,
      title: record.metadata?.title || `${record.service_type} session`
    })) || []
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }
}

// Record usage when transcription/notes are created
// This function should be called AFTER the transcription/notes are successfully created
// and AFTER credits have been deducted using the existing deductCredits function
export async function recordUsage(
  userId: string,
  serviceType: ServiceType,
  minutesUsed: number,
  cost: number,
  metadata?: Record<string, any>
) {
  try {
    const { error } = await supabase
      .from('usage_tracking')
      .insert({
        user_id: userId,
        service_type: serviceType,
        minutes_used: minutesUsed,
        cost: cost,
        metadata: metadata || {}
      })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error recording usage:', error)
    return { success: false, error }
  }
}

// Helper function that combines credit deduction and usage tracking
// This should be used when processing transcriptions/notes
export async function processServiceWithCredits(
  userId: string,
  serviceType: ServiceType,
  minutesUsed: number,
  cost: number,
  metadata?: Record<string, any>,
  deductCreditsFn?: (amount: number) => Promise<number>
) {
  try {
    // First, deduct credits using the existing function
    if (deductCreditsFn) {
      await deductCreditsFn(cost)
    }

    // Then record the usage
    const usageResult = await recordUsage(userId, serviceType, minutesUsed, cost, metadata)
    
    if (!usageResult.success) {
      throw new Error('Failed to record usage')
    }

    return { success: true }
  } catch (error) {
    console.error('Error processing service with credits:', error)
    return { success: false, error }
  }
} 