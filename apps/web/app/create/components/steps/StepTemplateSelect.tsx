'use client'
import { useState } from 'react'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

const MOODS: Record<string, string> = {
  classic: '만남에서 프로포즈까지, 시간순으로 담는 우리의 이야기',
  daily: '특별하지 않아도 괜찮아요. 일상이 곧 우리의 이야기',
  dramatic: '영화처럼. 극적인 순간들을 모아 하나의 장면으로',
  family: '부모님과 가족에게 전하는 감사, 그리고 약속',
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between py-10 sm:py-16">

      {/* Question */}
      <div className="mb-12 sm:mb-20">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight text-text">
          어떤 이야기를<br />들려줄까요?
        </h1>
      </div>

      {/* Template list — accordion, typography-driven */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="border-t border-text/10">
          {STORY_TEMPLATES.map((template) => {
            const isExpanded = expandedId === template.id
            const blocks = template.blockIds.map(id => BLOCK_MAP[id]).filter(Boolean)

            return (
              <div key={template.id} className="border-b border-text/10">
                {/* Row — clickable */}
                <button
                  type="button"
                  onClick={() => toggle(template.id)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer group text-left"
                >
                  <div className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-text group-hover:text-primary transition-colors duration-300">
                      {template.name}
                    </span>
                    <span className="text-sm text-text-muted hidden sm:block">
                      {MOODS[template.id]}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Expanded content */}
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 sm:pb-10">
                      {/* Mobile mood */}
                      <p className="text-sm text-text-muted mb-6 sm:hidden">{MOODS[template.id]}</p>

                      {/* Story flow — horizontal */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-8">
                        {blocks.map((block, i) => (
                          <div key={block.id} className="flex items-center gap-2 sm:gap-3">
                            <span className="text-sm sm:text-base text-text font-medium whitespace-nowrap">
                              {block.name}
                            </span>
                            {i < blocks.length - 1 && (
                              <span className="text-text-muted/40 text-xs">→</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Select button */}
                      <button
                        type="button"
                        onClick={() => onSelectTemplate(template.id, template.blockIds)}
                        className="px-6 py-3 bg-text text-bg text-sm font-semibold rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        이 구성으로 시작
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Custom */}
      <div className="mt-10 sm:mt-16">
        <button
          type="button"
          onClick={onCustomSelect}
          className="text-sm text-text-muted hover:text-text cursor-pointer transition-colors"
        >
          직접 구성하기 →
        </button>
      </div>
    </div>
  )
}
