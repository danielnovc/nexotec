"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useI18n, locales, createLocalizedPath } from "@/lib/i18n"
import { usePathname } from "next/navigation"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ua", name: "Українська", flag: "🇺🇦" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
]

interface LanguageSwitcherProps {
  currentLanguage?: string
  className?: string
}

export default function LanguageSwitcher({ currentLanguage, className = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, setLocale, t } = useI18n()
  const pathname = usePathname()
  
  // Use the currentLanguage prop if provided, otherwise use the i18n locale
  const activeLocale = currentLanguage || locale
  const currentLanguageObj = languages.find(lang => lang.code === activeLocale) || languages[0]

  // Check if we're on a landing page (root or localized routes)
  const isLandingPage = pathname === '/' || 
    pathname === '/de' || 
    pathname === '/fr' || 
    pathname === '/es' || 
    pathname === '/pl' || 
    pathname === '/ru' || 
    pathname === '/ua' || 
    pathname === '/lt'

  // Check if we're on a dashboard page
  const isDashboardPage = pathname.startsWith('/dashboard')

  const handleLanguageChange = (langCode: string) => {
    if (isDashboardPage) {
      // For dashboard pages, just update the i18n locale
      setLocale(langCode as any)
    } else if (isLandingPage) {
      // For landing pages, navigate to the localized route
      if (langCode === 'en') {
        window.location.href = '/'
      } else {
        window.location.href = `/${langCode}`
      }
    } else {
      // For other pages, try to create localized path
      const localizedPath = createLocalizedPath(pathname, langCode as any)
      window.location.href = localizedPath
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguageObj.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  handleLanguageChange(language.code)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left ${
                  language.code === activeLocale
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 