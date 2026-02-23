'use client'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../contexts/LangContext'

type FormData = {
  person1: string
  person2: string
  firstMeetDate: string
  firstMeetPlace: string
  memories: string
  proposeMessage: string
}

const INPUT_CLS = "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-shadow"

export function Step1CoupleInfo({ onNext, onPreviewChange }: { onNext: (data: any) => void; onPreviewChange?: (data: Partial<FormData>) => void }) {
  const { t } = useLang()
  const [currentStep, setCurrentStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    person1: '', person2: '',
    firstMeetDate: '', firstMeetPlace: '',
    memories: '', proposeMessage: ''
  })
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 320)
    return () => clearTimeout(timer)
  }, [currentStep])

  const set = (field: keyof FormData, value: string) => {
    const next = { ...formData, [field]: value }
    setFormData(next)
    onPreviewChange?.(next)
  }

  const canAdvance = () => {
    if (currentStep === 0) return formData.person1.trim() && formData.person2.trim()
    if (currentStep === 4) return formData.proposeMessage.trim()
    return true
  }

  const goNext = () => {
    if (!canAdvance()) return
    if (currentStep === 4) {
      onNext({
        ...formData,
        memories: formData.memories
          ? formData.memories.split(',').map(m => m.trim()).filter(Boolean)
          : []
      })
      return
    }
    setVisible(false)
    setTimeout(() => {
      setCurrentStep(s => s + 1)
      setVisible(true)
    }, 200)
  }

  const goBack = () => {
    if (currentStep === 0) return
    setVisible(false)
    setTimeout(() => {
      setCurrentStep(s => s - 1)
      setVisible(true)
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      goNext()
    }
  }

  const steps = [
    {
      question: t.step1.names,
      hint: t.step1.namesHint,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">{t.step1.myName}</label>
            <input
              ref={el => { if (el && currentStep === 0) inputRef.current = el }}
              value={formData.person1}
              onChange={e => set('person1', e.target.value)}
              onKeyDown={handleKeyDown}
              className={INPUT_CLS}
              placeholder="지훈"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">{t.step1.partnerName}</label>
            <input
              value={formData.person2}
              onChange={e => set('person2', e.target.value)}
              onKeyDown={handleKeyDown}
              className={INPUT_CLS}
              placeholder="수연"
              autoComplete="off"
            />
          </div>
        </div>
      )
    },
    {
      question: t.step1.firstMeetDate,
      hint: t.step1.firstMeetHint,
      content: (
        <input
          ref={el => { if (el && currentStep === 1) inputRef.current = el }}
          type="date"
          value={formData.firstMeetDate}
          onChange={e => { set('firstMeetDate', e.target.value) }}
          onKeyDown={handleKeyDown}
          className={INPUT_CLS}
        />
      )
    },
    {
      question: t.step1.firstMeetPlace,
      hint: t.step1.firstMeetPlaceHint,
      content: (
        <input
          ref={el => { if (el && currentStep === 2) inputRef.current = el }}
          value={formData.firstMeetPlace}
          onChange={e => set('firstMeetPlace', e.target.value)}
          onKeyDown={handleKeyDown}
          className={INPUT_CLS}
          placeholder="홍대 카페"
          autoComplete="off"
        />
      )
    },
    {
      question: t.step1.memories,
      hint: t.step1.memoriesHint,
      content: (
        <input
          ref={el => { if (el && currentStep === 3) inputRef.current = el }}
          value={formData.memories}
          onChange={e => set('memories', e.target.value)}
          onKeyDown={handleKeyDown}
          className={INPUT_CLS}
          placeholder="제주도 여행, 새벽 드라이브"
          autoComplete="off"
        />
      )
    },
    {
      question: t.step1.message.replace('{partner}', formData.person2 || ''),
      hint: t.step1.messageHint,
      content: (
        <textarea
          ref={el => { if (el && currentStep === 4) inputRef.current = el as any }}
          value={formData.proposeMessage}
          onChange={e => set('proposeMessage', e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          className={INPUT_CLS + ' resize-none'}
          placeholder="평생 내 곁에 있어줄래?"
        />
      )
    }
  ]

  const stepData = steps[currentStep]
  const progress = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
          <button
            onClick={goBack}
            className={`flex items-center gap-1 hover:text-gray-600 transition-colors cursor-pointer ${currentStep === 0 ? 'invisible' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.step1.prev}
          </button>
          <span>{currentStep + 1} / {steps.length}</span>
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question & Input */}
      <div
        className="transition-all duration-200"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)'
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
          {stepData.question}
        </h2>
        <p className="text-sm text-gray-400 mb-8">{stepData.hint}</p>

        {stepData.content}

        <button
          onClick={goNext}
          disabled={!canAdvance()}
          className="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
        >
          {currentStep === steps.length - 1 ? t.step1.complete : t.step1.next}
        </button>

        {currentStep < steps.length - 1 && (
          <p className="text-center text-gray-400 text-xs mt-3">{t.step1.enterHint}</p>
        )}
      </div>
    </div>
  )
}
