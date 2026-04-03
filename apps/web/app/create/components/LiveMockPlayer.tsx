'use client'
import { useState } from 'react'
import type { ProjectData } from '../data/projectData'
import { buildStepMeta } from '../data/projectData'
import { BLOCK_MAP } from '../data/blockDefs'

type Props = {
  step: number
  project: ProjectData
}

// Color gradients by step key
function getSceneBg(key: string): string {
  switch (key) {
    case 'checklist': return 'from-slate-800 via-slate-900 to-slate-900'
    case 'photos':    return 'from-violet-800 via-purple-900 to-violet-900'
    case 'template':  return 'from-indigo-700 via-indigo-800 to-indigo-900'
    case 'opening':   return 'from-blue-700 via-blue-800 to-blue-900'
    case 'outro':     return 'from-slate-700 via-slate-800 to-slate-900'
    case 'review':    return 'from-violet-600 via-violet-700 to-purple-800'
    default:          return 'from-rose-700 via-amber-800 to-orange-900'  // warm gradient for dynamic blocks
  }
}

function getSceneLabel(key: string, stepMeta: ReturnType<typeof buildStepMeta>, stepIndex: number): string {
  const meta = stepMeta[stepIndex]
  if (meta) return meta.label
  // fallback
  const block = BLOCK_MAP[key]
  if (block) return block.name
  return key
}

function SceneContent({
  stepKey,
  project,
  exMode,
}: {
  stepKey: string
  project: ProjectData
  exMode: boolean
}) {
  const groomName = project.groomName || '신랑'
  const brideName = project.brideName || '신부'

  // ── checklist ──
  if (stepKey === 'checklist') {
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
                <div className="w-2 h-2 rounded-full bg-primary-light" />
              </div>
              <span className="text-white/70 text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── photos ──
  if (stepKey === 'photos') {
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

  // ── template selection ──
  if (stepKey === 'template') {
    return (
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <span className="text-2xl">📖</span>
        </div>
        <p className="text-white/90 text-sm font-semibold">스토리 선택</p>
        <div className="space-y-2 w-full max-w-[200px]">
          {['클래식 러브스토리', '우리만의 일상', '드라마틱 스토리'].map((t, i) => (
            <div key={i} className="bg-white/10 rounded-lg px-3 py-2">
              <span className="text-white/70 text-xs">{t}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── opening ──
  if (stepKey === 'opening') {
    const line = exMode
      ? '안녕하세요, 저희 결혼식에 와주셔서 감사합니다!'
      : (project.sections.opening?.narration || `안녕하세요, ${groomName}과 ${brideName}입니다.`)
    return (
      <div className="absolute inset-0">
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-3 px-5">
          <p className="text-white text-[11px] sm:text-xs text-center leading-relaxed font-medium">
            &ldquo;{line}&rdquo;
          </p>
        </div>
      </div>
    )
  }

  // ── outro (thanks) ──
  if (stepKey === 'outro') {
    const section = project.sections.outro
    const narr = exMode
      ? '와주셔서 감사합니다.'
      : (section?.narration || '와주셔서 감사합니다.')
    const hasPhoto = !exMode && section?.photos && section.photos.length > 0
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

  // ── review ──
  if (stepKey === 'review') {
    const selectedBlocks = project.selectedBlocks || []
    const sectionNames = [
      '오프닝',
      ...selectedBlocks.map(id => BLOCK_MAP[id]?.name || id),
      '감사',
    ]
    return (
      <div className="flex flex-col items-center gap-3 px-4 w-full">
        <p className="text-white/70 text-xs font-semibold mb-1">섹션 체크리스트</p>
        <div className="space-y-1.5 w-full max-w-[200px]">
          {sectionNames.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
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

  // ── Dynamic block (from BLOCK_MAP) ──
  const blockDef = BLOCK_MAP[stepKey]
  if (blockDef) {
    const section = project.sections[stepKey]
    const narr = exMode
      ? blockDef.buildNarration(
          { photos: [], narration: '', customText: '', customText2: '', date: '', place: '' },
          groomName,
          brideName,
        )
      : (section?.narration || blockDef.subtitle)
    const hasPhoto = !exMode && section?.photos && section.photos.length > 0
    return (
      <div className="flex flex-col items-center gap-3 px-4 w-full">
        {/* Icon + name */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{blockDef.icon}</span>
          <p className="text-white/90 text-sm font-semibold">{blockDef.name}</p>
        </div>
        {/* Photo area */}
        <div className="w-full max-w-[220px] aspect-video rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
          {hasPhoto ? (
            <img src={section.photos[0]} className="w-full h-full object-cover" alt="" />
          ) : (
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25z" />
            </svg>
          )}
        </div>
        {/* Narration */}
        <div className="bg-white/10 rounded-xl px-4 py-2 w-full max-w-[220px]">
          <p className="text-white/80 text-[10px] leading-relaxed text-center">&ldquo;{narr}&rdquo;</p>
        </div>
      </div>
    )
  }

  return null
}

export function LiveMockPlayer({ step, project }: Props) {
  const [exMode, setExMode] = useState(true)

  const stepMeta = buildStepMeta(project.selectedBlocks || [])
  const currentStep = stepMeta[step]
  const currentStepKey = currentStep?.key || 'checklist'
  const sceneBg = getSceneBg(currentStepKey)
  const sceneLabel = getSceneLabel(currentStepKey, stepMeta, step)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4">
      {/* 16:9 preview container */}
      <div className="w-full max-w-[480px] aspect-video rounded-3xl overflow-hidden relative shadow-2xl shadow-black/20 border border-border">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${sceneBg}`} />

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '100px' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SceneContent stepKey={currentStepKey} project={project} exMode={exMode} />
        </div>

        {/* Step label badge */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{sceneLabel}</p>
        </div>

        {/* Aspect ratio label */}
        <div className="absolute bottom-3 right-3 bg-black/30 rounded-md px-1.5 py-0.5">
          <p className="text-white/40 text-[9px] font-mono">16:9 · 1080p</p>
        </div>
      </div>

      {/* Example/My input toggle */}
      <div className="flex items-center gap-1 bg-bg-card rounded-full p-1 shadow-md border border-border">
        <button
          onClick={() => setExMode(true)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            exMode ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text'
          }`}
        >
          예시 보기
        </button>
        <button
          onClick={() => setExMode(false)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            !exMode ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text'
          }`}
        >
          내 입력 보기
        </button>
      </div>

    </div>
  )
}
