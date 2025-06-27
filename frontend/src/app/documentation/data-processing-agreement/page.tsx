"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataProcessingAgreementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Data Processing Agreement</h2>
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
            This Data Processing Agreement (DPA) forms part of the Terms of Service between Nexogen AI (the "Data Processor") and the user (the "Data Controller") for the processing of personal data in connection with our transcription services.
          </p>
          <p className="text-sm text-muted-foreground">
            This DPA ensures compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">GDPR Definitions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "Personal Data" means any information relating to an identified or identifiable natural person</li>
                <li>• "Processing" means any operation performed on personal data</li>
                <li>• "Data Controller" means the entity determining the purposes and means of processing</li>
                <li>• "Data Processor" means the entity processing personal data on behalf of the controller</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service-Specific Definitions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "Audio Content" means audio files uploaded for transcription</li>
                <li>• "Transcription Data" means the text output generated from audio processing</li>
                <li>• "Service Data" means data necessary for service provision and improvement</li>
                <li>• "User Account Data" means information required for account management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Processing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Subject Matter</h4>
              <p className="text-sm text-muted-foreground">
                The subject matter of the data processing is the provision of transcription services, including audio processing, text generation, and related support services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Duration</h4>
              <p className="text-sm text-muted-foreground">
                The processing will continue for the duration of the service agreement and until all personal data is deleted or returned in accordance with this DPA.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Nature and Purpose</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Audio transcription and conversion services</li>
                <li>• Quality improvement and service optimization</li>
                <li>• Customer support and account management</li>
                <li>• Legal and regulatory compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Categories of Data Subjects</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Service users and account holders</li>
                <li>• Individuals whose voices are captured in audio content</li>
                <li>• Authorized representatives and administrators</li>
                <li>• Support personnel and service providers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Types of Personal Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Contact information (name, email, phone)</li>
                <li>• Account credentials and preferences</li>
                <li>• Audio content and voice characteristics</li>
                <li>• Transcription text and metadata</li>
                <li>• Usage patterns and service interactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Data Controller Obligations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Legal Basis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure lawful basis for data processing</li>
                <li>• Obtain necessary consents where required</li>
                <li>• Provide appropriate privacy notices</li>
                <li>• Maintain records of processing activities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Quality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure accuracy and relevance of personal data</li>
                <li>• Provide only necessary data for processing</li>
                <li>• Update data when changes occur</li>
                <li>• Validate data before transmission</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Subject Rights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Respond to data subject requests</li>
                <li>• Provide access to personal data</li>
                <li>• Process rectification and erasure requests</li>
                <li>• Handle objections and restrictions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Data Processor Obligations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Processing Instructions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Process personal data only on documented instructions</li>
                <li>• Notify controller of any conflicting legal obligations</li>
                <li>• Seek prior written consent for additional processing</li>
                <li>• Maintain records of processing activities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Confidentiality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure confidentiality of personal data</li>
                <li>• Require confidentiality commitments from personnel</li>
                <li>• Implement access controls and monitoring</li>
                <li>• Regular confidentiality training for staff</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Implement appropriate technical and organizational measures</li>
                <li>• Ensure ongoing confidentiality, integrity, and availability</li>
                <li>• Regular security assessments and updates</li>
                <li>• Incident detection and response procedures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Subprocessors</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Obtain prior written consent for subprocessors</li>
                <li>• Ensure subprocessors meet same obligations</li>
                <li>• Maintain list of authorized subprocessors</li>
                <li>• Provide advance notice of subprocessor changes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Data Subject Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Assistance to Controller</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Assist controller in responding to data subject requests</li>
                <li>• Provide necessary information and documentation</li>
                <li>• Implement technical measures for data subject rights</li>
                <li>• Support controller in data portability requests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Response Timeframes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Respond to controller requests within 30 days</li>
                <li>• Provide status updates for complex requests</li>
                <li>• Extend timeframe if necessary with justification</li>
                <li>• Maintain records of all data subject requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Data Breach Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Breach Detection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Implement breach detection and monitoring systems</li>
                <li>• Regular security assessments and vulnerability scans</li>
                <li>• Employee training on breach recognition</li>
                <li>• Incident response procedures and escalation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Notification Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Notify controller without undue delay after becoming aware</li>
                <li>• Provide detailed information about the breach</li>
                <li>• Include impact assessment and mitigation measures</li>
                <li>• Cooperate with controller in breach response</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Breach Documentation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintain records of all personal data breaches</li>
                <li>• Document facts, effects, and remedial actions</li>
                <li>• Provide documentation to supervisory authorities</li>
                <li>• Regular review and improvement of breach procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Data Return and Deletion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Return of Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Return all personal data to controller upon request</li>
                <li>• Provide data in structured, commonly used format</li>
                <li>• Ensure secure transmission of returned data</li>
                <li>• Maintain audit trail of data return activities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Deletion of Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Delete personal data upon controller's request</li>
                <li>• Ensure complete and secure deletion methods</li>
                <li>• Delete data from all systems and backups</li>
                <li>• Provide certification of deletion completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Retention Periods</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Process data only for specified retention periods</li>
                <li>• Automatic deletion at end of retention period</li>
                <li>• Regular review of data retention requirements</li>
                <li>• Compliance with legal and regulatory requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Audit and Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Audit Rights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Allow controller to audit compliance with DPA</li>
                <li>• Provide necessary information and documentation</li>
                <li>• Facilitate on-site inspections if required</li>
                <li>• Maintain audit logs and compliance records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Compliance Monitoring</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Regular internal compliance assessments</li>
                <li>• Third-party security audits and certifications</li>
                <li>• Continuous monitoring of security controls</li>
                <li>• Regular updates to security measures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Reporting</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Provide regular compliance reports to controller</li>
                <li>• Report any compliance issues or concerns</li>
                <li>• Maintain records of compliance activities</li>
                <li>• Annual review and update of DPA terms</li>
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
              For questions about this Data Processing Agreement, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Data Protection Officer</h4>
                <p className="text-sm text-muted-foreground">dpo@nexogen.ai</p>
              </div>
              <div>
                <h4 className="font-semibold">Legal Department</h4>
                <p className="text-sm text-muted-foreground">legal@nexogen.ai</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 