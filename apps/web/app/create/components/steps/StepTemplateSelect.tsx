'use client'
import { useState } from 'react'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

const THEMES: Record<string, {
  bg: string
  overlay: string
  accent: string
  tagBg: string
  mood: string
}> = {
  classic: {
    bg: 'from-rose-100 via-amber-50 to-orange-50',
    overlay: 'from-rose-900/60 via-rose-800/30 to-transparent',
    accent: 'text-rose-700',
    tagBg: 'bg-rose-100 text-rose-700',
    mood: '첫 만남부터 프로포즈까지, 시간순으로 담아요',
  },
  daily: {
    bg: 'from-emerald-100 via-teal-50 to-sky-50',
    overlay: 'from-emerald-900/60 via-emerald-800/30 to-transparent',
    accent: 'text-emerald-700',
    tagBg: 'bg-emerald-100 text-emerald-700',
    mood: '특별하지 않아도 괜찮아요. 일상이 곧 우리의 이야기',
  },
  dramatic: {
    bg: 'from-violet-100 via-purple-50 to-fuchsia-50',
    overlay: 'from-violet-900/60 via-violet-800/30 to-transparent',
    accent: 'text-violet-700',
    tagBg: 'bg-violet-100 text-violet-700',
    mood: '영화처럼 극적인 순간들을 모아서',
  },
  family: {
    bg: 'from-amber-100 via-yellow-50 to-orange-50',
    overlay: 'from-amber-900/60 via-amber-800/30 to-transparent',
    accent: 'text-amber-700',
    tagBg: 'bg-amber-100 text-amber-700',
    mood: '부모님과 가족에게 전하는 감사의 이야기',
  },
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col">

      {/* Header — left-aligned, editorial */}
      <div className="pt-8 sm:pt-12 pb-10 sm:pb-14 animate-in fade-in duration-700">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-text">
          어떤 이야기를<br />들려줄까요?
        </h1>
        <p className="text-text-muted mt-4 text-base sm:text-lg">
          템플릿을 선택하면 바로 시작할 수 있어요
        </p>
      </div>

      {/* Template panels — tall, immersive */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
        {STORY_TEMPLATES.map((template, idx) => {
          const theme = THEMES[template.id] || THEMES.classic
          const isActive = activeId === template.id

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id, template.blockIds)}
              onMouseEnter={() => setActiveId(template.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group relative text-left cursor-pointer animate-in fade-in slide-in-from-bottom-4 flex flex-col"
              style={{ animationDelay: `${idx * 120 + 100}ms`, animationFillMode: 'both' }}
            >
              {/* Tall gradient panel */}
              <div className={`relative flex-1 min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b ${theme.bg} transition-all duration-500 ${isActive ? 'scale-[1.02] shadow-2xl' : 'shadow-md'}`}>

                {/* Bottom overlay for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-t ${theme.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Top — icon + number */}
                <div className="relative z-10 p-6 flex items-start justify-between">
                  <span className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    {template.icon}
                  </span>
                  <span className="text-xs font-bold text-text/30 tracking-wider">0{idx + 1}</span>
                </div>

                {/* Center — placeholder for illustration */}
                <div className="relative z-10 flex-1 flex items-center justify-center px-6">
                  <div className="w-full max-w-[160px] aspect-square rounded-2xl bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="text-8xl opacity-50 group-hover:opacity-80 transition-opacity duration-500">{template.icon}</span>
                  </div>
                </div>

                {/* Bottom — info */}
                <div className="relative z-10 p-6 pt-0">
                  {/* Block tags — visible on hover */}
                  <div className={`flex flex-wrap gap-1.5 mb-4 transition-all duration-400 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {template.blockIds.map((blockId) => {
                      const block = BLOCK_MAP[blockId]
                      if (!block) return null
                      return (
                        <span key={blockId} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.tagBg}`}>
                          {block.icon} {block.name}
                        </span>
                      )
                    })}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-text mb-1 group-hover:text-white transition-colors duration-500">
                    {template.name}
                  </h3>
                  <p className="text-sm text-text-muted group-hover:text-white/70 transition-colors duration-500 leading-relaxed">
                    {theme.mood}
                  </p>

                  {/* CTA arrow */}
                  <div className={`mt-4 flex items-center gap-2 transition-all duration-400 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    <span className="text-sm font-bold text-white">시작하기</span>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom option */}
      <div className="py-6 text-center animate-in fade-in duration-700" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
        <button
          type="button"
          onClick={onCustomSelect}
          className="text-sm text-text-muted hover:text-text font-medium cursor-pointer transition-colors inline-flex items-center gap-2"
        >
          <span className="w-8 h-px bg-border" />
          원하는 장면을 직접 골라 구성하기
          <span className="w-8 h-px bg-border" />
        </button>
      </div>
    </div>
  )
}
