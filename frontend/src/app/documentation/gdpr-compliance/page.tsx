"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Shield, Code, Users } from "lucide-react"

export default function GDPRCompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">GDPR Compliance</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Nexogen AI is fully compliant with the General Data Protection Regulation (GDPR), ensuring the highest standards of data protection and privacy for EU residents. This document outlines our comprehensive approach to GDPR compliance.
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
                All Nexogen AI services are hosted on EU-based infrastructure to ensure data sovereignty and compliance with GDPR requirements. Our data centers are located within the European Union, providing guaranteed data residency and protection under EU law.
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
                    <li>• Contact: support@nexogen.app</li>
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
                <p className="text-sm text-muted-foreground">support@nexogen.app</p>
              </div>
                              <div>
                  <h4 className="font-semibold">Privacy Team</h4>
                  <p className="text-sm text-muted-foreground">support@nexogen.app</p>
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
} 