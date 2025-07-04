export default {
  // Dashboard Navigation
  dashboard: 'Valdymo skydelis',
  transcriptions: 'Transkripcijos',
  notes: 'Pastabos',
  analytics: 'Analitika',
  billing: 'Atsiskaitymas',
  credits: 'Kreditai',
  account: 'Paskyra',
  enterprise: 'Įmonė',
  
  // Dashboard Recording
  audioRecording: 'Garso įrašymas',
  recordAudioForTranscription: 'Įrašyti garsą transkripcijai',
  recordingInProgress: 'Įrašymas vyksta...',
  deviceAudio: 'Įrenginio garsas',
  microphone: 'Mikrofonas',
  noNotesGeneratedYet: 'Pastabos dar nesukurta.',
  noTranscriptionGeneratedYet: 'Transkripcija dar nesukurta.',
  noSummaryGeneratedYet: 'Santrauka dar nesukurta.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Garso transkripcija',
  transcriptionHistory: 'Transkripcijų istorija',
  notesHistory: 'Pastabų istorija',
  topUpCredits: 'Papildyti kreditus',
  tools: 'Įrankiai',
  dataSafety: 'Duomenų saugumas',
  downloadOptions: 'Atsisiuntimo parinktys',
  configureStorage: 'Konfigūruoti saugyklą',
  
  // Sidebar and UI
  toggleTheme: 'Perjungti temą',
  notesMode: 'Pastabų režimas',
  transcriptionMode: 'Transkripcijos režimas',
  switchToTranscriptionMode: 'Perjungti į transkripcijos režimą: rodyti kaip pokalbį su kalbėtojų žymėmis',
  switchToNotesMode: 'Perjungti į pastabų režimą: rodyti kaip ištisinį tekstą pastabų rašymui',
  moreThanTwoSpeakersTooltip: 'Įjunkite tai, jei jūsų garso įrašas turi daugiau nei du kalbėtojus. Tai padeda pagerinti kalbėtojų diarizacijos tikslumą, neleidžiant sistemai klaidingai pridėti papildomų kalbėtojų dėl fono triukšmo ar trumpalaikių garso neatitikimų.',
  recordDeviceAudioTooltip: 'Įjunkite tai, kad įrašytumėte sistemos garsą (muzika, vaizdo įrašai, skambučiai) be mikrofono įvesties. Tai leidžia fiksuoti tiek jūsų balsą, tiek garsą, grojantį jūsų įrenginyje.',
  
  // Dashboard Main Page
  welcome: 'Sveiki sugrįžę',
  startRecording: 'Pradėti įrašymą',
  stopRecording: 'Sustabdyti įrašymą',
  recording: 'Įrašoma...',
  processing: 'Apdorojama...',
  generatingSummary: 'Generuojama santrauka...',
  generatingPDF: 'Generuojamas PDF...',
  
  // Recording Controls
  selectMicrophone: 'Pasirinkti mikrofoną',
  defaultMicrophone: 'Numatytasis mikrofonas',
  recordingDuration: 'Įrašymo trukmė',
  recordingStatus: 'Įrašymo būsena',
  
  // Transcription
  transcription: 'Transkripcija',
  noTranscription: 'Transkripcija neprieinama',
  copyTranscription: 'Kopijuoti transkripciją',
  downloadTranscription: 'Atsisiųsti transkripciją',
  clearTranscription: 'Išvalyti transkripciją',
  transcriptionCopied: 'Transkripcija nukopijuota į iškarpinę',
  
  // Summary
  summary: 'Santrauka',
  generateSummary: 'Generuoti santrauką',
  noSummary: 'Santrauka neprieinama',
  summaryGenerated: 'Santrauka sėkmingai sugeneruota',
  downloadPDF: 'Atsisiųsti PDF',
  
  // Notes
  addNote: 'Pridėti pastabą',
  editNote: 'Redaguoti pastabą',
  deleteNote: 'Ištrinti pastabą',
  saveNote: 'Išsaugoti pastabą',
  noteSaved: 'Pastaba sėkmingai išsaugota',
  noteDeleted: 'Pastaba sėkmingai ištrinta',
  notesWillAppearHere: 'Pastabos pasirodys čia',
  transcriptionWillAppearHere: 'Transkripcija pasirodys čia',
  
  // Credits
  availableCredits: 'Prieinami kreditai',
  creditsUsed: 'Naudoti kreditai',
  buyCredits: 'Pirkti kreditus',
  creditHistory: 'Kreditų istorija',
  insufficientCredits: 'Nepakanka kreditų',
  
  // Settings
  settings: {
    title: 'Nustatymai',
    subtitle: 'Konfigūruokite savo transkripcijos ir programos nustatymus',
    aiFeatures: 'AI funkcijos',
    aiFeaturesDescription: 'Konfigūruoti AI pagrįstas transkripcijos funkcijas',
    autoSummarize: 'Automatiškai generuoti santraukas',
    autoSummarizeDescription: 'Automatiškai generuoti santraukas',
    moreThanTwoSpeakers: 'Daugiau nei du kalbėtojai',
    moreThanTwoSpeakersDescription: 'Patobulinta kalbėtojų atpažinimas',
    recordDeviceAudio: 'Įrašyti įrenginio garsą',
    recordDeviceAudioDescription: 'Fiksuoti sistemos garsą',
    dataSafety: 'Duomenų saugumas',
    dataSafetyDescription: 'Kontroliuokite, kaip jūsų duomenys saugomi ir apdorojami',
    saveTranscripts: 'Išsaugoti transkripcijas',
    saveTranscriptsDescription: 'Saugiai saugoti transkripcijas',
    saveAudioToStorage: 'Išsaugoti garsą saugykloje',
    saveAudioToStorageDescription: 'Saugiai saugoti garso failus',
    autoDownloadRecordings: 'Automatiškai atsisiųsti įrašus',
    autoDownloadRecordingsDescription: 'Automatiškai išsaugoti įrašus įrenginyje baigus įrašymą',
    autoDownloadTranscripts: 'Automatiškai atsisiųsti transkripcijas',
    autoDownloadTranscriptsDescription: 'Automatiškai išsaugoti transkripcijas įrenginyje baigus įrašymą ir transkripciją',
    twoFactorAuth: 'Dviejų faktorių autentifikacija',
    twoFactorAuthDescription: 'Apsaugokite savo paskyrą su 2FA',
    '2faStatus': '2FA būsena',
    enabled: 'Įjungta',
    notSetUp: 'Nenustatyta',
    active: 'Aktyvu',
    inactive: 'Neaktyvu',
    '2faActive': '2FA aktyvu',
    '2faActiveDescription': 'Jūsų paskyra apsaugota dviejų faktorių autentifikacija.',
    '2faNotSetUp': '2FA nesukonfigūruota',
    '2faNotSetUpDescription': 'Įjunkite dviejų faktorių autentifikaciją, kad padidintumėte saugumą.',
    manage2FA: 'Valdyti 2FA',
    setUp2FA: 'Nustatyti 2FA',
    privacyInformation: 'Privatumo informacija',
    privacyInformationDescription: 'Sužinokite apie mūsų privatumo praktikas',
    endToEndEncryption: 'Galas iki galo šifravimas',
    endToEndEncryptionDescription: 'Visi jūsų duomenys yra užšifruoti AES-256 šifravimu ir niekada nesaugomi atvirai.',
    gdprHipaaCompliant: 'Atitinka GDPR ir HIPAA',
    gdprHipaaCompliantDescription: 'Mūsų platforma atitinka aukščiausius duomenų apsaugos ir privatumo standartus.',
    viewDocumentation: 'Peržiūrėti dokumentaciją',
    enterpriseAccess: 'Verslo prieiga',
    enterpriseAccessDescription: 'Atnaujinkite į verslo versiją, kad gautumėte išplėstines funkcijas',
    enterpriseFeatures: 'Verslo funkcijos',
    enterpriseFeaturesDescription: 'Konfigūruoti verslo specifinius nustatymus',
    storageConfiguration: 'Saugyklos konfigūracija',
    storageConfigurationDescription: 'Konfigūruokite savo S3 suderinamą saugyklą, kad gautumėte visišką duomenų suverenitetą.',
    configureStorage: 'Konfigūruoti saugyklą',
    teamManagement: 'Komandos valdymas',
    teamManagementDescription: 'Valdykite savo verslo komandą ir leidimus',
    userManagement: 'Vartotojų valdymas',
    userManagementDescription: 'Pridėkite, pašalinkite ir valdykite komandos narius su rolės pagrindu paremtu prieigos kontroliu.',
    manageUsers: 'Valdyti vartotojus',
    customS3Storage: 'Pasirinktinė S3 saugyklos konfigūracija',
    teamManagementRoles: 'Komandos valdymas ir vartotojų rolės',
    advancedAnalytics: 'Išplėstinė analitika ir ataskaitos',
    prioritySupport: 'Prioritetinė pagalba ir SLA',
    customIntegrations: 'Pasirinktinės integracijos ir API prieiga',
    contactSales: 'Susisiekti su pardavimais',
  },
  
  // Analytics
  transcriptionStats: 'Transkripcijų statistika',
  usageStats: 'Naudojimo statistika',
  monthlyUsage: 'Mėnesinis naudojimas',
  totalTranscriptions: 'Iš viso transkripcijų',
  totalNotes: 'Iš viso pastabų',
  
  // Billing
  currentPlan: 'Dabartinis planas',
  upgradePlan: 'Atnaujinti planą',
  billingHistory: 'Atsiskaitymo istorija',
  paymentMethod: 'Mokėjimo būdas',
  
  // Account
  profile: 'Profilis',
  security: 'Saugumas',
  preferences: 'Nustatymai',
  logout: 'Atsijungti',
  
  // Enterprise
  teamManagement: 'Komandos valdymas',
  adminPanel: 'Administratoriaus skydelis',
  userManagement: 'Vartotojų valdymas',
  
  // Common Actions
  save: 'Išsaugoti',
  cancel: 'Atšaukti',
  delete: 'Ištrinti',
  edit: 'Redaguoti',
  add: 'Pridėti',
  remove: 'Pašalinti',
  download: 'Atsisiųsti',
  upload: 'Įkelti',
  search: 'Ieškoti',
  filter: 'Filtruoti',
  sort: 'Rūšiuoti',
  clear: 'Išvalyti',
  
  // Status Messages
  loading: 'Kraunama...',
  error: 'Klaida',
  success: 'Sėkmė',
  warning: 'Įspėjimas',
  info: 'Informacija',
  
  // Time and Date
  today: 'Šiandien',
  yesterday: 'Vakar',
  thisWeek: 'Šią savaitę',
  thisMonth: 'Šį mėnesį',
  lastMonth: 'Praėjusį mėnesį',
  
  // File Types
  audio: 'Garsas',
  video: 'Vaizdo įrašas',
  document: 'Dokumentas',
  image: 'Paveikslėlis',
  
  // Languages
  language: 'Kalba',
  english: 'Anglų',
  spanish: 'Ispanų',
  german: 'Vokiečių',
  french: 'Prancūzų',
  russian: 'Rusų',
  ukrainian: 'Ukrainiečių',
  lithuanian: 'Lietuvių',
  polish: 'Lenkų',
  
  // Error Messages
  errorOccurred: 'Įvyko klaida',
  tryAgain: 'Bandykite dar kartą',
  networkError: 'Tinklo klaida',
  permissionDenied: 'Leidimas atmestas',
  fileTooLarge: 'Failas per didelis',
  invalidFormat: 'Netinkamas formatas',
  
  // Success Messages
  savedSuccessfully: 'Sėkmingai išsaugota',
  deletedSuccessfully: 'Sėkmingai ištrinta',
  uploadedSuccessfully: 'Sėkmingai įkelta',
  downloadedSuccessfully: 'Sėkmingai atsisiųsta',
  
  // Confirmation Dialogs
  confirmDelete: 'Ar tikrai norite tai ištrinti?',
  confirmLogout: 'Ar tikrai norite atsijungti?',
  confirmClear: 'Ar tikrai norite tai išvalyti?',
  
  // Placeholders
  searchPlaceholder: 'Ieškoti...',
  notePlaceholder: 'Parašykite savo pastabą čia...',
  transcriptionPlaceholder: 'Transkripcija pasirodys čia...',
  
  // Tooltips
  startRecordingTooltip: 'Pradėti garso įrašymą',
  stopRecordingTooltip: 'Sustabdyti garso įrašymą',
  copyTooltip: 'Kopijuoti į iškarpinę',
  downloadTooltip: 'Atsisiųsti failą',
  deleteTooltip: 'Ištrinti elementą',
  editTooltip: 'Redaguoti elementą',
  
  // Accessibility
  ariaStartRecording: 'Įrašymo pradžios mygtukas',
  ariaStopRecording: 'Įrašymo sustabdymo mygtukas',
  ariaCopyTranscription: 'Transkripcijos kopijavimo mygtukas',
  ariaDownloadTranscription: 'Transkripcijos atsisiuntimo mygtukas',
  ariaClearTranscription: 'Transkripcijos išvalymo mygtukas',
  
  // Cost and Pricing
  estimatedCost: 'Numatoma kaina',
  actualCost: 'Faktinė kaina',
  costPerMinute: 'Kaina per minutę',
  totalCost: 'Bendra kaina',
  
  // Audio Processing
  audioProcessing: 'Garso apdorojimas',
  processingAudio: 'Apdorojamas garsas...',
  audioProcessed: 'Garsas sėkmingai apdorotas',
  processingFailed: 'Apdorojimas nepavyko',
  
  // Speaker Recognition
  speakerRecognition: 'Kalbėtojų atpažinimas',
  speaker1: 'Kalbėtojas 1',
  speaker2: 'Kalbėtojas 2',
  speaker3: 'Kalbėtojas 3',
  speaker4: 'Kalbėtojas 4',
  unknownSpeaker: 'Nežinomas kalbėtojas',
  
  // Quality Settings
  qualitySettings: 'Kokybės nustatymai',
  highQuality: 'Aukšta kokybė',
  mediumQuality: 'Vidutinė kokybė',
  lowQuality: 'Žema kokybė',
  
  // Export Options
  exportOptions: 'Eksportavimo parinktys',
  exportAsPDF: 'Eksportuoti kaip PDF',
  exportAsTXT: 'Eksportuoti kaip TXT',
  exportAsSRT: 'Eksportuoti kaip SRT',
  exportAsVTT: 'Eksportuoti kaip VTT',
  
  // Privacy and Security
  privacy: 'Privatumas',
  securitySettings: 'Saugumas',
  encryption: 'Šifravimas',
  dataProtection: 'Duomenų apsauga',
  gdprCompliant: 'Atitinka GDPR',
  hipaaCompliant: 'Atitinka HIPAA',
  
  // Support
  support: 'Palaikymas',
  help: 'Pagalba',
  documentation: 'Dokumentacija',
  contactSupport: 'Susisiekti su palaikymu',
  faq: 'DUK',
  
  // Notifications
  notifications: 'Pranešimai',
  notificationSettings: 'Pranešimų nustatymai',
  emailNotifications: 'El. pašto pranešimai',
  pushNotifications: 'Push pranešimai',
  
  // Theme
  theme: 'Tema',
  lightMode: 'Šviesus režimas',
  darkMode: 'Tamsus režimas',
  systemTheme: 'Sistemos tema',
  
  // User Interface
  sidebar: 'Šoninis skydelis',
  mainContent: 'Pagrindinis turinys',
  header: 'Antraštė',
  footer: 'Poraštė',
  navigation: 'Navigacija',
  
  // Data Management
  dataManagement: 'Duomenų valdymas',
  backup: 'Atsarginė kopija',
  restore: 'Atkurti',
  sync: 'Sinchronizuoti',
  import: 'Importuoti',
  export: 'Eksportuoti',
  
  // Performance
  performance: 'Veikimas',
  speed: 'Greitis',
  accuracy: 'Tikslumas',
  reliability: 'Patikimumas',
  
  // Features
  features: 'Funkcijos',
  realTimeTranscription: 'Realaus laiko transkripcija',
  speakerDiarization: 'Kalbėtojų diarizacija',
  automaticSummarization: 'Automatinis santraukų generavimas',
  multiLanguageSupport: 'Daugiakalbė palaikymas',
  secureStorage: 'Saugi saugykla',
  
  // Plans and Pricing
  plans: 'Planai',
  pricing: 'Kainos',
  freePlan: 'Nemokamas planas',
  proPlan: 'Pro planas',
  enterprisePlan: 'Įmonės planas',
  customPlan: 'Individualus planas',
  
  // Usage Limits
  usageLimits: 'Naudojimo limitai',
  monthlyLimit: 'Mėnesinis limitas',
  dailyLimit: 'Dienos limitas',
  hourlyLimit: 'Valandos limitas',
  
  // API and Integration
  api: 'API',
  integration: 'Integracija',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Dokumentacija',
  
  // Compliance
  compliance: 'Atitiktis',
  certifications: 'Sertifikatai',
  audits: 'Auditas',
  policies: 'Politika',
  
  // Updates and Maintenance
  updates: 'Atnaujinimai',
  maintenance: 'Priežiūra',
  changelog: 'Pakeitimų žurnalas',
  version: 'Versija',
  
  // Feedback
  feedback: 'Atsiliepimas',
  rating: 'Įvertinimas',
  review: 'Atsiliepimas',
  suggestion: 'Pasiūlymas',
  bugReport: 'Klaidos pranešimas',
  
  // Onboarding
  onboarding: 'Pradžia',
  welcomeTour: 'Sveikinimo turas',
  gettingStarted: 'Pradėti',
  tutorial: 'Mokymasis',
  guide: 'Vadovas',
  
  // Empty States
  noData: 'Duomenų nėra',
  noTranscriptions: 'Transkripcijų dar nėra',
  noNotes: 'Pastabų dar nėra',
  noAnalytics: 'Analitikos duomenų dar nėra',
  noBillingHistory: 'Atsiskaitymo istorijos dar nėra',
  
  // Loading States
  loadingTranscriptions: 'Kraunamos transkripcijos...',
  loadingNotes: 'Kraunamos pastabos...',
  loadingAnalytics: 'Kraunama analitika...',
  loadingBilling: 'Kraunama atsiskaitymo informacija...',
  
  // Validation Messages
  required: 'Šis laukas yra privalomas',
  invalidEmail: 'Netinkamas el. pašto adresas',
  invalidPassword: 'Netinkamas slaptažodis',
  passwordMismatch: 'Slaptažodžiai nesutampa',
  minLength: 'Minimalus ilgis {min} simbolių',
  maxLength: 'Maksimalus ilgis {max} simbolių',
  
  // Network Status
  online: 'Prisijungę',
  offline: 'Neprisijungę',
  connecting: 'Jungiamasi...',
  reconnecting: 'Jungiamasi iš naujo...',
  
  // File Operations
  fileUpload: 'Failo įkėlimas',
  fileDownload: 'Failo atsisiuntimas',
  fileProcessing: 'Failo apdorojimas',
  fileConversion: 'Failo konvertavimas',
  
  // Audio Controls
  play: 'Groti',
  pause: 'Pauzė',
  stop: 'Sustabdyti',
  volume: 'Garsumas',
  mute: 'Nutildyti',
  unmute: 'Įjungti garsą',
  
  // Time Display
  seconds: 'sekundžių',
  minutes: 'minučių',
  hours: 'valandų',
  days: 'dienų',
  weeks: 'savaičių',
  months: 'mėnesių',
  years: 'metų',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'daug',
  
  // Directions
  up: 'Aukštyn',
  down: 'Žemyn',
  left: 'Kairėn',
  right: 'Dešinėn',
  next: 'Kitas',
  previous: 'Ankstesnis',
  back: 'Atgal',
  forward: 'Pirmyn',
  
  // Sizes
  small: 'Mažas',
  medium: 'Vidutinis',
  large: 'Didelis',
  extraLarge: 'Labai didelis',
  
  // Colors
  red: 'Raudona',
  green: 'Žalia',
  blue: 'Mėlyna',
  yellow: 'Geltona',
  orange: 'Oranžinė',
  purple: 'Violetinė',
  pink: 'Rožinė',
  gray: 'Pilka',
  black: 'Juoda',
  white: 'Balta',
  
  // Weather and Time
  morning: 'Rytas',
  afternoon: 'Diena',
  evening: 'Vakaras',
  night: 'Naktis',
  
  // Days of the Week
  monday: 'Pirmadienis',
  tuesday: 'Antradienis',
  wednesday: 'Trečiadienis',
  thursday: 'Ketvirtadienis',
  friday: 'Penktadienis',
  saturday: 'Šeštadienis',
  sunday: 'Sekmadienis',
  
  // Months
  january: 'Sausis',
  february: 'Vasaris',
  march: 'Kovas',
  april: 'Balandis',
  may: 'Gegužė',
  june: 'Birželis',
  july: 'Liepa',
  august: 'Rugpjūtis',
  september: 'Rugsėjis',
  october: 'Spalis',
  november: 'Lapkritis',
  december: 'Gruodis',
  
  // Header and navigation translations
  useCases: 'Naudojimo Atvejai',
  medicalProfessionals: 'Medicinos Specialistai',
  therapists: 'Terapeutai',
  lawyers: 'Advokatai',
  businessProfessionals: 'Verslo Profesionalai',
  education: 'Švietimas',
  contentCreators: 'Turinio Kūrėjai',
  researchers: 'Tyrėjai',
  customerSupport: 'Klientų Palaikymas',
  login: 'Prisijungti',
  getStarted: 'Pradėti',
  getStartedFree: 'Pradėti Nemokamai',
  signIn: 'Prisijungti',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Dviejų faktorių autentifikacija',
    description: 'Įveskite savo 6 skaitmenų autentifikacijos kodą, kad pasiektumėte jautrius duomenis',
    required: 'Reikalinga dviejų faktorių autentifikacija',
    enterCodeToAccessNotes: 'Įveskite savo 6 skaitmenų kodą, kad pasiektumėte pastabas',
    enterCodeToAccessTranscriptions: 'Įveskite savo 6 skaitmenų kodą, kad pasiektumėte transkripcijas',
    enterCode: 'Įveskite 6 skaitmenų kodą',
    verifyCode: 'Patikrinti kodą',
    useBackupCode: 'Arba naudokite atsarginį kodą',
    enterBackupCode: 'Įveskite atsarginį kodą',
    getCodeFromApp: 'Gaukite savo kodą iš Google Authenticator, Authy arba jūsų pageidaujamos 2FA programėlės',
    setupLink: 'Reikia nustatyti 2FA? Eikite į Nustatymus',
    step1Title: '1 žingsnis: Nuskaityti QR kodą',
    step1Description: 'Atidarykite savo autentifikatoriaus programėlę ir nuskaitykite šį QR kodą, kad pridėtumėte savo paskyrą',
    enterManually: 'Arba įveskite rankiniu būdu',
    codeAdded: 'Aš pridėjau kodą',
    cancel: 'Atšaukti',
    step2Title: '2 žingsnis: Išsaugoti atsarginius kodus',
    step2Description: 'Išsaugokite šiuos atsarginius kodus saugioje vietoje. Galite juos naudoti, kad pasiektumėte savo paskyrą, jei pametumėte savo 2FA įrenginį.',
    backupCodes: 'Atsarginiai kodai',
    completeSetup: 'Užbaigti nustatymą',
    back: 'Atgal',
    setupDataError: 'Nepavyko sugeneruoti 2FA nustatymo duomenų',
    tooManyAttempts: 'Per daug nesėkmingų bandymų. Prašome palaukti',
    minutesWait: 'minučių.',
    enter6DigitCode: 'Prašome įvesti 6 skaitmenų kodą',
    verificationSuccessful: '2FA patikrinimas sėkmingas',
    invalidCode: 'Neteisingas kodas.',
    attemptsRemaining: 'bandymų liko.',
    verificationFailed: 'Patikrinimas nepavyko. Prašome bandyti dar kartą.',
    backupVerificationSuccessful: 'Atsarginio kodo patikrinimas sėkmingas',
    invalidBackupCode: 'Neteisingas atsarginis kodas',
    backupVerificationFailed: 'Atsarginio kodo patikrinimas nepavyko',
    copiedToClipboard: 'Nukopijuota į iškarpinę',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Nepavyko įkelti transkripcijų',
  transcriptionCopiedToClipboard: 'Transkripcija nukopijuota į iškarpinę',
  failedToCopyToClipboard: 'Nepavyko nukopijuoti į iškarpinę',
  transcriptionDownloaded: 'Transkripcija atsisiųsta kaip',
  failedToDownloadTranscription: 'Nepavyko atsisiųsti transkripcijos',
  noContentAvailable: 'Turinys neprieinamas',
  failedToSwitchMicrophone: 'Nepavyko pakeisti mikrofono. Bandykite dar kartą.',
  failedToLoadNotes: 'Nepavyko įkelti pastabų',
} as const 