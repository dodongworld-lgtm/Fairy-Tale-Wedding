'use client'

type Props = { onNext: () => void }

/* ── Hand-drawn 2D illustrations ────────────────────────────────────────── */

function GroomIllustration() {
  return (
    <svg viewBox="0 0 120 130" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M30 130 Q28 105 36 98 Q48 90 60 90 Q72 90 84 98 Q92 105 90 130Z"
        fill="white" stroke="#111" strokeWidth="3.5" strokeLinejoin="round"/>
      {/* Collar / tie */}
      <path d="M52 95 L60 108 L68 95" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Neck */}
      <rect x="53" y="78" width="14" height="16" rx="7" fill="white" stroke="#111" strokeWidth="3.5"/>
      {/* Head */}
      <ellipse cx="60" cy="58" rx="26" ry="28" fill="white" stroke="#111" strokeWidth="3.5"/>
      {/* Hair — short, brushed side */}
      <path d="M34 50 Q34 28 60 26 Q86 28 86 50 Q82 36 60 35 Q38 36 34 50Z"
        fill="#111" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
      {/* Eyes */}
      <circle cx="50" cy="58" r="3.5" fill="#111"/>
      <circle cx="70" cy="58" r="3.5" fill="#111"/>
      {/* Eye shine */}
      <circle cx="52" cy="56.5" r="1.3" fill="white"/>
      <circle cx="72" cy="56.5" r="1.3" fill="white"/>
      {/* Nose */}
      <path d="M60 62 Q62 67 60 68" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M51 74 Q60 82 69 74" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Ear L */}
      <path d="M34 56 Q28 58 30 64 Q32 68 36 65" fill="white" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Ear R */}
      <path d="M86 56 Q92 58 90 64 Q88 68 84 65" fill="white" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function BrideIllustration() {
  return (
    <svg viewBox="0 0 120 130" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Long hair back */}
      <path d="M36 56 Q30 80 34 115 Q40 110 44 90 Q44 70 38 58Z" fill="#111"/>
      <path d="M84 56 Q90 80 86 115 Q80 110 76 90 Q76 70 82 58Z" fill="#111"/>
      {/* Body / dress */}
      <path d="M26 130 Q24 108 34 100 Q46 92 60 92 Q74 92 86 100 Q96 108 94 130Z"
        fill="white" stroke="#111" strokeWidth="3.5" strokeLinejoin="round"/>
      {/* Neck */}
      <rect x="53" y="78" width="14" height="16" rx="7" fill="white" stroke="#111" strokeWidth="3.5"/>
      {/* Head */}
      <ellipse cx="60" cy="57" rx="25" ry="27" fill="white" stroke="#111" strokeWidth="3.5"/>
      {/* Hair top */}
      <path d="M35 50 Q35 28 60 26 Q85 28 85 50 Q80 34 60 33 Q40 34 35 50Z"
        fill="#111" stroke="#111" strokeWidth="1" strokeLinejoin="round"/>
      {/* Eyes */}
      <circle cx="50" cy="56" r="3.5" fill="#111"/>
      <circle cx="70" cy="56" r="3.5" fill="#111"/>
      {/* Lashes */}
      <path d="M47 52.5 Q50 50 53 52.5" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M67 52.5 Q70 50 73 52.5" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Eye shine */}
      <circle cx="52" cy="55" r="1.2" fill="white"/>
      <circle cx="72" cy="55" r="1.2" fill="white"/>
      {/* Nose */}
      <path d="M60 61 Q62 66 60 67" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M52 73 Q60 80 68 73" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Ear L */}
      <path d="M35 55 Q29 57 31 63 Q33 67 37 64" fill="white" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Ear R */}
      <path d="M85 55 Q91 57 89 63 Q87 67 83 64" fill="white" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Small flower in hair */}
      <circle cx="74" cy="34" r="4" fill="white" stroke="#111" strokeWidth="2.5"/>
      <circle cx="74" cy="34" r="1.5" fill="#111"/>
    </svg>
  )
}

function CouplePhotosIllustration() {
  return (
    <svg viewBox="0 0 130 130" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* === LEFT: Groom (smaller, behind) === */}
      {/* Body */}
      <path d="M8 130 Q8 108 18 102 Q28 96 44 96 Q56 96 64 102 Q72 108 72 130Z"
        fill="white" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      {/* Collar */}
      <path d="M37 100 L43 111 L49 100" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Neck */}
      <rect x="38" y="82" width="10" height="16" rx="5" fill="white" stroke="#111" strokeWidth="3"/>
      {/* Head */}
      <ellipse cx="43" cy="62" rx="20" ry="22" fill="white" stroke="#111" strokeWidth="3"/>
      {/* Hair */}
      <path d="M23 55 Q23 38 43 36 Q63 38 63 55 Q59 44 43 43 Q27 44 23 55Z"
        fill="#111" stroke="#111" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="36.5" cy="62" r="2.8" fill="#111"/>
      <circle cx="49.5" cy="62" r="2.8" fill="#111"/>
      <circle cx="38" cy="60.8" r="1.1" fill="white"/>
      <circle cx="51" cy="60.8" r="1.1" fill="white"/>
      {/* Nose */}
      <path d="M43 66 Q44.5 70 43 71" stroke="#111" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M37 77 Q43 83 49 77" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* === RIGHT: Bride (foreground) === */}
      {/* Long hair back right */}
      <path d="M90 58 Q96 82 92 120 Q86 116 84 95 Q83 72 88 60Z" fill="#111"/>
      {/* Body / dress */}
      <path d="M62 130 Q60 110 70 103 Q80 96 94 96 Q108 96 118 103 Q128 110 126 130Z"
        fill="white" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      {/* Neck */}
      <rect x="88" y="80" width="12" height="18" rx="6" fill="white" stroke="#111" strokeWidth="3"/>
      {/* Head */}
      <ellipse cx="94" cy="60" rx="22" ry="24" fill="white" stroke="#111" strokeWidth="3"/>
      {/* Hair top */}
      <path d="M72 53 Q72 34 94 32 Q116 34 116 53 Q112 40 94 39 Q76 40 72 53Z"
        fill="#111" stroke="#111" strokeWidth="1"/>
      {/* Long hair front-left */}
      <path d="M72 52 Q66 76 70 112 Q76 108 78 88 Q78 68 74 54Z" fill="#111"/>
      {/* Eyes */}
      <circle cx="87" cy="59" r="3" fill="#111"/>
      <circle cx="101" cy="59" r="3" fill="#111"/>
      {/* Lashes */}
      <path d="M84 55.5 Q87 53 90 55.5" stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M98 55.5 Q101 53 104 55.5" stroke="#111" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="88.5" cy="58" r="1.1" fill="white"/>
      <circle cx="102.5" cy="58" r="1.1" fill="white"/>
      {/* Smile */}
      <path d="M87 73 Q94 80 101 73" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Flower */}
      <circle cx="107" cy="38" r="4" fill="white" stroke="#111" strokeWidth="2.5"/>
      <circle cx="107" cy="38" r="1.5" fill="#111"/>

      {/* Heart between them */}
      <path d="M67 80 C67 76 62 74 60 77 C58 74 53 76 53 80 C53 85 60 91 60 91 C60 91 67 85 67 80Z"
        fill="#111" stroke="#111" strokeWidth="1"/>
    </svg>
  )
}

/* ── Main Component ─────────────────────────────────────────────────────── */

export function Step0Checklist({ onNext }: Props) {
  const CARDS = [
    {
      illustration: <GroomIllustration />,
      number: '01',
      title: '신랑 얼굴 사진',
      desc: '정면·밝은 조명 1장',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      numColor: 'text-indigo-400',
    },
    {
      illustration: <BrideIllustration />,
      number: '02',
      title: '신부 얼굴 사진',
      desc: '정면·밝은 조명 1장',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      numColor: 'text-pink-400',
    },
    {
      illustration: <CouplePhotosIllustration />,
      number: '03',
      title: '커플 추억 사진',
      desc: '섹션별 최소 1장씩',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      numColor: 'text-violet-400',
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1.5">이것만 준비하면 돼요</h2>
        <p className="text-sm text-gray-400">사진 3가지로 세상에 하나뿐인 영상이 만들어져요</p>
      </div>

      {/* Illustration cards */}
      <div className="grid grid-cols-3 gap-3">
        {CARDS.map(card => (
          <div key={card.number} className={`rounded-2xl border-2 ${card.border} ${card.bg} p-3 flex flex-col items-center gap-2`}>
            <div className="w-full aspect-[5/6]">
              {card.illustration}
            </div>
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
