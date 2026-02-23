'use client'
import { useState } from 'react'
import { useLang } from '../../contexts/LangContext'

type StyleOptions = { mood: string; background: string; narratorGender: string; language: string }

export function Step3StyleSelect({ onNext, onStyleChange }: { onNext: (opts: StyleOptions) => void; onStyleChange?: (mood: string) => void }) {
  const { t } = useLang()
  const [opts, setOpts] = useState<StyleOptions>({ mood: 'fantasy', background: 'castle', narratorGender: 'female', language: 'ko' })

  const set = (key: keyof StyleOptions, value: string) => {
    setOpts(prev => ({ ...prev, [key]: value }))
    if (key === 'mood') onStyleChange?.(value)
  }

  const Chip = ({ label, field, value }: { label: string; field: keyof StyleOptions; value: string }) => (
    <button
      onClick={() => set(field, value)}
      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
        opts[field] === value
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.step3.title}</h2>
        <p className="text-sm text-gray-400">{t.step3.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t.step3.mood}</p>
          <div className="flex gap-2 flex-wrap">
            <Chip label={t.step3.fantasy} field="mood" value="fantasy" />
            <Chip label={t.step3.romantic} field="mood" value="romantic" />
            <Chip label={t.step3.adventure} field="mood" value="adventure" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t.step3.background}</p>
          <div className="flex gap-2 flex-wrap">
            <Chip label={t.step3.castle} field="background" value="castle" />
            <Chip label={t.step3.forest} field="background" value="forest" />
            <Chip label={t.step3.beach} field="background" value="sea" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t.step3.narration}</p>
          <div className="flex gap-2">
            <Chip label={t.step3.female} field="narratorGender" value="female" />
            <Chip label={t.step3.male} field="narratorGender" value="male" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t.step3.language}</p>
          <div className="flex gap-2">
            <Chip label={t.step3.korean} field="language" value="ko" />
            <Chip label={t.step3.english} field="language" value="en" />
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext(opts)}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        {t.step3.generateBtn}
      </button>
    </div>
  )
}
