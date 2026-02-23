'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../contexts/LangContext'

type FormData = { person1: string; person2: string }

const INPUT_CLS = "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-shadow"

export function Step1CoupleInfo({ onNext, onPreviewChange }: { onNext: (data: any) => void; onPreviewChange?: (data: Partial<FormData>) => void }) {
  const { t } = useLang()
  const [formData, setFormData] = useState<FormData>({ person1: '', person2: '' })
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 200)
    return () => clearTimeout(timer)
  }, [])

  const set = (field: keyof FormData, value: string) => {
    const next = { ...formData, [field]: value }
    setFormData(next)
    onPreviewChange?.(next)
  }

  const canAdvance = formData.person1.trim() && formData.person2.trim()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); if (canAdvance) onNext(formData) }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">{t.step1.names}</h2>
      <p className="text-sm text-gray-400 mb-8">{t.step1.namesHint}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-2">{t.step1.myName}</label>
          <input
            ref={inputRef}
            value={formData.person1}
            onChange={e => set('person1', e.target.value)}
            onKeyDown={handleKeyDown}
            className={INPUT_CLS}
            placeholder="지훈"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-2">{t.step1.partnerName}</label>
          <input
            value={formData.person2}
            onChange={e => set('person2', e.target.value)}
            onKeyDown={handleKeyDown}
            className={INPUT_CLS}
            placeholder="수연"
            autoComplete="off"
          />
        </div>
      </div>

      <button
        onClick={() => { if (canAdvance) onNext(formData) }}
        disabled={!canAdvance}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        {t.step1.next}
      </button>
    </div>
  )
}
