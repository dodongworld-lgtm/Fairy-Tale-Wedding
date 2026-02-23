'use client'
import { useState } from 'react'
import { useLang } from '../../contexts/LangContext'
import { CutTemplate, Background } from '../data/storyData'

export interface Cut extends CutTemplate {}

/* ── 2D Scene Illustrations ── */
function SceneIllustration({ bg, size = 'sm' }: { bg: Background; size?: 'sm' | 'lg' }) {
  const h = size === 'lg' ? 'h-28' : 'h-16'
  const scenes: Record<Background, { gradient: string; svg: React.ReactNode }> = {
    castle: {
      gradient: 'from-slate-700 via-gray-800 to-slate-900',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Stars */}
          {[[15,8],[45,5],[75,10],[100,6],[105,18]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1" fill="white" fillOpacity=".7"/>
          ))}
          {/* Moon */}
          <circle cx="95" cy="14" r="7" fill="white" fillOpacity=".9"/>
          <circle cx="99" cy="11" r="6" fill="#4B5563"/>
          {/* Castle */}
          <rect x="30" y="22" width="60" height="35" fill="white" fillOpacity=".15"/>
          {/* Tower left */}
          <rect x="28" y="14" width="16" height="44" fill="white" fillOpacity=".25"/>
          <rect x="28" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          <rect x="34" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          <rect x="40" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          {/* Tower right */}
          <rect x="76" y="14" width="16" height="44" fill="white" fillOpacity=".25"/>
          <rect x="76" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          <rect x="82" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          <rect x="88" y="10" width="4" height="6" fill="white" fillOpacity=".3"/>
          {/* Gate */}
          <path d="M52 58 L52 40 Q60 32 68 40 L68 58Z" fill="white" fillOpacity=".15"/>
          {/* Window */}
          <rect x="57" y="24" width="6" height="8" rx="3" fill="white" fillOpacity=".4"/>
          {/* Ground */}
          <rect x="0" y="56" width="120" height="4" fill="white" fillOpacity=".08"/>
        </svg>
      ),
    },
    forest: {
      gradient: 'from-emerald-800 via-green-900 to-emerald-950',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Sky glow */}
          <ellipse cx="60" cy="5" rx="30" ry="10" fill="white" fillOpacity=".05"/>
          {/* Back trees */}
          {[10,25,40,55,70,85,100,110].map((x,i) => (
            <polygon key={i} points={`${x},50 ${x+10},28 ${x+20},50`} fill="white" fillOpacity=".1"/>
          ))}
          {/* Mid trees */}
          <polygon points="0,58 18,22 36,58" fill="white" fillOpacity=".2"/>
          <polygon points="25,58 45,18 65,58" fill="white" fillOpacity=".25"/>
          <polygon points="55,58 78,14 100,58" fill="white" fillOpacity=".2"/>
          <polygon points="85,58 100,25 115,58" fill="white" fillOpacity=".15"/>
          {/* Trunks */}
          <rect x="16" y="50" width="4" height="10" fill="white" fillOpacity=".15"/>
          <rect x="43" y="52" width="4" height="8" fill="white" fillOpacity=".15"/>
          <rect x="76" y="50" width="4" height="10" fill="white" fillOpacity=".15"/>
          {/* Path */}
          <path d="M50 60 Q60 48 70 60" fill="white" fillOpacity=".08"/>
          {/* Fireflies */}
          <circle cx="30" cy="35" r="1.5" fill="#FCD34D" fillOpacity=".8"/>
          <circle cx="85" cy="30" r="1" fill="#FCD34D" fillOpacity=".6"/>
          <circle cx="60" cy="42" r="1.5" fill="#FCD34D" fillOpacity=".7"/>
        </svg>
      ),
    },
    sea: {
      gradient: 'from-cyan-700 via-blue-800 to-indigo-900',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Stars */}
          {[[10,5],[30,8],[60,4],[90,7],[110,5]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1" fill="white" fillOpacity=".6"/>
          ))}
          {/* Moon reflection */}
          <circle cx="60" cy="12" r="9" fill="white" fillOpacity=".85"/>
          {/* Horizon */}
          <rect x="0" y="32" width="120" height="1" fill="white" fillOpacity=".2"/>
          {/* Waves */}
          <path d="M0 36 Q15 32 30 36 Q45 40 60 36 Q75 32 90 36 Q105 40 120 36 L120 60 L0 60Z" fill="white" fillOpacity=".12"/>
          <path d="M0 42 Q20 38 40 42 Q60 46 80 42 Q100 38 120 42 L120 60 L0 60Z" fill="white" fillOpacity=".1"/>
          <path d="M0 50 Q30 46 60 50 Q90 54 120 50 L120 60 L0 60Z" fill="white" fillOpacity=".12"/>
          {/* Moon reflection on water */}
          <ellipse cx="60" cy="38" rx="8" ry="3" fill="white" fillOpacity=".15"/>
          {/* Boat silhouette */}
          <path d="M48 34 L72 34 L68 38 L52 38Z" fill="white" fillOpacity=".3"/>
          <line x1="60" y1="28" x2="60" y2="34" stroke="white" strokeOpacity=".4" strokeWidth="1"/>
          <path d="M60 28 L68 33 L60 33Z" fill="white" fillOpacity=".4"/>
        </svg>
      ),
    },
    meadow: {
      gradient: 'from-green-600 via-emerald-700 to-teal-800',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Sky */}
          <circle cx="25" cy="14" r="10" fill="white" fillOpacity=".8"/>
          {/* Clouds */}
          <ellipse cx="75" cy="12" rx="14" ry="6" fill="white" fillOpacity=".5"/>
          <ellipse cx="88" cy="10" rx="10" ry="5" fill="white" fillOpacity=".4"/>
          {/* Rolling hills */}
          <path d="M0 45 Q30 28 60 38 Q90 48 120 35 L120 60 L0 60Z" fill="white" fillOpacity=".12"/>
          <path d="M0 52 Q30 40 60 48 Q90 55 120 44 L120 60 L0 60Z" fill="white" fillOpacity=".15"/>
          {/* Flowers */}
          {[[20,50],[35,46],[50,52],[65,48],[80,50],[95,46],[108,50]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.5" fill="white" fillOpacity=".5"/>
              <line x1={x} y1={y+2} x2={x} y2={y+7} stroke="white" strokeOpacity=".3" strokeWidth="1"/>
            </g>
          ))}
          {/* Butterfly */}
          <path d="M58 30 Q54 26 50 30 Q54 34 58 30Z" fill="white" fillOpacity=".6"/>
          <path d="M62 30 Q66 26 70 30 Q66 34 62 30Z" fill="white" fillOpacity=".5"/>
        </svg>
      ),
    },
    city: {
      gradient: 'from-violet-800 via-purple-900 to-indigo-950',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Stars */}
          {[[8,5],[20,8],[40,4],[60,7],[80,5],[100,8],[112,4]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1" fill="white" fillOpacity=".5"/>
          ))}
          {/* Buildings back */}
          <rect x="0"  y="25" width="18" height="35" fill="white" fillOpacity=".1"/>
          <rect x="20" y="18" width="14" height="42" fill="white" fillOpacity=".12"/>
          <rect x="36" y="30" width="12" height="30" fill="white" fillOpacity=".1"/>
          <rect x="50" y="10" width="20" height="50" fill="white" fillOpacity=".15"/>
          <rect x="72" y="22" width="16" height="38" fill="white" fillOpacity=".12"/>
          <rect x="90" y="30" width="12" height="30" fill="white" fillOpacity=".1"/>
          <rect x="104" y="20" width="16" height="40" fill="white" fillOpacity=".12"/>
          {/* Windows */}
          {[[52,14],[56,14],[60,14],[52,20],[56,20],[60,20],[52,26],[56,26],[60,26]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="3" height="3" fill="#FCD34D" fillOpacity=".6"/>
          ))}
          {/* Road */}
          <rect x="0" y="55" width="120" height="5" fill="white" fillOpacity=".05"/>
          <line x1="0" y1="57" x2="120" y2="57" stroke="white" strokeOpacity=".1" strokeDasharray="8 4" strokeWidth="1"/>
        </svg>
      ),
    },
    palace: {
      gradient: 'from-amber-700 via-orange-800 to-amber-900',
      svg: (
        <svg viewBox="0 0 120 60" className="w-full h-full" fill="none">
          {/* Stars/sparkles */}
          {[[10,6],[30,4],[50,8],[70,5],[90,7],[110,4]].map(([x,y],i) => (
            <path key={i} d={`M${x} ${y-3} L${x+1} ${y} L${x+3} ${y} L${x+1.5} ${y+1.5} L${x+2} ${y+4} L${x} ${y+2.5} L${x-2} ${y+4} L${x-1.5} ${y+1.5} L${x-3} ${y} L${x-1} ${y}Z`} fill="white" fillOpacity=".5"/>
          ))}
          {/* Dome */}
          <path d="M40 30 Q60 8 80 30Z" fill="white" fillOpacity=".2"/>
          <ellipse cx="60" cy="30" rx="20" ry="4" fill="white" fillOpacity=".1"/>
          {/* Pillars */}
          {[30,42,54,66,78,90].map((x,i) => (
            <rect key={i} x={x} y="30" width="5" height="30" fill="white" fillOpacity=".2"/>
          ))}
          {/* Pillar tops */}
          {[30,42,54,66,78,90].map((x,i) => (
            <ellipse key={i} cx={x+2.5} cy="30" rx="5" ry="2" fill="white" fillOpacity=".3"/>
          ))}
          {/* Base */}
          <rect x="20" y="55" width="80" height="5" fill="white" fillOpacity=".15"/>
          {/* Lanterns */}
          <ellipse cx="45" cy="24" rx="3" ry="4" fill="#FCD34D" fillOpacity=".5"/>
          <ellipse cx="75" cy="24" rx="3" ry="4" fill="#FCD34D" fillOpacity=".5"/>
        </svg>
      ),
    },
  }
  const scene = scenes[bg]
  return (
    <div className={`w-full ${h} rounded-xl overflow-hidden bg-gradient-to-b ${scene.gradient} relative`}>
      {scene.svg}
    </div>
  )
}

const BACKGROUNDS: { id: Background; label: string }[] = [
  { id: 'castle',  label: '성' },
  { id: 'forest',  label: '숲' },
  { id: 'sea',     label: '바다' },
  { id: 'meadow',  label: '들판' },
  { id: 'city',    label: '도시' },
  { id: 'palace',  label: '궁전' },
]

type Props = {
  initialCuts: CutTemplate[]
  onNext: (cuts: Cut[]) => void
}

export function StepCutEditor({ initialCuts, onNext }: Props) {
  const { t } = useLang()
  const [cuts, setCuts] = useState<Cut[]>(() => initialCuts.map(c => ({ ...c })))
  const [activeCut, setActiveCut] = useState(0)

  const current = cuts[activeCut]

  const updateBackground = (bg: Background) => {
    setCuts(prev => prev.map((c, i) => i === activeCut ? { ...c, background: bg } : c))
  }

  const updateDialogue = (text: string) => {
    if (text.length > 100) return
    setCuts(prev => prev.map((c, i) => i === activeCut ? { ...c, dialogue: text } : c))
  }

  return (
    <div className="w-full space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.cutEditor.title}</h2>
        <p className="text-sm text-gray-400">{t.cutEditor.subtitle}</p>
      </div>

      {/* Cut tabs */}
      <div className="flex gap-2">
        {cuts.map((cut, i) => (
          <button
            key={cut.id}
            onClick={() => setActiveCut(i)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCut === i
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {current && (
        <div className="space-y-4">
          {/* Scene title */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              장면 {activeCut + 1}
            </span>
            <span className="text-sm text-gray-600 font-medium">{current.sceneTitle}</span>
          </div>

          {/* Current scene preview */}
          <SceneIllustration bg={current.background} size="lg" />

          {/* Background selection - 2D card grid */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2.5">{t.cutEditor.background}</p>
            <div className="grid grid-cols-3 gap-2">
              {BACKGROUNDS.map((bg) => {
                const isActive = current.background === bg.id
                return (
                  <button
                    key={bg.id}
                    onClick={() => updateBackground(bg.id)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                      isActive ? 'ring-2 ring-indigo-500 ring-offset-1 scale-[1.02]' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SceneIllustration bg={bg.id} size="sm" />
                    <div className="absolute inset-x-0 bottom-0 py-1 text-center">
                      <span className="text-white text-[10px] font-bold drop-shadow">{bg.label}</span>
                    </div>
                    {isActive && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow">
                        <svg className="w-2.5 h-2.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dialogue */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500">{t.cutEditor.dialogue}</p>
              <span className="text-xs text-gray-400">{current.dialogue.length}/100</span>
            </div>
            <textarea
              value={current.dialogue}
              onChange={(e) => updateDialogue(e.target.value)}
              placeholder={t.cutEditor.dialoguePlaceholder}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 resize-none transition-colors"
            />
          </div>

          {/* Prev / Next cuts */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCut(i => Math.max(0, i - 1))}
              disabled={activeCut === 0}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 disabled:opacity-30 hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              ← 이전 장면
            </button>
            <button
              onClick={() => setActiveCut(i => Math.min(cuts.length - 1, i + 1))}
              disabled={activeCut === cuts.length - 1}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 disabled:opacity-30 hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              다음 장면 →
            </button>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex gap-1.5">
        {cuts.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= activeCut ? 'bg-indigo-500' : 'bg-gray-100'}`} />
        ))}
      </div>

      <button
        onClick={() => onNext(cuts)}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        {t.cutEditor.complete}
      </button>
    </div>
  )
}
