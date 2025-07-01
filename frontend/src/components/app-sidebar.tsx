"use client"
import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Mic,
  FileText,
  Settings,
  History,
  Download,
  Upload,
  BarChart3,
  User,
  Sun,
  Moon,
  Database,
  FileDown,
  Save,
  Sparkles,
  Users,
  HardDrive,
  CreditCard,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  HelpCircle,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { isEnterpriseAdmin } from "@/lib/enterprise-api"
import { motion } from "framer-motion"

import { useDashboard } from "@/app/dashboard/layout"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CreditTopUpModal } from "@/components/credit-topup-modal"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
    },
  ],
}

// Navigation items without dropdown structure
const getNavigationItems = (hasEnterprise: boolean, pathname: string) => [
  {
    title: "Audio Transcription",
    url: "/dashboard",
    icon: Mic,
    isActive: pathname === "/dashboard",
  },
  {
    title: "Transcription History",
    url: "/dashboard/transcriptions",
    icon: FileText,
    isActive: pathname === "/dashboard/transcriptions",
  },
  {
    title: "Notes History",
    url: "/dashboard/notes",
    icon: BookOpen,
    isActive: pathname === "/dashboard/notes",
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    isActive: pathname === "/dashboard/analytics",
  },
  {
    title: "Documentation",
    url: "/documentation",
    icon: HelpCircle,
    isActive: pathname.startsWith("/documentation"),
  },
  ...(hasEnterprise ? [{
    title: "Enterprise",
    url: "/dashboard/enterprise",
    icon: Users,
    isActive: pathname === "/dashboard/enterprise",
  }] : []),
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isDark: boolean;
  onThemeToggle: () => void;
  autoDownloadRecordings: boolean;
  onAutoDownloadRecordingsChange: (checked: boolean) => void;
  saveTranscripts: boolean;
  onSaveTranscriptsChange: (checked: boolean) => void;
  autoDownloadTranscripts: boolean;
  onAutoDownloadTranscriptsChange: (checked: boolean) => void;
  autoSummarize: boolean;
  onAutoSummarizeChange: (checked: boolean) => void;
  moreThanTwoSpeakers: boolean;
  onMoreThanTwoSpeakersChange: (checked: boolean) => void;
  saveAudioToStorage: boolean;
  onSaveAudioToStorageChange: (checked: boolean) => void;
  onOpenSupabaseModal: () => void;
  credits?: number;
  creditsLoading?: boolean;
  takeNotes?: boolean;
  onTakeNotesChange?: (checked: boolean) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  isAdmin: boolean;
  hasEnterprise: boolean;
}

export function AppSidebar({ 
  isDark, 
  onThemeToggle,
  autoDownloadRecordings,
  onAutoDownloadRecordingsChange,
  saveTranscripts,
  onSaveTranscriptsChange,
  autoDownloadTranscripts,
  onAutoDownloadTranscriptsChange,
  autoSummarize,
  onAutoSummarizeChange,
  moreThanTwoSpeakers,
  onMoreThanTwoSpeakersChange,
  saveAudioToStorage,
  onSaveAudioToStorageChange,
  onOpenSupabaseModal,
  credits,
  creditsLoading,
  takeNotes,
  onTakeNotesChange,
  user,
  isAdmin,
  hasEnterprise,
  ...props 
}: AppSidebarProps) {
  const pathname = usePathname()
  const { setMobileSidebarOpen } = useDashboard()

  const navigationItems = getNavigationItems(hasEnterprise, pathname)

  // For mobile, we'll render the sidebar content directly without the Sheet wrapper
  const sidebarContent = (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <SidebarHeader>
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
              className="lg:hidden h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            
            {/* Theme Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onThemeToggle}
                  className="h-8 w-8 p-0"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Credits Display */}
        <div className="mx-2 mb-4">
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

        {/* Transcription Mode Toggle */}
        {takeNotes !== undefined && onTakeNotesChange && (
          <motion.div 
            className="px-2 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTakeNotesChange(!takeNotes)}
                    className="w-full flex items-center gap-2 font-medium bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 border-gray-300 dark:border-neutral-600"
                  >
                    <motion.div
                      animate={{ rotate: takeNotes ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </motion.div>
                    <motion.span 
                      className="text-sm"
                      key={takeNotes ? "notes" : "transcription"}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {takeNotes ? "Notes Mode" : "Transcription Mode"}
                    </motion.span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="max-w-[300px]">
                <p>
                  {takeNotes 
                    ? "Switch to Transcription Mode: Display as conversation with speaker labels" 
                    : "Switch to Notes Mode: Display as continuous text for note-taking"
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 px-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-summarize" className="flex items-center gap-2 font-normal">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-normal">Auto-summarize</span>
                </Label>
                <Switch
                  id="auto-summarize"
                  checked={autoSummarize}
                  onCheckedChange={onAutoSummarizeChange}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="more-than-two-speakers" className="flex items-center gap-2 font-normal cursor-help">
                      <Users className="h-4 w-4" />
                      <span className="font-normal">More than 2 speakers</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8} className="max-w-[300px]">
                    <p>Enable this if your audio contains more than two speakers. This helps improve speaker diarization accuracy by preventing the system from mistakenly adding extra speakers due to background noise or brief sound discrepancies.</p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  id="more-than-two-speakers"
                  checked={moreThanTwoSpeakers}
                  onCheckedChange={onMoreThanTwoSpeakersChange}
                  aria-label="Toggle more than two speakers mode"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Data Safety Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Data Safety</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 px-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="save-transcripts" className="flex items-center gap-2 font-normal">
                  <Save className="h-4 w-4" />
                  <span className="font-normal">Save transcripts</span>
                </Label>
                <Switch
                  id="save-transcripts"
                  checked={saveTranscripts}
                  onCheckedChange={onSaveTranscriptsChange}
                  aria-label="Toggle save transcripts"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="save-audio-to-storage" className="flex items-center gap-2 font-normal">
                  <Database className="h-4 w-4" />
                  <span className="font-normal">Save audio to storage</span>
                </Label>
                <Switch
                  id="save-audio-to-storage"
                  checked={saveAudioToStorage}
                  onCheckedChange={onSaveAudioToStorageChange}
                  aria-label="Toggle save audio to storage"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Download Options Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Download Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 px-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-download-recordings" className="flex items-center gap-2 font-normal">
                  <Download className="h-4 w-4" />
                  <span className="font-normal">Auto-download recordings</span>
                </Label>
                <Switch
                  id="auto-download-recordings"
                  checked={autoDownloadRecordings}
                  onCheckedChange={onAutoDownloadRecordingsChange}
                  aria-label="Toggle auto-download recordings"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-download-transcripts" className="flex items-center gap-2 font-normal">
                  <FileText className="h-4 w-4" />
                  <span className="font-normal">Auto-download transcripts</span>
                </Label>
                <Switch
                  id="auto-download-transcripts"
                  checked={autoDownloadTranscripts}
                  onCheckedChange={onAutoDownloadTranscriptsChange}
                  aria-label="Toggle auto-download transcripts"
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enterprise Section */}
        {hasEnterprise && (
          <SidebarGroup>
            <SidebarGroupLabel>Enterprise</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-4 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenSupabaseModal}
                  className="w-full flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Configure Storage</span>
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar || ""
          }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </div>
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      {sidebarContent}
    </Sidebar>
  )
}

