"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Shield, Code, Users, Lock } from "lucide-react"

export default function HIPAACompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">HIPAA Compliance</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Nexogen AI maintains full compliance with the Health Insurance Portability and Accountability Act (HIPAA) to ensure the highest standards of security and privacy for healthcare-related data processing. This document outlines our comprehensive HIPAA compliance framework.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. EU Infrastructure and Data Sovereignty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">EU-Based Healthcare Infrastructure</h4>
              <p className="text-sm text-muted-foreground">
                All Nexogen AI healthcare services are hosted on EU-based infrastructure specifically designed for healthcare data processing, ensuring compliance with both HIPAA and EU data protection requirements.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• Healthcare-specific EU data centers</li>
                <li>• HIPAA-compliant EU cloud providers</li>
                <li>• Healthcare data residency guarantees</li>
                <li>• EU healthcare data protection standards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Healthcare Data Sovereignty</h4>
              <p className="text-sm text-muted-foreground">
                We maintain strict control over healthcare data location and processing, ensuring that all PHI remains within EU borders and is subject to both HIPAA and EU healthcare data protection laws.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• Healthcare data residency control</li>
                <li>• EU-based PHI processing and storage</li>
                <li>• Protection under EU healthcare regulations</li>
                <li>• No unauthorized access to healthcare data</li>
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
              <h4 className="font-semibold mb-2">Healthcare-Grade Encryption</h4>
              <p className="text-sm text-muted-foreground">
                We implement healthcare-specific encryption standards that exceed HIPAA requirements to protect PHI at every stage of processing and storage.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• AES-256 encryption for PHI at rest</li>
                <li>• TLS 1.3 encryption for PHI in transit</li>
                <li>• Client-side encryption for sensitive healthcare files</li>
                <li>• Encrypted healthcare backups and archives</li>
                <li>• Hardware security modules (HSM) for key management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Healthcare Security Infrastructure</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-factor authentication (MFA) for all healthcare accounts</li>
                <li>• Role-based access controls (RBAC) for healthcare data</li>
                <li>• Regular healthcare security audits and penetration testing</li>
                <li>• 24/7 healthcare security monitoring and threat detection</li>
                <li>• Secure healthcare key management and rotation</li>
                <li>• Healthcare-specific intrusion detection systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. HIPAA Administrative Safeguards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Security Management Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Risk Analysis</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Regular healthcare risk assessments</li>
                    <li>• PHI-specific threat modeling</li>
                    <li>• Healthcare vulnerability assessments</li>
                    <li>• Risk mitigation strategies</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Risk Management</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare risk reduction measures</li>
                    <li>• PHI protection strategies</li>
                    <li>• Regular risk review and updates</li>
                    <li>• Healthcare incident response planning</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Workforce Security</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Authorization and Supervision</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare-specific access authorization</li>
                    <li>• PHI access supervision procedures</li>
                    <li>• Healthcare workforce clearance procedures</li>
                    <li>• Regular access reviews and audits</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Workforce Clearance</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare background checks</li>
                    <li>• HIPAA training and certification</li>
                    <li>• Healthcare confidentiality agreements</li>
                    <li>• Regular healthcare compliance assessments</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Information Access Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Access Authorization</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare role-based access controls</li>
                    <li>• PHI access authorization procedures</li>
                    <li>• Healthcare-specific access policies</li>
                    <li>• Regular access reviews and updates</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Access Establishment</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare access establishment procedures</li>
                    <li>• PHI access modification protocols</li>
                    <li>• Healthcare access termination procedures</li>
                    <li>• Emergency access procedures for healthcare</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. HIPAA Physical Safeguards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Facility Access Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Contingency Operations</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare emergency access procedures</li>
                    <li>• PHI disaster recovery protocols</li>
                    <li>• Healthcare facility emergency plans</li>
                    <li>• Healthcare data backup procedures</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Facility Security Plan</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare facility security policies</li>
                    <li>• PHI physical access controls</li>
                    <li>• Healthcare facility monitoring systems</li>
                    <li>• Healthcare facility access logs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Workstation Use and Security</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Workstation Use</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare workstation use policies</li>
                    <li>• PHI workstation security procedures</li>
                    <li>• Healthcare workstation access controls</li>
                    <li>• Healthcare workstation monitoring</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Workstation Security</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare workstation physical security</li>
                    <li>• PHI workstation access controls</li>
                    <li>• Healthcare workstation monitoring</li>
                    <li>• Healthcare workstation security policies</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Device and Media Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Media Disposal</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare media disposal procedures</li>
                    <li>• PHI media sanitization protocols</li>
                    <li>• Healthcare media destruction procedures</li>
                    <li>• Healthcare media disposal documentation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Media Re-use</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare media re-use procedures</li>
                    <li>• PHI media sanitization protocols</li>
                    <li>• Healthcare media accountability procedures</li>
                    <li>• Healthcare media tracking systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. HIPAA Technical Safeguards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Access Control</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Unique User Identification</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare-specific user identification</li>
                    <li>• PHI access user authentication</li>
                    <li>• Healthcare user access controls</li>
                    <li>• Healthcare user access monitoring</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Emergency Access Procedure</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare emergency access protocols</li>
                    <li>• PHI emergency access procedures</li>
                    <li>• Healthcare emergency access controls</li>
                    <li>• Healthcare emergency access monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Audit Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Healthcare Audit Logging</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• PHI access audit trails</li>
                    <li>• Healthcare data access logging</li>
                    <li>• Healthcare system audit controls</li>
                    <li>• Healthcare audit monitoring</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Healthcare Audit Review</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Regular healthcare audit reviews</li>
                    <li>• PHI access audit analysis</li>
                    <li>• Healthcare audit reporting</li>
                    <li>• Healthcare audit compliance</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Integrity</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Healthcare Data Integrity</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• PHI data integrity controls</li>
                    <li>• Healthcare data validation</li>
                    <li>• Healthcare data verification</li>
                    <li>• Healthcare data protection</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Healthcare Data Protection</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• PHI data protection measures</li>
                    <li>• Healthcare data security</li>
                    <li>• Healthcare data backup</li>
                    <li>• Healthcare data recovery</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Transmission Security</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold">Integrity Controls</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare transmission integrity controls</li>
                    <li>• PHI transmission data validation</li>
                    <li>• Healthcare transmission error detection</li>
                    <li>• Healthcare transmission integrity verification</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold">Encryption</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare transmission encryption</li>
                    <li>• PHI transmission security protocols</li>
                    <li>• Healthcare transmission encryption standards</li>
                    <li>• Healthcare transmission security monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Business Associate Agreement (BAA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              As a Business Associate under HIPAA, we provide comprehensive BAA services that include all required provisions for healthcare data processing and protection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">BAA Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PHI use and disclosure limitations</li>
                  <li>• Healthcare security safeguards</li>
                  <li>• Healthcare breach notification</li>
                  <li>• Healthcare subcontractor compliance</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Healthcare Services:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Healthcare audio transcription</li>
                  <li>• PHI secure storage and processing</li>
                  <li>• Healthcare note-taking and documentation</li>
                  <li>• Healthcare data export and deletion</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Healthcare Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Secure Healthcare Storage</h4>
                <p className="text-sm text-muted-foreground">All PHI is encrypted using AES-256 encryption and stored on HIPAA-compliant EU infrastructure with healthcare-specific security measures.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Healthcare Access Controls</h4>
                <p className="text-sm text-muted-foreground">Multi-factor authentication and role-based access controls ensure only authorized healthcare personnel can access PHI.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Healthcare Audit Trails</h4>
                <p className="text-sm text-muted-foreground">Comprehensive logging of all PHI access, modifications, and disclosures for healthcare compliance monitoring.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Healthcare Breach Notification</h4>
                <p className="text-sm text-muted-foreground">Automated breach detection and notification procedures within 60 days as required by HIPAA for healthcare data.</p>
              </div>
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
                <p className="text-sm text-muted-foreground">support@nexogen.app</p>
              </div>
              <div>
                <h4 className="font-semibold">Legal Department</h4>
                <p className="text-sm text-muted-foreground">legal@nexogen.ai</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emergency Contact</h4>
              <p className="text-sm text-muted-foreground">
                For security incidents and breach notifications: support@nexogen.app
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 