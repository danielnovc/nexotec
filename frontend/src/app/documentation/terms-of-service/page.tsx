"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
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
          <p className="text-sm text-muted-foreground mb-4">
            By accessing and using Nexogen AI's services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <p className="text-sm text-muted-foreground">
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Description of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Nexogen AI provides AI-powered audio transcription services, including but not limited to:
            </p>
            <div>
              <h4 className="font-semibold mb-2">Core Services</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audio file transcription and conversion</li>
                <li>• Advanced transcription capabilities</li>
                <li>• Multiple language support</li>
                <li>• Transcription editing and management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Additional Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speaker identification and labeling</li>
                <li>• Timestamp and subtitle generation</li>
                <li>• Export in multiple formats</li>
                <li>• Cloud storage and synchronization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. User Accounts and Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Creation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Must be 18 years or older to create an account</li>
                <li>• Provide accurate and complete information</li>
                <li>• Maintain security of account credentials</li>
                <li>• Notify us immediately of unauthorized use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Responsibilities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You are responsible for all activities under your account</li>
                <li>• Keep account information current and accurate</li>
                <li>• Do not share account credentials with others</li>
                <li>• Report security concerns immediately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Termination</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We may terminate accounts for violations</li>
                <li>• You may cancel your account at any time</li>
                <li>• Data deletion procedures apply upon termination</li>
                <li>• Outstanding payments remain due upon termination</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Acceptable Use Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Permitted Uses</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Personal and business transcription needs</li>
                <li>• Educational and research purposes</li>
                <li>• Legal and professional documentation</li>
                <li>• Content creation and media production</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Prohibited Uses</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Illegal activities or content</li>
                <li>• Harassment, hate speech, or discrimination</li>
                <li>• Copyright infringement or intellectual property violations</li>
                <li>• Attempts to circumvent security measures</li>
                <li>• Excessive use that impacts service performance</li>
                <li>• Reverse engineering or unauthorized access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure you have rights to transcribe content</li>
                <li>• Respect privacy and confidentiality</li>
                <li>• Do not upload malicious or harmful files</li>
                <li>• Comply with applicable laws and regulations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Payment and Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Pricing and Plans</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Service pricing is subject to change with notice</li>
                <li>• Different plans available for various needs</li>
                <li>• Usage-based billing for pay-per-use plans</li>
                <li>• Subscription plans with recurring billing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment Terms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Payment due upon service usage or subscription renewal</li>
                <li>• Valid payment method required for service access</li>
                <li>• Failed payments may result in service suspension</li>
                <li>• All fees are non-refundable unless otherwise stated</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Refunds and Cancellations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Refunds provided for service failures or errors</li>
                <li>• Subscription cancellations effective at end of billing period</li>
                <li>• No refunds for unused service credits</li>
                <li>• Dispute resolution procedures available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Your Content</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You retain ownership of your original content</li>
                <li>• You grant us license to process your content for service provision</li>
                <li>• You are responsible for content rights and permissions</li>
                <li>• We do not claim ownership of your transcriptions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Our Intellectual Property</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Service technology and software remain our property</li>
                <li>• Trademarks, logos, and branding are protected</li>
                <li>• No right to copy, modify, or distribute our IP</li>
                <li>• License granted for service use only</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI and Machine Learning</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI models and algorithms are our proprietary technology</li>
                <li>• Training data may include anonymized user content</li>
                <li>• No individual content is used for training without consent</li>
                <li>• AI improvements benefit all users</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Privacy and Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Data Collection and Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We collect and process data as described in our Privacy Policy</li>
                <li>• Data is used to provide and improve our services</li>
                <li>• We implement appropriate security measures</li>
                <li>• Data retention follows our privacy policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your Privacy Rights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access, correct, or delete your personal data</li>
                <li>• Object to certain data processing activities</li>
                <li>• Request data portability</li>
                <li>• Lodge complaints with supervisory authorities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Encryption of data in transit and at rest</li>
                <li>• Regular security assessments and updates</li>
                <li>• Access controls and monitoring</li>
                <li>• Incident response and breach notification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Availability</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We strive for high availability but do not guarantee 100% uptime</li>
                <li>• Service may be temporarily unavailable for maintenance</li>
                <li>• We are not liable for service interruptions</li>
                <li>• Emergency maintenance may occur without notice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Accuracy and Quality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transcription accuracy depends on audio quality and content</li>
                <li>• We do not guarantee 100% accuracy</li>
                <li>• Users should review and verify transcriptions</li>
                <li>• We are not liable for transcription errors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Limitation of Damages</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Our liability is limited to the amount paid for services</li>
                <li>• We are not liable for indirect or consequential damages</li>
                <li>• No liability for data loss or corruption</li>
                <li>• Force majeure events exclude liability</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Dispute Resolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Legal inquiries: legal@nexogen.ai</li>
                <li>• Dispute resolution: disputes@nexogen.ai</li>
                <li>• General support: support@nexogen.ai</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resolution Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Attempt to resolve disputes through direct communication</li>
                <li>• Escalation to management if needed</li>
                <li>• Mediation or arbitration for unresolved disputes</li>
                <li>• Legal action as last resort</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Governing Law</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• These terms are governed by applicable law</li>
                <li>• Jurisdiction for disputes as specified</li>
                <li>• Severability of terms if any provision is invalid</li>
                <li>• Entire agreement supersedes previous agreements</li>
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
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Legal Department</h4>
                <p className="text-sm text-muted-foreground">legal@nexogen.ai</p>
              </div>
              <div>
                <h4 className="font-semibold">Customer Support</h4>
                <p className="text-sm text-muted-foreground">support@nexogen.ai</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 