"use client"

import TranscriptionDashboard from "../pages/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <TranscriptionDashboard />
      </SidebarProvider>
    </AuthGuard>
  )
} 