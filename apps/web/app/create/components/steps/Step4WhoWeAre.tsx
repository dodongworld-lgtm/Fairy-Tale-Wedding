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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">우리는 누구인지</h2>
        <p className="text-sm text-gray-400">신랑·신부를 각각 소개해요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{groomName} 한 줄 소개</label>
          <input
            type="text"
            value={groomIntro}
            onChange={e => onSection('whoWeAre', {
              customText: e.target.value,
              narration: buildNarration.whoWeAre(groomName, brideName),
            })}
            placeholder="예: 따뜻하고 유머 넘치는 사람이에요"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{brideName} 한 줄 소개</label>
          <input
            type="text"
            value={brideIntro}
            onChange={e => onSection('whoWeAre', {
              place: e.target.value,
              narration: buildNarration.whoWeAre(groomName, brideName),
            })}
            placeholder="예: 밝고 사랑스러운 사람이에요"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            maxLength={60}
          />
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-600 mb-1.5">나레이션 미리보기</p>
          <p className="text-sm text-indigo-800 leading-relaxed">&ldquo;{sec.narration || autoNarr}&rdquo;</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">나레이션 수정 <span className="text-gray-400 font-normal text-xs">(자동 생성됨)</span></label>
          <textarea
            value={sec.narration || autoNarr}
            onChange={e => onSection('whoWeAre', { narration: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none bg-white"
            maxLength={150}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
