'use client'
import { useState } from 'react'
import { useLang } from '../contexts/LangContext'
import { Lang } from '../i18n/translations'

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  const current = LANGS.find(l => l.code === lang) || LANGS[0]

  const select = (code: Lang) => {
    setLang(code)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
          dark
            ? 'text-white/70 hover:text-white hover:bg-white/10'
            : 'text-text-secondary hover:text-text hover:bg-bg-subtle'
        }`}
      >
        <span>{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-32">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => select(l.code)}
                className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left hover:bg-bg-subtle transition-colors cursor-pointer ${
                  lang === l.code ? 'font-semibold text-primary bg-primary-light/30' : 'text-text'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && (
                  <svg className="w-3.5 h-3.5 text-primary ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
