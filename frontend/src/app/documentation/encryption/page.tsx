"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Server, Smartphone, Globe, Database, FileText, CheckCircle, AlertTriangle } from "lucide-react"

export default function EncryptionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Encryption & Security</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade encryption protecting your data at rest and in transit across all platforms
          </p>
        </div>

        {/* Security Overview */}
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="h-5 w-5" />
              Security Status: EXCELLENT
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your application is fully secured with industry-leading encryption standards
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Encryption at Rest */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Encryption at Rest
            </CardTitle>
            <CardDescription>
              All sensitive data is encrypted before storage using industry-standard encryption algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Database Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Advanced encryption standards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure key derivation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Unique encryption per record
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Client-side encryption before storage
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  File Storage Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Audio files encrypted before upload
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Metadata encryption included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure key generation per user
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Local storage encryption (mobile)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption in Transit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Encryption in Transit
            </CardTitle>
            <CardDescription>
              TLS encryption for all communications with secure cipher suites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Backend Services
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">TLS 1.3</Badge>
                    <span className="text-sm">All API endpoints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Strong Ciphers</Badge>
                    <span className="text-sm">Certificate keys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Secure Suites</Badge>
                    <span className="text-sm">Cipher suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Modern Standards</Badge>
                    <span className="text-sm">Alternative ciphers</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Frontend & Mobile
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    HTTPS-only communications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure WebSocket connections
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Certificate pinning support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    CORS security headers
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-600" />
              SSL/TLS Certificates
            </CardTitle>
            <CardDescription>
              Enterprise-grade certificates for all backend services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Main Backend</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ Valid Certificate</div>
                  <div>✅ Private Key</div>
                  <div>✅ Certificate Chain</div>
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Notes Service</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ Valid Certificate</div>
                  <div>✅ Private Key</div>
                  <div>✅ Full Certificate Chain</div>
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Summary Service</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ Valid Certificate</div>
                  <div>✅ Private Key</div>
                  <div>✅ Certificate Chain</div>
                  <div>✅ Full Certificate Chain</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Additional Security Features
            </CardTitle>
            <CardDescription>
              Comprehensive security measures beyond encryption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Access Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Multi-factor authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Role-based access control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Session management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    IP whitelisting support
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Data Protection</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Automatic data retention policies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure data deletion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Audit logging
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    GDPR compliance
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Compliance & Certifications
            </CardTitle>
            <CardDescription>
              Meeting industry standards and regulatory requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">GDPR</h4>
                <p className="text-sm text-muted-foreground">Full compliance with EU data protection regulations</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">HIPAA</h4>
                <p className="text-sm text-muted-foreground">Healthcare data protection standards</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">SOC 2</h4>
                <p className="text-sm text-muted-foreground">Security and availability controls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Security Best Practices
            </CardTitle>
            <CardDescription>
              Recommendations for maintaining security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">For Users</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enable two-factor authentication</li>
                  <li>• Use strong, unique passwords</li>
                  <li>• Keep your devices updated</li>
                  <li>• Be cautious with sensitive data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Organizations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Implement access controls</li>
                  <li>• Regular security audits</li>
                  <li>• Employee security training</li>
                  <li>• Incident response planning</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Security Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about our security measures or need additional information, please contact our security team.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">support@nexogen.app</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 