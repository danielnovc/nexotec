"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { 
  Loader2, 
  CreditCard, 
  Download, 
  Plus, 
  Trash2, 
  Eye, 
  Calendar,
  DollarSign,
  Receipt,
  Shield,
  CheckCircle,
  AlertCircle,
  Building2,
  Globe,
  FileText
} from "lucide-react"
import { useRouter } from "next/navigation"
import { CreditTopUpModal } from "@/components/credit-topup-modal"

interface BillingHistory {
  id: string
  date: string
  amount: number
  description: string
  status: 'paid' | 'pending' | 'failed'
  invoice_number: string
  vat_amount?: number
  total_with_vat?: number
}

interface CreditCard {
  id: string
  last4: string
  brand: string
  exp_month: number
  exp_year: number
  is_default: boolean
}

export default function BillingPage() {
  const { user } = useAuth()
  const { refreshCredits } = useCredits()
  const router = useRouter()
  
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddCard, setShowAddCard] = useState(false)
  const [isEU, setIsEU] = useState(false)
  
  const [cardForm, setCardForm] = useState({
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    name: ''
  })

  useEffect(() => {
    if (user) {
      fetchBillingData()
    }
  }, [user])

  const fetchBillingData = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      
      // Fetch billing history
      const { data: historyData, error: historyError } = await supabase
        .from('billing_history')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
      
      if (historyError) {
        console.error('Error fetching billing history:', historyError)
      } else {
        setBillingHistory(historyData || [])
      }
      
      // Fetch credit cards
      const { data: cardsData, error: cardsError } = await supabase
        .from('credit_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
      
      if (cardsError) {
        console.error('Error fetching credit cards:', cardsError)
      } else {
        setCreditCards(cardsData || [])
      }
      
    } catch (error) {
      console.error('Error fetching billing data:', error)
      toast.error("Failed to load billing information.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCard = async () => {
    try {
      // Here you would typically integrate with a payment processor like Stripe
      // For now, we'll simulate adding a card
      const newCard: CreditCard = {
        id: Date.now().toString(),
        last4: cardForm.number.slice(-4),
        brand: 'visa', // This would be determined by the card number
        exp_month: parseInt(cardForm.exp_month),
        exp_year: parseInt(cardForm.exp_year),
        is_default: creditCards.length === 0
      }
      
      setCreditCards(prev => [newCard, ...prev])
      setShowAddCard(false)
      setCardForm({ number: '', exp_month: '', exp_year: '', cvc: '', name: '' })
      toast.success("Credit card added successfully.")
    } catch (error) {
      console.error('Error adding card:', error)
      toast.error("Failed to add credit card.")
    }
  }

  const handleRemoveCard = async (cardId: string) => {
    try {
      setCreditCards(prev => prev.filter(card => card.id !== cardId))
      toast.success("Credit card removed successfully.")
    } catch (error) {
      console.error('Error removing card:', error)
      toast.error("Failed to remove credit card.")
    }
  }

  const handleDownloadInvoice = async (invoice: BillingHistory) => {
    try {
      // Here you would generate and download the actual invoice PDF
      // For now, we'll simulate the download
      const invoiceData = {
        ...invoice,
        vat_rate: isEU ? 0.21 : 0, // 21% VAT for EU
        vat_amount: isEU ? invoice.amount * 0.21 : 0,
        total_with_vat: isEU ? invoice.amount * 1.21 : invoice.amount
      }
      
      // Create a blob and download
      const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${invoice.invoice_number}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success("Invoice downloaded successfully.")
    } catch (error) {
      console.error('Error downloading invoice:', error)
      toast.error("Failed to download invoice.")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>
      case 'pending':
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage your payment methods, view billing history, and download invoices.
          </p>
        </div>
        <CreditTopUpModal>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Top Up Credits
          </Button>
        </CreditTopUpModal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Manage your credit cards and payment options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {creditCards.length > 0 ? (
              <div className="space-y-3">
                {creditCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• {card.last4}</p>
                        <p className="text-sm text-muted-foreground">
                          {card.brand.toUpperCase()} • Expires {card.exp_month}/{card.exp_year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.is_default && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCard(card.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No payment methods added</p>
              </div>
            )}
            
            <Button 
              onClick={() => setShowAddCard(true)} 
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Billing Summary
            </CardTitle>
            <CardDescription>
              Overview of your current billing period.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-green-600">$0.00</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold">$0.00</p>
                <p className="text-sm text-muted-foreground">Last Month</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Plan</span>
                <Badge variant="outline">Free</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Billing</span>
                <span className="text-sm text-muted-foreground">No upcoming charges</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {billingHistory.length > 0 ? (
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(invoice.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">Invoice #{invoice.invoice_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      {isEU && invoice.vat_amount && (
                        <p className="text-xs text-muted-foreground">
                          +${invoice.vat_amount.toFixed(2)} VAT
                        </p>
                      )}
                    </div>
                    {getStatusBadge(invoice.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No billing history available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* VAT Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Tax Settings
          </CardTitle>
          <CardDescription>
            Configure VAT settings for EU customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="eu-vat"
              checked={isEU}
              onChange={(e) => setIsEU(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="eu-vat">I am located in the European Union (VAT will be applied)</Label>
          </div>
          {isEU && (
            <p className="text-sm text-muted-foreground mt-2">
              VAT will be automatically calculated at 21% for EU customers on all invoices.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
              <CardDescription>
                Enter your credit card information securely.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardForm.number}
                  onChange={(e) => setCardForm(prev => ({ ...prev, number: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exp-month">Month</Label>
                  <Input
                    id="exp-month"
                    placeholder="MM"
                    value={cardForm.exp_month}
                    onChange={(e) => setCardForm(prev => ({ ...prev, exp_month: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp-year">Year</Label>
                  <Input
                    id="exp-year"
                    placeholder="YYYY"
                    value={cardForm.exp_year}
                    onChange={(e) => setCardForm(prev => ({ ...prev, exp_year: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardForm.cvc}
                    onChange={(e) => setCardForm(prev => ({ ...prev, cvc: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardForm.name}
                  onChange={(e) => setCardForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCard} className="flex-1">
                  Add Card
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddCard(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 