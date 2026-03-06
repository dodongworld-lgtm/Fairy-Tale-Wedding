'use client'
import Link from 'next/link'
import { useState } from 'react'
import { LangSwitcher } from './components/LangSwitcher'
import { useLang } from './contexts/LangContext'
import { FloatingHeart, FloatingRing, FloatingStar } from './components/decorative'

export default function LandingPage() {
  const { t } = useLang()
  const [email, setEmail] = useState('')

  const SAMPLE_VIDEOS = [
    { id: 1, title: '지훈 & 수연', desc: '홍대 카페에서 시작된 운명적인 만남', mood: t.landing.propose, bg: 'bg-dark-bg/80', duration: '1:02', moodColor: 'bg-primary' },
    { id: 2, title: '민준 & 서연', desc: '친구로 시작한 7년, 북한산 정상에서의 프로포즈', mood: t.landing.propose, bg: 'bg-dark-bg/70', duration: '0:58', moodColor: 'bg-primary' },
    { id: 3, title: '준혁 & 지은', desc: '파리 에펠탑 아래의 프로포즈', mood: t.landing.wedding, bg: 'bg-dark-bg/80', duration: '1:05', moodColor: 'bg-text-secondary' },
    { id: 4, title: '태양 & 하나', desc: '한강 퇴근길의 깜짝 이벤트', mood: t.landing.propose, bg: 'bg-dark-bg/70', duration: '1:00', moodColor: 'bg-primary' },
  ]

  const PROCESS_STEPS = [
    {
      n: '01', title: t.landing.process1, desc: t.landing.process1desc,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
        </svg>
      ),
    },
    {
      n: '02', title: t.landing.process2, desc: t.landing.process2desc,
      icon: (
        <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
        </svg>
      ),
    },
    {
      n: '03', title: t.landing.process3, desc: t.landing.process3desc,
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
      ),
    },
    {
      n: '04', title: t.landing.process4, desc: t.landing.process4desc,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"/>
        </svg>
      ),
      dark: true,
    },
  ]

  return (
    <main className="min-h-screen bg-bg text-text overflow-x-hidden">

      {/* ── 1. NAVBAR ── */}
      <header className="fixed top-3 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto px-4 bg-bg/90 backdrop-blur-md border border-border rounded-2xl shadow-sm">
          <div className="h-14 flex items-center justify-between">
            <span className="text-lg font-black tracking-tight text-text font-serif">{t.common.brand}</span>
            <nav className="hidden lg:flex items-center gap-6 text-sm text-text-secondary">
              <a href="#features" className="hover:text-text transition-colors">{t.landing.navFeatures}</a>
              <a href="#styles" className="hover:text-text transition-colors">{t.landing.navStyles}</a>
              <a href="#samples" className="hover:text-text transition-colors">{t.landing.navSample}</a>
              <a href="#reviews" className="hover:text-text transition-colors">{t.landing.navReviews}</a>
              <a href="#pricing" className="hover:text-text transition-colors">{t.landing.navPricing}</a>
              <Link href="/blog" className="hover:text-text transition-colors">{t.common.blog}</Link>
            </nav>
            <div className="flex items-center gap-2">
              <LangSwitcher />
              <Link href="/login" className="hidden sm:block text-sm text-text-secondary hover:text-text px-2">{t.common.login}</Link>
              <Link href="/create" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors">
                {t.common.createVideo}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. HERO — 2-column ── */}
      <section className="pt-28 md:pt-36 pb-12 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-light/30 border border-primary-light/50 rounded-lg px-3 py-1 text-xs font-bold text-primary-dark mb-6 tracking-wide uppercase">
              {t.landing.heroLabel}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-text mb-5">
              {t.landing.heroTitle1}<br />
              <span className="text-primary">{t.landing.heroTitle2}</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
              {t.landing.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/create" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-2xl transition-colors text-center">
                {t.landing.heroBtn}
              </Link>
              <a href="#samples" className="px-8 py-4 bg-bg text-text font-semibold text-base rounded-2xl border border-border hover:border-border-hover transition-colors text-center">
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

          <div className="relative">
            <div className="w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-dark-bg to-dark-bg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
                <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-1">{t.landing.videoAct}</p>
                <p className="text-white text-lg sm:text-2xl font-black leading-tight text-center">
                  &ldquo;{t.landing.videoNarr1}<br />
                  <span className="text-primary-light">{t.landing.videoNarr2}&rdquo;</span>
                </p>
              </div>
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
            <FloatingHeart className="absolute -top-6 -right-6 w-20 h-20 text-accent animate-[float_4s_ease-in-out_infinite] hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section className="py-10 px-5 sm:px-6 bg-bg-subtle border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: t.landing.stat1, label: t.landing.stat1label },
            { value: t.landing.stat2, label: t.landing.stat2label },
            { value: t.landing.stat3, label: t.landing.stat3label },
            { value: t.landing.stat4, label: t.landing.stat4label },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl font-black text-primary">{s.value}</span>
              <span className="text-sm text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURES ── */}
      <section id="features" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
        <FloatingRing className="absolute top-10 right-10 w-32 h-32 text-primary hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.navFeatures}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-text tracking-tight">{t.landing.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat1n1} {t.landing.feat1n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">{t.landing.feat1desc}</p>
              <Link href="/create" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                {t.landing.feat1btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat2n1} {t.landing.feat2n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat2desc}</p>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat3label}</h3>
              <span className="text-4xl font-black text-primary leading-none block mb-2">{t.landing.feat3time}</span>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat3desc}</p>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-bg-subtle rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat4n1} {t.landing.feat4n2}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat4desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold bg-primary-light/30 text-primary px-2.5 py-1 rounded-full">BGM</span>
                <span className="text-xs font-semibold bg-accent-light text-accent px-2.5 py-1 rounded-full">Narration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED VIDEOS ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.featuredLabel}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.featuredTitle}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group">
              <div className="aspect-video bg-dark-bg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 to-dark-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{t.landing.propose}</span>
                <span className="absolute bottom-3 right-3 bg-dark-bg/50 text-white text-xs px-2 py-0.5 rounded font-medium">1:02</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">J</div>
                  <div>
                    <p className="font-bold text-text text-sm">지훈 & 수연</p>
                    <p className="text-text-muted text-xs">2024.12</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">홍대 카페에서 시작된 운명적인 만남. 5년의 연애 끝에 한강에서의 감동 프로포즈.</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-medium bg-primary-light/30 text-primary px-2 py-0.5 rounded-full">{t.landing.styleFairytale}</span>
                  <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2 py-0.5 rounded-full">한국어</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group">
              <div className="aspect-video bg-dark-bg/80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-text-secondary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{t.landing.wedding}</span>
                <span className="absolute bottom-3 right-3 bg-dark-bg/50 text-white text-xs px-2 py-0.5 rounded font-medium">1:05</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-xs font-bold text-accent">M</div>
                  <div>
                    <p className="font-bold text-text text-sm">민준 & 서연</p>
                    <p className="text-text-muted text-xs">2025.01</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">친구로 시작한 7년, 북한산 정상에서의 감동적인 프로포즈. 결혼식 하객 200명이 함께 감상.</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-medium bg-accent-light text-accent px-2 py-0.5 rounded-full">{t.landing.styleWatercolor}</span>
                  <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2 py-0.5 rounded-full">한국어</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ANIMATION STYLES ── */}
      <section id="styles" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
        <FloatingStar className="absolute bottom-10 left-10 w-24 h-24 text-primary hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.stylesLabel}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.stylesTitle}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: t.landing.styleFairytale, emoji: '🏰' },
              { label: t.landing.styleWatercolor, emoji: '🎨' },
              { label: t.landing.styleGhibli, emoji: '🌿' },
              { label: t.landing.styleDisney, emoji: '✨' },
              { label: t.landing.stylePopart, emoji: '💥' },
              { label: t.landing.styleMinimal, emoji: '◻️' },
              { label: t.landing.styleClassic, emoji: '🎞️' },
              { label: t.landing.styleComic, emoji: '💬' },
            ].map((s, i) => (
              <Link key={i} href="/create" className="flex flex-col items-center gap-2 p-4 bg-bg-card border border-border rounded-2xl hover:border-border-hover hover:shadow-md transition-all group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <span className="text-sm font-semibold text-text">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. POPULAR VIDEOS ── */}
      <section id="samples" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.samplesLabel}</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.samplesTitle}</h2>
            </div>
            <Link href="/create" className="hidden md:block text-sm font-bold text-primary hover:text-primary-dark transition-colors">
              {t.landing.samplesBtn}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SAMPLE_VIDEOS.map(v => (
              <div key={v.id} className="group cursor-pointer bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-md transition-all">
                <div className={`w-full aspect-video ${v.bg} flex items-center justify-center relative`}>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-white/30">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-dark-bg/50 text-white text-xs px-1.5 py-0.5 rounded font-medium">{v.duration}</span>
                  <span className={`absolute top-2 left-2 ${v.moodColor} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>{v.mood}</span>
                </div>
                <div className="p-3">
                  <p className="font-bold text-text text-sm">{v.title}</p>
                  <p className="text-text-secondary text-xs mt-0.5 hidden sm:block">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center lg:hidden">
            <Link href="/create" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.samplesBtn}</Link>
          </div>
        </div>
      </section>

      {/* ── 8. HOW IT WORKS ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.processLabel}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.processTitle}</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-gradient-to-r from-primary-light/50 via-primary-light to-border-hover z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 relative">
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.n} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 pb-8 md:pb-0">
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="md:hidden absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary-light/50 to-border z-0" />
                  )}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${s.dark ? 'bg-dark-bg' : i % 2 === 0 ? 'bg-primary-light/30 border border-primary-light/30' : 'bg-bg-subtle border border-border'}`}>
                    {s.icon}
                  </div>
                  <div className="md:mt-4 md:text-center">
                    <span className={`block text-xs font-black tracking-widest mb-1 ${s.dark ? 'text-text-muted' : 'text-primary-light'}`}>{s.n}</span>
                    <h3 className="font-bold text-text text-sm sm:text-base mb-1">{s.title}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. PRICING ── */}
      <section id="pricing" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.pricingLabel}</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-text mb-3">{t.landing.pricingTitle}</h2>
          <p className="text-text-secondary mb-4">{t.landing.pricingSubtitle}</p>

          <div className="inline-flex items-center gap-2 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full mb-8 sm:mb-10">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.landing.eventBanner}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="rounded-2xl border-2 border-border bg-bg p-6 sm:p-7 relative">
              <span className="absolute -top-3 right-6 bg-accent text-white text-xs font-black px-3 py-1 rounded-full">{t.landing.eventLabel}</span>
              <h3 className="font-black text-xl mb-0.5 text-text">Standard</h3>
              <p className="text-xs mb-4 text-text-muted">{t.checkout.standardDesc}</p>
              <div className="mb-5 flex items-baseline gap-2">
                <span className="text-base line-through text-text-muted">$99</span>
                <span className="text-4xl font-black text-text">$49</span>
              </div>
              <ul className="space-y-2">
                {['FHD (1080p)', '3x Download', 'Share link', '30-day storage'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-primary bg-primary p-6 sm:p-7 relative shadow-lg shadow-primary/20">
              <span className="absolute -top-3 left-6 bg-bg text-primary text-xs font-black px-3 py-1 rounded-full border border-primary-light/30">{t.landing.recommended}</span>
              <h3 className="font-black text-xl mb-0.5 text-white">Pro</h3>
              <p className="text-xs mb-4 text-primary-light/70">{t.checkout.proDesc}</p>
              <div className="mb-5">
                <span className="text-4xl font-black text-white">$199</span>
              </div>
              <ul className="space-y-2">
                {['4K', 'Unlimited Downloads', 'Share link', 'Permanent storage', '5x Regen'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-primary-light/50">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-border bg-bg p-6 sm:p-7 relative">
              <h3 className="font-black text-xl mb-0.5 text-text">Ultra</h3>
              <p className="text-xs mb-4 text-text-muted">{t.checkout.ultraDesc}</p>
              <div className="mb-5">
                <span className="text-4xl font-black text-text">$299</span>
              </div>
              <ul className="space-y-2">
                {['4K', 'Unlimited Downloads', 'Permanent storage', 'Unlimited Regen', 'USB', 'Editor'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-dark-bg rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold">{t.landing.b2bTitle}</span>
                <span className="text-xs font-bold bg-white/10 text-text-muted px-2 py-0.5 rounded-full">{t.landing.b2bBadge}</span>
              </div>
              <p className="text-text-muted text-sm">{t.landing.b2bDesc}</p>
            </div>
            <a href="mailto:hello@onceuponus.kr" className="flex-shrink-0 px-5 py-2.5 bg-bg text-text text-sm font-bold rounded-xl hover:bg-bg-subtle transition-colors">
              {t.landing.b2bBtn}
            </a>
          </div>

          <div className="text-center">
            <Link href="/create" className="inline-block px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-2xl transition-colors">
              {t.landing.pricingBtn}
            </Link>
            <p className="text-sm text-text-muted mt-3">{t.landing.pricingNote}</p>
          </div>
        </div>
      </section>

      {/* ── 10. CTA BANNER ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-dark-bg text-dark-text relative overflow-hidden">
        <FloatingHeart className="absolute top-10 left-10 w-40 h-40 text-primary-light/20 hidden lg:block" />
        <FloatingRing className="absolute bottom-10 right-10 w-32 h-32 text-accent/20 hidden lg:block" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <p className="text-xs font-bold text-primary-light uppercase tracking-widest mb-3">{t.landing.ctaLabel}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black leading-tight mb-4 whitespace-pre-line">{t.landing.ctaTitle}</h2>
            <p className="text-dark-text/70 mb-6">{t.landing.ctaDesc}</p>
            <Link href="/create" className="inline-block px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold text-base rounded-2xl transition-colors mb-4">
              {t.landing.ctaBtn}
            </Link>
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-dark-text/60">
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
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-primary/15 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-5xl">💍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. TESTIMONIALS ── */}
      <section id="reviews" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
        <FloatingStar className="absolute top-16 right-16 w-28 h-28 text-primary hidden lg:block" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.testimonialsLabel}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: t.landing.review1name, text: t.landing.review1text, role: t.landing.review1role, initial: 'J' },
              { name: t.landing.review2name, text: t.landing.review2text, role: t.landing.review2role, initial: 'S' },
              { name: t.landing.review3name, text: t.landing.review3text, role: t.landing.review3role, initial: 'H' },
              { name: t.landing.review4name, text: t.landing.review4text, role: t.landing.review4role, initial: 'S' },
            ].map((r, i) => (
              <div key={i} className="bg-bg-card border border-border rounded-2xl p-5 hover:border-border-hover hover:shadow-md transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-text text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">{r.initial}</div>
                  <div>
                    <p className="text-sm font-bold text-text">{r.name}</p>
                    <p className="text-xs text-text-muted">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-muted mt-6">{t.landing.testimonialsStat}</p>
        </div>
      </section>

      {/* ── 12. PARTNERS ── */}
      <section className="py-12 px-5 sm:px-6 bg-bg-subtle border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.partnersLabel}</p>
            <h2 className="font-serif text-2xl font-black text-text">{t.landing.partnersTitle}</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {['The Shilla', 'JW Marriott', 'Lotte Hotel', 'Four Seasons', 'Kuho Studio', 'Bonheur Wedding'].map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
                <div className="w-8 h-8 rounded-lg bg-border/50 flex items-center justify-center text-xs font-bold">{name[0]}</div>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. BLOG ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.blogLabel}</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.blogTitle}</h2>
            </div>
            <Link href="/blog" className="hidden md:block text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.blogMore}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: t.landing.blog1title, desc: t.landing.blog1desc, date: t.landing.blog1date, emoji: '📖' },
              { title: t.landing.blog2title, desc: t.landing.blog2desc, date: t.landing.blog2date, emoji: '🎬' },
              { title: t.landing.blog3title, desc: t.landing.blog3desc, date: t.landing.blog3date, emoji: '📸' },
            ].map((post, i) => (
              <Link key={i} href="/blog" className="group bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-md transition-all">
                <div className="aspect-[16/9] bg-bg-subtle relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">{post.emoji}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-text-muted mb-2">{post.date}</p>
                  <h3 className="font-bold text-text text-sm mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-text-secondary text-xs">{post.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.blogMore}</Link>
          </div>
        </div>
      </section>

      {/* ── 14. NEWSLETTER ── */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-bg-subtle">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-text mb-2">{t.landing.newsletterTitle}</h2>
          <p className="text-text-secondary text-sm mb-6">{t.landing.newsletterDesc}</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.landing.newsletterPlaceholder}
              className="flex-1 px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-all"
            />
            <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap">
              {t.landing.newsletterBtn}
            </button>
          </div>
        </div>
      </section>

      {/* ── 15. FOOTER ── */}
      <footer className="py-12 sm:py-16 px-5 sm:px-6 border-t border-border bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <span className="text-xl font-black text-text font-serif block mb-3">{t.common.brand}</span>
              <p className="text-sm text-text-muted leading-relaxed">{t.landing.footerDesc}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-3">{t.landing.footerLinks}</h4>
              <div className="flex flex-col gap-2">
                <a href="#features" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navFeatures}</a>
                <a href="#styles" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navStyles}</a>
                <a href="#samples" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navSample}</a>
                <a href="#pricing" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navPricing}</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-3">{t.landing.footerSupport}</h4>
              <div className="flex flex-col gap-2">
                <Link href="/blog" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerBlog}</Link>
                <a href="mailto:hello@onceuponus.kr" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerContact}</a>
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerFaq}</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text mb-3">{t.landing.ctaLabel}</h4>
              <Link href="/create" className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors mb-4">
                {t.common.createVideo}
              </Link>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerTerms}</a>
                <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerPrivacy}</a>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">{t.landing.footerCopyright}</p>
            <div className="flex items-center gap-4">
              <LangSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
