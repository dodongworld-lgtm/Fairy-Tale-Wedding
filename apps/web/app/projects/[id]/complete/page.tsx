'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { LangSwitcher } from '../../../components/LangSwitcher'
import { useLang } from '../../../contexts/LangContext'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Plan = 'STANDARD' | 'PRO' | 'ULTRA'

export default function CompletePage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { orderId?: string; plan?: string }
}) {
  const { t } = useLang()

  const PLAN_INFO: Record<Plan, { name: string; features: string[]; displayPrice: string }> = {
    STANDARD: {
      name: 'Standard',
      displayPrice: '₩49,000',
      features: ['FHD (1080p)', '다운로드 3회', '30일 보관'],
    },
    PRO: {
      name: 'Pro',
      displayPrice: '₩199,000',
      features: ['4K 초고화질', '무제한 다운로드', '영구 보관', '이미지 재생성 5회'],
    },
    ULTRA: {
      name: 'Ultra',
      displayPrice: '₩299,000',
      features: ['4K 초고화질', '무제한 다운로드', '영구 보관', 'USB 배송', '전담 편집 지원'],
    },
  }

  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [shareToken, setShareToken] = useState<string | null>(null)

  const plan = (searchParams.plan as Plan) || 'STANDARD'
  const planInfo = PLAN_INFO[plan] || PLAN_INFO.STANDARD
  const shareUrl = shareToken
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${shareToken}`
    : null

  useEffect(() => {
    // 프로젝트에서 공유 토큰 가져오기
    axios
      .get(`${API}/api/projects/${params.id}`, { headers: { 'x-user-id': 'temp-user' } })
      .then(r => {
        const token = r.data.videos?.[0]?.shareToken
        if (token) setShareToken(token)
      })
      .catch(() => {})
  }, [params.id])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const { data } = await axios.get(`${API}/api/projects/${params.id}/download`, {
        headers: { 'x-user-id': 'temp-user' },
      })
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank')
      }
    } catch {
      alert('다운로드 링크를 불러오는 중 오류가 발생했습니다.')
    }
    setDownloading(false)
  }

  const copyShareLink = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareKakao = () => {
    // KakaoTalk share placeholder
    if (shareUrl) window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Header */}
      <header className="bg-bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-text">Once Upon Us</Link>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text transition-colors">
              {t.complete.myProjects}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-16">

        {/* Success icon + title */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text mb-2">{t.complete.title}</h1>
          <p className="text-text-secondary text-sm sm:text-base">{t.complete.subtitle}</p>
        </div>

        {/* Order summary */}
        <div className="bg-bg-card rounded-2xl border border-border p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wide mb-1">{t.complete.purchasedPlan}</p>
              <p className="font-black text-text text-lg">{planInfo.name}</p>
            </div>
            <span className="text-2xl font-black text-primary">{planInfo.displayPrice}</span>
          </div>
          <div className="border-t border-border pt-4 flex flex-wrap gap-2">
            {planInfo.features.map(f => (
              <span key={f} className="inline-flex items-center gap-1 text-xs text-text-secondary bg-bg-subtle border border-border px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="bg-bg-card rounded-2xl border border-border p-6 mb-4">
          <p className="text-sm font-semibold text-text mb-3">{t.complete.downloadSection}</p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3.5 bg-dark-bg hover:bg-dark-bg/60 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t.complete.preparing}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.complete.downloadBtn}
              </>
            )}
          </button>
        </div>

        {/* Share */}
        <div className="bg-bg-card rounded-2xl border border-border p-6 mb-8">
          <p className="text-sm font-semibold text-text mb-3">{t.complete.shareSection}</p>

          {/* Share link */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-bg-subtle border border-border rounded-xl px-3 py-2.5 text-sm text-text-muted truncate">
              {shareUrl || `onceuponus.kr/share/...`}
            </div>
            <button
              onClick={copyShareLink}
              disabled={!shareUrl}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex-shrink-0 ${
                copied
                  ? 'bg-success text-white'
                  : 'bg-dark-bg text-white hover:bg-dark-bg/60 disabled:opacity-40'
              }`}
            >
              {copied ? t.complete.copied : t.complete.copyLink}
            </button>
          </div>

          {/* Social share */}
          <div className="flex gap-2">
            <button
              onClick={shareKakao}
              className="flex-1 py-2.5 bg-primary-light hover:bg-primary-light/70 text-text text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <div className="w-4 h-4 bg-dark-bg rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-primary-light text-xs font-black leading-none">K</span>
              </div>
              {t.complete.kakaoShare}
            </button>
            <button
              onClick={() => {
                if (navigator.share && shareUrl) {
                  navigator.share({ title: 'Once Upon Us', url: shareUrl })
                } else if (shareUrl) {
                  copyShareLink()
                }
              }}
              className="flex-1 py-2.5 border border-border text-text text-sm font-semibold rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              {t.complete.more}
            </button>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/projects/${params.id}/edit`}
            className="flex-1 py-3 border border-border text-text text-sm font-semibold rounded-xl hover:bg-bg-card transition-colors text-center"
          >
            {t.complete.editBtn}
          </Link>
          <Link
            href="/create"
            className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors text-center"
          >
            {t.complete.newVideoBtn}
          </Link>
        </div>

        <p className="text-xs text-text-muted text-center mt-6">
          {t.complete.supportText}{' '}
          <a href="mailto:hello@onceuponus.kr" className="text-primary hover:underline">
            hello@onceuponus.kr
          </a>
          {t.complete.supportText2}
        </p>
      </div>
    </div>
  )
}
