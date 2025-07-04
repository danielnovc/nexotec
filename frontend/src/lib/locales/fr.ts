export default {
  // Dashboard Navigation
  dashboard: 'Tableau de Bord',
  transcriptions: 'Transcriptions',
  notes: 'Notes',
  analytics: 'Analyses',
  billing: 'Facturation',
  credits: 'Crédits',
  account: 'Compte',
  enterprise: 'Entreprise',
  
  // Dashboard Recording
  audioRecording: 'Enregistrement Audio',
  recordAudioForTranscription: 'Enregistrer l\'audio pour la transcription',
  recordingInProgress: 'Enregistrement en cours...',
  deviceAudio: 'Audio de l\'Appareil',
  microphone: 'Microphone',
  noNotesGeneratedYet: 'Aucune note générée pour le moment.',
  noTranscriptionGeneratedYet: 'Aucune transcription générée pour le moment.',
  noSummaryGeneratedYet: 'Aucun résumé généré pour le moment.',
  
  // App and Navigation
  appName: 'Nexogen AI',
  audioTranscription: 'Transcription Audio',
  transcriptionHistory: 'Historique des Transcriptions',
  notesHistory: 'Historique des Notes',
  topUpCredits: 'Recharger les Crédits',
  tools: 'Outils',
  dataSafety: 'Sécurité des Données',
  downloadOptions: 'Options de Téléchargement',
  configureStorage: 'Configurer le Stockage',
  
  // Sidebar and UI
  toggleTheme: 'Basculer le thème',
  notesMode: 'Mode Notes',
  transcriptionMode: 'Mode Transcription',
  switchToTranscriptionMode: 'Passer au Mode Transcription : Afficher comme conversation avec étiquettes d\'orateurs',
  switchToNotesMode: 'Passer au Mode Notes : Afficher comme texte continu pour la prise de notes',
  moreThanTwoSpeakersTooltip: 'Activez ceci si votre audio contient plus de deux orateurs. Cela aide à améliorer la précision de la diarisation des orateurs en empêchant le système d\'ajouter par erreur des orateurs supplémentaires en raison du bruit de fond ou de brèves différences sonores.',
  recordDeviceAudioTooltip: 'Activez ceci pour enregistrer l\'audio du système (musique, vidéos, appels) en plus de l\'entrée du microphone. Cela vous permet de capturer à la fois votre voix et l\'audio qui se joue sur votre appareil.',
  
  // Dashboard Main Page
  welcome: 'Bon retour',
  startRecording: 'Commencer l\'Enregistrement',
  stopRecording: 'Arrêter l\'Enregistrement',
  recording: 'Enregistrement...',
  processing: 'Traitement...',
  generatingSummary: 'Génération du Résumé...',
  generatingPDF: 'Génération du PDF...',
  
  // Recording Controls
  selectMicrophone: 'Sélectionner le Microphone',
  defaultMicrophone: 'Microphone par Défaut',
  recordingDuration: 'Durée d\'Enregistrement',
  recordingStatus: 'Statut d\'Enregistrement',
  
  // Transcription
  transcription: 'Transcription',
  noTranscription: 'Aucune transcription disponible',
  copyTranscription: 'Copier la Transcription',
  downloadTranscription: 'Télécharger la Transcription',
  clearTranscription: 'Effacer la Transcription',
  transcriptionCopied: 'Transcription copiée dans le presse-papiers',
  
  // Summary
  summary: 'Résumé',
  generateSummary: 'Générer le Résumé',
  noSummary: 'Aucun résumé disponible',
  summaryGenerated: 'Résumé généré avec succès',
  downloadPDF: 'Télécharger PDF',
  
  // Notes
  addNote: 'Ajouter une Note',
  editNote: 'Modifier la Note',
  deleteNote: 'Supprimer la Note',
  saveNote: 'Enregistrer la Note',
  noteSaved: 'Note enregistrée avec succès',
  noteDeleted: 'Note supprimée avec succès',
  notesWillAppearHere: 'Les notes apparaîtront ici',
  transcriptionWillAppearHere: 'La transcription apparaîtra ici',
  
  // Credits
  availableCredits: 'Crédits Disponibles',
  creditsUsed: 'Crédits Utilisés',
  buyCredits: 'Acheter des Crédits',
  creditHistory: 'Historique des Crédits',
  insufficientCredits: 'Crédits insuffisants',
  
  // Settings
  settings: {
    title: 'Paramètres',
    subtitle: 'Configurez vos préférences de transcription et d\'application',
    aiFeatures: 'Fonctionnalités IA',
    aiFeaturesDescription: 'Configurer les fonctionnalités de transcription alimentées par l\'IA',
    autoSummarize: 'Résumer automatiquement',
    autoSummarizeDescription: 'Générer automatiquement des résumés',
    moreThanTwoSpeakers: 'Plus de deux orateurs',
    moreThanTwoSpeakersDescription: 'Détection améliorée des orateurs',
    recordDeviceAudio: 'Enregistrer l\'audio de l\'appareil',
    recordDeviceAudioDescription: 'Capturer l\'audio du système',
    dataSafety: 'Sécurité des données',
    dataSafetyDescription: 'Contrôlez comment vos données sont stockées et traitées',
    saveTranscripts: 'Enregistrer les transcriptions',
    saveTranscriptsDescription: 'Stocker les transcriptions en toute sécurité',
    saveAudioToStorage: 'Enregistrer l\'audio dans le stockage',
    saveAudioToStorageDescription: 'Stocker les fichiers audio en toute sécurité',
    autoDownloadRecordings: 'Télécharger automatiquement les enregistrements',
    autoDownloadRecordingsDescription: 'Sauvegarder les enregistrements sur l\'appareil automatiquement après avoir terminé',
    autoDownloadTranscripts: 'Télécharger automatiquement les transcriptions',
    autoDownloadTranscriptsDescription: 'Sauvegarder les transcriptions sur l\'appareil automatiquement après avoir terminé l\'enregistrement et la transcription',
    twoFactorAuth: 'Authentification à deux facteurs',
    twoFactorAuthDescription: 'Sécurisez votre compte avec 2FA',
    '2faStatus': 'Statut 2FA',
    enabled: 'Activé',
    notSetUp: 'Non configuré',
    active: 'Actif',
    inactive: 'Inactif',
    '2faActive': '2FA est actif',
    '2faActiveDescription': 'Votre compte est protégé par l\'authentification à deux facteurs.',
    '2faNotSetUp': '2FA non configuré',
    '2faNotSetUpDescription': 'Activez l\'authentification à deux facteurs pour une sécurité renforcée.',
    manage2FA: 'Gérer 2FA',
    setUp2FA: 'Configurer 2FA',
    privacyInformation: 'Informations de Confidentialité',
    privacyInformationDescription: 'En savoir plus sur nos pratiques de confidentialité',
    endToEndEncryption: 'Chiffrement de Bout en Bout',
    endToEndEncryptionDescription: 'Toutes vos données sont chiffrées avec le chiffrement AES-256 et ne sont jamais stockées en texte clair.',
    gdprHipaaCompliant: 'Conforme GDPR et HIPAA',
    gdprHipaaCompliantDescription: 'Notre plateforme respecte les plus hauts standards de protection des données et de confidentialité.',
    viewDocumentation: 'Voir la Documentation',
    enterpriseAccess: 'Accès Entreprise',
    enterpriseAccessDescription: 'Passez à l\'entreprise pour des fonctionnalités avancées',
    enterpriseFeatures: 'Fonctionnalités Entreprise',
    enterpriseFeaturesDescription: 'Configurer les paramètres spécifiques à l\'entreprise',
    storageConfiguration: 'Configuration du Stockage',
    storageConfigurationDescription: 'Configurez votre propre stockage compatible S3 pour une souveraineté des données complète.',
    configureStorage: 'Configurer le Stockage',
    teamManagement: 'Gestion d\'Équipe',
    teamManagementDescription: 'Gérez votre équipe entreprise et les permissions',
    userManagement: 'Gestion des Utilisateurs',
    userManagementDescription: 'Ajoutez, supprimez et gérez les membres de l\'équipe avec un contrôle d\'accès basé sur les rôles.',
    manageUsers: 'Gérer les Utilisateurs',
    customS3Storage: 'Configuration de stockage S3 personnalisée',
    teamManagementRoles: 'Gestion d\'équipe et rôles utilisateur',
    advancedAnalytics: 'Analyses avancées et rapports',
    prioritySupport: 'Support prioritaire et SLA',
    customIntegrations: 'Intégrations personnalisées et accès API',
    contactSales: 'Contacter les Ventes',
  },
  
  // Analytics
  transcriptionStats: 'Statistiques de Transcription',
  usageStats: 'Statistiques d\'Utilisation',
  monthlyUsage: 'Utilisation Mensuelle',
  totalTranscriptions: 'Total des Transcriptions',
  totalNotes: 'Total des Notes',
  
  // Billing
  currentPlan: 'Plan Actuel',
  upgradePlan: 'Mettre à Niveau le Plan',
  billingHistory: 'Historique de Facturation',
  paymentMethod: 'Méthode de Paiement',
  
  // Account
  profile: 'Profil',
  security: 'Sécurité',
  preferences: 'Préférences',
  logout: 'Se Déconnecter',
  
  // Enterprise
  teamManagement: 'Gestion d\'Équipe',
  adminPanel: 'Panneau d\'Administration',
  userManagement: 'Gestion des Utilisateurs',
  
  // Common Actions
  save: 'Enregistrer',
  cancel: 'Annuler',
  delete: 'Supprimer',
  edit: 'Modifier',
  add: 'Ajouter',
  remove: 'Supprimer',
  download: 'Télécharger',
  upload: 'Téléverser',
  search: 'Rechercher',
  filter: 'Filtrer',
  sort: 'Trier',
  
  // Status Messages
  loading: 'Chargement...',
  error: 'Erreur',
  success: 'Succès',
  warning: 'Avertissement',
  info: 'Information',
  
  // Time and Date
  today: 'Aujourd\'hui',
  yesterday: 'Hier',
  thisWeek: 'Cette Semaine',
  thisMonth: 'Ce Mois',
  lastMonth: 'Mois Dernier',
  
  // File Types
  audio: 'Audio',
  video: 'Vidéo',
  document: 'Document',
  image: 'Image',
  
  // Languages
  language: 'Langue',
  english: 'Anglais',
  spanish: 'Espagnol',
  german: 'Allemand',
  french: 'Français',
  russian: 'Russe',
  ukrainian: 'Ukrainien',
  lithuanian: 'Lituanien',
  polish: 'Polonais',
  
  // Error Messages
  errorOccurred: 'Une erreur s\'est produite',
  tryAgain: 'Veuillez réessayer',
  networkError: 'Erreur réseau',
  permissionDenied: 'Permission refusée',
  fileTooLarge: 'Fichier trop volumineux',
  invalidFormat: 'Format invalide',
  
  // Success Messages
  savedSuccessfully: 'Enregistré avec succès',
  deletedSuccessfully: 'Supprimé avec succès',
  uploadedSuccessfully: 'Téléversé avec succès',
  downloadedSuccessfully: 'Téléchargé avec succès',
  
  // Confirmation Dialogs
  confirmDelete: 'Êtes-vous sûr de vouloir supprimer ceci ?',
  confirmLogout: 'Êtes-vous sûr de vouloir vous déconnecter ?',
  confirmClear: 'Êtes-vous sûr de vouloir effacer ceci ?',
  
  // Placeholders
  searchPlaceholder: 'Rechercher...',
  notePlaceholder: 'Écrivez votre note ici...',
  transcriptionPlaceholder: 'La transcription apparaîtra ici...',
  
  // Tooltips
  startRecordingTooltip: 'Commencer l\'enregistrement audio',
  stopRecordingTooltip: 'Arrêter l\'enregistrement audio',
  copyTooltip: 'Copier dans le presse-papiers',
  downloadTooltip: 'Télécharger le fichier',
  deleteTooltip: 'Supprimer l\'élément',
  editTooltip: 'Modifier l\'élément',
  
  // Accessibility
  ariaStartRecording: 'Bouton de début d\'enregistrement',
  ariaStopRecording: 'Bouton d\'arrêt d\'enregistrement',
  ariaCopyTranscription: 'Bouton de copie de transcription',
  ariaDownloadTranscription: 'Bouton de téléchargement de transcription',
  ariaClearTranscription: 'Bouton d\'effacement de transcription',
  
  // Cost and Pricing
  estimatedCost: 'Coût Estimé',
  actualCost: 'Coût Réel',
  costPerMinute: 'Coût par minute',
  totalCost: 'Coût Total',
  
  // Audio Processing
  audioProcessing: 'Traitement Audio',
  processingAudio: 'Traitement de l\'audio...',
  audioProcessed: 'Audio traité avec succès',
  processingFailed: 'Échec du traitement',
  
  // Speaker Recognition
  speakerRecognition: 'Reconnaissance d\'Orateurs',
  speaker1: 'Orateur 1',
  speaker2: 'Orateur 2',
  speaker3: 'Orateur 3',
  speaker4: 'Orateur 4',
  unknownSpeaker: 'Orateur Inconnu',
  
  // Quality Settings
  qualitySettings: 'Paramètres de Qualité',
  highQuality: 'Haute Qualité',
  mediumQuality: 'Qualité Moyenne',
  lowQuality: 'Basse Qualité',
  
  // Export Options
  exportOptions: 'Options d\'Exportation',
  exportAsPDF: 'Exporter en PDF',
  exportAsTXT: 'Exporter en TXT',
  exportAsSRT: 'Exporter en SRT',
  exportAsVTT: 'Exporter en VTT',
  
  // Privacy and Security
  privacy: 'Confidentialité',
  securitySettings: 'Sécurité',
  encryption: 'Chiffrement',
  dataProtection: 'Protection des Données',
  gdprCompliant: 'Conforme au RGPD',
  hipaaCompliant: 'Conforme à la HIPAA',
  
  // Support
  support: 'Support',
  help: 'Aide',
  documentation: 'Documentation',
  contactSupport: 'Contacter le Support',
  faq: 'FAQ',
  
  // Notifications
  notifications: 'Notifications',
  notificationSettings: 'Paramètres de Notification',
  emailNotifications: 'Notifications par Email',
  pushNotifications: 'Notifications Push',
  
  // Theme
  theme: 'Thème',
  lightMode: 'Mode Clair',
  darkMode: 'Mode Sombre',
  systemTheme: 'Thème du Système',
  
  // User Interface
  sidebar: 'Barre Latérale',
  mainContent: 'Contenu Principal',
  header: 'En-tête',
  footer: 'Pied de Page',
  navigation: 'Navigation',
  
  // Data Management
  dataManagement: 'Gestion des Données',
  backup: 'Sauvegarde',
  restore: 'Restaurer',
  sync: 'Synchroniser',
  import: 'Importer',
  export: 'Exporter',
  
  // Performance
  performance: 'Performance',
  speed: 'Vitesse',
  accuracy: 'Précision',
  reliability: 'Fiabilité',
  
  // Features
  features: 'Fonctionnalités',
  realTimeTranscription: 'Transcription en Temps Réel',
  speakerDiarization: 'Diarisation d\'Orateurs',
  automaticSummarization: 'Résumé Automatique',
  multiLanguageSupport: 'Support Multi-langues',
  secureStorage: 'Stockage Sécurisé',
  
  // Plans and Pricing
  plans: 'Plans',
  pricing: 'Tarification',
  freePlan: 'Plan Gratuit',
  proPlan: 'Plan Pro',
  enterprisePlan: 'Plan Entreprise',
  customPlan: 'Plan Personnalisé',
  
  // Usage Limits
  usageLimits: 'Limites d\'Utilisation',
  monthlyLimit: 'Limite Mensuelle',
  dailyLimit: 'Limite Quotidienne',
  hourlyLimit: 'Limite Horaire',
  
  // API and Integration
  api: 'API',
  integration: 'Intégration',
  webhook: 'Webhook',
  sdk: 'SDK',
  apiDocumentation: 'Documentation',
  
  // Compliance
  compliance: 'Conformité',
  certifications: 'Certifications',
  audits: 'Audits',
  policies: 'Politiques',
  
  // Updates and Maintenance
  updates: 'Mises à Jour',
  maintenance: 'Maintenance',
  changelog: 'Journal des Modifications',
  version: 'Version',
  
  // Feedback
  feedback: 'Retour',
  rating: 'Évaluation',
  review: 'Avis',
  suggestion: 'Suggestion',
  bugReport: 'Rapport de Bug',
  
  // Onboarding
  onboarding: 'Intégration',
  welcomeTour: 'Visite de Bienvenue',
  gettingStarted: 'Commencer',
  tutorial: 'Tutoriel',
  guide: 'Guide',
  
  // Empty States
  noData: 'Aucune donnée disponible',
  noTranscriptions: 'Aucune transcription pour le moment',
  noNotes: 'Aucune note pour le moment',
  noAnalytics: 'Aucune donnée d\'analyse pour le moment',
  noBillingHistory: 'Aucun historique de facturation pour le moment',
  
  // Loading States
  loadingTranscriptions: 'Chargement des transcriptions...',
  loadingNotes: 'Chargement des notes...',
  loadingAnalytics: 'Chargement des analyses...',
  loadingBilling: 'Chargement des informations de facturation...',
  
  // Validation Messages
  required: 'Ce champ est requis',
  invalidEmail: 'Adresse email invalide',
  invalidPassword: 'Mot de passe invalide',
  passwordMismatch: 'Les mots de passe ne correspondent pas',
  minLength: 'La longueur minimale est de {min} caractères',
  maxLength: 'La longueur maximale est de {max} caractères',
  
  // Network Status
  online: 'En Ligne',
  offline: 'Hors Ligne',
  connecting: 'Connexion...',
  reconnecting: 'Reconnexion...',
  
  // File Operations
  fileUpload: 'Téléversement de Fichier',
  fileDownload: 'Téléchargement de Fichier',
  fileProcessing: 'Traitement de Fichier',
  fileConversion: 'Conversion de Fichier',
  
  // Audio Controls
  play: 'Jouer',
  pause: 'Pause',
  stop: 'Arrêter',
  volume: 'Volume',
  mute: 'Muet',
  unmute: 'Activer le Son',
  
  // Time Display
  seconds: 'secondes',
  minutes: 'minutes',
  hours: 'heures',
  days: 'jours',
  weeks: 'semaines',
  months: 'mois',
  years: 'années',
  
  // Numbers and Quantities
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  many: 'beaucoup',
  
  // Directions
  up: 'Haut',
  down: 'Bas',
  left: 'Gauche',
  right: 'Droite',
  next: 'Suivant',
  previous: 'Précédent',
  back: 'Retour',
  forward: 'Avancer',
  
  // Sizes
  small: 'Petit',
  medium: 'Moyen',
  large: 'Grand',
  extraLarge: 'Très Grand',
  
  // Colors
  red: 'Rouge',
  green: 'Vert',
  blue: 'Bleu',
  yellow: 'Jaune',
  orange: 'Orange',
  purple: 'Violet',
  pink: 'Rose',
  gray: 'Gris',
  black: 'Noir',
  white: 'Blanc',
  
  // Weather and Time
  morning: 'Matin',
  afternoon: 'Après-midi',
  evening: 'Soir',
  night: 'Nuit',
  
  // Days of the Week
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche',
  
  // Months
  january: 'Janvier',
  february: 'Février',
  march: 'Mars',
  april: 'Avril',
  may: 'Mai',
  june: 'Juin',
  july: 'Juillet',
  august: 'Août',
  september: 'Septembre',
  october: 'Octobre',
  november: 'Novembre',
  december: 'Décembre',
  
  // Header and navigation translations
  useCases: 'Cas d\'Usage',
  medicalProfessionals: 'Professionnels de Santé',
  therapists: 'Thérapeutes',
  lawyers: 'Avocats',
  businessProfessionals: 'Professionnels du Business',
  education: 'Éducation',
  contentCreators: 'Créateurs de Contenu',
  researchers: 'Chercheurs',
  customerSupport: 'Support Client',
  login: 'Connexion',
  getStarted: 'Commencer',
  getStartedFree: 'Commencer Gratuitement',
  signIn: 'Se Connecter',
  
  // Two-Factor Authentication
  '2fa': {
    title: 'Authentification à Deux Facteurs',
    description: 'Entrez votre code d\'authentification à 6 chiffres pour accéder aux données sensibles',
    required: 'Authentification à Deux Facteurs Requise',
    enterCodeToAccessNotes: 'Entrez votre code à 6 chiffres pour accéder aux notes',
    enterCodeToAccessTranscriptions: 'Entrez votre code à 6 chiffres pour accéder aux transcriptions',
    enterCode: 'Entrer le code à 6 chiffres',
    verifyCode: 'Vérifier le Code',
    useBackupCode: 'Ou utiliser un code de sauvegarde',
    enterBackupCode: 'Entrer le code de sauvegarde',
    getCodeFromApp: 'Obtenez votre code depuis Google Authenticator, Authy ou votre application 2FA préférée',
    setupLink: 'Besoin de configurer 2FA ? Allez dans Paramètres',
    step1Title: 'Étape 1 : Scanner le Code QR',
    step1Description: 'Ouvrez votre application d\'authentification et scannez ce code QR pour ajouter votre compte',
    enterManually: 'Ou entrer manuellement',
    codeAdded: 'J\'ai Ajouté le Code',
    cancel: 'Annuler',
    step2Title: 'Étape 2 : Sauvegarder les Codes de Sauvegarde',
    step2Description: 'Sauvegardez ces codes de sauvegarde dans un endroit sûr. Vous pouvez les utiliser pour accéder à votre compte si vous perdez votre appareil 2FA.',
    backupCodes: 'Codes de Sauvegarde',
    completeSetup: 'Terminer la Configuration',
    back: 'Retour',
    setupDataError: 'Échec de la génération des données de configuration 2FA',
    tooManyAttempts: 'Trop de tentatives échouées. Veuillez attendre',
    minutesWait: 'minutes.',
    enter6DigitCode: 'Veuillez entrer un code à 6 chiffres',
    verificationSuccessful: 'Vérification 2FA réussie',
    invalidCode: 'Code invalide.',
    attemptsRemaining: 'tentatives restantes.',
    verificationFailed: 'Vérification échouée. Veuillez réessayer.',
    backupVerificationSuccessful: 'Vérification du code de sauvegarde réussie',
    invalidBackupCode: 'Code de sauvegarde invalide',
    backupVerificationFailed: 'Vérification du code de sauvegarde échouée',
    copiedToClipboard: 'Copié dans le presse-papiers',
  },
  
  // Error and Success Messages
  failedToLoadTranscriptions: 'Impossible de charger les transcriptions',
  transcriptionCopiedToClipboard: 'Transcription copiée dans le presse-papiers',
  failedToCopyToClipboard: 'Échec de la copie dans le presse-papiers',
  transcriptionDownloaded: 'Transcription téléchargée comme',
  failedToDownloadTranscription: 'Échec du téléchargement de la transcription',
  noContentAvailable: 'Aucun contenu disponible',
  failedToSwitchMicrophone: 'Échec du changement de microphone. Veuillez réessayer.',
  failedToLoadNotes: 'Impossible de charger les notes',
} as const 