'use client'
import { useState } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const PLANS = [
  { id: 'BASIC', name: 'Basic', price: 9900, features: ['HD (720p)', '다운로드 1회', '7일 보관'] },
  { id: 'STANDARD', name: 'Standard', price: 19900, features: ['FHD (1080p)', '무제한 다운로드', '공유 링크', '30일 보관', '이미지 재생성 3회'] },
  { id: 'PREMIUM', name: 'Premium', price: 39900, features: ['4K', '무제한 다운로드', '공유 링크', '영구 보관', '이미지 재생성 무제한', '실물 USB 배송'] }
]

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [plan, setPlan] = useState('STANDARD')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const { data: order } = await axios.post(`${API}/api/orders`, { projectId: params.id, plan }, { headers: { 'x-user-id': 'temp-user' } })
      // Toss Payments SDK would load here in production
      // For MVP, redirect to success directly
      window.location.href = `/projects/${params.id}/complete?orderId=${order.orderId}`
    } catch (e) {
      alert('결제 중 오류가 발생했습니다.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">영상이 완성되었어요! 🎉</h1>
        <p className="text-purple-300 text-center mb-8">플랜을 선택하고 영상을 다운로드하세요</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {PLANS.map(p => (
            <div key={p.id} onClick={() => setPlan(p.id)}
              className={`rounded-2xl p-5 cursor-pointer border-2 transition-all ${plan === p.id ? 'border-yellow-400 bg-yellow-400/10' : 'border-purple-700 bg-white/5 hover:border-purple-500'}`}>
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="text-2xl font-bold text-yellow-400 my-2">{p.price.toLocaleString()}원</p>
              <ul className="space-y-1">
                {p.features.map(f => (
                  <li key={f} className="text-purple-200 text-xs flex gap-1"><span>✓</span>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button onClick={handlePayment} disabled={loading}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-xl text-lg transition-colors disabled:opacity-50">
          {loading ? '처리 중...' : '카카오페이 / 카드로 결제하기'}
        </button>
      </div>
    </div>
  )
}
