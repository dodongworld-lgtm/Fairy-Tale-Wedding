'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LangSwitcher } from '../components/LangSwitcher'
import { useLang } from '../contexts/LangContext'

export default function LoginPage() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 overflow-hidden bg-primary">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)"/>
          </svg>
        </div>

        {/* Top: brand */}
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-black text-white">{t.common.brand}</span>
          </Link>
        </div>

        {/* Middle: headline + bullets */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-black text-white leading-tight mb-3 font-serif">
              두 사람의 이야기를<br />
              <span className="text-primary-light/70">영원히 기억하세요</span>
            </h2>
            <p className="text-primary-light/70 text-base leading-relaxed max-w-sm">
              프로포즈부터 결혼식까지, AI가 만드는 세상에 하나뿐인 애니메이션 영상.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary-light/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI 디즈니 캐릭터 변환</p>
                <p className="text-primary-light text-xs mt-0.5">실제 사진을 동화 캐릭터로</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary-light/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">평균 3분 완성</p>
                <p className="text-primary-light text-xs mt-0.5">입력 후 AI가 알아서 만들어요</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary-light/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">마음에 들 때만 결제</p>
                <p className="text-primary-light text-xs mt-0.5">영상 완성 후 결제하세요</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Bottom: social proof */}
        <div className="relative flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-primary-light', 'bg-primary-light', 'bg-pink-400', 'bg-primary-light'].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white/30`} />
            ))}
          </div>
          <p className="text-primary-light/70 text-sm">
            <span className="font-bold text-white">500+</span> 커플이 이미 만들었어요
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="w-full lg:w-1/2 flex flex-col bg-bg">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" className="text-base font-black text-text cursor-pointer">{t.common.brand}</Link>
          <LangSwitcher />
        </div>

        {/* Desktop top-right lang + back link */}
        <div className="hidden lg:flex items-center justify-end gap-3 px-10 py-6">
          <LangSwitcher />
          <Link href="/" className="text-sm text-text-muted hover:text-text transition-colors duration-200 cursor-pointer flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            홈으로
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-black text-text mb-1">{t.login.title}</h1>
              <p className="text-sm text-text-secondary">{t.login.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text block mb-1.5">{t.login.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm transition-shadow bg-bg"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-text">{t.login.password}</label>
                  <a href="#" className="text-xs text-primary hover:text-primary-dark transition-colors duration-200 cursor-pointer">{t.login.forgotPassword}</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-border text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm transition-shadow bg-bg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm transition-colors duration-200 cursor-pointer mt-2"
              >
                {t.login.loginBtn}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="text-xs text-text-muted bg-bg px-3">{t.common.or}</span>
              </div>
            </div>

            {/* Social login — pill style */}
            <div className="space-y-3">
              <button
                onClick={() => { window.location.href = '/dashboard' }}
                className="w-full py-3 border border-border hover:border-border-hover bg-bg-card rounded-2xl text-sm font-medium text-text hover:bg-bg-subtle transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>{t.login.googleLogin}</span>
              </button>
              <button
                onClick={() => { window.location.href = '/dashboard' }}
                className="w-full py-3 border border-border hover:border-primary-light bg-bg-card hover:bg-primary-light/20 rounded-2xl text-sm font-medium text-text transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className="w-4 h-4 bg-primary-light rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C3.24 1 1 3.016 1 5.5c0 1.484.8 2.8 2.04 3.632L2.7 11l2.24-1.192C5.28 9.928 5.64 10 6 10c2.76 0 5-2.016 5-4.5S8.76 1 6 1z" fill="#3C1E1E"/>
                  </svg>
                </div>
                <span>{t.login.kakaoLogin}</span>
              </button>
            </div>

            <p className="text-center text-sm text-text-secondary mt-6">
              {t.login.noAccount}{' '}
              <Link href="/signup" className="text-primary font-semibold hover:text-primary-dark transition-colors duration-200 cursor-pointer">
                {t.login.signup}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
