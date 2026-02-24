'use client'
import { useRef } from 'react'
import { buildNarration } from '../../data/projectData'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'howWeMet', data: Partial<SectionData>) => void
  onNext: () => void
}

export function Step5HowWeMet({ project, onSection, onNext }: Props) {
  const sec = project.sections.howWeMet
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (patch: Partial<SectionData>) => {
    const merged = { ...sec, ...patch }
    const narr = buildNarration.howWeMet(merged.date || '', merged.place || '')
    onSection('howWeMet', { ...patch, narration: merged.narration === buildNarration.howWeMet(sec.date || '', sec.place || '') ? narr : merged.narration })
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const urls = Array.from(files).slice(0, 3).map(f => URL.createObjectURL(f))
    onSection('howWeMet', { photos: [...sec.photos, ...urls].slice(0, 3) })
  }

  const autoNarr = buildNarration.howWeMet(sec.date || '', sec.place || '')

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">어떻게 만났나</h2>
        <p className="text-sm text-gray-400">처음 만난 이야기를 담아요</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">시기</label>
            <input
              type="text"
              value={sec.date || ''}
              onChange={e => update({ date: e.target.value })}
              placeholder="예: 2019년 봄"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">장소</label>
            <input
              type="text"
              value={sec.place || ''}
              onChange={e => update({ place: e.target.value })}
              placeholder="예: 대학교 도서관"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            />
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">사진 <span className="text-gray-400 font-normal">(최대 3장, 필수 1장)</span></label>
          <div className="flex gap-2">
            {sec.photos.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={url} className="w-full h-full object-cover" alt="" />
                <button
                  onClick={() => onSection('howWeMet', { photos: sec.photos.filter((_, j) => j !== i) })}
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
            onChange={e => onSection('howWeMet', { narration: e.target.value })}
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
