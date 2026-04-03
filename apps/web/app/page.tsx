'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useLang } from './contexts/LangContext'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function LandingPage() {
  const { t } = useLang()
  const pageRef = useReveal()

  return (
    <main ref={pageRef} className="min-h-screen bg-bg text-text overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6 sm:px-8">
          <span className="text-lg font-black tracking-tight font-serif text-text">{t.common.brand}</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-text-muted">
            <a href="#showcase" className="hover:text-text transition-colors">샘플</a>
            <a href="#how" className="hover:text-text transition-colors">제작 과정</a>
            <a href="#pricing" className="hover:text-text transition-colors">요금</a>
          </nav>
          <Link href="/create" className="px-5 py-2.5 bg-text text-bg text-sm font-semibold rounded-full hover:opacity-80 transition-opacity">
            시작하기
          </Link>
        </div>
      </header>

      {/* ── HERO — Result-first, full bleed ── */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-text-muted mb-6">AI Wedding Animation</p>
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight text-text max-w-4xl">
              두 사람의 이야기가<br />
              <span className="text-primary">동화가 되는 순간</span>
            </h1>
          </div>
          <div className="reveal reveal-delay-1 flex flex-col sm:flex-row items-start gap-6 mb-16">
            <p className="text-lg text-text-secondary max-w-md leading-relaxed">
              사진 몇 장과 우리의 이야기만 입력하면,<br />
              AI가 세상에 하나뿐인 애니메이션 영상을 만들어드려요.
            </p>
            <div className="flex gap-3">
              <Link href="/create" className="px-8 py-4 bg-text text-bg text-base font-bold rounded-full hover:opacity-80 transition-opacity whitespace-nowrap">
                지금 만들기
              </Link>
              <a href="#showcase" className="px-8 py-4 text-text text-base font-medium rounded-full border border-border hover:border-text/30 transition-colors whitespace-nowrap">
                샘플 보기
              </a>
            </div>
          </div>

          {/* Hero showcase — large video/result preview */}
          <div className="reveal reveal-delay-2">
            <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden bg-dark-bg shadow-2xl shadow-dark-bg/10 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark-bg to-dark-bg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-white/50 text-sm">샘플 영상 — 곧 업데이트</p>
              </div>
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
                디즈니 스타일
              </div>
              <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full">
                1:02 · FHD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-text-muted text-sm reveal">
          <span><strong className="text-text font-black text-2xl">500+</strong> 커플의 선택</span>
          <span className="w-px h-4 bg-border hidden sm:block" />
          <span><strong className="text-text font-black text-2xl">4.9</strong> 만족도</span>
          <span className="w-px h-4 bg-border hidden sm:block" />
          <span><strong className="text-text font-black text-2xl">3분</strong> 만에 완성</span>
          <span className="w-px h-4 bg-border hidden sm:block" />
          <span><strong className="text-text font-black text-2xl">8가지</strong> 스타일</span>
        </div>
      </section>

      {/* ── SHOWCASE — Result gallery ── */}
      <section id="showcase" className="py-28 sm:py-36 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">실제 결과물</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">이런 영상이 만들어져요</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { style: '동화', couple: '지훈 & 수연', desc: '홍대 카페에서 시작된 5년간의 러브스토리', gradient: 'from-rose-900/40 to-dark-bg' },
              { style: '지브리', couple: '민준 & 서연', desc: '북한산 정상에서의 감동 프로포즈', gradient: 'from-emerald-900/40 to-dark-bg' },
              { style: '수채화', couple: '현우 & 지은', desc: '소꿉친구에서 인생의 동반자가 되기까지', gradient: 'from-violet-900/40 to-dark-bg' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} group cursor-pointer`}>
                <div className={`aspect-[9/12] rounded-2xl overflow-hidden bg-gradient-to-b ${item.gradient} relative mb-4`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                      <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {item.style} 스타일
                  </div>
                </div>
                <p className="font-bold text-text text-lg">{item.couple}</p>
                <p className="text-text-muted text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-28 sm:py-36 px-6 sm:px-8 bg-bg-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-20">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">제작 과정</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">4단계면 충분해요</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { n: '01', title: '스토리 선택', desc: '4가지 템플릿 중 하나를 고르거나 직접 구성하세요' },
              { n: '02', title: '이야기 입력', desc: '우리의 이야기, 사진, 전하고 싶은 말을 입력하세요' },
              { n: '03', title: 'AI가 제작', desc: '캐릭터 생성, 나레이션, BGM까지 AI가 알아서' },
              { n: '04', title: '영상 완성', desc: '3분 후, 세상에 하나뿐인 영상이 완성됩니다' },
            ].map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <span className="text-6xl font-black text-border/60 block mb-4">{step.n}</span>
                <h3 className="text-xl font-bold text-text mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — alternating layout ── */}
      <section className="py-28 sm:py-36 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">AI 캐릭터</p>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">실제 사진이<br />디즈니 캐릭터로</h3>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                AI가 두 분의 얼굴을 분석해 동화 속 캐릭터로 변환합니다.<br />
                디즈니, 지브리, 수채화 등 8가지 스타일을 선택할 수 있어요.
              </p>
              <Link href="/create" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                지금 변환해보기
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
            <div className="reveal reveal-delay-2 aspect-square rounded-3xl bg-bg-subtle border border-border flex items-center justify-center">
              <p className="text-text-muted text-sm">캐릭터 변환 결과물 이미지</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1 aspect-square rounded-3xl bg-bg-subtle border border-border flex items-center justify-center order-2 lg:order-1">
              <p className="text-text-muted text-sm">스토리 나레이션 미리보기</p>
            </div>
            <div className="reveal-left order-1 lg:order-2">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">AI 스토리</p>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">두 분만의<br />감성 스토리</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                입력한 기억들을 바탕으로 AI가 4막 구조의 나레이션을 작성합니다.<br />
                감정이 담긴 TTS 음성과 오케스트라 BGM까지 자동으로.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">초고속 제작</p>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">입력부터 완성까지<br /><span className="text-primary">단 3분</span></h3>
              <p className="text-text-secondary text-base leading-relaxed">
                전문 업체 1~4주, 비용 50~200만원.<br />
                Once Upon Us는 3분, 4만9천원부터.
              </p>
            </div>
            <div className="reveal reveal-delay-2 aspect-square rounded-3xl bg-bg-subtle border border-border flex items-center justify-center">
              <p className="text-text-muted text-sm">제작 과정 타임라인</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STYLES ── */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-bg-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">애니메이션 스타일</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">8가지 동화 세계</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: '동화', emoji: '🏰' },
              { label: '수채화', emoji: '🎨' },
              { label: '지브리', emoji: '🌿' },
              { label: '디즈니', emoji: '✨' },
              { label: '팝아트', emoji: '💥' },
              { label: '미니멀', emoji: '◻️' },
              { label: '클래식', emoji: '🎞️' },
              { label: '코믹', emoji: '💬' },
            ].map((s, i) => (
              <Link
                key={i}
                href="/create"
                className={`reveal reveal-scale reveal-delay-${Math.min(i + 1, 6)} flex flex-col items-center gap-3 py-8 bg-bg rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group`}
              >
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{s.emoji}</span>
                <span className="text-sm font-semibold text-text">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 sm:py-36 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">요금</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">마음에 드실 때만 결제</h2>
            <p className="text-text-muted">영상 미리보기까지 무료. 결제는 만족할 때만.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="reveal reveal-delay-1 rounded-3xl border-2 border-border bg-bg p-8 sm:p-10 relative">
              <span className="absolute -top-3 right-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">반값 이벤트</span>
              <h3 className="font-black text-xl mb-1">Standard</h3>
              <p className="text-xs text-text-muted mb-6">충분히 감동적인 기본</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-sm line-through text-text-muted">₩99,000</span>
                <span className="text-4xl font-black">₩49,000</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['FHD (1080p)', '다운로드 3회', '공유 링크', '30일 보관'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create" className="block text-center py-3.5 border-2 border-border text-text font-semibold rounded-xl hover:border-text/30 transition-colors">시작하기</Link>
            </div>

            <div className="reveal reveal-delay-2 rounded-3xl border-2 border-text bg-text text-bg p-8 sm:p-10 relative shadow-xl">
              <span className="absolute -top-3 left-6 bg-bg text-text text-xs font-bold px-3 py-1 rounded-full">추천</span>
              <h3 className="font-black text-xl mb-1">Pro</h3>
              <p className="text-xs text-bg/50 mb-6">완벽한 결과물</p>
              <div className="mb-8">
                <span className="text-4xl font-black">₩199,000</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['4K 초고화질', '무제한 다운로드', '공유 링크', '영구 보관', '이미지 재생성 5회'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-bg/60">
                    <svg className="w-4 h-4 flex-shrink-0 text-bg/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create" className="block text-center py-3.5 bg-bg text-text font-bold rounded-xl hover:opacity-90 transition-opacity">시작하기</Link>
            </div>

            <div className="reveal reveal-delay-3 rounded-3xl border-2 border-border bg-bg p-8 sm:p-10">
              <h3 className="font-black text-xl mb-1">Ultra</h3>
              <p className="text-xs text-text-muted mb-6">프리미엄 경험</p>
              <div className="mb-8">
                <span className="text-4xl font-black">₩299,000</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['4K 초고화질', '무제한 다운로드', '영구 보관', '무제한 재생성', 'USB 배송', '전담 편집 지원'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/create" className="block text-center py-3.5 border-2 border-border text-text font-semibold rounded-xl hover:border-text/30 transition-colors">시작하기</Link>
            </div>
          </div>

          <div className="reveal mt-8 bg-text text-bg rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="font-bold">B2B · 웨딩홀 / 스튜디오 / 플래너</span>
              <p className="text-bg/50 text-sm mt-1">월정액 무제한 영상 제작 · 브랜드 커스터마이징</p>
            </div>
            <a href="mailto:hello@onceuponus.kr" className="px-6 py-3 bg-bg text-text text-sm font-bold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">도입 문의</a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-bg-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">후기</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">실제 커플들의 이야기</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: '지훈 & 수연', text: '하객들이 다 울었어요. 식전영상으로 이보다 좋은 건 없을 것 같아요.', role: '2024년 12월 결혼' },
              { name: '민준 & 서연', text: '전문 업체 견적 받고 놀랐는데, 여기서 10분의 1 가격에 더 감동적인 영상을 받았어요.', role: '2025년 1월 결혼' },
              { name: '현우 & 지은', text: 'AI가 만들었다고 믿을 수 없는 퀄리티. 부모님도 너무 좋아하셨어요.', role: '프로포즈 영상' },
            ].map((r, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} bg-bg rounded-2xl p-8`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-text text-base leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-text text-sm">{r.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 sm:py-40 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            다시 오지 않을 그 순간,<br />동화로 남겨보세요
          </h2>
          <p className="text-text-muted text-lg mb-10">결제 없이 미리보기까지 무료로 체험할 수 있어요.</p>
          <Link href="/create" className="inline-block px-10 py-5 bg-text text-bg text-lg font-bold rounded-full hover:opacity-80 transition-opacity">
            지금 시작하기
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 sm:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-10">
          <div>
            <span className="text-lg font-black font-serif text-text block mb-2">{t.common.brand}</span>
            <p className="text-sm text-text-muted max-w-xs">AI가 만드는 세상에 하나뿐인 웨딩 애니메이션</p>
          </div>
          <div className="flex gap-12 text-sm text-text-muted">
            <div className="flex flex-col gap-2">
              <a href="#showcase" className="hover:text-text transition-colors">샘플</a>
              <a href="#how" className="hover:text-text transition-colors">제작 과정</a>
              <a href="#pricing" className="hover:text-text transition-colors">요금</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@onceuponus.kr" className="hover:text-text transition-colors">문의</a>
              <a href="#" className="hover:text-text transition-colors">이용약관</a>
              <a href="#" className="hover:text-text transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50">
          <p className="text-xs text-text-muted">© 2025 Once Upon Us. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
