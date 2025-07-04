export default {
  // Dashboard Navigation
  dashboard: 'Dashboard',
  transcriptions: 'Transkriptionen',
  notes: 'Notizen',
  analytics: 'Analytik',
  billing: 'Abrechnung',
  credits: 'Guthaben',
  account: 'Konto',
  enterprise: 'Unternehmen',
  
  // Dashboard Recording
  audioRecording: 'Audioaufnahme',
  recordAudioForTranscription: 'Audio für Transkription aufnehmen',
  recordingInProgress: 'Aufnahme läuft...',
  deviceAudio: 'Geräte-Audio',
  microphone: 'Mikrofon',
  noNotesGeneratedYet: 'Noch keine Notizen generiert.',
  noTranscriptionGeneratedYet: 'Noch keine Transkription generiert.',
  noSummaryGeneratedYet: 'Noch keine Zusammenfassung generiert.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Audio-Transkription',
  transcriptionHistory: 'Transkriptionsverlauf',
  notesHistory: 'Notizenverlauf',
  topUpCredits: 'Guthaben aufladen',
  tools: 'Werkzeuge',
  dataSafety: 'Datensicherheit',
  downloadOptions: 'Download-Optionen',
  configureStorage: 'Speicher konfigurieren',
  
  // Sidebar and UI
  toggleTheme: 'Theme umschalten',
  notesMode: 'Notizen-Modus',
  transcriptionMode: 'Transkriptions-Modus',
  switchToTranscriptionMode: 'Zum Transkriptions-Modus wechseln: Anzeige als Gespräch mit Sprecher-Labels',
  switchToNotesMode: 'Zum Notizen-Modus wechseln: Anzeige als fortlaufender Text für Notizen',
  moreThanTwoSpeakersTooltip: 'Aktivieren Sie dies, wenn Ihr Audio mehr als zwei Sprecher enthält. Dies verbessert die Genauigkeit der Sprecher-Diarisierung, indem verhindert wird, dass das System fälschlicherweise zusätzliche Sprecher aufgrund von Hintergrundgeräuschen oder kurzen Tonabweichungen hinzufügt.',
  recordDeviceAudioTooltip: 'Aktivieren Sie dies, um System-Audio (Musik, Videos, Anrufe) zusätzlich zur Mikrofon-Eingabe aufzunehmen. Dies ermöglicht es Ihnen, sowohl Ihre Stimme als auch das auf Ihrem Gerät abgespielte Audio zu erfassen.',
  
  // Dashboard Main Page
  welcome: 'Willkommen zurück',
  startRecording: 'Aufnahme starten',
  stopRecording: 'Aufnahme stoppen',
  recording: 'Aufnahme läuft...',
  processing: 'Verarbeitung...',
  generatingSummary: 'Zusammenfassung wird generiert...',
  generatingPDF: 'PDF wird generiert...',
  
  // Recording Controls
  selectMicrophone: 'Mikrofon auswählen',
  defaultMicrophone: 'Standard-Mikrofon',
  recordingDuration: 'Aufnahmedauer',
  recordingStatus: 'Aufnahmestatus',
  
  // Transcription
  transcription: 'Transkription',
  noTranscription: 'Keine Transkription verfügbar',
  copyTranscription: 'Transkription kopieren',
  downloadTranscription: 'Transkription herunterladen',
  clearTranscription: 'Transkription löschen',
  transcriptionCopied: 'Transkription in Zwischenablage kopiert',
  
  // Summary
  summary: 'Zusammenfassung',
  generateSummary: 'Zusammenfassung generieren',
  noSummary: 'Keine Zusammenfassung verfügbar',
  summaryGenerated: 'Zusammenfassung erfolgreich generiert',
  downloadPDF: 'PDF herunterladen',
  
  // Notes
  addNote: 'Notiz hinzufügen',
  editNote: 'Notiz bearbeiten',
  deleteNote: 'Notiz löschen',
  saveNote: 'Notiz speichern',
  noteSaved: 'Notiz erfolgreich gespeichert',
  noteDeleted: 'Notiz erfolgreich gelöscht',
  notesWillAppearHere: 'Notizen werden hier angezeigt',
  transcriptionWillAppearHere: 'Transkription wird hier angezeigt',
  
  // Credits
  availableCredits: 'Verfügbares Guthaben',
  creditsUsed: 'Verwendetes Guthaben',
  buyCredits: 'Guthaben kaufen',
  creditHistory: 'Guthabenverlauf',
  insufficientCredits: 'Unzureichendes Guthaben',
  
  // Settings
  settings: {
    title: 'Einstellungen',
    subtitle: 'Konfigurieren Sie Ihre Transkriptions- und Anwendungseinstellungen',
    aiFeatures: 'KI-Funktionen',
    aiFeaturesDescription: 'KI-gestützte Transkriptionsfunktionen konfigurieren',
    autoSummarize: 'Automatisch zusammenfassen',
    autoSummarizeDescription: 'Automatisch Zusammenfassungen generieren',
    moreThanTwoSpeakers: 'Mehr als zwei Sprecher',
    moreThanTwoSpeakersDescription: 'Verbesserte Sprechererkennung',
    recordDeviceAudio: 'Geräte-Audio aufnehmen',
    recordDeviceAudioDescription: 'System-Audio erfassen',
    dataSafety: 'Datensicherheit',
    dataSafetyDescription: 'Steuern Sie, wie Ihre Daten gespeichert und verarbeitet werden',
    saveTranscripts: 'Transkriptionen speichern',
    saveTranscriptsDescription: 'Transkriptionen sicher speichern',
    saveAudioToStorage: 'Audio im Speicher speichern',
    saveAudioToStorageDescription: 'Audiodateien sicher speichern',
    autoDownloadRecordings: 'Aufnahmen automatisch herunterladen',
    autoDownloadRecordingsDescription: 'Aufnahmen nach Abschluss automatisch auf das Gerät speichern',
    autoDownloadTranscripts: 'Transkriptionen automatisch herunterladen',
    autoDownloadTranscriptsDescription: 'Transkriptionen nach Abschluss der Aufnahme und Transkription automatisch auf das Gerät speichern',
    twoFactorAuth: 'Zwei-Faktor-Authentifizierung',
    twoFactorAuthDescription: 'Sichern Sie Ihr Konto mit 2FA',
    '2faStatus': '2FA-Status',
    enabled: 'Aktiviert',
    notSetUp: 'Nicht eingerichtet',
    active: 'Aktiv',
    inactive: 'Inaktiv',
    '2faActive': '2FA ist aktiv',
    '2faActiveDescription': 'Ihr Konto ist mit Zwei-Faktor-Authentifizierung geschützt.',
    '2faNotSetUp': '2FA nicht eingerichtet',
    '2faNotSetUpDescription': 'Aktivieren Sie die Zwei-Faktor-Authentifizierung für erweiterte Sicherheit.',
    manage2FA: '2FA verwalten',
    setUp2FA: '2FA einrichten',
    privacyInformation: 'Datenschutzinformationen',
    privacyInformationDescription: 'Erfahren Sie mehr über unsere Datenschutzpraktiken',
    endToEndEncryption: 'Ende-zu-Ende-Verschlüsselung',
    endToEndEncryptionDescription: 'Alle Ihre Daten werden mit AES-256-Verschlüsselung verschlüsselt und niemals im Klartext gespeichert.',
    gdprHipaaCompliant: 'DSGVO & HIPAA-konform',
    gdprHipaaCompliantDescription: 'Unsere Plattform erfüllt die höchsten Standards für Datenschutz und Privatsphäre.',
    viewDocumentation: 'Dokumentation anzeigen',
    enterpriseAccess: 'Enterprise-Zugang',
    enterpriseAccessDescription: 'Upgraden Sie auf Enterprise für erweiterte Funktionen',
    enterpriseFeatures: 'Enterprise-Funktionen',
    enterpriseFeaturesDescription: 'Enterprise-spezifische Einstellungen konfigurieren',
    storageConfiguration: 'Speicherkonfiguration',
    storageConfigurationDescription: 'Konfigurieren Sie Ihren eigenen S3-kompatiblen Speicher für vollständige Datensouveränität.',
    configureStorage: 'Speicher konfigurieren',
    teamManagement: 'Team-Management',
    teamManagementDescription: 'Verwalten Sie Ihr Enterprise-Team und Berechtigungen',
    userManagement: 'Benutzerverwaltung',
    userManagementDescription: 'Fügen Sie Team-Mitglieder hinzu, entfernen Sie sie und verwalten Sie sie mit rollenbasierter Zugriffskontrolle.',
    manageUsers: 'Benutzer verwalten',
    customS3Storage: 'Benutzerdefinierte S3-Speicherkonfiguration',
    teamManagementRoles: 'Team-Management und Benutzerrollen',
    advancedAnalytics: 'Erweiterte Analysen und Berichterstattung',
    prioritySupport: 'Prioritäts-Support und SLA',
    customIntegrations: 'Benutzerdefinierte Integrationen und API-Zugang',
    contactSales: 'Vertrieb kontaktieren',
  },
  
  // Analytics
  transcriptionStats: 'Transkriptionsstatistiken',
  usageStats: 'Nutzungsstatistiken',
  monthlyUsage: 'Monatliche Nutzung',
  totalTranscriptions: 'Gesamte Transkriptionen',
  totalNotes: 'Gesamte Notizen',
  
  // Billing
  currentPlan: 'Aktueller Plan',
  upgradePlan: 'Plan upgraden',
  billingHistory: 'Abrechnungsverlauf',
  paymentMethod: 'Zahlungsmethode',
  
  // Account
  profile: 'Profil',
  security: 'Sicherheit',
  preferences: 'Einstellungen',
  logout: 'Abmelden',
  
  // Enterprise
  teamManagement: 'Team-Management',
  adminPanel: 'Admin-Panel',
  userManagement: 'Benutzerverwaltung',
  
  // Common Actions
  save: 'Speichern',
  cancel: 'Abbrechen',
  delete: 'Löschen',
  edit: 'Bearbeiten',
  add: 'Hinzufügen',
  remove: 'Entfernen',
  download: 'Herunterladen',
  upload: 'Hochladen',
  search: 'Suchen',
  filter: 'Filter',
  sort: 'Sortieren',
  
  // Status Messages
  loading: 'Lädt...',
  error: 'Fehler',
  success: 'Erfolg',
  warning: 'Warnung',
  info: 'Information',
  
  // Time and Date
  today: 'Heute',
  yesterday: 'Gestern',
  thisWeek: 'Diese Woche',
  thisMonth: 'Dieser Monat',
  lastMonth: 'Letzter Monat',
  
  // File Types
  audio: 'Audio',
  video: 'Video',
  document: 'Dokument',
  image: 'Bild',
  
  // Languages
  language: 'Sprache',
  english: 'Englisch',
  spanish: 'Spanisch',
  german: 'Deutsch',
  french: 'Französisch',
  russian: 'Russisch',
  ukrainian: 'Ukrainisch',
  lithuanian: 'Litauisch',
  polish: 'Polnisch',
  
  // Error Messages
  errorOccurred: 'Ein Fehler ist aufgetreten',
  tryAgain: 'Bitte versuchen Sie es erneut',
  networkError: 'Netzwerkfehler',
  permissionDenied: 'Zugriff verweigert',
  fileTooLarge: 'Datei zu groß',
  invalidFormat: 'Ungültiges Format',
  
  // Success Messages
  savedSuccessfully: 'Erfolgreich gespeichert',
  deletedSuccessfully: 'Erfolgreich gelöscht',
  uploadedSuccessfully: 'Erfolgreich hochgeladen',
  downloadedSuccessfully: 'Erfolgreich heruntergeladen',
  
  // Confirmation Dialogs
  confirmDelete: 'Sind Sie sicher, dass Sie dies löschen möchten?',
  confirmLogout: 'Sind Sie sicher, dass Sie sich abmelden möchten?',
  confirmClear: 'Sind Sie sicher, dass Sie dies löschen möchten?',
  
  // Placeholders
  searchPlaceholder: 'Suchen...',
  notePlaceholder: 'Schreiben Sie Ihre Notiz hier...',
  transcriptionPlaceholder: 'Transkription wird hier angezeigt...',
  
  // Tooltips
  startRecordingTooltip: 'Audioaufnahme starten',
  stopRecordingTooltip: 'Audioaufnahme stoppen',
  copyTooltip: 'In Zwischenablage kopieren',
  downloadTooltip: 'Datei herunterladen',
  deleteTooltip: 'Element löschen',
  editTooltip: 'Element bearbeiten',
  
  // Accessibility
  ariaStartRecording: 'Aufnahme-Start-Button',
  ariaStopRecording: 'Aufnahme-Stopp-Button',
  ariaCopyTranscription: 'Transkription kopieren Button',
  ariaDownloadTranscription: 'Transkription herunterladen Button',
  ariaClearTranscription: 'Transkription löschen Button',
  
  // Cost and Pricing
  estimatedCost: 'Geschätzte Kosten',
  actualCost: 'Tatsächliche Kosten',
  costPerMinute: 'Kosten pro Minute',
  totalCost: 'Gesamtkosten',
  
  // Audio Processing
  audioProcessing: 'Audio-Verarbeitung',
  processingAudio: 'Audio wird verarbeitet...',
  audioProcessed: 'Audio erfolgreich verarbeitet',
  processingFailed: 'Verarbeitung fehlgeschlagen',
  
  // Speaker Recognition
  speakerRecognition: 'Sprecher-Erkennung',
  speaker1: 'Sprecher 1',
  speaker2: 'Sprecher 2',
  speaker3: 'Sprecher 3',
  speaker4: 'Sprecher 4',
  unknownSpeaker: 'Unbekannter Sprecher',
  
  // Quality Settings
  qualitySettings: 'Qualitätseinstellungen',
  highQuality: 'Hohe Qualität',
  mediumQuality: 'Mittlere Qualität',
  lowQuality: 'Niedrige Qualität',
  
  // Export Options
  exportOptions: 'Export-Optionen',
  exportAsPDF: 'Als PDF exportieren',
  exportAsTXT: 'Als TXT exportieren',
  exportAsSRT: 'Als SRT exportieren',
  exportAsVTT: 'Als VTT exportieren',
  
  // Privacy and Security
  privacy: 'Datenschutz',
  securitySettings: 'Sicherheit',
  encryption: 'Verschlüsselung',
  dataProtection: 'Datenschutz',
  gdprCompliant: 'DSGVO-konform',
  hipaaCompliant: 'HIPAA-konform',
  
  // Support
  support: 'Support',
  help: 'Hilfe',
  documentation: 'Dokumentation',
  contactSupport: 'Support kontaktieren',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Benachrichtigungen',
  notificationSettings: 'Benachrichtigungseinstellungen',
  emailNotifications: 'E-Mail-Benachrichtigungen',
  pushNotifications: 'Push-Benachrichtigungen',
  
  // Theme
  theme: 'Theme',
  lightMode: 'Heller Modus',
  darkMode: 'Dunkler Modus',
  systemTheme: 'System-Theme',
  
  // User Interface
  sidebar: 'Seitenleiste',
  mainContent: 'Hauptinhalt',
  header: 'Kopfzeile',
  footer: 'Fußzeile',
  navigation: 'Navigation',
  
  // Data Management
  dataManagement: 'Datenverwaltung',
  backup: 'Backup',
  restore: 'Wiederherstellen',
  sync: 'Synchronisieren',
  import: 'Importieren',
  export: 'Exportieren',
  
  // Performance
  performance: 'Leistung',
  speed: 'Geschwindigkeit',
  accuracy: 'Genauigkeit',
  reliability: 'Zuverlässigkeit',
  
  // Features
  features: 'Funktionen',
  realTimeTranscription: 'Echtzeit-Transkription',
  speakerDiarization: 'Sprecher-Diarisierung',
  automaticSummarization: 'Automatische Zusammenfassung',
  multiLanguageSupport: 'Mehrsprachige Unterstützung',
  secureStorage: 'Sicherer Speicher',
  
  // Plans and Pricing
  plans: 'Pläne',
  pricing: 'Preise',
  freePlan: 'Kostenloser Plan',
  proPlan: 'Pro-Plan',
  enterprisePlan: 'Unternehmens-Plan',
  customPlan: 'Individueller Plan',
  
  // Usage Limits
  usageLimits: 'Nutzungslimits',
  monthlyLimit: 'Monatslimit',
  dailyLimit: 'Tageslimit',
  hourlyLimit: 'Stundenlimit',
  
  // API and Integration
  api: 'API',
  integration: 'Integration',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Dokumentation',
  
  // Compliance
  compliance: 'Compliance',
  certifications: 'Zertifizierungen',
  audits: 'Audits',
  policies: 'Richtlinien',
  
  // Updates and Maintenance
  updates: 'Updates',
  maintenance: 'Wartung',
  changelog: 'Änderungsprotokoll',
  version: 'Version',
  
  // Feedback
  feedback: 'Feedback',
  rating: 'Bewertung',
  review: 'Bewertung',
  suggestion: 'Vorschlag',
  bugReport: 'Fehlerbericht',
  
  // Onboarding
  onboarding: 'Onboarding',
  welcomeTour: 'Willkommenstour',
  gettingStarted: 'Erste Schritte',
  tutorial: 'Tutorial',
  guide: 'Anleitung',
  
  // Empty States
  noData: 'Keine Daten verfügbar',
  noTranscriptions: 'Noch keine Transkriptionen',
  noNotes: 'Noch keine Notizen',
  noAnalytics: 'Noch keine Analysedaten',
  noBillingHistory: 'Noch keine Abrechnungshistorie',
  
  // Loading States
  loadingTranscriptions: 'Transkriptionen werden geladen...',
  loadingNotes: 'Notizen werden geladen...',
  loadingAnalytics: 'Analysedaten werden geladen...',
  loadingBilling: 'Abrechnungsinformationen werden geladen...',
  
  // Validation Messages
  required: 'Dieses Feld ist erforderlich',
  invalidEmail: 'Ungültige E-Mail-Adresse',
  invalidPassword: 'Ungültiges Passwort',
  passwordMismatch: 'Passwörter stimmen nicht überein',
  minLength: 'Mindestlänge ist {min} Zeichen',
  maxLength: 'Maximallänge ist {max} Zeichen',
  
  // Network Status
  online: 'Online',
  offline: 'Offline',
  connecting: 'Verbinde...',
  reconnecting: 'Verbinde erneut...',
  
  // File Operations
  fileUpload: 'Datei-Upload',
  fileDownload: 'Datei-Download',
  fileProcessing: 'Datei-Verarbeitung',
  fileConversion: 'Datei-Konvertierung',
  
  // Audio Controls
  play: 'Abspielen',
  pause: 'Pause',
  stop: 'Stopp',
  volume: 'Lautstärke',
  mute: 'Stummschalten',
  unmute: 'Stummschaltung aufheben',
  
  // Time Display
  seconds: 'Sekunden',
  minutes: 'Minuten',
  hours: 'Stunden',
  days: 'Tage',
  weeks: 'Wochen',
  months: 'Monate',
  years: 'Jahre',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'viele',
  
  // Directions
  up: 'Hoch',
  down: 'Runter',
  left: 'Links',
  right: 'Rechts',
  next: 'Weiter',
  previous: 'Zurück',
  back: 'Zurück',
  forward: 'Vorwärts',
  
  // Sizes
  small: 'Klein',
  medium: 'Mittel',
  large: 'Groß',
  extraLarge: 'Extra Groß',
  
  // Colors
  red: 'Rot',
  green: 'Grün',
  blue: 'Blau',
  yellow: 'Gelb',
  orange: 'Orange',
  purple: 'Lila',
  pink: 'Rosa',
  gray: 'Grau',
  black: 'Schwarz',
  white: 'Weiß',
  
  // Weather and Time
  morning: 'Morgen',
  afternoon: 'Nachmittag',
  evening: 'Abend',
  night: 'Nacht',
  
  // Days of the Week
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
  
  // Months
  january: 'Januar',
  february: 'Februar',
  march: 'März',
  april: 'April',
  may: 'Mai',
  june: 'Juni',
  july: 'Juli',
  august: 'August',
  september: 'September',
  october: 'Oktober',
  november: 'November',
  december: 'Dezember',
  
  // Header and navigation translations
  useCases: 'Anwendungsfälle',
  medicalProfessionals: 'Mediziner',
  therapists: 'Therapeuten',
  lawyers: 'Anwälte',
  businessProfessionals: 'Geschäftsleute',
  education: 'Bildung',
  contentCreators: 'Content Creator',
  researchers: 'Forscher',
  customerSupport: 'Kundenservice',
  login: 'Anmelden',
  getStarted: 'Loslegen',
  getStartedFree: 'Kostenlos starten',
  signIn: 'Anmelden',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Zwei-Faktor-Authentifizierung',
    description: 'Geben Sie Ihren 6-stelligen Authentifizierungscode ein, um auf sensible Daten zuzugreifen',
    required: 'Zwei-Faktor-Authentifizierung erforderlich',
    enterCodeToAccessNotes: 'Geben Sie Ihren 6-stelligen Code ein, um auf Notizen zuzugreifen',
    enterCodeToAccessTranscriptions: 'Geben Sie Ihren 6-stelligen Code ein, um auf Transkriptionen zuzugreifen',
    enterCode: '6-stelligen Code eingeben',
    verifyCode: 'Code überprüfen',
    useBackupCode: 'Oder Backup-Code verwenden',
    enterBackupCode: 'Backup-Code eingeben',
    getCodeFromApp: 'Holen Sie Ihren Code aus Google Authenticator, Authy oder Ihrer bevorzugten 2FA-App',
    setupLink: '2FA einrichten müssen? Gehen Sie zu Einstellungen',
    step1Title: 'Schritt 1: QR-Code scannen',
    step1Description: 'Öffnen Sie Ihre Authenticator-App und scannen Sie diesen QR-Code, um Ihr Konto hinzuzufügen',
    enterManually: 'Oder manuell eingeben',
    codeAdded: 'Ich habe den Code hinzugefügt',
    cancel: 'Abbrechen',
    step2Title: 'Schritt 2: Backup-Codes speichern',
    step2Description: 'Speichern Sie diese Backup-Codes an einem sicheren Ort. Sie können sie verwenden, um auf Ihr Konto zuzugreifen, wenn Sie Ihr 2FA-Gerät verlieren.',
    backupCodes: 'Backup-Codes',
    completeSetup: 'Einrichtung abschließen',
    back: 'Zurück',
    setupDataError: 'Fehler beim Generieren der 2FA-Einrichtungsdaten',
    tooManyAttempts: 'Zu viele fehlgeschlagene Versuche. Bitte warten Sie',
    minutesWait: 'Minuten.',
    enter6DigitCode: 'Bitte geben Sie einen 6-stelligen Code ein',
    verificationSuccessful: '2FA-Verifizierung erfolgreich',
    invalidCode: 'Ungültiger Code.',
    attemptsRemaining: 'Versuche verbleibend.',
    verificationFailed: 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    backupVerificationSuccessful: 'Backup-Code-Verifizierung erfolgreich',
    invalidBackupCode: 'Ungültiger Backup-Code',
    backupVerificationFailed: 'Backup-Code-Verifizierung fehlgeschlagen',
    copiedToClipboard: 'In Zwischenablage kopiert',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Transkriptionen konnten nicht geladen werden',
  transcriptionCopiedToClipboard: 'Transkription in die Zwischenablage kopiert',
  failedToCopyToClipboard: 'Kopieren in die Zwischenablage fehlgeschlagen',
  transcriptionDownloaded: 'Transkription heruntergeladen als',
  failedToDownloadTranscription: 'Herunterladen der Transkription fehlgeschlagen',
  noContentAvailable: 'Kein Inhalt verfügbar',
  failedToSwitchMicrophone: 'Mikrofonwechsel fehlgeschlagen. Bitte versuchen Sie es erneut.',
  failedToLoadNotes: 'Notizen konnten nicht geladen werden',
} as const 