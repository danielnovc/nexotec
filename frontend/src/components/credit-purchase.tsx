"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useCredits } from "@/hooks/useCredits"

const CREDIT_PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    credits: 10,
    price: 1.00,
    description: "10 minutes of transcription"
  },
  {
    id: "pro",
    name: "Professional",
    credits: 50,
    price: 4.50,
    description: "50 minutes of transcription",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 120,
    price: 10.00,
    description: "120 minutes of transcription"
  }
]

export function CreditPurchase() {
  const [loading, setLoading] = useState<string | null>(null)
  const { credits, refreshCredits } = useCredits()

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId)
    
    try {
      // TODO: Implement Stripe checkout
      // For now, we'll simulate a successful purchase
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate adding credits
      await refreshCredits()
      
      toast.success(`Successfully purchased ${CREDIT_PACKAGES.find(p => p.id === packageId)?.credits} credits!`)
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error('Failed to process purchase. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Purchase Credits</h2>
        <p className="text-muted-foreground">
          Buy credits to use our transcription services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CREDIT_PACKAGES.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}
          >
            {pkg.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Most Popular
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {pkg.name}
                <CreditCard className="h-5 w-5" />
              </CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="text-muted-foreground"> / {pkg.credits} credits</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  ${(pkg.price / pkg.credits).toFixed(2)} per minute
                </div>
                
                <Button
                  className="w-full"
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id}
                >
                  {loading === pkg.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Buy ${pkg.credits} Credits`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Current Balance</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {credits.toFixed(2)} credits
            </p>
            <p className="text-sm text-muted-foreground">
              Available for transcription
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 