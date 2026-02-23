'use client'
import { useState, useRef } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type UploadedPhoto = { photoId: string; s3Key: string; fileName: string; isFacePrimary: boolean }

export function Step2PhotoUpload({ projectId, onNext }: { projectId: string; onNext: (photos: UploadedPhoto[]) => void }) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const { data } = await axios.post(`${API}/api/projects/${projectId}/photos`, {
        fileName: file.name,
        contentType: file.type,
        isFacePrimary: photos.length === 0 && i === 0,
        order: photos.length + i
      }, { headers: { 'x-user-id': 'temp-user' } })

      await fetch(data.uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
      setPhotos(prev => [...prev, { photoId: data.photoId, s3Key: data.s3Key, fileName: file.name, isFacePrimary: photos.length === 0 && i === 0 }])
    }
    setUploading(false)
  }

  const setPrimary = (photoId: string) => {
    setPhotos(prev => prev.map(p => ({ ...p, isFacePrimary: p.photoId === photoId })))
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">함께한 사진을 올려주세요</h2>
        <p className="text-sm text-gray-400">얼굴이 잘 보이는 사진 1장은 필수예요 · 최대 10장</p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-4 gap-3">
        {photos.map(p => (
          <div
            key={p.photoId}
            onClick={() => setPrimary(p.photoId)}
            className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
              p.isFacePrimary ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-2 leading-tight">{p.fileName}</span>
            </div>
            {p.isFacePrimary && (
              <div className="absolute top-1.5 right-1.5 bg-indigo-600 rounded-full w-5 h-5 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {photos.length < 10 && (
          <div
            onClick={() => fileRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors gap-1"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs text-gray-400">추가</span>
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <p className="text-xs text-gray-400">별 표시된 사진이 AI 캐릭터 변환의 기준 사진이 됩니다. 클릭해서 변경하세요.</p>
      )}

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-indigo-600">
          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          업로드 중...
        </div>
      )}

      <button
        onClick={() => onNext(photos)}
        disabled={photos.length === 0 || uploading}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
