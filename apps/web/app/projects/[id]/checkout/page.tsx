'use client'
import { useState } from 'react'
import axios from 'axios'
import { LangSwitcher } from '../../../components/LangSwitcher'
import { useLang } from '../../../contexts/LangContext'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const { t } = useLang()
  const [plan, setPlan] = useState('PRO')
  const [loading, setLoading] = useState(false)

  const PLANS = [
    {
      id: 'STANDARD',
      name: 'Standard',
      price: 64900,
      displayPrice: '$49',
      originalPrice: '$99',
      event: true,
      desc: t.checkout.standardDesc,
      features: ['FHD (1080p)', '다운로드 3회', '공유 링크', '30일 보관'],
    },
    {
      id: 'PRO',
      name: 'Pro',
      price: 269000,
      displayPrice: '$199',
      originalPrice: null,
      desc: t.checkout.proDesc,
      features: ['4K 초고화질', '무제한 다운로드', '공유 링크', '영구 보관', '이미지 재생성 5회', '나레이션 무제한 수정'],
      recommended: true,
    },
    {
      id: 'ULTRA',
      name: 'Ultra',
      price: 399000,
      displayPrice: '$299',
      originalPrice: null,
      desc: t.checkout.ultraDesc,
      features: ['4K 초고화질', '무제한 다운로드', '공유 링크', '영구 보관', '이미지 재생성 무제한', '나레이션 무제한 수정', '실물 USB 배송', '전담 편집 지원'],
    },
  ]

  const handlePayment = async () => {
    setLoading(true)
    try {
      const { data: order } = await axios.post(`${API}/api/orders`, { projectId: params.id, plan }, { headers: { 'x-user-id': 'temp-user' } })
      window.location.href = `/projects/${params.id}/complete?orderId=${order.orderId}&plan=${plan}`
    } catch (e) {
      alert('결제 중 오류가 발생했습니다.')
    }
    setLoading(false)
  }

  const selectedPlan = PLANS.find(p => p.id === plan)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-base font-semibold text-gray-900">Once Upon Us</a>
          <LangSwitcher />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.checkout.header}</h1>
          <p className="text-gray-500">{t.checkout.subheader}</p>
        </div>

        {/* Event banner */}
        <div className="inline-flex items-center gap-2 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          {t.checkout.eventBanner}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {PLANS.map(p => (
            <div
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`relative bg-white rounded-2xl p-6 cursor-pointer border-2 transition-all ${
                plan === p.id
                  ? 'border-indigo-500 shadow-md shadow-indigo-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {p.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{t.checkout.recommended}</span>
                </div>
              )}
              {p.event && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{t.checkout.halfPrice}</span>
                </div>
              )}
              <div className="mb-3">
                <h3 className="text-base font-bold text-gray-900">{p.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
              </div>
              <div className="mb-4">
                {p.originalPrice && (
                  <span className="text-sm text-gray-300 line-through mr-2">{p.originalPrice}</span>
                )}
                <span className="text-3xl font-bold text-gray-900">{p.displayPrice}</span>
              </div>
              <ul className="space-y-2">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* B2B */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-base">{t.checkout.b2bTitle}</span>
              <span className="text-xs font-semibold bg-white/10 text-white px-2 py-0.5 rounded-full">{t.checkout.b2bBadge}</span>
            </div>
            <p className="text-gray-400 text-sm">{t.checkout.b2bDesc}</p>
          </div>
          <a
            href="mailto:hello@onceuponus.kr"
            className="flex-shrink-0 px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {t.checkout.b2bBtn}
          </a>
        </div>

        {/* Payment button */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">{t.checkout.selectedPlan}</p>
              <p className="font-semibold text-gray-900">{selectedPlan?.name}</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{selectedPlan?.displayPrice}</p>
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? t.checkout.processing : t.checkout.payBtn}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">{t.checkout.payNote}</p>
        </div>
      </div>
    </div>
  )
}
