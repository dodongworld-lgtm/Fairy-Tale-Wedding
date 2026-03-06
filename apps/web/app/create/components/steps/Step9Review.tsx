'use client'
import { useState } from 'react'
import type { ProjectData, SectionKey } from '../../data/projectData'

type Props = {
  project: ProjectData
  onFinish: () => Promise<void>
}

const SECTION_LABELS: { key: SectionKey; label: string; required: boolean }[] = [
  { key: 'opening',      label: '오프닝 인사',    required: false },
  { key: 'whoWeAre',     label: '우리는 누구인지', required: false },
  { key: 'howWeMet',     label: '어떻게 만났나',  required: true  },
  { key: 'becameLovers', label: '연인이 되다',     required: true  },
  { key: 'decision',     label: '부부가 되기로',  required: true  },
  { key: 'thanks',       label: '감사합니다',      required: false },
]

export function Step9Review({ project, onFinish }: Props) {
  const [rendering, setRendering] = useState(false)
  const [done, setDone] = useState(false)

  const missingRequired = SECTION_LABELS.filter(
    s => s.required && project.sections[s.key].photos.length === 0
  )

  const canRender = missingRequired.length === 0

  const handleRender = async () => {
    setRendering(true)
    await Promise.all([
      onFinish(),
      new Promise(r => setTimeout(r, 2000)),
    ])
    setRendering(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="w-full flex flex-col items-center gap-6 py-8 text-center">
        <div className="w-20 h-20 bg-bg-subtle border border-border rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-text mb-2">영상 준비 중이에요!</h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-xs">
            1080p MP4로 렌더링 후 다운로드 링크를 보내드릴게요.<br />
            <span className="text-primary font-medium">곧 제공 예정입니다.</span>
          </p>
        </div>
        <a href="/dashboard" className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors">
          대시보드로 가기
        </a>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-2">최종 검토</h2>
        <p className="text-sm text-text-muted">모든 섹션을 확인하고 영상을 완성해요</p>
      </div>

      {/* Section checklist */}
      <div className="space-y-2">
        {SECTION_LABELS.map(({ key, label, required }) => {
          const sec = project.sections[key]
          const hasPhoto = sec.photos.length > 0
          const hasNarr = sec.narration.trim().length > 0
          const ok = !required || hasPhoto
          return (
            <div key={key} className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border ${ok ? 'bg-bg-card border-border hover:shadow-sm transition-shadow' : 'bg-error/10 border-error/15'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${ok ? 'bg-primary' : 'bg-error/60'}`}>
                  {ok ? (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-text">{label}</span>
                {required && <span className="text-[10px] text-text-muted">(필수)</span>}
              </div>
              <div className="flex items-center gap-1.5">
                {hasPhoto && <span className="text-[10px] bg-bg-subtle rounded px-1.5 py-0.5 text-text-secondary">사진 {sec.photos.length}장</span>}
                {hasNarr && <span className="text-[10px] bg-primary-light/20 rounded px-1.5 py-0.5 text-primary">나레이션</span>}
              </div>
            </div>
          )
        })}
      </div>

      {missingRequired.length > 0 && (
        <div className="p-4 bg-error/10 rounded-xl border border-error/15">
          <p className="text-sm text-error font-medium">
            필수 사진이 없는 섹션: {missingRequired.map(s => s.label).join(', ')}
          </p>
          <p className="text-xs text-error/60 mt-1">이전 단계로 돌아가서 추가해주세요.</p>
        </div>
      )}

      <button
        onClick={handleRender}
        disabled={!canRender || rendering}
        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer flex items-center justify-center gap-2"
      >
        {rendering ? (
          <>
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            영상 생성 중...
          </>
        ) : (
          <>
            영상 완성하기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </>
        )}
      </button>
    </div>
  )
}
