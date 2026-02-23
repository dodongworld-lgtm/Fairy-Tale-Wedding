'use client'
import { CharacterAssignment, StoryTemplate, Background } from '../data/storyData'

type FormData = {
  person1?: string
  person2?: string
  firstMeetPlace?: string
  memories?: string
  proposeMessage?: string
}

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean }

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

const STYLE_CONFIG: Record<string, { bg: string; label: string; desc: string }> = {
  fantasy:   { bg: 'from-violet-500 to-indigo-700',  label: '동화 / 판타지', desc: '마법 같은 동화 세계' },
  romantic:  { bg: 'from-rose-500 to-pink-700',      label: '로맨틱',        desc: '따뜻하고 감성적인 분위기' },
  adventure: { bg: 'from-amber-500 to-orange-700',   label: '모험',          desc: '설레는 여행 같은 이야기' },
}

const BG_COLOR: Record<Background, string> = {
  castle:  'from-slate-400 to-gray-600',
  forest:  'from-emerald-500 to-green-700',
  sea:     'from-cyan-400 to-blue-600',
  meadow:  'from-green-400 to-emerald-600',
  city:    'from-violet-400 to-purple-600',
  palace:  'from-amber-400 to-orange-600',
}

const BG_EMOJI: Record<Background, string> = {
  castle: '🏰', forest: '🌲', sea: '🌊', meadow: '🌷', city: '🌆', palace: '✨',
}

/* ── Step 1 Preview ── */
function Step1Preview({ data }: { data: FormData }) {
  const name1 = data.person1 || '나'
  const name2 = data.person2 || '상대방'
  return (
    <div className="w-full max-w-sm mx-auto space-y-4 px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-8 text-center">
          <svg viewBox="0 0 80 70" className="w-20 h-16 mx-auto mb-3" fill="none">
            <path d="M40 60 C28 50 10 40 10 25 C10 15 20 8 30 12 C35 14 38 18 40 22 C42 18 45 14 50 12 C60 8 70 15 70 25 C70 40 52 50 40 60Z"
              fill="white" fillOpacity=".9"/>
            <circle cx="24" cy="22" r="3" fill="white" fillOpacity=".5"/>
          </svg>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {(data.person1 || data.person2) ? `${name1} & ${name2}` : '_ & _'}
          </h3>
          <p className="text-indigo-200 text-xs mt-1">우리의 프로포즈 이야기</p>
        </div>
        <div className="px-6 py-5 space-y-3">
          <StoryLine icon="📍" label="첫 만남" value={data.firstMeetPlace} placeholder="어디서 처음 만났나요?" />
          <StoryLine icon="💭" label="소중한 기억" value={data.memories} placeholder="함께한 특별한 추억" />
          <StoryLine icon="💌" label="프로포즈 메시지" value={data.proposeMessage} placeholder="전하고 싶은 말" multiline />
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">입력하는 내용이 실시간으로 반영됩니다</p>
    </div>
  )
}

function StoryLine({ icon, label, value, placeholder, multiline }: {
  icon: string; label: string; value?: string; placeholder: string; multiline?: boolean
}) {
  return (
    <div className={`rounded-xl p-3 border transition-all ${value ? 'border-indigo-100 bg-indigo-50' : 'border-gray-100 bg-gray-50'}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs">{icon}</span>
        <span className="text-xs font-semibold text-gray-500">{label}</span>
      </div>
      {value ? (
        <p className={`text-sm font-medium text-gray-900 ${multiline ? 'line-clamp-2' : 'truncate'}`}>{value}</p>
      ) : (
        <p className="text-sm text-gray-300">{placeholder}</p>
      )}
    </div>
  )
}

/* ── Step 2 Preview ── */
function Step2Preview({ photos }: { photos: UploadedPhoto[] }) {
  const slots = Array.from({ length: 6 }, (_, i) => photos[i] || null)
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-6">
        <h3 className="font-black text-gray-900 text-lg mb-1 text-center">함께한 순간들</h3>
        <p className="text-xs text-gray-400 text-center mb-5">AI가 사진을 분석해서 캐릭터를 만들어요</p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {slots.map((photo, i) => (
            <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xs overflow-hidden ${
              photo ? 'bg-gradient-to-br from-indigo-100 to-violet-200 border-2 border-indigo-300' : 'bg-gray-100 border-2 border-dashed border-gray-200'
            }`}>
              {photo ? (
                <div className="text-center p-1">
                  {photo.isFacePrimary && (
                    <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-1">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  )}
                  <span className="text-indigo-600 font-bold text-xs">✓</span>
                </div>
              ) : (
                <span className="text-gray-300 text-lg">+</span>
              )}
            </div>
          ))}
        </div>
        <div className="bg-indigo-50 rounded-xl p-3 text-center">
          <p className="text-indigo-600 font-bold text-sm">
            {photos.length === 0 ? '사진을 올려주세요' : `${photos.length}장 업로드됨`}
          </p>
          <p className="text-indigo-400 text-xs mt-0.5">
            {photos.length === 0 ? '얼굴이 잘 보이는 사진이 필요해요' : '별 표시된 사진이 기준 사진이에요'}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Step 3 Preview: Character reveal ── */
function Step3Preview({ characters }: { characters?: CharacterAssignment[] }) {
  if (!characters || characters.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-6 text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-400">캐릭터 분석 중...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-6">
        <h3 className="font-black text-gray-900 text-lg mb-1 text-center">당신의 동화 캐릭터</h3>
        <p className="text-xs text-gray-400 text-center mb-5">AI가 추천하는 캐릭터예요</p>
        <div className="grid grid-cols-2 gap-3">
          {characters.map((a) => (
            <div key={a.person} className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 truncate w-full text-center">{a.person}</p>
              <div className={`w-full rounded-xl bg-gradient-to-br ${a.character.color} p-3 flex flex-col items-center gap-1`}>
                <span className="text-2xl">{a.character.emoji}</span>
                <p className="text-white font-bold text-xs text-center">{a.character.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Step 4 Preview: Story selection ── */
function Step4Preview({ selectedStory }: { selectedStory?: StoryTemplate | null }) {
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-6">
        <h3 className="font-black text-gray-900 text-lg mb-1 text-center">어떤 이야기로?</h3>
        <p className="text-xs text-gray-400 text-center mb-5">스토리를 선택해주세요</p>
        {selectedStory ? (
          <div className="rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-4">
            <p className="font-bold text-indigo-700 text-sm mb-1">{selectedStory.title}</p>
            <p className="text-xs text-indigo-400 mb-3">{selectedStory.subtitle}</p>
            <div className="space-y-1.5">
              {selectedStory.cuts.map((cut) => (
                <div key={cut.id} className="flex items-center gap-2 text-xs text-indigo-600">
                  <span>{BG_EMOJI[cut.background]}</span>
                  <span className="truncate">{cut.sceneTitle}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Step 5 Preview: Cut editor filmstrip ── */
function Step5Preview({ cuts, activeCutIndex = 0 }: { cuts?: Cut[]; activeCutIndex?: number }) {
  if (!cuts || cuts.length === 0) return null
  const active = cuts[activeCutIndex]
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-6">
        <h3 className="font-black text-gray-900 text-lg mb-1 text-center">장면 편집</h3>
        <p className="text-xs text-gray-400 text-center mb-4">각 장면의 배경과 대사를 편집하세요</p>
        {/* Filmstrip */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {cuts.map((cut, i) => (
            <div
              key={cut.id}
              className={`aspect-square rounded-xl bg-gradient-to-br ${BG_COLOR[cut.background]} flex items-center justify-center ${
                i === activeCutIndex ? 'ring-2 ring-indigo-500 ring-offset-1' : ''
              }`}
            >
              <span className="text-sm">{BG_EMOJI[cut.background]}</span>
            </div>
          ))}
        </div>
        {/* Active cut detail */}
        {active && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">{active.sceneTitle}</p>
            <p className="text-xs text-gray-400 line-clamp-2">{active.dialogue}</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Step 6 Preview: Style mood boards ── */
function Step6Preview({ selectedStyle }: { selectedStyle: string }) {
  const styles = ['fantasy', 'romantic', 'adventure']
  return (
    <div className="w-full max-w-sm mx-auto px-4 space-y-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">분위기 미리보기</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {styles.map(s => {
            const cfg = STYLE_CONFIG[s]
            return (
              <div key={s} className={`aspect-square rounded-xl bg-gradient-to-br ${cfg.bg} flex flex-col items-end justify-end p-2 relative overflow-hidden ${selectedStyle === s ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}>
                <span className="text-white text-xs font-bold leading-tight">{cfg.label}</span>
                {selectedStyle === s && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-indigo-600 rounded-2xl p-4 text-center">
        <p className="text-white font-bold text-sm">선택 완료 후 AI 영상 생성 시작</p>
        <p className="text-indigo-200 text-xs mt-0.5">평균 3분 소요됩니다</p>
      </div>
    </div>
  )
}

/* ── Background decoration ── */
function BgDecor({ step }: { step: number }) {
  const colors: Record<number, string> = {
    1: 'text-indigo-100', 2: 'text-rose-100', 3: 'text-violet-100',
    4: 'text-emerald-100', 5: 'text-amber-100', 6: 'text-amber-100',
  }
  const c = colors[step] || 'text-indigo-100'
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${c}`}>
      <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-40" viewBox="0 0 400 400" fill="currentColor">
        <circle cx="200" cy="200" r="180" fillOpacity=".5"/>
        <circle cx="200" cy="200" r="120" fillOpacity=".3"/>
      </svg>
      <svg className="absolute -bottom-16 -left-16 w-64 h-64 opacity-30" viewBox="0 0 300 300" fill="currentColor">
        <polygon points="150,20 280,260 20,260" fillOpacity=".6"/>
      </svg>
    </div>
  )
}

/* ── Main export ── */
export function RightPanel({ step, formData, photos, selectedStyle, characters, selectedStory, activeCutIndex, cuts }: Props) {
  const bgColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-indigo-50 via-white to-violet-50',
    2: 'bg-gradient-to-br from-rose-50 via-white to-pink-50',
    3: 'bg-gradient-to-br from-violet-50 via-white to-indigo-50',
    4: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50',
    5: 'bg-gradient-to-br from-amber-50 via-white to-orange-50',
    6: 'bg-gradient-to-br from-amber-50 via-white to-orange-50',
  }

  return (
    <div className={`w-full h-full relative flex items-center justify-center ${bgColors[step] || bgColors[1]}`}>
      <BgDecor step={step} />
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
