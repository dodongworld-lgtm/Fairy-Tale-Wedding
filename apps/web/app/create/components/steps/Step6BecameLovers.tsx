'use client'
import { useRef } from 'react'
import { buildNarration } from '../../data/projectData'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'becameLovers', data: Partial<SectionData>) => void
  onNext: () => void
}

const TRIGGER_CHIPS = ['설레는 마음', '자연스럽게', '운명이라 느껴서', '용기를 냈어요', '직접 고백했어요']

export function Step6BecameLovers({ project, onSection, onNext }: Props) {
  const sec = project.sections.becameLovers
  const fileRef = useRef<HTMLInputElement>(null)

  const handleTrigger = (t: string) => {
    const narr = buildNarration.becameLovers(t)
    onSection('becameLovers', { customText: t, narration: narr })
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const urls = Array.from(files).slice(0, 3).map(f => URL.createObjectURL(f))
    onSection('becameLovers', { photos: [...sec.photos, ...urls].slice(0, 3) })
  }

  const autoNarr = buildNarration.becameLovers(sec.customText || '')

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-2">연인이 되다</h2>
        <p className="text-sm text-text-muted">연애를 시작하게 된 계기를 담아요</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5">시기 <span className="text-text-muted font-normal">(선택)</span></label>
            <input
              type="text"
              value={sec.date || ''}
              onChange={e => onSection('becameLovers', { date: e.target.value })}
              placeholder="예: 그 해 여름"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5">계기</label>
            <input
              type="text"
              value={sec.customText || ''}
              onChange={e => handleTrigger(e.target.value)}
              placeholder="예: 설레는 마음"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            />
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {TRIGGER_CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => handleTrigger(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                sec.customText === chip
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg-card text-text-secondary border-border hover:bg-primary-light/10 hover:border-primary-light hover:text-primary'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-semibold text-text mb-2">사진 <span className="text-text-muted font-normal">(최대 3장, 필수 1장)</span></label>
          <div className="flex gap-2">
            {sec.photos.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden bg-bg-subtle flex-shrink-0">
                <img src={url} className="w-full h-full object-cover" alt="" />
                <button
                  onClick={() => onSection('becameLovers', { photos: sec.photos.filter((_, j) => j !== i) })}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {sec.photos.length < 3 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-border-hover hover:border-primary hover:bg-primary-light/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[10px] text-text-muted">사진 추가</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
          {sec.photos.length === 0 && (
            <p className="text-xs text-error mt-1.5">사진을 1장 이상 추가해주세요 (필수)</p>
          )}
        </div>

        {/* Narration */}
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">나레이션 <span className="text-text-muted font-normal text-xs">(자동 생성됨)</span></label>
          <textarea
            value={sec.narration || autoNarr}
            onChange={e => onSection('becameLovers', { narration: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none bg-white"
            maxLength={150}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={sec.photos.length === 0}
        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2 cursor-pointer"
      >
        다음
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </button>
    </div>
  )
}
