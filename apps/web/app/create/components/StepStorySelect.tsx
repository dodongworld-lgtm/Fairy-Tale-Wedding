'use client'
import { useState } from 'react'
import { useLang } from '../../contexts/LangContext'
import { STORIES_BY_TEMPLATE, StoryTemplate, Background } from '../data/storyData'

const BG_DOT_COLOR: Record<Background, string> = {
  castle:  'bg-slate-400',
  forest:  'bg-emerald-400',
  sea:     'bg-cyan-400',
  meadow:  'bg-green-300',
  city:    'bg-violet-400',
  palace:  'bg-amber-400',
}

const BG_LABEL: Record<Background, string> = {
  castle:  '🏰',
  forest:  '🌲',
  sea:     '🌊',
  meadow:  '🌷',
  city:    '🌆',
  palace:  '✨',
}

type Props = {
  templateType: string
  templateSubType: string
  onNext: (story: StoryTemplate) => void
}

export function StepStorySelect({ templateType, templateSubType, onNext }: Props) {
  const { t } = useLang()
  const [selected, setSelected] = useState<StoryTemplate | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const key = `${templateType}-${templateSubType}`
  const stories = STORIES_BY_TEMPLATE[key] ?? []

  const handleSelect = (story: StoryTemplate) => {
    setSelected(story)
    setExpanded(story.id === expanded ? null : story.id)
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.storySelect.title}</h2>
        <p className="text-sm text-gray-400">{t.storySelect.subtitle}</p>
      </div>

      <div className="space-y-3">
        {stories.map((story) => {
          const isSelected = selected?.id === story.id
          const isExpanded = expanded === story.id
          return (
            <div key={story.id}>
              <button
                onClick={() => handleSelect(story)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm mb-0.5 ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
                      {story.title}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">{story.subtitle}</p>
                    <div className="flex items-center gap-1.5">
                      {story.cuts.map((cut) => (
                        <div
                          key={cut.id}
                          className={`w-3 h-3 rounded-full ${BG_DOT_COLOR[cut.background]}`}
                          title={BG_LABEL[cut.background]}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">5장면</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-1 ml-2 space-y-1.5 overflow-hidden">
                  {story.cuts.map((cut) => (
                    <div key={cut.id} className="flex items-start gap-2.5 px-3 py-2 bg-gray-50 rounded-xl">
                      <span className="text-base flex-shrink-0">{BG_LABEL[cut.background]}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-600">{cut.sceneTitle}</p>
                        <p className="text-xs text-gray-400 truncate">{cut.dialogue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {t.storySelect.select}
      </button>
    </div>
  )
}
