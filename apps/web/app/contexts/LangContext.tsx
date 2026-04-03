'use client'
import { createContext, useContext, ReactNode } from 'react'
import { translations, Translations } from '../i18n/translations'

type LangContextType = {
  lang: 'ko'
  t: Translations
}

const LangContext = createContext<LangContextType>({
  lang: 'ko',
  t: translations.ko as unknown as Translations,
})

export function LangProvider({ children }: { children: ReactNode }) {
  return (
    <LangContext.Provider value={{ lang: 'ko', t: translations.ko as Translations }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
