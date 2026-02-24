'use client'
import { useState } from 'react'
import type { ProjectData, CharacterVariants } from '../../data/projectData'
import { generateVariants } from '../../data/projectData'
import type { DisneyCharacter } from '../../data/storyData'

type Props = {
  project: ProjectData
  onChange: (field: 'groomName' | 'brideName' | 'groom' | 'bride', value: string | CharacterVariants) => void
  onNext: () => void
}

function PersonPicker({
  label,
  name,
  variants,
  selectedIdx,
  onName,
  onSelect,
  onRegenerate,
}: {
  label: string
  name: string
  variants: DisneyCharacter[]
  selectedIdx: number
  onName: (v: string) => void
  onSelect: (i: number) => void
  onRegenerate: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <button
          onClick={onRegenerate}
          className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer font-medium"
        >
          다시 생성
        </button>
      </div>

      <input
        type="text"
        value={name}
        onChange={e => onName(e.target.value)}
        placeholder={`${label} 이름`}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
      />

      <div className="grid grid-cols-4 gap-2">
        {variants.map((char, i) => (
          <button
            key={char.id}
            onClick={() => onSelect(i)}
            className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              selectedIdx === i ? 'border-indigo-500 shadow-md shadow-indigo-100' : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className={`w-full aspect-square bg-gradient-to-br ${char.color} flex flex-col items-center justify-center gap-0.5 p-1.5`}>
              <span className="text-xl">{char.emoji}</span>
              <p className="text-white text-[9px] font-bold text-center leading-tight">{char.name}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected character label */}
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${variants[selectedIdx].color}`} />
        <p className="text-xs text-gray-500">{variants[selectedIdx].name} ({variants[selectedIdx].nameEn})</p>
      </div>
    </div>
  )
}

export function Step1Character({ project, onChange, onNext }: Props) {
  const canAdvance = project.groomName.trim() && project.brideName.trim()

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">두 분의 캐릭터를 선택해요</h2>
        <p className="text-sm text-gray-400">각각 하나씩 골라주세요</p>
      </div>

      <div className="space-y-6">
        <PersonPicker
          label="신랑"
          name={project.groomName}
          variants={project.groom.variants}
          selectedIdx={project.groom.selectedIdx}
          onName={v => onChange('groomName', v)}
          onSelect={i => onChange('groom', { ...project.groom, selectedIdx: i })}
          onRegenerate={() => onChange('groom', generateVariants())}
        />

        <div className="border-t border-gray-100" />

        <PersonPicker
          label="신부"
          name={project.brideName}
          variants={project.bride.variants}
          selectedIdx={project.bride.selectedIdx}
          onName={v => onChange('brideName', v)}
          onSelect={i => onChange('bride', { ...project.bride, selectedIdx: i })}
          onRegenerate={() => onChange('bride', generateVariants())}
        />
      </div>

      <button
        onClick={onNext}
        disabled={!canAdvance}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
