"use client"

import * as React from "react"
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
} from "@/components/ui/sidebar"

// Documentation data structure
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/documentation/quick-start",
      items: [
        {
          title: "Introduction",
          url: "#introduction",
          isActive: true,
        },
        {
          title: "Quick Start Guide",
          url: "/documentation/quick-start",
        },
        {
          title: "Installation",
          url: "#installation",
        },
        {
          title: "First Transcription",
          url: "#first-transcription",
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
          url: "#export",
        },
      ],
    },
    {
      title: "Security & Privacy",
      url: "#",
      items: [
        {
          title: "Encryption",
          url: "#encryption",
        },
        {
          title: "Data Storage",
          url: "#storage",
        },
        {
          title: "Compliance",
          url: "#compliance",
        },
        {
          title: "Access Controls",
          url: "#access-controls",
        },
        {
          title: "GDPR Compliance",
          url: "#gdpr-compliance",
        },
        {
          title: "HIPAA Compliance",
          url: "#hipaa-compliance",
        },
      ],
    },
    {
      title: "Legal & Policies",
      url: "#",
      items: [
        {
          title: "Privacy Policy",
          url: "#privacy-policy",
        },
        {
          title: "Terms of Service",
          url: "#terms-of-service",
        },
        {
          title: "Data Processing Agreement",
          url: "#dpa",
        },
        {
          title: "Cookie Policy",
          url: "#cookie-policy",
        },
        {
          title: "Acceptable Use Policy",
          url: "#acceptable-use",
        },
      ],
    },
    {
      title: "Pricing & Billing",
      url: "#",
      items: [
        {
          title: "Pricing Plans",
          url: "#pricing",
        },
        {
          title: "Credit System",
          url: "#credits",
        },
        {
          title: "Billing & Invoices",
          url: "#billing",
        },
        {
          title: "Enterprise",
          url: "#enterprise",
        },
      ],
    },
    {
      title: "Support & Help",
      url: "#",
      items: [
        {
          title: "FAQ",
          url: "#faq",
        },
        {
          title: "Contact Support",
          url: "#support",
        },
        {
          title: "Community",
          url: "#community",
        },
        {
          title: "Troubleshooting",
          url: "#troubleshooting",
        },
      ],
    },
  ],
}

export default function DocumentationDashboard() {
  const [selectedSection, setSelectedSection] = React.useState("introduction")

  const documentationContent = {
    "introduction": {
      title: "Welcome to Transcrib",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Transcrib</h2>
            <p className="text-muted-foreground mb-6">
              Transcrib is a professional AI-powered transcription service that converts audio to text with speaker diarization, 
              advanced processing, and advanced features for note-taking and analysis.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mic className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Start Recording</h3>
                  <p className="text-sm text-muted-foreground">Click the microphone button to begin recording audio</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Get Transcription</h3>
                  <p className="text-sm text-muted-foreground">AI processes your audio and generates accurate transcriptions</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Export & Share</h3>
                  <p className="text-sm text-muted-foreground">Download as PDF or copy text for your needs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Speaker Diarization</h4>
                    <p className="text-sm text-muted-foreground">Automatically identify and label different speakers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Advanced Processing</h4>
                    <p className="text-sm text-muted-foreground">Get accurate transcriptions with professional quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">End-to-End Encryption</h4>
                    <p className="text-sm text-muted-foreground">Your audio and transcriptions are securely encrypted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Cloud Storage</h4>
                    <p className="text-sm text-muted-foreground">Store and manage your transcriptions securely</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "live-recording": {
      title: "Live Recording",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Live Recording</h2>
            <p className="text-muted-foreground mb-6">
              Record audio and get accurate transcriptions with our advanced live recording feature.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Recording</h4>
                    <p className="text-sm text-muted-foreground">Click the microphone button to begin recording. The system will request microphone permissions if needed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Advanced Processing</h4>
                    <p className="text-sm text-muted-foreground">Audio is processed efficiently and transcriptions are delivered with high accuracy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Stop & Save</h4>
                    <p className="text-sm text-muted-foreground">Click stop to end recording and save your transcription.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Multiple microphone support</li>
                <li>• Advanced audio processing</li>
                <li>• Background noise reduction</li>
                <li>• Recording duration tracking</li>
                <li>• Automatic format conversion</li>
                <li>• Speaker diarization with high accuracy</li>
                <li>• Audio recordings during live sessions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )
    },
    "pricing": {
      title: "Pricing Plans",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-muted-foreground mb-6">
              Simple, transparent pricing with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pay As You Go</CardTitle>
                <CardDescription>Perfect for occasional use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$0.10<span className="text-lg text-muted-foreground">/minute</span></div>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• No monthly commitment</li>
                  <li>• Pay only for what you use</li>
                  <li>• $0.10 minimum per upload</li>
                  <li>• All features included</li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500">
              <CardHeader>
                <CardTitle>Starter Pack</CardTitle>
                <CardDescription>Most popular choice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$10<span className="text-lg text-muted-foreground">/month</span></div>
                <div className="text-sm text-muted-foreground mb-4">100 minutes included</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• 100 minutes per month</li>
                  <li>• Priority processing</li>
                  <li>• Advanced analytics</li>
                  <li>• Email support</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For teams and businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">$50<span className="text-lg text-muted-foreground">/month</span></div>
                <div className="text-sm text-muted-foreground mb-4">600 minutes included</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• 600 minutes per month</li>
                  <li>• Team collaboration</li>
                  <li>• API access</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    "gdpr-compliance": {
      title: "GDPR Compliance",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">GDPR Compliance</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground mb-6">
              Transcrib is fully compliant with the General Data Protection Regulation (GDPR), ensuring the highest standards of data protection and privacy for EU residents. This document outlines our comprehensive approach to GDPR compliance.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. EU Infrastructure and Data Sovereignty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">EU-Based Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">
                    All Transcrib services are hosted on EU-based infrastructure to ensure data sovereignty and compliance with GDPR requirements. Our data centers are located within the European Union, providing guaranteed data residency and protection under EU law.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• All servers located within EU member states</li>
                    <li>• EU-based cloud providers (AWS EU regions, Google Cloud EU)</li>
                    <li>• No data transfer outside EU without explicit consent</li>
                    <li>• Compliance with local data protection laws</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Sovereignty</h4>
                  <p className="text-sm text-muted-foreground">
                    We maintain full control over data location and processing, ensuring that EU user data remains within EU borders and is subject to EU data protection laws.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• Complete data residency control</li>
                    <li>• EU-based processing and storage</li>
                    <li>• Protection under EU legal framework</li>
                    <li>• No third-party access to EU data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Encryption and Security Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    We implement industry-leading encryption standards to protect your data at every stage of processing and storage.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• AES-256 encryption for data at rest</li>
                    <li>• TLS 1.3 encryption for data in transit</li>
                    <li>• Client-side encryption for sensitive files</li>
                    <li>• Encrypted backups and archives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Infrastructure</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-factor authentication (MFA) for all accounts</li>
                    <li>• Role-based access controls (RBAC)</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• 24/7 security monitoring and threat detection</li>
                    <li>• Secure key management and rotation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Legal Basis for Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We process personal data based on the following legal grounds under GDPR Article 6:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contract Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing is necessary for the performance of our transcription services contract with you.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legitimate Interests</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing is necessary for our legitimate interests in providing and improving our services, ensuring security, and preventing fraud.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Consent</h4>
                    <p className="text-sm text-muted-foreground">
                      Where required, we obtain explicit consent for specific processing activities, such as marketing communications.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legal Obligations</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing is necessary to comply with legal obligations, such as tax requirements and data retention laws.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Protection Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Lawfulness, Fairness, and Transparency</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All data processing is based on clear legal grounds</li>
                    <li>• Processing activities are transparent and communicated to users</li>
                    <li>• Fair treatment of all data subjects</li>
                    <li>• Clear privacy notices and information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Purpose Limitation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data is collected for specified, explicit, and legitimate purposes</li>
                    <li>• No further processing incompatible with original purposes</li>
                    <li>• Clear documentation of processing purposes</li>
                    <li>• Regular review of processing activities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Minimization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Only necessary data is collected and processed</li>
                    <li>• Regular data audits to ensure minimization</li>
                    <li>• Avoidance of excessive data collection</li>
                    <li>• Purpose-driven data collection practices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Accuracy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reasonable steps to ensure data accuracy</li>
                    <li>• Prompt correction of inaccurate data</li>
                    <li>• User tools for data verification</li>
                    <li>• Regular data quality assessments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Storage Limitation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data retention periods clearly defined</li>
                    <li>• Automatic deletion of expired data</li>
                    <li>• Regular review of retention policies</li>
                    <li>• Secure deletion methods for sensitive information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Integrity and Confidentiality</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Appropriate security measures implemented</li>
                    <li>• Protection against unauthorized access</li>
                    <li>• Encryption of data at rest and in transit</li>
                    <li>• Regular security assessments and updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Subject Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Under GDPR Articles 15-22, you have the following rights regarding your personal data:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Right to Access (Article 15)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can request confirmation of whether we process your personal data and receive a copy of the data we hold about you, including information about the processing purposes, categories of data, recipients, and retention periods.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Right to Rectification (Article 16)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can request correction of inaccurate personal data and completion of incomplete data. We will respond to such requests without undue delay.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Right to Erasure (Article 17)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can request deletion of your personal data in specific circumstances, such as when the data is no longer necessary, consent is withdrawn, or processing is unlawful.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Right to Portability (Article 20)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can receive your personal data in a structured, commonly used, machine-readable format and transmit it to another controller without hindrance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Right to Object (Article 21)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can object to processing based on legitimate interests or for direct marketing purposes. We will stop processing unless we demonstrate compelling legitimate grounds.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Right to Restriction (Article 18)</h4>
                      <p className="text-sm text-muted-foreground">
                        You can request restriction of processing in specific circumstances, such as when you contest data accuracy or object to processing.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Exercising Your Rights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Submit requests through our privacy portal or email</li>
                    <li>• We respond to all requests within 30 days</li>
                    <li>• No fees for standard requests</li>
                    <li>• Identity verification required for security</li>
                    <li>• Right to lodge complaints with supervisory authorities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Protection Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Technical Safeguards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Database className="h-5 w-5 mt-1" />
                        <div>
                          <h5 className="font-semibold">Encryption</h5>
                          <p className="text-sm text-muted-foreground">AES-256 encryption for data at rest, TLS 1.3 for data in transit</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 mt-1" />
                        <div>
                          <h5 className="font-semibold">Access Controls</h5>
                          <p className="text-sm text-muted-foreground">Multi-factor authentication, role-based access, session management</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 mt-1" />
                        <div>
                          <h5 className="font-semibold">Audit Logging</h5>
                          <p className="text-sm text-muted-foreground">Comprehensive audit trails for all data access and modifications</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 mt-1" />
                        <div>
                          <h5 className="font-semibold">Data Segregation</h5>
                          <p className="text-sm text-muted-foreground">Logical and physical separation of different data categories</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Organizational Safeguards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold">Data Protection Officer</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dedicated DPO for compliance oversight</li>
                        <li>• Independent reporting structure</li>
                        <li>• Regular compliance assessments</li>
                        <li>• Contact: dpo@transcrib.com</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Staff Training</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Regular GDPR training programs</li>
                        <li>• Data handling procedures</li>
                        <li>• Incident response training</li>
                        <li>• Confidentiality agreements</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Infrastructure Security</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold">EU-Based Infrastructure</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• All data stored within EU borders</li>
                        <li>• EU-based cloud providers</li>
                        <li>• Data sovereignty compliance</li>
                        <li>• Local data protection laws</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Physical Security</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Secure data centers with 24/7 monitoring</li>
                        <li>• Restricted access controls</li>
                        <li>• Environmental controls</li>
                        <li>• Disaster recovery procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Data Breach Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Breach Detection and Assessment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automated monitoring systems for breach detection</li>
                    <li>• 24/7 security operations center</li>
                    <li>• Immediate incident response procedures</li>
                    <li>• Risk assessment within 72 hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Notification Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Supervisory authority notification within 72 hours</li>
                    <li>• Data subject notification without undue delay</li>
                    <li>• Detailed breach documentation and reporting</li>
                    <li>• Regular updates on breach status</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Remediation and Prevention</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Immediate containment and mitigation measures</li>
                    <li>• Root cause analysis and lessons learned</li>
                    <li>• Security improvements and policy updates</li>
                    <li>• Regular breach response testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For GDPR-related inquiries and to exercise your rights:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Data Protection Officer</h4>
                    <p className="text-sm text-muted-foreground">dpo@transcrib.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Privacy Team</h4>
                    <p className="text-sm text-muted-foreground">privacy@transcrib.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Supervisory Authority</h4>
                  <p className="text-sm text-muted-foreground">
                    You have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not addressed your concerns adequately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "hipaa-compliance": {
      title: "HIPAA Compliance",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">HIPAA Compliance</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground mb-6">
              Transcrib meets all requirements of the Health Insurance Portability and Accountability Act (HIPAA), ensuring secure handling of Protected Health Information (PHI) for healthcare professionals. Our EU-based infrastructure and advanced encryption provide additional security layers beyond HIPAA requirements.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. EU Infrastructure and Data Sovereignty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">EU-Based Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">
                    While HIPAA doesn't require specific geographic data storage, we maintain all PHI on EU-based infrastructure to provide additional security and data sovereignty benefits beyond HIPAA requirements.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• All PHI stored within EU member states</li>
                    <li>• EU-based cloud providers with HIPAA compliance</li>
                    <li>• Enhanced data protection under EU regulations</li>
                    <li>• Local data sovereignty and control</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Sovereignty Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    Our EU infrastructure provides additional protection for PHI, ensuring data remains under strict European data protection laws while meeting all HIPAA requirements.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• Protection under GDPR and local EU laws</li>
                    <li>• Enhanced privacy rights for EU residents</li>
                    <li>• Stricter data processing limitations</li>
                    <li>• Additional breach notification requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Advanced Encryption and Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    We implement industry-leading encryption that exceeds HIPAA requirements to provide maximum protection for PHI.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                    <li>• AES-256 encryption for all PHI at rest</li>
                    <li>• TLS 1.3 encryption for data in transit</li>
                    <li>• Client-side encryption for sensitive files</li>
                    <li>• Encrypted backups and disaster recovery</li>
                    <li>• Secure key management and rotation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Infrastructure</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-factor authentication (MFA) for all users</li>
                    <li>• Role-based access controls (RBAC)</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• 24/7 security monitoring and threat detection</li>
                    <li>• Automated breach detection systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. HIPAA Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is HIPAA?</h4>
                  <p className="text-sm text-muted-foreground">
                    The Health Insurance Portability and Accountability Act (HIPAA) is a U.S. federal law that establishes national standards for protecting sensitive patient health information. It applies to covered entities (healthcare providers, health plans, healthcare clearinghouses) and their business associates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Our Role as a Business Associate</h4>
                  <p className="text-sm text-muted-foreground">
                    Transcrib acts as a business associate when we provide transcription services to healthcare providers. We process, store, and transmit PHI on behalf of covered entities, making HIPAA compliance essential to our operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Protected Health Information (PHI)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Individually identifiable health information</li>
                    <li>• Medical records, treatment plans, and diagnoses</li>
                    <li>• Patient conversations and consultations</li>
                    <li>• Payment and insurance information</li>
                    <li>• Any information that could identify a patient</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. HIPAA Security Rule Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Administrative Safeguards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold">Security Management Process</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Regular risk assessments and analysis</li>
                        <li>• Risk management and mitigation strategies</li>
                        <li>• Security incident procedures</li>
                        <li>• Contingency planning and disaster recovery</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Workforce Security</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Employee screening and background checks</li>
                        <li>• Role-based access controls</li>
                        <li>• Termination procedures and access removal</li>
                        <li>• Regular security training and awareness</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Physical Safeguards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold">Facility Access Controls</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Secure EU data centers with restricted access</li>
                        <li>• 24/7 security monitoring and surveillance</li>
                        <li>• Visitor management and escort procedures</li>
                        <li>• Environmental controls and monitoring</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Workstation and Device Security</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Secure workstation configurations</li>
                        <li>• Automatic screen locks and timeouts</li>
                        <li>• Device encryption and access controls</li>
                        <li>• Media disposal and sanitization procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Technical Safeguards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold">Access Control</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Unique user identification and authentication</li>
                        <li>• Multi-factor authentication (MFA)</li>
                        <li>• Automatic logoff and session management</li>
                        <li>• Role-based permissions and access levels</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Transmission Security</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• TLS 1.3 encryption for data in transit</li>
                        <li>• Secure file transfer protocols</li>
                        <li>• End-to-end encryption for communications</li>
                        <li>• Integrity verification and checksums</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Business Associate Agreement (BAA)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  HIPAA requires covered entities to have written agreements with business associates that outline how PHI will be protected. Our BAA includes all required provisions under HIPAA.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">BAA Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• PHI use and disclosure limitations</li>
                      <li>• Security safeguards implementation</li>
                      <li>• Breach notification procedures</li>
                      <li>• Subcontractor compliance requirements</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Covered Services:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Audio transcription services</li>
                      <li>• Secure data storage and processing</li>
                      <li>• Note-taking and documentation</li>
                      <li>• Data export and deletion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. PHI Protection Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-semibold">Secure Data Storage</h4>
                    <p className="text-sm text-muted-foreground">All PHI is encrypted using AES-256 encryption and stored on HIPAA-compliant EU infrastructure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-semibold">Access Controls</h4>
                    <p className="text-sm text-muted-foreground">Multi-factor authentication and role-based access controls ensure only authorized personnel can access PHI.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-semibold">Audit Trails</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive logging of all PHI access, modifications, and disclosures for compliance monitoring.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-semibold">Breach Notification</h4>
                    <p className="text-sm text-muted-foreground">Automated breach detection and notification procedures within 60 days as required by HIPAA.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Compliance Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-muted-foreground">Security, availability, and confidentiality controls</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Database className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">ISO 27001</h3>
                  <p className="text-sm text-muted-foreground">Information security management system</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">HIPAA</h3>
                  <p className="text-sm text-muted-foreground">Healthcare data protection compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For HIPAA compliance inquiries and BAA requests:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">HIPAA Compliance Officer</h4>
                    <p className="text-sm text-muted-foreground">hipaa@transcrib.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Legal Department</h4>
                    <p className="text-sm text-muted-foreground">legal@transcrib.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Emergency Contact</h4>
                  <p className="text-sm text-muted-foreground">
                    For security incidents and breach notifications: security@transcrib.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Name and email address for account creation</li>
                  <li>• Payment information for subscription services</li>
                  <li>• Profile information and preferences</li>
                  <li>• Communication records with our support team</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Audio Data</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Audio files uploaded for transcription</li>
                  <li>• Audio recordings during live sessions</li>
                  <li>• Generated transcriptions and notes</li>
                  <li>• Speaker identification data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Data</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Service usage patterns and analytics</li>
                  <li>• Device information and browser data</li>
                  <li>• IP addresses and location data</li>
                  <li>• Cookies and tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Service Provision</h4>
                    <p className="text-sm text-muted-foreground">To provide transcription services, process payments, and maintain your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Communication</h4>
                    <p className="text-sm text-muted-foreground">To send service updates, support responses, and important notifications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Improvement</h4>
                    <p className="text-sm text-muted-foreground">To improve our services, develop new features, and enhance user experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-yellow-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Security</h4>
                    <p className="text-sm text-muted-foreground">To ensure platform security, prevent fraud, and comply with legal obligations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Service Providers</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Cloud hosting and storage providers</li>
                      <li>• Payment processing services</li>
                      <li>• Analytics and monitoring tools</li>
                      <li>• Customer support platforms</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Legal Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Compliance with applicable laws</li>
                      <li>• Response to legal requests</li>
                      <li>• Protection of rights and safety</li>
                      <li>• Business transfers or mergers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Retention and Deletion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Retention Periods</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Account data: Retained while account is active</li>
                    <li>• Audio files: Deleted after 30 days unless saved</li>
                    <li>• Transcriptions: Retained based on user settings</li>
                    <li>• Payment data: Retained for legal compliance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Deletion</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Account deletion removes all associated data</li>
                    <li>• Manual deletion options for individual files</li>
                    <li>• Automatic cleanup of temporary processing data</li>
                    <li>• Secure deletion methods for sensitive information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Access and Control</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• View and download your data</li>
                    <li>• Update account information</li>
                    <li>• Delete files and transcriptions</li>
                    <li>• Export data in portable formats</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Communication Preferences</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Opt-out of marketing communications</li>
                    <li>• Control notification settings</li>
                    <li>• Manage cookie preferences</li>
                    <li>• Request data processing restrictions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For questions about this Privacy Policy or to exercise your rights, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-sm text-muted-foreground">privacy@transcrib.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Data Protection Officer</h4>
                    <p className="text-sm text-muted-foreground">dpo@transcrib.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "terms-of-service": {
      title: "Terms of Service",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By accessing or using Transcrib's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Transcrib provides AI-powered audio transcription services, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Core Services</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Audio file transcription</li>
                      <li>• Live recording and transcription</li>
                      <li>• Speaker diarization</li>
                      <li>• Note-taking and documentation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Additional Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multiple export formats</li>
                      <li>• Cloud storage and management</li>
                      <li>• API access for developers</li>
                      <li>• Team collaboration tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Accounts and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Creation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• You must be at least 18 years old or have parental consent</li>
                    <li>• One account per person unless otherwise authorized</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Uploading illegal or harmful content</li>
                    <li>• Attempting to reverse engineer our services</li>
                    <li>• Interfering with service operation</li>
                    <li>• Violating intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Payment and Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Pricing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pay-as-you-go: $0.10 per minute</li>
                    <li>• Monthly plans with included minutes</li>
                    <li>• Enterprise pricing available on request</li>
                    <li>• All prices are in USD unless otherwise stated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Billing Terms</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Payment is due immediately for pay-as-you-go</li>
                    <li>• Monthly plans are billed in advance</li>
                    <li>• No refunds for used minutes or services</li>
                    <li>• Late payments may result in service suspension</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Your Content</h4>
                  <p className="text-sm text-muted-foreground">
                    You retain ownership of your audio files and transcriptions. You grant us a limited license to process your content for service provision.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Our Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Transcrib's software, algorithms, and platform are protected by intellectual property laws. You may not copy, modify, or distribute our technology.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Transcrib provides services "as is" without warranties. Our liability is limited to the amount paid for services in the 12 months preceding any claim.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">We Are Not Liable For:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Accuracy of transcriptions</li>
                      <li>• Data loss or corruption</li>
                      <li>• Service interruptions</li>
                      <li>• Third-party actions</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Your Responsibilities:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Verify transcription accuracy</li>
                      <li>• Backup important data</li>
                      <li>• Use services appropriately</li>
                      <li>• Comply with applicable laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Termination</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You may cancel your account at any time</li>
                    <li>• We may terminate accounts for policy violations</li>
                    <li>• Outstanding payments must be settled</li>
                    <li>• Data deletion occurs within 30 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Effect of Termination</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Immediate loss of service access</li>
                    <li>• Permanent deletion of account data</li>
                    <li>• No refunds for unused services</li>
                    <li>• Survival of certain terms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Legal Department</h4>
                    <p className="text-sm text-muted-foreground">legal@transcrib.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Customer Support</h4>
                    <p className="text-sm text-muted-foreground">support@transcrib.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "dpa": {
      title: "Data Processing Agreement",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Data Processing Agreement (DPA)</h2>
            <p className="text-muted-foreground mb-6">
              This Data Processing Agreement forms part of our Terms of Service and outlines how we process personal data on your behalf in compliance with GDPR Article 28.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Definitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Data Controller</h4>
                    <p className="text-sm text-muted-foreground">You, the customer, who determines the purposes and means of processing personal data.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Processor</h4>
                    <p className="text-sm text-muted-foreground">Transcrib, who processes personal data on behalf of the controller.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Personal Data</h4>
                    <p className="text-sm text-muted-foreground">Any information relating to an identified or identifiable natural person.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Any operation performed on personal data, including collection, storage, and analysis.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Processing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Subject Matter</h4>
                  <p className="text-sm text-muted-foreground">Audio transcription services and related data processing activities.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duration</h4>
                  <p className="text-sm text-muted-foreground">For the duration of the service agreement and until data deletion is completed.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Nature and Purpose</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Audio file processing and transcription</li>
                    <li>• Speaker identification and diarization</li>
                    <li>• Data storage and retrieval</li>
                    <li>• Service improvement and analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Processor Obligations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Processing Instructions</h4>
                    <p className="text-sm text-muted-foreground">We will only process personal data in accordance with your documented instructions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Confidentiality</h4>
                    <p className="text-sm text-muted-foreground">All personnel are bound by confidentiality obligations regarding personal data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Security Measures</h4>
                    <p className="text-sm text-muted-foreground">We implement appropriate technical and organizational security measures.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "cookie-policy": {
      title: "Cookie Policy",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience and understand how you use our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Essential Cookies</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Authentication</p>
                        <p className="text-xs text-muted-foreground">Maintain your login session and security</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Security</p>
                        <p className="text-xs text-muted-foreground">Protect against fraud and unauthorized access</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Functionality</p>
                        <p className="text-xs text-muted-foreground">Remember your preferences and settings</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Analytics Cookies</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Usage Analytics</p>
                        <p className="text-xs text-muted-foreground">Understand how users interact with our services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">Performance Monitoring</p>
                        <p className="text-xs text-muted-foreground">Monitor service performance and identify issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    You can control cookies through your browser settings. However, disabling essential cookies may affect the functionality of our services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cookie Preferences</h4>
                  <p className="text-sm text-muted-foreground">
                    Use our cookie preference center to manage your cookie settings and opt-out of non-essential cookies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    "acceptable-use": {
      title: "Acceptable Use Policy",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This Acceptable Use Policy outlines the rules and guidelines for using Transcrib's services. By using our services, you agree to comply with this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Permitted Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You may use our services for the following purposes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Professional Use</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Business meetings and presentations</li>
                      <li>• Legal proceedings and depositions</li>
                      <li>• Medical consultations and therapy sessions</li>
                      <li>• Academic lectures and research</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Personal Use</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Personal voice notes and memos</li>
                      <li>• Family conversations and interviews</li>
                      <li>• Educational content and podcasts</li>
                      <li>• Creative projects and content creation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You may not use our services for any of the following purposes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Illegal Activities</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Violating applicable laws or regulations</li>
                        <li>• Infringing intellectual property rights</li>
                        <li>• Engaging in fraud or deception</li>
                        <li>• Facilitating criminal activities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Harmful Content</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Hate speech or discrimination</li>
                        <li>• Threats or harassment</li>
                        <li>• Violence or extremism</li>
                        <li>• Child exploitation or abuse</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">System Abuse</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Attempting to hack or breach security</li>
                        <li>• Overloading or disrupting services</li>
                        <li>• Reverse engineering our technology</li>
                        <li>• Creating multiple accounts to evade limits</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Privacy Violations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Recording without consent</li>
                        <li>• Sharing private information</li>
                        <li>• Impersonating others</li>
                        <li>• Collecting data without permission</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Enforcement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Violation Consequences</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Warning and content removal</li>
                    <li>• Temporary account suspension</li>
                    <li>• Permanent account termination</li>
                    <li>• Legal action if necessary</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reporting Violations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Report violations to abuse@transcrib.com</li>
                    <li>• Provide specific details and evidence</li>
                    <li>• We investigate all reports promptly</li>
                    <li>• Confidentiality maintained for reporters</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
  }

  const currentContent = documentationContent[selectedSection as keyof typeof documentationContent]

  return (
    <div className="flex flex-1">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 mb-4">
            <img src="/icon.png" alt="Transcrib" className="w-8 h-8" />
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
                            isActive={subItem.isActive}
                            onClick={() => setSelectedSection(subItem.url.replace('#', ''))}
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
                <BreadcrumbPage>Documentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-4xl mx-auto">
            {currentContent?.content || (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Select a topic</h2>
                <p className="text-muted-foreground">Choose a section from the sidebar to view documentation</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 