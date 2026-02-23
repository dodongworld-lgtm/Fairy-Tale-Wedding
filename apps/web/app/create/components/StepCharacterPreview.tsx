'use client'
import { useState, useEffect } from 'react'

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean }

const CONVERSION_STEPS = [
  { label: '사진 분석 중...', duration: 1200 },
  { label: '얼굴 특징 추출 중...', duration: 1500 },
  { label: '디즈니 스타일 변환 중...', duration: 2000 },
  { label: '세부 디테일 추가 중...', duration: 1200 },
]

const STYLE_CARDS = [
  { bg: 'from-violet-400 to-indigo-600', label: '동화 / 판타지' },
  { bg: 'from-rose-400 to-pink-600', label: '로맨틱' },
  { bg: 'from-amber-400 to-orange-600', label: '모험' },
]

export function StepCharacterPreview({ photos, onNext }: { photos: UploadedPhoto[]; onNext: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let elapsed = 0
    const total = CONVERSION_STEPS.reduce((sum, s) => sum + s.duration, 0)

    CONVERSION_STEPS.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStepIdx(idx)
      }, elapsed)
      elapsed += step.duration
    })

    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('done'), 300)
          return 100
        }
        return next
      })
    }, total / 50)

    return () => clearInterval(interval)
  }, [])

  const primaryPhoto = photos.find(p => p.isFacePrimary) || photos[0]

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">사진을 디즈니 스타일로 변환하고 있어요</h2>
        <p className="text-sm text-gray-400">AI가 두 분의 얼굴을 분석해서 특별한 캐릭터로 만들고 있습니다</p>
      </div>

      {phase === 'loading' ? (
        <div className="space-y-6">
          {/* Conversion visual */}
          <div className="flex items-center justify-center gap-6">
            {/* Original photo placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-28 h-28 rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                {primaryPhoto ? (
                  <span className="text-gray-400 text-xs text-center px-2 leading-tight">{primaryPhoto.fileName}</span>
                ) : (
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-400">원본 사진</span>
            </div>

            {/* Arrow animation */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className="text-xs text-indigo-500 font-medium">AI 변환</span>
            </div>

            {/* Result placeholder */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-200 border-2 border-indigo-200 flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-violet-400 to-indigo-600 transition-all duration-500"
                  style={{ opacity: progress / 200 }}
                />
                <div className="relative z-10">
                  {progress < 100 ? (
                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400">디즈니 캐릭터</span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{CONVERSION_STEPS[currentStepIdx]?.label}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {CONVERSION_STEPS.map((step, idx) => {
              const done = idx < currentStepIdx
              const active = idx === currentStepIdx
              return (
                <div key={step.label} className={`flex items-center gap-2 text-sm transition-colors ${done ? 'text-gray-400' : active ? 'text-gray-900' : 'text-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-indigo-600' : active ? 'border-2 border-indigo-600' : 'border-2 border-gray-200'}`}>
                    {done && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {active && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
                  </div>
                  {step.label}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Done state */
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">캐릭터 변환 완료!</h3>
            <p className="text-sm text-gray-500">실제 캐릭터 이미지는 영상 생성 후 확인할 수 있어요</p>
          </div>

          {/* Style preview */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">다음 단계에서 선택할 수 있는 스타일 미리보기</p>
            <div className="grid grid-cols-3 gap-3">
              {STYLE_CARDS.map(card => (
                <div key={card.label} className={`aspect-video rounded-xl bg-gradient-to-br ${card.bg} flex items-end p-2`}>
                  <span className="text-white text-xs font-semibold">{card.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
          >
            스타일 선택하기
          </button>
        </div>
      )}
    </div>
  )
}
