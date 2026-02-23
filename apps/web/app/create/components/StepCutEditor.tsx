'use client'
import { useState } from 'react'
import { useLang } from '../../contexts/LangContext'
import { CutTemplate, Background } from '../data/storyData'

export interface Cut extends CutTemplate {}

const BACKGROUNDS: { id: Background; label: string; emoji: string }[] = [
  { id: 'castle',  label: '성',   emoji: '🏰' },
  { id: 'forest',  label: '숲',   emoji: '🌲' },
  { id: 'sea',     label: '바다', emoji: '🌊' },
  { id: 'meadow',  label: '들판', emoji: '🌷' },
  { id: 'city',    label: '도시', emoji: '🌆' },
  { id: 'palace',  label: '궁전', emoji: '✨' },
]

type Props = {
  initialCuts: CutTemplate[]
  onNext: (cuts: Cut[]) => void
}

export function StepCutEditor({ initialCuts, onNext }: Props) {
  const { t } = useLang()
  const [cuts, setCuts] = useState<Cut[]>(() => initialCuts.map(c => ({ ...c })))
  const [activeCut, setActiveCut] = useState(0)

  const current = cuts[activeCut]

  const updateBackground = (bg: Background) => {
    setCuts(prev => prev.map((c, i) => i === activeCut ? { ...c, background: bg } : c))
  }

  const updateDialogue = (text: string) => {
    if (text.length > 100) return
    setCuts(prev => prev.map((c, i) => i === activeCut ? { ...c, dialogue: text } : c))
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.cutEditor.title}</h2>
        <p className="text-sm text-gray-400">{t.cutEditor.subtitle}</p>
      </div>

      {/* Cut tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {cuts.map((cut, i) => (
          <button
            key={cut.id}
            onClick={() => setActiveCut(i)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeCut === i
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {i + 1}/{cuts.length}
          </button>
        ))}
      </div>

      {/* Current cut editor */}
      {current && (
        <div className="space-y-5">
          {/* Scene title */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {t.cutEditor.cut} {activeCut + 1}
            </span>
            <span className="text-sm text-gray-500 font-medium">{current.sceneTitle}</span>
          </div>

          {/* Background selection */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2.5">{t.cutEditor.background}</p>
            <div className="flex flex-wrap gap-2">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => updateBackground(bg.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                    current.background === bg.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span>{bg.emoji}</span>
                  <span>{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dialogue textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500">{t.cutEditor.dialogue}</p>
              <span className="text-xs text-gray-400">{current.dialogue.length}/100</span>
            </div>
            <textarea
              value={current.dialogue}
              onChange={(e) => updateDialogue(e.target.value)}
              placeholder={t.cutEditor.dialoguePlaceholder}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 resize-none transition-colors"
            />
          </div>

          {/* Navigation between cuts */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCut(i => Math.max(0, i - 1))}
              disabled={activeCut === 0}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 disabled:opacity-30 hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              ← 이전
            </button>
            <button
              onClick={() => setActiveCut(i => Math.min(cuts.length - 1, i + 1))}
              disabled={activeCut === cuts.length - 1}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 disabled:opacity-30 hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              다음 →
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex gap-1.5">
        {cuts.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= activeCut ? 'bg-indigo-500' : 'bg-gray-100'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onNext(cuts)}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        {t.cutEditor.complete}
      </button>
    </div>
  )
}
