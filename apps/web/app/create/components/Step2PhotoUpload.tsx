'use client'
import { useState, useRef } from 'react'

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean; previewUrl?: string }

type Props = {
  projectId: string
  person1: string
  person2: string
  onNext: (photos: UploadedPhoto[]) => void
}

function PhotoSlot({
  label,
  name,
  photo,
  onSelect,
}: {
  label: string
  name: string
  photo: UploadedPhoto | null
  onSelect: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">{label}</p>

      {/* Upload area */}
      <button
        type="button"
        onClick={onSelect}
        className="w-full relative group cursor-pointer"
      >
        <div className={`w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-dashed transition-all ${
          photo
            ? 'border-indigo-400 shadow-lg shadow-indigo-100'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/40'
        }`}>
          {photo?.previewUrl ? (
            <>
              <img src={photo.previewUrl} alt={name} className="w-full h-full object-cover" />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/>
                </svg>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
              {/* Silhouette */}
              <svg viewBox="0 0 80 100" className="w-16 h-20 text-gray-200" fill="currentColor">
                <ellipse cx="40" cy="28" rx="18" ry="20" />
                <path d="M10 95 Q10 65 40 65 Q70 65 70 95Z" />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                </svg>
                <span className="text-xs text-gray-400">사진 올리기</span>
              </div>
            </div>
          )}
        </div>

        {/* Name tag */}
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
          photo ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-500'
        }`}>
          {name || label}
        </div>
      </button>

      {/* Transformation hint */}
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
  const [photo1, setPhoto1] = useState<UploadedPhoto | null>(null)
  const [photo2, setPhoto2] = useState<UploadedPhoto | null>(null)
  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (p: UploadedPhoto) => void,
    isPrimary: boolean
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    setter({
      photoId: `local-${Date.now()}`,
      fileName: file.name,
      isFacePrimary: isPrimary,
      previewUrl: URL.createObjectURL(file),
    })
    e.target.value = ''
  }

  const canAdvance = photo1 && photo2

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
          photo={photo1}
          onSelect={() => ref1.current?.click()}
        />
        <PhotoSlot
          label="상대방"
          name={person2}
          photo={photo2}
          onSelect={() => ref2.current?.click()}
        />
      </div>

      <input
        ref={ref1}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => handleFile(e, setPhoto1, true)}
      />
      <input
        ref={ref2}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => handleFile(e, setPhoto2, false)}
      />

      <button
        onClick={() => {
          if (canAdvance) onNext([photo1!, photo2!])
        }}
        disabled={!canAdvance}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer mt-4"
      >
        다음
      </button>
    </div>
  )
}
