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
      alt="Transcrib Logo"
      style={{ height: '50px', width: '160px' }}
      className="object-contain"
    />
  </div>
);

export default function FloatingHeader({ isDark, toggleTheme, scrollY }: FloatingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const useCases = [
    { name: 'Medical Professionals', href: '#medical', icon: <Stethoscope className="w-4 h-4" /> },
    { name: 'Lawyers', href: '#lawyers', icon: <Scale className="w-4 h-4" /> },
    { name: 'Education', href: '#education', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Journalists', href: '#journalists', icon: <FileText className="w-4 h-4" /> },
    { name: 'Business Meetings', href: '#business', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Content Creators', href: '#content', icon: <Video className="w-4 h-4" /> },
    { name: 'Researchers', href: '#research', icon: <Brain className="w-4 h-4" /> },
    { name: 'Customer Support', href: '#support', icon: <Users className="w-4 h-4" /> }
  ];

  const navItems = [
    { name: 'Documentation', href: '/documentation', icon: <FileText className="w-4 h-4" /> },
    { name: 'Security', href: '#security', icon: <Shield className="w-4 h-4" /> },
    { name: 'Pricing', href: '#pricing', icon: <Layers className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Terminal className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Holographic Navigation */}
      {isClient && (
        <nav suppressHydrationWarning className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          scrollY > 100 
            ? `${isDark ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border ${isDark ? 'border-cyan-500/30' : 'border-blue-500/30'} shadow-2xl` 
            : `${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm border ${isDark ? 'border-white/10' : 'border-black/10'}`
        } rounded-2xl px-4 md:px-6 py-2 w-[98%] md:w-[95%] lg:w-[90%] max-w-[1050px]`}>
          
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo isDark={isDark} />
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-8 mx-12">
              {/* Use Cases Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsUseCasesOpen(true)}
                onMouseLeave={() => setIsUseCasesOpen(false)}
              >
                <button className="group flex items-center space-x-2 text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative">
                  <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300`}>
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 transition-colors duration-300`}>Use Cases</span>
                  <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 transition-all duration-300 group-hover:rotate-180`} />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </button>
                
                {/* Dropdown Menu */}
                {isUseCasesOpen && (
                  <div className={`absolute top-full left-0 mt-2 w-80 ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-cyan-500/30' : 'border-blue-500/30'} rounded-xl shadow-2xl py-2 z-50`}>
                    <div className="grid grid-cols-2 gap-1">
                      {useCases.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 relative hover:bg-cyan-500/10 rounded-lg"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300`}>
                            {item.icon}
                          </div>
                          <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 transition-colors duration-300`}>{item.name}</span>
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
                  className="group flex items-center space-x-2 text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 transition-colors duration-300`}>{item.name}</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Link href="/login">
                <span className={`group flex items-center space-x-2 text-sm font-medium ${isDark ? 'text-white' : 'text-black'} hover:text-cyan-400 transition-all duration-300 cursor-pointer relative`}>
                  <LogIn className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300`} />
                  <span className={`${isDark ? 'text-white' : 'text-black'} group-hover:text-cyan-400 transition-colors duration-300`}>Login</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              
              <Link href="/login">
                <Button className={`h-9 px-5 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium transition-all duration-300 text-sm`}>
                  Get Started
                </Button>
              </Link>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-white/20 hover:bg-white/30' : 'bg-black/20 hover:bg-black/30'} transition-all duration-300 group`}
              >
                {isDark ? 
                  <Sun className={`w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500`} /> : 
                  <Moon className={`w-4 h-4 text-black group-hover:rotate-180 transition-transform duration-500`} />
                }
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/30">
              <div className="mb-4">
                <div className="text-sm font-medium text-cyan-400 mb-2">Use Cases</div>
                <div className="grid grid-cols-2 gap-2">
                  {useCases.slice(0, 6).map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 py-2 px-3 text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`${isDark ? 'text-white' : 'text-black'}`}>{item.icon}</div>
                      <span className={`${isDark ? 'text-white' : 'text-black'}`}>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 py-2 text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`${isDark ? 'text-white' : 'text-black'}`}>{item.icon}</div>
                  <span className={`${isDark ? 'text-white' : 'text-black'}`}>{item.name}</span>
                </a>
              ))}
              
              <div className="pt-3 border-t border-cyan-500/30">
                <Link href="/login">
                  <Button className={`w-full h-9 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium transition-all duration-300 text-sm`}>
                    Sign In
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