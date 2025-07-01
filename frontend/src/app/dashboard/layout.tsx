"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { useCredits } from "@/hooks/useCredits"
import { useAuth } from "@/contexts/AuthContext"
import { SupabaseConnectModal } from "@/components/supabase-connect-modal"
import { isEnterpriseAdmin, hasEnterpriseAccess } from "@/lib/enterprise-api"
import { Menu, RotateCcw, Sun, Moon, X, CreditCard, Mic, FileText, BookOpen, BarChart3, Sparkles, Users, Save, Database, Download, Settings, HelpCircle, Plus, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { NavUser } from "@/components/nav-user"
import { CreditTopUpModal } from "@/components/credit-topup-modal"
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

// Create context for dashboard state
interface DashboardContextType {
  takeNotes: boolean;
  setTakeNotes: (value: boolean) => void;
  recordDeviceAudio: boolean;
  setRecordDeviceAudio: (value: boolean) => void;
  refreshCredits: () => Promise<void>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
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
  const [mounted, setMounted] = useState(false)
  
  // Admin and enterprise status state
  const [isAdmin, setIsAdmin] = useState(false)
  const [hasEnterprise, setHasEnterprise] = useState(false)
  
  // Mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  

  
  // Toggle states
  const [autoDownloadRecordings, setAutoDownloadRecordings] = useState(false)
  const [saveTranscripts, setSaveTranscripts] = useState(false)
  const [autoDownloadTranscripts, setAutoDownloadTranscripts] = useState(false)
  const [autoSummarize, setAutoSummarize] = useState(false)
  const [moreThanTwoSpeakers, setMoreThanTwoSpeakers] = useState(false)
  const [saveAudioToStorage, setSaveAudioToStorage] = useState(false)
  const [recordDeviceAudio, setRecordDeviceAudio] = useState(false)
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false)
  const [takeNotes, setTakeNotes] = useState(false)

  // Load toggle states from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAutoDownloadRecordings(localStorage.getItem("autoDownloadRecordings") === "true")
      setSaveTranscripts(localStorage.getItem("saveTranscripts") === "true")
      setAutoDownloadTranscripts(localStorage.getItem("autoDownloadTranscripts") === "true")
      setAutoSummarize(localStorage.getItem("autoSummarize") === "true")
      setMoreThanTwoSpeakers(localStorage.getItem("moreThanTwoSpeakers") === "true")
      setSaveAudioToStorage(localStorage.getItem("saveAudioToStorage") === "true")
      setRecordDeviceAudio(localStorage.getItem("recordDeviceAudio") === "true")
      setTakeNotes(localStorage.getItem("takeNotes") === "true")
    }
  }, [])

  // Check admin and enterprise status when user changes
  useEffect(() => {
    const checkAdminAndEnterpriseStatus = async () => {
      if (user) {
        try {
          const [adminStatus, enterpriseStatus] = await Promise.all([
            isEnterpriseAdmin(),
            hasEnterpriseAccess()
          ])
          setIsAdmin(adminStatus)
          setHasEnterprise(enterpriseStatus)
        } catch (error) {
          console.error("Error checking admin/enterprise status:", error)
          setIsAdmin(false)
          setHasEnterprise(false)
        }
      } else {
        setIsAdmin(false)
        setHasEnterprise(false)
      }
    }
    
    checkAdminAndEnterpriseStatus()
  }, [user])

  // Persist toggle states to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("autoDownloadRecordings", String(autoDownloadRecordings))
    }
  }, [autoDownloadRecordings])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("saveTranscripts", String(saveTranscripts))
    }
  }, [saveTranscripts])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("autoDownloadTranscripts", String(autoDownloadTranscripts))
    }
  }, [autoDownloadTranscripts])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("autoSummarize", String(autoSummarize))
    }
  }, [autoSummarize])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("moreThanTwoSpeakers", String(moreThanTwoSpeakers))
    }
  }, [moreThanTwoSpeakers])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("saveAudioToStorage", String(saveAudioToStorage))
    }
  }, [saveAudioToStorage])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("recordDeviceAudio", String(recordDeviceAudio))
    }
  }, [recordDeviceAudio])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("takeNotes", String(takeNotes))
    }
  }, [takeNotes])

  useEffect(() => {
    setMounted(true)
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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthGuard>
        <div className="flex flex-1 h-[100dvh] bg-[#f5faff] dark:bg-neutral-900">
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardContext.Provider value={{ 
          takeNotes, 
          setTakeNotes, 
          recordDeviceAudio,
          setRecordDeviceAudio,
          refreshCredits,
          mobileSidebarOpen,
          setMobileSidebarOpen
        }}>
          <div className="flex flex-1 h-[100dvh] bg-[#f5faff] dark:bg-neutral-900">
            {/* Mobile overlay */}
            {mobileSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}
            
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:relative z-[70] h-full">
              <AppSidebar 
                className="w-64 border-r h-full bg-white dark:bg-neutral-950" 
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
                recordDeviceAudio={recordDeviceAudio}
                onRecordDeviceAudioChange={setRecordDeviceAudio}
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
                isAdmin={isAdmin}
                hasEnterprise={hasEnterprise}
              />
            </div>

            {/* Mobile Sidebar - Simplified structure */}
            <div className={`lg:hidden fixed top-0 left-0 z-[100] w-64 h-full bg-white dark:bg-neutral-950 shadow-xl transition-transform duration-300 ease-in-out ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <img src="/icon.png" alt="Transcrib" className="w-8 h-8" />
                      <h2 className="text-sidebar-foreground font-medium">Nexogen AI</h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Mobile close button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileSidebarOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      {/* Theme Toggle Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="h-8 w-8 p-0"
                      >
                        {isDark ? (
                          <Sun className="h-4 w-4" />
                        ) : (
                          <Moon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Credits Display */}
                  <div className="px-2 mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg px-2 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Credits</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-300">
                            {creditsLoading ? '...' : credits?.toFixed(2) || '0.00'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CreditTopUpModal>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full rounded-t-none border-t-0 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Top Up Credits
                      </Button>
                    </CreditTopUpModal>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Navigation */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">Navigation</h3>
                    <div className="space-y-1">
                      <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                        <Mic className="h-4 w-4" />
                        <span>Audio Transcription</span>
                      </Link>
                      <Link href="/dashboard/transcriptions" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                        <FileText className="h-4 w-4" />
                        <span>Transcription History</span>
                      </Link>
                      <Link href="/dashboard/notes" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                        <BookOpen className="h-4 w-4" />
                        <span>Notes History</span>
                      </Link>
                      <Link href="/dashboard/analytics" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                      <Link href="/documentation" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                        <HelpCircle className="h-4 w-4" />
                        <span>Documentation</span>
                      </Link>
                      {hasEnterprise && (
                        <Link href="/dashboard/enterprise" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-gray-300">
                          <Users className="h-4 w-4" />
                          <span>Enterprise</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">Tools</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-auto-summarize" className="flex items-center gap-2 font-normal">
                          <Sparkles className="h-4 w-4" />
                          <span className="font-normal">Auto-summarize</span>
                        </Label>
                        <Switch
                          id="mobile-auto-summarize"
                          checked={autoSummarize}
                          onCheckedChange={setAutoSummarize}
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-more-than-two-speakers" className="flex items-center gap-2 font-normal cursor-help">
                          <Users className="h-4 w-4" />
                          <span className="font-normal">More than 2 speakers</span>
                        </Label>
                        <Switch
                          id="mobile-more-than-two-speakers"
                          checked={moreThanTwoSpeakers}
                          onCheckedChange={setMoreThanTwoSpeakers}
                          aria-label="Toggle more than two speakers mode"
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-record-device-audio" className="flex items-center gap-2 font-normal cursor-help">
                          <Monitor className="h-4 w-4" />
                          <span className="font-normal">Record device audio</span>
                        </Label>
                        <Switch
                          id="mobile-record-device-audio"
                          checked={recordDeviceAudio}
                          onCheckedChange={setRecordDeviceAudio}
                          aria-label="Toggle device audio recording"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Data Safety Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">Data Safety</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-save-transcripts" className="flex items-center gap-2 font-normal">
                          <Save className="h-4 w-4" />
                          <span className="font-normal">Save transcripts</span>
                        </Label>
                        <Switch
                          id="mobile-save-transcripts"
                          checked={saveTranscripts}
                          onCheckedChange={setSaveTranscripts}
                          aria-label="Toggle save transcripts"
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-save-audio-to-storage" className="flex items-center gap-2 font-normal">
                          <Database className="h-4 w-4" />
                          <span className="font-normal">Save audio to storage</span>
                        </Label>
                        <Switch
                          id="mobile-save-audio-to-storage"
                          checked={saveAudioToStorage}
                          onCheckedChange={setSaveAudioToStorage}
                          aria-label="Toggle save audio to storage"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Download Options Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">Download Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-auto-download-recordings" className="flex items-center gap-2 font-normal">
                          <Download className="h-4 w-4" />
                          <span className="font-normal">Auto-download recordings</span>
                        </Label>
                        <Switch
                          id="mobile-auto-download-recordings"
                          checked={autoDownloadRecordings}
                          onCheckedChange={setAutoDownloadRecordings}
                          aria-label="Toggle auto-download recordings"
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mobile-auto-download-transcripts" className="flex items-center gap-2 font-normal">
                          <FileText className="h-4 w-4" />
                          <span className="font-normal">Auto-download transcripts</span>
                        </Label>
                        <Switch
                          id="mobile-auto-download-transcripts"
                          checked={autoDownloadTranscripts}
                          onCheckedChange={setAutoDownloadTranscripts}
                          aria-label="Toggle auto-download transcripts"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Section */}
                  {hasEnterprise && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">Enterprise</h3>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSupabaseModalOpen(true)}
                          className="w-full flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Configure Storage</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
                  {user && (
                    <NavUser user={{
                      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                      email: user.email || 'user@example.com',
                      avatar: user.user_metadata?.avatar_url || ""
                    }} />
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-[80] bg-transparent p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="p-2 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm rounded-lg shadow-sm"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                
                {/* Mode Toggle Button */}
                {takeNotes !== undefined && setTakeNotes && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTakeNotes(!takeNotes)}
                    className="rounded-full px-4 py-2 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border-gray-200 dark:border-neutral-800 shadow-sm"
                  >
                    <RotateCcw className={`h-4 w-4 mr-2 transition-transform duration-300 ${takeNotes ? 'rotate-180' : ''}`} />
                    <span className="text-sm font-medium">
                      {takeNotes ? "Notes" : "Transcription"}
                    </span>
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="p-2 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm rounded-lg shadow-sm"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            <SupabaseConnectModal 
              open={supabaseModalOpen} 
              onClose={() => setSupabaseModalOpen(false)} 
              onS3ConfigSave={handleS3ConfigSave} 
            />
            
            <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-20 lg:pt-8 pb-32 lg:pb-8">
              {children}
            </main>
          </div>
        </DashboardContext.Provider>
      </SidebarProvider>
    </AuthGuard>
  )
} 