"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  FileText, 
  Mic, 
  Settings, 
  Download, 
  Upload, 
  CreditCard, 
  Shield, 
  Zap,
  Users,
  Database,
  Code,
  HelpCircle,
  ExternalLink
} from "lucide-react"
import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Documentation data structure
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Introduction",
          url: "/documentation",
        },
        {
          title: "Quick Start Guide",
          url: "/documentation/quick-start",
        },
        {
          title: "First Note",
          url: "/documentation/first-note",
        },
        {
          title: "First Transcription",
          url: "/documentation/first-transcription",
        },
      ],
    },
    {
      title: "Core Features",
      url: "#",
      items: [
        {
          title: "Live Recording",
          url: "/documentation/live-recording",
        },
        {
          title: "File Upload",
          url: "/documentation/file-upload",
        },
        {
          title: "Speaker Diarization",
          url: "/documentation/speaker-diarization",
        },
        {
          title: "Note-taking Mode",
          url: "/documentation/note-taking",
        },
        {
          title: "Export Options",
          url: "/documentation#export",
        },
      ],
    },
    {
      title: "Security & Privacy",
      url: "#",
      items: [
        {
          title: "Encryption",
          url: "/documentation/encryption",
        },
        {
          title: "Data Storage",
          url: "/documentation#storage",
        },
        {
          title: "Compliance",
          url: "/documentation#compliance",
        },
        {
          title: "Access Controls",
          url: "/documentation#access-controls",
        },
        {
          title: "GDPR Compliance",
          url: "/documentation/gdpr-compliance",
        },
        {
          title: "HIPAA Compliance",
          url: "/documentation/hipaa-compliance",
        },
      ],
    },
    {
      title: "Legal & Policies",
      url: "#",
      items: [
        {
          title: "Privacy Policy",
          url: "/documentation/privacy-policy",
        },
        {
          title: "Terms of Service",
          url: "/documentation/terms-of-service",
        },
        {
          title: "Data Processing Agreement",
          url: "/documentation/data-processing-agreement",
        },
        {
          title: "Cookie Policy",
          url: "/documentation/cookie-policy",
        },
        {
          title: "Acceptable Use Policy",
          url: "/documentation/acceptable-use-policy",
        },
      ],
    },
    {
      title: "Pricing & Billing",
      url: "#",
      items: [
        {
          title: "Pricing Plans",
          url: "/documentation/pricing",
        },
        {
          title: "Credit System",
          url: "/documentation#credits",
        },
        {
          title: "Billing & Invoices",
          url: "/documentation#billing",
        },
        {
          title: "Enterprise",
          url: "/documentation#enterprise",
        },
      ],
    },
    {
      title: "Support & Help",
      url: "#",
      items: [
        {
          title: "FAQ",
          url: "/documentation#faq",
        },
        {
          title: "Contact Support",
          url: "/documentation#support",
        },
        {
          title: "Community",
          url: "/documentation#community",
        },
        {
          title: "Troubleshooting",
          url: "/documentation#troubleshooting",
        },
      ],
    },
  ],
}

// Function to get page title from pathname
function getPageTitle(pathname: string): string {
  const pathMap: { [key: string]: string } = {
    "/documentation": "Documentation",
    "/documentation/quick-start": "Quick Start Guide",
    "/documentation/first-note": "First Note",
    "/documentation/first-transcription": "First Transcription",
    "/documentation/gdpr-compliance": "GDPR Compliance",
    "/documentation/hipaa-compliance": "HIPAA Compliance",
    "/documentation/privacy-policy": "Privacy Policy",
    "/documentation/terms-of-service": "Terms of Service",
    "/documentation/data-processing-agreement": "Data Processing Agreement",
    "/documentation/cookie-policy": "Cookie Policy",
    "/documentation/acceptable-use-policy": "Acceptable Use Policy",
    "/documentation/live-recording": "Live Recording",
    "/documentation/file-upload": "File Upload",
    "/documentation/speaker-diarization": "Speaker Diarization",
    "/documentation/note-taking": "Note-taking Mode",
    "/documentation/pricing": "Pricing Plans",
  }
  return pathMap[pathname] || "Documentation"
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <SidebarProvider>
      <div className="flex flex-1">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 mb-4">
              <img src="/icon.png" alt="Nexogen AI" className="w-8 h-8" />
              <h2 className="text-sidebar-foreground font-medium">Nexogen AI</h2>
            </div>
            <SearchForm />
          </SidebarHeader>
          <SidebarContent className="gap-0">
            {/* We create a collapsible SidebarGroup for each parent. */}
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                  >
                    <CollapsibleTrigger>
                      {item.title}{" "}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton 
                              asChild 
                              isActive={pathname === subItem.url}
                            >
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/documentation">
                    Documentation
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathname !== "/documentation" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <ScrollArea className="flex-1">
            <div className="p-6 max-w-4xl mx-auto">
              {children}
            </div>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  )
} 