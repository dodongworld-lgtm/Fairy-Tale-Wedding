'use client'

import { useState } from 'react'
import { STORY_BLOCKS, BLOCK_MAP } from '../../data/blockDefs'

interface Props {
  selectedBlocks: string[]
  onChangeBlocks: (blockIds: string[]) => void
  onNext: () => void
}

const CATEGORY_ORDER = ['소개', '만남', '연애', '특별', '전환', '가족', '약속']

export function StepBlockPicker({ selectedBlocks, onChangeBlocks, onNext }: Props) {
  const [shake, setShake] = useState(false)

  const blocksByCategory = CATEGORY_ORDER.map(cat => ({
    category: cat,
    blocks: STORY_BLOCKS.filter(b => b.category === cat),
  })).filter(g => g.blocks.length > 0)

  const isSelected = (id: string) => selectedBlocks.includes(id)
  const selectionIndex = (id: string) => selectedBlocks.indexOf(id) + 1

  function handleToggle(id: string) {
    if (isSelected(id)) {
      onChangeBlocks(selectedBlocks.filter(b => b !== id))
    } else if (selectedBlocks.length < 5) {
      onChangeBlocks([...selectedBlocks, id])
    } else {
      // Already 5 selected — subtle shake feedback
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  function handleRemove(id: string) {
    onChangeBlocks(selectedBlocks.filter(b => b !== id))
  }

  function handleMoveUp(idx: number) {
    if (idx <= 0) return
    const next = [...selectedBlocks]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChangeBlocks(next)
  }

  function handleMoveDown(idx: number) {
    if (idx >= selectedBlocks.length - 1) return
    const next = [...selectedBlocks]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChangeBlocks(next)
  }

  const canProceed = selectedBlocks.length === 5

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-1.5">
          우리 이야기에 담을 장면을 골라주세요
        </h2>
        <p className="text-sm text-text-muted">
          5개를 선택하면 다음으로 넘어갈 수 있어요
        </p>
      </div>

      {/* Selection counter badge */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
            canProceed
              ? 'bg-primary/10 text-primary'
              : 'bg-bg-subtle text-text-secondary'
          }`}
        >
          {selectedBlocks.length} / 5 선택됨
        </span>
        {shake && (
          <span className="text-xs text-text-muted animate-pulse">
            최대 5개까지 선택할 수 있어요
          </span>
        )}
      </div>

      {/* Block grid by category */}
      <div className="space-y-5">
        {blocksByCategory.map(({ category, blocks }) => (
          <div key={category}>
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {blocks.map(block => {
                const selected = isSelected(block.id)
                const idx = selectionIndex(block.id)
                return (
                  <button
                    key={block.id}
                    type="button"
                    onClick={() => handleToggle(block.id)}
                    className={`relative bg-bg-card rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-primary shadow-sm ring-1 ring-primary/20'
                        : 'border-border hover:border-border-hover hover:shadow-sm'
                    }`}
                  >
                    {/* Check badge with number */}
                    {selected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        {idx}
                      </span>
                    )}
                    <span className="text-lg leading-none">{block.icon}</span>
                    <p className="text-sm font-semibold text-text mt-1.5 leading-tight">
                      {block.name}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                      {block.subtitle}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected blocks order section */}
      {selectedBlocks.length > 0 && (
        <div className="bg-bg-subtle rounded-2xl p-4 space-y-2">
          <p className="text-xs font-bold text-text-secondary mb-1">선택 순서</p>
          <div className="flex flex-col gap-1.5">
            {selectedBlocks.map((id, idx) => {
              const block = BLOCK_MAP[id]
              if (!block) return null
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-bg-card rounded-xl px-3 py-2 border border-border"
                >
                  {/* Order number */}
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  {/* Icon + name */}
                  <span className="text-sm flex-1 text-text">
                    {block.icon} {block.name}
                  </span>
                  {/* Reorder arrows */}
                  <button
                    type="button"
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-0.5 text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="위로 이동"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === selectedBlocks.length - 1}
                    className="p-0.5 text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="아래로 이동"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(id)}
                    className="p-0.5 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="선택 해제"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={`w-full py-3 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
          canProceed
            ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg cursor-pointer'
            : 'bg-primary text-white opacity-40 cursor-not-allowed'
        }`}
      >
        이 구성으로 시작하기
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  )
}
