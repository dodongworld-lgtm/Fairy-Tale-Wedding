'use client'
import { buildNarration } from '../../data/projectData'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'whoWeAre', data: Partial<SectionData>) => void
  onNext: () => void
}

export function Step4WhoWeAre({ project, onSection, onNext }: Props) {
  const sec = project.sections.whoWeAre
  const groomName = project.groomName || '신랑'
  const brideName = project.brideName || '신부'

  // We use customText for groom intro, place for bride intro
  const groomIntro = sec.customText || ''
  const brideIntro = sec.place || ''

  const autoNarr = buildNarration.whoWeAre(groomName, brideName)

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold text-text mb-2">우리는 누구인지</h2>
        <p className="text-sm text-text-muted">신랑·신부를 각각 소개해요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">{groomName} 한 줄 소개</label>
          <input
            type="text"
            value={groomIntro}
            onChange={e => onSection('whoWeAre', {
              customText: e.target.value,
              narration: buildNarration.whoWeAre(groomName, brideName),
            })}
            placeholder="예: 따뜻하고 유머 넘치는 사람이에요"
            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">{brideName} 한 줄 소개</label>
          <input
            type="text"
            value={brideIntro}
            onChange={e => onSection('whoWeAre', {
              place: e.target.value,
              narration: buildNarration.whoWeAre(groomName, brideName),
            })}
            placeholder="예: 밝고 사랑스러운 사람이에요"
            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
            maxLength={60}
          />
        </div>

        <div className="p-5 bg-bg-subtle rounded-2xl border-l-4 border-primary">
          <p className="text-xs font-semibold text-primary mb-1.5">나레이션 미리보기</p>
          <p className="text-sm text-text leading-relaxed">&ldquo;{sec.narration || autoNarr}&rdquo;</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">나레이션 수정 <span className="text-text-muted font-normal text-xs">(자동 생성됨)</span></label>
          <textarea
            value={sec.narration || autoNarr}
            onChange={e => onSection('whoWeAre', { narration: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none bg-white"
            maxLength={150}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        다음
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </button>
    </div>
  )
}
