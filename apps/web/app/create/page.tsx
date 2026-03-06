'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LangSwitcher } from '../components/LangSwitcher'
import { LiveMockPlayer } from './components/LiveMockPlayer'
import { Step0Checklist } from './components/steps/Step0Checklist'
import { Step1Character } from './components/steps/Step1Character'
import { Step2Opening } from './components/steps/Step2Opening'
import { Step4WhoWeAre } from './components/steps/Step4WhoWeAre'
import { Step5HowWeMet } from './components/steps/Step5HowWeMet'
import { Step6BecameLovers } from './components/steps/Step6BecameLovers'
import { Step7Decision } from './components/steps/Step7Decision'
import { Step8Thanks } from './components/steps/Step8Thanks'
import { Step9Review } from './components/steps/Step9Review'
import {
  createDefaultProject,
  type ProjectData,
  type SectionKey,
  type SectionData,
  STEP_META,
} from './data/projectData'

// Steps: 0=checklist, 1=photos, 2=opening, 3=whoWeAre, 4=howWeMet,
//        5=becameLovers, 6=decision, 7=thanks, 8=review
const TOTAL_STEPS = STEP_META.length  // 9

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const [project, setProject] = useState<ProjectData>(createDefaultProject)
  const [showLoginGate, setShowLoginGate] = useState(false)

  const prev = () => setStep(s => Math.max(0, s - 1))
  const next = () => {
    if (step === 1) {
      setShowLoginGate(true)
      return
    }
    setStep(s => Math.min(TOTAL_STEPS - 1, s + 1))
  }
  const handleLoginSuccess = () => {
    setShowLoginGate(false)
    setStep(2)
  }

  const updateSection = (key: SectionKey, data: Partial<SectionData>) => {
    setProject(p => ({
      ...p,
      sections: {
        ...p.sections,
        [key]: { ...p.sections[key], ...data },
      },
    }))
  }

  const updateProject = (field: 'groomName' | 'brideName' | 'groomPhoto' | 'bridePhoto', value: string) => {
    setProject(p => ({ ...p, [field]: value }))
  }

  const handleFinish = async () => {
    const coupleInfo = {
      groomName: project.groomName,
      brideName: project.brideName,
      groomPhotoUploaded: project.groomPhoto !== '',
      bridePhotoUploaded: project.bridePhoto !== '',
      sections: Object.fromEntries(
        (Object.keys(project.sections) as (keyof typeof project.sections)[]).map(key => [
          key,
          {
            narration: project.sections[key].narration,
            date: project.sections[key].date,
            place: project.sections[key].place,
            customText: project.sections[key].customText,
            photoCount: project.sections[key].photos.length,
          },
        ])
      ),
    }
    const styleOptions = {}

    try {
      await fetch(`${API}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleInfo, styleOptions }),
      })
    } catch {
      // Best-effort: proceed even if API is unreachable
    }
  }

  return (
    <div className="h-screen bg-bg flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="flex-shrink-0 h-16 border-b border-border/60 flex items-center px-4 sm:px-6 justify-between backdrop-blur-md bg-bg/80 z-10">
        {/* Left: back + brand */}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={prev}
              className="group flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:block">이전</span>
            </button>
          )}
          <a href="/" className="text-lg font-semibold font-serif tracking-wide text-text">Once Upon Us</a>
        </div>

        {/* Center: progress bar (steps 1-7 only) */}
        {step >= 1 && step <= 7 && (
          <div className="hidden sm:flex flex-col items-center gap-1">
            <div className="w-48 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 6) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-text-muted font-medium">
              {STEP_META[step]?.label}
            </span>
          </div>
        )}

        {/* Right: step counter + lang */}
        <div className="flex items-center gap-3">
          {step >= 1 && step <= 8 && (
            <span className="text-xs text-text-muted font-medium hidden sm:block">
              {step} / {TOTAL_STEPS - 1}
            </span>
          )}
          <LangSwitcher />
        </div>
      </header>

      {/* Body: split layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-14 overflow-y-auto py-8 sm:py-10">
          <div className="max-w-md mx-auto w-full">

            {step === 0 && <Step0Checklist onNext={next} />}

            {step === 1 && (
              <Step1Character
                project={project}
                onChange={updateProject}
                onNext={next}
              />
            )}

            {step === 2 && (
              <Step2Opening
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 3 && (
              <Step4WhoWeAre
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 4 && (
              <Step5HowWeMet
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 5 && (
              <Step6BecameLovers
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 6 && (
              <Step7Decision
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 7 && (
              <Step8Thanks
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 8 && (
              <Step9Review project={project} onFinish={handleFinish} />
            )}

          </div>
        </div>

        {/* RIGHT — Live Mock Player (desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-bg-subtle to-primary-light/5 border-l border-border items-center justify-center overflow-hidden relative">
          <LiveMockPlayer step={step} project={project} />
        </div>

      </div>

      {/* Login Gate Modal */}
      {showLoginGate && (
        <LoginGateModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginGate(false)}
        />
      )}
    </div>
  )
}

/* ── Login Gate Modal ────────────────────────────────────────────────────── */

function LoginGateModal({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [tab, setTab] = useState<'social' | 'email'>('social')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative bg-bg-card rounded-3xl shadow-2xl w-full max-w-sm p-8">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-light/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-text mb-1">계속하려면 로그인이 필요해요</h2>
          <p className="text-sm text-text-muted">입력하신 내용은 그대로 유지돼요</p>
        </div>

        {/* Tab */}
        <div className="flex bg-bg-subtle rounded-xl p-1 mb-5">
          <button
            onClick={() => setTab('social')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${tab === 'social' ? 'bg-white shadow-sm text-text' : 'text-text-secondary'}`}
          >
            소셜 로그인
          </button>
          <button
            onClick={() => setTab('email')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${tab === 'email' ? 'bg-white shadow-sm text-text' : 'text-text-secondary'}`}
          >
            이메일
          </button>
        </div>

        {tab === 'social' ? (
          <div className="space-y-3">
            <button
              onClick={onSuccess}
              className="w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-bg-subtle shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google로 계속하기
            </button>
            <button
              onClick={onSuccess}
              className="w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-primary-light/20 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <div className="w-4 h-4 bg-primary-light rounded-sm flex items-center justify-center">
                <span className="text-black text-xs font-black leading-none">K</span>
              </div>
              Kakao로 계속하기
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow"
            />
            <button
              onClick={onSuccess}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              로그인하기
            </button>
          </div>
        )}

        <p className="text-center text-xs text-text-muted mt-5">
          계정이 없으신가요?{' '}
          <Link href="/signup" className="text-primary font-semibold hover:text-primary-dark">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
