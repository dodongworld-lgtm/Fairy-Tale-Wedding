'use client'

type Props = { onNext: () => void }

export function Step0Checklist({ onNext }: Props) {
  const CARDS = [
    {
      number: '01',
      title: '신랑 얼굴 사진',
      desc: '정면·밝은 조명 1장',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      numColor: 'text-indigo-400',
      placeholder: 'bg-indigo-100',
    },
    {
      number: '02',
      title: '신부 얼굴 사진',
      desc: '정면·밝은 조명 1장',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      numColor: 'text-pink-400',
      placeholder: 'bg-pink-100',
    },
    {
      number: '03',
      title: '커플 추억 사진',
      desc: '섹션별 최소 1장씩',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      numColor: 'text-violet-400',
      placeholder: 'bg-violet-100',
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1.5">이것만 준비하면 돼요</h2>
        <p className="text-sm text-gray-400">사진 3가지로 세상에 하나뿐인 영상이 만들어져요</p>
      </div>

      {/* Cards — illustration placeholder (리소스 추후 교체) */}
      <div className="grid grid-cols-3 gap-3">
        {CARDS.map(card => (
          <div key={card.number} className={`rounded-2xl border-2 ${card.border} ${card.bg} p-3 flex flex-col items-center gap-2`}>
            {/* Illustration placeholder */}
            <div className={`w-full aspect-[5/6] rounded-xl ${card.placeholder} flex items-center justify-center`}>
              <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
              </svg>
            </div>
            {/* Label */}
            <div className="text-center">
              <span className={`text-[10px] font-black tracking-widest ${card.numColor}`}>{card.number}</span>
              <p className="text-xs font-bold text-gray-900 leading-tight mt-0.5">{card.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
        <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
        </svg>
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-semibold">사진이 없어도 괜찮아요.</span> 나중에 추가하거나 샘플로 먼저 체험해볼 수 있어요.
        </p>
      </div>

      {/* CTA */}
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
