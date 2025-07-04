"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Star,
  Menu,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Sun,
  Moon,
  Brain,
  Cpu,
  Lock,
  Server,
  Globe,
  Clock,
  FileText,
  ShieldCheck,
  Radio,
  Mic,
  Database,
  ServerCog,
  CheckCircle,
  Play,
  Code,
  Network,
  Terminal,
  Waves,
  Eye,
  X,
  Languages,
  UserCheck,
  FileEdit,
  Sparkles,
  ChevronDown,
  BookOpen,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FloatingHeader from "@/components/floating-header"
import StructuredData from "@/components/structured-data"

export default function PolishLandingPage() {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  useEffect(() => {
    // Add Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Default to dark mode unless user has set a preference
    let isDarkMode = true;
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "light") {
        isDarkMode = false;
      } else if (storedTheme === "dark") {
        isDarkMode = true;
      } else {
        // No preference set, default to dark
        isDarkMode = true;
        localStorage.setItem("theme", "dark");
      }
    }
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add scroll listener
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Structured Data for SEO */}
      <StructuredData
        lang="pl-PL"
        title="Nexogen AI - Bezpieczna Transkrypcja AI dla Profesjonalistów"
        description="Profesjonalna transkrypcja audio z rozpoznawaniem głosu i bezpieczne notatki"
        url="https://nexogen.app/pl"
        region="PL"
      />
      
      {/* Floating Header */}
      <FloatingHeader 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        scrollY={scrollY} 

      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20 md:pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-full opacity-20 blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8 md:space-y-12">
            {/* Main Headline */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                  Transkrypcja Audio i Notatki z Priorytetem Prywatności dla Profesjonalistów
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Bezpieczna transkrypcja audio i notatki z użyciem AI, zgodna z RODO i HIPAA, z szyfrowaniem od początku do końca. Pełna suwerenność danych z maksymalną kontrolą nad Twoimi informacjami.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Szyfrowanie End-to-End (AES-256 + TLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Zgodne z GDPR i HIPAA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                <span>100+ Języków Obsługiwanych</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 touch-manipulation">
                  <Play className="w-5 h-5 mr-2" />
                  Rozpocznij Darmową Wersję Próbną
                </Button>
              </Link>
              <Link href="/documentation">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105 touch-manipulation">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Zobacz Dokumentację
                </Button>
              </Link>
            </div>

            {/* Dashboard Demo Video Placeholder */}
            <div className="relative w-full max-w-5xl mx-auto pt-8 md:pt-12">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
                  {/* YouTube Video Embed */}
                  <iframe
                    src="https://www.youtube.com/embed/upIZEaV8Qnk?start=1"
                    title="Nexogen Dashboard Demo"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Enhanced Glow Effect - Always Visible */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-2xl -z-10" />
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/8 via-purple-400/8 to-indigo-400/8 rounded-3xl blur-3xl -z-20" />
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Połączonych Funkcji */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-32 px-4 relative overflow-hidden -mx-4"
      >
        {/* Unified Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-blue-500/5 via-purple-500/3 via-indigo-500/1 to-background dark:from-background dark:via-blue-500/5 dark:via-purple-500/3 dark:via-indigo-500/1 dark:to-background" style={{ margin: '-2rem' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/5 via-indigo-500/2 to-transparent dark:from-blue-500/10 dark:via-purple-500/5 dark:via-indigo-500/2 dark:to-transparent" style={{ margin: '-2rem' }} />
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          {/* Features Grid Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Zaawansowana Transkrypcja i Notowanie dla Twojego Przepływu Pracy
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light px-4">
              Odkryj bezpieczne narzędzia napędzane AI zaprojektowane dla profesjonalistów medycznych, terapeutów, prawników i profesjonalistów biznesowych, z rozpoznawaniem głosu i wsparciem wielojęzycznym.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32"
          >
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Bezpieczna Transkrypcja dla Profesjonalistów",
                description: "Transkrybuj audio z rozpoznawaniem głosu i segmentacją, chronione szyfrowaniem zgodnym z GDPR i HIPAA z bezpieczeństwem end-to-end dla przepływów pracy medycznych i prawnych.",
                gradient: "from-cyan-400 to-blue-600",
                delay: "0ms"
              },
              {
                icon: <FileEdit className="w-10 h-10" />,
                title: "Wielojęzyczne Notowanie",
                description: "Twórz notatki i podsumowania w ponad 100 językach z 99,5% dokładnością, idealne dla terapeutów i globalnych zespołów biznesowych z zaszyfrowanym przechowywaniem end-to-end.",
                gradient: "from-purple-400 to-pink-600",
                delay: "100ms"
              },
              {
                icon: <Waves className="w-10 h-10" />,
                title: "Krystalicznie Czyste Przetwarzanie Audio",
                description: "Technologia redukcji szumów zapewnia bezbłędną transkrypcję i notowanie w każdym środowisku, od klinik po sale konferencyjne, z bezpiecznym przetwarzaniem end-to-end.",
                gradient: "from-green-400 to-teal-600",
                delay: "200ms"
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Inteligentne Podsumowanie",
                description: "Generuj podsumowania i notatki świadome kontekstu z rozpoznawaniem głosu, usprawniając dokumentację dla zajętych profesjonalistów z zaszyfrowanym przetwarzaniem AI end-to-end.",
                gradient: "from-orange-400 to-red-600",
                delay: "300ms"
              },
              {
                icon: <Server className="w-10 h-10" />,
                title: "Bezpieczeństwo Danych Oparte na UE",
                description: "Hostowane na bezpiecznych serwerach europejskich z szyfrowaniem end-to-end, zapewniając pełną suwerenność danych dla wszystkich transkrypcji i notatek.",
                gradient: "from-indigo-400 to-purple-600",
                delay: "400ms"
              },
              {
                icon: <UserCheck className="w-10 h-10" />,
                title: "Rozpoznawanie Głosu",
                description: "Zaawansowana identyfikacja i segmentacja mówców dla dokładnych transkrypcji i notatek na poziomie profesjonalnym z zaszyfrowanym przetwarzaniem end-to-end.",
                gradient: "from-yellow-400 to-orange-600",
                delay: "500ms"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.4 + (index * 0.1) }}
                className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl border ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-gray-900/20 hover:shadow-gray-900/30' : 'shadow-gray-200/50 hover:shadow-gray-300/50'} z-10 touch-manipulation`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4 md:mb-6 relative z-20">
                  <span className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-800 to-white shadow-lg ${isDark ? 'shadow-gray-900/20' : 'shadow-gray-200/50'} self-start`}>
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-base md:text-lg`}>{feature.description}</p>
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} p-[1px]`}>
                    <div className={`w-full h-full rounded-3xl ${isDark ? 'bg-gray-900' : 'bg-white'}`} />
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${isDark ? 'bg-gray-900' : 'bg-white'} -z-10`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-block mb-4 md:mb-6">
              <span className="text-purple-400 font-mono text-sm tracking-wider bg-purple-500/10 px-4 py-2 rounded-full">[PORÓWNANIE]</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Dlaczego Nexogen jest Wyborem Profesjonalistów
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light px-4">
              Porównaj bezpieczną, wielojęzyczną transkrypcję i notowanie Nexogen z innymi usługami internetowymi jednym spojrzeniem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-4 items-start mb-16 md:mb-32">
            {/* Nexogen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className={`lg:col-span-5 relative p-6 md:p-8 rounded-2xl md:rounded-3xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-200 bg-white/50'} backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-emerald-900/20 hover:shadow-emerald-900/30' : 'shadow-emerald-200/50 hover:shadow-emerald-300/50'} z-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
              <div className="relative z-10 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-emerald-500/10">
                    <ServerCog className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-400">Nexogen</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Zgodne z GDPR i HIPAA, serwery w UE, brak udostępniania danych stronom trzecim</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Ponad 100 języków obsługiwanych dla transkrypcji i notatek</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Rozpoznawanie głosu i segmentacja z 99,5% dokładnością</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Modele open-source z samodzielnym hostingiem z pełną kontrolą danych</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Jasna dokumentacja i w pełni audytowalne modele AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Przejrzyste ceny, brak ukrytych kosztów</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* VS Divider */}
            <div className="lg:col-span-2 flex items-center justify-center h-full py-4 lg:py-0">
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 bg-background px-4">VS</span>
                </div>
              </div>
            </div>

            {/* Other Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className={`lg:col-span-5 relative p-6 md:p-8 rounded-2xl md:rounded-3xl border ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-gray-900/20 hover:shadow-gray-900/30' : 'shadow-gray-200/50 hover:shadow-gray-300/50'} z-10`}
            >
              <div className="relative z-10 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-gray-800">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-400">Inne Usługi</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Często brak zgodności z GDPR/HIPAA, dane przetwarzane na serwerach poza UE</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Ograniczone do 10-60 języków, często skupione na angielskim</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Podstawowa transkrypcja, brak zaawansowanego rozpoznawania głosu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Słabe lub brak szyfrowania end-to-end dla ochrony danych</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Polegają na API stron trzecich (OpenAI, Google, itp.) do przetwarzania</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Brak przejrzystości w trenowaniu modeli AI lub używaniu danych</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-center px-4 mb-20 md:mb-32"
          >
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-4xl mx-auto leading-relaxed">
              Nexogen zapewnia niezrównane bezpieczeństwo i elastyczność dla profesjonalistów. W przeciwieństwie do innych usług, które polegają na API stron trzecich, nasze modele open-source z samodzielnym hostingiem zapewniają precyzyjną transkrypcję z rozpoznawaniem głosu i inteligentne notowanie w ponad 100 językach, wszystko poparte zgodnością z GDPR i HIPAA z pełną kontrolą danych.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-block mb-4 md:mb-6">
              <span className="text-blue-400 font-mono text-sm tracking-wider bg-blue-500/10 px-4 py-2 rounded-full">[PROFESJONALIŚCI]</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Dlaczego Profesjonaliści Wybierają Nexogen
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-5xl mx-auto font-light px-4">
              Dostosowane dla profesjonalistów medycznych, terapeutów, prawników i profesjonalistów biznesowych, Nexogen upraszcza Twój przepływ pracy z bezpiecznymi narzędziami napędzanymi AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {[
              {
                icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Profesjonaliści Medyczni",
                subtitle: "Lekarze i Klinicyści",
                description: "Usprawnij dokumentację pacjentów z transkrypcją i notowaniem zgodnym z HIPAA, idealne dla lekarzy i klinicystów.",
                gradient: "from-blue-500 to-cyan-600",
                bgGradient: "from-blue-500/10 to-cyan-600/10",
                borderGradient: "from-blue-500/20 to-cyan-600/20",
                features: ["Zgodne z HIPAA", "Dokumentacja Pacjentów", "Notatki Kliniczne"]
              },
              {
                icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Terapeuci",
                subtitle: "Doradcy i Psycholodzy",
                description: "Przechwytuj sesje terapeutyczne z bezpieczną transkrypcją i wielojęzycznymi notatkami w ponad 100 językach, zaprojektowane dla doradców i psychologów.",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-500/10 to-pink-600/10",
                borderGradient: "from-purple-500/20 to-pink-600/20",
                features: ["100+ Języków", "Nagrywanie Sesji", "Bezpieczne Notatki"]
              },
              {
                icon: <FileText className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Prawnicy",
                subtitle: "Profesjonaliści Prawni",
                description: "Transkrybuj zeznania i spotkania z rozpoznawaniem głosu, zapewniając dokładność zgodną z GDPR dla profesjonalistów prawnych.",
                gradient: "from-green-500 to-emerald-600",
                bgGradient: "from-green-500/10 to-emerald-600/10",
                borderGradient: "from-green-500/20 to-emerald-600/20",
                features: ["Zgodne z GDPR", "Rozpoznawanie Głosu", "Dokładność Prawna"]
              },
              {
                icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Profesjonaliści Biznesowi",
                subtitle: "Kierownicy i Zespoły",
                description: "Zwiększ produktywność z notatkami i podsumowaniami napędzanymi AI w ponad 100 językach, idealne dla globalnych zespołów i kierowników.",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-500/10 to-red-600/10",
                borderGradient: "from-orange-500/20 to-red-600/20",
                features: ["Podsumowania AI", "Globalne Zespoły", "Zwiększenie Produktywności"]
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.3 + (index * 0.1) }}
                className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl border backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl z-10 touch-manipulation ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} ${isDark ? 'shadow-gray-900/20 hover:shadow-gray-900/30' : 'shadow-gray-200/50 hover:shadow-gray-300/50'}`}
                style={{
                  background: `linear-gradient(135deg, ${isDark ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)'}), ${benefit.bgGradient.replace('from-', 'linear-gradient(135deg, ').replace('to-', ', ').replace('/10', '/5')})`,
                  borderImage: `linear-gradient(135deg, ${benefit.borderGradient.replace('from-', '').replace('to-', ', ').replace('/20', '/30')}) 1`
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-4 md:space-y-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 self-start`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${benefit.gradient} transition-all duration-300`}>
                        {benefit.title}
                      </h3>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${benefit.gradient} transition-all duration-300`}>
                        {benefit.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm md:text-lg group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300`}>
                    {benefit.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.gradient}`} />
                        <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full border-2 group-hover:border-transparent group-hover:bg-gradient-to-r ${benefit.gradient} group-hover:text-white transition-all duration-300 text-sm md:text-base`}
                    >
                      Dowiedz Się Więcej
                      <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                <div className={`absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-24 lg:py-40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 text-center relative z-10">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Rozpocznij Bezpieczną Transkrypcję i Notowanie Dziś
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white px-4">
              Dołącz do ponad 2,500 profesjonalistów medycznych, terapeutów, prawników i profesjonalistów biznesowych używających Nexogen do transkrypcji i notowania zgodnego z GDPR i HIPAA w ponad 100 językach. Wypróbuj za darmo teraz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/50">
                  Wypróbuj Bezpieczną Transkrypcję i Notatki Za Darmo
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link href="https://calendly.com/nexogenlabs/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 w-full sm:w-auto">
                  Zarezerwuj Darmową Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-muted py-16"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Nexogen</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Nexogen AI zapewnia transkrypcję zgodną z GDPR i HIPAA z rozpoznawaniem głosu i bezpiecznym notowaniem dla profesjonalistów medycznych, terapeutów, prawników i profesjonalistów biznesowych.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Produkt</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Funkcje
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Ceny
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Integracje
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Firma</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  O Nas
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Studia Przypadków
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Wsparcie</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Centrum Pomocy
                </Link>
                <Link href="/documentation" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Dokumentacja
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Przewodnik Wsparcia Językowego
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Bezpieczeństwo
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Nexogen. Wszystkie prawa zastrzeżone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Polityka Prywatności
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Warunki Użytkowania
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Polityka Plików Cookie
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
