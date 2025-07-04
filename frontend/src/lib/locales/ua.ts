export default {
  // Dashboard Navigation
  dashboard: 'Панель керування',
  transcriptions: 'Транскрипції',
  notes: 'Нотатки',
  analytics: 'Аналітика',
  billing: 'Білінг',
  credits: 'Кредити',
  account: 'Обліковий запис',
  enterprise: 'Підприємство',
  
  // Dashboard Recording
  audioRecording: 'Запис аудіо',
  recordAudioForTranscription: 'Записати аудіо для транскрипції',
  recordingInProgress: 'Запис у процесі...',
  deviceAudio: 'Аудіо пристрою',
  microphone: 'Мікрофон',
  noNotesGeneratedYet: 'Нотатки ще не створені.',
  noTranscriptionGeneratedYet: 'Транскрипція ще не створена.',
  noSummaryGeneratedYet: 'Резюме ще не створено.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Транскрипція аудіо',
  transcriptionHistory: 'Історія транскрипцій',
  notesHistory: 'Історія нотаток',
  topUpCredits: 'Поповнити кредити',
  tools: 'Інструменти',
  dataSafety: 'Безпека даних',
  downloadOptions: 'Варіанти завантаження',
  configureStorage: 'Налаштувати сховище',
  
  // Sidebar and UI
  toggleTheme: 'Перемкнути тему',
  notesMode: 'Режим нотаток',
  transcriptionMode: 'Режим транскрипції',
  switchToTranscriptionMode: 'Перемкнутися в режим транскрипції: відображати як розмову з мітками мовців',
  switchToNotesMode: 'Перемкнутися в режим нотаток: відображати як суцільний текст для ведення нотаток',
  moreThanTwoSpeakersTooltip: 'Увімкніть це, якщо ваше аудіо містить більше двох мовців. Це допомагає покращити точність діаризації мовців, запобігаючи помилковому додаванню системою додаткових мовців через фоновий шум або короткочасні звукові розбіжності.',
  recordDeviceAudioTooltip: 'Увімкніть це для запису системного аудіо (музика, відео, дзвінки) на додаток до вводу з мікрофона. Це дозволяє захоплювати як ваш голос, так і аудіо, що відтворюється на вашому пристрої.',
  
  // Dashboard Main Page
  welcome: 'Ласкаво просимо назад',
  startRecording: 'Почати запис',
  stopRecording: 'Зупинити запис',
  recording: 'Запис...',
  processing: 'Обробка...',
  generatingSummary: 'Створення резюме...',
  generatingPDF: 'Створення PDF...',
  
  // Recording Controls
  selectMicrophone: 'Вибрати мікрофон',
  defaultMicrophone: 'Мікрофон за замовчуванням',
  recordingDuration: 'Тривалість запису',
  recordingStatus: 'Статус запису',
  
  // Transcription
  transcription: 'Транскрипція',
  noTranscription: 'Транскрипція недоступна',
  copyTranscription: 'Копіювати транскрипцію',
  downloadTranscription: 'Завантажити транскрипцію',
  clearTranscription: 'Очистити транскрипцію',
  transcriptionCopied: 'Транскрипцію скопійовано в буфер обміну',
  
  // Summary
  summary: 'Резюме',
  generateSummary: 'Створити резюме',
  noSummary: 'Резюме недоступне',
  summaryGenerated: 'Резюме успішно створено',
  downloadPDF: 'Завантажити PDF',
  
  // Notes
  addNote: 'Додати нотатку',
  editNote: 'Редагувати нотатку',
  deleteNote: 'Видалити нотатку',
  saveNote: 'Зберегти нотатку',
  noteSaved: 'Нотатку успішно збережено',
  noteDeleted: 'Нотатку успішно видалено',
  notesWillAppearHere: 'Нотатки з\'являться тут',
  transcriptionWillAppearHere: 'Транскрипція з\'явиться тут',
  
  // Credits
  availableCredits: 'Доступні кредити',
  creditsUsed: 'Використані кредити',
  buyCredits: 'Купити кредити',
  creditHistory: 'Історія кредитів',
  insufficientCredits: 'Недостатньо кредитів',
  
  // Settings
  settings: {
    title: 'Налаштування',
    subtitle: 'Налаштуйте ваші уподобання для транскрипції та додатку',
    aiFeatures: 'Функції ШІ',
    aiFeaturesDescription: 'Налаштувати функції транскрипції на базі ШІ',
    autoSummarize: 'Автоматично створювати резюме',
    autoSummarizeDescription: 'Автоматично генерувати резюме',
    moreThanTwoSpeakers: 'Більше двох мовців',
    moreThanTwoSpeakersDescription: 'Покращене визначення мовців',
    recordDeviceAudio: 'Записувати аудіо пристрою',
    recordDeviceAudioDescription: 'Захоплювати системне аудіо',
    dataSafety: 'Безпека даних',
    dataSafetyDescription: 'Контролюйте, як ваші дані зберігаються та обробляються',
    saveTranscripts: 'Зберігати транскрипції',
    saveTranscriptsDescription: 'Безпечно зберігати транскрипції',
    saveAudioToStorage: 'Зберігати аудіо в сховищі',
    saveAudioToStorageDescription: 'Безпечно зберігати аудіофайли',
    autoDownloadRecordings: 'Автоматично завантажувати записи',
    autoDownloadRecordingsDescription: 'Автоматично зберігати записи на пристрій після завершення',
    autoDownloadTranscripts: 'Автоматично завантажувати транскрипції',
    autoDownloadTranscriptsDescription: 'Автоматично зберігати транскрипції на пристрій після завершення запису та транскрипції',
    twoFactorAuth: 'Двофакторна аутентифікація',
    twoFactorAuthDescription: 'Захистіть свій акаунт за допомогою 2FA',
    '2faStatus': 'Статус 2FA',
    enabled: 'Увімкнено',
    notSetUp: 'Не налаштовано',
    active: 'Активно',
    inactive: 'Неактивно',
    '2faActive': '2FA активно',
    '2faActiveDescription': 'Ваш акаунт захищений двофакторною аутентифікацією.',
    '2faNotSetUp': '2FA не налаштована',
    '2faNotSetUpDescription': 'Увімкніть двофакторну аутентифікацію для підвищеної безпеки.',
    manage2FA: 'Управління 2FA',
    setUp2FA: 'Налаштувати 2FA',
    privacyInformation: 'Інформація про конфіденційність',
    privacyInformationDescription: 'Дізнайтеся про наші практики конфіденційності',
    endToEndEncryption: 'Сквозне шифрування',
    endToEndEncryptionDescription: 'Всі ваші дані зашифровані за допомогою AES-256 шифрування і ніколи не зберігаються у відкритому вигляді.',
    gdprHipaaCompliant: 'Відповідає GDPR та HIPAA',
    gdprHipaaCompliantDescription: 'Наша платформа відповідає найвищим стандартам захисту даних та конфіденційності.',
    viewDocumentation: 'Перегляд документації',
    enterpriseAccess: 'Корпоративний доступ',
    enterpriseAccessDescription: 'Оновіться до корпоративної версії для розширених функцій',
    enterpriseFeatures: 'Корпоративні функції',
    enterpriseFeaturesDescription: 'Налаштування корпоративних параметрів',
    storageConfiguration: 'Конфігурація сховища',
    storageConfigurationDescription: 'Налаштуйте власне S3-сумісне сховище для повного суверенітету даних.',
    configureStorage: 'Налаштувати сховище',
    teamManagement: 'Управління командою',
    teamManagementDescription: 'Керуйте корпоративною командою та дозволами',
    userManagement: 'Управління користувачами',
    userManagementDescription: 'Додавайте, видаляйте та керуйте учасниками команди з контролем доступу на основі ролей.',
    manageUsers: 'Управління користувачами',
    customS3Storage: 'Користувацька конфігурація S3 сховища',
    teamManagementRoles: 'Управління командою та ролі користувачів',
    advancedAnalytics: 'Розширена аналітика та звітність',
    prioritySupport: 'Пріоритетна підтримка та SLA',
    customIntegrations: 'Користувацькі інтеграції та доступ до API',
    contactSales: 'Зв\'язатися з продажами',
  },
  
  // Analytics
  transcriptionStats: 'Статистика транскрипцій',
  usageStats: 'Статистика використання',
  monthlyUsage: 'Місячне використання',
  totalTranscriptions: 'Всього транскрипцій',
  totalNotes: 'Всього нотаток',
  
  // Billing
  currentPlan: 'Поточний план',
  upgradePlan: 'Оновити план',
  billingHistory: 'Історія білінгу',
  paymentMethod: 'Спосіб оплати',
  
  // Account
  profile: 'Профіль',
  security: 'Безпека',
  preferences: 'Налаштування',
  logout: 'Вийти',
  
  // Enterprise
  teamManagement: 'Управління командою',
  adminPanel: 'Панель адміністратора',
  userManagement: 'Управління користувачами',
  
  // Common Actions
  save: 'Зберегти',
  cancel: 'Скасувати',
  delete: 'Видалити',
  edit: 'Редагувати',
  add: 'Додати',
  remove: 'Видалити',
  download: 'Завантажити',
  upload: 'Завантажити',
  search: 'Пошук',
  filter: 'Фільтр',
  sort: 'Сортування',
  
  // Status Messages
  loading: 'Завантаження...',
  error: 'Помилка',
  success: 'Успіх',
  warning: 'Попередження',
  info: 'Інформація',
  
  // Time and Date
  today: 'Сьогодні',
  yesterday: 'Вчора',
  thisWeek: 'На цьому тижні',
  thisMonth: 'Цього місяця',
  lastMonth: 'Минулого місяця',
  
  // File Types
  audio: 'Аудіо',
  video: 'Відео',
  document: 'Документ',
  image: 'Зображення',
  
  // Languages
  language: 'Мова',
  english: 'Англійська',
  spanish: 'Іспанська',
  german: 'Німецька',
  french: 'Французька',
  russian: 'Російська',
  ukrainian: 'Українська',
  lithuanian: 'Литовська',
  polish: 'Польська',
  
  // Error Messages
  errorOccurred: 'Сталася помилка',
  tryAgain: 'Будь ласка, спробуйте ще раз',
  networkError: 'Помилка мережі',
  permissionDenied: 'Доступ заборонено',
  fileTooLarge: 'Файл занадто великий',
  invalidFormat: 'Невірний формат',
  
  // Success Messages
  savedSuccessfully: 'Успішно збережено',
  deletedSuccessfully: 'Успішно видалено',
  uploadedSuccessfully: 'Успішно завантажено',
  downloadedSuccessfully: 'Успішно завантажено',
  
  // Confirmation Dialogs
  confirmDelete: 'Ви впевнені, що хочете видалити це?',
  confirmLogout: 'Ви впевнені, що хочете вийти?',
  confirmClear: 'Ви впевнені, що хочете очистити це?',
  
  // Placeholders
  searchPlaceholder: 'Пошук...',
  notePlaceholder: 'Напишіть вашу нотатку тут...',
  transcriptionPlaceholder: 'Транскрипція з\'явиться тут...',
  
  // Tooltips
  startRecordingTooltip: 'Почати запис аудіо',
  stopRecordingTooltip: 'Зупинити запис аудіо',
  copyTooltip: 'Копіювати в буфер обміну',
  downloadTooltip: 'Завантажити файл',
  deleteTooltip: 'Видалити елемент',
  editTooltip: 'Редагувати елемент',
  
  // Accessibility
  ariaStartRecording: 'Кнопка початку запису',
  ariaStopRecording: 'Кнопка зупинки запису',
  ariaCopyTranscription: 'Кнопка копіювання транскрипції',
  ariaDownloadTranscription: 'Кнопка завантаження транскрипції',
  ariaClearTranscription: 'Кнопка очищення транскрипції',
  
  // Cost and Pricing
  estimatedCost: 'Приблизна вартість',
  actualCost: 'Фактична вартість',
  costPerMinute: 'Вартість за хвилину',
  totalCost: 'Загальна вартість',
  
  // Audio Processing
  audioProcessing: 'Обробка аудіо',
  processingAudio: 'Обробка аудіо...',
  audioProcessed: 'Аудіо успішно оброблено',
  processingFailed: 'Обробка не вдалася',
  
  // Speaker Recognition
  speakerRecognition: 'Розпізнавання мовців',
  speaker1: 'Мовець 1',
  speaker2: 'Мовець 2',
  speaker3: 'Мовець 3',
  speaker4: 'Мовець 4',
  unknownSpeaker: 'Невідомий мовець',
  
  // Quality Settings
  qualitySettings: 'Налаштування якості',
  highQuality: 'Висока якість',
  mediumQuality: 'Середня якість',
  lowQuality: 'Низька якість',
  
  // Export Options
  exportOptions: 'Варіанти експорту',
  exportAsPDF: 'Експорт у PDF',
  exportAsTXT: 'Експорт у TXT',
  exportAsSRT: 'Експорт у SRT',
  exportAsVTT: 'Експорт у VTT',
  
  // Privacy and Security
  privacy: 'Конфіденційність',
  securitySettings: 'Безпека',
  encryption: 'Шифрування',
  dataProtection: 'Захист даних',
  gdprCompliant: 'Відповідає GDPR',
  hipaaCompliant: 'Відповідає HIPAA',
  
  // Support
  support: 'Підтримка',
  help: 'Допомога',
  documentation: 'Документація',
  contactSupport: 'Зв\'язатися з підтримкою',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Сповіщення',
  notificationSettings: 'Налаштування сповіщень',
  emailNotifications: 'Email сповіщення',
  pushNotifications: 'Push сповіщення',
  
  // Theme
  theme: 'Тема',
  lightMode: 'Світлий режим',
  darkMode: 'Темний режим',
  systemTheme: 'Системна тема',
  
  // User Interface
  sidebar: 'Бічна панель',
  mainContent: 'Основний контент',
  header: 'Заголовок',
  footer: 'Підвал',
  navigation: 'Навігація',
  
  // Data Management
  dataManagement: 'Управління даними',
  backup: 'Резервна копія',
  restore: 'Відновити',
  sync: 'Синхронізація',
  import: 'Імпорт',
  export: 'Експорт',
  
  // Performance
  performance: 'Продуктивність',
  speed: 'Швидкість',
  accuracy: 'Точність',
  reliability: 'Надійність',
  
  // Features
  features: 'Функції',
  realTimeTranscription: 'Транскрипція в реальному часі',
  speakerDiarization: 'Діаризація мовців',
  automaticSummarization: 'Автоматичне створення резюме',
  multiLanguageSupport: 'Багатомовна підтримка',
  secureStorage: 'Безпечне сховище',
  
  // Plans and Pricing
  plans: 'Плани',
  pricing: 'Ціни',
  freePlan: 'Безкоштовний план',
  proPlan: 'Pro план',
  enterprisePlan: 'Корпоративний план',
  customPlan: 'Користувацький план',
  
  // Usage Limits
  usageLimits: 'Ліміти використання',
  monthlyLimit: 'Місячний ліміт',
  dailyLimit: 'Денний ліміт',
  hourlyLimit: 'Годинний ліміт',
  
  // API and Integration
  api: 'API',
  integration: 'Інтеграція',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Документація',
  
  // Compliance
  compliance: 'Відповідність',
  certifications: 'Сертифікації',
  audits: 'Аудити',
  policies: 'Політики',
  
  // Updates and Maintenance
  updates: 'Оновлення',
  maintenance: 'Обслуговування',
  changelog: 'Журнал змін',
  version: 'Версія',
  
  // Feedback
  feedback: 'Зворотній зв\'язок',
  rating: 'Рейтинг',
  review: 'Відгук',
  suggestion: 'Пропозиція',
  bugReport: 'Звіт про помилку',
  
  // Onboarding
  onboarding: 'Онбординг',
  welcomeTour: 'Привітальний тур',
  gettingStarted: 'Почати',
  tutorial: 'Навчальний посібник',
  guide: 'Посібник',
  
  // Empty States
  noData: 'Дані недоступні',
  noTranscriptions: 'Поки що немає транскрипцій',
  noNotes: 'Поки що немає нотаток',
  noAnalytics: 'Поки що немає даних аналітики',
  noBillingHistory: 'Поки що немає історії білінгу',
  
  // Loading States
  loadingTranscriptions: 'Завантаження транскрипцій...',
  loadingNotes: 'Завантаження нотаток...',
  loadingAnalytics: 'Завантаження аналітики...',
  loadingBilling: 'Завантаження інформації про білінг...',
  
  // Validation Messages
  required: 'Це поле обов\'язкове',
  invalidEmail: 'Невірна адреса email',
  invalidPassword: 'Невірний пароль',
  passwordMismatch: 'Паролі не співпадають',
  minLength: 'Мінімальна довжина {min} символів',
  maxLength: 'Максимальна довжина {max} символів',
  
  // Network Status
  online: 'В мережі',
  offline: 'Не в мережі',
  connecting: 'Підключення...',
  reconnecting: 'Перепідключення...',
  
  // File Operations
  fileUpload: 'Завантаження файлу',
  fileDownload: 'Завантаження файлу',
  fileProcessing: 'Обробка файлу',
  fileConversion: 'Конвертація файлу',
  
  // Audio Controls
  play: 'Відтворити',
  pause: 'Пауза',
  stop: 'Стоп',
  volume: 'Гучність',
  mute: 'Без звуку',
  unmute: 'Увімкнути звук',
  
  // Time Display
  seconds: 'секунд',
  minutes: 'хвилин',
  hours: 'годин',
  days: 'днів',
  weeks: 'тижнів',
  months: 'місяців',
  years: 'років',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'багато',
  
  // Directions
  up: 'Вгору',
  down: 'Вниз',
  left: 'Вліво',
  right: 'Вправо',
  next: 'Наступний',
  previous: 'Попередній',
  back: 'Назад',
  forward: 'Вперед',
  
  // Sizes
  small: 'Малий',
  medium: 'Середній',
  large: 'Великий',
  extraLarge: 'Дуже великий',
  
  // Colors
  red: 'Червоний',
  green: 'Зелений',
  blue: 'Синій',
  yellow: 'Жовтий',
  orange: 'Помаранчевий',
  purple: 'Фіолетовий',
  pink: 'Рожевий',
  gray: 'Сірий',
  black: 'Чорний',
  white: 'Білий',
  
  // Weather and Time
  morning: 'Ранок',
  afternoon: 'День',
  evening: 'Вечір',
  night: 'Ніч',
  
  // Days of the Week
  monday: 'Понеділок',
  tuesday: 'Вівторок',
  wednesday: 'Середа',
  thursday: 'Четвер',
  friday: 'П\'ятниця',
  saturday: 'Субота',
  sunday: 'Неділя',
  
  // Months
  january: 'Січень',
  february: 'Лютий',
  march: 'Березень',
  april: 'Квітень',
  may: 'Травень',
  june: 'Червень',
  july: 'Липень',
  august: 'Серпень',
  september: 'Вересень',
  october: 'Жовтень',
  november: 'Листопад',
  december: 'Грудень',
  
  // Header and navigation translations
  useCases: 'Варианти Використання',
  medicalProfessionals: 'Медичні Спеціалісти',
  therapists: 'Терапевти',
  lawyers: 'Юристи',
  businessProfessionals: 'Бізнес-Професіонали',
  education: 'Освіта',
  contentCreators: 'Створювачі Контенту',
  researchers: 'Дослідники',
  customerSupport: 'Підтримка Клієнтів',
  login: 'Увійти',
  getStarted: 'Почати',
  getStartedFree: 'Почати Безкоштовно',
  signIn: 'Увійти в Систему',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Двофакторна аутентифікація',
    description: 'Введіть ваш 6-значний код аутентифікації для доступу до конфіденційних даних',
    required: 'Потрібна двофакторна аутентифікація',
    enterCodeToAccessNotes: 'Введіть ваш 6-значний код для доступу до нотаток',
    enterCodeToAccessTranscriptions: 'Введіть ваш 6-значний код для доступу до транскрипцій',
    enterCode: 'Введіть 6-значний код',
    verifyCode: 'Перевірити код',
    useBackupCode: 'Або використати резервний код',
    enterBackupCode: 'Введіть резервний код',
    getCodeFromApp: 'Отримайте ваш код з Google Authenticator, Authy або вашого улюбленого 2FA додатку',
    setupLink: 'Потрібно налаштувати 2FA? Перейдіть до Налаштувань',
    step1Title: 'Крок 1: Сканувати QR-код',
    step1Description: 'Відкрийте ваш додаток аутентифікації та відскануйте цей QR-код, щоб додати ваш акаунт',
    enterManually: 'Або ввести вручну',
    codeAdded: 'Я додав код',
    cancel: 'Скасувати',
    step2Title: 'Крок 2: Зберегти резервні коди',
    step2Description: 'Збережіть ці резервні коди в безпечному місці. Ви можете використовувати їх для доступу до вашого акаунту, якщо втратите ваше 2FA пристрій.',
    backupCodes: 'Резервні коди',
    completeSetup: 'Завершити налаштування',
    back: 'Назад',
    setupDataError: 'Не вдалося згенерувати дані налаштування 2FA',
    tooManyAttempts: 'Занадто багато невдалих спроб. Будь ласка, зачекайте',
    minutesWait: 'хвилин.',
    enter6DigitCode: 'Будь ласка, введіть 6-значний код',
    verificationSuccessful: '2FA верифікація успішна',
    invalidCode: 'Невірний код.',
    attemptsRemaining: 'спроб залишилося.',
    verificationFailed: 'Верифікація не вдалася. Будь ласка, спробуйте знову.',
    backupVerificationSuccessful: 'Верифікація резервного коду успішна',
    invalidBackupCode: 'Невірний резервний код',
    backupVerificationFailed: 'Верифікація резервного коду не вдалася',
    copiedToClipboard: 'Скопійовано в буфер обміну',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Не вдалося завантажити транскрипції',
  transcriptionCopiedToClipboard: 'Транскрипцію скопіровано в буфер обміну',
  failedToCopyToClipboard: 'Не вдалося скопіювати в буфер обміну',
  transcriptionDownloaded: 'Транскрипцію завантажено як',
  failedToDownloadTranscription: 'Не вдалося завантажити транскрипцію',
  noContentAvailable: 'Контент недоступний',
  failedToSwitchMicrophone: 'Не вдалося перемкнути мікрофон. Будь ласка, спробуйте ще раз.',
  failedToLoadNotes: 'Не вдалося завантажити нотатки',
} as const 