"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"
import { AppSidebar } from "@/components/app-sidebar"
import { useCredits } from "@/hooks/useCredits"
import { useAuth } from "@/contexts/AuthContext"
import { SupabaseConnectModal } from "@/components/supabase-connect-modal"
import { isEnterpriseAdmin, hasEnterpriseAccess } from "@/lib/enterprise-api"
import { useI18n, locales } from "@/lib/i18n"
import { Menu, RotateCcw, Sun, Moon, X, CreditCard, Mic, FileText, BookOpen, BarChart3, Sparkles, Users, Save, Database, Download, Settings, HelpCircle, Plus, Monitor, Globe, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
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
  const { t, locale, setLocale } = useI18n()
  
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
                className="hidden lg:flex"
                isDark={isDark}
                onThemeToggle={toggleTheme}
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
                  <div className="flex items-center justify-between gap-2 mb-4 px-2 pt-2 w-full">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <img src="/icon.png" alt="Nexogen AI" className="w-8 h-8" />
                      <h2 className="text-sidebar-foreground font-medium">{t('appName')}</h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Language Switcher */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Select value={locale} onValueChange={setLocale}>
                            <SelectTrigger className="h-8 w-8 p-0 border-none bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                              <Globe className="h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent className="z-[9999]">
                              {locales.map((lang: string) => (
                                <SelectItem key={lang} value={lang}>
                                  {t(lang === 'en' ? 'english' : lang === 'de' ? 'german' : lang === 'es' ? 'spanish' : lang === 'fr' ? 'french' : lang === 'ru' ? 'russian' : lang === 'ua' ? 'ukrainian' : lang === 'lt' ? 'lithuanian' : lang === 'pl' ? 'polish' : lang)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={8} className="z-[9999]">
                          <p>{t('language')}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Mobile close button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileSidebarOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Credits Display */}
                  <div className="px-4 mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg px-2 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{t('credits')}</span>
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
                        {t('topUpCredits')}
                      </Button>
                    </CreditTopUpModal>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Navigation Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-3">{t('navigation')}</h3>
                    <div className="space-y-2">
                      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <BarChart3 className="h-4 w-4" />
                        <span>{t('dashboard')}</span>
                      </Link>
                      <Link href="/dashboard/transcriptions" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <FileText className="h-4 w-4" />
                        <span>{t('transcriptions')}</span>
                      </Link>
                      <Link href="/dashboard/notes" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <FileEdit className="h-4 w-4" />
                        <span>{t('notes')}</span>
                      </Link>
                      <Link href="/dashboard/credits" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <CreditCard className="h-4 w-4" />
                        <span>{t('credits')}</span>
                      </Link>
                      <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>{t('settings.title')}</span>
                      </Link>
                      {isAdmin && hasEnterprise && (
                        <Link href="/dashboard/enterprise" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Users className="h-4 w-4" />
                          <span>{t('enterprise')}</span>
                        </Link>
                      )}
                    </div>
                  </div>
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
                      {takeNotes ? t('notes') : t('transcription')}
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