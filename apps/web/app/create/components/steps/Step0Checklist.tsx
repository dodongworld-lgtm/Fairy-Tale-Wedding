'use client'
import { useLang } from '../../../contexts/LangContext'

type Props = { onNext: () => void }

const ITEMS = [
  { icon: '👤', text: '신랑 얼굴 사진 1장 (정면, 밝은 조명 권장)' },
  { icon: '👤', text: '신부 얼굴 사진 1장 (정면, 밝은 조명 권장)' },
  { icon: '📷', text: '섹션별 커플 사진 (각 최소 1장씩)' },
]

export function Step0Checklist({ onNext }: Props) {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시작 전 준비물을 확인해요</h2>
        <p className="text-sm text-gray-400">미리 준비해두면 훨씬 빠르게 만들 수 있어요</p>
      </div>

      <div className="space-y-3">
        {ITEMS.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-semibold">사진이 없어도 괜찮아요.</span> 나중에 추가하거나 URL로 가져올 수 있어요.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        준비됐어요, 시작하기
      </button>
    </div>
  )
}
