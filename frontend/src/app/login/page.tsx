"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { LoginForm } from "@/components/login-form"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"

function LoginPageContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorShown, setErrorShown] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Handle OAuth errors
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    
    if (error && !errorShown) {
      setErrorShown(true)
      let errorMessage = 'Authentication failed'
      
      switch (error) {
        case 'access_denied':
          errorMessage = 'Access was denied. Please try again.'
          break
        case 'invalid_request':
          errorMessage = 'Invalid request. Please try again.'
          break
        case 'server_error':
          errorMessage = 'Server error. Please try again later.'
          break
        case 'auth_callback_error':
          errorMessage = 'Authentication callback failed. Please try again.'
          break
        default:
          errorMessage = errorDescription || 'Authentication failed. Please try again.'
      }
      
      toast.error(errorMessage)
    }
  }, [searchParams, errorShown])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <LoginForm />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}
