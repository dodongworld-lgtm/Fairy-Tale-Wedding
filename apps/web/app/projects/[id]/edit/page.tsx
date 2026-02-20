'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Scene = { id: string; act: number; order: number; imageS3Key?: string; narrationText?: string; durationSec?: number }

const ACT_TITLES: Record<number, string> = { 1: '운명적인 만남', 2: '함께한 여정', 3: '시련과 성장', 4: '프로포즈' }

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [scenes, setScenes] = useState<Scene[]>([])
  const [selected, setSelected] = useState<Scene | null>(null)
  const [narration, setNarration] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/projects/${params.id}`, { headers: { 'x-user-id': 'temp-user' } })
      .then(r => { setScenes(r.data.scenes || []); if (r.data.scenes?.length) { setSelected(r.data.scenes[0]); setNarration(r.data.scenes[0].narrationText || '') } })
  }, [params.id])

  const regenImage = async () => {
    if (!selected) return
    setLoading(true)
    await axios.post(`${API}/api/scenes/${selected.id}/regenerate-image`, {}, { headers: { 'x-user-id': 'temp-user' } }).catch(() => {})
    setLoading(false)
  }

  const saveNarration = async () => {
    if (!selected) return
    await axios.patch(`${API}/api/scenes/${selected.id}`, { narrationText: narration }, { headers: { 'x-user-id': 'temp-user' } }).catch(() => {})
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-400">✨ 영상 편집</h1>
        <button onClick={() => router.push(`/projects/${params.id}/checkout`)} className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300">
          완성 → 결제
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-60 border-r border-gray-800 overflow-y-auto p-3 space-y-4">
          {[1, 2, 3, 4].map(act => (
            <div key={act}>
              <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Act {act}: {ACT_TITLES[act]}</p>
              {scenes.filter(s => s.act === act).map(scene => (
                <div key={scene.id} onClick={() => { setSelected(scene); setNarration(scene.narrationText || '') }}
                  className={`p-2 rounded-lg cursor-pointer mb-1 border ${selected?.id === scene.id ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}`}>
                  <div className="w-full h-12 bg-purple-900 rounded flex items-center justify-center text-purple-400 text-xs">
                    장면 {scene.order + 1}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {selected ? (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                {selected.imageS3Key ? '이미지 로드됨' : '이미지 생성 중...'}
              </div>
              <div className="bg-gray-900 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">이미지</label>
                  <button onClick={regenImage} disabled={loading} className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm disabled:opacity-50">
                    {loading ? '재생성 중...' : '이미지 재생성'}
                  </button>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">나레이션</label>
                  <textarea value={narration} onChange={e => setNarration(e.target.value)} rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-yellow-400 focus:outline-none" />
                  <button onClick={saveNarration} className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">저장</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">장면을 선택하세요</div>
          )}
        </div>
      </div>
    </div>
  )
}
