export default {
  // Dashboard Navigation
  dashboard: 'Dashboard',
  transcriptions: 'Transcriptions',
  notes: 'Notes',
  analytics: 'Analytics',
  billing: 'Billing',
  credits: 'Credits',
  account: 'Account',
  enterprise: 'Enterprise',
  
  // Dashboard Recording
  audioRecording: 'Audio Recording',
  recordAudioForTranscription: 'Record audio for transcription',
  recordingInProgress: 'Recording in progress...',
  deviceAudio: 'Device Audio',
  microphone: 'Microphone',
  noNotesGeneratedYet: 'No notes generated yet.',
  noTranscriptionGeneratedYet: 'No transcription generated yet.',
  noSummaryGeneratedYet: 'No summary generated yet.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Audio Transcription',
  transcriptionHistory: 'Transcription History',
  notesHistory: 'Notes History',
  topUpCredits: 'Top Up Credits',
  tools: 'Tools',
  dataSafety: 'Data Safety',
  downloadOptions: 'Download Options',
  configureStorage: 'Configure Storage',
  
  // Sidebar and UI
  toggleTheme: 'Toggle theme',
  notesMode: 'Notes Mode',
  transcriptionMode: 'Transcription Mode',
  switchToTranscriptionMode: 'Switch to Transcription Mode: Display as conversation with speaker labels',
  switchToNotesMode: 'Switch to Notes Mode: Display as continuous text for note-taking',
  moreThanTwoSpeakersTooltip: 'Enable this if your audio contains more than two speakers. This helps improve speaker diarization accuracy by preventing the system from mistakenly adding extra speakers due to background noise or brief sound discrepancies.',
  recordDeviceAudioTooltip: 'Enable this to record system audio (music, videos, calls) in addition to microphone input. This allows you to capture both your voice and the audio playing on your device.',
  
  // Dashboard Main Page
  welcome: 'Welcome back',
  startRecording: 'Start Recording',
  stopRecording: 'Stop Recording',
  recording: 'Recording...',
  processing: 'Processing...',
  generatingSummary: 'Generating Summary...',
  generatingPDF: 'Generating PDF...',
  
  // Recording Controls
  selectMicrophone: 'Select Microphone',
  defaultMicrophone: 'Default Microphone',
  recordingDuration: 'Recording Duration',
  recordingStatus: 'Recording Status',
  
  // Transcription
  transcription: 'Transcription',
  noTranscription: 'No transcription available',
  copyTranscription: 'Copy Transcription',
  downloadTranscription: 'Download Transcription',
  clearTranscription: 'Clear Transcription',
  transcriptionCopied: 'Transcription copied to clipboard',
  
  // Summary
  summary: 'Summary',
  generateSummary: 'Generate Summary',
  noSummary: 'No summary available',
  summaryGenerated: 'Summary generated successfully',
  downloadPDF: 'Download PDF',
  
  // Notes
  addNote: 'Add Note',
  editNote: 'Edit Note',
  deleteNote: 'Delete Note',
  saveNote: 'Save Note',
  noteSaved: 'Note saved successfully',
  noteDeleted: 'Note deleted successfully',
  notesWillAppearHere: 'Notes will appear here',
  transcriptionWillAppearHere: 'Transcription will appear here',
  
  // Credits
  availableCredits: 'Available Credits',
  creditsUsed: 'Credits Used',
  buyCredits: 'Buy Credits',
  creditHistory: 'Credit History',
  insufficientCredits: 'Insufficient credits',
  
  // Settings
  settings: {
    title: 'Settings',
    subtitle: 'Configure your transcription and application preferences',
    aiFeatures: 'AI Features',
    aiFeaturesDescription: 'Configure AI-powered transcription features',
    autoSummarize: 'Auto Summarize',
    autoSummarizeDescription: 'Automatically generate summaries',
    moreThanTwoSpeakers: 'More than Two Speakers',
    moreThanTwoSpeakersDescription: 'Enhanced speaker detection',
    recordDeviceAudio: 'Record Device Audio',
    recordDeviceAudioDescription: 'Capture system audio',
    dataSafety: 'Data Safety',
    dataSafetyDescription: 'Control how your data is stored and processed',
    saveTranscripts: 'Save Transcripts',
    saveTranscriptsDescription: 'Store transcripts securely',
    saveAudioToStorage: 'Save Audio to Storage',
    saveAudioToStorageDescription: 'Store audio files securely',
    autoDownloadRecordings: 'Auto Download Recordings',
    autoDownloadRecordingsDescription: 'Save recordings to device automatically after finishing',
    autoDownloadTranscripts: 'Auto Download Transcripts',
    autoDownloadTranscriptsDescription: 'Save transcripts to device automatically after finishing recording and transcription',
    twoFactorAuth: 'Two-Factor Authentication',
    twoFactorAuthDescription: 'Secure your account with 2FA',
    '2faStatus': '2FA Status',
    enabled: 'Enabled',
    notSetUp: 'Not set up',
    active: 'Active',
    inactive: 'Inactive',
    '2faActive': '2FA is Active',
    '2faActiveDescription': 'Your account is protected with two-factor authentication.',
    '2faNotSetUp': '2FA Not Set Up',
    '2faNotSetUpDescription': 'Enable two-factor authentication for enhanced security.',
    manage2FA: 'Manage 2FA',
    setUp2FA: 'Set Up 2FA',
    privacyInformation: 'Privacy Information',
    privacyInformationDescription: 'Learn about our privacy practices',
    endToEndEncryption: 'End-to-End Encryption',
    endToEndEncryptionDescription: 'All your data is encrypted with AES-256 encryption and never stored in plain text.',
    gdprHipaaCompliant: 'GDPR & HIPAA Compliant',
    gdprHipaaCompliantDescription: 'Our platform meets the highest standards for data protection and privacy.',
    viewDocumentation: 'View Documentation',
    enterpriseAccess: 'Enterprise Access',
    enterpriseAccessDescription: 'Upgrade to enterprise for advanced features',
    enterpriseFeatures: 'Enterprise Features',
    enterpriseFeaturesDescription: 'Configure enterprise-specific settings',
    storageConfiguration: 'Storage Configuration',
    storageConfigurationDescription: 'Configure your own S3-compatible storage for complete data sovereignty.',
    configureStorage: 'Configure Storage',
    teamManagement: 'Team Management',
    teamManagementDescription: 'Manage your enterprise team and permissions',
    userManagement: 'User Management',
    userManagementDescription: 'Add, remove, and manage team members with role-based access control.',
    manageUsers: 'Manage Users',
    customS3Storage: 'Custom S3 storage configuration',
    teamManagementRoles: 'Team management and user roles',
    advancedAnalytics: 'Advanced analytics and reporting',
    prioritySupport: 'Priority support and SLA',
    customIntegrations: 'Custom integrations and API access',
    contactSales: 'Contact Sales',
  },
  
  // Analytics
  transcriptionStats: 'Transcription Statistics',
  usageStats: 'Usage Statistics',
  monthlyUsage: 'Monthly Usage',
  totalTranscriptions: 'Total Transcriptions',
  totalNotes: 'Total Notes',
  
  // Billing
  currentPlan: 'Current Plan',
  upgradePlan: 'Upgrade Plan',
  billingHistory: 'Billing History',
  paymentMethod: 'Payment Method',
  
  // Account
  profile: 'Profile',
  security: 'Security',
  preferences: 'Preferences',
  logout: 'Logout',
  
  // Enterprise
  teamManagement: 'Team Management',
  adminPanel: 'Admin Panel',
  userManagement: 'User Management',
  
  // Common Actions
  save: 'Save',
  cancel: 'Cancel',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  remove: 'Remove',
  download: 'Download',
  upload: 'Upload',
  search: 'Search',
  filter: 'Filter',
  sort: 'Sort',
  
  // Status Messages
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Information',
  
  // Time and Date
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  lastMonth: 'Last Month',
  
  // File Types
  audio: 'Audio',
  video: 'Video',
  document: 'Document',
  image: 'Image',
  
  // Languages
  language: 'Language',
  english: 'English',
  spanish: 'Spanish',
  german: 'German',
  french: 'French',
  russian: 'Russian',
  ukrainian: 'Ukrainian',
  lithuanian: 'Lithuanian',
  polish: 'Polish',
  
  // Error Messages
  errorOccurred: 'An error occurred',
  tryAgain: 'Please try again',
  networkError: 'Network error',
  permissionDenied: 'Permission denied',
  fileTooLarge: 'File too large',
  invalidFormat: 'Invalid format',
  
  // Success Messages
  savedSuccessfully: 'Saved successfully',
  deletedSuccessfully: 'Deleted successfully',
  uploadedSuccessfully: 'Uploaded successfully',
  downloadedSuccessfully: 'Downloaded successfully',
  
  // Confirmation Dialogs
  confirmDelete: 'Are you sure you want to delete this?',
  confirmLogout: 'Are you sure you want to logout?',
  confirmClear: 'Are you sure you want to clear this?',
  
  // Placeholders
  searchPlaceholder: 'Search...',
  notePlaceholder: 'Write your note here...',
  transcriptionPlaceholder: 'Transcription will appear here...',
  
  // Tooltips
  startRecordingTooltip: 'Start recording audio',
  stopRecordingTooltip: 'Stop recording audio',
  copyTooltip: 'Copy to clipboard',
  downloadTooltip: 'Download file',
  deleteTooltip: 'Delete item',
  editTooltip: 'Edit item',
  
  // Accessibility
  ariaStartRecording: 'Start recording button',
  ariaStopRecording: 'Stop recording button',
  ariaCopyTranscription: 'Copy transcription button',
  ariaDownloadTranscription: 'Download transcription button',
  ariaClearTranscription: 'Clear transcription button',
  
  // Cost and Pricing
  estimatedCost: 'Estimated Cost',
  actualCost: 'Actual Cost',
  costPerMinute: 'Cost per minute',
  totalCost: 'Total Cost',
  
  // Audio Processing
  audioProcessing: 'Audio Processing',
  processingAudio: 'Processing audio...',
  audioProcessed: 'Audio processed successfully',
  processingFailed: 'Processing failed',
  
  // Speaker Recognition
  speakerRecognition: 'Speaker Recognition',
  speaker1: 'Speaker 1',
  speaker2: 'Speaker 2',
  speaker3: 'Speaker 3',
  speaker4: 'Speaker 4',
  unknownSpeaker: 'Unknown Speaker',
  
  // Quality Settings
  qualitySettings: 'Quality Settings',
  highQuality: 'High Quality',
  mediumQuality: 'Medium Quality',
  lowQuality: 'Low Quality',
  
  // Export Options
  exportOptions: 'Export Options',
  exportAsPDF: 'Export as PDF',
  exportAsTXT: 'Export as TXT',
  exportAsSRT: 'Export as SRT',
  exportAsVTT: 'Export as VTT',
  
  // Privacy and Security
  privacy: 'Privacy',
  securitySettings: 'Security',
  encryption: 'Encryption',
  dataProtection: 'Data Protection',
  gdprCompliant: 'GDPR Compliant',
  hipaaCompliant: 'HIPAA Compliant',
  
  // Support
  support: 'Support',
  help: 'Help',
  documentation: 'Documentation',
  contactSupport: 'Contact Support',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Notifications',
  notificationSettings: 'Notification Settings',
  emailNotifications: 'Email Notifications',
  pushNotifications: 'Push Notifications',
  
  // Theme
  theme: 'Theme',
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',
  systemTheme: 'System Theme',
  
  // User Interface
  sidebar: 'Sidebar',
  mainContent: 'Main Content',
  header: 'Header',
  footer: 'Footer',
  navigation: 'Navigation',
  
  // Data Management
  dataManagement: 'Data Management',
  backup: 'Backup',
  restore: 'Restore',
  sync: 'Sync',
  import: 'Import',
  export: 'Export',
  
  // Performance
  performance: 'Performance',
  speed: 'Speed',
  accuracy: 'Accuracy',
  reliability: 'Reliability',
  
  // Features
  features: 'Features',
  realTimeTranscription: 'Real-time Transcription',
  speakerDiarization: 'Speaker Diarization',
  automaticSummarization: 'Automatic Summarization',
  multiLanguageSupport: 'Multi-language Support',
  secureStorage: 'Secure Storage',
  
  // Plans and Pricing
  plans: 'Plans',
  pricing: 'Pricing',
  freePlan: 'Free Plan',
  proPlan: 'Pro Plan',
  enterprisePlan: 'Enterprise Plan',
  customPlan: 'Custom Plan',
  
  // Usage Limits
  usageLimits: 'Usage Limits',
  monthlyLimit: 'Monthly Limit',
  dailyLimit: 'Daily Limit',
  hourlyLimit: 'Hourly Limit',
  
  // API and Integration
  api: 'API',
  integration: 'Integration',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Documentation',
  
  // Compliance
  compliance: 'Compliance',
  certifications: 'Certifications',
  audits: 'Audits',
  policies: 'Policies',
  
  // Updates and Maintenance
  updates: 'Updates',
  maintenance: 'Maintenance',
  changelog: 'Changelog',
  version: 'Version',
  
  // Feedback
  feedback: 'Feedback',
  rating: 'Rating',
  review: 'Review',
  suggestion: 'Suggestion',
  bugReport: 'Bug Report',
  
  // Onboarding
  onboarding: 'Onboarding',
  welcomeTour: 'Welcome Tour',
  gettingStarted: 'Getting Started',
  tutorial: 'Tutorial',
  guide: 'Guide',
  
  // Empty States
  noData: 'No data available',
  noTranscriptions: 'No transcriptions yet',
  noNotes: 'No notes yet',
  noAnalytics: 'No analytics data yet',
  noBillingHistory: 'No billing history yet',
  
  // Loading States
  loadingTranscriptions: 'Loading transcriptions...',
  loadingNotes: 'Loading notes...',
  loadingAnalytics: 'Loading analytics...',
  loadingBilling: 'Loading billing information...',
  
  // Validation Messages
  required: 'This field is required',
  invalidEmail: 'Invalid email address',
  invalidPassword: 'Invalid password',
  passwordMismatch: 'Passwords do not match',
  minLength: 'Minimum length is {min} characters',
  maxLength: 'Maximum length is {max} characters',
  
  // Network Status
  online: 'Online',
  offline: 'Offline',
  connecting: 'Connecting...',
  reconnecting: 'Reconnecting...',
  
  // File Operations
  fileUpload: 'File Upload',
  fileDownload: 'File Download',
  fileProcessing: 'File Processing',
  fileConversion: 'File Conversion',
  
  // Audio Controls
  play: 'Play',
  pause: 'Pause',
  stop: 'Stop',
  volume: 'Volume',
  mute: 'Mute',
  unmute: 'Unmute',
  
  // Time Display
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
  days: 'days',
  weeks: 'weeks',
  months: 'months',
  years: 'years',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'many',
  
  // Directions
  up: 'Up',
  down: 'Down',
  left: 'Left',
  right: 'Right',
  next: 'Next',
  previous: 'Previous',
  back: 'Back',
  forward: 'Forward',
  
  // Sizes
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  extraLarge: 'Extra Large',
  
  // Colors
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
  yellow: 'Yellow',
  orange: 'Orange',
  purple: 'Purple',
  pink: 'Pink',
  gray: 'Gray',
  black: 'Black',
  white: 'White',
  
  // Weather and Time
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
  
  // Days of the Week
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
  
  // Months
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
  
  // Header and navigation translations
  useCases: 'Use Cases',
  medicalProfessionals: 'Medical Professionals',
  therapists: 'Therapists',
  lawyers: 'Lawyers',
  businessProfessionals: 'Business Professionals',
  education: 'Education',
  contentCreators: 'Content Creators',
  researchers: 'Researchers',
  customerSupport: 'Customer Support',
  login: 'Login',
  getStarted: 'Get Started',
  getStartedFree: 'Get Started Free',
  signIn: 'Sign In',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Two-Factor Authentication',
    description: 'Enter your 6-digit authentication code to access sensitive data',
    required: 'Two-Factor Authentication Required',
    enterCodeToAccessNotes: 'Enter your 6-digit code to access notes',
    enterCodeToAccessTranscriptions: 'Enter your 6-digit code to access transcriptions',
    enterCode: 'Enter 6-digit code',
    verifyCode: 'Verify Code',
    useBackupCode: 'Or use backup code',
    enterBackupCode: 'Enter backup code',
    getCodeFromApp: 'Get your code from Google Authenticator, Authy, or your preferred 2FA app',
    setupLink: 'Need to set up 2FA? Go to Settings',
    step1Title: 'Step 1: Scan QR Code',
    step1Description: 'Open your authenticator app and scan this QR code to add your account',
    enterManually: 'Or enter manually',
    codeAdded: 'I\'ve Added the Code',
    cancel: 'Cancel',
    step2Title: 'Step 2: Save Backup Codes',
    step2Description: 'Save these backup codes in a secure location. You can use them to access your account if you lose your 2FA device.',
    backupCodes: 'Backup Codes',
    completeSetup: 'Complete Setup',
    back: 'Back',
    setupDataError: 'Failed to generate 2FA setup data',
    tooManyAttempts: 'Too many failed attempts. Please wait',
    minutesWait: 'minutes.',
    enter6DigitCode: 'Please enter a 6-digit code',
    verificationSuccessful: '2FA verification successful',
    invalidCode: 'Invalid code.',
    attemptsRemaining: 'attempts remaining.',
    verificationFailed: 'Verification failed. Please try again.',
    backupVerificationSuccessful: 'Backup code verification successful',
    invalidBackupCode: 'Invalid backup code',
    backupVerificationFailed: 'Backup code verification failed',
    copiedToClipboard: 'Copied to clipboard',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Failed to load transcriptions',
  transcriptionCopiedToClipboard: 'Transcription copied to clipboard',
  failedToCopyToClipboard: 'Failed to copy to clipboard',
  transcriptionDownloaded: 'Transcription downloaded as',
  failedToDownloadTranscription: 'Failed to download transcription',
  noContentAvailable: 'No content available',
  failedToSwitchMicrophone: 'Failed to switch microphone. Please try again.',
  failedToLoadNotes: 'Failed to load notes',
} as const 