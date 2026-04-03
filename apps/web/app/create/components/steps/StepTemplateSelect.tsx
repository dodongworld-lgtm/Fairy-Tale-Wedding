'use client'
import { useState } from 'react'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = STORY_TEMPLATES.find(t => t.id === selectedId)
  const blocks = selected?.blockIds.map(id => BLOCK_MAP[id]).filter(Boolean) || []

  return (
    <div className="w-full py-10 sm:py-14">

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text leading-tight mb-2">
        어떤 스토리가<br />우리를 가장 잘 표현할까요?
      </h1>
      <p className="text-text-muted text-sm mb-10">마음에 드는 구성을 골라주세요. 나중에 자유롭게 수정할 수 있어요.</p>

      {/* Cards — 2x2 with image */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {STORY_TEMPLATES.map((template) => {
          const isSelected = selectedId === template.id
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedId(template.id)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${isSelected ? 'border-primary shadow-md' : 'border-transparent hover:border-border'}`}
            >
              {/* Image area — replace src with real images later */}
              <div className="aspect-[3/4] bg-bg-subtle relative">
                <img
                  src={`/images/templates/${template.id}.jpg`}
                  alt={template.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                {/* Fallback when no image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-30">{template.icon}</span>
                </div>
              </div>
              {/* Label */}
              <div className="p-3 bg-bg">
                <p className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-text'} transition-colors`}>
                  {template.name}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">{template.subtitle}</p>
              </div>
              {/* Check */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected — show blocks */}
      {selected && (
        <div className="mb-8 animate-in fade-in duration-300">
          <p className="text-xs text-text-muted mb-3">이런 장면이 들어가요</p>
          <div className="flex flex-wrap gap-2">
            {blocks.map((block, i) => (
              <span key={block.id} className="text-xs px-3 py-1.5 rounded-full bg-bg-subtle text-text-secondary font-medium">
                {block.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <button
        type="button"
        onClick={() => {
          if (selected) onSelectTemplate(selected.id, selected.blockIds)
        }}
        disabled={!selected}
        className="w-full py-3.5 bg-text text-bg text-sm font-semibold rounded-xl disabled:opacity-15 disabled:cursor-not-allowed hover:opacity-80 transition-opacity cursor-pointer"
      >
        다음
      </button>
      <button
        type="button"
        onClick={onCustomSelect}
        className="w-full mt-3 text-sm text-text-muted hover:text-text cursor-pointer transition-colors text-center py-2"
      >
        직접 구성하기
      </button>
    </div>
  )
}
