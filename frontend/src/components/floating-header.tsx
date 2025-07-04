"use client"

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sun,
  Moon,
  Radio,
  Mic,
  Brain,
  Shield,
  Layers,
  Terminal,
  ChevronDown,
  Stethoscope,
  Scale,
  GraduationCap,
  Users,
  Briefcase,
  FileText,
  Video,
  LogIn
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './language-switcher';
import { useI18n } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

interface FloatingHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  scrollY: number;
}

// Separate Logo Component for better customization
const Logo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex-shrink-0">
    <img
      src={isDark ? "/logo_white.png" : "/logo_black.png"}
      alt="Nexogen Logo"
      style={{ height: '50px', width: '160px' }}
      className="object-contain"
    />
  </div>
);

export default function FloatingHeader({ isDark, toggleTheme, scrollY }: FloatingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect current language from URL path
  const getCurrentLanguage = () => {
    if (pathname === '/') return 'en';
    if (pathname.startsWith('/de')) return 'de';
    if (pathname.startsWith('/fr')) return 'fr';
    if (pathname.startsWith('/es')) return 'es';
    if (pathname.startsWith('/pl')) return 'pl';
    if (pathname.startsWith('/ru')) return 'ru';
    if (pathname.startsWith('/ua')) return 'ua';
    if (pathname.startsWith('/lt')) return 'lt';
    return 'en'; // default
  };

  const currentLanguage = getCurrentLanguage();

  const useCases = [
    { name: t('medicalProfessionals'), href: '#medical', icon: <Stethoscope className="w-4 h-4" /> },
    { name: t('therapists'), href: '#therapists', icon: <Users className="w-4 h-4" /> },
    { name: t('lawyers'), href: '#lawyers', icon: <Scale className="w-4 h-4" /> },
    { name: t('businessProfessionals'), href: '#business', icon: <Briefcase className="w-4 h-4" /> },
    { name: t('education'), href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
    { name: t('contentCreators'), href: '#content', icon: <Video className="w-4 h-4" /> },
    { name: t('researchers'), href: '#research', icon: <Brain className="w-4 h-4" /> },
    { name: t('customerSupport'), href: '#support', icon: <Users className="w-4 h-4" /> }
  ];

  const navItems = [
    { name: t('features'), href: '/documentation/live-recording', icon: <Layers className="w-4 h-4" /> },
    { name: t('security'), href: '/documentation/encryption', icon: <Shield className="w-4 h-4" /> },
    { name: t('documentation'), href: '/documentation', icon: <FileText className="w-4 h-4" /> },
    { name: t('pricing'), href: '/documentation/pricing', icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Holographic Navigation */}
      {isClient && (
        <nav suppressHydrationWarning className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          scrollY > 100 
            ? `${isDark ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border ${isDark ? 'border-primary/30' : 'border-primary/30'} shadow-2xl` 
            : `${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm border ${isDark ? 'border-white/10' : 'border-black/10'}`
        } rounded-xl md:rounded-2xl px-3 md:px-6 py-2 w-[96%] md:w-[95%] lg:w-[90%] max-w-[1400px] min-w-[320px]`}>
          
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-shrink-0 mr-4">
              <Logo isDark={isDark} />
            </div>
            
            {/* Navigation Items - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 mx-4 xl:mx-8 flex-1 justify-center">
              {/* Use Cases Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsUseCasesOpen(true)}
                onMouseLeave={() => setIsUseCasesOpen(false)}
              >
                <button className="group flex items-center space-x-2 text-sm font-medium hover:text-primary transition-all duration-300 relative">
                  <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary group-hover:scale-110 transition-all duration-300`}>
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary transition-colors duration-300`}>{t('useCases')}</span>
                  <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'} group-hover:text-primary transition-all duration-300 group-hover:rotate-180`} />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300" />
                </button>
                
                {/* Dropdown Menu */}
                {isUseCasesOpen && (
                  <div className={`absolute top-full left-0 mt-2 w-80 ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-primary/30' : 'border-primary/30'} rounded-xl shadow-2xl py-2 z-50`}>
                    <div className="grid grid-cols-2 gap-1">
                      {useCases.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 relative hover:bg-primary/10 rounded-lg"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary group-hover:scale-110 transition-all duration-300`}>
                            {item.icon}
                          </div>
                          <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary transition-colors duration-300`}>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center space-x-2 text-sm font-medium hover:text-primary transition-all duration-300 relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary group-hover:scale-110 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary transition-colors duration-300`}>{item.name}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 ml-auto">
              {/* Login - Hidden on mobile */}
              <Link href="/login" className="hidden md:block">
                <span className={`group flex items-center space-x-2 text-sm font-medium ${isDark ? 'text-white' : 'text-black'} hover:text-primary transition-all duration-300 cursor-pointer relative`}>
                  <LogIn className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'} group-hover:text-primary group-hover:scale-110 transition-all duration-300`} />
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-primary transition-colors duration-300`}>{t('login')}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              
              {/* Get Started - Hidden on mobile */}
              <Link href="/login" className="hidden md:block">
                <Button className={`h-8 md:h-9 px-4 md:px-5 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium transition-all duration-300 text-sm`}>
                  {t('getStarted')}
                </Button>
              </Link>
              
              {/* Language Switcher */}
              <LanguageSwitcher currentLanguage={currentLanguage} />
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-white/20 hover:bg-white/30' : 'bg-black/20 hover:bg-black/30'} transition-all duration-300 group touch-manipulation`}
              >
                {isDark ? 
                  <Sun className={`w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500`} /> : 
                  <Moon className={`w-4 h-4 text-black group-hover:rotate-180 transition-transform duration-500`} />
                }
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all duration-300 touch-manipulation"
              >
                {isMenuOpen ? <X className="w-4 h-4 text-primary" /> : <Menu className="w-4 h-4 text-primary" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-primary/30">
              {/* Use Cases Section */}
              <div className="mb-6">
                <div className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  {t('useCases')}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {useCases.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`${isDark ? 'text-white' : 'text-black'}`}>{item.icon}</div>
                      <span className={`${isDark ? 'text-white' : 'text-black'}`}>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="mb-6">
                <div className="text-sm font-medium text-primary mb-3">{t('navigation')}</div>
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`${isDark ? 'text-white' : 'text-black'}`}>{item.icon}</div>
                    <span className={`${isDark ? 'text-white' : 'text-black'}`}>{item.name}</span>
                  </a>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="pt-4 border-t border-primary/30 space-y-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className={`w-full h-10 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium transition-all duration-300 text-sm`}>
                    <LogIn className="w-4 h-4 mr-2" />
                    {t('signIn')}
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-10 font-medium transition-all duration-300 text-sm">
                    {t('getStartedFree')}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
}