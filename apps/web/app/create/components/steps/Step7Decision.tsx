'use client'
import { useRef } from 'react'
import { buildNarration } from '../../data/projectData'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'decision', data: Partial<SectionData>) => void
  onNext: () => void
}

export function Step7Decision({ project, onSection, onNext }: Props) {
  const sec = project.sections.decision
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (patch: Partial<SectionData>) => {
    const merged = { ...sec, ...patch }
    const narr = buildNarration.decision(merged.date || '', merged.customText || '')
    onSection('decision', { ...patch, narration: narr })
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const urls = Array.from(files).slice(0, 2).map(f => URL.createObjectURL(f))
    onSection('decision', { photos: [...sec.photos, ...urls].slice(0, 2) })
  }

  const autoNarr = buildNarration.decision(sec.date || '', sec.customText || '')

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">부부가 되기로 하다</h2>
        <p className="text-sm text-gray-400">결혼을 결심한 순간을 담아요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">시기 <span className="text-gray-400 font-normal">(선택)</span></label>
          <input
            type="text"
            value={sec.date || ''}
            onChange={e => update({ date: e.target.value })}
            placeholder="예: 2023년 겨울"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">결심 계기</label>
          <textarea
            value={sec.customText || ''}
            onChange={e => update({ customText: e.target.value })}
            placeholder="예: 평생 이 사람과 함께하고 싶다는 확신이 들었어요"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none bg-white"
            maxLength={120}
          />
          <p className="text-right text-xs text-gray-400 mt-1">{(sec.customText || '').length}/120</p>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">사진 <span className="text-gray-400 font-normal">(최대 2장, 필수 1장)</span></label>
          <div className="flex gap-2">
            {sec.photos.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={url} className="w-full h-full object-cover" alt="" />
                <button
                  onClick={() => onSection('decision', { photos: sec.photos.filter((_, j) => j !== i) })}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {sec.photos.length < 2 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[10px] text-gray-400">사진 추가</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
          {sec.photos.length === 0 && (
            <p className="text-xs text-rose-500 mt-1.5">사진을 1장 이상 추가해주세요 (필수)</p>
          )}
        </div>

        {/* Narration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">나레이션 <span className="text-gray-400 font-normal text-xs">(자동 생성됨)</span></label>
          <textarea
            value={sec.narration || autoNarr}
            onChange={e => onSection('decision', { narration: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none bg-white"
            maxLength={150}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={sec.photos.length === 0}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
