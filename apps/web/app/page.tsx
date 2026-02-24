'use client'
import Link from 'next/link'
import { LangSwitcher } from './components/LangSwitcher'
import { useLang } from './contexts/LangContext'

export default function LandingPage() {
  const { t } = useLang()

  const SAMPLE_VIDEOS = [
    { id: 1, title: '지훈 & 수연', desc: '홍대 카페에서 시작된 운명적인 만남', mood: t.landing.propose, bg: 'bg-gray-800', duration: '1:02', moodColor: 'bg-indigo-500' },
    { id: 2, title: '민준 & 서연', desc: '친구로 시작한 7년, 북한산 정상에서의 프로포즈', mood: t.landing.propose, bg: 'bg-slate-700', duration: '0:58', moodColor: 'bg-indigo-500' },
    { id: 3, title: '준혁 & 지은', desc: '파리 에펠탑 아래의 프로포즈', mood: t.landing.wedding, bg: 'bg-gray-700', duration: '1:05', moodColor: 'bg-gray-500' },
    { id: 4, title: '태양 & 하나', desc: '한강 퇴근길의 깜짝 이벤트', mood: t.landing.propose, bg: 'bg-slate-800', duration: '1:00', moodColor: 'bg-indigo-500' },
    { id: 5, title: '성현 & 유진', desc: '온라인에서 만나 3년, 첫 만남 장소에서 프로포즈', mood: t.landing.wedding, bg: 'bg-gray-600', duration: '1:03', moodColor: 'bg-gray-500' },
    { id: 6, title: '현우 & 다은', desc: '20년 만에 다시 만나 사랑이 된 이야기', mood: t.landing.wedding, bg: 'bg-stone-700', duration: '1:07', moodColor: 'bg-gray-500' },
  ]

  const PROCESS_STEPS = [
    {
      n: '01', title: t.landing.process1, desc: t.landing.process1desc,
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
        </svg>
      ),
    },
    {
      n: '02', title: t.landing.process2, desc: t.landing.process2desc,
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
        </svg>
      ),
    },
    {
      n: '03', title: t.landing.process3, desc: t.landing.process3desc,
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
    <main className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ── */}
      <header className="fixed top-3 left-4 right-4 z-50">
        <div className="max-w-6xl mx-auto px-4 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-sm">
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-6 sm:gap-8">
              <span className="text-base font-black tracking-tight text-gray-900">{t.common.brand}</span>
              <nav className="hidden md:flex items-center gap-5 text-sm text-gray-500">
                <a href="#features" className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">{t.landing.navFeatures}</a>
                <a href="#samples" className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">{t.landing.navSample}</a>
                <Link href="/blog" className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">{t.common.blog}</Link>
                <a href="#pricing" className="hover:text-gray-900 transition-colors duration-200 cursor-pointer">{t.landing.navPricing}</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <LangSwitcher />
              <Link href="/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 px-2 cursor-pointer">{t.common.login}</Link>
              <Link href="/create" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap cursor-pointer">
                <span className="hidden sm:inline">{t.common.createVideo}</span>
                <span className="sm:hidden">{t.landing.heroBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-28 md:pt-36 pb-10 px-5 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1 text-xs font-bold text-indigo-700 mb-6 md:mb-8 tracking-wide uppercase">
          {t.landing.heroLabel}
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight text-gray-900 mb-5 md:mb-6">
          {t.landing.heroTitle1}<br />
          <span className="text-indigo-600">
            {t.landing.heroTitle2}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          {t.landing.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
          <Link href="/create" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-colors duration-200 cursor-pointer">
            {t.landing.heroBtn}
          </Link>
          <a href="#samples" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold text-base rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer">
            {t.landing.heroSample}
          </a>
        </div>

        {/* Floating stats badges */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span className="text-sm font-bold text-gray-900">500+ 커플</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="text-sm font-bold text-gray-900">4.9 / 5.0</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-sm font-bold text-gray-900">평균 3분</span>
          </div>
        </div>
      </section>

      {/* ── HERO VIDEO PREVIEW ── */}
      <section className="px-5 sm:px-6 pb-12 max-w-4xl mx-auto">
        <div className="w-full aspect-video rounded-3xl bg-gray-900 overflow-hidden relative shadow-2xl shadow-indigo-900/20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
            <div className="text-center">
              <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">{t.landing.videoAct}</p>
              <p className="text-white text-xl sm:text-3xl font-black leading-tight mb-2">
                &ldquo;{t.landing.videoNarr1}<br />
                <span className="text-indigo-300">{t.landing.videoNarr2}&rdquo;</span>
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-white/70 text-xs">0:18 / 1:02</span>
              <span className="ml-auto text-white/50 text-xs">지훈 & 수연</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div className="h-1 bg-indigo-400 rounded-full w-[28%]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 sm:py-20 px-5 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">기능</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Once Upon Us가 특별한 이유</h2>
          </div>

          {/* Row 1: 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">01</span>
              <h3 className="text-lg font-black text-gray-900 mt-1 mb-2">{t.landing.feat1n1}<br/>{t.landing.feat1n2}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.landing.feat1desc}</p>
              <Link href="/create" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 mt-4 hover:gap-3 transition-all duration-200 cursor-pointer">
                {t.landing.feat1btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">02</span>
              <h3 className="text-lg font-black text-gray-900 mt-1 mb-2">{t.landing.feat2n1}<br/>{t.landing.feat2n2}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.landing.feat2desc}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">03</span>
              <h3 className="text-lg font-black text-gray-900 mt-1 mb-2">{t.landing.feat3label}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-indigo-600 leading-none">{t.landing.feat3time}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{t.landing.feat3desc}</p>
            </div>
          </div>

          {/* Row 2: 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">04</span>
              <h3 className="text-lg font-black text-gray-900 mt-1 mb-2">{t.landing.feat4n1}<br/>{t.landing.feat4n2}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.landing.feat4desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">오케스트라 BGM</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">05</span>
              <h3 className="text-lg font-black text-gray-900 mt-1 mb-2">{t.landing.feat5n1}<br/>{t.landing.feat5n2}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.landing.feat5desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['나레이션 편집', '이미지 재생성', '장면 조정'].map(tag => (
                  <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAMPLE VIDEOS ── */}
      <section id="samples" className="py-16 sm:py-20 px-5 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.landing.samplesLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t.landing.samplesTitle}</h2>
            </div>
            <Link href="/create" className="hidden md:block text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer">
              {t.landing.samplesBtn}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {SAMPLE_VIDEOS.map(v => (
              <div key={v.id} className="group cursor-pointer">
                <div className={`w-full aspect-video rounded-xl sm:rounded-2xl ${v.bg} flex items-center justify-center mb-2 sm:mb-3 relative overflow-hidden`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 group-hover:bg-white/30 relative z-10">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded font-medium">{v.duration}</span>
                  <span className={`absolute top-2 left-2 ${v.moodColor} text-white text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-semibold`}>{v.mood}</span>
                </div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">{v.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/create" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer">
              {t.landing.samplesBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.landing.processLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-10 sm:mb-14">{t.landing.processTitle}</h2>

          {/* Horizontal timeline on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connecting line — desktop */}
            <div className="hidden md:block absolute top-8 left-[calc(12.5%+0px)] right-[calc(12.5%+0px)] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-300 to-gray-300 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 relative">
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.n} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 pb-8 md:pb-0">
                  {/* Vertical line — mobile */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="md:hidden absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 to-gray-200 z-0" />
                  )}

                  {/* Step circle */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${s.dark ? 'bg-gray-900' : i % 2 === 0 ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50 border border-gray-200'}`}>
                    {s.icon}
                  </div>

                  <div className="md:mt-4 md:text-center">
                    <span className={`block text-xs font-black tracking-widest mb-1 ${s.dark ? 'text-gray-400' : 'text-indigo-400'}`}>{s.n}</span>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{s.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-16 sm:py-20 px-5 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.landing.pricingLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">{t.landing.pricingTitle}</h2>
          <p className="text-gray-500 mb-4">{t.landing.pricingSubtitle}</p>

          <div className="inline-flex items-center gap-2 bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-8 sm:mb-10">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.landing.eventBanner}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Standard */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 sm:p-7 relative">
              <span className="absolute -top-3 right-6 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full">{t.landing.eventLabel}</span>
              <h3 className="font-black text-xl mb-0.5 text-gray-900">Standard</h3>
              <p className="text-xs mb-4 text-gray-400">{t.checkout.standardDesc}</p>
              <div className="mb-5 flex items-baseline gap-2">
                <span className="text-base line-through text-gray-300">$99</span>
                <span className="text-4xl font-black text-gray-900">$49</span>
              </div>
              <ul className="space-y-2">
                {['FHD (1080p)', '3x Download', 'Share link', '30-day storage'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-indigo-600 bg-indigo-600 p-6 sm:p-7 relative shadow-lg shadow-indigo-500/20">
              <span className="absolute -top-3 left-6 bg-white text-indigo-600 text-xs font-black px-3 py-1 rounded-full border border-indigo-100">{t.landing.recommended}</span>
              <h3 className="font-black text-xl mb-0.5 text-white relative">Pro</h3>
              <p className="text-xs mb-4 text-indigo-200 relative">{t.checkout.proDesc}</p>
              <div className="mb-5 relative">
                <span className="text-4xl font-black text-white">$199</span>
              </div>
              <ul className="space-y-2 relative">
                {['4K', 'Unlimited Downloads', 'Share link', 'Permanent storage', '5x Regen'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-indigo-100">
                    <svg className="w-4 h-4 flex-shrink-0 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ultra */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 sm:p-7 relative">
              <h3 className="font-black text-xl mb-0.5 text-gray-900">Ultra</h3>
              <p className="text-xs mb-4 text-gray-400">{t.checkout.ultraDesc}</p>
              <div className="mb-5">
                <span className="text-4xl font-black text-gray-900">$299</span>
              </div>
              <ul className="space-y-2">
                {['4K', 'Unlimited Downloads', 'Permanent storage', 'Unlimited Regen', 'USB', 'Editor'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* B2B */}
          <div className="bg-gray-900 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold">{t.landing.b2bTitle}</span>
                <span className="text-xs font-bold bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{t.landing.b2bBadge}</span>
              </div>
              <p className="text-gray-400 text-sm">{t.landing.b2bDesc}</p>
            </div>
            <a href="mailto:hello@onceuponus.kr" className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              {t.landing.b2bBtn}
            </a>
          </div>

          <div className="text-center">
            <Link href="/create" className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-colors duration-200 cursor-pointer">
              {t.landing.pricingBtn}
            </Link>
            <p className="text-sm text-gray-400 mt-3">{t.landing.pricingNote}</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-5 sm:px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-8">
            <span className="text-xl font-black text-gray-900">{t.common.brand}</span>
            <p className="text-sm text-gray-400 max-w-xs">프로포즈와 결혼식, 두 사람의 이야기를 세상에 하나뿐인 애니메이션으로</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/blog" className="hover:text-gray-600 transition-colors duration-200 cursor-pointer">{t.landing.footerBlog}</Link>
              <a href="mailto:hello@onceuponus.kr" className="hover:text-gray-600 transition-colors duration-200 cursor-pointer">{t.landing.footerContact}</a>
              <a href="#pricing" className="hover:text-gray-600 transition-colors duration-200 cursor-pointer">{t.landing.navPricing}</a>
            </div>
            <p className="text-sm text-gray-400">© 2024 Once Upon Us. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
