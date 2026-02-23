'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { LangSwitcher } from '../components/LangSwitcher'
import { StepTemplate } from './components/StepTemplate'
import { Step1CoupleInfo } from './components/Step1CoupleInfo'
import { Step2PhotoUpload } from './components/Step2PhotoUpload'
import { StepCharacterRec } from './components/StepCharacterRec'
import { StepStorySelect } from './components/StepStorySelect'
import { StepCutEditor } from './components/StepCutEditor'
import { Step3StyleSelect } from './components/Step3StyleSelect'
import { RightPanel } from './components/RightPanel'
import type { CharacterAssignment, StoryTemplate, CutTemplate } from './data/storyData'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const STEP_LABELS = ['이야기', '사진', '캐릭터', '스토리', '편집', '스타일']

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean; previewUrl?: string }
type FormData = { person1?: string; person2?: string }

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [templateType, setTemplateType] = useState('')
  const [templateSubType, setTemplateSubType] = useState('')
  const [projectId, setProjectId] = useState<string | null>(null)
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  const [formPreview, setFormPreview] = useState<FormData>({})
  const [selectedStyle, setSelectedStyle] = useState('fantasy')

  // New state
  const [person1, setPerson1] = useState('')
  const [person2, setPerson2] = useState('')
  const [characters, setCharacters] = useState<CharacterAssignment[]>([])
  const [selectedStory, setSelectedStory] = useState<StoryTemplate | null>(null)
  const [cuts, setCuts] = useState<CutTemplate[]>([])
  const [activeCutIndex, setActiveCutIndex] = useState(0)

  const TOTAL_STEPS = STEP_LABELS.length

  const handleTemplate = (type: string, subType: string) => {
    setTemplateType(type)
    setTemplateSubType(subType)
    setStep(1)
  }

  const handlePreviewChange = (data: Partial<FormData>) => {
    setFormPreview(data)
    if (data.person1 !== undefined) setPerson1(data.person1)
    if (data.person2 !== undefined) setPerson2(data.person2)
  }

  const handleStep1 = async (coupleInfo: any) => {
    try {
      const res = await axios.post(`${API}/api/projects`, {
        coupleInfo,
        styleOptions: {},
        templateType,
        templateSubType,
      }, { headers: { 'x-user-id': 'temp-user' } })
      setProjectId(res.data.id)
    } catch {
      setProjectId(`mock-${Date.now()}`)
    }
    setStep(2)
  }

  const handleStep2 = (photos: UploadedPhoto[]) => {
    setUploadedPhotos(photos)
    setStep(3)
  }

  const handleCharacterRec = (chars: CharacterAssignment[]) => {
    setCharacters(chars)
    setStep(4)
  }

  const handleStorySelect = (story: StoryTemplate) => {
    setSelectedStory(story)
    setCuts(story.cuts.map(c => ({ ...c })))
    setActiveCutIndex(0)
    setStep(5)
  }

  const handleCutEditor = (editedCuts: CutTemplate[]) => {
    setCuts(editedCuts)
    setStep(6)
  }

  const handleStep6 = async (styleOptions: any) => {
    if (!projectId) return
    await axios.patch(`${API}/api/projects/${projectId}`, { styleOptions }, { headers: { 'x-user-id': 'temp-user' } })
    await axios.post(`${API}/api/projects/${projectId}/generate`, {}, { headers: { 'x-user-id': 'temp-user' } })
    router.push(`/projects/${projectId}/generating`)
  }

  // Step 0: Full-screen template selection
  if (step === 0) {
    return <StepTemplate onNext={handleTemplate} />
  }

  // Steps 1-6: Split layout wizard
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">

      {/* Thin top bar */}
      <header className="flex-shrink-0 h-14 border-b border-gray-100 flex items-center px-4 sm:px-6 justify-between bg-white z-10">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
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

        {/* Step dots */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const isActive = step === n
            const isDone = step > n
            return (
              <div key={n} className="flex items-center gap-0.5 sm:gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone ? 'bg-gray-900 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : n}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                {n < TOTAL_STEPS && <div className={`w-3 sm:w-5 h-px ${step > n ? 'bg-gray-400' : 'bg-gray-200'}`}/>}
              </div>
            )
          })}
        </div>

        <LangSwitcher />
      </header>

      {/* Split body */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-16 overflow-y-auto py-8 sm:py-10">
          <div className="max-w-md mx-auto w-full">
            {step === 1 && (
              <Step1CoupleInfo
                onNext={handleStep1}
                onPreviewChange={handlePreviewChange}
              />
            )}
            {step === 2 && projectId && (
              <Step2PhotoUpload projectId={projectId} person1={person1} person2={person2} onNext={handleStep2} />
            )}
            {step === 3 && (
              <StepCharacterRec
                photos={uploadedPhotos}
                person1={person1}
                person2={person2}
                onNext={handleCharacterRec}
              />
            )}
            {step === 4 && (
              <StepStorySelect
                templateType={templateType}
                templateSubType={templateSubType}
                onNext={handleStorySelect}
              />
            )}
            {step === 5 && (
              <StepCutEditor
                initialCuts={cuts}
                onNext={handleCutEditor}
              />
            )}
            {step === 6 && (
              <Step3StyleSelect
                onNext={handleStep6}
                onStyleChange={setSelectedStyle}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Visual preview (desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-gray-50 border-l border-gray-100 items-center justify-center overflow-hidden relative">
          <RightPanel
            step={step}
            formData={formPreview}
            photos={uploadedPhotos}
            selectedStyle={selectedStyle}
            characters={characters}
            selectedStory={selectedStory}
            activeCutIndex={activeCutIndex}
            cuts={cuts}
          />
        </div>

      </div>
    </div>
  )
}
