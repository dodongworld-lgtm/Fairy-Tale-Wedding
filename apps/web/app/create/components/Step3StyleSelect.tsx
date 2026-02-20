'use client'
import { useState } from 'react'

type StyleOptions = { mood: string; background: string; narratorGender: string; language: string }

export function Step3StyleSelect({ onNext }: { onNext: (opts: StyleOptions) => void }) {
  const [opts, setOpts] = useState<StyleOptions>({ mood: 'fantasy', background: 'castle', narratorGender: 'female', language: 'ko' })

  const set = (key: keyof StyleOptions, value: string) => setOpts(prev => ({ ...prev, [key]: value }))

  const Radio = ({ label, field, value }: { label: string; field: keyof StyleOptions; value: string }) => (
    <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border transition-all ${opts[field] === value ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' : 'border-purple-600 text-purple-300 hover:border-purple-400'}`}>
      <input type="radio" className="hidden" checked={opts[field] === value} onChange={() => set(field, value)} />
      {label}
    </label>
  )

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">영상 스타일을 선택해주세요</h2>
      <div>
        <p className="text-purple-200 text-sm mb-2">분위기</p>
        <div className="flex gap-2 flex-wrap">
          <Radio label="✨ 동화/판타지" field="mood" value="fantasy" />
          <Radio label="🌹 로맨틱" field="mood" value="romantic" />
          <Radio label="🏔 모험" field="mood" value="adventure" />
        </div>
      </div>
      <div>
        <p className="text-purple-200 text-sm mb-2">배경 세계관</p>
        <div className="flex gap-2 flex-wrap">
          <Radio label="🏰 유럽 성" field="background" value="castle" />
          <Radio label="🌲 숲속" field="background" value="forest" />
          <Radio label="🌊 바닷가" field="background" value="sea" />
        </div>
      </div>
      <div>
        <p className="text-purple-200 text-sm mb-2">나레이션</p>
        <div className="flex gap-2">
          <Radio label="여성 목소리" field="narratorGender" value="female" />
          <Radio label="남성 목소리" field="narratorGender" value="male" />
        </div>
      </div>
      <div>
        <p className="text-purple-200 text-sm mb-2">언어</p>
        <div className="flex gap-2">
          <Radio label="🇰🇷 한국어" field="language" value="ko" />
          <Radio label="🇺🇸 English" field="language" value="en" />
        </div>
      </div>
      <button onClick={() => onNext(opts)} className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold rounded-xl text-lg transition-colors">
        ✨ AI 영상 생성 시작
      </button>
    </div>
  )
}
