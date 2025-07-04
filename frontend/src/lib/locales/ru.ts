export default {
  // Dashboard Navigation
  dashboard: 'Панель управления',
  transcriptions: 'Транскрипции',
  notes: 'Заметки',
  analytics: 'Аналитика',
  billing: 'Биллинг',
  credits: 'Кредиты',
  account: 'Аккаунт',
  enterprise: 'Предприятие',
  
  // Dashboard Recording
  audioRecording: 'Запись аудио',
  recordAudioForTranscription: 'Записать аудио для транскрипции',
  recordingInProgress: 'Запись в процессе...',
  deviceAudio: 'Аудио устройства',
  microphone: 'Микрофон',
  noNotesGeneratedYet: 'Заметки еще не созданы.',
  noTranscriptionGeneratedYet: 'Транскрипция еще не создана.',
  noSummaryGeneratedYet: 'Резюме еще не создано.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Транскрипция аудио',
  transcriptionHistory: 'История транскрипций',
  notesHistory: 'История заметок',
  topUpCredits: 'Пополнить кредиты',
  tools: 'Инструменты',
  dataSafety: 'Безопасность данных',
  downloadOptions: 'Варианты загрузки',
  configureStorage: 'Настроить хранилище',
  
  // Sidebar and UI
  toggleTheme: 'Переключить тему',
  notesMode: 'Режим заметок',
  transcriptionMode: 'Режим транскрипции',
  switchToTranscriptionMode: 'Переключиться в режим транскрипции: отображать как разговор с метками говорящих',
  switchToNotesMode: 'Переключиться в режим заметок: отображать как сплошной текст для ведения заметок',
  moreThanTwoSpeakersTooltip: 'Включите это, если ваше аудио содержит более двух говорящих. Это помогает улучшить точность диаризации говорящих, предотвращая ошибочное добавление системой дополнительных говорящих из-за фонового шума или кратковременных звуковых расхождений.',
  recordDeviceAudioTooltip: 'Включите это для записи системного аудио (музыка, видео, звонки) в дополнение к вводу с микрофона. Это позволяет захватывать как ваш голос, так и аудио, воспроизводимое на вашем устройстве.',
  
  // Dashboard Main Page
  welcome: 'Добро пожаловать обратно',
  startRecording: 'Начать запись',
  stopRecording: 'Остановить запись',
  recording: 'Запись...',
  processing: 'Обработка...',
  generatingSummary: 'Создание резюме...',
  generatingPDF: 'Создание PDF...',
  
  // Recording Controls
  selectMicrophone: 'Выбрать микрофон',
  defaultMicrophone: 'Микрофон по умолчанию',
  recordingDuration: 'Продолжительность записи',
  recordingStatus: 'Статус записи',
  
  // Transcription
  transcription: 'Транскрипция',
  noTranscription: 'Транскрипция недоступна',
  copyTranscription: 'Копировать транскрипцию',
  downloadTranscription: 'Скачать транскрипцию',
  clearTranscription: 'Очистить транскрипцию',
  transcriptionCopied: 'Транскрипция скопирована в буфер обмена',
  
  // Summary
  summary: 'Резюме',
  generateSummary: 'Создать резюме',
  noSummary: 'Резюме недоступно',
  summaryGenerated: 'Резюме успешно создано',
  downloadPDF: 'Скачать PDF',
  
  // Notes
  addNote: 'Добавить заметку',
  editNote: 'Редактировать заметку',
  deleteNote: 'Удалить заметку',
  saveNote: 'Сохранить заметку',
  noteSaved: 'Заметка успешно сохранена',
  noteDeleted: 'Заметка успешно удалена',
  notesWillAppearHere: 'Заметки появятся здесь',
  transcriptionWillAppearHere: 'Транскрипция появится здесь',
  
  // Credits
  availableCredits: 'Доступные кредиты',
  creditsUsed: 'Использованные кредиты',
  buyCredits: 'Купить кредиты',
  creditHistory: 'История кредитов',
  insufficientCredits: 'Недостаточно кредитов',
  
  // Settings
  settings: {
    title: 'Настройки',
    subtitle: 'Настройте ваши предпочтения для транскрипции и приложения',
    aiFeatures: 'Функции ИИ',
    aiFeaturesDescription: 'Настроить функции транскрипции на базе ИИ',
    autoSummarize: 'Автоматически создавать резюме',
    autoSummarizeDescription: 'Автоматически генерировать резюме',
    moreThanTwoSpeakers: 'Более двух говорящих',
    moreThanTwoSpeakersDescription: 'Улучшенное определение говорящих',
    recordDeviceAudio: 'Записывать аудио устройства',
    recordDeviceAudioDescription: 'Захватывать системное аудио',
    dataSafety: 'Безопасность данных',
    dataSafetyDescription: 'Контролируйте, как ваши данные хранятся и обрабатываются',
    saveTranscripts: 'Сохранять транскрипции',
    saveTranscriptsDescription: 'Безопасно хранить транскрипции',
    saveAudioToStorage: 'Сохранять аудио в хранилище',
    saveAudioToStorageDescription: 'Безопасно хранить аудиофайлы',
    autoDownloadRecordings: 'Автоматически скачивать записи',
    autoDownloadRecordingsDescription: 'Автоматически сохранять записи на устройство после завершения',
    autoDownloadTranscripts: 'Автоматически скачивать транскрипции',
    autoDownloadTranscriptsDescription: 'Автоматически сохранять транскрипции на устройство после завершения записи и транскрипции',
    twoFactorAuth: 'Двухфакторная аутентификация',
    twoFactorAuthDescription: 'Защитите свой аккаунт с помощью 2FA',
    '2faStatus': 'Статус 2FA',
    enabled: 'Включено',
    notSetUp: 'Не настроено',
    active: 'Активно',
    inactive: 'Неактивно',
    '2faActive': '2FA активно',
    '2faActiveDescription': 'Ваш аккаунт защищен двухфакторной аутентификацией.',
    '2faNotSetUp': '2FA не настроена',
    '2faNotSetUpDescription': 'Включите двухфакторную аутентификацию для повышенной безопасности.',
    manage2FA: 'Управление 2FA',
    setUp2FA: 'Настроить 2FA',
    privacyInformation: 'Информация о конфиденциальности',
    privacyInformationDescription: 'Узнайте о наших практиках конфиденциальности',
    endToEndEncryption: 'Сквозное шифрование',
    endToEndEncryptionDescription: 'Все ваши данные зашифрованы с помощью AES-256 шифрования и никогда не хранятся в открытом виде.',
    gdprHipaaCompliant: 'Соответствует GDPR и HIPAA',
    gdprHipaaCompliantDescription: 'Наша платформа соответствует высочайшим стандартам защиты данных и конфиденциальности.',
    viewDocumentation: 'Просмотр документации',
    enterpriseAccess: 'Корпоративный доступ',
    enterpriseAccessDescription: 'Обновитесь до корпоративной версии для расширенных функций',
    enterpriseFeatures: 'Корпоративные функции',
    enterpriseFeaturesDescription: 'Настройка корпоративных параметров',
    storageConfiguration: 'Конфигурация хранилища',
    storageConfigurationDescription: 'Настройте собственное S3-совместимое хранилище для полного суверенитета данных.',
    configureStorage: 'Настроить хранилище',
    teamManagement: 'Управление командой',
    teamManagementDescription: 'Управляйте корпоративной командой и разрешениями',
    userManagement: 'Управление пользователями',
    userManagementDescription: 'Добавляйте, удаляйте и управляйте участниками команды с контролем доступа на основе ролей.',
    manageUsers: 'Управление пользователями',
    customS3Storage: 'Пользовательская конфигурация S3 хранилища',
    teamManagementRoles: 'Управление командой и роли пользователей',
    advancedAnalytics: 'Расширенная аналитика и отчетность',
    prioritySupport: 'Приоритетная поддержка и SLA',
    customIntegrations: 'Пользовательские интеграции и доступ к API',
    contactSales: 'Связаться с продажами',
  },
  
  // Analytics
  transcriptionStats: 'Статистика транскрипций',
  usageStats: 'Статистика использования',
  monthlyUsage: 'Месячное использование',
  totalTranscriptions: 'Всего транскрипций',
  totalNotes: 'Всего заметок',
  
  // Billing
  currentPlan: 'Текущий план',
  upgradePlan: 'Обновить план',
  billingHistory: 'История биллинга',
  paymentMethod: 'Способ оплаты',
  
  // Account
  profile: 'Профиль',
  security: 'Безопасность',
  preferences: 'Предпочтения',
  logout: 'Выйти',
  
  // Enterprise
  teamManagement: 'Управление командой',
  adminPanel: 'Панель администратора',
  userManagement: 'Управление пользователями',
  
  // Common Actions
  save: 'Сохранить',
  cancel: 'Отмена',
  delete: 'Удалить',
  edit: 'Редактировать',
  add: 'Добавить',
  remove: 'Удалить',
  download: 'Скачать',
  upload: 'Загрузить',
  search: 'Поиск',
  filter: 'Фильтр',
  sort: 'Сортировка',
  
  // Status Messages
  loading: 'Загрузка...',
  error: 'Ошибка',
  success: 'Успех',
  warning: 'Предупреждение',
  info: 'Информация',
  
  // Time and Date
  today: 'Сегодня',
  yesterday: 'Вчера',
  thisWeek: 'На этой неделе',
  thisMonth: 'В этом месяце',
  lastMonth: 'В прошлом месяце',
  
  // File Types
  audio: 'Аудио',
  video: 'Видео',
  document: 'Документ',
  image: 'Изображение',
  
  // Languages
  language: 'Язык',
  english: 'Английский',
  spanish: 'Испанский',
  german: 'Немецкий',
  french: 'Французский',
  russian: 'Русский',
  ukrainian: 'Украинский',
  lithuanian: 'Литовский',
  polish: 'Польский',
  
  // Error Messages
  errorOccurred: 'Произошла ошибка',
  tryAgain: 'Пожалуйста, попробуйте снова',
  networkError: 'Ошибка сети',
  permissionDenied: 'Доступ запрещен',
  fileTooLarge: 'Файл слишком большой',
  invalidFormat: 'Неверный формат',
  
  // Success Messages
  savedSuccessfully: 'Успешно сохранено',
  deletedSuccessfully: 'Успешно удалено',
  uploadedSuccessfully: 'Успешно загружено',
  downloadedSuccessfully: 'Успешно скачано',
  
  // Confirmation Dialogs
  confirmDelete: 'Вы уверены, что хотите удалить это?',
  confirmLogout: 'Вы уверены, что хотите выйти?',
  confirmClear: 'Вы уверены, что хотите очистить это?',
  
  // Placeholders
  searchPlaceholder: 'Поиск...',
  notePlaceholder: 'Напишите вашу заметку здесь...',
  transcriptionPlaceholder: 'Транскрипция появится здесь...',
  
  // Tooltips
  startRecordingTooltip: 'Начать запись аудио',
  stopRecordingTooltip: 'Остановить запись аудио',
  copyTooltip: 'Копировать в буфер обмена',
  downloadTooltip: 'Скачать файл',
  deleteTooltip: 'Удалить элемент',
  editTooltip: 'Редактировать элемент',
  
  // Accessibility
  ariaStartRecording: 'Кнопка начала записи',
  ariaStopRecording: 'Кнопка остановки записи',
  ariaCopyTranscription: 'Кнопка копирования транскрипции',
  ariaDownloadTranscription: 'Кнопка скачивания транскрипции',
  ariaClearTranscription: 'Кнопка очистки транскрипции',
  
  // Cost and Pricing
  estimatedCost: 'Предполагаемая стоимость',
  actualCost: 'Фактическая стоимость',
  costPerMinute: 'Стоимость за минуту',
  totalCost: 'Общая стоимость',
  
  // Audio Processing
  audioProcessing: 'Обработка аудио',
  processingAudio: 'Обработка аудио...',
  audioProcessed: 'Аудио успешно обработано',
  processingFailed: 'Обработка не удалась',
  
  // Speaker Recognition
  speakerRecognition: 'Распознавание говорящих',
  speaker1: 'Говорящий 1',
  speaker2: 'Говорящий 2',
  speaker3: 'Говорящий 3',
  speaker4: 'Говорящий 4',
  unknownSpeaker: 'Неизвестный говорящий',
  
  // Quality Settings
  qualitySettings: 'Настройки качества',
  highQuality: 'Высокое качество',
  mediumQuality: 'Среднее качество',
  lowQuality: 'Низкое качество',
  
  // Export Options
  exportOptions: 'Варианты экспорта',
  exportAsPDF: 'Экспорт в PDF',
  exportAsTXT: 'Экспорт в TXT',
  exportAsSRT: 'Экспорт в SRT',
  exportAsVTT: 'Экспорт в VTT',
  
  // Privacy and Security
  privacy: 'Конфиденциальность',
  securitySettings: 'Безопасность',
  encryption: 'Шифрование',
  dataProtection: 'Защита данных',
  gdprCompliant: 'Соответствует GDPR',
  hipaaCompliant: 'Соответствует HIPAA',
  
  // Support
  support: 'Поддержка',
  help: 'Помощь',
  documentation: 'Документация',
  contactSupport: 'Связаться с поддержкой',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Уведомления',
  notificationSettings: 'Настройки уведомлений',
  emailNotifications: 'Email уведомления',
  pushNotifications: 'Push уведомления',
  
  // Theme
  theme: 'Тема',
  lightMode: 'Светлый режим',
  darkMode: 'Темный режим',
  systemTheme: 'Системная тема',
  
  // User Interface
  sidebar: 'Боковая панель',
  mainContent: 'Основной контент',
  header: 'Заголовок',
  footer: 'Подвал',
  navigation: 'Навигация',
  
  // Data Management
  dataManagement: 'Управление данными',
  backup: 'Резервная копия',
  restore: 'Восстановить',
  sync: 'Синхронизация',
  import: 'Импорт',
  export: 'Экспорт',
  
  // Performance
  performance: 'Производительность',
  speed: 'Скорость',
  accuracy: 'Точность',
  reliability: 'Надежность',
  
  // Features
  features: 'Функции',
  realTimeTranscription: 'Транскрипция в реальном времени',
  speakerDiarization: 'Диаризация говорящих',
  automaticSummarization: 'Автоматическое создание резюме',
  multiLanguageSupport: 'Многоязычная поддержка',
  secureStorage: 'Безопасное хранилище',
  
  // Plans and Pricing
  plans: 'Планы',
  pricing: 'Цены',
  freePlan: 'Бесплатный план',
  proPlan: 'Pro план',
  enterprisePlan: 'Корпоративный план',
  customPlan: 'Пользовательский план',
  
  // Usage Limits
  usageLimits: 'Лимиты использования',
  monthlyLimit: 'Месячный лимит',
  dailyLimit: 'Дневной лимит',
  hourlyLimit: 'Часовой лимит',
  
  // API and Integration
  api: 'API',
  integration: 'Интеграция',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Документация',
  
  // Compliance
  compliance: 'Соответствие',
  certifications: 'Сертификации',
  audits: 'Аудиты',
  policies: 'Политики',
  
  // Updates and Maintenance
  updates: 'Обновления',
  maintenance: 'Обслуживание',
  changelog: 'Журнал изменений',
  version: 'Версия',
  
  // Feedback
  feedback: 'Обратная связь',
  rating: 'Рейтинг',
  review: 'Отзыв',
  suggestion: 'Предложение',
  bugReport: 'Отчет об ошибке',
  
  // Onboarding
  onboarding: 'Онбординг',
  welcomeTour: 'Приветственный тур',
  gettingStarted: 'Начать',
  tutorial: 'Учебник',
  guide: 'Руководство',
  
  // Empty States
  noData: 'Данные недоступны',
  noTranscriptions: 'Пока нет транскрипций',
  noNotes: 'Пока нет заметок',
  noAnalytics: 'Пока нет данных аналитики',
  noBillingHistory: 'Пока нет истории биллинга',
  
  // Loading States
  loadingTranscriptions: 'Загрузка транскрипций...',
  loadingNotes: 'Загрузка заметок...',
  loadingAnalytics: 'Загрузка аналитики...',
  loadingBilling: 'Загрузка информации о биллинге...',
  
  // Validation Messages
  required: 'Это поле обязательно',
  invalidEmail: 'Неверный адрес email',
  invalidPassword: 'Неверный пароль',
  passwordMismatch: 'Пароли не совпадают',
  minLength: 'Минимальная длина {min} символов',
  maxLength: 'Максимальная длина {max} символов',
  
  // Network Status
  online: 'В сети',
  offline: 'Не в сети',
  connecting: 'Подключение...',
  reconnecting: 'Переподключение...',
  
  // File Operations
  fileUpload: 'Загрузка файла',
  fileDownload: 'Скачивание файла',
  fileProcessing: 'Обработка файла',
  fileConversion: 'Конвертация файла',
  
  // Audio Controls
  play: 'Воспроизвести',
  pause: 'Пауза',
  stop: 'Стоп',
  volume: 'Громкость',
  mute: 'Без звука',
  unmute: 'Включить звук',
  
  // Time Display
  seconds: 'секунд',
  minutes: 'минут',
  hours: 'часов',
  days: 'дней',
  weeks: 'недель',
  months: 'месяцев',
  years: 'лет',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'много',
  
  // Directions
  up: 'Вверх',
  down: 'Вниз',
  left: 'Влево',
  right: 'Вправо',
  next: 'Следующий',
  previous: 'Предыдущий',
  back: 'Назад',
  forward: 'Вперед',
  
  // Sizes
  small: 'Маленький',
  medium: 'Средний',
  large: 'Большой',
  extraLarge: 'Очень большой',
  
  // Colors
  red: 'Красный',
  green: 'Зеленый',
  blue: 'Синий',
  yellow: 'Желтый',
  orange: 'Оранжевый',
  purple: 'Фиолетовый',
  pink: 'Розовый',
  gray: 'Серый',
  black: 'Черный',
  white: 'Белый',
  
  // Weather and Time
  morning: 'Утро',
  afternoon: 'День',
  evening: 'Вечер',
  night: 'Ночь',
  
  // Days of the Week
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
  
  // Months
  january: 'Январь',
  february: 'Февраль',
  march: 'Март',
  april: 'Апрель',
  may: 'Май',
  june: 'Июнь',
  july: 'Июль',
  august: 'Август',
  september: 'Сентябрь',
  october: 'Октябрь',
  november: 'Ноябрь',
  december: 'Декабрь',
  
  // Header and navigation translations
  useCases: 'Варианты Использования',
  medicalProfessionals: 'Медицинские Специалисты',
  therapists: 'Терапевты',
  lawyers: 'Юристы',
  businessProfessionals: 'Бизнес-Профессионалы',
  education: 'Образование',
  contentCreators: 'Создатели Контента',
  researchers: 'Исследователи',
  customerSupport: 'Поддержка Клиентов',
  login: 'Войти',
  getStarted: 'Начать',
  getStartedFree: 'Начать Бесплатно',
  signIn: 'Войти в Систему',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Двухфакторная аутентификация',
    description: 'Введите ваш 6-значный код аутентификации для доступа к конфиденциальным данным',
    required: 'Требуется двухфакторная аутентификация',
    enterCodeToAccessNotes: 'Введите ваш 6-значный код для доступа к заметкам',
    enterCodeToAccessTranscriptions: 'Введите ваш 6-значный код для доступа к транскрипциям',
    enterCode: 'Введите 6-значный код',
    verifyCode: 'Проверить код',
    useBackupCode: 'Или используйте резервный код',
    enterBackupCode: 'Введите резервный код',
    getCodeFromApp: 'Получите ваш код из Google Authenticator, Authy или вашего предпочтительного 2FA приложения',
    setupLink: 'Нужно настроить 2FA? Перейдите в Настройки',
    step1Title: 'Шаг 1: Сканировать QR-код',
    step1Description: 'Откройте ваше приложение-аутентификатор и отсканируйте этот QR-код, чтобы добавить ваш аккаунт',
    enterManually: 'Или введите вручную',
    codeAdded: 'Я добавил код',
    cancel: 'Отмена',
    step2Title: 'Шаг 2: Сохранить резервные коды',
    step2Description: 'Сохраните эти резервные коды в безопасном месте. Вы можете использовать их для доступа к вашему аккаунту, если потеряете ваше 2FA устройство.',
    backupCodes: 'Резервные коды',
    completeSetup: 'Завершить настройку',
    back: 'Назад',
    setupDataError: 'Не удалось сгенерировать данные настройки 2FA',
    tooManyAttempts: 'Слишком много неудачных попыток. Пожалуйста, подождите',
    minutesWait: 'минут.',
    enter6DigitCode: 'Пожалуйста, введите 6-значный код',
    verificationSuccessful: '2FA верификация успешна',
    invalidCode: 'Неверный код.',
    attemptsRemaining: 'попыток осталось.',
    verificationFailed: 'Верификация не удалась. Пожалуйста, попробуйте снова.',
    backupVerificationSuccessful: 'Верификация резервного кода успешна',
    invalidBackupCode: 'Неверный резервный код',
    backupVerificationFailed: 'Верификация резервного кода не удалась',
    copiedToClipboard: 'Скопировано в буфер обмена',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Не удалось загрузить транскрипции',
  transcriptionCopiedToClipboard: 'Транскрипция скопирована в буфер обмена',
  failedToCopyToClipboard: 'Не удалось скопировать в буфер обмена',
  transcriptionDownloaded: 'Транскрипция загружена как',
  failedToDownloadTranscription: 'Не удалось загрузить транскрипцию',
  noContentAvailable: 'Контент недоступен',
  failedToSwitchMicrophone: 'Не удалось переключить микрофон. Пожалуйста, попробуйте снова.',
  failedToLoadNotes: 'Не удалось загрузить заметки',
} as const 