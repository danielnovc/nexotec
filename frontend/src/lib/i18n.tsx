"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from './locales/en'
import de from './locales/de'

export const locales = ['en', 'es', 'de', 'fr', 'ru', 'ua', 'lt', 'pl'] as const
export type Locale = typeof locales[number]

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  tWithParams: (key: string, params: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [translations, setTranslations] = useState<any>(en)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // First, try to detect locale from URL path
      const pathname = window.location.pathname
      const pathLocale = getLocaleFromPathname(pathname)
      
      // If we found a locale in the URL, use it
      if (pathLocale !== 'en') {
        setLocale(pathLocale)
        localStorage.setItem('locale', pathLocale)
        return
      }
      
      // Otherwise, check localStorage
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && locales.includes(savedLocale)) {
        setLocale(savedLocale)
      } else {
        // Finally, fall back to browser language
        const browserLang = navigator.language.split('-')[0] as Locale
        if (locales.includes(browserLang)) {
          setLocale(browserLang)
          localStorage.setItem('locale', browserLang)
        }
      }
    }
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        switch (locale) {
          case 'en':
            setTranslations(en)
            break
          case 'de':
            setTranslations(de)
            break
          case 'es':
            const es = await import('./locales/es')
            setTranslations(es.default)
            break
          case 'fr':
            const fr = await import('./locales/fr')
            setTranslations(fr.default)
            break
          case 'ru':
            const ru = await import('./locales/ru')
            setTranslations(ru.default)
            break
          case 'ua':
            const ua = await import('./locales/ua')
            setTranslations(ua.default)
            break
          case 'lt':
            const lt = await import('./locales/lt')
            setTranslations(lt.default)
            break
          case 'pl':
            const pl = await import('./locales/pl')
            setTranslations(pl.default)
            break
          default:
            setTranslations(en)
        }
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error)
        setTranslations(en)
      }
    }
    loadTranslations()
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale)
    }
  }, [locale])

  const t = (key: string): string => {
    // Handle nested keys like 'settings.title'
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const tWithParams = (key: string, params: Record<string, string | number>): string => {
    let translation = (translations as any)[key] || key
    Object.entries(params).forEach(([param, value]) => {
      const regex = new RegExp(`\\{${param}\\}`, 'g')
      translation = translation.replace(regex, String(value))
    })
    return translation
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tWithParams }}>
      {children}
    </I18nContext.Provider>
  )
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1] as Locale
  if (locales.includes(potentialLocale)) {
    return potentialLocale
  }
  return 'en'
}

export function createLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/')
  const currentLocale = segments[1] as Locale
  if (locales.includes(currentLocale)) {
    segments[1] = locale
  } else {
    segments.splice(1, 0, locale)
  }
  return segments.join('/')
} 