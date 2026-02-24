'use client'

type Props = { onNext: () => void }

/* ── SVG Illustrations ──────────────────────────────────────────────────── */

function GroomIllustration() {
  return (
    <svg viewBox="0 0 120 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Photo frame bg */}
      <rect x="10" y="10" width="100" height="120" rx="12" fill="#EEF2FF"/>
      {/* Soft light gradient */}
      <rect x="10" y="10" width="100" height="50" rx="12" fill="url(#groomLight)"/>
      <defs>
        <linearGradient id="groomLight" x1="60" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C7D2FE" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#EEF2FF" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Neck */}
      <rect x="50" y="74" width="20" height="22" rx="5" fill="#FBBF24"/>
      {/* Body / Suit */}
      <path d="M28 130 Q28 105 60 105 Q92 105 92 130Z" fill="#4338CA"/>
      {/* Collar */}
      <path d="M50 105 L60 115 L70 105" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Head */}
      <ellipse cx="60" cy="58" rx="22" ry="24" fill="#FBBF24"/>
      {/* Hair */}
      <path d="M38 52 Q38 35 60 35 Q82 35 82 52" fill="#92400E"/>
      {/* Eyes */}
      <ellipse cx="52" cy="56" rx="3.5" ry="4" fill="#1E1B4B"/>
      <ellipse cx="68" cy="56" rx="3.5" ry="4" fill="#1E1B4B"/>
      {/* Eye shine */}
      <circle cx="54" cy="54.5" r="1.2" fill="white"/>
      <circle cx="70" cy="54.5" r="1.2" fill="white"/>
      {/* Smile */}
      <path d="M53 66 Q60 72 67 66" stroke="#92400E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Cheek blush */}
      <ellipse cx="45" cy="64" rx="5" ry="3" fill="#FCA5A5" opacity="0.4"/>
      <ellipse cx="75" cy="64" rx="5" ry="3" fill="#FCA5A5" opacity="0.4"/>
      {/* Corner badge */}
      <circle cx="100" cy="22" r="10" fill="#6366F1"/>
      <path d="M95 22 L99 26 L105 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BrideIllustration() {
  return (
    <svg viewBox="0 0 120 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Photo frame bg */}
      <rect x="10" y="10" width="100" height="120" rx="12" fill="#FFF1F2"/>
      {/* Soft light */}
      <rect x="10" y="10" width="100" height="50" rx="12" fill="url(#brideLight)"/>
      <defs>
        <linearGradient id="brideLight" x1="60" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBCFE8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#FFF1F2" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Long hair back */}
      <path d="M34 58 Q30 90 38 115 Q46 108 46 85Z" fill="#92400E"/>
      <path d="M86 58 Q90 90 82 115 Q74 108 74 85Z" fill="#92400E"/>
      {/* Neck */}
      <rect x="51" y="74" width="18" height="20" rx="5" fill="#FDE68A"/>
      {/* Body / Dress */}
      <path d="M28 130 Q25 108 60 108 Q95 108 92 130Z" fill="#EC4899"/>
      {/* Veil hint */}
      <path d="M38 40 Q60 30 82 40 Q86 42 88 48" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" fill="none"/>
      {/* Head */}
      <ellipse cx="60" cy="58" rx="21" ry="23" fill="#FDE68A"/>
      {/* Hair top */}
      <path d="M39 50 Q39 34 60 33 Q81 34 81 50" fill="#92400E"/>
      {/* Eyes */}
      <ellipse cx="52.5" cy="56" rx="3" ry="3.5" fill="#1E1B4B"/>
      <ellipse cx="67.5" cy="56" rx="3" ry="3.5" fill="#1E1B4B"/>
      {/* Eye lashes */}
      <path d="M49.5 52.5 Q52.5 50.5 55.5 52.5" stroke="#1E1B4B" strokeWidth="1.2" fill="none"/>
      <path d="M64.5 52.5 Q67.5 50.5 70.5 52.5" stroke="#1E1B4B" strokeWidth="1.2" fill="none"/>
      {/* Eye shine */}
      <circle cx="54" cy="54.8" r="1" fill="white"/>
      <circle cx="69" cy="54.8" r="1" fill="white"/>
      {/* Lips */}
      <path d="M54 66 Q60 71 66 66" stroke="#F472B6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Cheek blush */}
      <ellipse cx="45" cy="63" rx="5" ry="3" fill="#FDA4AF" opacity="0.5"/>
      <ellipse cx="75" cy="63" rx="5" ry="3" fill="#FDA4AF" opacity="0.5"/>
      {/* Small tiara */}
      <path d="M50 37 L53 31 L57 37 L60 29 L63 37 L67 31 L70 37" stroke="#FCD34D" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Corner badge */}
      <circle cx="100" cy="22" r="10" fill="#EC4899"/>
      <path d="M95 22 L99 26 L105 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CouplePhotosIllustration() {
  return (
    <svg viewBox="0 0 120 140" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Back card 3 */}
      <rect x="20" y="25" width="68" height="85" rx="8" fill="#E0E7FF" transform="rotate(-8 20 25)"/>
      {/* Back card 2 */}
      <rect x="18" y="22" width="68" height="85" rx="8" fill="#C7D2FE" transform="rotate(4 18 22)"/>
      {/* Main card */}
      <rect x="18" y="20" width="72" height="90" rx="10" fill="#EEF2FF"/>
      <rect x="18" y="20" width="72" height="45" rx="10" fill="url(#coupleLight)"/>
      <defs>
        <linearGradient id="coupleLight" x1="54" y1="20" x2="54" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A5B4FC" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#EEF2FF" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Groom mini */}
      <ellipse cx="43" cy="62" rx="10" ry="11" fill="#FBBF24"/>
      <path d="M33 58 Q33 50 43 50 Q53 50 53 58" fill="#92400E"/>
      <ellipse cx="39.5" cy="61" rx="1.8" ry="2" fill="#1E1B4B"/>
      <ellipse cx="46.5" cy="61" rx="1.8" ry="2" fill="#1E1B4B"/>
      <path d="M40 68 Q43 71 46 68" stroke="#92400E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M27 95 Q27 80 43 80 Q59 80 59 95Z" fill="#4338CA"/>

      {/* Bride mini */}
      <ellipse cx="66" cy="62" rx="10" ry="11" fill="#FDE68A"/>
      <path d="M56 58 Q56 50 66 50 Q76 50 76 58" fill="#92400E"/>
      <path d="M56 65 Q53 78 58 90" fill="#92400E" opacity="0.7"/>
      <path d="M76 65 Q79 78 74 90" fill="#92400E" opacity="0.7"/>
      <ellipse cx="62.5" cy="61" rx="1.8" ry="2" fill="#1E1B4B"/>
      <ellipse cx="69.5" cy="61" rx="1.8" ry="2" fill="#1E1B4B"/>
      <path d="M63 68 Q66 71 69 68" stroke="#F472B6" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M50 95 Q50 80 66 80 Q82 80 82 95Z" fill="#EC4899"/>

      {/* Heart between */}
      <path d="M54 60 C54 57 51 55 49 58 C47 55 44 57 44 60 C44 64 49 67 49 67 C49 67 54 64 54 60Z" fill="#F43F5E" transform="translate(5 -2) scale(0.9)"/>

      {/* Stack indicator dots */}
      <circle cx="95" cy="50" r="4.5" fill="#6366F1"/>
      <circle cx="95" cy="62" r="4.5" fill="#818CF8"/>
      <circle cx="95" cy="74" r="4.5" fill="#A5B4FC"/>
      {/* Plus text */}
      <text x="91" y="90" fontSize="10" fill="#6B7280" fontWeight="bold">n장</text>

      {/* Corner badge */}
      <circle cx="80" cy="30" r="10" fill="#6366F1"/>
      <path d="M75 30 L79 34 L85 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
      accent: 'bg-indigo-50 border-indigo-200',
      numColor: 'text-indigo-400',
    },
    {
      illustration: <BrideIllustration />,
      number: '02',
      title: '신부 얼굴 사진',
      desc: '정면·밝은 조명 1장',
      accent: 'bg-pink-50 border-pink-200',
      numColor: 'text-pink-400',
    },
    {
      illustration: <CouplePhotosIllustration />,
      number: '03',
      title: '커플 추억 사진',
      desc: '섹션별 최소 1장씩',
      accent: 'bg-violet-50 border-violet-200',
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
          <div key={card.number} className={`rounded-2xl border-2 ${card.accent} p-3 flex flex-col items-center gap-2.5`}>
            {/* Illustration */}
            <div className="w-full aspect-[5/6]">
              {card.illustration}
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
