"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Sparkles, 
  Users, 
  Monitor, 
  Save, 
  Database, 
  Download, 
  FileText, 
  Shield, 
  Lock,
  Server,
  UserCheck,
  CheckCircle,
  Star,
  BarChart3,
  Bell,
  DollarSign,
  QrCode,
  Smartphone,
  Key
} from "lucide-react"
import { useDashboard } from "../layout"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"
import { TwoFactorAuthModal } from "@/components/two-factor-auth-modal"
import { get2FAStatus, enable2FA, disable2FA } from "@/lib/2fa-api"
import { generateEncryptionKey } from "@/lib/encryption"

export default function SettingsPage() {
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  
  // Get all the toggle states from the dashboard context
  const {
    recordDeviceAudio,
    setRecordDeviceAudio,
    mobileSidebarOpen,
    setMobileSidebarOpen
  } = useDashboard()

  // Local state for all toggles
  const [autoSummarize, setAutoSummarize] = useState(false)
  const [moreThanTwoSpeakers, setMoreThanTwoSpeakers] = useState(false)
  const [saveTranscripts, setSaveTranscripts] = useState(true)
  const [saveAudioToStorage, setSaveAudioToStorage] = useState(false)
  const [autoDownloadRecordings, setAutoDownloadRecordings] = useState(false)
  const [autoDownloadTranscripts, setAutoDownloadTranscripts] = useState(true)
  const [hasEnterprise, setHasEnterprise] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [show2FASetup, setShow2FASetup] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState("")

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        setAutoSummarize(localStorage.getItem('autoSummarize') === 'true')
        setMoreThanTwoSpeakers(localStorage.getItem('moreThanTwoSpeakers') === 'true')
        setSaveTranscripts(localStorage.getItem('saveTranscripts') !== 'false') // default true
        setSaveAudioToStorage(localStorage.getItem('saveAudioToStorage') === 'true')
        setAutoDownloadRecordings(localStorage.getItem('autoDownloadRecordings') === 'true')
        setAutoDownloadTranscripts(localStorage.getItem('autoDownloadTranscripts') !== 'false') // default true
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }

    const load2FAStatus = async () => {
      try {
        const status = await get2FAStatus()
        setIs2FAEnabled(status?.enabled || false)
      } catch (error) {
        console.error('Error loading 2FA status:', error)
      }
    }

    loadSettings()
    load2FAStatus()
    checkUserStatus()
    
    // Initialize encryption key
    const storedKey = localStorage.getItem('encryptionKey')
    if (storedKey) {
      setEncryptionKey(storedKey)
    } else {
      const newKey = generateEncryptionKey()
      localStorage.setItem('encryptionKey', newKey)
      setEncryptionKey(newKey)
    }
  }, [])

  // Check if user is admin and has enterprise access
  const checkUserStatus = async () => {
    try {
      const { data: { user } } = await import('@supabase/supabase-js').then(supabase => 
        supabase.createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        ).auth.getUser()
      )

      if (user) {
        const isAdminUser = user.user_metadata?.role === 'admin'
        setIsAdmin(isAdminUser)
        setHasEnterprise(isAdminUser) // For now, assume admin = enterprise
      }
    } catch (error) {
      console.error('Error checking user status:', error)
    }
  }

  // Save settings to localStorage
  const saveSetting = (key: string, value: boolean) => {
    try {
      localStorage.setItem(key, value.toString())
      toast.success(`${key} setting updated`)
    } catch (error) {
      console.error('Error saving setting:', error)
      toast.error('Failed to save setting')
    }
  }

  // Handle toggle changes
  const handleAutoSummarizeChange = (checked: boolean) => {
    setAutoSummarize(checked)
    saveSetting('autoSummarize', checked)
  }

  const handleMoreThanTwoSpeakersChange = (checked: boolean) => {
    setMoreThanTwoSpeakers(checked)
    saveSetting('moreThanTwoSpeakers', checked)
  }

  const handleRecordDeviceAudioChange = (checked: boolean) => {
    setRecordDeviceAudio(checked)
    saveSetting('recordDeviceAudio', checked)
  }

  const handleSaveTranscriptsChange = (checked: boolean) => {
    setSaveTranscripts(checked)
    saveSetting('saveTranscripts', checked)
  }

  const handleSaveAudioToStorageChange = (checked: boolean) => {
    setSaveAudioToStorage(checked)
    saveSetting('saveAudioToStorage', checked)
  }

  const handleAutoDownloadRecordingsChange = (checked: boolean) => {
    setAutoDownloadRecordings(checked)
    saveSetting('autoDownloadRecordings', checked)
  }

  const handleAutoDownloadTranscriptsChange = (checked: boolean) => {
    setAutoDownloadTranscripts(checked)
    saveSetting('autoDownloadTranscripts', checked)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500 rounded-xl">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t('settings.title')}</h1>
            <p className="text-lg text-muted-foreground mt-1">
              {t('settings.subtitle')}
            </p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t('settings.aiFeatures')}
            </CardTitle>
            <CardDescription>
              {t('settings.aiFeaturesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.autoSummarize')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.autoSummarizeDescription')}</p>
                </div>
              </div>
              <Switch
                checked={autoSummarize}
                onCheckedChange={handleAutoSummarizeChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.moreThanTwoSpeakers')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.moreThanTwoSpeakersDescription')}</p>
                </div>
              </div>
              <Switch
                checked={moreThanTwoSpeakers}
                onCheckedChange={handleMoreThanTwoSpeakersChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.recordDeviceAudio')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.recordDeviceAudioDescription')}</p>
                </div>
              </div>
              <Switch
                checked={recordDeviceAudio}
                onCheckedChange={handleRecordDeviceAudioChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Safety */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('settings.dataSafety')}
            </CardTitle>
            <CardDescription>
              {t('settings.dataSafetyDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Save className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.saveTranscripts')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.saveTranscriptsDescription')}</p>
                </div>
              </div>
              <Switch
                checked={saveTranscripts}
                onCheckedChange={handleSaveTranscriptsChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.saveAudioToStorage')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.saveAudioToStorageDescription')}</p>
                </div>
              </div>
              <Switch
                checked={saveAudioToStorage}
                onCheckedChange={handleSaveAudioToStorageChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.autoDownloadRecordings')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.autoDownloadRecordingsDescription')}</p>
                </div>
              </div>
              <Switch
                checked={autoDownloadRecordings}
                onCheckedChange={handleAutoDownloadRecordingsChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.autoDownloadTranscripts')}</Label>
                  <p className="text-sm text-muted-foreground">{t('settings.autoDownloadTranscriptsDescription')}</p>
                </div>
              </div>
              <Switch
                checked={autoDownloadTranscripts}
                onCheckedChange={handleAutoDownloadTranscriptsChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('settings.twoFactorAuth')}
            </CardTitle>
            <CardDescription>
              {t('settings.twoFactorAuthDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4" />
                <div>
                  <Label className="text-base font-medium">{t('settings.2faStatus')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {is2FAEnabled ? t('settings.enabled') : t('settings.notSetUp')}
                  </p>
                </div>
              </div>
              <Badge variant={is2FAEnabled ? "default" : "secondary"}>
                {is2FAEnabled ? t('settings.active') : t('settings.inactive')}
              </Badge>
            </div>

            {is2FAEnabled ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t('settings.2faActive')}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('settings.2faActiveDescription')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <Key className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t('settings.2faNotSetUp')}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('settings.2faNotSetUpDescription')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={() => setShow2FASetup(true)}
              variant={is2FAEnabled ? "outline" : "default"}
              className="w-full"
            >
              <QrCode className="h-4 w-4 mr-2" />
              {is2FAEnabled ? t('settings.manage2FA') : t('settings.setUp2FA')}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {t('settings.privacyInformation')}
            </CardTitle>
            <CardDescription>
              {t('settings.privacyInformationDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{t('settings.endToEndEncryption')}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('settings.endToEndEncryptionDescription')}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{t('settings.gdprHipaaCompliant')}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('settings.gdprHipaaCompliantDescription')}
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              {t('settings.viewDocumentation')}
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Settings */}
        {hasEnterprise ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  {t('settings.enterpriseFeatures')}
                </CardTitle>
                <CardDescription>
                  {t('settings.enterpriseFeaturesDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">{t('settings.storageConfiguration')}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('settings.storageConfigurationDescription')}
                  </p>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('settings.configureStorage')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('settings.teamManagement')}
                </CardTitle>
                <CardDescription>
                  {t('settings.teamManagementDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">{t('settings.userManagement')}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('settings.userManagementDescription')}
                  </p>
                  <Button variant="outline" className="w-full">
                    <UserCheck className="h-4 w-4 mr-2" />
                    {t('settings.manageUsers')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {t('settings.enterpriseAccess')}
              </CardTitle>
              <CardDescription>
                {t('settings.enterpriseAccessDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-3">{t('settings.enterpriseFeatures')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {t('settings.customS3Storage')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {t('settings.teamManagementRoles')}
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    {t('settings.advancedAnalytics')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    {t('settings.prioritySupport')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    {t('settings.customIntegrations')}
                  </li>
                </ul>
              </div>
              <Button className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                {t('settings.contactSales')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 2FA Setup Modal */}
      <TwoFactorAuthModal
        isOpen={show2FASetup}
        onClose={() => setShow2FASetup(false)}
        onSuccess={async (setupData) => {
          if (setupData) {
            const success = await enable2FA(setupData.secret, setupData.backupCodes, encryptionKey)
            if (success) {
              setIs2FAEnabled(true)
              setShow2FASetup(false)
            }
          }
        }}
        mode="setup"
        title={t('2fa.title')}
        description={t('2fa.step1Description')}
        encryptionKey={encryptionKey}
      />
    </div>
  )
} 