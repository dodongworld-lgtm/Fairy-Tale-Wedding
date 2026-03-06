'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client'
import { useLang } from '../../../contexts/LangContext'

type ProgressData = { step: string; percent: number; message: string }

export default function GeneratingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { t } = useLang()

  const STEPS = [
    { key: 'story', label: t.generating.story },
    { key: 'images', label: t.generating.images },
    { key: 'audio', label: t.generating.audio },
    { key: 'render', label: t.generating.render },
  ]

  const [progress, setProgress] = useState<ProgressData>({ step: 'story', percent: 0, message: t.generating.initMessage })
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
    <div className="min-h-screen bg-bg-subtle flex flex-col">
      <header className="bg-bg-card border-b border-border h-14 flex items-center px-6 flex-shrink-0">
        <a href="/" className="text-base font-semibold text-text">Once Upon Us</a>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary-light/20 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text text-center mb-2">{t.generating.title}</h2>

        {error ? (
          <p className="text-error text-center text-sm mb-6">{t.generating.error}</p>
        ) : (
          <p className="text-text-secondary text-center text-sm mb-6">{progress.message}</p>
        )}

        {/* Progress bar */}
        <div className="bg-border rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-700"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const done = idx < currentIdx || progress.step === 'done'
            const active = step.key === progress.step
            return (
              <div key={step.key} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? 'bg-primary' : active ? 'border-2 border-primary' : 'border-2 border-border-hover'
                }`}>
                  {done && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {active && <div className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                <span className={`text-sm ${done ? 'text-text font-medium' : active ? 'text-primary font-medium' : 'text-text-muted'}`}>
                  {step.label}
                </span>
                {active && <span className="text-xs text-primary-light ml-auto animate-pulse">{t.generating.inProgress}</span>}
              </div>
            )
          })}
        </div>

        <p className="text-xs text-text-muted text-center mt-8">{t.generating.timeEstimate}</p>
      </div>
      </div>
    </div>
  )
}
