'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client'

type ProgressData = { step: string; percent: number; message: string }

const STEPS = [
  { key: 'story', label: '스토리 생성' },
  { key: 'images', label: '이미지 생성' },
  { key: 'audio', label: '나레이션 녹음' },
  { key: 'render', label: '영상 편집' }
]

export default function GeneratingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [progress, setProgress] = useState<ProgressData>({ step: 'story', percent: 0, message: '마법이 시작됩니다...' })
  const [error, setError] = useState(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')
    socket.emit('join', `project:${params.id}`)
    socket.on('progress', (data: ProgressData) => setProgress(data))
    socket.on('completed', () => router.push(`/projects/${params.id}/edit`))
    socket.on('error', () => setError(true))
    return () => { socket.disconnect() }
  }, [params.id, router])

  const currentIdx = STEPS.findIndex(s => s.key === progress.step)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="text-8xl mb-8 animate-pulse">✨</div>
        <h2 className="text-3xl font-bold text-white mb-2">마법이 시작됩니다</h2>
        {error ? (
          <p className="text-red-400 mb-4">오류가 발생했습니다. 다시 시도해주세요.</p>
        ) : (
          <p className="text-purple-300 mb-8">{progress.message}</p>
        )}
        <div className="bg-purple-800 rounded-full h-3 mb-8">
          <div className="bg-yellow-400 h-3 rounded-full transition-all duration-700" style={{ width: `${progress.percent}%` }} />
        </div>
        <div className="space-y-3 text-left mb-8">
          {STEPS.map((step, idx) => {
            const done = idx < currentIdx || progress.step === 'done'
            const active = step.key === progress.step
            return (
              <div key={step.key} className={`flex items-center gap-3 ${done ? 'text-green-400' : active ? 'text-yellow-400' : 'text-purple-500'}`}>
                <span className="w-5">{done ? '✓' : active ? '◐' : '○'}</span>
                <span>{step.label}</span>
                {active && <span className="text-xs animate-pulse">진행 중...</span>}
              </div>
            )
          })}
        </div>
        <p className="text-purple-400 text-sm">평균 3~5분 소요됩니다</p>
      </div>
    </div>
  )
}
