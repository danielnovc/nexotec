"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"

export default function TranscriptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </AuthGuard>
  )
} 