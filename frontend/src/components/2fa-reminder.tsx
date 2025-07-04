"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, X, Settings, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function TwoFAReminder() {
  const [showReminder, setShowReminder] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    check2FAReminder()
  }, [])

  const check2FAReminder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('users')
        .select('show_2fa_reminder, two_factor_enabled')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error checking 2FA reminder:', error)
        return
      }

      // Show reminder if user hasn't set up 2FA and reminder flag is true
      if (data && data.show_2fa_reminder && !data.two_factor_enabled && !dismissed) {
        setShowReminder(true)
      }
    } catch (error) {
      console.error('Error checking 2FA reminder:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSetup2FA = () => {
    setShowReminder(false)
    clear2FAReminder()
    router.push('/dashboard/settings?setup2fa=true')
  }

  const handleDismiss = async () => {
    setShowReminder(false)
    setDismissed(true)
    await clear2FAReminder()
  }

  const handleRemindLater = async () => {
    setShowReminder(false)
    // Set a reminder for later (e.g., 24 hours)
    setTimeout(async () => {
      await set2FAReminder()
    }, 24 * 60 * 60 * 1000) // 24 hours
  }

  const clear2FAReminder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('users')
        .update({ show_2fa_reminder: false })
        .eq('id', user.id)
    } catch (error) {
      console.error('Error clearing 2FA reminder:', error)
    }
  }

  const set2FAReminder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('users')
        .update({ show_2fa_reminder: true })
        .eq('id', user.id)
    } catch (error) {
      console.error('Error setting 2FA reminder:', error)
    }
  }

  if (loading || !showReminder) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 z-50 max-w-sm"
      >
        <Card className="shadow-lg border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg">Security Reminder</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 hover:bg-orange-100 dark:hover:bg-orange-900"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Enhance your account security by setting up two-factor authentication. 
              This adds an extra layer of protection to your account.
            </p>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleSetup2FA}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Set up 2FA
              </Button>
              <Button
                onClick={handleRemindLater}
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900"
              >
                Remind later
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
} 