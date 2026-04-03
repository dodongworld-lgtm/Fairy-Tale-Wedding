'use client'
import { useState } from 'react'
import { LangSwitcher } from '../components/LangSwitcher'
import { Step1Character } from './components/steps/Step1Character'
import { Step2Opening } from './components/steps/Step2Opening'
import { StepTemplateSelect } from './components/steps/StepTemplateSelect'
import { StepBlockPicker } from './components/steps/StepBlockPicker'
import { StepOutro } from './components/steps/StepOutro'
import { Step9Review } from './components/steps/Step9Review'
import { BlockEditor } from './components/BlockEditor'
import { BLOCK_MAP } from './data/blockDefs'
import {
  createDefaultProject,
  type ProjectData,
  type SectionData,
  buildStepMeta,
  initBlockSections,
} from './data/projectData'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const [project, setProject] = useState<ProjectData>(createDefaultProject)
  const [showBlockPicker, setShowBlockPicker] = useState(false)

  const stepMeta = buildStepMeta(project.selectedBlocks)
  const TOTAL_STEPS = stepMeta.length
  const currentStepKey = stepMeta[step]?.key || 'template'

  const prev = () => {
    if (currentStepKey === 'template') setShowBlockPicker(false)
    setStep((s: number) => Math.max(0, s - 1))
  }
  const next = () => setStep((s: number) => Math.min(TOTAL_STEPS - 1, s + 1))

  const updateSection = (key: string, data: Partial<SectionData>) => {
    setProject((p: ProjectData) => ({
      ...p,
      sections: {
        ...p.sections,
        [key]: { ...(p.sections[key] || { photos: [], narration: '' }), ...data },
      },
    }))
  }

  const updateProject = (field: 'groomName' | 'brideName' | 'groomPhoto' | 'bridePhoto', value: string) => {
    setProject((p: ProjectData) => ({ ...p, [field]: value }))
  }

  const handleFinish = async () => {
    const coupleInfo = {
      groomName: project.groomName,
      brideName: project.brideName,
      groomPhotoUploaded: project.groomPhoto !== '',
      bridePhotoUploaded: project.bridePhoto !== '',
      templateId: project.templateId,
      selectedBlocks: project.selectedBlocks,
      sections: Object.fromEntries(
        Object.keys(project.sections).map(key => [
          key,
          {
            narration: project.sections[key].narration,
            date: project.sections[key].date,
            place: project.sections[key].place,
            customText: project.sections[key].customText,
            customText2: project.sections[key].customText2,
            photoCount: project.sections[key].photos.length,
          },
        ])
      ),
    }
    try {
      await fetch(`${API}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleInfo }),
      })
    } catch {
      // Best-effort
    }
  }

  // Template step uses wider layout, others use centered narrow layout
  const isWideStep = currentStepKey === 'template'

  return (
    <div className="h-screen bg-bg flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 h-16 border-b border-border/60 flex items-center px-4 sm:px-6 justify-between backdrop-blur-md bg-bg/80 z-10">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button onClick={prev} className="group flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors cursor-pointer">
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:block">이전</span>
            </button>
          )}
          <a href="/" className="text-lg font-semibold font-serif tracking-wide text-text">Once Upon Us</a>
        </div>

        {step >= 2 && step <= TOTAL_STEPS - 2 && (
          <div className="hidden sm:flex flex-col items-center gap-1">
            <div className="w-48 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(((step - 1) / Math.max(TOTAL_STEPS - 3, 1)) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-text-muted font-medium">{stepMeta[step]?.label}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {step >= 1 && (
            <span className="text-xs text-text-muted font-medium hidden sm:block">
              {step} / {TOTAL_STEPS - 1}
            </span>
          )}
          <LangSwitcher />
        </div>
      </header>

      {/* Body — single column, full width */}
      <div className="flex-1 overflow-y-auto py-8 sm:py-10 px-6 sm:px-8 md:px-14">
        <div
          key={currentStepKey}
          className={`mx-auto w-full animate-in slide-in-from-bottom-4 duration-500 ${isWideStep ? 'max-w-5xl' : 'max-w-lg'}`}
        >

          {currentStepKey === 'template' && !showBlockPicker && (
            <StepTemplateSelect
              onSelectTemplate={(templateId: string, blockIds: string[]) => {
                setProject((p: ProjectData) => ({
                  ...p, templateId, selectedBlocks: blockIds,
                  sections: initBlockSections(p.sections, blockIds),
                }))
                setShowBlockPicker(false)
                setStep((s: number) => s + 1)
              }}
              onCustomSelect={() => setShowBlockPicker(true)}
            />
          )}

          {currentStepKey === 'template' && showBlockPicker && (
            <StepBlockPicker
              selectedBlocks={project.selectedBlocks}
              onChangeBlocks={(blockIds: string[]) => {
                setProject((p: ProjectData) => ({
                  ...p, templateId: null, selectedBlocks: blockIds,
                  sections: initBlockSections(p.sections, blockIds),
                }))
              }}
              onNext={() => { setShowBlockPicker(false); setStep((s: number) => s + 1) }}
            />
          )}

          {currentStepKey === 'photos' && (
            <Step1Character project={project} onChange={updateProject} onNext={next} />
          )}

          {currentStepKey === 'opening' && (
            <Step2Opening project={project} onSection={updateSection} onNext={next} />
          )}

          {currentStepKey === 'outro' && (
            <StepOutro project={project} onSection={updateSection} onNext={next} />
          )}

          {currentStepKey === 'review' && (
            <Step9Review project={project} onFinish={handleFinish} />
          )}

          {BLOCK_MAP[currentStepKey] && (
            <BlockEditor
              block={BLOCK_MAP[currentStepKey]}
              data={project.sections[currentStepKey] || { photos: [], narration: '' }}
              groomName={project.groomName}
              brideName={project.brideName}
              onChange={(data: Partial<SectionData>) => updateSection(currentStepKey, data)}
              onNext={next}
            />
          )}

        </div>
      </div>
    </div>
  )
}
