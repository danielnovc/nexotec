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
        description: `Transcription processing - ${amount} credits`
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
    const durationMinutes = durationSeconds / 60
    return durationMinutes * costPerMinute
  }

  const hasEnoughCredits = (durationSeconds: number) => {
    const estimatedCost = estimateCost(durationSeconds)
    return credits >= estimatedCost
  }

  return {
    credits,
    loading,
    deductCredits,
    addCredits,
    estimateCost,
    hasEnoughCredits,
    refreshCredits: fetchCredits
  }
} 