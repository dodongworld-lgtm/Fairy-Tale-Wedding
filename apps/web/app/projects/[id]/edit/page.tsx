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
  const [saved, setSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    axios.get(`${API}/api/projects/${params.id}`, { headers: { 'x-user-id': 'temp-user' } })
      .then(r => {
        setScenes(r.data.scenes || [])
        if (r.data.scenes?.length) {
          setSelected(r.data.scenes[0])
          setNarration(r.data.scenes[0].narrationText || '')
        }
      })
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
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectScene = (scene: Scene) => {
    setSelected(scene)
    setNarration(scene.narrationText || '')
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(o => !o)}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/" className="text-base font-semibold text-gray-900">Once Upon Us</a>
          <span className="text-gray-300 hidden sm:block">/</span>
          <span className="text-sm text-gray-500 hidden sm:block">영상 편집</span>
        </div>
        <button
          onClick={() => router.push(`/projects/${params.id}/checkout`)}
          className="px-4 sm:px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <span className="hidden sm:inline">완성 및 결제</span>
          <span className="sm:hidden">결제</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:relative top-14 bottom-0 left-0 z-30
          w-56 bg-white border-r border-gray-100 overflow-y-auto flex-shrink-0
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 space-y-5">
            {[1, 2, 3, 4].map(act => (
              <div key={act}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Act {act} · {ACT_TITLES[act]}
                </p>
                {scenes.filter(s => s.act === act).map(scene => (
                  <div
                    key={scene.id}
                    onClick={() => selectScene(scene)}
                    className={`p-2 rounded-lg cursor-pointer mb-1.5 border transition-all ${
                      selected?.id === scene.id
                        ? 'border-indigo-300 bg-indigo-50'
                        : 'border-gray-100 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-full h-10 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">장면 {scene.order + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {selected ? (
            <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
              {/* Image preview */}
              <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  {selected.imageS3Key ? '이미지 로드됨' : '이미지 생성 중...'}
                </span>
              </div>

              {/* Controls */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">이미지</label>
                  </div>
                  <button
                    onClick={regenImage}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? '재생성 중...' : '이미지 재생성'}
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">나레이션</label>
                    {saved && <span className="text-xs text-green-600 font-medium">저장됨</span>}
                  </div>
                  <textarea
                    value={narration}
                    onChange={e => setNarration(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none resize-none"
                  />
                  <button
                    onClick={saveNarration}
                    className="mt-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              <div className="text-center">
                <p className="mb-3">장면을 선택하세요</p>
                <button
                  className="md:hidden px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg cursor-pointer"
                  onClick={() => setSidebarOpen(true)}
                >
                  장면 목록 열기
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
