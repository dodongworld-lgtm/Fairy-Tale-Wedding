'use client'
import { useState } from 'react'

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean; previewUrl?: string }

type Props = {
  projectId: string
  person1: string
  person2: string
  onNext: (photos: UploadedPhoto[]) => void
}

const SAMPLE_AVATARS = [
  'from-rose-400 to-pink-600',
  'from-violet-400 to-indigo-600',
]

function PhotoSlot({
  label,
  name,
  filled,
  avatarGradient,
  onSelect,
}: {
  label: string
  name: string
  filled: boolean
  avatarGradient: string
  onSelect: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">{label}</p>

      <button type="button" onClick={onSelect} className="w-full relative group cursor-pointer">
        <div className={`w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
          filled
            ? 'border-indigo-400 shadow-lg shadow-indigo-100'
            : 'border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/40'
        }`}>
          {filled ? (
            <div className={`w-full h-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center relative`}>
              {/* Sample face silhouette */}
              <svg viewBox="0 0 80 100" className="w-24 h-32 text-white/40" fill="currentColor">
                <ellipse cx="40" cy="32" rx="20" ry="22" />
                <path d="M8 100 Q8 68 40 68 Q72 68 72 100Z" />
              </svg>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold">변경</span>
              </div>
              {/* Check badge */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
              <svg viewBox="0 0 80 100" className="w-16 h-20 text-gray-200" fill="currentColor">
                <ellipse cx="40" cy="28" rx="18" ry="20" />
                <path d="M10 95 Q10 65 40 65 Q70 65 70 95Z" />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                <span className="text-xs text-gray-400">눌러서 추가</span>
              </div>
            </div>
          )}
        </div>

        {/* Name tag */}
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
          filled ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-500'
        }`}>
          {name || label}
        </div>
      </button>

      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-gray-400">
        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
        <span>AI가 동화 캐릭터로 변환</span>
      </div>
    </div>
  )
}

export function Step2PhotoUpload({ person1, person2, onNext }: Props) {
  const [filled1, setFilled1] = useState(false)
  const [filled2, setFilled2] = useState(false)

  const canAdvance = filled1 && filled2

  const handleNext = () => {
    onNext([
      { photoId: 'sample-1', fileName: 'photo1.jpg', isFacePrimary: true },
      { photoId: 'sample-2', fileName: 'photo2.jpg', isFacePrimary: false },
    ])
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">두 사람의 사진을 올려주세요</h2>
        <p className="text-sm text-gray-400">각각 얼굴이 잘 보이는 사진 1장씩 필요해요</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-2">
        <PhotoSlot
          label="나"
          name={person1}
          filled={filled1}
          avatarGradient={SAMPLE_AVATARS[0]}
          onSelect={() => setFilled1(f => !f)}
        />
        <PhotoSlot
          label="상대방"
          name={person2}
          filled={filled2}
          avatarGradient={SAMPLE_AVATARS[1]}
          onSelect={() => setFilled2(f => !f)}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!canAdvance}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer mt-4"
      >
        다음
      </button>
    </div>
  )
}
