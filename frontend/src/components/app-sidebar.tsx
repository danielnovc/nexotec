"use client"
import type * as React from "react"
import Link from "next/link"
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
      icon: Send,
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
      icon: Map,
    },
  ],
}

// Navigation items
const navigationItems = [
  {
    title: "Audio Transcription",
    url: "/dashboard",
    icon: Mic,
    isActive: true,
  },
  {
    title: "Transcription History",
    url: "/dashboard/transcriptions",
    icon: History,
  },
  {
    title: "Notes History",
    url: "/dashboard/notes",
    icon: FileText,
  },
  {
    title: "Cost Information",
    url: "/dashboard/cost-info",
    icon: CreditCard,
  },
  {
    title: "Credits",
    url: "/dashboard/credits",
    icon: CreditCard,
  },
  {
    title: "File Upload",
    url: "#",
    icon: Upload,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Documentation",
    url: "/documentation",
    icon: BookOpen,
  },
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
  ...props 
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="Transcrib" className="w-8 h-8" />
            <h2 className="text-sidebar-foreground font-medium">Nexogen AI</h2>
          </div>
          
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
        
        {/* Credits Display */}
        <div className="px-2 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg mx-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Credits</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-300">
                {creditsLoading ? '...' : credits?.toFixed(2) || '0.00'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">$0.10/min</div>
            </div>
          </div>
        </div>

        {/* Transcription Mode Toggle */}
        {takeNotes !== undefined && onTakeNotesChange && (
          <div className="px-2 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTakeNotesChange(!takeNotes)}
                  className="w-full flex items-center gap-2 font-medium bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 border-gray-300 dark:border-neutral-600"
                >
                  <RotateCcw className={`h-4 w-4 transition-transform duration-300 ${takeNotes ? 'rotate-180' : ''}`} />
                  <span className="text-sm">
                    {takeNotes ? "Notes Mode" : "Transcription Mode"}
                  </span>
                </Button>
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
          </div>
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
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="save-audio-to-storage" className="flex items-center gap-2 font-normal cursor-help">
                      <HardDrive className="h-4 w-4" />
                      <span className="font-normal">Save recordings</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8} className="max-w-[300px]">
                    <p>Save recorded audio files to Supabase Storage using S3 protocol. Files are stored securely in your bucket with full control over access and retention.</p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  id="save-audio-to-storage"
                  checked={saveAudioToStorage}
                  onCheckedChange={onSaveAudioToStorageChange}
                  aria-label="Toggle audio storage to Supabase"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-download-transcripts" className="flex items-center gap-2 font-normal">
                  <Download className="h-4 w-4" />
                  <span className="font-normal">Auto-download transcripts</span>
                </Label>
                <Switch
                  id="auto-download-transcripts"
                  checked={autoDownloadTranscripts}
                  onCheckedChange={onAutoDownloadTranscriptsChange}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-download-recordings" className="flex items-center gap-2 font-normal">
                  <FileDown className="h-4 w-4" />
                  <span className="font-normal">Auto-download recordings</span>
                </Label>
                <Switch
                  id="auto-download-recordings"
                  checked={autoDownloadRecordings}
                  onCheckedChange={onAutoDownloadRecordingsChange}
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button 
          variant="outline" 
          className="w-full mt-4 flex items-center gap-2 font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border-none" 
          onClick={onOpenSupabaseModal}
        >
          <img src="/LogosSupabaseIcon.svg" alt="Supabase" className="w-4 h-4" />
          Connect Supabase
        </Button>
      </SidebarFooter>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "John Doe",
            email: user?.email || "john@example.com",
            avatar: user?.avatar || "/avatars/01.png"
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

