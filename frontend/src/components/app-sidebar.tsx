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
  Monitor,
  Globe,
  FileEdit,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { isEnterpriseAdmin } from "@/lib/enterprise-api"
import { motion } from "framer-motion"

import { useDashboard } from "@/app/dashboard/layout"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CreditTopUpModal } from "@/components/credit-topup-modal"
import { useI18n, locales } from "@/lib/i18n"

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
const getNavigationItems = (hasEnterprise: boolean, pathname: string, t: (key: string) => string) => [
  {
    title: t('dashboard'),
    url: '/dashboard',
    icon: BarChart3,
    isActive: pathname === '/dashboard'
  },
  {
    title: t('transcriptions'),
    url: '/dashboard/transcriptions',
    icon: FileText,
    isActive: pathname === '/dashboard/transcriptions'
  },
  {
    title: t('notes'),
    url: '/dashboard/notes',
    icon: FileEdit,
    isActive: pathname === '/dashboard/notes'
  },
  {
    title: t('billing'),
    url: '/dashboard/billing',
    icon: CreditCard,
    isActive: pathname === '/dashboard/billing'
  },
  {
            title: t('settings.title'),
    url: '/dashboard/settings',
    icon: Settings,
    isActive: pathname === '/dashboard/settings'
  },
  ...(hasEnterprise ? [{
    title: t('enterprise'),
    url: '/dashboard/enterprise',
    icon: Users,
    isActive: pathname === '/dashboard/enterprise'
  }] : [])
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isDark: boolean;
  onThemeToggle: () => void;
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
  credits,
  creditsLoading,
  takeNotes,
  onTakeNotesChange,
  user,
  isAdmin,
  hasEnterprise,
  ...props 
}: AppSidebarProps) {
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const { setMobileSidebarOpen } = useDashboard()

  const navigationItems = getNavigationItems(hasEnterprise, pathname, t)

  // For mobile, we'll render the sidebar content directly without the Sheet wrapper
  const sidebarContent = (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 mb-4 px-2 pt-2 w-full">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src="/icon.png" alt="Nexogen AI" className="w-8 h-8" />
            <h2 className="text-sidebar-foreground font-medium">{t('appName')}</h2>
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

            {/* Theme Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onThemeToggle}
                  className="h-8 w-8 p-0 hidden lg:flex"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="z-[9999]">
                <p>{t('toggleTheme')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Credits Display */}
        <div className="mx-4 mb-4">
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

        {/* Transcription Mode Toggle */}
        {takeNotes !== undefined && onTakeNotesChange && (
          <motion.div 
            className="px-4 mb-4"
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
                      {takeNotes ? t('notesMode') : t('transcriptionMode')}
                    </motion.span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="max-w-[300px] z-[99999] relative">
                <p>
                  {takeNotes 
                    ? t('switchToTranscriptionMode') 
                    : t('switchToNotesMode')
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
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

