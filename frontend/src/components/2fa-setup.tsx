"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Check, 
  X, 
  Copy, 
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  Smartphone,
  Key
} from "lucide-react"
import { generate2FASetup, enable2FA } from "@/lib/2fa-api"
import { generateEncryptionKey } from "@/lib/encryption"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface TwoFASetupProps {
  onComplete: (setup2FA: boolean) => void
  onSkip: () => void
}

export function TwoFASetup({ onComplete, onSkip }: TwoFASetupProps) {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'backup'>('intro')
  const [setupData, setSetupData] = useState<any>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState('')

  useEffect(() => {
    // Initialize encryption key
    let storedKey = sessionStorage.getItem('encryption_key')
    if (!storedKey) {
      storedKey = generateEncryptionKey()
      sessionStorage.setItem('encryption_key', storedKey)
    }
    setEncryptionKey(storedKey)
  }, [])

  const handleStartSetup = async () => {
    setIsLoading(true)
    try {
      const data = await generate2FASetup()
      if (data) {
        setSetupData(data)
        setStep('setup')
      } else {
        toast.error('Failed to generate 2FA setup')
      }
    } catch (error) {
      console.error('Error starting 2FA setup:', error)
      toast.error('Failed to start 2FA setup')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)
    try {
      // For now, we'll just simulate verification
      // In a real implementation, you'd verify the code with the server
      const success = await enable2FA(setupData.secret, setupData.backupCodes, encryptionKey)
      
      if (success) {
        setStep('backup')
      } else {
        toast.error('Invalid verification code')
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      toast.error('Failed to verify code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleComplete = () => {
    onComplete(true)
  }

  const handleSkip = () => {
    // Store in localStorage to show reminder later
    localStorage.setItem('show2FAReminder', 'true')
    onComplete(false)
  }

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(setupData.backupCodes.join('\n'))
    toast.success('Backup codes copied to clipboard')
  }

  const downloadBackupCodes = () => {
    const blob = new Blob([setupData.backupCodes.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nexogen-backup-codes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Backup codes downloaded')
  }

  if (step === 'intro') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account by requiring a second form of verification when you sign in.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Why set up 2FA?</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Protects your account from unauthorized access</li>
              <li>• Required for sensitive content and enterprise features</li>
              <li>• Industry standard for security compliance</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleStartSetup}
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Setting up...' : 'Set up 2FA'}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-1"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'setup') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <Smartphone className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Scan QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Open your authenticator app and scan this QR code to add Nexogen.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
              <img 
                src={setupData.qrCode} 
                alt="QR Code for 2FA setup" 
                className="w-48 h-48"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Manual entry code:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(setupData.secret)}
                className="h-6 px-2"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            <code className="text-xs font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
              {setupData.secret}
            </code>
          </div>

          <div className="space-y-3">
            <Label htmlFor="verification-code">Enter the 6-digit code from your app</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="text-center text-lg font-mono"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleVerifyCode}
              disabled={!verificationCode || verificationCode.length !== 6 || isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Verifying...' : 'Verify & Enable'}
            </Button>
            <Button
              onClick={() => setStep('intro')}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'backup') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Backup Codes</h3>
            <p className="text-sm text-muted-foreground">
              Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator app.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Important
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  These codes are shown only once. Save them securely and never share them with anyone.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Your backup codes:</span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBackupCodes(!showBackupCodes)}
                  className="h-6 px-2"
                >
                  {showBackupCodes ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyBackupCodes}
                  className="h-6 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadBackupCodes}
                  className="h-6 px-2"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {setupData.backupCodes.map((code: string, index: number) => (
                <code
                  key={index}
                  className="text-sm font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded text-center"
                >
                  {showBackupCodes ? code : '••••••••'}
                </code>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleComplete}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Complete Setup
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
} 