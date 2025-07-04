"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AcceptableUsePolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
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
            This Acceptable Use Policy (AUP) outlines the rules and guidelines for using Nexogen AI's services. By using our services, you agree to comply with this policy.
          </p>
          <p className="text-sm text-muted-foreground">
            Violation of this policy may result in suspension or termination of your account and access to our services.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Permitted Uses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Personal audio transcription needs</li>
                <li>• Educational and learning purposes</li>
                <li>• Content creation and media production</li>
                <li>• Accessibility and accommodation needs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional documentation and record-keeping</li>
                <li>• Meeting and conference transcription</li>
                <li>• Legal and compliance documentation</li>
                <li>• Research and analysis purposes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Educational Use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Academic research and studies</li>
                <li>• Classroom and educational content</li>
                <li>• Student accessibility accommodations</li>
                <li>• Educational institution documentation</li>
              </ul>
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
            <div>
              <h4 className="font-semibold mb-2">Illegal Activities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Any activity that violates applicable laws or regulations</li>
                <li>• Copyright infringement or intellectual property violations</li>
                <li>• Fraud, deception, or misrepresentation</li>
                <li>• Money laundering or financial crimes</li>
                <li>• Terrorism or violent extremism</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Harmful Content</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Content that promotes violence, hate, or discrimination</li>
                <li>• Harassment, bullying, or intimidation</li>
                <li>• Child exploitation or abuse material</li>
                <li>• Malware, viruses, or other harmful code</li>
                <li>• Content that incites violence or illegal activities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy Violations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unauthorized recording of private conversations</li>
                <li>• Violation of wiretapping or eavesdropping laws</li>
                <li>• Processing personal data without consent</li>
                <li>• Sharing confidential or sensitive information</li>
                <li>• Violation of healthcare privacy laws (HIPAA)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">System Abuse</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Attempts to circumvent security measures</li>
                <li>• Unauthorized access to systems or accounts</li>
                <li>• Excessive use that impacts service performance</li>
                <li>• Reverse engineering or decompilation</li>
                <li>• Distribution of service credentials</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Content Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Rights and Permissions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure you have rights to transcribe the content</li>
                <li>• Obtain necessary permissions for copyrighted material</li>
                <li>• Respect intellectual property rights</li>
                <li>• Do not upload content you do not own or have permission to use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy and Consent</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Obtain consent from all parties in recordings</li>
                <li>• Respect privacy rights and expectations</li>
                <li>• Do not record conversations without permission</li>
                <li>• Handle sensitive information appropriately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality and Accuracy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verify transcription accuracy for important content</li>
                <li>• Review and edit transcriptions as needed</li>
                <li>• Do not rely solely on automated transcriptions for critical purposes</li>
                <li>• Use appropriate quality settings for your needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Healthcare and Legal Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Healthcare Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Comply with HIPAA and other healthcare privacy laws</li>
                <li>• Ensure appropriate safeguards for PHI</li>
                <li>• Use healthcare-specific features when available</li>
                <li>• Obtain proper authorizations for healthcare content</li>
                <li>• Do not share healthcare information inappropriately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Legal Content</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure compliance with legal and regulatory requirements</li>
                <li>• Maintain attorney-client privilege where applicable</li>
                <li>• Use appropriate security measures for legal content</li>
                <li>• Follow court and legal system requirements</li>
                <li>• Consult with legal professionals for sensitive matters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Confidential Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Handle confidential information with appropriate care</li>
                <li>• Use encryption and security features</li>
                <li>• Limit access to sensitive content</li>
                <li>• Follow organizational policies for confidential data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Technical Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">File Formats and Sizes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Supported audio formats: MP3, WAV, M4A, FLAC</li>
                <li>• Maximum file size: 2GB per file</li>
                <li>• Maximum duration: 24 hours per file</li>
                <li>• Audio quality requirements for optimal results</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Limits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Reasonable usage limits apply to all accounts</li>
                <li>• Excessive use may be throttled or restricted</li>
                <li>• Fair use policies apply to unlimited plans</li>
                <li>• Commercial use may require enterprise plans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use secure connections (HTTPS) for all uploads</li>
                <li>• Implement appropriate access controls</li>
                <li>• Do not share account credentials</li>
                <li>• Report security concerns immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Enforcement and Consequences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Violation Detection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automated monitoring for policy violations</li>
                <li>• Manual review of reported violations</li>
                <li>• User reporting mechanisms</li>
                <li>• Regular policy compliance audits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Consequences</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Warning and education for minor violations</li>
                <li>• Temporary suspension for repeated violations</li>
                <li>• Permanent account termination for serious violations</li>
                <li>• Legal action for illegal activities</li>
                <li>• Reporting to authorities when required by law</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Appeal Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Right to appeal enforcement actions</li>
                <li>• Review process for disputed violations</li>
                <li>• Evidence submission and review</li>
                <li>• Final decision by compliance team</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Reporting Violations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">How to Report</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Email: abuse@nexogen.com</li>
                <li>• In-app reporting feature</li>
                <li>• Support ticket system</li>
                <li>• Emergency contact for urgent matters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Information to Include</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Description of the violation</li>
                <li>• Relevant account information</li>
                <li>• Evidence or documentation</li>
                <li>• Contact information for follow-up</li>
                <li>• Timestamp and location of violation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Response Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Acknowledgment within 24 hours</li>
                <li>• Investigation within 5 business days</li>
                <li>• Action taken based on findings</li>
                <li>• Follow-up communication with reporter</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Updates to Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              We may update this Acceptable Use Policy from time to time to reflect changes in our services or legal requirements.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Notification</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email notification for significant changes</li>
                <li>• In-app notifications and alerts</li>
                <li>• Updated "Last updated" date</li>
                <li>• Continued use constitutes acceptance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Review</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review policy changes carefully</li>
                <li>• Contact us with questions about changes</li>
                <li>• Discontinue use if changes are unacceptable</li>
                <li>• No retroactive application of changes</li>
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
            <p className="text-sm text-muted-foreground mb-4">
              For questions about this Acceptable Use Policy or to report violations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Abuse Reports</h4>
                <p className="text-sm text-muted-foreground">abuse@nexogen.com</p>
              </div>
              <div>
                <h4 className="font-semibold">Legal Team</h4>
                <p className="text-sm text-muted-foreground">legal@nexogen.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emergency Contact</h4>
              <p className="text-sm text-muted-foreground">
                For urgent security or legal matters, please contact our legal team immediately and include "URGENT" in the subject line.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Postal Address</h4>
              <p className="text-sm text-muted-foreground">
                Nexogen AI<br />
                [Address Line 1]<br />
                [Address Line 2]<br />
                [City, State, ZIP]<br />
                [Country]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 