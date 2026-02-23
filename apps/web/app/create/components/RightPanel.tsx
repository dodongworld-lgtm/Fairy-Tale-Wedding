'use client'
import { CharacterAssignment, StoryTemplate, Background } from '../data/storyData'

type FormData = { person1?: string; person2?: string }
type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean; previewUrl?: string }
type Cut = { id: number; sceneTitle: string; background: Background; dialogue: string }

type Props = {
  step: number
  formData: FormData
  photos: UploadedPhoto[]
  selectedStyle: string
  characters?: CharacterAssignment[]
  selectedStory?: StoryTemplate | null
  activeCutIndex?: number
  cuts?: Cut[]
}

const BG_EMOJI: Record<Background, string> = {
  castle: '🏰', forest: '🌲', sea: '🌊', meadow: '🌷', city: '🌆', palace: '✨',
}

const BG_COLOR: Record<Background, string> = {
  castle:  'from-slate-400 to-gray-600',
  forest:  'from-emerald-500 to-green-700',
  sea:     'from-cyan-400 to-blue-600',
  meadow:  'from-green-400 to-emerald-600',
  city:    'from-violet-400 to-purple-600',
  palace:  'from-amber-400 to-orange-600',
}

/* ── Step 1: 청첩장/초대장 ── */
function Step1Preview({ data }: { data: FormData }) {
  const name1 = data.person1 || '___'
  const name2 = data.person2 || '___'
  const hasNames = data.person1 || data.person2
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Invitation card */}
      <div className="relative bg-[#fdfaf5] rounded-2xl shadow-2xl shadow-amber-200/40 overflow-hidden border border-amber-100">
        {/* Top floral border */}
        <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />
        <div className="px-8 py-8 text-center">
          {/* Decorative top */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-400" fill="currentColor">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.199 3.516 1 6.26 1c1.23 0 2.44.493 3.26 1.33C10.3 1.493 11.51 1 12.74 1 15.484 1 18 3.199 18 7.191c0 4.105-5.37 8.863-11 14.402z"/>
            </svg>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>

          {/* 청첩장 타이틀 */}
          <p className="text-[10px] tracking-[0.25em] text-rose-400 font-semibold uppercase mb-4">Wedding Invitation</p>

          {/* Names */}
          <div className={`transition-all duration-500 ${hasNames ? 'opacity-100' : 'opacity-40'}`}>
            <p className="text-3xl font-black text-gray-800 tracking-tight">{name1}</p>
            <p className="text-rose-400 text-lg font-light my-1">&</p>
            <p className="text-3xl font-black text-gray-800 tracking-tight">{name2}</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-amber-200" />
            <svg viewBox="0 0 20 20" className="w-3 h-3 text-amber-400" fill="currentColor">
              <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 14.27l-4.77 2.44.91-5.32L2.27 7.62l5.34-.78z"/>
            </svg>
            <div className="flex-1 h-px bg-amber-200" />
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            두 사람의 아름다운 이야기가<br/>동화로 완성됩니다
          </p>
        </div>
        {/* Bottom border */}
        <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">이름을 입력하면 미리보기가 바뀌어요</p>
    </div>
  )
}

/* ── Step 2: 폴라로이드 벽 ── */
function Step2Preview({ photos }: { photos: UploadedPhoto[] }) {
  const slots = Array.from({ length: 6 }, (_, i) => photos[i] || null)
  const rotations = [-3, 2, -1.5, 3, -2, 1]
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      <p className="text-center text-xs font-semibold text-gray-500 mb-4 tracking-widest uppercase">Photo Wall</p>
      <div className="grid grid-cols-3 gap-3">
        {slots.map((photo, i) => (
          <div
            key={i}
            className="transition-transform duration-300 hover:scale-105"
            style={{ transform: `rotate(${rotations[i]}deg)` }}
          >
            {/* Polaroid */}
            <div className={`bg-white shadow-lg shadow-gray-300/50 p-2 pb-6 ${photo ? 'border-2 border-rose-200' : ''}`}>
              <div className={`aspect-square flex items-center justify-center overflow-hidden ${
                photo ? 'bg-gradient-to-br from-rose-100 to-pink-200' : 'bg-gray-100'
              }`}>
                {photo?.previewUrl ? (
                  <img src={photo.previewUrl} alt={photo.fileName} className="w-full h-full object-cover" />
                ) : photo ? (
                  <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <p className="text-sm font-bold text-gray-700">
          {photos.length === 0 ? '사진을 올려주세요' : `${photos.length}장 업로드됨`}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">얼굴이 잘 보이는 사진이 좋아요</p>
      </div>
    </div>
  )
}

/* ── Step 3: 동화책 펼침 ── */
function Step3Preview({ characters }: { characters?: CharacterAssignment[] }) {
  const hasChars = characters && characters.length > 0
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Book */}
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-violet-200/40 overflow-hidden" style={{ minHeight: 220 }}>
        {/* Book spine */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-violet-300 to-indigo-400 z-10" />
        {/* Book texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 opacity-60" />

        <div className="relative grid grid-cols-2 min-h-[220px]">
          {/* Left page */}
          <div className="p-5 flex flex-col items-center justify-center border-r border-violet-100">
            {hasChars ? (
              <>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${characters![0].character.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <span className="text-2xl">{characters![0].character.emoji}</span>
                </div>
                <p className="text-xs font-bold text-gray-500 mb-0.5">{characters![0].person}</p>
                <p className="text-sm font-black text-gray-800">{characters![0].character.name}</p>
              </>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-100 animate-pulse mx-auto" />
            )}
          </div>
          {/* Right page */}
          <div className="p-5 flex flex-col items-center justify-center">
            {hasChars && characters!.length > 1 ? (
              <>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${characters![1].character.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <span className="text-2xl">{characters![1].character.emoji}</span>
                </div>
                <p className="text-xs font-bold text-gray-500 mb-0.5">{characters![1].person}</p>
                <p className="text-sm font-black text-gray-800">{characters![1].character.name}</p>
              </>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-100 animate-pulse mx-auto" />
            )}
          </div>
        </div>

        {/* Page number */}
        <div className="border-t border-violet-100 py-2 text-center">
          <p className="text-[10px] text-violet-400 tracking-widest">~ 동화 속 두 주인공 ~</p>
        </div>
      </div>
      {/* Stars decoration */}
      <div className="flex justify-center gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 text-amber-400" fill="currentColor">
            <path d="M6 1l1.2 2.4L10 3.8l-2 1.95.47 2.74L6 7.2 3.53 8.49 4 5.75 2 3.8l2.8-.4z"/>
          </svg>
        ))}
      </div>
    </div>
  )
}

/* ── Step 4: 두루마리 스크롤 ── */
function Step4Preview({ selectedStory }: { selectedStory?: StoryTemplate | null }) {
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Scroll top rod */}
      <div className="h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full shadow-md" />
      {/* Scroll body */}
      <div className="bg-[#fef9ec] border-x-4 border-amber-200 px-6 py-5 relative overflow-hidden" style={{ minHeight: 180 }}>
        {/* Paper texture lines */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute left-0 right-0 h-px bg-amber-100" style={{ top: `${i * 22 + 18}px` }} />
        ))}
        <div className="relative">
          {selectedStory ? (
            <>
              <p className="text-center font-black text-gray-800 text-base mb-1">{selectedStory.title}</p>
              <p className="text-center text-xs text-amber-600 mb-4">{selectedStory.subtitle}</p>
              <div className="space-y-2">
                {selectedStory.cuts.map((cut, i) => (
                  <div key={cut.id} className="flex items-start gap-2">
                    <span className="text-amber-500 font-black text-xs mt-0.5 w-4 shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{cut.sceneTitle}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{cut.dialogue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-amber-400 font-medium">스토리를 선택해주세요</p>
              <div className="mt-4 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 bg-amber-100 rounded animate-pulse" style={{ width: `${80 - i * 15}%`, margin: '0 auto' }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Scroll bottom rod */}
      <div className="h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full shadow-md" />
    </div>
  )
}

/* ── Step 5: 필름 스트립 ── */
function Step5Preview({ cuts, activeCutIndex = 0 }: { cuts?: Cut[]; activeCutIndex?: number }) {
  if (!cuts || cuts.length === 0) return null
  const active = cuts[activeCutIndex]
  return (
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Film strip */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/40 p-4">
        {/* Top perforations */}
        <div className="flex gap-2 mb-3 justify-between px-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 h-2 bg-gray-700 rounded-sm" />
          ))}
        </div>
        {/* Frames */}
        <div className="grid grid-cols-5 gap-1.5">
          {cuts.map((cut, i) => (
            <div
              key={cut.id}
              className={`aspect-square rounded-lg bg-gradient-to-br ${BG_COLOR[cut.background]} flex items-center justify-center transition-all duration-200 ${
                i === activeCutIndex
                  ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-900 scale-110'
                  : 'opacity-60'
              }`}
            >
              <span className="text-sm">{BG_EMOJI[cut.background]}</span>
            </div>
          ))}
        </div>
        {/* Bottom perforations */}
        <div className="flex gap-2 mt-3 justify-between px-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 h-2 bg-gray-700 rounded-sm" />
          ))}
        </div>
      </div>
      {/* Active cut detail */}
      {active && (
        <div className="mt-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-black text-gray-400">CUT {activeCutIndex + 1}</span>
            <span className="text-xs text-gray-400">{BG_EMOJI[active.background]} {active.sceneTitle}</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">"{active.dialogue}"</p>
        </div>
      )}
    </div>
  )
}

/* ── Step 6: 무드보드 ── */
const STYLE_CONFIG: Record<string, { gradient: string; label: string; sub: string; orb1: string; orb2: string }> = {
  fantasy:   { gradient: 'from-violet-900 to-indigo-900',  label: '동화 / 판타지', sub: '마법 같은 동화 세계', orb1: 'bg-violet-500', orb2: 'bg-indigo-400' },
  romantic:  { gradient: 'from-rose-800 to-pink-900',      label: '로맨틱',        sub: '따뜻하고 감성적인',    orb1: 'bg-rose-400',   orb2: 'bg-pink-300'   },
  adventure: { gradient: 'from-amber-800 to-orange-900',   label: '모험',          sub: '설레는 여행 같은',     orb1: 'bg-amber-400',  orb2: 'bg-orange-300' },
}

function Step6Preview({ selectedStyle }: { selectedStyle: string }) {
  const styles = ['fantasy', 'romantic', 'adventure']
  return (
    <div className="w-full max-w-xs mx-auto px-4 space-y-3">
      {styles.map(s => {
        const cfg = STYLE_CONFIG[s]
        const isActive = selectedStyle === s
        return (
          <div
            key={s}
            className={`relative bg-gradient-to-r ${cfg.gradient} rounded-2xl overflow-hidden transition-all duration-300 ${
              isActive ? 'shadow-xl scale-[1.03]' : 'opacity-50 scale-[0.97]'
            }`}
          >
            {/* Orbs */}
            <div className={`absolute -top-4 -right-4 w-20 h-20 ${cfg.orb1} rounded-full blur-2xl opacity-50`} />
            <div className={`absolute -bottom-4 -left-4 w-16 h-16 ${cfg.orb2} rounded-full blur-2xl opacity-40`} />
            <div className="relative px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-sm">{cfg.label}</p>
                <p className="text-white/60 text-xs">{cfg.sub}</p>
              </div>
              {isActive && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div className="bg-indigo-600 rounded-xl p-3 text-center mt-2">
        <p className="text-white font-bold text-xs">선택 완료 후 AI 영상 생성 시작</p>
        <p className="text-indigo-200 text-[10px] mt-0.5">평균 3분 소요됩니다</p>
      </div>
    </div>
  )
}

/* ── Main export ── */
export function RightPanel({ step, formData, photos, selectedStyle, characters, selectedStory, activeCutIndex, cuts }: Props) {
  const bgColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50',
    2: 'bg-gradient-to-br from-gray-50 via-stone-50 to-gray-100',
    3: 'bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50',
    4: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
    5: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
    6: 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800',
  }

  return (
    <div className={`w-full h-full relative flex items-center justify-center ${bgColors[step] || bgColors[1]}`}>
      <div className="relative z-10 w-full">
        {step === 1 && <Step1Preview data={formData} />}
        {step === 2 && <Step2Preview photos={photos} />}
        {step === 3 && <Step3Preview characters={characters} />}
        {step === 4 && <Step4Preview selectedStory={selectedStory} />}
        {step === 5 && <Step5Preview cuts={cuts} activeCutIndex={activeCutIndex} />}
        {step === 6 && <Step6Preview selectedStyle={selectedStyle} />}
      </div>
    </div>
  )
}
