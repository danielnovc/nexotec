"use client"

import { CreditPurchase } from "@/components/credit-purchase"
import { AppSidebar } from "@/components/app-sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Clock, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"

export default function CreditsPage() {
  const { user } = useAuth()
  const { credits, loading } = useCredits()
  const [isDark, setIsDark] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Toggle states
  const [autoDownloadRecordings, setAutoDownloadRecordings] = useState(false)
  const [saveTranscripts, setSaveTranscripts] = useState(false)
  const [autoDownloadTranscripts, setAutoDownloadTranscripts] = useState(false)
  const [autoSummarize, setAutoSummarize] = useState(false)
  const [moreThanTwoSpeakers, setMoreThanTwoSpeakers] = useState(false)
  const [saveAudioToStorage, setSaveAudioToStorage] = useState(false)
  const [takeNotes, setTakeNotes] = useState(false)
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false)

  useEffect(() => {
    const isDarkMode =
      typeof window !== "undefined" &&
      (localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches));
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-1 h-[100dvh] bg-[#f5faff] dark:bg-neutral-900">
        <AppSidebar 
          className="w-64 border-r" 
          isDark={isDark}
          onThemeToggle={toggleTheme}
          autoDownloadRecordings={autoDownloadRecordings}
          onAutoDownloadRecordingsChange={setAutoDownloadRecordings}
          saveTranscripts={saveTranscripts}
          onSaveTranscriptsChange={setSaveTranscripts}
          autoDownloadTranscripts={autoDownloadTranscripts}
          onAutoDownloadTranscriptsChange={setAutoDownloadTranscripts}
          autoSummarize={autoSummarize}
          onAutoSummarizeChange={setAutoSummarize}
          moreThanTwoSpeakers={moreThanTwoSpeakers}
          onMoreThanTwoSpeakersChange={setMoreThanTwoSpeakers}
          saveAudioToStorage={saveAudioToStorage}
          onSaveAudioToStorageChange={setSaveAudioToStorage}
          onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
          credits={credits}
          creditsLoading={loading}
          takeNotes={takeNotes}
          onTakeNotesChange={setTakeNotes}
          user={user ? {
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || 'user@example.com',
            avatar: user.user_metadata?.avatar_url || undefined
          } : undefined}
          isAdmin={isAdmin}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold">Credits & Billing</h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Manage your transcription credits and billing
              </p>
            </div>

            {/* Current Balance */}
            <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <CreditCard className="h-5 w-5" />
                  Current Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {loading ? '...' : credits.toFixed(2)}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Available Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                      {loading ? '...' : (credits * 10).toFixed(0)}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Minutes Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
                      $0.10
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Per Minute</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Purchase */}
            <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <CardContent className="pt-6">
                <CreditPurchase />
              </CardContent>
            </Card>

            {/* Usage Information */}
            <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <TrendingUp className="h-5 w-5" />
                  How Credits Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base lg:text-lg">Credit Usage</h3>
                    <ul className="space-y-2 text-xs lg:text-sm text-muted-foreground">
                      <li>• 1 credit = 1 minute of audio transcription</li>
                      <li>• Credits are deducted based on actual audio duration</li>
                      <li>• Unused credits never expire</li>
                      <li>• Credits are used for both regular and "Take Notes" mode</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-base lg:text-lg">Pricing</h3>
                    <ul className="space-y-2 text-xs lg:text-sm text-muted-foreground">
                      <li>• Basic: $0.10 per minute</li>
                      <li>• Professional: $0.09 per minute (10% discount)</li>
                      <li>• Enterprise: $0.083 per minute (17% discount)</li>
                      <li>• All plans include speaker diarization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
} 