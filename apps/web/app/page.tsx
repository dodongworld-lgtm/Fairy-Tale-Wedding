'use client'
import Link from 'next/link'
import { LangSwitcher } from './components/LangSwitcher'
import { useLang } from './contexts/LangContext'

/* ---------- 2D SVG Illustrations ---------- */

function IllustrationFilm() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <rect x="10" y="25" width="100" height="70" rx="8" fill="white" fillOpacity=".15"/>
      <rect x="10" y="25" width="100" height="70" rx="8" stroke="white" strokeOpacity=".4" strokeWidth="2"/>
      <rect x="20" y="35" width="20" height="14" rx="3" fill="white" fillOpacity=".5"/>
      <rect x="50" y="35" width="20" height="14" rx="3" fill="white" fillOpacity=".5"/>
      <rect x="80" y="35" width="20" height="14" rx="3" fill="white" fillOpacity=".5"/>
      <rect x="20" y="57" width="80" height="28" rx="5" fill="white" fillOpacity=".2"/>
      <polygon points="55,66 55,76 65,71" fill="white" fillOpacity=".8"/>
      <circle cx="95" cy="15" r="10" fill="white" fillOpacity=".2"/>
      <circle cx="95" cy="15" r="6" fill="white" fillOpacity=".4"/>
    </svg>
  )
}

function IllustrationNote() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <rect x="25" y="20" width="70" height="85" rx="8" fill="white" fillOpacity=".15"/>
      <rect x="25" y="20" width="70" height="85" rx="8" stroke="white" strokeOpacity=".35" strokeWidth="2"/>
      <rect x="37" y="38" width="46" height="5" rx="2.5" fill="white" fillOpacity=".5"/>
      <rect x="37" y="52" width="36" height="5" rx="2.5" fill="white" fillOpacity=".4"/>
      <rect x="37" y="66" width="42" height="5" rx="2.5" fill="white" fillOpacity=".3"/>
      <rect x="37" y="80" width="28" height="5" rx="2.5" fill="white" fillOpacity=".25"/>
      <circle cx="85" cy="25" r="12" fill="white" fillOpacity=".2"/>
      <path d="M81 25 L84 28 L90 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".7"/>
    </svg>
  )
}

export default function LandingPage() {
  const { t } = useLang()

  const SAMPLE_VIDEOS = [
    { id: 1, title: '지훈 & 수연', desc: '홍대 카페에서 시작된 운명적인 만남', mood: t.landing.propose, bg: 'from-violet-600 to-indigo-700', duration: '1:02' },
    { id: 2, title: '민준 & 서연', desc: '친구로 시작한 7년, 북한산 정상에서의 프로포즈', mood: t.landing.propose, bg: 'from-indigo-500 to-blue-700', duration: '0:58' },
    { id: 3, title: '준혁 & 지은', desc: '파리 에펠탑 아래의 프로포즈', mood: t.landing.wedding, bg: 'from-slate-600 to-gray-800', duration: '1:05' },
    { id: 4, title: '태양 & 하나', desc: '한강 퇴근길의 깜짝 이벤트', mood: t.landing.propose, bg: 'from-indigo-600 to-violet-800', duration: '1:00' },
    { id: 5, title: '성현 & 유진', desc: '온라인에서 만나 3년, 첫 만남 장소에서 프로포즈', mood: t.landing.wedding, bg: 'from-gray-700 to-gray-900', duration: '1:03' },
    { id: 6, title: '현우 & 다은', desc: '20년 만에 다시 만나 사랑이 된 이야기', mood: t.landing.wedding, bg: 'from-indigo-700 to-slate-800', duration: '1:07' },
  ]

  const PROCESS_STEPS = [
    { n: '1', color: 'bg-indigo-50 border-indigo-100', num: 'text-indigo-600', title: t.landing.process1, desc: t.landing.process1desc },
    { n: '2', color: 'bg-gray-50 border-gray-200', num: 'text-gray-600', title: t.landing.process2, desc: t.landing.process2desc },
    { n: '3', color: 'bg-indigo-50 border-indigo-100', num: 'text-indigo-600', title: t.landing.process3, desc: t.landing.process3desc },
    { n: '4', color: 'bg-gray-900 border-gray-900', num: 'text-white', title: t.landing.process4, desc: t.landing.process4desc },
  ]

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-gray-900">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F4F0]/90 backdrop-blur-sm border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5 sm:gap-8">
            <span className="text-base font-bold tracking-tight">{t.common.brand}</span>
            <nav className="hidden md:flex items-center gap-5 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-900 transition-colors">{t.landing.navFeatures}</a>
              <a href="#samples" className="hover:text-gray-900 transition-colors">{t.landing.navSample}</a>
              <Link href="/blog" className="hover:text-gray-900 transition-colors">{t.common.blog}</Link>
              <a href="#pricing" className="hover:text-gray-900 transition-colors">{t.landing.navPricing}</a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Link href="/login" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors px-2">{t.common.login}</Link>
            <Link href="/create" className="px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors whitespace-nowrap">
              <span className="hidden sm:inline">{t.common.createVideo}</span>
              <span className="sm:hidden">{t.landing.heroBtn}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-24 md:pt-32 pb-8 px-5 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-6 md:mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          {t.landing.heroLabel}
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-none tracking-tighter text-gray-900 mb-5 md:mb-6">
          {t.landing.heroTitle1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
            {t.landing.heroTitle2}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          {t.landing.heroDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/create" className="px-8 py-4 bg-gray-900 text-white font-bold text-base rounded-2xl hover:bg-gray-700 transition-colors">
            {t.landing.heroBtn}
          </Link>
          <a href="#samples" className="px-8 py-4 bg-white text-gray-700 font-semibold text-base rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
            {t.landing.heroSample}
          </a>
        </div>
      </section>

      {/* ── HERO VIDEO PREVIEW ── */}
      <section className="px-5 sm:px-6 pb-10 max-w-4xl mx-auto">
        <div className="w-full aspect-video rounded-3xl bg-gray-900 overflow-hidden relative shadow-2xl shadow-gray-900/20">
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
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-white/70 text-xs">0:18 / 1:02</span>
              <span className="ml-auto text-white/50 text-xs">지훈 & 수연</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full">
              <div className="h-1 bg-indigo-400 rounded-full w-[28%]" />
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section id="features" className="px-5 sm:px-6 pb-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-3 sm:gap-4">

          {/* 1 — AI Disney 변환 */}
          <div className="col-span-12 md:col-span-7 rounded-3xl bg-indigo-600 p-6 md:p-8 min-h-52 md:min-h-64 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 w-48 h-48 opacity-30">
              <IllustrationFilm />
            </div>
            <div>
              <span className="inline-block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-3">01</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                {t.landing.feat1n1}<br />
                {t.landing.feat1n2}
              </h2>
              <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
                {t.landing.feat1desc}
              </p>
            </div>
            <Link href="/create" className="inline-flex items-center gap-1 text-sm font-bold text-white mt-6 hover:gap-2 transition-all">
              {t.landing.feat1btn}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* 2 — 감성 스토리 */}
          <div className="col-span-12 md:col-span-5 rounded-3xl bg-gray-900 p-6 md:p-8 min-h-48 md:min-h-64 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute right-4 bottom-4 w-32 h-32 opacity-20">
              <IllustrationNote />
            </div>
            <div>
              <span className="inline-block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">02</span>
              <h2 className="text-2xl font-black text-white leading-tight mb-3">
                {t.landing.feat2n1}<br />{t.landing.feat2n2}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.landing.feat2desc}
              </p>
            </div>
          </div>

          {/* 3 — 3분 완성 */}
          <div className="col-span-12 md:col-span-4 rounded-3xl bg-white border border-gray-200 p-8 flex flex-col justify-between overflow-hidden relative">
            <div>
              <span className="inline-block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">03</span>
              <p className="text-gray-500 text-sm font-semibold mb-1">{t.landing.feat3label}</p>
              <h2 className="text-5xl font-black text-indigo-600 leading-none">{t.landing.feat3time}</h2>
            </div>
            <p className="text-gray-400 text-sm mt-4">{t.landing.feat3desc}</p>
          </div>

          {/* 4 — 시네마틱 편집 */}
          <div className="col-span-12 md:col-span-4 rounded-3xl bg-indigo-50 border border-indigo-100 p-8 flex flex-col justify-between overflow-hidden">
            <div>
              <span className="inline-block text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">04</span>
              <h2 className="text-2xl font-black text-indigo-900 leading-tight mb-3">
                {t.landing.feat4n1}<br />{t.landing.feat4n2}
              </h2>
              <p className="text-indigo-600 text-sm">{t.landing.feat4desc}</p>
            </div>
          </div>

          {/* 5 — 직접 편집 */}
          <div className="col-span-12 md:col-span-4 rounded-3xl bg-gray-50 border border-gray-200 p-8 flex flex-col justify-between overflow-hidden">
            <div>
              <span className="inline-block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">05</span>
              <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3">
                {t.landing.feat5n1}<br />{t.landing.feat5n2}
              </h2>
              <p className="text-gray-500 text-sm">{t.landing.feat5desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SAMPLE VIDEOS ── */}
      <section id="samples" className="py-16 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.landing.samplesLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t.landing.samplesTitle}</h2>
            </div>
            <Link href="/create" className="hidden md:block text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              {t.landing.samplesBtn}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {SAMPLE_VIDEOS.map(v => (
              <div key={v.id} className="group cursor-pointer">
                <div className={`w-full aspect-video rounded-xl sm:rounded-2xl bg-gradient-to-br ${v.bg} flex items-center justify-center mb-2 sm:mb-3 relative overflow-hidden`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-white/30">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded font-medium">{v.duration}</span>
                  <span className="absolute top-2 left-2 bg-white/20 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium">{v.mood}</span>
                </div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm">{v.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 sm:py-20 px-5 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.landing.processLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-10 sm:mb-14">{t.landing.processTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {PROCESS_STEPS.map(s => (
              <div key={s.n} className={`rounded-2xl border p-5 sm:p-6 ${s.color}`}>
                <span className={`text-3xl sm:text-4xl font-black ${s.num} block mb-3`}>{s.n}</span>
                <h3 className={`font-bold mb-1 text-sm sm:text-base ${s.num === 'text-white' ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${s.num === 'text-white' ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-16 sm:py-20 px-5 sm:px-6 bg-[#F5F4F0]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.landing.pricingLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">{t.landing.pricingTitle}</h2>
          <p className="text-gray-500 mb-3">{t.landing.pricingSubtitle}</p>

          <div className="inline-flex items-center gap-2 bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-8 sm:mb-10">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.landing.eventBanner}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              {
                name: 'Standard', price: '$49', originalPrice: '$99', event: true,
                desc: t.landing.feat5n1, color: 'border-gray-200 bg-white',
                features: ['FHD (1080p)', '3x Download', 'Share link', '30-day storage'],
                descText: t.checkout.standardDesc,
              },
              {
                name: 'Pro', price: '$199', originalPrice: null, highlight: true,
                color: 'border-indigo-500 bg-indigo-600',
                features: ['4K', 'Unlimited Downloads', 'Share link', 'Permanent storage', '5x Regen'],
                descText: t.checkout.proDesc,
              },
              {
                name: 'Ultra', price: '$299', originalPrice: null,
                color: 'border-gray-200 bg-white',
                features: ['4K', 'Unlimited Downloads', 'Permanent storage', 'Unlimited Regen', 'USB', 'Editor'],
                descText: t.checkout.ultraDesc,
              },
            ].map(p => (
              <div key={p.name} className={`rounded-2xl border-2 p-6 sm:p-7 relative ${p.color}`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-6 bg-white text-indigo-600 text-xs font-black px-3 py-1 rounded-full border border-indigo-200">{t.landing.recommended}</span>
                )}
                {p.event && (
                  <span className="absolute -top-3 right-6 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full">{t.landing.eventLabel}</span>
                )}
                <h3 className={`font-black text-xl mb-0.5 ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3>
                <p className={`text-xs mb-4 ${p.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{p.descText}</p>
                <div className="mb-5">
                  {p.originalPrice && (
                    <span className={`text-base line-through mr-2 ${p.highlight ? 'text-indigo-300' : 'text-gray-300'}`}>{p.originalPrice}</span>
                  )}
                  <span className={`text-4xl font-black ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.price}</span>
                </div>
                <ul className="space-y-2">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-indigo-100' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${p.highlight ? 'text-indigo-300' : 'text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold">{t.landing.b2bTitle}</span>
                <span className="text-xs font-bold bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{t.landing.b2bBadge}</span>
              </div>
              <p className="text-gray-400 text-sm">{t.landing.b2bDesc}</p>
            </div>
            <a href="mailto:hello@onceuponus.kr" className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
              {t.landing.b2bBtn}
            </a>
          </div>

          <div className="text-center">
            <Link href="/create" className="inline-block px-10 py-4 bg-gray-900 text-white font-bold text-base rounded-2xl hover:bg-gray-700 transition-colors">
              {t.landing.pricingBtn}
            </Link>
            <p className="text-sm text-gray-400 mt-3">{t.landing.pricingNote}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 sm:px-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-base font-black text-gray-900">{t.common.brand}</span>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/blog" className="hover:text-gray-600 transition-colors">{t.landing.footerBlog}</Link>
            <a href="mailto:hello@onceuponus.kr" className="hover:text-gray-600 transition-colors">{t.landing.footerContact}</a>
          </div>
          <p className="text-sm text-gray-400">© 2024 Once Upon Us.</p>
        </div>
      </footer>
    </main>
  )
}
