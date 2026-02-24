'use client'
import { useRef } from 'react'
import type { ProjectData, SectionData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onSection: (key: 'trailer', data: Partial<SectionData>) => void
  onToggleTrailer: (v: boolean) => void
  onNext: () => void
}

export function Step3Trailer({ project, onSection, onToggleTrailer, onNext }: Props) {
  const sec = project.sections.trailer
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const urls = Array.from(files).slice(0, 6).map(f => URL.createObjectURL(f))
    onSection('trailer', { photos: [...sec.photos, ...urls].slice(0, 6) })
  }

  const removePhoto = (i: number) => {
    const next = sec.photos.filter((_, idx) => idx !== i)
    onSection('trailer', { photos: next })
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">예고편(트레일러)</h2>
        <p className="text-sm text-gray-400">빠른 컷으로 구성되는 하이라이트예요</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div>
          <p className="text-sm font-semibold text-gray-800">예고편 포함</p>
          <p className="text-xs text-gray-400 mt-0.5">6장의 사진으로 빠른 컷을 만들어요</p>
        </div>
        <button
          onClick={() => onToggleTrailer(!project.trailerEnabled)}
          className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
            project.trailerEnabled ? 'bg-indigo-600' : 'bg-gray-200'
          }`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            project.trailerEnabled ? 'translate-x-7' : 'translate-x-1'
          }`} />
        </button>
      </div>

      {project.trailerEnabled && (
        <>
          {/* Photo grid */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">하이라이트 사진 <span className="text-gray-400 font-normal">(최대 6장)</span></p>
            <div className="grid grid-cols-3 gap-2">
              {sec.photos.map((url, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <img src={url} className="w-full h-full object-cover" alt="" />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {sec.photos.length < 6 && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">트레일러 타이틀 <span className="text-gray-400 font-normal">(선택)</span></label>
            <input
              type="text"
              value={sec.customText || ''}
              onChange={e => onSection('trailer', { customText: e.target.value })}
              placeholder={`${project.groomName || '신랑'} & ${project.brideName || '신부'}`}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              maxLength={40}
            />
          </div>
        </>
      )}

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
