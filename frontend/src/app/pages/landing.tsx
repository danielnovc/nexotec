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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FloatingHeader from "@/components/floating-header"

export default function StreamLineLanding() {
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
      {/* Floating Header */}
      <FloatingHeader 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        scrollY={scrollY} 
      />

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-56 pb-24 md:pb-40 overflow-hidden px-4 -mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute w-[80%] h-[80%] bg-gradient-to-r from-cyan-100/80 via-purple-100/80 to-blue-100/80 rounded-full blur-3xl opacity-70 top-[-10%] left-[-20%] animate-pulse dark:from-cyan-900/20 dark:via-purple-900/20 dark:to-blue-900/20" />
          <div className="absolute w-[60%] h-[60%] bg-gradient-to-tr from-blue-50/90 via-purple-50/90 to-cyan-50/90 rounded-full blur-2xl opacity-50 bottom-[-10%] right-[-10%] animate-pulse delay-500 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-cyan-900/20" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delay: 0.3 }}
              className="space-y-10 relative z-10"
            >
              <motion.div variants={fadeInUp} transition={{ delay: 0.5, duration: 0.7 }} className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Professional-Grade AI Transcription
                </h1>
                <p className="text-xl text-gray-900 dark:text-white max-w-[600px] leading-relaxed">
                  Transform your audio documentation with our cutting-edge AI ASR technology. 
                  Experience 99.5% accuracy, GDPR compliance, and advanced processing for professionals across all industries.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.7, duration: 0.7 }} className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="text-lg px-8 h-12 bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/50">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://calendly.com/nexogenlabs/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                    Book a Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.9, duration: 0.7 }} className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span>EU-based Infrastructure</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-3xl" />
              <div className="relative z-10 w-full max-w-[800px] aspect-video bg-background/50 backdrop-blur rounded-lg border border-primary/20 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI Transcription Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="mt-32"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.5 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  POWERFUL FEATURES
                </span>
              </h2>
              <p className="text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light">
                Experience the next generation of audio transcription technology
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 1.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Shield className="w-10 h-10" />,
                  title: "Enterprise Security",
                  description: "Your data is protected with industry-standard encryption and secure infrastructure, ensuring privacy and compliance.",
                  gradient: "from-cyan-400 to-blue-600",
                  delay: "0ms"
                },
                {
                  icon: <Cpu className="w-10 h-10" />,
                  title: "Advanced AI",
                  description: "Powered by state-of-the-art AI models that deliver exceptional accuracy and natural language understanding.",
                  gradient: "from-purple-400 to-pink-600",
                  delay: "100ms"
                },
                {
                  icon: <Waves className="w-10 h-10" />,
                  title: "Crystal Clear Audio",
                  description: "Advanced noise reduction and audio enhancement for perfect transcription in any environment.",
                  gradient: "from-green-400 to-teal-600",
                  delay: "200ms"
                },
                {
                  icon: <Network className="w-10 h-10" />,
                  title: "Advanced Processing",
                  description: "High-performance batch processing with speaker identification, voice activity detection, and overlapped speech recognition.",
                  gradient: "from-orange-400 to-red-600",
                  delay: "300ms"
                },
                {
                  icon: <Eye className="w-10 h-10" />,
                  title: "Smart Recognition",
                  description: "Intelligent speaker identification and context awareness for accurate, natural transcriptions.",
                  gradient: "from-indigo-400 to-purple-600",
                  delay: "400ms"
                },
                {
                  icon: <Database className="w-10 h-10" />,
                  title: "EU Infrastructure",
                  description: "Hosted on secure European servers with full GDPR compliance and data sovereignty.",
                  gradient: "from-yellow-400 to-orange-600",
                  delay: "500ms"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.7, delay: 1.7 + (index * 0.1) }}
                  className={`group relative p-8 rounded-3xl border ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-xl hover:scale-105 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-gray-900/20 hover:shadow-gray-900/30' : 'shadow-gray-200/50 hover:shadow-gray-300/50'} z-10`}
                >
                  <div className="flex items-center gap-6 mb-6 relative z-20">
                    <span className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-white shadow-lg ${isDark ? 'shadow-gray-900/20' : 'shadow-gray-200/50'}`}>
                      {feature.icon}
                    </span>
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg`}>{feature.description}</p>
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
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-32 px-4 relative overflow-hidden -mx-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 via-purple-500/3 via-purple-500/1 to-background dark:from-background dark:via-purple-500/5 dark:via-purple-500/3 dark:via-purple-500/1 dark:to-background" style={{ margin: '-2rem' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-purple-500/5 via-purple-500/2 to-transparent dark:from-purple-500/10 dark:via-purple-500/5 dark:via-purple-500/2 dark:to-transparent" style={{ margin: '-2rem' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-purple-400 font-mono text-sm tracking-wider bg-purple-500/10 px-4 py-2 rounded-full">[FEATURES]</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Why Choose Our Solution?
              </span>
            </h2>
            <p className="text-xl text-gray-900 dark:text-white max-w-4xl mx-auto font-light">
              Experience our comprehensive suite of features designed for professional audio transcription
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-4 items-center mb-32">
            {/* Our Solution */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`col-span-5 relative p-8 rounded-3xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-200 bg-white/50'} backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-emerald-900/20 hover:shadow-emerald-900/30' : 'shadow-emerald-200/50 hover:shadow-emerald-300/50'} z-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10">
                    <ServerCog className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400">Our Solution</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Open-source AI models that can be audited for security and privacy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">EU-based infrastructure with full GDPR compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Complete data sovereignty and control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">No data transfer to third-party servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Customizable and self-hosted deployment options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Full control over model updates and versions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Transparent pricing with no hidden costs</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* VS Divider */}
            <div className="col-span-2 flex items-center justify-center h-full">
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">VS</span>
                </div>
              </div>
            </div>

            {/* Closed API Solution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`col-span-5 relative p-8 rounded-3xl border ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl ${isDark ? 'shadow-gray-900/20 hover:shadow-gray-900/30' : 'shadow-gray-200/50 hover:shadow-gray-300/50'} z-10`}
            >
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gray-800">
                    <Globe className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400">Closed API Solutions</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Your data is sent to unknown servers outside the EU</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">No control over how your sensitive data is handled</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Can't verify if your data is truly secure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">No transparency into how your data is processed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Data can be accessed by third parties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">No control over data retention policies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Your data can be used to train their AI models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">Data can be sold to data brokers</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold leading-tight">
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    Advanced Audio Processing
                  </span>
                </h3>
                <p className="text-xl text-gray-900 dark:text-white leading-relaxed">
                  Experience our powerful audio processing engine with speaker identification and intelligent speech analysis.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Speaker identification",
                  "Voice activity detection",
                  "Overlapped speech detection",
                  "Multi-language support",
                  "High-accuracy transcription"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="relative">
                      <CheckCircle className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 w-7 h-7 bg-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/10 rounded-3xl blur-3xl" />
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mt-32">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-3xl blur-3xl" />
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-cyan-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold leading-tight">
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    Enterprise-Grade Security
                  </span>
                </h3>
                <p className="text-xl text-gray-900 dark:text-white leading-relaxed">
                  Your data security is our top priority with industry-standard encryption and secure infrastructure.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Secure data transmission",
                  "Data privacy controls",
                  "GDPR compliance",
                  "EU-based infrastructure",
                  "Regular security audits"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="relative">
                      <ShieldCheck className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 w-7 h-7 bg-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>
                    <span className="text-lg text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 md:py-40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Ready to Experience the Future of Transcription?
              </span>
            </h2>
            <p className="text-xl text-gray-900 dark:text-white">
              Join forward-thinking professionals who trust Nexotec AI for secure, accurate, and reliable transcription.
              Start your free trial today and transform your audio documentation workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 h-12 bg-gradient-to-r from-primary to-primary/60 hover:from-primary/90 hover:to-primary/50">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="https://calendly.com/nexogenlabs/30min" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                  Schedule Demo
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
                <span className="text-xl font-bold">Nexotec AI</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Secure, GDPR and HIPAA compliant medical ASR transcription and AI models for healthcare providers.
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
                  Careers
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
                  Status
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Nexotec AI. All rights reserved.</p>
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
