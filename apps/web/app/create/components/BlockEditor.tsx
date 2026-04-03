'use client'
import { useRef } from 'react'
import type { StoryBlockDef } from '../data/blockDefs'
import type { SectionData } from '../data/projectData'

interface Props {
  block: StoryBlockDef
  data: SectionData
  groomName: string
  brideName: string
  onChange: (data: Partial<SectionData>) => void
  onNext: () => void
}

export function BlockEditor({ block, data, groomName, brideName, onChange, onNext }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const groom = groomName || '신랑'
  const bride = brideName || '신부'

  /** Replace {groom} / {bride} tokens in label strings */
  const sub = (text: string) =>
    text.replace(/\{groom\}/g, groom).replace(/\{bride\}/g, bride)

  /* ── Photo handlers ─────────────────────────────────────────────────── */

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls = Array.from(files as FileList).map((f) => URL.createObjectURL(f))
    const newPhotos = [...(data.photos || []), ...urls].slice(0, block.photoMax)
    onChange({ photos: newPhotos })
    e.target.value = ''
  }

  const removePhoto = (idx: number) => {
    URL.revokeObjectURL(data.photos[idx])
    onChange({ photos: data.photos.filter((_, i) => i !== idx) })
  }

  /* ── Narration ──────────────────────────────────────────────────────── */

  const autoNarration = block.buildNarration(data, groomName, brideName)
  const displayNarration = data.narration || autoNarration

  /* ── Disabled state ─────────────────────────────────────────────────── */

  const nextDisabled = block.photoMin > 0 && (data.photos?.length ?? 0) < block.photoMin

  /* ── Render ─────────────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="text-4xl mb-2">{block.icon}</div>
        <h2 className="text-2xl font-serif font-bold text-text mb-1">{block.name}</h2>
        <p className="text-sm text-text-muted mb-6">{block.subtitle}</p>
      </div>

      {/* Fields */}
      {block.fields.map(field => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-secondary mb-1.5">
            {sub(field.label)}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              value={(data as unknown as Record<string, unknown>)[field.key] as string ?? ''}
              onChange={e =>
                onChange({ [field.key]: e.target.value } as Partial<SectionData>)
              }
            />
          )}

          {field.type === 'textarea' && (
            <div className="flex flex-col gap-1">
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={(data as unknown as Record<string, unknown>)[field.key] as string ?? ''}
                onChange={e =>
                  onChange({ [field.key]: e.target.value } as Partial<SectionData>)
                }
              />
              {field.maxLength && (
                <span className="text-xs text-text-muted text-right">
                  {((data as unknown as Record<string, unknown>)[field.key] as string ?? '').length}/{field.maxLength}
                </span>
              )}
            </div>
          )}

          {field.type === 'chips' && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {field.chipOptions?.map(chip => {
                  const isActive = (data as unknown as Record<string, unknown>)[field.key] === chip
                  return (
                    <button
                      key={chip}
                      type="button"
                      className={
                        isActive
                          ? 'px-4 py-2 rounded-full text-sm font-medium bg-primary text-white transition-colors'
                          : 'px-4 py-2 rounded-full text-sm font-medium bg-bg-subtle text-text-secondary border border-transparent hover:border-primary transition-colors'
                      }
                      onClick={() =>
                        onChange({ [field.key]: chip } as Partial<SectionData>)
                      }
                    >
                      {chip}
                    </button>
                  )
                })}
              </div>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={field.placeholder}
                value={(data as unknown as Record<string, unknown>)[field.key] as string ?? ''}
                onChange={e =>
                  onChange({ [field.key]: e.target.value } as Partial<SectionData>)
                }
              />
            </div>
          )}
        </div>
      ))}

      {/* Photo upload */}
      {block.photoMax > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary mb-1.5">
            {block.photoMin > 0
              ? `사진 (최대 ${block.photoMax}장, 필수 ${block.photoMin}장)`
              : `사진 (최대 ${block.photoMax}장)`}
          </label>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhoto}
          />

          <button
            type="button"
            className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm text-text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            + 사진 추가
          </button>

          {/* Thumbnail grid */}
          {(data.photos?.length ?? 0) > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {data.photos.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={url}
                    alt={`업로드 사진 ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center hover:bg-black/70"
                    onClick={() => removePhoto(idx)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Error if required photos missing */}
          {block.photoMin > 0 && (data.photos?.length ?? 0) < block.photoMin && (
            <p className="text-xs text-red-500">
              사진을 {block.photoMin}장 이상 추가해주세요
            </p>
          )}
        </div>
      )}

      {/* Narration preview */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-secondary mb-1.5">
          나레이션 미리보기
        </label>
        <div className="border-l-4 border-primary/40 bg-primary-light/10 p-4 rounded-r-xl">
          <p className="text-sm text-text leading-relaxed">{displayNarration}</p>
        </div>

        <label className="text-sm font-medium text-text-secondary mb-1.5">
          나레이션 수정
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="직접 나레이션을 수정할 수 있어요"
          maxLength={150}
          value={data.narration ?? ''}
          onChange={e => onChange({ narration: e.target.value })}
        />
        <span className="text-xs text-text-muted text-right">
          {(data.narration ?? '').length}/150
        </span>
      </div>

      {/* Next button */}
      <button
        type="button"
        disabled={nextDisabled}
        className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onNext}
      >
        다음
      </button>
    </div>
  )
}
