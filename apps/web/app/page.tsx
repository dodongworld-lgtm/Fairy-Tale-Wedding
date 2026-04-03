'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useLang } from './contexts/LangContext'

/** Scroll-triggered fade-in animation hook */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function LandingPage() {
  const pageRef = useReveal()
  const { t } = useLang()

  const PROCESS_STEPS = [
    {
      n: '01', title: t.landing.process1, desc: t.landing.process1desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
        </svg>
      ),
    },
    {
      n: '02', title: t.landing.process2, desc: t.landing.process2desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
        </svg>
      ),
    },
    {
      n: '03', title: t.landing.process3, desc: t.landing.process3desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
      ),
    },
    {
      n: '04', title: t.landing.process4, desc: t.landing.process4desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"/>
        </svg>
      ),
    },
  ]

  return (
    <main ref={pageRef} className="min-h-screen bg-bg text-text overflow-x-hidden">

      {/* ── 1. NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="h-16 flex items-center justify-between">
            <span className="text-lg font-black tracking-tight text-text font-serif">{t.common.brand}</span>
            <nav className="hidden lg:flex items-center gap-8 text-sm text-text-secondary">
              <a href="#features" className="hover:text-text transition-colors">{t.landing.navFeatures}</a>
              <a href="#styles" className="hover:text-text transition-colors">{t.landing.navStyles}</a>
              <a href="#reviews" className="hover:text-text transition-colors">{t.landing.navReviews}</a>
              <a href="#pricing" className="hover:text-text transition-colors">{t.landing.navPricing}</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm text-text-secondary hover:text-text transition-colors">{t.common.login}</Link>
              <Link href="/create" className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors">
                {t.common.createVideo}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. HERO ── */}
      <section className="pt-40 sm:pt-48 pb-24 sm:pb-32 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="reveal reveal-left">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-8">
              {t.landing.heroLabel}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-text mb-8">
              {t.landing.heroTitle1}<br />
              <span className="text-primary">{t.landing.heroTitle2}</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-lg mb-10 leading-relaxed">
              {t.landing.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/create" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-xl transition-colors text-center">
                {t.landing.heroBtn}
              </Link>
              <a href="#features" className="px-8 py-4 bg-bg text-text font-semibold text-base rounded-xl border border-border hover:border-border-hover transition-colors text-center">
                {t.landing.heroSample}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['J', 'S', 'M', 'H'].map((initial, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary-light/40 border-2 border-bg flex items-center justify-center text-xs font-bold text-primary-dark">
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-sm text-text-secondary">{t.landing.ctaStat1}</span>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden shadow-2xl shadow-dark-bg/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-dark-bg to-dark-bg" />
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 px-8">
                <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-1">{t.landing.videoAct}</p>
                <p className="text-white text-lg sm:text-2xl font-black leading-tight text-center">
                  &ldquo;{t.landing.videoNarr1}<br />
                  <span className="text-primary-light">{t.landing.videoNarr2}&rdquo;</span>
                </p>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="text-dark-text/70 text-xs">0:18 / 1:02</span>
                  </div>
                  <div className="h-1 bg-white/20 rounded-full">
                    <div className="h-1 bg-primary-light rounded-full w-[28%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: t.landing.stat1, label: t.landing.stat1label },
            { value: t.landing.stat2, label: t.landing.stat2label },
            { value: t.landing.stat3, label: t.landing.stat3label },
            { value: t.landing.stat4, label: t.landing.stat4label },
          ].map((s, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 reveal reveal-delay-${i + 1}`}>
              <span className="text-3xl sm:text-4xl font-black text-primary">{s.value}</span>
              <span className="text-sm text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURES ── */}
      <section id="features" className="py-28 sm:py-36 px-6 sm:px-8 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.navFeatures}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight">{t.landing.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-bg-card border border-border/50 rounded-2xl p-8 sm:p-10 hover:border-border-hover hover:shadow-lg transition-all duration-300 group reveal reveal-delay-1">
              <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-3">{t.landing.feat1n1} {t.landing.feat1n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{t.landing.feat1desc}</p>
              <Link href="/create" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                {t.landing.feat1btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            <div className="bg-bg-card border border-border/50 rounded-2xl p-8 sm:p-10 hover:border-border-hover hover:shadow-lg transition-all duration-300 reveal reveal-delay-2">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-3">{t.landing.feat2n1} {t.landing.feat2n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat2desc}</p>
            </div>

            <div className="bg-bg-card border border-border/50 rounded-2xl p-8 sm:p-10 hover:border-border-hover hover:shadow-lg transition-all duration-300 reveal reveal-delay-3">
              <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-3">{t.landing.feat3label}</h3>
              <span className="text-4xl font-black text-primary leading-none block mb-3">{t.landing.feat3time}</span>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat3desc}</p>
            </div>

            <div className="bg-bg-card border border-border/50 rounded-2xl p-8 sm:p-10 hover:border-border-hover hover:shadow-lg transition-all duration-300 reveal reveal-delay-4">
              <div className="w-12 h-12 bg-bg-subtle rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-3">{t.landing.feat4n1} {t.landing.feat4n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat4desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED VIDEOS ── */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-bg-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.featuredLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight">{t.landing.featuredTitle}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group reveal reveal-delay-1">
              <div className="aspect-video bg-dark-bg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 to-dark-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">{t.landing.propose}</span>
                <span className="absolute bottom-4 right-4 bg-dark-bg/50 text-white text-xs px-2.5 py-1 rounded font-medium">1:02</span>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">J</div>
                  <div>
                    <p className="font-bold text-text text-sm">{'\uC9C0\uD6C8 & \uC218\uC5F0'}</p>
                    <p className="text-text-muted text-xs">2024.12</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{'\uD64D\uB300 \uCE74\uD398\uC5D0\uC11C \uC2DC\uC791\uB41C \uC6B4\uBA85\uC801\uC778 \uB9CC\uB0A8. 5\uB144\uC758 \uC5F0\uC560 \uB05D\uC5D0 \uD55C\uAC15\uC5D0\uC11C\uC758 \uAC10\uB3D9 \uD504\uB85C\uD3EC\uC988.'}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs font-medium bg-primary-light/30 text-primary px-2.5 py-1 rounded-full">{t.landing.styleFairytale}</span>
                  <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2.5 py-1 rounded-full">{'\uD55C\uAD6D\uC5B4'}</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group reveal reveal-delay-2">
              <div className="aspect-video bg-dark-bg/80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span className="absolute top-4 left-4 bg-text-secondary text-white text-xs px-3 py-1 rounded-full font-semibold">{t.landing.wedding}</span>
                <span className="absolute bottom-4 right-4 bg-dark-bg/50 text-white text-xs px-2.5 py-1 rounded font-medium">1:05</span>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center text-xs font-bold text-accent">M</div>
                  <div>
                    <p className="font-bold text-text text-sm">{'\uBBFC\uC900 & \uC11C\uC5F0'}</p>
                    <p className="text-text-muted text-xs">2025.01</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{'\uCE5C\uAD6C\uB85C \uC2DC\uC791\uD55C 7\uB144, \uBD81\uD55C\uC0B0 \uC815\uC0C1\uC5D0\uC11C\uC758 \uAC10\uB3D9\uC801\uC778 \uD504\uB85C\uD3EC\uC988. \uACB0\uD63C\uC2DD \uD558\uAC1D 200\uBA85\uC774 \uD568\uAED8 \uAC10\uC0C1.'}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs font-medium bg-accent-light text-accent px-2.5 py-1 rounded-full">{t.landing.styleWatercolor}</span>
                  <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2.5 py-1 rounded-full">{'\uD55C\uAD6D\uC5B4'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ANIMATION STYLES ── */}
      <section id="styles" className="py-28 sm:py-36 px-6 sm:px-8 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.stylesLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight">{t.landing.stylesTitle}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
            {[
              { label: t.landing.styleFairytale, emoji: '\uD83C\uDFF0' },
              { label: t.landing.styleWatercolor, emoji: '\uD83C\uDFA8' },
              { label: t.landing.styleGhibli, emoji: '\uD83C\uDF3F' },
              { label: t.landing.styleDisney, emoji: '\u2728' },
              { label: t.landing.stylePopart, emoji: '\uD83D\uDCA5' },
              { label: t.landing.styleMinimal, emoji: '\u25FB\uFE0F' },
              { label: t.landing.styleClassic, emoji: '\uD83C\uDF9E\uFE0F' },
              { label: t.landing.styleComic, emoji: '\uD83D\uDCAC' },
            ].map((s, i) => (
              <Link key={i} href="/create" className={`flex flex-col items-center gap-3 py-6 px-3 bg-bg-card border border-border/50 rounded-2xl hover:border-border-hover hover:shadow-md transition-all group reveal reveal-scale reveal-delay-${Math.min(i + 1, 6)}`}>
                <span className="text-2xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <span className="text-sm font-semibold text-text">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. HOW IT WORKS ── */}
      <section className="py-32 sm:py-40 px-6 sm:px-8 bg-bg-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.processLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight">{t.landing.processTitle}</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8 relative">
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.n} className={`relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 pb-10 md:pb-0 reveal reveal-delay-${i + 1}`}>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="md:hidden absolute left-6 top-14 bottom-0 w-px bg-border z-0" />
                  )}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-bg border-2 border-border flex items-center justify-center text-primary">
                    {s.icon}
                  </div>
                  <div className="md:mt-6 md:text-center">
                    <span className="block text-xs font-black tracking-widest mb-1 text-text-muted">{s.n}</span>
                    <h3 className="font-bold text-text text-base mb-1.5">{s.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ── */}
      <section id="pricing" className="py-28 sm:py-36 px-6 sm:px-8 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.pricingLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight mb-4">{t.landing.pricingTitle}</h2>
            <p className="text-base text-text-secondary leading-relaxed">{t.landing.pricingSubtitle}</p>
          </div>

          <div className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full mb-10 sm:mb-12">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.landing.eventBanner}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="rounded-2xl border-2 border-border bg-bg p-8 sm:p-10 relative reveal reveal-delay-1">
              <span className="absolute -top-3 right-6 bg-accent text-white text-xs font-black px-3 py-1 rounded-full">{t.landing.eventLabel}</span>
              <h3 className="font-black text-xl mb-1 text-text">Standard</h3>
              <p className="text-xs mb-6 text-text-muted">{t.checkout.standardDesc}</p>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-base line-through text-text-muted">{'\u20A999,000'}</span>
                <span className="text-4xl font-black text-text">{'\u20A949,000'}</span>
              </div>
              <ul className="space-y-3">
                {['FHD (1080p)', '\uB2E4\uC6B4\uB85C\uB4DC 3\uD68C', '\uACF5\uC720 \uB9C1\uD06C', '30\uC77C \uBCF4\uAD00'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-primary bg-primary p-8 sm:p-10 relative shadow-lg shadow-primary/20 reveal reveal-delay-2">
              <span className="absolute -top-3 left-6 bg-bg text-primary text-xs font-black px-3 py-1 rounded-full border border-primary-light/30">{t.landing.recommended}</span>
              <h3 className="font-black text-xl mb-1 text-white">Pro</h3>
              <p className="text-xs mb-6 text-primary-light/70">{t.checkout.proDesc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">{'\u20A9199,000'}</span>
              </div>
              <ul className="space-y-3">
                {['4K \uCD08\uACE0\uD654\uC9C8', '\uBB34\uC81C\uD55C \uB2E4\uC6B4\uB85C\uB4DC', '\uACF5\uC720 \uB9C1\uD06C', '\uC601\uAD6C \uBCF4\uAD00', '\uC774\uBBF8\uC9C0 \uC7AC\uC0DD\uC131 5\uD68C'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-primary-light/50">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-border bg-bg p-8 sm:p-10 relative reveal reveal-delay-3">
              <h3 className="font-black text-xl mb-1 text-text">Ultra</h3>
              <p className="text-xs mb-6 text-text-muted">{t.checkout.ultraDesc}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-text">{'\u20A9299,000'}</span>
              </div>
              <ul className="space-y-3">
                {['4K \uCD08\uACE0\uD654\uC9C8', '\uBB34\uC81C\uD55C \uB2E4\uC6B4\uB85C\uB4DC', '\uC601\uAD6C \uBCF4\uAD00', '\uBB34\uC81C\uD55C \uC7AC\uC0DD\uC131', 'USB \uBC30\uC1A1', '\uC804\uB2F4 \uD3B8\uC9D1 \uC9C0\uC6D0'].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-dark-bg rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold">{t.landing.b2bTitle}</span>
                <span className="text-xs font-bold bg-white/10 text-text-muted px-2.5 py-1 rounded-full">{t.landing.b2bBadge}</span>
              </div>
              <p className="text-text-muted text-sm">{t.landing.b2bDesc}</p>
            </div>
            <a href="mailto:hello@onceuponus.kr" className="flex-shrink-0 px-6 py-3 bg-bg text-text text-sm font-bold rounded-xl hover:bg-bg-subtle transition-colors">
              {t.landing.b2bBtn}
            </a>
          </div>

          <div className="text-center">
            <Link href="/create" className="inline-block px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-2xl transition-colors">
              {t.landing.pricingBtn}
            </Link>
            <p className="text-sm text-text-muted mt-4">{t.landing.pricingNote}</p>
          </div>
        </div>
      </section>

      {/* ── 9. CTA BANNER ── */}
      <section className="py-32 sm:py-40 px-6 sm:px-8 bg-dark-bg text-dark-text">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs tracking-[0.2em] uppercase text-primary-light font-medium mb-6">{t.landing.ctaLabel}</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6 whitespace-pre-line">{t.landing.ctaTitle}</h2>
          <p className="text-dark-text/70 text-lg mb-10 leading-relaxed">{t.landing.ctaDesc}</p>
          <Link href="/create" className="inline-block px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold text-base rounded-2xl transition-colors mb-8">
            {t.landing.ctaBtn}
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dark-text/60">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              {t.landing.ctaStat1}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              {t.landing.ctaStat2}
            </span>
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ── */}
      <section id="reviews" className="py-28 sm:py-36 px-6 sm:px-8 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-16 reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">{t.landing.testimonialsLabel}</p>
            <h2 className="text-4xl sm:text-5xl font-black text-text tracking-tight">{t.landing.testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: t.landing.review1name, text: t.landing.review1text, role: t.landing.review1role, initial: 'J' },
              { name: t.landing.review2name, text: t.landing.review2text, role: t.landing.review2role, initial: 'S' },
              { name: t.landing.review3name, text: t.landing.review3text, role: t.landing.review3role, initial: 'H' },
              { name: t.landing.review4name, text: t.landing.review4text, role: t.landing.review4role, initial: 'S' },
            ].map((r, i) => (
              <div key={i} className={`bg-bg-card border border-border/50 rounded-2xl p-8 hover:border-border-hover hover:shadow-md transition-all reveal reveal-delay-${i + 1}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-text text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">{r.initial}</div>
                  <div>
                    <p className="text-sm font-bold text-text">{r.name}</p>
                    <p className="text-xs text-text-muted">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-muted mt-8">{t.landing.testimonialsStat}</p>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer className="py-16 sm:py-20 px-6 sm:px-8 border-t border-border bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-14">
            <div>
              <span className="text-xl font-black text-text font-serif block mb-4">{t.common.brand}</span>
              <p className="text-sm text-text-muted leading-relaxed">{t.landing.footerDesc}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-4">{t.landing.footerLinks}</h4>
              <div className="flex flex-col gap-3">
                <a href="#features" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navFeatures}</a>
                <a href="#styles" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navStyles}</a>
                <a href="#pricing" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navPricing}</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-4">{t.landing.footerSupport}</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@onceuponus.kr" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerContact}</a>
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerFaq}</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-4">{t.landing.ctaLabel}</h4>
              <Link href="/create" className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors mb-5">
                {t.common.createVideo}
              </Link>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerTerms}</a>
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerPrivacy}</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">{t.landing.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
