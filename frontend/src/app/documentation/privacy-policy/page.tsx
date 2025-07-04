"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Nexogen AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our transcription services.
          </p>
          <p className="text-sm text-muted-foreground">
            By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Information We Collect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Name and contact information</li>
                <li>• Email address and phone number</li>
                <li>• Account credentials and preferences</li>
                <li>• Payment and billing information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Audio and Transcription Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audio files uploaded for transcription</li>
                <li>• Generated transcription text</li>
                <li>• Processing metadata and timestamps</li>
                <li>• Quality improvement data (anonymized)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Service usage patterns and statistics</li>
                <li>• Feature preferences and settings</li>
                <li>• Error logs and performance data</li>
                <li>• Device and browser information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Provision</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Process and transcribe your audio files</li>
                <li>• Provide customer support and assistance</li>
                <li>• Manage your account and subscriptions</li>
                <li>• Process payments and billing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service Improvement</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Improve transcription accuracy and quality</li>
                <li>• Develop new features and capabilities</li>
                <li>• Optimize service performance</li>
                <li>• Conduct research and analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Send service updates and notifications</li>
                <li>• Provide technical support</li>
                <li>• Send marketing communications (with consent)</li>
                <li>• Respond to inquiries and requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Information Sharing and Disclosure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <div>
              <h4 className="font-semibold mb-2">Service Providers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cloud hosting and infrastructure providers</li>
                <li>• Payment processing services</li>
                <li>• Customer support and analytics tools</li>
                <li>• All providers are bound by confidentiality agreements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Legal Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Compliance with applicable laws and regulations</li>
                <li>• Response to legal process or government requests</li>
                <li>• Protection of our rights and property</li>
                <li>• Prevention of fraud or security threats</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Transfers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• In connection with mergers or acquisitions</li>
                <li>• Sale of assets or business operations</li>
                <li>• Bankruptcy or insolvency proceedings</li>
                <li>• Successor entities will be bound by this policy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Data Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Encryption of data in transit and at rest</li>
                <li>• Multi-factor authentication for accounts</li>
                <li>• Regular security audits and assessments</li>
                <li>• Access controls and monitoring</li>
                <li>• Secure data center facilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Retention</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audio files deleted after processing (unless retained by user)</li>
                <li>• Transcription data retained as specified by user</li>
                <li>• Account data retained while account is active</li>
                <li>• Legal and regulatory retention requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Breach Response</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Immediate investigation of security incidents</li>
                <li>• Notification to affected users and authorities</li>
                <li>• Implementation of corrective measures</li>
                <li>• Documentation and lessons learned</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Your Rights and Choices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Access and Control</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access and download your personal data</li>
                <li>• Update or correct your information</li>
                <li>• Delete your account and associated data</li>
                <li>• Export your data in standard formats</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication Preferences</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Opt out of marketing communications</li>
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
          <CardTitle>7. International Data Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>
            <div>
              <h4 className="font-semibold mb-2">EU Data Transfers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Adequacy decisions by European Commission</li>
                <li>• Standard contractual clauses (SCCs)</li>
                <li>• Binding corporate rules (BCRs)</li>
                <li>• Other appropriate safeguards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Localization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• EU-based infrastructure for EU users</li>
                <li>• Compliance with local data protection laws</li>
                <li>• Data sovereignty requirements</li>
                <li>• Cross-border transfer restrictions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Children's Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Age Verification</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Account creation requires age verification</li>
                <li>• Parental consent required for users under 18</li>
                <li>• Special protections for minor users</li>
                <li>• Reporting mechanisms for underage users</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Parental Rights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review and delete child's information</li>
                <li>• Refuse further collection or use</li>
                <li>• Request access to child's data</li>
                <li>• Contact us for parental inquiries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Notification Methods</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email notification for significant changes</li>
                <li>• In-app notifications and alerts</li>
                <li>• Website banner notifications</li>
                <li>• Account dashboard updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Continued Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Continued use constitutes acceptance of changes</li>
                <li>• Review policy updates carefully</li>
                <li>• Contact us with questions about changes</li>
                <li>• Right to discontinue use if changes are unacceptable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              For questions about this Privacy Policy or to exercise your rights, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-sm text-muted-foreground">support@nexogen.app</p>
              </div>
              <div>
                <h4 className="font-semibold">Data Protection Officer</h4>
                <p className="text-sm text-muted-foreground">support@nexogen.app</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 