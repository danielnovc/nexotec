export default {
  // Dashboard Navigation
  dashboard: 'Panel sterowania',
  transcriptions: 'Transkrypcje',
  notes: 'Notatki',
  analytics: 'Analityka',
  billing: 'Rozliczenia',
  credits: 'Kredyty',
  account: 'Konto',
  enterprise: 'Przedsiębiorstwo',
  
  // Dashboard Recording
  audioRecording: 'Nagrywanie dźwięku',
  recordAudioForTranscription: 'Nagraj dźwięk do transkrypcji',
  recordingInProgress: 'Nagrywanie w toku...',
  deviceAudio: 'Dźwięk urządzenia',
  microphone: 'Mikrofon',
  noNotesGeneratedYet: 'Notatki jeszcze nie zostały wygenerowane.',
  noTranscriptionGeneratedYet: 'Transkrypcja jeszcze nie została wygenerowana.',
  noSummaryGeneratedYet: 'Podsumowanie jeszcze nie zostało wygenerowane.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Transkrypcja dźwięku',
  transcriptionHistory: 'Historia transkrypcji',
  notesHistory: 'Historia notatek',
  topUpCredits: 'Doładuj kredyty',
  tools: 'Narzędzia',
  dataSafety: 'Bezpieczeństwo danych',
  downloadOptions: 'Opcje pobierania',
  configureStorage: 'Skonfiguruj magazyn',
  
  // Sidebar and UI
  toggleTheme: 'Przełącz motyw',
  notesMode: 'Tryb notatek',
  transcriptionMode: 'Tryb transkrypcji',
  switchToTranscriptionMode: 'Przełącz do trybu transkrypcji: wyświetl jako rozmowę z etykietami mówców',
  switchToNotesMode: 'Przełącz do trybu notatek: wyświetl jako ciągły tekst do robienia notatek',
  moreThanTwoSpeakersTooltip: 'Włącz to, jeśli Twoje nagranie zawiera więcej niż dwóch mówców. To pomaga poprawić dokładność diaryzacji mówców, zapobiegając błędnemu dodawaniu przez system dodatkowych mówców z powodu hałasu w tle lub krótkotrwałych różnic dźwiękowych.',
  recordDeviceAudioTooltip: 'Włącz to, aby nagrywać dźwięk systemowy (muzyka, filmy, połączenia) oprócz wejścia z mikrofonu. To pozwala uchwycić zarówno Twój głos, jak i dźwięk odtwarzany na Twoim urządzeniu.',
  
  // Dashboard Main Page
  welcome: 'Witaj ponownie',
  startRecording: 'Rozpocznij nagrywanie',
  stopRecording: 'Zatrzymaj nagrywanie',
  recording: 'Nagrywanie...',
  processing: 'Przetwarzanie...',
  generatingSummary: 'Generowanie podsumowania...',
  generatingPDF: 'Generowanie PDF...',
  
  // Recording Controls
  selectMicrophone: 'Wybierz mikrofon',
  defaultMicrophone: 'Domyślny mikrofon',
  recordingDuration: 'Czas trwania nagrania',
  recordingStatus: 'Status nagrywania',
  
  // Transcription
  transcription: 'Transkrypcja',
  noTranscription: 'Transkrypcja niedostępna',
  copyTranscription: 'Kopiuj transkrypcję',
  downloadTranscription: 'Pobierz transkrypcję',
  clearTranscription: 'Wyczyść transkrypcję',
  transcriptionCopied: 'Transkrypcja skopiowana do schowka',
  
  // Summary
  summary: 'Podsumowanie',
  generateSummary: 'Generuj podsumowanie',
  noSummary: 'Podsumowanie niedostępne',
  summaryGenerated: 'Podsumowanie zostało pomyślnie wygenerowane',
  downloadPDF: 'Pobierz PDF',
  
  // Notes
  addNote: 'Dodaj notatkę',
  editNote: 'Edytuj notatkę',
  deleteNote: 'Usuń notatkę',
  saveNote: 'Zapisz notatkę',
  noteSaved: 'Notatka została pomyślnie zapisana',
  noteDeleted: 'Notatka została pomyślnie usunięta',
  notesWillAppearHere: 'Notatki pojawią się tutaj',
  transcriptionWillAppearHere: 'Transkrypcja pojawi się tutaj',
  
  // Credits
  availableCredits: 'Dostępne kredyty',
  creditsUsed: 'Użyte kredyty',
  buyCredits: 'Kup kredyty',
  creditHistory: 'Historia kredytów',
  insufficientCredits: 'Niewystarczające kredyty',
  
  // Settings
  settings: {
    title: 'Ustawienia',
    subtitle: 'Skonfiguruj swoje preferencje transkrypcji i aplikacji',
    aiFeatures: 'Funkcje AI',
    aiFeaturesDescription: 'Skonfiguruj funkcje transkrypcji oparte na AI',
    autoSummarize: 'Automatycznie generuj podsumowania',
    autoSummarizeDescription: 'Automatycznie generuj podsumowania',
    moreThanTwoSpeakers: 'Więcej niż dwóch mówców',
    moreThanTwoSpeakersDescription: 'Ulepszone wykrywanie mówców',
    recordDeviceAudio: 'Nagrywaj dźwięk urządzenia',
    recordDeviceAudioDescription: 'Przechwytuj dźwięk systemu',
    dataSafety: 'Bezpieczeństwo danych',
    dataSafetyDescription: 'Kontroluj, jak Twoje dane są przechowywane i przetwarzane',
    saveTranscripts: 'Zapisuj transkrypcje',
    saveTranscriptsDescription: 'Bezpiecznie przechowuj transkrypcje',
    saveAudioToStorage: 'Zapisuj dźwięk w magazynie',
    saveAudioToStorageDescription: 'Bezpiecznie przechowuj pliki dźwiękowe',
    autoDownloadRecordings: 'Automatycznie pobieraj nagrania',
    autoDownloadRecordingsDescription: 'Automatycznie zapisuj nagrania na urządzeniu po zakończeniu',
    autoDownloadTranscripts: 'Automatycznie pobieraj transkrypcje',
    autoDownloadTranscriptsDescription: 'Automatycznie zapisuj transkrypcje na urządzeniu po zakończeniu nagrywania i transkrypcji',
    twoFactorAuth: 'Uwierzytelnianie dwuskładnikowe',
    twoFactorAuthDescription: 'Zabezpiecz swoje konto za pomocą 2FA',
    '2faStatus': 'Status 2FA',
    enabled: 'Włączone',
    notSetUp: 'Nie skonfigurowane',
    active: 'Aktywne',
    inactive: 'Nieaktywne',
    '2faActive': '2FA jest aktywne',
    '2faActiveDescription': 'Twoje konto jest chronione uwierzytelnianiem dwuskładnikowym.',
    '2faNotSetUp': '2FA nie skonfigurowane',
    '2faNotSetUpDescription': 'Włącz uwierzytelnianie dwuskładnikowe dla zwiększonego bezpieczeństwa.',
    manage2FA: 'Zarządzaj 2FA',
    setUp2FA: 'Skonfiguruj 2FA',
    privacyInformation: 'Informacje o prywatności',
    privacyInformationDescription: 'Dowiedz się o naszych praktykach prywatności',
    endToEndEncryption: 'Szyfrowanie end-to-end',
    endToEndEncryptionDescription: 'Wszystkie Twoje dane są szyfrowane szyfrowaniem AES-256 i nigdy nie są przechowywane w postaci niezaszyfrowanej.',
    gdprHipaaCompliant: 'Zgodne z GDPR i HIPAA',
    gdprHipaaCompliantDescription: 'Nasza platforma spełnia najwyższe standardy ochrony danych i prywatności.',
    viewDocumentation: 'Zobacz dokumentację',
    enterpriseAccess: 'Dostęp Enterprise',
    enterpriseAccessDescription: 'Przejdź na enterprise dla zaawansowanych funkcji',
    enterpriseFeatures: 'Funkcje Enterprise',
    enterpriseFeaturesDescription: 'Konfigurowanie ustawień specyficznych dla przedsiębiorstwa',
    storageConfiguration: 'Konfiguracja magazynu',
    storageConfigurationDescription: 'Skonfiguruj własny magazyn kompatybilny z S3 dla pełnej suwerenności danych.',
    configureStorage: 'Skonfiguruj magazyn',
    teamManagement: 'Zarządzanie zespołem',
    teamManagementDescription: 'Zarządzaj zespołem przedsiębiorstwa i uprawnieniami',
    userManagement: 'Zarządzanie użytkownikami',
    userManagementDescription: 'Dodawaj, usuwaj i zarządzaj członkami zespołu z kontrolą dostępu opartą na rolach.',
    manageUsers: 'Zarządzaj użytkownikami',
    customS3Storage: 'Niestandardowa konfiguracja magazynu S3',
    teamManagementRoles: 'Zarządzanie zespołem i role użytkowników',
    advancedAnalytics: 'Zaawansowana analityka i raportowanie',
    prioritySupport: 'Priorytetowe wsparcie i SLA',
    customIntegrations: 'Niestandardowe integracje i dostęp do API',
    contactSales: 'Skontaktuj się z działem sprzedaży',
  },
  
  // Analytics
  transcriptionStats: 'Statystyki transkrypcji',
  usageStats: 'Statystyki użycia',
  monthlyUsage: 'Miesięczne użycie',
  totalTranscriptions: 'Łączna liczba transkrypcji',
  totalNotes: 'Łączna liczba notatek',
  
  // Billing
  currentPlan: 'Obecny plan',
  upgradePlan: 'Uaktualnij plan',
  billingHistory: 'Historia rozliczeń',
  paymentMethod: 'Metoda płatności',
  
  // Account
  profile: 'Profil',
  security: 'Bezpieczeństwo',
  preferences: 'Preferencje',
  logout: 'Wyloguj się',
  
  // Enterprise
  teamManagement: 'Zarządzanie zespołem',
  adminPanel: 'Panel administratora',
  userManagement: 'Zarządzanie użytkownikami',
  
  // Common Actions
  save: 'Zapisz',
  cancel: 'Anuluj',
  delete: 'Usuń',
  edit: 'Edytuj',
  add: 'Dodaj',
  remove: 'Usuń',
  download: 'Pobierz',
  upload: 'Prześlij',
  search: 'Szukaj',
  filter: 'Filtruj',
  sort: 'Sortuj',
  
  // Status Messages
  loading: 'Ładowanie...',
  error: 'Błąd',
  success: 'Sukces',
  warning: 'Ostrzeżenie',
  info: 'Informacja',
  
  // Time and Date
  today: 'Dzisiaj',
  yesterday: 'Wczoraj',
  thisWeek: 'W tym tygodniu',
  thisMonth: 'W tym miesiącu',
  lastMonth: 'W zeszłym miesiącu',
  
  // File Types
  audio: 'Dźwięk',
  video: 'Wideo',
  document: 'Dokument',
  image: 'Obraz',
  
  // Languages
  language: 'Język',
  english: 'Angielski',
  spanish: 'Hiszpański',
  german: 'Niemiecki',
  french: 'Francuski',
  russian: 'Rosyjski',
  ukrainian: 'Ukraiński',
  lithuanian: 'Litewski',
  polish: 'Polski',
  
  // Error Messages
  errorOccurred: 'Wystąpił błąd',
  tryAgain: 'Spróbuj ponownie',
  networkError: 'Błąd sieci',
  permissionDenied: 'Odmowa dostępu',
  fileTooLarge: 'Plik za duży',
  invalidFormat: 'Nieprawidłowy format',
  
  // Success Messages
  savedSuccessfully: 'Pomyślnie zapisano',
  deletedSuccessfully: 'Pomyślnie usunięto',
  uploadedSuccessfully: 'Pomyślnie przesłano',
  downloadedSuccessfully: 'Pomyślnie pobrano',
  
  // Confirmation Dialogs
  confirmDelete: 'Czy na pewno chcesz to usunąć?',
  confirmLogout: 'Czy na pewno chcesz się wylogować?',
  confirmClear: 'Czy na pewno chcesz to wyczyścić?',
  
  // Placeholders
  searchPlaceholder: 'Szukaj...',
  notePlaceholder: 'Napisz swoją notatkę tutaj...',
  transcriptionPlaceholder: 'Transkrypcja pojawi się tutaj...',
  
  // Tooltips
  startRecordingTooltip: 'Rozpocznij nagrywanie dźwięku',
  stopRecordingTooltip: 'Zatrzymaj nagrywanie dźwięku',
  copyTooltip: 'Kopiuj do schowka',
  downloadTooltip: 'Pobierz plik',
  deleteTooltip: 'Usuń element',
  editTooltip: 'Edytuj element',
  
  // Accessibility
  ariaStartRecording: 'Przycisk rozpoczęcia nagrywania',
  ariaStopRecording: 'Przycisk zatrzymania nagrywania',
  ariaCopyTranscription: 'Przycisk kopiowania transkrypcji',
  ariaDownloadTranscription: 'Przycisk pobierania transkrypcji',
  ariaClearTranscription: 'Przycisk czyszczenia transkrypcji',
  
  // Cost and Pricing
  estimatedCost: 'Szacowany koszt',
  actualCost: 'Rzeczywisty koszt',
  costPerMinute: 'Koszt za minutę',
  totalCost: 'Całkowity koszt',
  
  // Audio Processing
  audioProcessing: 'Przetwarzanie dźwięku',
  processingAudio: 'Przetwarzanie dźwięku...',
  audioProcessed: 'Dźwięk został pomyślnie przetworzony',
  processingFailed: 'Przetwarzanie nie powiodło się',
  
  // Speaker Recognition
  speakerRecognition: 'Rozpoznawanie mówców',
  speaker1: 'Mówca 1',
  speaker2: 'Mówca 2',
  speaker3: 'Mówca 3',
  speaker4: 'Mówca 4',
  unknownSpeaker: 'Nieznany mówca',
  
  // Quality Settings
  qualitySettings: 'Ustawienia jakości',
  highQuality: 'Wysoka jakość',
  mediumQuality: 'Średnia jakość',
  lowQuality: 'Niska jakość',
  
  // Export Options
  exportOptions: 'Opcje eksportu',
  exportAsPDF: 'Eksportuj jako PDF',
  exportAsTXT: 'Eksportuj jako TXT',
  exportAsSRT: 'Eksportuj jako SRT',
  exportAsVTT: 'Eksportuj jako VTT',
  
  // Privacy and Security
  privacy: 'Prywatność',
  securitySettings: 'Bezpieczeństwo',
  encryption: 'Szyfrowanie',
  dataProtection: 'Ochrona danych',
  gdprCompliant: 'Zgodne z RODO',
  hipaaCompliant: 'Zgodne z HIPAA',
  
  // Support
  support: 'Wsparcie',
  help: 'Pomoc',
  documentation: 'Dokumentacja',
  contactSupport: 'Skontaktuj się z pomocą techniczną',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Powiadomienia',
  notificationSettings: 'Ustawienia powiadomień',
  emailNotifications: 'Powiadomienia e-mail',
  pushNotifications: 'Powiadomienia push',
  
  // Theme
  theme: 'Motyw',
  lightMode: 'Tryb jasny',
  darkMode: 'Tryb ciemny',
  systemTheme: 'Motyw systemowy',
  
  // User Interface
  sidebar: 'Pasek boczny',
  mainContent: 'Główna zawartość',
  header: 'Nagłówek',
  footer: 'Stopka',
  navigation: 'Nawigacja',
  
  // Data Management
  dataManagement: 'Zarządzanie danymi',
  backup: 'Kopia zapasowa',
  restore: 'Przywróć',
  sync: 'Synchronizuj',
  import: 'Importuj',
  export: 'Eksportuj',
  
  // Performance
  performance: 'Wydajność',
  speed: 'Szybkość',
  accuracy: 'Dokładność',
  reliability: 'Niezawodność',
  
  // Features
  features: 'Funkcje',
  realTimeTranscription: 'Transkrypcja w czasie rzeczywistym',
  speakerDiarization: 'Diaryzacja mówców',
  automaticSummarization: 'Automatyczne generowanie podsumowań',
  multiLanguageSupport: 'Obsługa wielu języków',
  secureStorage: 'Bezpieczny magazyn',
  
  // Plans and Pricing
  plans: 'Plany',
  pricing: 'Cennik',
  freePlan: 'Plan darmowy',
  proPlan: 'Plan Pro',
  enterprisePlan: 'Plan przedsiębiorstwa',
  customPlan: 'Plan niestandardowy',
  
  // Usage Limits
  usageLimits: 'Limity użycia',
  monthlyLimit: 'Limit miesięczny',
  dailyLimit: 'Limit dzienny',
  hourlyLimit: 'Limit godzinowy',
  
  // API and Integration
  api: 'API',
  integration: 'Integracja',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Dokumentacja',
  
  // Compliance
  compliance: 'Zgodność',
  certifications: 'Certyfikaty',
  audits: 'Audyty',
  policies: 'Polityki',
  
  // Updates and Maintenance
  updates: 'Aktualizacje',
  maintenance: 'Konserwacja',
  changelog: 'Dziennik zmian',
  version: 'Wersja',
  
  // Feedback
  feedback: 'Opinia',
  rating: 'Ocena',
  review: 'Recenzja',
  suggestion: 'Sugestia',
  bugReport: 'Raport o błędzie',
  
  // Onboarding
  onboarding: 'Wprowadzenie',
  welcomeTour: 'Wycieczka powitalna',
  gettingStarted: 'Rozpocznij',
  tutorial: 'Samouczek',
  guide: 'Przewodnik',
  
  // Empty States
  noData: 'Brak danych',
  noTranscriptions: 'Brak transkrypcji',
  noNotes: 'Brak notatek',
  noAnalytics: 'Brak danych analitycznych',
  noBillingHistory: 'Brak historii rozliczeń',
  
  // Loading States
  loadingTranscriptions: 'Ładowanie transkrypcji...',
  loadingNotes: 'Ładowanie notatek...',
  loadingAnalytics: 'Ładowanie analityki...',
  loadingBilling: 'Ładowanie informacji o rozliczeniach...',
  
  // Validation Messages
  required: 'To pole jest wymagane',
  invalidEmail: 'Nieprawidłowy adres e-mail',
  invalidPassword: 'Nieprawidłowe hasło',
  passwordMismatch: 'Hasła nie pasują',
  minLength: 'Minimalna długość to {min} znaków',
  maxLength: 'Maksymalna długość to {max} znaków',
  
  // Network Status
  online: 'Online',
  offline: 'Offline',
  connecting: 'Łączenie...',
  reconnecting: 'Ponowne łączenie...',
  
  // File Operations
  fileUpload: 'Przesyłanie pliku',
  fileDownload: 'Pobieranie pliku',
  fileProcessing: 'Przetwarzanie pliku',
  fileConversion: 'Konwersja pliku',
  
  // Audio Controls
  play: 'Odtwórz',
  pause: 'Pauza',
  stop: 'Stop',
  volume: 'Głośność',
  mute: 'Wycisz',
  unmute: 'Włącz dźwięk',
  
  // Time Display
  seconds: 'sekund',
  minutes: 'minut',
  hours: 'godzin',
  days: 'dni',
  weeks: 'tygodni',
  months: 'miesięcy',
  years: 'lat',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'wiele',
  
  // Directions
  up: 'W górę',
  down: 'W dół',
  left: 'W lewo',
  right: 'W prawo',
  next: 'Następny',
  previous: 'Poprzedni',
  back: 'Wstecz',
  forward: 'Dalej',
  
  // Sizes
  small: 'Mały',
  medium: 'Średni',
  large: 'Duży',
  extraLarge: 'Bardzo duży',
  
  // Colors
  red: 'Czerwony',
  green: 'Zielony',
  blue: 'Niebieski',
  yellow: 'Żółty',
  orange: 'Pomarańczowy',
  purple: 'Fioletowy',
  pink: 'Różowy',
  gray: 'Szary',
  black: 'Czarny',
  white: 'Biały',
  
  // Weather and Time
  morning: 'Rano',
  afternoon: 'Popołudnie',
  evening: 'Wieczór',
  night: 'Noc',
  
  // Days of the Week
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
  
  // Months
  january: 'Styczeń',
  february: 'Luty',
  march: 'Marzec',
  april: 'Kwiecień',
  may: 'Maj',
  june: 'Czerwiec',
  july: 'Lipiec',
  august: 'Sierpień',
  september: 'Wrzesień',
  october: 'Październik',
  november: 'Listopad',
  december: 'Grudzień',
  
  // Header and navigation translations
  useCases: 'Przypadki Użycia',
  medicalProfessionals: 'Profesjonaliści Medyczni',
  therapists: 'Terapeuci',
  lawyers: 'Prawnicy',
  businessProfessionals: 'Profesjonaliści Biznesowi',
  education: 'Edukacja',
  contentCreators: 'Twórcy Treści',
  researchers: 'Badacze',
  customerSupport: 'Obsługa Klienta',
  login: 'Zaloguj się',
  getStarted: 'Rozpocznij',
  getStartedFree: 'Rozpocznij Za Darmo',
  signIn: 'Zaloguj się',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Uwierzytelnianie dwuskładnikowe',
    description: 'Wprowadź swój 6-cyfrowy kod uwierzytelniania, aby uzyskać dostęp do poufnych danych',
    required: 'Wymagane uwierzytelnianie dwuskładnikowe',
    enterCodeToAccessNotes: 'Wprowadź swój 6-cyfrowy kod, aby uzyskać dostęp do notatek',
    enterCodeToAccessTranscriptions: 'Wprowadź swój 6-cyfrowy kod, aby uzyskać dostęp do transkrypcji',
    enterCode: 'Wprowadź kod 6-cyfrowy',
    verifyCode: 'Zweryfikuj kod',
    useBackupCode: 'Lub użyj kodu zapasowego',
    enterBackupCode: 'Wprowadź kod zapasowy',
    getCodeFromApp: 'Pobierz swój kod z Google Authenticator, Authy lub preferowanej aplikacji 2FA',
    setupLink: 'Potrzebujesz skonfigurować 2FA? Przejdź do Ustawień',
    step1Title: 'Krok 1: Skanuj kod QR',
    step1Description: 'Otwórz swoją aplikację uwierzytelniającą i zeskanuj ten kod QR, aby dodać swoje konto',
    enterManually: 'Lub wprowadź ręcznie',
    codeAdded: 'Dodałem kod',
    cancel: 'Anuluj',
    step2Title: 'Krok 2: Zapisz kody zapasowe',
    step2Description: 'Zapisz te kody zapasowe w bezpiecznym miejscu. Możesz ich użyć, aby uzyskać dostęp do swojego konta, jeśli zgubisz swoje urządzenie 2FA.',
    backupCodes: 'Kody zapasowe',
    completeSetup: 'Zakończ konfigurację',
    back: 'Wstecz',
    setupDataError: 'Nie udało się wygenerować danych konfiguracyjnych 2FA',
    tooManyAttempts: 'Zbyt wiele nieudanych prób. Proszę czekać',
    minutesWait: 'minut.',
    enter6DigitCode: 'Proszę wprowadzić kod 6-cyfrowy',
    verificationSuccessful: 'Weryfikacja 2FA udana',
    invalidCode: 'Nieprawidłowy kod.',
    attemptsRemaining: 'prób pozostało.',
    verificationFailed: 'Weryfikacja nie powiodła się. Proszę spróbować ponownie.',
    backupVerificationSuccessful: 'Weryfikacja kodu zapasowego udana',
    invalidBackupCode: 'Nieprawidłowy kod zapasowy',
    backupVerificationFailed: 'Weryfikacja kodu zapasowego nie powiodła się',
    copiedToClipboard: 'Skopiowano do schowka',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Nie udało się załadować transkrypcji',
  transcriptionCopiedToClipboard: 'Transkrypcja skopiowana do schowka',
  failedToCopyToClipboard: 'Nie udało się skopiować do schowka',
  transcriptionDownloaded: 'Transkrypcja pobrana jako',
  failedToDownloadTranscription: 'Nie udało się pobrać transkrypcji',
  noContentAvailable: 'Brak dostępnej zawartości',
  failedToSwitchMicrophone: 'Nie udało się przełączyć mikrofonu. Spróbuj ponownie.',
  failedToLoadNotes: 'Nie udało się załadować notatek',
} as const 