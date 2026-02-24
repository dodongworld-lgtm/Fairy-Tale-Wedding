'use client'
import { useState } from 'react'
import type { ProjectData } from '../data/projectData'
import { DISNEY_CHARACTERS } from '../data/storyData'

type Props = {
  step: number
  project: ProjectData
}

// Section gradient configs per step
const STEP_SCENES = [
  { bg: 'from-slate-800 via-gray-900 to-slate-900', label: '준비' },         // 0
  { bg: 'from-violet-800 via-purple-900 to-indigo-900', label: '캐릭터' },    // 1
  { bg: 'from-indigo-700 via-blue-800 to-indigo-900', label: '오프닝' },      // 2
  { bg: 'from-gray-800 via-gray-900 to-black', label: '예고편' },             // 3
  { bg: 'from-rose-700 via-pink-800 to-rose-900', label: '우리는' },          // 4
  { bg: 'from-emerald-700 via-teal-800 to-emerald-900', label: '만남' },      // 5
  { bg: 'from-amber-600 via-orange-700 to-red-800', label: '연인' },          // 6
  { bg: 'from-blue-700 via-indigo-800 to-violet-900', label: '결심' },        // 7
  { bg: 'from-slate-700 via-gray-800 to-slate-900', label: '감사' },          // 8
  { bg: 'from-indigo-600 via-violet-700 to-purple-800', label: '완성' },      // 9
]

function FloatingCharacter({ color, delay = '0s' }: { color: string; delay?: string }) {
  return (
    <div
      className="absolute bottom-12 w-16 h-24 rounded-2xl flex items-end justify-center overflow-hidden"
      style={{ animation: `float 3s ease-in-out ${delay} infinite`, background: `linear-gradient(135deg, ${color})` }}
    >
      <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-60" fill="white">
        <ellipse cx="30" cy="22" rx="14" ry="16" />
        <path d="M6 75 Q6 52 30 52 Q54 52 54 75Z" />
      </svg>
    </div>
  )
}

function SceneContent({ step, project, exMode }: { step: number; project: ProjectData; exMode: boolean }) {
  const groom = project.groom.variants[project.groom.selectedIdx]
  const bride = project.bride.variants[project.bride.selectedIdx]
  const groomName = project.groomName || '신랑'
  const brideName = project.brideName || '신부'

  if (step === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg className="w-7 h-7 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p className="text-white/90 text-sm font-semibold">준비물을 확인해요</p>
        <div className="space-y-2 w-full max-w-[180px]">
          {['신랑 사진', '신부 사진', '섹션별 사진'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
              </div>
              <span className="text-white/70 text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (step === 1) {
    const groomColor = exMode ? '#8B5CF6, #4F46E5' : groom?.color.replace('from-', '').replace(' to-', ', ').replace(/-\d+/g, (m) => m) || '#8B5CF6, #4F46E5'
    const brideColor = exMode ? '#EC4899, #BE185D' : bride?.color.replace('from-', '').replace(' to-', ', ').replace(/-\d+/g, (m) => m) || '#EC4899, #BE185D'
    return (
      <div className="flex gap-8 items-end justify-center w-full px-6">
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-24 rounded-2xl flex items-end justify-center overflow-hidden opacity-90"
            style={{ background: `linear-gradient(135deg, var(--tw-gradient-from, #8B5CF6), var(--tw-gradient-to, #4F46E5))` }}
          >
            <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-60" fill="white">
              <ellipse cx="30" cy="22" rx="14" ry="16" />
              <path d="M6 75 Q6 52 30 52 Q54 52 54 75Z" />
            </svg>
          </div>
          <span className="text-white/70 text-xs font-medium">{exMode ? '신랑' : groomName}</span>
          <span className="text-white/50 text-[10px]">{exMode ? '캐릭터 A' : (groom?.name || '캐릭터')}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-24 rounded-2xl flex items-end justify-center overflow-hidden opacity-90"
            style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)' }}
          >
            <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-60" fill="white">
              <ellipse cx="30" cy="20" rx="12" ry="14" />
              <path d="M8 75 Q8 54 30 54 Q52 54 52 75Z" />
            </svg>
          </div>
          <span className="text-white/70 text-xs font-medium">{exMode ? '신부' : brideName}</span>
          <span className="text-white/50 text-[10px]">{exMode ? '캐릭터 B' : (bride?.name || '캐릭터')}</span>
        </div>
      </div>
    )
  }

  if (step === 2) {
    const line = exMode
      ? '안녕하세요, 저희 결혼식에 와주셔서 감사합니다!'
      : (project.sections.opening.narration || `안녕하세요, ${groomName}과 ${brideName}입니다.`)
    return (
      <div className="flex flex-col items-center gap-6 px-6 w-full">
        <div className="flex gap-6 items-end justify-center">
          <FloatingCharacter color="#8B5CF6, #4F46E5" delay="0s" />
          <FloatingCharacter color="#EC4899, #BE185D" delay="0.4s" />
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-3 w-full max-w-[220px]">
          <p className="text-white/90 text-xs text-center leading-relaxed">&ldquo;{line}&rdquo;</p>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 w-full">
        <div className="grid grid-cols-3 gap-1.5 w-full max-w-[220px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}
              className="aspect-video rounded-lg overflow-hidden"
              style={{ background: `hsl(${i * 60}, 40%, 30%)`, opacity: 0.7 + i * 0.05 }}
            />
          ))}
        </div>
        <div className="bg-white/20 rounded-lg px-4 py-1.5">
          <p className="text-white/90 text-xs font-bold tracking-wider">
            {exMode ? '우리의 이야기' : (project.sections.trailer.customText || `${groomName} & ${brideName}`)}
          </p>
        </div>
      </div>
    )
  }

  if (step === 4) {
    const gIntro = exMode ? '따뜻하고 유머 넘치는 사람이에요' : (project.sections.whoWeAre.customText || '소개를 입력해주세요')
    const bIntro = exMode ? '밝고 사랑스러운 사람이에요' : project.sections.whoWeAre.place || '소개를 입력해주세요'
    return (
      <div className="flex gap-4 px-4 w-full max-w-[260px]">
        <div className="flex-1 bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-violet-500/40 flex items-center justify-center">
            <svg viewBox="0 0 40 50" className="w-6 h-7 opacity-70" fill="white">
              <ellipse cx="20" cy="14" rx="9" ry="10" />
              <path d="M4 48 Q4 32 20 32 Q36 32 36 48Z" />
            </svg>
          </div>
          <p className="text-white/80 text-[10px] font-semibold">{exMode ? '신랑' : groomName}</p>
          <p className="text-white/60 text-[9px] text-center leading-snug">{gIntro}</p>
        </div>
        <div className="flex-1 bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-pink-500/40 flex items-center justify-center">
            <svg viewBox="0 0 40 50" className="w-6 h-7 opacity-70" fill="white">
              <ellipse cx="20" cy="13" rx="8" ry="9" />
              <path d="M5 48 Q5 33 20 33 Q35 33 35 48Z" />
            </svg>
          </div>
          <p className="text-white/80 text-[10px] font-semibold">{exMode ? '신부' : brideName}</p>
          <p className="text-white/60 text-[9px] text-center leading-snug">{bIntro}</p>
        </div>
      </div>
    )
  }

  // Steps 5-8: narration card + photo placeholder
  const sectionMap: Record<number, { key: keyof typeof project.sections; exDate: string; exPlace: string; exNarr: string }> = {
    5: { key: 'howWeMet',      exDate: '2019년 봄',    exPlace: '대학교 도서관', exNarr: '2019년 봄, 우리는 대학교 도서관에서 처음 만났습니다.' },
    6: { key: 'becameLovers',  exDate: '그 해 여름',   exPlace: '',             exNarr: '함께한 시간 속에서 서로의 소중함을 느꼈고, 우리는 연인이 되었습니다.' },
    7: { key: 'decision',      exDate: '2022년 12월',  exPlace: '',             exNarr: '2022년 12월, 평생 함께하고 싶다는 확신이 들어 우리는 부부가 되기로 했습니다.' },
    8: { key: 'thanks',        exDate: '',             exPlace: '',             exNarr: '와주셔서 감사합니다.' },
  }
  const meta = sectionMap[step]
  if (meta) {
    const section = project.sections[meta.key]
    const narr = exMode ? meta.exNarr : (section.narration || meta.exNarr)
    const hasPhoto = !exMode && section.photos.length > 0
    return (
      <div className="flex flex-col items-center gap-3 px-4 w-full">
        <div className="w-full max-w-[220px] aspect-video rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
          {hasPhoto ? (
            <img src={section.photos[0]} className="w-full h-full object-cover" alt="" />
          ) : (
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25z" />
            </svg>
          )}
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 w-full max-w-[220px]">
          <p className="text-white/80 text-[10px] leading-relaxed text-center">&ldquo;{narr}&rdquo;</p>
        </div>
      </div>
    )
  }

  if (step === 9) {
    const sections = ['오프닝', '예고편', '우리는', '만남', '연인', '결심', '감사']
    return (
      <div className="flex flex-col items-center gap-3 px-4 w-full">
        <p className="text-white/70 text-xs font-semibold mb-1">섹션 체크리스트</p>
        <div className="space-y-1.5 w-full max-w-[200px]">
          {sections.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70 text-[10px]">{s}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export function LiveMockPlayer({ step, project }: Props) {
  const [exMode, setExMode] = useState(true)
  const scene = STEP_SCENES[step] || STEP_SCENES[0]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4">
      {/* 16:9 preview container */}
      <div className="w-full max-w-[480px] aspect-video rounded-2xl overflow-hidden relative shadow-2xl shadow-black/40">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${scene.bg}`} />

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '100px' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SceneContent step={step} project={project} exMode={exMode} />
        </div>

        {/* Step label badge */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{scene.label}</p>
        </div>

        {/* Aspect ratio label */}
        <div className="absolute bottom-3 right-3 bg-black/30 rounded-md px-1.5 py-0.5">
          <p className="text-white/40 text-[9px] font-mono">16:9 · 1080p</p>
        </div>
      </div>

      {/* Example/My input toggle */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setExMode(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            exMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          예시 보기
        </button>
        <button
          onClick={() => setExMode(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            !exMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          내 입력 보기
        </button>
      </div>

    </div>
  )
}
