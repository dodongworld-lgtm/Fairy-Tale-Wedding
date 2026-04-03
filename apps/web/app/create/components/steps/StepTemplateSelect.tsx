'use client'
import { useState } from 'react'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

const ACCENTS: Record<string, { dot: string; ring: string }> = {
  classic: { dot: 'bg-rose-400', ring: 'ring-rose-200' },
  daily: { dot: 'bg-emerald-400', ring: 'ring-emerald-200' },
  dramatic: { dot: 'bg-violet-400', ring: 'ring-violet-200' },
  family: { dot: 'bg-amber-400', ring: 'ring-amber-200' },
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center">

      {/* Header */}
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <p className="text-xs tracking-[0.25em] uppercase text-text-muted mb-4">Step 1</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-text leading-tight mb-3">
          우리의 이야기,<br />어떻게 담아볼까요?
        </h1>
        <p className="text-text-muted text-sm">
          스토리 구성을 골라주세요. 나중에 자유롭게 수정할 수 있어요.
        </p>
      </div>

      {/* Template cards — horizontal scroll on mobile, grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
        {STORY_TEMPLATES.map((template, idx) => {
          const accent = ACCENTS[template.id] || ACCENTS.classic
          const isHovered = hoveredId === template.id

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id, template.blockIds)}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative text-left cursor-pointer animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100 + 200}ms`, animationFillMode: 'both' }}
            >
              {/* Card */}
              <div className={`relative bg-bg-card border rounded-2xl p-6 pb-5 transition-all duration-300 ${isHovered ? `border-transparent ring-2 ${accent.ring} shadow-lg -translate-y-1` : 'border-border/70 shadow-sm'}`}>

                {/* Number + accent dot */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className={`w-2 h-2 rounded-full transition-transform duration-300 ${accent.dot} ${isHovered ? 'scale-125' : ''}`} />
                  <span className="text-[11px] text-text-muted tracking-wide">0{idx + 1}</span>
                </div>

                {/* Icon — large, muted */}
                <div className={`text-4xl mb-4 transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
                  {template.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text mb-1">{template.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-5">{template.subtitle}</p>

                {/* Block flow — vertical timeline */}
                <div className="space-y-0">
                  {template.blockIds.map((blockId, i) => {
                    const block = BLOCK_MAP[blockId]
                    if (!block) return null
                    return (
                      <div key={blockId} className="flex items-center gap-2.5 py-1.5">
                        <div className="w-5 flex justify-center">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? accent.dot : 'bg-border'}`} />
                        </div>
                        <span className={`text-xs transition-colors duration-300 ${isHovered ? 'text-text-secondary' : 'text-text-muted'}`}>
                          {block.name}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Hover CTA */}
                <div className={`mt-5 pt-4 border-t border-border/40 text-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-xs font-semibold text-primary">이 구성으로 시작하기 →</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Divider + custom option */}
      <div className="flex items-center gap-4 animate-in fade-in duration-700" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
        <div className="flex-1 h-px bg-border/50" />
        <button
          type="button"
          onClick={onCustomSelect}
          className="text-xs text-text-muted hover:text-primary font-medium cursor-pointer transition-colors whitespace-nowrap"
        >
          원하는 장면을 직접 고를래요
        </button>
        <div className="flex-1 h-px bg-border/50" />
      </div>
    </div>
  )
}
