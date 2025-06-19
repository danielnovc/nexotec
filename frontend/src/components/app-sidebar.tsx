"use client"
import type * as React from "react"
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
    title: "Live Transcription",
    url: "#",
    icon: Mic,
    isActive: true,
  },
  {
    title: "Transcription History",
    url: "#",
    icon: History,
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
]

const toolsItems = [
  {
    title: "Export Transcripts",
    url: "#",
    icon: Download,
  },
  {
    title: "Text Editor",
    url: "#",
    icon: FileText,
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
  takeNotes: boolean;
  onTakeNotesChange: (checked: boolean) => void;
  onOpenSupabaseModal: () => void;
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
  takeNotes,
  onTakeNotesChange,
  onOpenSupabaseModal,
  ...props 
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <a href="#" className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="TranscribeAI" className="h-12" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  onClick={onThemeToggle}
                  className="transition-colors"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="space-y-4 px-4 mt-4">
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

              <div className="flex items-center justify-between space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="take-notes" className="flex items-center gap-2 font-normal cursor-help">
                      <FileText className="h-4 w-4" />
                      <span className="font-normal">Take notes</span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8} className="max-w-[300px]">
                    <p>Switch to note-taking mode to display transcription as a continuous text instead of a chat-style conversation.</p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  id="take-notes"
                  checked={takeNotes}
                  onCheckedChange={onTakeNotesChange}
                  aria-label="Toggle note-taking mode"
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
            name: "John Doe",
            email: "john@example.com",
            avatar: "/avatars/01.png"
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

