'use client'
import { useState } from 'react'
import type { ProjectData } from '../data/projectData'

type Props = {
  step: number
  project: ProjectData
}

// Steps: 0=checklist, 1=photos, 2=opening, 3=whoWeAre,
//        4=howWeMet, 5=becameLovers, 6=decision, 7=thanks, 8=review
const STEP_SCENES = [
  { bg: 'from-slate-800 via-gray-900 to-slate-900',      label: '준비'   },  // 0
  { bg: 'from-violet-800 via-purple-900 to-indigo-900',  label: '사진'   },  // 1
  { bg: 'from-indigo-700 via-blue-800 to-indigo-900',    label: '오프닝' },  // 2
  { bg: 'from-rose-700 via-pink-800 to-rose-900',        label: '우리는' },  // 3
  { bg: 'from-emerald-700 via-teal-800 to-emerald-900',  label: '만남'   },  // 4
  { bg: 'from-amber-600 via-orange-700 to-red-800',      label: '연인'   },  // 5
  { bg: 'from-blue-700 via-indigo-800 to-violet-900',    label: '결심'   },  // 6
  { bg: 'from-slate-700 via-gray-800 to-slate-900',      label: '감사'   },  // 7
  { bg: 'from-indigo-600 via-violet-700 to-purple-800',  label: '완성'   },  // 8
]

function SceneContent({ step, project, exMode }: { step: number; project: ProjectData; exMode: boolean }) {
  const groomName = project.groomName || '신랑'
  const brideName = project.brideName || '신부'

  // Step 0 — checklist
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

  // Step 1 — photo upload preview (side by side)
  if (step === 1) {
    const hasGroomPhoto = !exMode && project.groomPhoto
    const hasBridePhoto = !exMode && project.bridePhoto
    return (
      <div className="flex gap-5 items-end justify-center px-6 w-full">
        {/* Groom */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-24 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20 flex items-end justify-center">
            {hasGroomPhoto ? (
              <img src={project.groomPhoto} className="w-full h-full object-cover" alt="신랑" />
            ) : (
              <svg viewBox="0 0 60 80" className="w-14 h-18 opacity-50" fill="white">
                <ellipse cx="30" cy="20" rx="14" ry="16"/>
                <path d="M5 78 Q5 52 30 52 Q55 52 55 78Z"/>
              </svg>
            )}
          </div>
          <span className="text-white/80 text-xs font-semibold">{exMode ? '신랑' : groomName}</span>
        </div>
        {/* Bride */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-24 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20 flex items-end justify-center">
            {hasBridePhoto ? (
              <img src={project.bridePhoto} className="w-full h-full object-cover" alt="신부" />
            ) : (
              <svg viewBox="0 0 60 80" className="w-14 h-18 opacity-50" fill="white">
                <ellipse cx="30" cy="18" rx="12" ry="14"/>
                <path d="M8 78 Q8 54 30 54 Q52 54 52 78Z"/>
              </svg>
            )}
          </div>
          <span className="text-white/80 text-xs font-semibold">{exMode ? '신부' : brideName}</span>
        </div>
      </div>
    )
  }

  // Step 2 — opening: two characters side by side + subtitle at very bottom
  if (step === 2) {
    const line = exMode
      ? '안녕하세요, 저희 결혼식에 와주셔서 감사합니다!'
      : (project.sections.opening.narration || `안녕하세요, ${groomName}과 ${brideName}입니다.`)
    return (
      // absolute inset-0 fills the entire preview frame
      <div className="absolute inset-0">
        {/* Characters: centered, bottom-anchored, side by side */}
        <div className="absolute inset-x-0 top-4 bottom-14 flex items-end justify-center gap-10">
          {/* Groom */}
          <div className="flex flex-col items-center gap-2" style={{ animation: 'float 3s ease-in-out 0s infinite' }}>
            <div className="w-20 h-28 rounded-2xl overflow-hidden flex items-end justify-center"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #4F46E5)' }}>
              <svg viewBox="0 0 60 80" className="w-16 h-20 opacity-70" fill="white">
                <ellipse cx="30" cy="20" rx="14" ry="16"/>
                <path d="M5 78 Q5 52 30 52 Q55 52 55 78Z"/>
              </svg>
            </div>
            <span className="text-white/80 text-xs font-semibold drop-shadow">{groomName}</span>
          </div>
          {/* Bride */}
          <div className="flex flex-col items-center gap-2" style={{ animation: 'float 3s ease-in-out 0.5s infinite' }}>
            <div className="w-20 h-28 rounded-2xl overflow-hidden flex items-end justify-center"
              style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)' }}>
              <svg viewBox="0 0 60 80" className="w-16 h-20 opacity-70" fill="white">
                <ellipse cx="30" cy="18" rx="12" ry="14"/>
                <path d="M8 78 Q8 54 30 54 Q52 54 52 78Z"/>
              </svg>
            </div>
            <span className="text-white/80 text-xs font-semibold drop-shadow">{brideName}</span>
          </div>
        </div>
        {/* Subtitle — pinned to bottom of frame */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-3 px-5">
          <p className="text-white text-[11px] sm:text-xs text-center leading-relaxed font-medium">
            &ldquo;{line}&rdquo;
          </p>
        </div>
      </div>
    )
  }

  // Step 3 — whoWeAre
  if (step === 3) {
    const gIntro = exMode ? '따뜻하고 유머 넘치는 사람이에요' : (project.sections.whoWeAre.customText || '소개를 입력해주세요')
    const bIntro = exMode ? '밝고 사랑스러운 사람이에요' : project.sections.whoWeAre.place || '소개를 입력해주세요'
    return (
      <div className="flex gap-4 px-4 w-full max-w-[260px]">
        <div className="flex-1 bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-violet-500/40 flex items-center justify-center">
            <svg viewBox="0 0 40 50" className="w-6 h-7 opacity-70" fill="white">
              <ellipse cx="20" cy="14" rx="9" ry="10"/>
              <path d="M4 48 Q4 32 20 32 Q36 32 36 48Z"/>
            </svg>
          </div>
          <p className="text-white/80 text-[10px] font-semibold">{exMode ? '신랑' : groomName}</p>
          <p className="text-white/60 text-[9px] text-center leading-snug">{gIntro}</p>
        </div>
        <div className="flex-1 bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-pink-500/40 flex items-center justify-center">
            <svg viewBox="0 0 40 50" className="w-6 h-7 opacity-70" fill="white">
              <ellipse cx="20" cy="13" rx="8" ry="9"/>
              <path d="M5 48 Q5 33 20 33 Q35 33 35 48Z"/>
            </svg>
          </div>
          <p className="text-white/80 text-[10px] font-semibold">{exMode ? '신부' : brideName}</p>
          <p className="text-white/60 text-[9px] text-center leading-snug">{bIntro}</p>
        </div>
      </div>
    )
  }

  // Steps 4-7: narration card + photo placeholder
  const sectionMap: Record<number, { key: keyof typeof project.sections; exNarr: string }> = {
    4: { key: 'howWeMet',      exNarr: '2019년 봄, 우리는 대학교 도서관에서 처음 만났습니다.' },
    5: { key: 'becameLovers',  exNarr: '함께한 시간 속에서 서로의 소중함을 느꼈고, 우리는 연인이 되었습니다.' },
    6: { key: 'decision',      exNarr: '2022년 12월, 우리는 부부가 되기로 했습니다.' },
    7: { key: 'thanks',        exNarr: '와주셔서 감사합니다.' },
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

  // Step 8 — review
  if (step === 8) {
    const sections = ['오프닝', '우리는', '만남', '연인', '결심', '감사']
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
