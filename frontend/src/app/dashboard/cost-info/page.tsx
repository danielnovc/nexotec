"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Clock, DollarSign, Info } from "lucide-react"
import { useCredits } from "@/hooks/useCredits"
import { useAuth } from "@/contexts/AuthContext"

export default function CostInfoPage() {
  const { user } = useAuth()
  const { 
    credits, 
    loading: creditsLoading, 
    hasEnoughCredits,
    estimateCost
  } = useCredits()
  
  const [estimatedCost, setEstimatedCost] = useState<number>(0)
  const [actualCost, setActualCost] = useState<number>(0)
  const [audioDuration, setAudioDuration] = useState<number>(0)

  // Load cost information from localStorage if available
  useEffect(() => {
    const storedEstimatedCost = localStorage.getItem('estimatedCost')
    const storedActualCost = localStorage.getItem('actualCost')
    const storedAudioDuration = localStorage.getItem('audioDuration')
    
    if (storedEstimatedCost) setEstimatedCost(parseFloat(storedEstimatedCost))
    if (storedActualCost) setActualCost(parseFloat(storedActualCost))
    if (storedAudioDuration) setAudioDuration(parseFloat(storedAudioDuration))
  }, [])

  const clearCostInfo = () => {
    setEstimatedCost(0)
    setActualCost(0)
    setAudioDuration(0)
    localStorage.removeItem('estimatedCost')
    localStorage.removeItem('actualCost')
    localStorage.removeItem('audioDuration')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cost Information</h1>
          <p className="text-muted-foreground">
            Track your transcription costs and credit usage
          </p>
        </div>

        <Card className="shadow-lg border border-gray-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Session Costs
            </CardTitle>
            <CardDescription>
              Pricing: $0.10 per minute of audio (minimum $0.10 per upload)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Credits</span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {creditsLoading ? 'Loading...' : `$${credits.toFixed(2)}`}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Audio Duration</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {audioDuration > 0 ? `${(audioDuration / 60).toFixed(2)} minutes` : 'No audio processed'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Cost</span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  ${estimatedCost.toFixed(4)}
                </span>
                {audioDuration > 0 && audioDuration < 60 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Note: Clips under 1 minute are charged $0.10 minimum
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Actual Cost</span>
                <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {actualCost > 0 ? `$${actualCost.toFixed(4)}` : 'No cost yet'}
                </span>
              </div>
            </div>
            
            {/* Credit status indicator */}
            <div className="mt-4 p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${hasEnoughCredits(audioDuration) ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">
                    {hasEnoughCredits(audioDuration) ? 'Sufficient credits available' : 'Insufficient credits'}
                  </span>
                </div>
                {!hasEnoughCredits(audioDuration) && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = '/dashboard/credits'}
                  >
                    Buy Credits
                  </Button>
                )}
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Pricing Model:</strong> We charge $0.10 per minute of audio with a $0.10 minimum charge per upload. 
                  This ensures high-quality transcription while maintaining competitive pricing.
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1"
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={clearCostInfo}
                className="flex-1"
              >
                Clear Cost Info
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Standard Transcription</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• $0.10 per minute of audio</li>
                  <li>• Speaker diarization included</li>
                  <li>• High-accuracy AI processing</li>
                  <li>• Multiple language support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Note-taking Mode</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• $0.08 per minute of audio</li>
                  <li>• No speaker identification</li>
                  <li>• Faster processing</li>
                  <li>• Clean text output</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Usage Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Cost Optimization</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use note-taking mode for single speakers</li>
                  <li>• Combine short recordings into longer sessions</li>
                  <li>• Check cost estimates before processing</li>
                  <li>• Monitor your credit balance regularly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quality vs Cost</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Higher quality audio = better accuracy</li>
                  <li>• Reduce background noise for better results</li>
                  <li>• Speak clearly for optimal transcription</li>
                  <li>• Consider file format for best quality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 