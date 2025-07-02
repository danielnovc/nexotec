"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { LoginForm } from "@/components/login-form"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 md:p-10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-full opacity-20 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Back Button - Top Left Corner */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg">
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
