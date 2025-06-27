"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Lock, Users, Cookie, AlertTriangle } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Documentation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to the Nexogen AI documentation. Here you'll find comprehensive information about our services, compliance, and policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6" />
              <CardTitle>GDPR Compliance</CardTitle>
            </div>
            <CardDescription>
              Comprehensive information about our GDPR compliance, data protection measures, and EU infrastructure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/gdpr-compliance">View GDPR Compliance</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6" />
              <CardTitle>HIPAA Compliance</CardTitle>
            </div>
            <CardDescription>
              Detailed information about our HIPAA compliance, healthcare data protection, and security standards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/hipaa-compliance">View HIPAA Compliance</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <CardTitle>Privacy Policy</CardTitle>
            </div>
            <CardDescription>
              Our comprehensive privacy policy explaining how we collect, use, and protect your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/privacy-policy">View Privacy Policy</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <CardTitle>Terms of Service</CardTitle>
            </div>
            <CardDescription>
              The terms and conditions governing your use of our transcription services and platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/terms-of-service">View Terms of Service</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <CardTitle>Data Processing Agreement</CardTitle>
            </div>
            <CardDescription>
              Our data processing agreement outlining how we handle personal data on behalf of our users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/data-processing-agreement">View DPA</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6" />
              <CardTitle>Cookie Policy</CardTitle>
            </div>
            <CardDescription>
              Information about how we use cookies and similar technologies on our website and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/cookie-policy">View Cookie Policy</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6" />
              <CardTitle>Acceptable Use Policy</CardTitle>
            </div>
            <CardDescription>
              Guidelines for acceptable use of our services, prohibited activities, and enforcement procedures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/documentation/acceptable-use-policy">View AUP</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you have questions about any of our documentation or need assistance, please don't hesitate to contact us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Support</h4>
              <p className="text-sm text-muted-foreground">support@nexogen.ai</p>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <p className="text-sm text-muted-foreground">legal@nexogen.ai</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 