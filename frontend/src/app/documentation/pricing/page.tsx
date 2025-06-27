"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Zap, Shield, Users, Database, Clock, Download, Star } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Nexogen AI offers flexible pricing options to meet your transcription needs. Choose from pay-as-you-go pricing for occasional use or monthly plans for regular users. All plans include our full feature set with no hidden fees.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pricing Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                  <li>• Standard processing time</li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
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
                  <li>• Cloud storage (5GB)</li>
                </ul>
                <Button className="w-full">Choose Plan</Button>
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
                  <li>• Cloud storage (50GB)</li>
                </ul>
                <Button className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Custom Pricing</h4>
              <p className="text-sm text-muted-foreground mb-4">
                For organizations with high-volume transcription needs, we offer custom enterprise plans with dedicated support and advanced features.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Unlimited minutes</li>
                <li>• Dedicated account manager</li>
                <li>• Custom integrations</li>
                <li>• On-premise deployment options</li>
                <li>• SLA guarantees</li>
                <li>• Custom security requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Sales</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get in touch with our sales team to discuss your requirements and receive a custom quote.
              </p>
              <div className="space-y-2">
                <Button className="w-full">Contact Sales Team</Button>
                <Button variant="outline" className="w-full">Schedule Demo</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Pay As You Go</th>
                  <th className="text-center py-2">Starter Pack</th>
                  <th className="text-center py-2">Professional</th>
                  <th className="text-center py-2">Enterprise</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Transcription Accuracy</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Speaker Diarization</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Live Recording</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Note-taking Mode</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Priority Processing</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">API Access</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Team Collaboration</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">✓</td>
                  <td className="text-center py-2">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Dedicated Support</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">-</td>
                  <td className="text-center py-2">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing & Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Payment Methods</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Credit cards (Visa, MasterCard, American Express)</li>
                <li>• PayPal</li>
                <li>• Bank transfers (Enterprise only)</li>
                <li>• Invoice billing (Enterprise only)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Billing Cycle</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pay-as-you-go: Immediate billing</li>
                <li>• Monthly plans: Billed monthly in advance</li>
                <li>• Enterprise: Custom billing cycles</li>
                <li>• Annual discounts available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Can I change my plan anytime?</h4>
              <p className="text-sm text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What happens if I exceed my monthly minutes?</h4>
              <p className="text-sm text-muted-foreground">Additional minutes are charged at the pay-as-you-go rate of $0.10 per minute.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do unused minutes roll over?</h4>
              <p className="text-sm text-muted-foreground">Monthly minutes do not roll over to the next month. They reset at the beginning of each billing cycle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">Yes, we offer a 7-day free trial with 30 minutes of transcription included.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 