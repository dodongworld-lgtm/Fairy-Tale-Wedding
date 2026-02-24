'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LangSwitcher } from '../components/LangSwitcher'
import { useLang } from '../contexts/LangContext'

export default function SignupPage() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: 실제 회원가입 API 연동
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-indigo-900">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-96 h-96 bg-indigo-400/25 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-80 h-80 bg-violet-500/25 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-pink-500/10 rounded-full blur-2xl" />
          {/* Subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid-signup" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-signup)"/>
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
            <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-3">무료로 시작하세요</p>
            <h2 className="text-4xl font-black text-white leading-tight mb-3">
              지금 가입하면<br />
              <span className="text-indigo-200">바로 만들 수 있어요</span>
            </h2>
            <p className="text-indigo-200 text-base leading-relaxed max-w-sm">
              회원가입 후 AI 영상 제작을 시작하세요. 마음에 들 때만 결제하면 됩니다.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">사진 업로드만으로 시작</p>
                <p className="text-indigo-300 text-xs mt-0.5">1~10장의 커플 사진이면 충분해요</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">완성 후 직접 편집 가능</p>
                <p className="text-indigo-300 text-xs mt-0.5">나레이션, 이미지, 장면을 자유롭게</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">영상 완성 후 결제</p>
                <p className="text-indigo-300 text-xs mt-0.5">마음에 드실 때만 결제하세요</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Bottom: social proof */}
        <div className="relative flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-violet-400', 'bg-indigo-400', 'bg-pink-400', 'bg-blue-400'].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white/30`} />
            ))}
          </div>
          <p className="text-indigo-200 text-sm">
            <span className="font-bold text-white">500+</span> 커플이 이미 만들었어요
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link href="/" className="text-base font-black text-gray-900 cursor-pointer">{t.common.brand}</Link>
          <LangSwitcher />
        </div>

        {/* Desktop top-right lang + back link */}
        <div className="hidden lg:flex items-center justify-end gap-3 px-10 py-6">
          <LangSwitcher />
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer flex items-center gap-1">
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
              <h1 className="text-2xl font-black text-gray-900 mb-1">{t.signup.title}</h1>
              <p className="text-sm text-gray-500">{t.signup.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">{t.signup.name}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="홍길동"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">{t.signup.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">{t.signup.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t.signup.passwordHint}
                  minLength={8}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-shadow bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading ? t.signup.processing : t.signup.signupBtn}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="text-xs text-gray-400 bg-white px-3">{t.signup.orSocial}</span>
              </div>
            </div>

            {/* Social signup — pill style */}
            <div className="space-y-3">
              <button
                className="w-full py-3 border border-gray-200 hover:border-gray-300 bg-white rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>{t.signup.googleSignup}</span>
              </button>
              <button
                className="w-full py-3 border border-gray-200 hover:border-yellow-300 bg-white hover:bg-yellow-50 rounded-2xl text-sm font-medium text-gray-700 transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className="w-4 h-4 bg-yellow-400 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C3.24 1 1 3.016 1 5.5c0 1.484.8 2.8 2.04 3.632L2.7 11l2.24-1.192C5.28 9.928 5.64 10 6 10c2.76 0 5-2.016 5-4.5S8.76 1 6 1z" fill="#3C1E1E"/>
                  </svg>
                </div>
                <span>{t.signup.kakaoSignup}</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              {t.signup.termsA}{' '}
              <a href="#" className="text-indigo-600 hover:underline cursor-pointer">{t.signup.terms}</a>
              {' '}{t.signup.and}{' '}
              <a href="#" className="text-indigo-600 hover:underline cursor-pointer">{t.signup.privacy}</a>
              {t.signup.termsB}
            </p>

            <p className="text-center text-sm text-gray-500 mt-4">
              {t.signup.hasAccount}{' '}
              <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 cursor-pointer">
                {t.signup.loginLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
