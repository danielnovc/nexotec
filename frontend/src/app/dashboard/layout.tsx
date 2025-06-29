"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { useCredits } from "@/hooks/useCredits"
import { useAuth } from "@/contexts/AuthContext"
import { SupabaseConnectModal } from "@/components/supabase-connect-modal"

// Create context for dashboard state
interface DashboardContextType {
  takeNotes: boolean;
  setTakeNotes: (value: boolean) => void;
  refreshCredits: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { credits, loading: creditsLoading, refreshCredits } = useCredits()
  const { user } = useAuth()
  
  // Theme toggle state
  const [isDark, setIsDark] = useState(false)
  
  // Toggle states
  const [autoDownloadRecordings, setAutoDownloadRecordings] = useState(false)
  const [saveTranscripts, setSaveTranscripts] = useState(false)
  const [autoDownloadTranscripts, setAutoDownloadTranscripts] = useState(false)
  const [autoSummarize, setAutoSummarize] = useState(false)
  const [moreThanTwoSpeakers, setMoreThanTwoSpeakers] = useState(false)
  const [saveAudioToStorage, setSaveAudioToStorage] = useState(false)
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false)
  const [takeNotes, setTakeNotes] = useState(false)

  // Load toggle states from localStorage on mount
  useEffect(() => {
    setAutoDownloadRecordings(localStorage.getItem("autoDownloadRecordings") === "true")
    setSaveTranscripts(localStorage.getItem("saveTranscripts") === "true")
    setAutoDownloadTranscripts(localStorage.getItem("autoDownloadTranscripts") === "true")
    setAutoSummarize(localStorage.getItem("autoSummarize") === "true")
    setMoreThanTwoSpeakers(localStorage.getItem("moreThanTwoSpeakers") === "true")
    setSaveAudioToStorage(localStorage.getItem("saveAudioToStorage") === "true")
    setTakeNotes(localStorage.getItem("takeNotes") === "true")
  }, [])

  // Persist toggle states to localStorage
  useEffect(() => {
    localStorage.setItem("autoDownloadRecordings", String(autoDownloadRecordings))
  }, [autoDownloadRecordings])
  useEffect(() => {
    localStorage.setItem("saveTranscripts", String(saveTranscripts))
  }, [saveTranscripts])
  useEffect(() => {
    localStorage.setItem("autoDownloadTranscripts", String(autoDownloadTranscripts))
  }, [autoDownloadTranscripts])
  useEffect(() => {
    localStorage.setItem("autoSummarize", String(autoSummarize))
  }, [autoSummarize])
  useEffect(() => {
    localStorage.setItem("moreThanTwoSpeakers", String(moreThanTwoSpeakers))
  }, [moreThanTwoSpeakers])
  useEffect(() => {
    localStorage.setItem("saveAudioToStorage", String(saveAudioToStorage))
  }, [saveAudioToStorage])
  useEffect(() => {
    localStorage.setItem("takeNotes", String(takeNotes))
  }, [takeNotes])

  useEffect(() => {
    // On mount, set initial theme
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

  const handleS3ConfigSave = (config: { accessKeyId: string; secretAccessKey: string; bucketName: string }) => {
    // Handle S3 config save if needed
    console.log('S3 configuration updated:', config)
  }

  return (
    <AuthGuard>
      <SidebarProvider>
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
            creditsLoading={creditsLoading}
            takeNotes={takeNotes}
            onTakeNotesChange={setTakeNotes}
            user={user ? {
              name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              email: user.email || 'user@example.com',
              avatar: user.user_metadata?.avatar_url || undefined
            } : undefined}
          />
          <SupabaseConnectModal 
            open={supabaseModalOpen} 
            onClose={() => setSupabaseModalOpen(false)} 
            onS3ConfigSave={handleS3ConfigSave} 
          />
          <main className="flex-1 overflow-y-auto p-8">
            <DashboardContext.Provider value={{ takeNotes, setTakeNotes, refreshCredits }}>
              {children}
            </DashboardContext.Provider>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
} 