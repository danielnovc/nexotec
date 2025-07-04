"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
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
            This Cookie Policy explains how Nexogen AI uses cookies and similar technologies to recognize you when you visit our website and use our services.
          </p>
          <p className="text-sm text-muted-foreground">
            By using our services, you consent to the use of cookies in accordance with this policy.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. What Are Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Types of Cookies</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Session cookies: Temporary cookies that expire when you close your browser</li>
                <li>• Persistent cookies: Cookies that remain on your device for a set period</li>
                <li>• First-party cookies: Set by our website directly</li>
                <li>• Third-party cookies: Set by external services we use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Similar Technologies</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Local storage: Data stored in your browser</li>
                <li>• Session storage: Temporary data for browser sessions</li>
                <li>• Web beacons: Small images used for tracking</li>
                <li>• Pixels: Tracking technologies for analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. How We Use Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Essential Cookies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                These cookies are necessary for the website to function properly and cannot be disabled.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Authentication and security cookies</li>
                <li>• Session management cookies</li>
                <li>• Load balancing and performance cookies</li>
                <li>• CSRF protection cookies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Functional Cookies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                These cookies enable enhanced functionality and personalization.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Language and region preferences</li>
                <li>• User interface customization</li>
                <li>• Form auto-completion</li>
                <li>• Service feature preferences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Analytics Cookies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                These cookies help us understand how visitors interact with our website.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Page view and navigation tracking</li>
                <li>• User behavior analysis</li>
                <li>• Service performance monitoring</li>
                <li>• Error tracking and debugging</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Marketing Cookies</h4>
              <p className="text-sm text-muted-foreground mb-2">
                These cookies are used to deliver relevant advertisements and track marketing campaign effectiveness.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ad targeting and personalization</li>
                <li>• Campaign performance tracking</li>
                <li>• Social media integration</li>
                <li>• Retargeting and remarketing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Specific Cookies We Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Essential Service Cookies</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold">Authentication Cookies</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Maintain user login sessions</li>
                    <li>• Duration: Session or 30 days</li>
                    <li>• Data: Encrypted session tokens</li>
                    <li>• Opt-out: Not available (essential for service)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold">Security Cookies</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Protect against CSRF attacks</li>
                    <li>• Duration: Session</li>
                    <li>• Data: Security tokens</li>
                    <li>• Opt-out: Not available (essential for security)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Analytics and Performance</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold">Google Analytics</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Website usage analytics</li>
                    <li>• Duration: Up to 2 years</li>
                    <li>• Data: Anonymized usage statistics</li>
                    <li>• Opt-out: Available through browser settings</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold">Performance Monitoring</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Service performance tracking</li>
                    <li>• Duration: Session</li>
                    <li>• Data: Performance metrics</li>
                    <li>• Opt-out: Available through account settings</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">User Experience</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold">Preference Cookies</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Remember user preferences</li>
                    <li>• Duration: 1 year</li>
                    <li>• Data: UI settings and preferences</li>
                    <li>• Opt-out: Available through account settings</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold">Language and Region</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Purpose: Localization preferences</li>
                    <li>• Duration: 1 year</li>
                    <li>• Data: Language and region settings</li>
                    <li>• Opt-out: Available through account settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Third-Party Cookies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              We use third-party services that may set cookies on your device. These services help us provide better functionality and user experience.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Payment Processors</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stripe: Payment processing and security</li>
                <li>• PayPal: Alternative payment method</li>
                <li>• Purpose: Secure payment processing</li>
                <li>• Duration: Session to 2 years</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Intercom: Customer support chat</li>
                <li>• Zendesk: Help desk and support tickets</li>
                <li>• Purpose: Customer service and support</li>
                <li>• Duration: Session to 1 year</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Marketing and Analytics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Google Analytics: Website analytics</li>
                <li>• Facebook Pixel: Marketing tracking</li>
                <li>• LinkedIn Insight: Professional network tracking</li>
                <li>• Purpose: Marketing and analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Cookie Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Browser Settings</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Most browsers allow you to control cookies through settings</li>
                <li>• You can block or delete cookies</li>
                <li>• Some features may not work if cookies are disabled</li>
                <li>• Browser-specific instructions available in help sections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cookie Consent</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We obtain consent for non-essential cookies</li>
                <li>• Consent can be withdrawn at any time</li>
                <li>• Cookie preferences can be updated</li>
                <li>• Consent is stored for future visits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Opt-Out Options</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Account settings for service-specific cookies</li>
                <li>• Third-party opt-out links provided</li>
                <li>• Industry opt-out programs supported</li>
                <li>• Contact us for additional opt-out assistance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Data Minimization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Only necessary data is collected via cookies</li>
                <li>• Personal data is minimized and anonymized</li>
                <li>• Cookie data is not used for profiling</li>
                <li>• Regular review of cookie necessity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Secure cookie transmission (HTTPS only)</li>
                <li>• HttpOnly flags for sensitive cookies</li>
                <li>• SameSite attributes for CSRF protection</li>
                <li>• Regular security assessments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Retention</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cookie data deleted according to expiration dates</li>
                <li>• Server-side data retention policies apply</li>
                <li>• User can request data deletion</li>
                <li>• Legal retention requirements respected</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. International Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Cookie data may be processed in countries outside your residence. We ensure appropriate safeguards are in place.
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
              <h4 className="font-semibold mb-2">Third-Party Transfers</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Third-party services may transfer data globally</li>
                <li>• We ensure third-party compliance</li>
                <li>• User consent required for transfers</li>
                <li>• Transfer impact assessments conducted</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Updates to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Notification of Changes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email notification for significant changes</li>
                <li>• Website banner notifications</li>
                <li>• Updated "Last updated" date</li>
                <li>• Continued use constitutes acceptance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Review and Consent</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review policy changes carefully</li>
                <li>• New consent may be required for changes</li>
                <li>• Contact us with questions about changes</li>
                <li>• Right to withdraw consent for changes</li>
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
              For questions about this Cookie Policy or to exercise your rights:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Privacy Team</h4>
                <p className="text-sm text-muted-foreground">privacy@nexogen.com</p>
              </div>
              <div>
                <h4 className="font-semibold">Data Protection Officer</h4>
                <p className="text-sm text-muted-foreground">dpo@nexogen.com</p>
              </div>
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
            <div>
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all cookie-related inquiries within 30 days. For urgent matters, please indicate the urgency in your communication.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 