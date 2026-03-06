'use client'
import { useRef } from 'react'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'thanks', data: Partial<SectionData>) => void
  onNext: () => void
}

export function Step8Thanks({ project, onSection, onNext }: Props) {
  const sec = project.sections.thanks
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-2">감사합니다</h2>
        <p className="text-sm text-text-muted">하객분들께 전하는 마지막 인사예요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">감사 메시지</label>
          <textarea
            value={sec.narration || ''}
            onChange={e => onSection('thanks', { narration: e.target.value })}
            placeholder="와주셔서 감사합니다."
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none bg-white"
            maxLength={120}
          />
          <p className="text-right text-xs text-text-muted mt-1">{(sec.narration || '').length}/120</p>
        </div>

        {/* Optional photo */}
        <div>
          <label className="block text-sm font-semibold text-text mb-2">엔딩 사진 <span className="text-text-muted font-normal">(선택)</span></label>
          <div className="flex gap-2">
            {sec.photos.map((url, i) => (
              <div key={i} className="relative w-32 h-24 rounded-xl overflow-hidden bg-bg-subtle">
                <img src={url} className="w-full h-full object-cover" alt="" />
                <button
                  onClick={() => onSection('thanks', { photos: [] })}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {sec.photos.length === 0 && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-32 h-24 rounded-2xl border-2 border-dashed border-border-hover hover:border-primary hover:bg-primary-light/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-1"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[10px] text-text-muted">사진 추가 (선택)</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
            if (e.target.files?.[0]) {
              onSection('thanks', { photos: [URL.createObjectURL(e.target.files[0])] })
            }
          }} />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        최종 검토하기
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </button>
    </div>
  )
}
