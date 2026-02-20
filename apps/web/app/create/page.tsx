'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Step1CoupleInfo } from './components/Step1CoupleInfo'
import { Step2PhotoUpload } from './components/Step2PhotoUpload'
import { Step3StyleSelect } from './components/Step3StyleSelect'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [projectId, setProjectId] = useState<string | null>(null)

  const handleStep1 = async (coupleInfo: any) => {
    const res = await axios.post(`${API}/api/projects`, { coupleInfo, styleOptions: {} }, { headers: { 'x-user-id': 'temp-user' } })
    setProjectId(res.data.id)
    setStep(2)
  }

  const handleStep2 = () => setStep(3)

  const handleStep3 = async (styleOptions: any) => {
    if (!projectId) return
    await axios.patch(`${API}/api/projects/${projectId}`, { styleOptions }, { headers: { 'x-user-id': 'temp-user' } })
    await axios.post(`${API}/api/projects/${projectId}/generate`, {}, { headers: { 'x-user-id': 'temp-user' } })
    router.push(`/projects/${projectId}/generating`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8 gap-4">
          {[1, 2, 3].map(n => (
            <div key={n} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step >= n ? 'bg-yellow-400 text-purple-900' : 'bg-purple-800 text-purple-400'}`}>
              {n}
            </div>
          ))}
        </div>
        {step === 1 && <Step1CoupleInfo onNext={handleStep1} />}
        {step === 2 && projectId && <Step2PhotoUpload projectId={projectId} onNext={handleStep2} />}
        {step === 3 && <Step3StyleSelect onNext={handleStep3} />}
      </div>
    </div>
  )
}
