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

export default function PortugueseLandingPage() {
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
        lang="pt-BR"
        title="Nexogen AI - Transcrição IA Segura para Profissionais"
        description="Transcrição de áudio profissional com reconhecimento de voz e notas seguras"
        url="https://nexogen.app/pr"
        region="BR"
      />
      
      {/* Floating Header */}
      <FloatingHeader 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        scrollY={scrollY} 
        currentLang="pr"
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
                  Transcrição de Áudio e Anotações com Foco na Privacidade para Profissionais
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Transcrição de áudio e anotações com IA segura, compatível com GDPR e HIPAA, com criptografia de ponta a ponta. Soberania total de dados com máximo controle sobre suas informações.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Criptografia de Ponta a Ponta (AES-256 + TLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Compatível com GDPR e HIPAA</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                <span>100+ Idiomas Suportados</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 touch-manipulation">
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar Teste Gratuito
                </Button>
              </Link>
              <Link href="/documentation">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105 touch-manipulation">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Ver Documentação
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

      {/* Seção de Recursos Combinados */}
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
                Transcrição Avançada e Tomada de Notas para Seu Fluxo de Trabalho
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light px-4">
              Descubra ferramentas seguras alimentadas por IA projetadas para profissionais médicos, terapeutas, advogados e profissionais de negócios, com reconhecimento de voz e suporte multilíngue.
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
                title: "Transcrição Segura para Profissionais",
                description: "Transcreva áudio com reconhecimento de voz e segmentação, protegido por criptografia compatível com GDPR e HIPAA com segurança de ponta a ponta para fluxos de trabalho médicos e legais.",
                gradient: "from-cyan-400 to-blue-600",
                delay: "0ms"
              },
              {
                icon: <FileEdit className="w-10 h-10" />,
                title: "Tomada de Notas Multilíngue",
                description: "Crie notas e resumos em mais de 100 idiomas com 99,5% de precisão, ideal para terapeutas e equipes de negócios globais com armazenamento criptografado de ponta a ponta.",
                gradient: "from-purple-400 to-pink-600",
                delay: "100ms"
              },
              {
                icon: <Waves className="w-10 h-10" />,
                title: "Processamento de Áudio Cristalino",
                description: "A tecnologia de cancelamento de ruído garante transcrição e tomada de notas perfeitas em qualquer ambiente, desde clínicas até salas de reunião, com processamento seguro de ponta a ponta.",
                gradient: "from-green-400 to-teal-600",
                delay: "200ms"
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Resumo Inteligente",
                description: "Gere resumos e notas conscientes do contexto com reconhecimento de voz, otimizando a documentação para profissionais ocupados com processamento de IA criptografado de ponta a ponta.",
                gradient: "from-orange-400 to-red-600",
                delay: "300ms"
              },
              {
                icon: <Server className="w-10 h-10" />,
                title: "Segurança de Dados Baseada na UE",
                description: "Hospedado em servidores europeus seguros com criptografia de ponta a ponta, garantindo soberania completa de dados para todas as transcrições e notas.",
                gradient: "from-indigo-400 to-purple-600",
                delay: "400ms"
              },
              {
                icon: <UserCheck className="w-10 h-10" />,
                title: "Reconhecimento de Voz",
                description: "Identificação e segmentação avançadas de falantes para transcrições e notas precisas de nível profissional com processamento criptografado de ponta a ponta.",
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
              <span className="text-purple-400 font-mono text-sm tracking-wider bg-purple-500/10 px-4 py-2 rounded-full">[COMPARAÇÃO]</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Por que Nexogen é a Escolha dos Profissionais
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light px-4">
              Compare a transcrição segura e multilíngue e a tomada de notas do Nexogen com outros serviços baseados na web de relance.
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
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Compatível com GDPR e HIPAA, servidores baseados na UE, sem compartilhamento de dados com terceiros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Mais de 100 idiomas suportados para transcrição e notas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Reconhecimento de voz e segmentação com 99,5% de precisão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Modelos de código aberto auto-hospedados com controle completo de dados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Documentação clara e modelos de IA totalmente auditáveis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Preços transparentes, sem custos ocultos</span>
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-400">Other Services</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Often lack GDPR/HIPAA compliance, data processed on non-EU servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Limited to 10–60 languages, often English-focused</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Basic transcription, no advanced speaker recognition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Weak or no end-to-end encryption for data protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Rely on third-party APIs (OpenAI, Google, etc.) for processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">No transparency into AI model training or data usage</span>
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
              Nexogen delivers unmatched security and flexibility for professionals. Unlike other services that rely on third-party APIs, our open-source self-hosted models ensure precise transcription with speaker recognition and intelligent note-taking in 100+ languages, all backed by GDPR and HIPAA compliance with complete data control.
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
              <span className="text-blue-400 font-mono text-sm tracking-wider bg-blue-500/10 px-4 py-2 rounded-full">[PROFESSIONALS]</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Why Professionals Choose Nexogen
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white max-w-5xl mx-auto font-light px-4">
              Tailored for medical professionals, therapists, lawyers, and business professionals, Nexogen simplifies your workflow with secure, AI-driven tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {[
              {
                icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Medical Professionals",
                subtitle: "Doctors & Clinicians",
                description: "Streamline patient documentation with HIPAA-compliant transcription and note-taking, perfect for doctors and clinicians.",
                gradient: "from-blue-500 to-cyan-600",
                bgGradient: "from-blue-500/10 to-cyan-600/10",
                borderGradient: "from-blue-500/20 to-cyan-600/20",
                features: ["HIPAA Compliant", "Patient Documentation", "Clinical Notes"]
              },
              {
                icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Therapists",
                subtitle: "Counselors & Psychologists",
                description: "Capture therapy sessions with secure transcription and multilingual notes in 100+ languages, designed for counselors and psychologists.",
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-500/10 to-pink-600/10",
                borderGradient: "from-purple-500/20 to-pink-600/20",
                features: ["100+ Languages", "Session Recording", "Secure Notes"]
              },
              {
                icon: <FileText className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Lawyers",
                subtitle: "Legal Professionals",
                description: "Transcribe depositions and meetings with speaker recognition, ensuring GDPR-compliant accuracy for legal professionals.",
                gradient: "from-green-500 to-emerald-600",
                bgGradient: "from-green-500/10 to-emerald-600/10",
                borderGradient: "from-green-500/20 to-emerald-600/20",
                features: ["GDPR Compliant", "Speaker Recognition", "Legal Accuracy"]
              },
              {
                icon: <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />,
                title: "Business Professionals",
                subtitle: "Executives & Teams",
                description: "Boost productivity with AI-powered notes and summaries in 100+ languages, ideal for global teams and executives.",
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-500/10 to-red-600/10",
                borderGradient: "from-orange-500/20 to-red-600/20",
                features: ["AI Summaries", "Global Teams", "Productivity Boost"]
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
                      Learn More
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
                Start Secure Transcription & Note-Taking Today
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white px-4">
              Join 2,500+ medical professionals, therapists, lawyers, and business professionals using Nexogen for GDPR and HIPAA-compliant transcription and note-taking in 100+ languages. Try free now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 h-12 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/50">
                  Try Secure Transcription & Notes Free
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link href="https://calendly.com/nexogenlabs/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 h-12 w-full sm:w-auto">
                  Book a Free Demo
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
                Nexogen AI delivers GDPR and HIPAA-compliant transcription with speaker recognition and secure note-taking for medical professionals, therapists, lawyers, and business professionals.
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
              <h3 className="text-lg font-semibold">Product</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Case Studies
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
                <Link href="/documentation" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Language Support Guide
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Nexogen. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
