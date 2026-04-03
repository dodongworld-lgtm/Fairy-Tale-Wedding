'use client'
import { STORY_TEMPLATES, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void
}

const GRADIENTS: Record<string, string> = {
  classic: 'from-rose-50 to-amber-50',
  daily: 'from-sky-50 to-emerald-50',
  dramatic: 'from-violet-50 to-rose-50',
  family: 'from-amber-50 to-orange-50',
}

const BORDER_HOVER: Record<string, string> = {
  classic: 'hover:border-rose-300',
  daily: 'hover:border-emerald-300',
  dramatic: 'hover:border-violet-300',
  family: 'hover:border-amber-300',
}

export function StepTemplateSelect({ onSelectTemplate, onCustomSelect }: Props) {
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-text mb-2">
          어떤 스토리를 만들어볼까요?
        </h2>
        <p className="text-sm text-text-muted">
          템플릿을 선택하면 추천 구성으로 바로 시작해요
        </p>
      </div>

      {/* 4 cards in a row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STORY_TEMPLATES.map((template, idx) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelectTemplate(template.id, template.blockIds)}
            className={`group bg-gradient-to-br ${GRADIENTS[template.id] || 'from-bg-subtle to-bg-card'} rounded-2xl border border-border/60 ${BORDER_HOVER[template.id] || 'hover:border-border-hover'} p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Icon */}
            <div className="text-5xl leading-none group-hover:scale-110 transition-transform duration-300">
              {template.icon}
            </div>

            {/* Name & subtitle */}
            <div>
              <p className="text-lg font-bold text-text">{template.name}</p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{template.subtitle}</p>
            </div>

            {/* Block flow */}
            <div className="flex flex-col gap-1.5 mt-auto pt-3 border-t border-border/40">
              {template.blockIds.map((blockId, i) => {
                const block = BLOCK_MAP[blockId]
                if (!block) return null
                return (
                  <div key={blockId} className="flex items-center gap-1.5">
                    <span className="text-xs">{block.icon}</span>
                    <span className="text-[11px] text-text-secondary leading-tight">{block.name}</span>
                  </div>
                )
              })}
            </div>
          </button>
        ))}
      </div>

      {/* Custom select */}
      <div className="flex justify-center pt-2 animate-in fade-in duration-700" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <button
          type="button"
          onClick={onCustomSelect}
          className="group text-sm text-text-secondary hover:text-primary font-medium cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          직접 구성하기
        </button>
      </div>
    </div>
  )
}
