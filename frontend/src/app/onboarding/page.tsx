"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Shield, 
  Users, 
  Mic, 
  FileText, 
  Globe, 
  Building, 
  User,
  GraduationCap,
  Briefcase,
  Heart,
  Scale,
  MessageSquare,
  Clock,
  Zap,
  Star,
  Mail,
  Search,
  Share2,
  BookOpen,
  Video,
  Radio,
  Smartphone,
  Info,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"
import { TwoFactorAuthModal } from "@/components/two-factor-auth-modal"
import { generateEncryptionKey } from "@/lib/encryption"

interface OnboardingData {
  source: string
  occupation: string
  primaryUseCase: string
  languages: string[]
  teamSize: string
  securityLevel: string
  monthlyVolume: string
}

const sourceOptions = [
  { value: "google", label: "Google Search", icon: Search },
  { value: "social", label: "Social Media", icon: Share2 },
  { value: "referral", label: "Friend/Colleague", icon: Users },
  { value: "advertisement", label: "Advertisement", icon: Star },
  { value: "article", label: "Article/Blog", icon: BookOpen },
  { value: "other", label: "Other", icon: MessageSquare }
]

const occupationOptions = [
  { value: "medical", label: "Medical Professional", icon: Heart, color: "bg-red-100 text-red-700" },
  { value: "therapy", label: "Therapist/Counselor", icon: Users, color: "bg-blue-100 text-blue-700" },
  { value: "legal", label: "Legal Professional", icon: Scale, color: "bg-purple-100 text-purple-700" },
  { value: "business", label: "Business Professional", icon: Building, color: "bg-green-100 text-green-700" },
  { value: "academic", label: "Academic/Researcher", icon: GraduationCap, color: "bg-orange-100 text-orange-700" },
  { value: "content", label: "Content Creator", icon: Video, color: "bg-pink-100 text-pink-700" },
  { value: "student", label: "Student", icon: BookOpen, color: "bg-indigo-100 text-indigo-700" },
  { value: "other", label: "Other", icon: User, color: "bg-gray-100 text-gray-700" }
]

const useCaseOptions = [
  { value: "medical", label: "Medical Consultations", icon: Heart, description: "Patient consultations and medical records" },
  { value: "therapy", label: "Therapy Sessions", icon: Users, description: "Counseling and therapy sessions" },
  { value: "legal", label: "Legal Proceedings", icon: Scale, description: "Court hearings and legal consultations" },
  { value: "business", label: "Business Meetings", icon: Building, description: "Team meetings and client calls" },
  { value: "academic", label: "Academic Lectures", icon: GraduationCap, description: "Educational content and lectures" },
  { value: "podcast", label: "Podcasts & Media", icon: Radio, description: "Content creation and media production" },
  { value: "personal", label: "Personal Notes", icon: FileText, description: "Personal thoughts and voice memos" },
  { value: "interviews", label: "Interviews", icon: Mic, description: "Job interviews and research interviews" }
]

const languageOptions = [
  { value: "english", label: "English", flag: "🇺🇸" },
  { value: "spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "french", label: "French", flag: "🇫🇷" },
  { value: "german", label: "German", flag: "🇩🇪" },
  { value: "italian", label: "Italian", flag: "🇮🇹" },
  { value: "portuguese", label: "Portuguese", flag: "🇵🇹" },
  { value: "russian", label: "Russian", flag: "🇷🇺" },
  { value: "chinese", label: "Chinese", flag: "🇨🇳" },
  { value: "japanese", label: "Japanese", flag: "🇯🇵" },
  { value: "korean", label: "Korean", flag: "🇰🇷" },
  { value: "arabic", label: "Arabic", flag: "🇸🇦" },
  { value: "hindi", label: "Hindi", flag: "🇮🇳" }
]

const teamSizeOptions = [
  { value: "solo", label: "Just me", icon: User, description: "Personal use" },
  { value: "small", label: "Small team (2-10)", icon: Users, description: "Small business or practice" },
  { value: "medium", label: "Medium team (11-50)", icon: Building, description: "Growing organization" },
  { value: "large", label: "Large team (50+)", icon: Building, description: "Enterprise organization" }
]

const securityLevelOptions = [
  { value: "standard", label: "Standard", icon: Shield, description: "Basic security for general use" },
  { value: "enhanced", label: "Enhanced", icon: Shield, description: "Additional security for sensitive data" },
  { value: "maximum", label: "Maximum", icon: Shield, description: "Highest security for regulated industries" }
]

const volumeOptions = [
  { value: "low", label: "Low (< 10 hours/month)", icon: Clock, description: "Occasional use" },
  { value: "medium", label: "Medium (10-50 hours/month)", icon: Clock, description: "Regular use" },
  { value: "high", label: "High (50+ hours/month)", icon: Clock, description: "Heavy use" }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState("")
  const [data, setData] = useState<OnboardingData>({
    source: "",
    occupation: "",
    primaryUseCase: "",
    languages: [],
    teamSize: "",
    securityLevel: "",
    monthlyVolume: ""
  })

  const steps = [
    {
      title: "How did you find us?",
      subtitle: "Help us understand how to reach more users like you",
      component: "source"
    },
    {
      title: "What's your occupation?",
      subtitle: "We'll customize your experience based on your profession",
      component: "occupation"
    },
    {
      title: "What will you use Nexogen for?",
      subtitle: "This helps us provide the most relevant features",
      component: "useCase"
    },
    {
      title: "What languages do you work with?",
      subtitle: "Select all that apply",
      component: "languages"
    },
    {
      title: "What's your team size?",
      subtitle: "This helps us recommend the right features",
      component: "teamSize"
    },
    {
      title: "How important is security?",
      subtitle: "We'll configure encryption settings accordingly",
      component: "security"
    },
    {
      title: "How much audio do you transcribe?",
      subtitle: "This helps us recommend the right credit package",
      component: "volume"
    },
    {
      title: "Set up Two-Factor Authentication",
      subtitle: "Add an extra layer of security to your account",
      component: "2fa"
    }
  ]

  // Initialize encryption key
  useEffect(() => {
    let storedKey = sessionStorage.getItem('encryption_key')
    if (!storedKey) {
      storedKey = generateEncryptionKey()
      sessionStorage.setItem('encryption_key', storedKey)
    }
    setEncryptionKey(storedKey)
  }, [])

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    try {
      // Save onboarding data to user profile
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setShowWelcome(true)
        
        // Show welcome toast
        toast.success("Welcome to Nexogen! 🎉", {
          description: "Your account is now set up and ready to use.",
          duration: 5000,
        })
        
        // Show 2FA setup modal
        setTimeout(() => {
          setShow2FAModal(true)
        }, 2000)
      } else {
        throw new Error('Failed to save onboarding data')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error("Something went wrong. You can complete this later in settings.")
      router.push('/dashboard')
    }
  }

  const handle2FASuccess = (setupData?: any) => {
    setShow2FAModal(false)
    if (setupData) {
      // 2FA was set up successfully
      toast.success("2FA has been enabled successfully!")
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      // User skipped 2FA setup - reminder is already set in database
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }

  const handle2FAClose = () => {
    setShow2FAModal(false)
    // User closed the modal, reminder is already set in database
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  const renderSourceStep = () => (
    <div className="space-y-6">
      {/* Privacy Disclaimer */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Help us improve Nexogen
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your answers help us understand how to better serve users like you and improve our product. 
              This data is stored securely and used only for product improvement and analytics.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sourceOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData('source', option.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                data.source === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const renderOccupationStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {occupationOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData('occupation', option.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                data.occupation === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium text-center">{option.label}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const renderUseCaseStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {useCaseOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateData('primaryUseCase', option.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.primaryUseCase === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const renderLanguagesStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {languageOptions.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const newLanguages = data.languages.includes(option.value)
                ? data.languages.filter(lang => lang !== option.value)
                : [...data.languages, option.value]
              updateData('languages', newLanguages)
            }}
            className={`p-3 rounded-xl border-2 transition-all ${
              data.languages.includes(option.value)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">{option.flag}</span>
              <span className="text-xs font-medium">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )

  const renderTeamSizeStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {teamSizeOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateData('teamSize', option.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.teamSize === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const renderSecurityStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {securityLevelOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateData('securityLevel', option.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.securityLevel === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const renderVolumeStep = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {volumeOptions.map((option) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => updateData('monthlyVolume', option.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                data.monthlyVolume === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  const render2FAStep = () => (
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

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Click "Continue" to set up 2FA with your authenticator app, or you can skip for now and set it up later in settings.
          </p>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "source":
        return renderSourceStep()
      case "occupation":
        return renderOccupationStep()
      case "useCase":
        return renderUseCaseStep()
      case "languages":
        return renderLanguagesStep()
      case "teamSize":
        return renderTeamSizeStep()
      case "security":
        return renderSecurityStep()
      case "volume":
        return renderVolumeStep()
      case "2fa":
        return render2FAStep()
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (steps[currentStep].component) {
      case "source":
        return !!data.source
      case "occupation":
        return !!data.occupation
      case "useCase":
        return !!data.primaryUseCase
      case "languages":
        return data.languages.length > 0
      case "teamSize":
        return !!data.teamSize
      case "security":
        return !!data.securityLevel
      case "volume":
        return !!data.monthlyVolume
      case "2fa":
        return true // Always can proceed from 2FA step
      default:
        return false
    }
  }

  // Welcome Modal
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 text-center">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">
                Welcome to Nexogen! 🎉
              </CardTitle>
              <p className="text-muted-foreground">
                Your account is now set up. Let's add an extra layer of security with 2FA.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="pt-4">
                <Button
                  onClick={() => setShow2FAModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Set up Two-Factor Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Main Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold mb-2">
                  {steps[currentStep].title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {steps[currentStep].subtitle}
                </p>
              </CardHeader>
              <CardContent className="pb-8">
                {renderStepContent()}
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>
                {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Skip Option */}
          {currentStep < steps.length - 1 && (
            <div className="text-center mt-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-muted-foreground hover:text-gray-600 underline"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2FA Setup Modal */}
      <TwoFactorAuthModal
        isOpen={show2FAModal}
        onClose={handle2FAClose}
        onSuccess={handle2FASuccess}
        mode="setup"
        title="Set up Two-Factor Authentication"
        description="Scan the QR code with your authenticator app to add an extra layer of security to your account."
        encryptionKey={encryptionKey}
      />
    </>
  )
} 