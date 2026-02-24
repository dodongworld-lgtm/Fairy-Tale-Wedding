'use client'

type Props = { onNext: () => void }

function PhotoExample({ label, tip, good }: { label: string; tip: string; good: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 ${good ? 'border-indigo-200 bg-indigo-50/50' : 'border-red-100 bg-red-50/30'}`}>
      {/* Face silhouette illustration */}
      <div className={`w-full aspect-[3/4] rounded-xl overflow-hidden relative ${good ? 'bg-gradient-to-b from-amber-100 to-amber-200' : 'bg-gradient-to-b from-gray-200 to-gray-300'}`}>
        {/* Background detail */}
        <div className={`absolute inset-0 ${good ? 'opacity-100' : 'opacity-30'}`}>
          {good ? (
            <>
              {/* Bright well-lit room */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sky-200/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-1/4 bg-amber-300/40" />
            </>
          ) : (
            <>
              {/* Dark or cluttered bg */}
              <div className="absolute inset-0 bg-gray-400/40" />
            </>
          )}
        </div>
        {/* Face */}
        <svg viewBox="0 0 80 110" className={`absolute inset-0 w-full h-full ${good ? 'text-amber-700' : 'text-gray-500'}`} fill="currentColor">
          <ellipse cx="40" cy="38" rx={good ? 20 : 16} ry={good ? 24 : 19} />
          {good && <ellipse cx="33" cy="36" rx="3" ry="3.5" fill="rgba(0,0,0,0.25)" />}
          {good && <ellipse cx="47" cy="36" rx="3" ry="3.5" fill="rgba(0,0,0,0.25)" />}
          {good && <path d="M34 46 Q40 51 46 46" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
          <path d="M12 110 Q12 75 40 75 Q68 75 68 110Z" />
        </svg>
        {/* Badge */}
        <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow ${good ? 'bg-indigo-500' : 'bg-red-400'}`}>
          {good ? (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        {/* Grid overlay (good photo = sharp) */}
        {good && (
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        )}
        {/* Blur overlay for bad photo */}
        {!good && <div className="absolute inset-0 backdrop-blur-[2px]" />}
      </div>
      <div className="text-center">
        <p className={`text-[11px] font-bold ${good ? 'text-indigo-600' : 'text-red-500'}`}>{label}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{tip}</p>
      </div>
    </div>
  )
}

const CHECKLIST = [
  {
    icon: (
      <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>
    ),
    text: '신랑 얼굴 사진 1장 — 정면, 밝은 조명',
  },
  {
    icon: (
      <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>
    ),
    text: '신부 얼굴 사진 1장 — 정면, 밝은 조명',
  },
  {
    icon: (
      <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M7.5 8.25h.008v.008H7.5V8.25z"/>
      </svg>
    ),
    text: '섹션별 커플 사진 — 각 최소 1장',
  },
]

export function Step0Checklist({ onNext }: Props) {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시작 전 준비물을 확인해요</h2>
        <p className="text-sm text-gray-400">좋은 사진이 더 예쁜 캐릭터를 만들어요</p>
      </div>

      {/* Photo quality guide */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">좋은 사진 vs 나쁜 사진</p>
        <div className="grid grid-cols-2 gap-3">
          <PhotoExample
            good={true}
            label="좋은 예시"
            tip="정면, 밝은 조명, 얼굴 선명"
          />
          <PhotoExample
            good={false}
            label="피해주세요"
            tip="어둡거나, 옆모습, 흐릿한 사진"
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">필요한 것들</p>
        {CHECKLIST.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
              {item.icon}
            </div>
            <p className="text-sm text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
        <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
        </svg>
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-semibold">사진이 없어도 괜찮아요.</span> 나중에 추가하거나 샘플로 먼저 체험해볼 수 있어요.
        </p>
      </div>

      {/* Primary CTA */}
      <button
        onClick={onNext}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        준비됐어요, 시작하기
      </button>

      {/* Expert consultation */}
      <a
        href="mailto:hello@onceuponus.com?subject=식전 애니메이션 영상 제작 문의&body=안녕하세요, 식전 영상 제작 전문가 상담을 요청합니다.%0A%0A신랑 이름:%0A신부 이름:%0A결혼식 날짜:%0A문의 내용:"
        className="w-full py-3 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-gray-500 hover:text-indigo-600 font-medium rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
        </svg>
        전문가에게 생성 문의하기
      </a>
    </div>
  )
}
