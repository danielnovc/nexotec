"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useCredits } from "@/hooks/useCredits"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Star, 
  Zap,
  Crown,
  Plus,
  Loader2
} from "lucide-react"

interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  originalPrice?: number
  popular?: boolean
  bestValue?: boolean
  icon: React.ReactNode
  description: string
}

const creditPackages: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 100,
    price: 10,
    icon: <Zap className="h-5 w-5" />,
    description: "Perfect for getting started"
  },
  {
    id: "pro",
    name: "Professional",
    credits: 500,
    price: 45,
    originalPrice: 50,
    popular: true,
    icon: <Star className="h-5 w-5" />,
    description: "Most popular choice"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 1000,
    price: 80,
    originalPrice: 100,
    bestValue: true,
    icon: <Crown className="h-5 w-5" />,
    description: "Best value for teams"
  }
]

interface CreditTopUpModalProps {
  children: React.ReactNode
  onSuccess?: () => void
}

export function CreditTopUpModal({ children, onSuccess }: CreditTopUpModalProps) {
  const { refreshCredits } = useCredits()
  const [open, setOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (pkg: CreditPackage) => {
    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would integrate with your payment processor (Stripe, etc.)
      // For now, we'll simulate a successful purchase
      
      toast.success(`${pkg.credits} credits added successfully!`)
      await refreshCredits()
      setOpen(false)
      setSelectedPackage(null)
      onSuccess?.()
    } catch (error) {
      console.error('Error purchasing credits:', error)
      toast.error("Failed to purchase credits. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTopUp = async () => {
    if (!selectedPackage) return
    await handlePurchase(selectedPackage)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CreditCard className="h-6 w-6" />
              </motion.div>
              Add Credits
            </DialogTitle>
            <DialogDescription className="text-base">
              Choose a credit package to continue using our transcription services.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            {/* Credit Packages */}
            <div className="grid gap-6 md:grid-cols-3">
              <AnimatePresence>
                {creditPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedPackage?.id === pkg.id 
                          ? 'ring-2 ring-primary bg-primary/5 shadow-lg' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {pkg.icon}
                            <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          </div>
                          {pkg.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                          {pkg.bestValue && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Best Value
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {pkg.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-center space-y-2">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-2xl font-bold">${pkg.price}</span>
                            {pkg.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${pkg.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.credits} credits
                          </div>
                          {pkg.originalPrice && (
                            <div className="text-xs text-green-600 font-medium">
                              Save ${pkg.originalPrice - pkg.price}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          {/* Selected Package Summary */}
          <AnimatePresence>
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Package</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{selectedPackage.name} Package</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPackage.credits} credits for ${selectedPackage.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${selectedPackage.price}</p>
                        <p className="text-sm text-muted-foreground">Total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment Options */}
          <AnimatePresence>
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                    <CardDescription>
                      Choose your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-muted-foreground">
                          Pay with Visa, Mastercard, or American Express
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <DollarSign className="h-5 w-5" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">
                          Coming soon
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleQuickTopUp}
                disabled={!selectedPackage || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Purchase Credits
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>• 1 credit = 1 minute of audio transcription</p>
            <p>• Credits never expire</p>
            <p>• Secure payment processing</p>
          </motion.div>
        </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 