"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  QrCode, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  RefreshCw,
  Key,
  Clock,
  Zap,
  Shield as Security,
  Fingerprint,
  Smartphone as PhoneIcon
} from "lucide-react"
import { toast } from "sonner"
import { useI18n } from "@/lib/i18n"
import { generate2FASetup, enable2FA, verify2FACode } from "@/lib/2fa-api"

interface TwoFactorAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (setupData?: TwoFactorSetup) => void
  onSetup?: () => void
  mode?: 'verify' | 'setup'
  title?: string
  description?: string
  encryptionKey: string
}

interface TwoFactorSetup {
  secret: string
  qrCode: string
  backupCodes: string[]
}

export function TwoFactorAuthModal({
  isOpen,
  onClose,
  onSuccess,
  onSetup,
  mode = 'verify',
  title,
  description,
  encryptionKey
}: TwoFactorAuthModalProps) {
  const { t } = useI18n()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [setupData, setSetupData] = useState<TwoFactorSetup | null>(null)
  const [step, setStep] = useState<'verify' | 'setup' | 'backup' | 'setup-complete'>('verify')
  const [backupCode, setBackupCode] = useState("")
  const [showBackupInput, setShowBackupInput] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const maxAttempts = 5
  const lockoutDuration = 15 * 60 * 1000 // 15 minutes

  useEffect(() => {
    if (isOpen) {
      setCode("")
      setError("")
      setAttempts(0)
      setLockoutTime(null)
      setShowBackupInput(false)
      setBackupCode("")
      
      if (mode === 'setup') {
        setStep('setup')
        generateSetupData()
      } else {
        setStep('verify')
      }
    }
  }, [isOpen, mode])

  useEffect(() => {
    if (lockoutTime && new Date() > lockoutTime) {
      setLockoutTime(null)
      setAttempts(0)
    }
  }, [lockoutTime])

  const generateSetupData = async () => {
    try {
      setIsLoading(true)
      const setupData = await generate2FASetup()
      if (setupData) {
        setSetupData(setupData)
      } else {
        toast.error(t('2fa.setupDataError'))
      }
    } catch (err) {
      toast.error(t('2fa.setupDataError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newCode = code.split('')
    newCode[index] = value
    const newCodeString = newCode.join('')
    setCode(newCodeString)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'Enter' && code.length === 6 && !isLoading && !isLockedOut) {
      e.preventDefault()
      verifyCode()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6)
    setCode(pastedData)
    
    // Focus the appropriate input
    const focusIndex = Math.min(pastedData.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  const verifyCode = async () => {
    if (lockoutTime && new Date() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime.getTime() - new Date().getTime()) / 1000 / 60)
      setError(`${t('2fa.tooManyAttempts')} ${remainingTime} ${t('2fa.minutesWait')}`)
      return
    }

    if (code.length !== 6) {
      setError(t('2fa.enter6DigitCode'))
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const isValid = await verify2FACode(code, encryptionKey)
      
      if (isValid) {
        toast.success(t('2fa.verificationSuccessful'))
        onSuccess()
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        
        if (newAttempts >= maxAttempts) {
          const lockoutEnd = new Date(Date.now() + lockoutDuration)
          setLockoutTime(lockoutEnd)
          setError(`${t('2fa.tooManyAttempts')} 15 ${t('2fa.minutesWait')}`)
        } else {
          setError(`${t('2fa.invalidCode')} ${maxAttempts - newAttempts} ${t('2fa.attemptsRemaining')}`)
        }
        
        setCode("")
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError(t('2fa.verificationFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const verifyBackupCode = async () => {
    if (!backupCode) {
      setError(t('2fa.enterBackupCode'))
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const isValid = await verify2FACode(backupCode, encryptionKey)
      
      if (isValid) {
        toast.success(t('2fa.backupVerificationSuccessful'))
        onSuccess()
      } else {
        setError(t('2fa.invalidBackupCode'))
        setBackupCode("")
      }
    } catch (err) {
      setError(t('2fa.backupVerificationFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(t('2fa.copiedToClipboard'))
  }

  const isLockedOut = !!(lockoutTime && new Date() < lockoutTime)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              {/* Security Header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {title || t('2fa.title')}
                </CardTitle>
                
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {description || t('2fa.description')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {step === 'verify' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Code Input */}
                    <div className="space-y-4">
                      <Label className="text-base font-medium text-gray-700 dark:text-gray-300 text-center block">
                        {t('2fa.enterCode')}
                      </Label>
                      
                      <div className="flex gap-3 justify-center">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <Input
                              ref={(el) => {
                                inputRefs.current[index] = el
                              }}
                              type="text"
                              maxLength={1}
                              value={code[index] || ''}
                              onChange={(e) => handleCodeChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onPaste={handlePaste}
                              disabled={isLockedOut || isLoading}
                              className="w-12 h-12 text-center text-lg font-mono border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={verifyCode}
                        disabled={code.length !== 6 || isLoading || isLockedOut}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {t('2fa.verifyCode')}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setShowBackupInput(!showBackupInput)}
                        className="px-4"
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Backup Code Input */}
                    <AnimatePresence>
                      {showBackupInput && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                        >
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('2fa.useBackupCode')}
                          </Label>
                          <Input
                            type="text"
                            placeholder={t('2fa.enterBackupCode')}
                            value={backupCode}
                            onChange={(e) => setBackupCode(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && backupCode && !isLoading) {
                                e.preventDefault()
                                verifyBackupCode()
                              }
                            }}
                            disabled={isLoading}
                            className="font-mono"
                          />
                          <Button
                            onClick={verifyBackupCode}
                            disabled={!backupCode || isLoading}
                            variant="outline"
                            className="w-full"
                          >
                            {t('2fa.useBackupCode')}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Help Text */}
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-2">
                      <p>{t('2fa.getCodeFromApp')}</p>
                      <p>
                        <a 
                          href="/dashboard/settings" 
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => {
                            e.preventDefault()
                            onClose()
                            window.location.href = '/dashboard/settings'
                          }}
                        >
                          {t('2fa.setupLink')}
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 'setup' && setupData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t('2fa.step1Title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {t('2fa.step1Description')}
                        </p>
                      </div>
                      
                      <div className="mx-auto w-48 h-48 bg-white p-4 rounded-lg border">
                        <img 
                          src={setupData.qrCode} 
                          alt="QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t('2fa.enterManually')}</Label>
                        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded border">
                          <code className="flex-1 font-mono text-sm">{setupData.secret}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(setupData.secret)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setStep('setup-complete')}
                        className="flex-1"
                      >
                        {t('2fa.codeAdded')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={onClose}
                      >
                        {t('2fa.cancel')}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 'setup-complete' && setupData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t('2fa.step2Title')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {t('2fa.step2Description')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t('2fa.backupCodes')}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {setupData.backupCodes.map((code, index) => (
                            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded border text-center font-mono text-sm">
                              {code}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          if (setupData) {
                            onSuccess(setupData)
                          }
                        }}
                        className="flex-1"
                      >
                        {t('2fa.completeSetup')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setStep('setup')}
                      >
                        {t('2fa.back')}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 