'use client'
import { useState } from 'react'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

const META: Record<string, {
  recommend: string
  example: string
  color: string
  activeBg: string
}> = {
  classic: {
    recommend: '처음 만들어보는 커플',
    example: '"우리의 첫 만남부터 프로포즈까지를 영화처럼 담고 싶어요"',
    color: 'border-rose-300 bg-rose-50',
    activeBg: 'bg-rose-50/50',
  },
  daily: {
    recommend: '소소한 일상이 행복인 커플',
    example: '"거창한 이벤트보다 같이 요리하고 산책하는 게 우리다워요"',
    color: 'border-teal-300 bg-teal-50',
    activeBg: 'bg-teal-50/50',
  },
  dramatic: {
    recommend: '극적인 에피소드가 있는 커플',
    example: '"장거리 연애, 반대를 이겨낸 이야기를 담고 싶어요"',
    color: 'border-violet-300 bg-violet-50',
    activeBg: 'bg-violet-50/50',
  },
  family: {
    recommend: '부모님께 감사를 전하고 싶은 커플',
    example: '"어린 시절부터 키워주신 부모님께 보여드리고 싶어요"',
    color: 'border-amber-300 bg-amber-50',
    activeBg: 'bg-amber-50/50',
  },
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="w-full py-10 sm:py-14">

      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text leading-tight mb-3">
          어떤 이야기를 담을까요?
        </h1>
        <p className="text-text-muted text-sm sm:text-base">
          템플릿을 고르면 장면 구성이 자동으로 세팅돼요. 나중에 수정할 수 있어요.
        </p>
      </div>

      {/* Template cards — 2x2, informative */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
        {STORY_TEMPLATES.map((template, idx) => {
          const meta = META[template.id] || META.classic
          const blocks = template.blockIds.map(id => BLOCK_MAP[id]).filter(Boolean)
          const isSelected = selectedId === template.id

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedId(template.id)}
              className={`relative text-left rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200 cursor-pointer ${isSelected ? `${meta.color} shadow-sm` : 'border-border/60 bg-bg hover:border-border'}`}
            >
              {/* Recommend badge */}
              {idx === 0 && (
                <span className="absolute -top-2.5 right-5 text-[10px] font-bold bg-text text-bg px-2.5 py-0.5 rounded-full">
                  가장 많이 선택
                </span>
              )}

              {/* Title + who */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-black text-text mb-1">{template.name}</h3>
                <p className="text-xs text-text-muted">{meta.recommend}에게 추천</p>
              </div>

              {/* Scene flow — numbered steps */}
              <div className="flex items-center gap-1 mb-4 overflow-x-auto">
                {blocks.map((block, i) => (
                  <div key={block.id} className="flex items-center gap-1 flex-shrink-0">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${isSelected ? 'bg-white/80 text-text' : 'bg-bg-subtle text-text-secondary'} transition-colors`}>
                      <span className="text-[10px] text-text-muted">{i + 1}</span>
                      <span>{block.name}</span>
                    </div>
                    {i < blocks.length - 1 && (
                      <svg className="w-3 h-3 text-text-muted/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              {/* Example quote */}
              <p className="text-xs text-text-muted leading-relaxed italic">
                {meta.example}
              </p>
            </button>
          )
        })}
      </div>

      {/* Action area */}
      <div className="flex flex-col gap-3 items-start">
        <button
          type="button"
          onClick={() => {
            if (selectedId) {
              const t = STORY_TEMPLATES.find(t => t.id === selectedId)
              if (t) onSelectTemplate(t.id, t.blockIds)
            }
          }}
          disabled={!selectedId}
          className="w-full sm:w-auto px-8 py-3.5 bg-text text-bg text-sm font-semibold rounded-full disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 transition-opacity cursor-pointer"
        >
          {selectedId
            ? `"${STORY_TEMPLATES.find(t => t.id === selectedId)?.name}" 으로 시작하기`
            : '위에서 템플릿을 선택해주세요'}
        </button>
        <button
          type="button"
          onClick={onCustomSelect}
          className="text-sm text-text-muted hover:text-text cursor-pointer transition-colors pl-1"
        >
          직접 구성하기 →
        </button>
      </div>
    </div>
  )
}
