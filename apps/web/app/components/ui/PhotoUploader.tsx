'use client'
import { useRef } from 'react'

interface PhotoUploaderProps {
  photos: string[]
  onChange: (photos: string[]) => void
  max?: number
  label?: string
  className?: string
}

export function PhotoUploader({ photos, onChange, max = 3, label, className = '' }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls = Array.from(files).map(f => URL.createObjectURL(f))
    onChange([...photos, ...urls].slice(0, max))
    e.target.value = ''
  }

  const remove = (idx: number) => onChange(photos.filter((_, i) => i !== idx))

  return (
    <div className={className}>
      {label && <p className="text-sm text-text-secondary font-medium mb-2">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {photos.map((url, i) => (
          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button onClick={() => remove(i)} className="absolute top-0.5 right-0.5 w-5 h-5 bg-dark-bg/70 text-dark-text rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-dark-bg">&times;</button>
          </div>
        ))}
        {photos.length < max && (
          <button onClick={() => inputRef.current?.click()} className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-muted hover:border-primary-light hover:bg-bg-subtle transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
    </div>
  )
}
