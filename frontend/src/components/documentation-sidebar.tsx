"use client"

import Link from "next/link"
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  Cookie, 
  AlertTriangle,
  ChevronRight,
  BookOpen
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface DocumentationSidebarProps {
  selectedSection: string
  onSectionChange: (section: string) => void
}

const documentationSections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    description: "Documentation overview and quick links",
    href: "/documentation"
  },
  {
    id: "gdpr-compliance",
    title: "GDPR Compliance",
    icon: Shield,
    description: "EU data protection and compliance",
    href: "/documentation/gdpr-compliance"
  },
  {
    id: "hipaa-compliance",
    title: "HIPAA Compliance",
    icon: Lock,
    description: "Healthcare data protection standards",
    href: "/documentation/hipaa-compliance"
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: FileText,
    description: "How we handle your personal data",
    href: "/documentation/privacy-policy"
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    icon: FileText,
    description: "Service terms and conditions",
    href: "/documentation/terms-of-service"
  },
  {
    id: "data-processing-agreement",
    title: "Data Processing Agreement",
    icon: Users,
    description: "Data processing terms and obligations",
    href: "/documentation/data-processing-agreement"
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy",
    icon: Cookie,
    description: "Cookie usage and management",
    href: "/documentation/cookie-policy"
  },
  {
    id: "acceptable-use-policy",
    title: "Acceptable Use Policy",
    icon: AlertTriangle,
    description: "Usage guidelines and restrictions",
    href: "/documentation/acceptable-use-policy"
  }
]

export function DocumentationSidebar({ selectedSection, onSectionChange }: DocumentationSidebarProps) {
  return (
    <div className="space-y-4">
      <SidebarGroup>
        <SidebarGroupLabel>Documentation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {documentationSections.map((section) => {
              const Icon = section.icon
              return (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    isActive={selectedSection === section.id}
                    onClick={() => onSectionChange(section.id)}
                    asChild
                    className="w-full justify-start"
                  >
                    <Link href={section.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs text-muted-foreground">{section.description}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  )
} 