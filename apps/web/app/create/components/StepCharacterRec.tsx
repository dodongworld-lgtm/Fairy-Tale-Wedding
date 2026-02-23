'use client'
import { useState, useEffect } from 'react'
import { useLang } from '../../contexts/LangContext'
import { CharacterAssignment, assignRandomCharacters } from '../data/storyData'

type UploadedPhoto = { photoId: string; fileName: string; isFacePrimary: boolean; s3Key?: string }

type Props = {
  photos: UploadedPhoto[]
  person1: string
  person2: string
  onNext: (characters: CharacterAssignment[]) => void
}

export function StepCharacterRec({ person1, person2, onNext }: Props) {
  const { t } = useLang()
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading')
  const [characters, setCharacters] = useState<CharacterAssignment[]>([])

  useEffect(() => {
    const chars = assignRandomCharacters(person1, person2)
    setCharacters(chars)
    const timer = setTimeout(() => setPhase('reveal'), 2000)
    return () => clearTimeout(timer)
  }, [person1, person2])

  const handleRetry = () => {
    setCharacters(assignRandomCharacters(person1, person2))
  }

  if (phase === 'loading') {
    return (
      <div className="w-full space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.characterRec.title}</h2>
          <p className="text-sm text-gray-400">{t.characterRec.loading}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-sm text-indigo-600 font-medium">{t.characterRec.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.characterRec.title}</h2>
        <p className="text-sm text-gray-400">AI가 추천하는 캐릭터예요</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {characters.map((assignment) => (
          <CharacterCard key={assignment.person} assignment={assignment} />
        ))}
      </div>

      <button
        onClick={handleRetry}
        className="w-full py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        {t.characterRec.retry}
      </button>

      <button
        onClick={() => onNext(characters)}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors cursor-pointer"
      >
        {t.characterRec.confirm}
      </button>
    </div>
  )
}

function CharacterCard({ assignment }: { assignment: CharacterAssignment }) {
  const { character, person } = assignment
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50">
      <div className="w-20 h-20 rounded-xl bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="8" r="4" />
          <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>
      <p className="text-xs font-semibold text-gray-500 text-center truncate w-full text-center">{person}</p>

      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l7 7-7 7" />
        </svg>
      </div>

      <div className={`w-full rounded-xl bg-gradient-to-br ${character.color} p-4 flex flex-col items-center gap-1`}>
        <span className="text-3xl">{character.emoji}</span>
        <p className="text-white font-bold text-sm text-center">{character.name}</p>
        <p className="text-white/70 text-xs text-center">{character.nameEn}</p>
      </div>
    </div>
  )
}
