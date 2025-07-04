export default {
  // Dashboard Navigation
  dashboard: 'Panel de Control',
  transcriptions: 'Transcripciones',
  notes: 'Notas',
  analytics: 'Análisis',
  billing: 'Facturación',
  credits: 'Créditos',
  account: 'Cuenta',
  enterprise: 'Empresa',
  
  // Dashboard Recording
  audioRecording: 'Grabación de Audio',
  recordAudioForTranscription: 'Grabar audio para transcripción',
  recordingInProgress: 'Grabación en progreso...',
  deviceAudio: 'Audio del Dispositivo',
  microphone: 'Micrófono',
  noNotesGeneratedYet: 'Aún no se han generado notas.',
  noTranscriptionGeneratedYet: 'Aún no se ha generado transcripción.',
  noSummaryGeneratedYet: 'Aún no se ha generado resumen.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Transcripción de Audio',
  transcriptionHistory: 'Historial de Transcripciones',
  notesHistory: 'Historial de Notas',
  topUpCredits: 'Recargar Créditos',
  tools: 'Herramientas',
  dataSafety: 'Seguridad de Datos',
  downloadOptions: 'Opciones de Descarga',
  configureStorage: 'Configurar Almacenamiento',
  
  // Sidebar and UI
  toggleTheme: 'Cambiar tema',
  notesMode: 'Modo Notas',
  transcriptionMode: 'Modo Transcripción',
  switchToTranscriptionMode: 'Cambiar a Modo Transcripción: Mostrar como conversación con etiquetas de hablantes',
  switchToNotesMode: 'Cambiar a Modo Notas: Mostrar como texto continuo para tomar notas',
  moreThanTwoSpeakersTooltip: 'Habilita esto si tu audio contiene más de dos hablantes. Esto ayuda a mejorar la precisión de la diarización de hablantes al evitar que el sistema agregue erróneamente hablantes adicionales debido al ruido de fondo o discrepancias breves de sonido.',
  recordDeviceAudioTooltip: 'Habilita esto para grabar audio del sistema (música, videos, llamadas) además de la entrada del micrófono. Esto te permite capturar tanto tu voz como el audio que se reproduce en tu dispositivo.',
  
  // Dashboard Main Page
  welcome: 'Bienvenido de vuelta',
  startRecording: 'Iniciar Grabación',
  stopRecording: 'Detener Grabación',
  recording: 'Grabando...',
  processing: 'Procesando...',
  generatingSummary: 'Generando Resumen...',
  generatingPDF: 'Generando PDF...',
  
  // Recording Controls
  selectMicrophone: 'Seleccionar Micrófono',
  defaultMicrophone: 'Micrófono Predeterminado',
  recordingDuration: 'Duración de Grabación',
  recordingStatus: 'Estado de Grabación',
  
  // Transcription
  transcription: 'Transcripción',
  noTranscription: 'No hay transcripción disponible',
  copyTranscription: 'Copiar Transcripción',
  downloadTranscription: 'Descargar Transcripción',
  clearTranscription: 'Limpiar Transcripción',
  transcriptionCopied: 'Transcripción copiada al portapapeles',
  
  // Summary
  summary: 'Resumen',
  generateSummary: 'Generar Resumen',
  noSummary: 'No hay resumen disponible',
  summaryGenerated: 'Resumen generado exitosamente',
  downloadPDF: 'Descargar PDF',
  
  // Notes
  addNote: 'Agregar Nota',
  editNote: 'Editar Nota',
  deleteNote: 'Eliminar Nota',
  saveNote: 'Guardar Nota',
  noteSaved: 'Nota guardada exitosamente',
  noteDeleted: 'Nota eliminada exitosamente',
  notesWillAppearHere: 'Las notas aparecerán aquí',
  transcriptionWillAppearHere: 'La transcripción aparecerá aquí',
  
  // Credits
  availableCredits: 'Créditos Disponibles',
  creditsUsed: 'Créditos Utilizados',
  buyCredits: 'Comprar Créditos',
  creditHistory: 'Historial de Créditos',
  insufficientCredits: 'Créditos insuficientes',
  
  // Settings
  settings: {
    title: 'Configuración',
    subtitle: 'Configura tus preferencias de transcripción y aplicación',
    aiFeatures: 'Funciones de IA',
    aiFeaturesDescription: 'Configurar funciones de transcripción impulsadas por IA',
    autoSummarize: 'Resumir automáticamente',
    autoSummarizeDescription: 'Generar resúmenes automáticamente',
    moreThanTwoSpeakers: 'Más de dos hablantes',
    moreThanTwoSpeakersDescription: 'Detección mejorada de hablantes',
    recordDeviceAudio: 'Grabar audio del dispositivo',
    recordDeviceAudioDescription: 'Capturar audio del sistema',
    dataSafety: 'Seguridad de datos',
    dataSafetyDescription: 'Controla cómo se almacenan y procesan tus datos',
    saveTranscripts: 'Guardar transcripciones',
    saveTranscriptsDescription: 'Almacenar transcripciones de forma segura',
    saveAudioToStorage: 'Guardar audio en almacenamiento',
    saveAudioToStorageDescription: 'Almacenar archivos de audio de forma segura',
    autoDownloadRecordings: 'Descargar grabaciones automáticamente',
    autoDownloadRecordingsDescription: 'Guardar grabaciones en el dispositivo automáticamente después de terminar',
    autoDownloadTranscripts: 'Descargar transcripciones automáticamente',
    autoDownloadTranscriptsDescription: 'Guardar transcripciones en el dispositivo automáticamente después de terminar la grabación y transcripción',
    twoFactorAuth: 'Autenticación de dos factores',
    twoFactorAuthDescription: 'Protege tu cuenta con 2FA',
    '2faStatus': 'Estado 2FA',
    enabled: 'Habilitado',
    notSetUp: 'No configurado',
    active: 'Activo',
    inactive: 'Inactivo',
    '2faActive': '2FA está activo',
    '2faActiveDescription': 'Tu cuenta está protegida con autenticación de dos factores.',
    '2faNotSetUp': '2FA no configurado',
    '2faNotSetUpDescription': 'Habilita la autenticación de dos factores para mayor seguridad.',
    manage2FA: 'Gestionar 2FA',
    setUp2FA: 'Configurar 2FA',
    privacyInformation: 'Información de Privacidad',
    privacyInformationDescription: 'Conoce nuestras prácticas de privacidad',
    endToEndEncryption: 'Cifrado de Extremo a Extremo',
    endToEndEncryptionDescription: 'Todos tus datos están cifrados con cifrado AES-256 y nunca se almacenan en texto plano.',
    gdprHipaaCompliant: 'Cumple con GDPR e HIPAA',
    gdprHipaaCompliantDescription: 'Nuestra plataforma cumple con los más altos estándares de protección de datos y privacidad.',
    viewDocumentation: 'Ver Documentación',
    enterpriseAccess: 'Acceso Empresarial',
    enterpriseAccessDescription: 'Actualiza a empresarial para funciones avanzadas',
    enterpriseFeatures: 'Funciones Empresariales',
    enterpriseFeaturesDescription: 'Configurar ajustes específicos de empresa',
    storageConfiguration: 'Configuración de Almacenamiento',
    storageConfigurationDescription: 'Configura tu propio almacenamiento compatible con S3 para soberanía de datos completa.',
    configureStorage: 'Configurar Almacenamiento',
    teamManagement: 'Gestión de Equipo',
    teamManagementDescription: 'Gestiona tu equipo empresarial y permisos',
    userManagement: 'Gestión de Usuarios',
    userManagementDescription: 'Agrega, elimina y gestiona miembros del equipo con control de acceso basado en roles.',
    manageUsers: 'Gestionar Usuarios',
    customS3Storage: 'Configuración de almacenamiento S3 personalizada',
    teamManagementRoles: 'Gestión de equipo y roles de usuario',
    advancedAnalytics: 'Análisis avanzados y reportes',
    prioritySupport: 'Soporte prioritario y SLA',
    customIntegrations: 'Integraciones personalizadas y acceso a API',
    contactSales: 'Contactar Ventas',
  },
  
  // Analytics
  transcriptionStats: 'Estadísticas de Transcripción',
  usageStats: 'Estadísticas de Uso',
  monthlyUsage: 'Uso Mensual',
  totalTranscriptions: 'Total de Transcripciones',
  totalNotes: 'Total de Notas',
  
  // Billing
  currentPlan: 'Plan Actual',
  upgradePlan: 'Actualizar Plan',
  billingHistory: 'Historial de Facturación',
  paymentMethod: 'Método de Pago',
  
  // Account
  profile: 'Perfil',
  security: 'Seguridad',
  preferences: 'Preferencias',
  logout: 'Cerrar Sesión',
  
  // Enterprise
  teamManagement: 'Gestión de Equipo',
  adminPanel: 'Panel de Administración',
  userManagement: 'Gestión de Usuarios',
  
  // Common Actions
  save: 'Guardar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  edit: 'Editar',
  add: 'Agregar',
  remove: 'Eliminar',
  download: 'Descargar',
  upload: 'Subir',
  search: 'Buscar',
  filter: 'Filtrar',
  sort: 'Ordenar',
  clear: 'Limpiar',
  copy: 'Copiar',
  record: 'Grabar',
  pdf: 'PDF',
  generating: 'Generando...',
  
  // Status Messages
  loading: 'Cargando...',
  error: 'Error',
  success: 'Éxito',
  warning: 'Advertencia',
  info: 'Información',
  
  // Time and Date
  today: 'Hoy',
  yesterday: 'Ayer',
  thisWeek: 'Esta Semana',
  thisMonth: 'Este Mes',
  lastMonth: 'Mes Pasado',
  
  // File Types
  audio: 'Audio',
  video: 'Video',
  document: 'Documento',
  image: 'Imagen',
  
  // Languages
  language: 'Idioma',
  english: 'Inglés',
  spanish: 'Español',
  german: 'Alemán',
  french: 'Francés',
  russian: 'Ruso',
  ukrainian: 'Ucraniano',
  lithuanian: 'Lituano',
  polish: 'Polaco',
  
  // Error Messages
  errorOccurred: 'Ocurrió un error',
  tryAgain: 'Por favor, inténtalo de nuevo',
  networkError: 'Error de red',
  permissionDenied: 'Permiso denegado',
  fileTooLarge: 'Archivo demasiado grande',
  invalidFormat: 'Formato inválido',
  
  // Success Messages
  savedSuccessfully: 'Guardado exitosamente',
  deletedSuccessfully: 'Eliminado exitosamente',
  uploadedSuccessfully: 'Subido exitosamente',
  downloadedSuccessfully: 'Descargado exitosamente',
  
  // Confirmation Dialogs
  confirmDelete: '¿Estás seguro de que quieres eliminar esto?',
  confirmLogout: '¿Estás seguro de que quieres cerrar sesión?',
  confirmClear: '¿Estás seguro de que quieres limpiar esto?',
  
  // Placeholders
  searchPlaceholder: 'Buscar...',
  notePlaceholder: 'Escribe tu nota aquí...',
  transcriptionPlaceholder: 'La transcripción aparecerá aquí...',
  
  // Tooltips
  startRecordingTooltip: 'Iniciar grabación de audio',
  stopRecordingTooltip: 'Detener grabación de audio',
  copyTooltip: 'Copiar al portapapeles',
  downloadTooltip: 'Descargar archivo',
  deleteTooltip: 'Eliminar elemento',
  editTooltip: 'Editar elemento',
  
  // Accessibility
  ariaStartRecording: 'Botón de iniciar grabación',
  ariaStopRecording: 'Botón de detener grabación',
  ariaCopyTranscription: 'Botón de copiar transcripción',
  ariaDownloadTranscription: 'Botón de descargar transcripción',
  ariaClearTranscription: 'Botón de limpiar transcripción',
  
  // Cost and Pricing
  estimatedCost: 'Costo Estimado',
  actualCost: 'Costo Real',
  costPerMinute: 'Costo por minuto',
  totalCost: 'Costo Total',
  
  // Audio Processing
  audioProcessing: 'Procesamiento de Audio',
  processingAudio: 'Procesando audio...',
  audioProcessed: 'Audio procesado exitosamente',
  processingFailed: 'Procesamiento fallido',
  
  // Speaker Recognition
  speakerRecognition: 'Reconocimiento de Hablantes',
  speaker1: 'Hablante 1',
  speaker2: 'Hablante 2',
  speaker3: 'Hablante 3',
  speaker4: 'Hablante 4',
  unknownSpeaker: 'Hablante Desconocido',
  
  // Quality Settings
  qualitySettings: 'Configuración de Calidad',
  highQuality: 'Alta Calidad',
  mediumQuality: 'Calidad Media',
  lowQuality: 'Baja Calidad',
  
  // Export Options
  exportOptions: 'Opciones de Exportación',
  exportAsPDF: 'Exportar como PDF',
  exportAsTXT: 'Exportar como TXT',
  exportAsSRT: 'Exportar como SRT',
  exportAsVTT: 'Exportar como VTT',
  
  // Privacy and Security
  privacy: 'Privacidad',
  securitySettings: 'Seguridad',
  encryption: 'Cifrado',
  dataProtection: 'Protección de Datos',
  gdprCompliant: 'Cumple con GDPR',
  hipaaCompliant: 'Cumple con HIPAA',
  
  // Support
  support: 'Soporte',
  help: 'Ayuda',
  documentation: 'Documentación',
  contactSupport: 'Contactar Soporte',
  faq: 'Preguntas Frecuentes',
  
  // Notifications
  notifications: 'Notificaciones',
  notificationSettings: 'Configuración de Notificaciones',
  emailNotifications: 'Notificaciones por Email',
  pushNotifications: 'Notificaciones Push',
  
  // Theme
  theme: 'Tema',
  lightMode: 'Modo Claro',
  darkMode: 'Modo Oscuro',
  systemTheme: 'Tema del Sistema',
  
  // User Interface
  sidebar: 'Barra Lateral',
  mainContent: 'Contenido Principal',
  header: 'Encabezado',
  footer: 'Pie de Página',
  navigation: 'Navegación',
  
  // Data Management
  dataManagement: 'Gestión de Datos',
  backup: 'Respaldo',
  restore: 'Restaurar',
  sync: 'Sincronizar',
  import: 'Importar',
  export: 'Exportar',
  
  // Performance
  performance: 'Rendimiento',
  speed: 'Velocidad',
  accuracy: 'Precisión',
  reliability: 'Confiabilidad',
  
  // Features
  features: 'Características',
  realTimeTranscription: 'Transcripción en Tiempo Real',
  speakerDiarization: 'Diarización de Hablantes',
  automaticSummarization: 'Resumen Automático',
  multiLanguageSupport: 'Soporte Multiidioma',
  secureStorage: 'Almacenamiento Seguro',
  
  // Plans and Pricing
  plans: 'Planes',
  pricing: 'Precios',
  freePlan: 'Plan Gratuito',
  proPlan: 'Plan Pro',
  enterprisePlan: 'Plan Empresarial',
  customPlan: 'Plan Personalizado',
  
  // Usage Limits
  usageLimits: 'Límites de Uso',
  monthlyLimit: 'Límite Mensual',
  dailyLimit: 'Límite Diario',
  hourlyLimit: 'Límite por Hora',
  
  // API and Integration
  api: 'API',
  integration: 'Integración',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Documentación',
  
  // Compliance
  compliance: 'Cumplimiento',
  certifications: 'Certificaciones',
  audits: 'Auditorías',
  policies: 'Políticas',
  
  // Updates and Maintenance
  updates: 'Actualizaciones',
  maintenance: 'Mantenimiento',
  changelog: 'Registro de Cambios',
  version: 'Versión',
  
  // Feedback
  feedback: 'Comentarios',
  rating: 'Calificación',
  review: 'Reseña',
  suggestion: 'Sugerencia',
  bugReport: 'Reporte de Error',
  
  // Onboarding
  onboarding: 'Incorporación',
  welcomeTour: 'Tour de Bienvenida',
  gettingStarted: 'Comenzar',
  tutorial: 'Tutorial',
  guide: 'Guía',
  
  // Empty States
  noData: 'No hay datos disponibles',
  noTranscriptions: 'Aún no hay transcripciones',
  noNotes: 'Aún no hay notas',
  noAnalytics: 'Aún no hay datos de análisis',
  noBillingHistory: 'Aún no hay historial de facturación',
  
  // Loading States
  loadingTranscriptions: 'Cargando transcripciones...',
  loadingNotes: 'Cargando notas...',
  loadingAnalytics: 'Cargando análisis...',
  loadingBilling: 'Cargando información de facturación...',
  
  // Validation Messages
  required: 'Este campo es requerido',
  invalidEmail: 'Dirección de email inválida',
  invalidPassword: 'Contraseña inválida',
  passwordMismatch: 'Las contraseñas no coinciden',
  minLength: 'La longitud mínima es {min} caracteres',
  maxLength: 'La longitud máxima es {max} caracteres',
  
  // Network Status
  online: 'En Línea',
  offline: 'Sin Conexión',
  connecting: 'Conectando...',
  reconnecting: 'Reconectando...',
  
  // File Operations
  fileUpload: 'Subida de Archivo',
  fileDownload: 'Descarga de Archivo',
  fileProcessing: 'Procesamiento de Archivo',
  fileConversion: 'Conversión de Archivo',
  
  // Audio Controls
  play: 'Reproducir',
  pause: 'Pausar',
  volume: 'Volumen',
  mute: 'Silenciar',
  unmute: 'Activar Sonido',
  
  // Time Display
  seconds: 'segundos',
  minutes: 'minutos',
  hours: 'horas',
  days: 'días',
  weeks: 'semanas',
  months: 'meses',
  years: 'años',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'muchos',
  
  // Directions
  up: 'Arriba',
  down: 'Abajo',
  left: 'Izquierda',
  right: 'Derecha',
  next: 'Siguiente',
  previous: 'Anterior',
  back: 'Atrás',
  forward: 'Adelante',
  
  // Sizes
  small: 'Pequeño',
  medium: 'Mediano',
  large: 'Grande',
  extraLarge: 'Extra Grande',
  
  // Colors
  red: 'Rojo',
  green: 'Verde',
  blue: 'Azul',
  yellow: 'Amarillo',
  orange: 'Naranja',
  purple: 'Púrpura',
  pink: 'Rosa',
  gray: 'Gris',
  black: 'Negro',
  white: 'Blanco',
  
  // Weather and Time
  morning: 'Mañana',
  afternoon: 'Tarde',
  evening: 'Noche',
  night: 'Noche',
  
  // Days of the Week
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
  
  // Months
  january: 'Enero',
  february: 'Febrero',
  march: 'Marzo',
  april: 'Abril',
  may: 'Mayo',
  june: 'Junio',
  july: 'Julio',
  august: 'Agosto',
  september: 'Septiembre',
  october: 'Octubre',
  november: 'Noviembre',
  december: 'Diciembre',
  
  // Header and navigation translations
  useCases: 'Casos de Uso',
  medicalProfessionals: 'Profesionales Médicos',
  therapists: 'Terapeutas',
  lawyers: 'Abogados',
  businessProfessionals: 'Profesionales de Negocios',
  education: 'Educación',
  contentCreators: 'Creadores de Contenido',
  researchers: 'Investigadores',
  customerSupport: 'Atención al Cliente',
  login: 'Iniciar Sesión',
  getStarted: 'Comenzar',
  getStartedFree: 'Comenzar Gratis',
  signIn: 'Iniciar Sesión',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Autenticación de Dos Factores',
    description: 'Ingrese su código de autenticación de 6 dígitos para acceder a datos sensibles',
    required: 'Autenticación de Dos Factores Requerida',
    enterCodeToAccessNotes: 'Ingrese su código de 6 dígitos para acceder a las notas',
    enterCodeToAccessTranscriptions: 'Ingrese su código de 6 dígitos para acceder a las transcripciones',
    enterCode: 'Ingresar código de 6 dígitos',
    verifyCode: 'Verificar Código',
    useBackupCode: 'O usar código de respaldo',
    enterBackupCode: 'Ingresar código de respaldo',
    getCodeFromApp: 'Obtenga su código de Google Authenticator, Authy o su aplicación 2FA preferida',
    setupLink: '¿Necesita configurar 2FA? Vaya a Configuración',
    step1Title: 'Paso 1: Escanear Código QR',
    step1Description: 'Abra su aplicación autenticadora y escanee este código QR para agregar su cuenta',
    enterManually: 'O ingresar manualmente',
    codeAdded: 'He Agregado el Código',
    cancel: 'Cancelar',
    step2Title: 'Paso 2: Guardar Códigos de Respaldo',
    step2Description: 'Guarde estos códigos de respaldo en un lugar seguro. Puede usarlos para acceder a su cuenta si pierde su dispositivo 2FA.',
    backupCodes: 'Códigos de Respaldo',
    completeSetup: 'Completar Configuración',
    back: 'Atrás',
    setupDataError: 'Error al generar datos de configuración 2FA',
    tooManyAttempts: 'Demasiados intentos fallidos. Por favor espere',
    minutesWait: 'minutos.',
    enter6DigitCode: 'Por favor ingrese un código de 6 dígitos',
    verificationSuccessful: 'Verificación 2FA exitosa',
    invalidCode: 'Código inválido.',
    attemptsRemaining: 'intentos restantes.',
    verificationFailed: 'Verificación fallida. Por favor intente de nuevo.',
    backupVerificationSuccessful: 'Verificación de código de respaldo exitosa',
    invalidBackupCode: 'Código de respaldo inválido',
    backupVerificationFailed: 'Verificación de código de respaldo fallida',
    copiedToClipboard: 'Copiado al portapapeles',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'No se pudieron cargar las transcripciones',
  transcriptionCopiedToClipboard: 'Transcripción copiada al portapapeles',
  failedToCopyToClipboard: 'Error al copiar al portapapeles',
  transcriptionDownloaded: 'Transcripción descargada como',
  failedToDownloadTranscription: 'Error al descargar la transcripción',
  noContentAvailable: 'No hay contenido disponible',
  failedToSwitchMicrophone: 'Error al cambiar el micrófono. Por favor, inténtalo de nuevo.',
  failedToLoadNotes: 'No se pudieron cargar las notas',
} as const 