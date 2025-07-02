"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import Link from "next/link"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", path: "/" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", path: "/de" },
  { code: "fr", name: "Français", flag: "🇫🇷", path: "/fr" },
  { code: "es", name: "Español", flag: "🇪🇸", path: "/es" },
  { code: "pr", name: "Português", flag: "🇧🇷", path: "/pr" },
  { code: "pl", name: "Polski", flag: "🇵🇱", path: "/pl" },
  { code: "ru", name: "Русский", flag: "🇷🇺", path: "/ru" },
  { code: "ua", name: "Українська", flag: "🇺🇦", path: "/ua" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹", path: "/lt" },
]

interface LanguageSwitcherProps {
  currentLang?: string
  className?: string
}

export default function LanguageSwitcher({ currentLang = "en", className = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
          <div className="py-2">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={language.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                  language.code === currentLang
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </Link>
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