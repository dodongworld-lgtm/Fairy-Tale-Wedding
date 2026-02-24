'use client'
import { useState } from 'react'
import { LangSwitcher } from '../components/LangSwitcher'
import { LiveMockPlayer } from './components/LiveMockPlayer'
import { Step0Checklist } from './components/steps/Step0Checklist'
import { Step1Character } from './components/steps/Step1Character'
import { Step2Opening } from './components/steps/Step2Opening'
import { Step3Trailer } from './components/steps/Step3Trailer'
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
  type CharacterVariants,
  STEP_META,
} from './data/projectData'

const TOTAL_STEPS = STEP_META.length  // 10 (0~9)

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const [project, setProject] = useState<ProjectData>(createDefaultProject)

  const prev = () => setStep(s => Math.max(0, s - 1))
  const next = () => setStep(s => Math.min(TOTAL_STEPS - 1, s + 1))

  const updateSection = (key: SectionKey, data: Partial<SectionData>) => {
    setProject(p => ({
      ...p,
      sections: {
        ...p.sections,
        [key]: { ...p.sections[key], ...data },
      },
    }))
  }

  const updateProject = (field: 'groomName' | 'brideName' | 'groom' | 'bride', value: string | CharacterVariants) => {
    setProject(p => ({ ...p, [field]: value }))
  }

  const toggleTrailer = (v: boolean) => {
    setProject(p => ({ ...p, trailerEnabled: v }))
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="flex-shrink-0 h-14 border-b border-gray-100 flex items-center px-4 sm:px-6 justify-between bg-white z-10">
        {/* Left: back + brand */}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={prev}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:block">이전</span>
            </button>
          )}
          <a href="/" className="text-base font-semibold text-gray-900">Once Upon Us</a>
        </div>

        {/* Center: progress bar (steps 1-8 only) */}
        {step >= 1 && step <= 8 && (
          <div className="hidden sm:flex items-center gap-1">
            {STEP_META.slice(1, 9).map((_, i) => {
              const n = i + 1
              const isActive = step === n
              const isDone = step > n
              return (
                <div key={n} className="flex items-center gap-0.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone ? 'bg-gray-800 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isDone ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : n}
                  </div>
                  {n < 8 && (
                    <div className={`w-4 h-px ${step > n ? 'bg-gray-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Right: step label + lang */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">
            {STEP_META[step]?.label}
          </span>
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
              <Step3Trailer
                project={project}
                onSection={updateSection}
                onToggleTrailer={toggleTrailer}
                onNext={next}
              />
            )}

            {step === 4 && (
              <Step4WhoWeAre
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 5 && (
              <Step5HowWeMet
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 6 && (
              <Step6BecameLovers
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 7 && (
              <Step7Decision
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 8 && (
              <Step8Thanks
                project={project}
                onSection={updateSection}
                onNext={next}
              />
            )}

            {step === 9 && (
              <Step9Review project={project} onFinish={() => {}} />
            )}

          </div>
        </div>

        {/* RIGHT — Live Mock Player (desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 border-l border-gray-100 items-center justify-center overflow-hidden relative">
          <LiveMockPlayer step={step} project={project} />
        </div>

      </div>
    </div>
  )
}
