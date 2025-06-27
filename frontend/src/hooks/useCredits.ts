import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function useCredits() {
  const { user } = useAuth()
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchCredits()
    } else {
      setCredits(0)
      setLoading(false)
    }
  }, [user])

  const fetchCredits = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setCredits(data.credits || 0)
    } catch (error) {
      console.error('Error fetching credits:', error)
    } finally {
      setLoading(false)
    }
  }

  const deductCredits = async (amount: number) => {
    if (!user) throw new Error('User not authenticated')
    if (credits < amount) throw new Error('Insufficient credits')

    try {
      const newCredits = credits - amount
      
      // Update credits in database
      const { error } = await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', user.id)

      if (error) throw error

      // Log transaction
      await supabase.from('credit_transactions').insert({
        user_id: user.id,
        amount: -amount,
        type: 'usage',
        description: `Service processing - ${amount} credits`
      })

      setCredits(newCredits)
      return newCredits
    } catch (error) {
      console.error('Error deducting credits:', error)
      throw error
    }
  }

  const addCredits = async (amount: number, description: string) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const newCredits = credits + amount
      
      // Update credits in database
      const { error } = await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', user.id)

      if (error) throw error

      // Log transaction
      await supabase.from('credit_transactions').insert({
        user_id: user.id,
        amount: amount,
        type: 'purchase',
        description
      })

      setCredits(newCredits)
      return newCredits
    } catch (error) {
      console.error('Error adding credits:', error)
      throw error
    }
  }

  const estimateCost = (durationSeconds: number) => {
    const costPerMinute = 0.10 // $0.10 per minute
    const minimumCharge = 0.10 // $0.10 minimum charge
    const durationMinutes = durationSeconds / 60
    return Math.max(durationMinutes * costPerMinute, minimumCharge)
  }

  const estimateFlatRateCost = () => {
    return 0.10 // $0.10 flat rate for notes and summary
  }

  const hasEnoughCredits = (durationSeconds: number) => {
    const estimatedCost = estimateCost(durationSeconds)
    return credits >= estimatedCost
  }

  const hasEnoughCreditsForFlatRate = () => {
    const estimatedCost = estimateFlatRateCost()
    return credits >= estimatedCost
  }

  const checkCreditsBeforeProcessing = async (durationSeconds?: number, serviceType: 'transcription' | 'notes' | 'summary' = 'transcription') => {
    if (!user) throw new Error('User not authenticated')

    let requiredCredits: number

    if (serviceType === 'transcription') {
      requiredCredits = estimateCost(durationSeconds || 0)
    } else {
      requiredCredits = estimateFlatRateCost()
    }

    if (credits < requiredCredits) {
      throw new Error(`Insufficient credits. Required: ${requiredCredits}, Available: ${credits}`)
    }

    return requiredCredits
  }

  const getUsageHistory = async (limit: number = 50) => {
    if (!user) return []

    try {
      const { data, error } = await supabase
        .from('usage')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching usage history:', error)
      return []
    }
  }

  const getUsageSummary = async () => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('user_usage_summary')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching usage summary:', error)
      return null
    }
  }

  return {
    credits,
    loading,
    deductCredits,
    addCredits,
    estimateCost,
    estimateFlatRateCost,
    hasEnoughCredits,
    hasEnoughCreditsForFlatRate,
    checkCreditsBeforeProcessing,
    getUsageHistory,
    getUsageSummary,
    refreshCredits: fetchCredits
  }
} 