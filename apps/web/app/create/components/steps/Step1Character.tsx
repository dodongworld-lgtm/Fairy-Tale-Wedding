'use client'
import { useRef } from 'react'
import type { ProjectData } from '../../data/projectData'

type Props = {
  project: ProjectData
  onChange: (field: 'groomName' | 'brideName' | 'groomPhoto' | 'bridePhoto', value: string) => void
  onNext: () => void
}

/* ── Photo guide illustration ─────────────────────────────────────────────── */
function PhotoGuideIllustration({ gender }: { gender: 'groom' | 'bride' }) {
  const isGroom = gender === 'groom'
  return (
    <svg viewBox="0 0 80 90" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="72" height="82" rx="8" stroke={isGroom ? '#6366F1' : '#EC4899'} strokeWidth="2.5" strokeDasharray="5 3"/>
      <path d="M14 88 Q14 70 40 70 Q66 70 66 88Z" fill={isGroom ? '#E0E7FF' : '#FCE7F3'} stroke={isGroom ? '#818CF8' : '#F9A8D4'} strokeWidth="2"/>
      <rect x="34" y="56" width="12" height="16" rx="6" fill={isGroom ? '#E0E7FF' : '#FCE7F3'} stroke={isGroom ? '#818CF8' : '#F9A8D4'} strokeWidth="2"/>
      <ellipse cx="40" cy="40" rx="18" ry="20" fill={isGroom ? '#E0E7FF' : '#FCE7F3'} stroke={isGroom ? '#818CF8' : '#F9A8D4'} strokeWidth="2.5"/>
      {isGroom ? (
        <path d="M22 34 Q22 20 40 19 Q58 20 58 34 Q54 24 40 23 Q26 24 22 34Z" fill="#818CF8"/>
      ) : (
        <>
          <path d="M22 34 Q22 20 40 19 Q58 20 58 34 Q54 24 40 23 Q26 24 22 34Z" fill="#F9A8D4"/>
          <path d="M22 34 Q18 52 22 72" stroke="#F9A8D4" strokeWidth="5" strokeLinecap="round"/>
          <path d="M58 34 Q62 52 58 72" stroke="#F9A8D4" strokeWidth="5" strokeLinecap="round"/>
        </>
      )}
      <circle cx="34" cy="40" r="2.5" fill={isGroom ? '#4F46E5' : '#DB2777'}/>
      <circle cx="46" cy="40" r="2.5" fill={isGroom ? '#4F46E5' : '#DB2777'}/>
      <path d="M35 50 Q40 55 45 50" stroke={isGroom ? '#4F46E5' : '#DB2777'} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="40" y1="4" x2="40" y2="15" stroke={isGroom ? '#6366F1' : '#EC4899'} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
    </svg>
  )
}

/* ── Upload Card ──────────────────────────────────────────────────────────── */
function PhotoUploadCard({
  label, gender, name, photoUrl, onNameChange, onPhotoChange,
}: {
  label: string; gender: 'groom' | 'bride'; name: string; photoUrl: string
  onNameChange: (v: string) => void; onPhotoChange: (url: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const isGroom = gender === 'groom'
  const accentRing = isGroom ? 'focus:ring-indigo-400' : 'focus:ring-pink-400'
  const overlayBg  = isGroom ? 'bg-indigo-600' : 'bg-pink-500'
  const tagColor   = isGroom ? 'bg-indigo-100 text-indigo-600' : 'bg-pink-100 text-pink-600'
  const idleBorder = isGroom
    ? 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/40'
    : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50/40'
  const activeBorder = isGroom ? 'border-indigo-400 bg-indigo-50' : 'border-pink-400 bg-pink-50'
  const iconColor  = isGroom ? 'text-indigo-500' : 'text-pink-500'

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onPhotoChange(URL.createObjectURL(file))
    e.target.value = ''
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}>{label}</span>

      {/* Photo area */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={`w-full aspect-[3/4] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative ${photoUrl ? activeBorder : idleBorder}`}
      >
        {photoUrl ? (
          <img src={photoUrl} className="w-full h-full object-cover" alt={label}/>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
            <div className="w-3/4 h-3/4">
              <PhotoGuideIllustration gender={gender}/>
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${iconColor}`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              사진 업로드
            </div>
          </div>
        )}
        {photoUrl && (
          <div className={`absolute inset-x-0 bottom-0 ${overlayBg} py-1.5 flex items-center justify-center gap-1`}>
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
            </svg>
            <span className="text-white text-[10px] font-semibold">변경</span>
          </div>
        )}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile}/>

      <p className="text-[10px] text-gray-400 text-center leading-tight">
        얼굴이 잘 보이는<br/>어깨까지 나온 정면 사진
      </p>

      <input
        type="text"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder={`${label} 이름`}
        className={`w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${accentRing} focus:border-transparent bg-white transition-shadow`}
      />
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────── */
export function Step1Character({ project, onChange, onNext }: Props) {
  const canProceed = project.groomName.trim().length > 0 && project.brideName.trim().length > 0

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1.5">두 분의 사진을 올려주세요</h2>
        <p className="text-sm text-gray-400">AI가 사진으로 캐릭터를 만들어줘요</p>
      </div>

      <div className="flex gap-4">
        <PhotoUploadCard
          label="신랑" gender="groom"
          name={project.groomName} photoUrl={project.groomPhoto}
          onNameChange={v => onChange('groomName', v)}
          onPhotoChange={v => onChange('groomPhoto', v)}
        />
        <PhotoUploadCard
          label="신부" gender="bride"
          name={project.brideName} photoUrl={project.bridePhoto}
          onNameChange={v => onChange('brideName', v)}
          onPhotoChange={v => onChange('bridePhoto', v)}
        />
      </div>

      <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
        <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
        </svg>
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">좋은 사진 조건</span> — 밝은 조명, 정면, 얼굴 선명, 선글라스·마스크 없음
        </p>
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
