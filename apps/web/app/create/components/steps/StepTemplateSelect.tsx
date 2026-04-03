'use client'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-1">
          어떤 스토리를 만들어볼까요?
        </h2>
        <p className="text-sm text-text-muted mb-8">
          템플릿을 선택하면 추천 구성으로 시작해요
        </p>
      </div>

      {/* 2x2 grid (single column on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STORY_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelectTemplate(template.id, template.blockIds)}
            className="bg-bg-card rounded-2xl border border-border p-5 text-left transition-all hover:border-border-hover hover:scale-[1.02] cursor-pointer flex flex-col gap-3"
          >
            {/* Icon */}
            <span className="text-4xl leading-none">{template.icon}</span>

            {/* Name & subtitle */}
            <div>
              <p className="text-base font-bold text-text">{template.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{template.subtitle}</p>
            </div>

            {/* Block name pills */}
            <div className="flex flex-wrap gap-1.5">
              {template.blockIds.map((blockId) => {
                const block = BLOCK_MAP[blockId]
                if (!block) return null
                return (
                  <span
                    key={blockId}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-bg-subtle text-text-secondary"
                  >
                    {block.name}
                  </span>
                )
              })}
            </div>
          </button>
        ))}
      </div>

      {/* Custom select button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onCustomSelect}
          className="text-sm text-primary font-semibold hover:underline cursor-pointer transition-colors"
        >
          직접 고를래요
        </button>
      </div>
    </div>
  )
}
