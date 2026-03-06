'use client'
import type { ProjectData } from '../../data/projectData'

/* ── Sample portrait data URIs (demo mode) ────────────────────────────────── */
const GROOM_SAMPLE = `data:image/svg+xml,%3Csvg viewBox='0 0 120 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%236366f1'/%3E%3Cstop offset='100%25' stop-color='%234338ca'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='160' fill='url(%23bg)'/%3E%3Cpath d='M10 160 Q15 118 60 112 Q105 118 110 160Z' fill='%231e1b4b'/%3E%3Crect x='52' y='90' width='16' height='24' rx='5' fill='%23fcd34d'/%3E%3Cellipse cx='60' cy='72' rx='28' ry='30' fill='%23fcd34d'/%3E%3Cpath d='M32 62 Q32 40 60 38 Q88 40 88 62 Q84 46 60 44 Q36 46 32 62Z' fill='%233730a3'/%3E%3Ccircle cx='51' cy='70' r='4' fill='white'/%3E%3Ccircle cx='69' cy='70' r='4' fill='white'/%3E%3Ccircle cx='52' cy='70' r='2.5' fill='%231e1b4b'/%3E%3Ccircle cx='70' cy='70' r='2.5' fill='%231e1b4b'/%3E%3Cellipse cx='60' cy='80' rx='3' ry='2' fill='%23f59e0b' opacity='0.5'/%3E%3Cpath d='M51 86 Q60 93 69 86' stroke='%2392400e' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3C/svg%3E`

const BRIDE_SAMPLE = `data:image/svg+xml,%3Csvg viewBox='0 0 120 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ec4899'/%3E%3Cstop offset='100%25' stop-color='%23be185d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='160' fill='url(%23bg)'/%3E%3Cpath d='M10 160 Q15 118 60 112 Q105 118 110 160Z' fill='%23831843'/%3E%3Cpath d='M32 65 Q28 50 28 95' stroke='%23f9a8d4' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M88 65 Q92 50 92 95' stroke='%23f9a8d4' stroke-width='8' stroke-linecap='round'/%3E%3Crect x='52' y='90' width='16' height='24' rx='5' fill='%23fcd34d'/%3E%3Cellipse cx='60' cy='72' rx='28' ry='30' fill='%23fcd34d'/%3E%3Cpath d='M32 62 Q32 38 60 36 Q88 38 88 62 Q84 44 60 42 Q36 44 32 62Z' fill='%23f9a8d4'/%3E%3Ccircle cx='51' cy='70' r='4' fill='white'/%3E%3Ccircle cx='69' cy='70' r='4' fill='white'/%3E%3Ccircle cx='52' cy='70' r='2.5' fill='%23831843'/%3E%3Ccircle cx='70' cy='70' r='2.5' fill='%23831843'/%3E%3Cellipse cx='60' cy='80' rx='3' ry='2' fill='%23f59e0b' opacity='0.5'/%3E%3Cpath d='M51 86 Q60 93 69 86' stroke='%23be185d' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3C/svg%3E`

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
  const isGroom = gender === 'groom'
  const sample = isGroom ? GROOM_SAMPLE : BRIDE_SAMPLE
  const accentRing = isGroom ? 'focus:ring-primary/30' : 'focus:ring-accent/30'
  const overlayBg  = isGroom ? 'bg-primary/80' : 'bg-accent/80'
  const tagColor   = isGroom ? 'bg-primary-light/20 text-primary' : 'bg-accent-light text-accent'
  const idleBorder = isGroom
    ? 'border-primary-light/50 hover:border-primary-light hover:bg-primary-light/20'
    : 'border-accent-light hover:border-accent hover:bg-accent-light/20'
  const activeBorder = isGroom ? 'border-primary-light bg-primary-light/30' : 'border-accent bg-accent-light/50'
  const iconColor  = isGroom ? 'text-primary' : 'text-accent'

  const handleClick = () => {
    // Demo mode: toggle sample photo on/off
    onPhotoChange(photoUrl ? '' : sample)
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      <span className={`self-start text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}>{label}</span>

      {/* Photo area */}
      <button
        type="button"
        onClick={handleClick}
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
              탭하여 샘플 사용
            </div>
          </div>
        )}
        {photoUrl && (
          <div className={`absolute inset-x-0 bottom-0 ${overlayBg} backdrop-blur-sm py-1.5 flex items-center justify-center gap-1`}>
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span className="text-white text-[10px] font-semibold">제거</span>
          </div>
        )}
      </button>

      <p className="text-[10px] text-text-muted text-center leading-tight">
        {photoUrl ? '샘플 이미지 사용 중' : '탭하면 샘플 사진이 올라가요'}<br/>
        <span className="text-text-muted">실제 서비스에서 직접 업로드</span>
      </p>

      <input
        type="text"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder={`${label} 이름`}
        className={`w-full px-3 py-2.5 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 ${accentRing} focus:border-border-hover bg-white transition-shadow`}
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
        <h2 className="text-2xl font-serif font-bold text-text mb-1.5">두 분의 사진을 올려주세요</h2>
        <p className="text-sm text-text-muted">AI가 사진으로 캐릭터를 만들어줘요</p>
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

      <div className="p-4 bg-bg-subtle rounded-2xl border-l-4 border-primary flex items-start gap-3">
        <svg className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
        </svg>
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-semibold text-text">데모 모드</span> — 사진 영역을 탭하면 샘플 이미지로 미리보기가 가능해요
        </p>
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer flex items-center justify-center gap-2"
      >
        다음
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </button>
    </div>
  )
}
