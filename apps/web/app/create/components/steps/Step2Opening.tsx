'use client'
import { buildNarration } from '../../data/projectData'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'opening', data: Partial<SectionData>) => void
  onNext: () => void
}

export function Step2Opening({ project, onSection, onNext }: Props) {
  const sec = project.sections.opening
  const groomName = project.groomName || '신랑'
  const brideName = project.brideName || '신부'

  const handleCustomText = (v: string) => {
    onSection('opening', { customText: v, narration: v || buildNarration.opening(groomName, brideName) })
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">오프닝 인사</h2>
        <p className="text-sm text-gray-400">두 분이 등장하며 하객분께 인사해요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">인사 문장</label>
          <textarea
            value={sec.customText || ''}
            onChange={e => handleCustomText(e.target.value)}
            placeholder={buildNarration.opening(groomName, brideName)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none bg-white"
            maxLength={120}
          />
          <p className="text-right text-xs text-gray-400 mt-1">{(sec.customText || '').length}/120</p>
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-600 mb-1.5">나레이션 미리보기</p>
          <p className="text-sm text-indigo-800 leading-relaxed">
            &ldquo;{sec.narration || buildNarration.opening(groomName, brideName)}&rdquo;
          </p>
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
