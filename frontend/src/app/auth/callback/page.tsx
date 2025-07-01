"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL params
        const errorParam = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')
        
        if (errorParam) {
          setError(errorDescription || 'Authentication failed')
          toast.error(errorDescription || 'Authentication failed')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
          return
        }

        // Check for authorization code
        const code = searchParams.get('code')
        if (code) {
          // Exchange code for session
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          if (exchangeError) {
            console.error('Error exchanging code for session:', exchangeError)
            setError('Authentication failed. Please try again.')
            toast.error('Authentication failed. Please try again.')
            setTimeout(() => {
              router.push('/login')
            }, 3000)
            return
          }
        }

        // If we reach here, authentication was successful
        setIsProcessing(false)
        
        // Wait a moment for the auth state to update
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)

      } catch (err) {
        console.error('Auth callback error:', err)
        setError('Authentication failed. Please try again.')
        toast.error('Authentication failed. Please try again.')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

    handleCallback()
  }, [router, searchParams])

  // If user is already authenticated and not processing, redirect
  useEffect(() => {
    if (user && !loading && !isProcessing) {
      router.push('/dashboard')
    }
  }, [user, loading, isProcessing, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground max-w-md">{error}</p>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <Loader className="h-8 w-8" />
        <h1 className="text-2xl font-bold text-foreground">
          {isProcessing ? "Completing Authentication" : "Authentication Successful"}
        </h1>
        <p className="text-muted-foreground">
          {isProcessing 
            ? "Please wait while we complete your sign-in..." 
            : "Redirecting to dashboard..."
          }
        </p>
      </div>
    </div>
  )
} 