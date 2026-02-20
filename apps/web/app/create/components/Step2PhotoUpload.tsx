'use client'
import { useState, useRef } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type UploadedPhoto = { photoId: string; s3Key: string; fileName: string; isFacePrimary: boolean }

export function Step2PhotoUpload({ projectId, onNext }: { projectId: string; onNext: () => void }) {
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
    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-5">
      <h2 className="text-2xl font-bold text-white text-center">함께한 사진을 올려주세요</h2>
      <p className="text-purple-200 text-sm text-center">💡 얼굴이 잘 보이는 사진 1장은 필수예요 (최대 10장)</p>

      <div className="grid grid-cols-4 gap-3">
        {photos.map(p => (
          <div key={p.photoId} onClick={() => setPrimary(p.photoId)}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${p.isFacePrimary ? 'border-yellow-400' : 'border-purple-600'}`}>
            <div className="w-full h-full bg-purple-700 flex items-center justify-center">
              <span className="text-white text-xs text-center px-1">{p.fileName}</span>
            </div>
            {p.isFacePrimary && <div className="absolute top-1 right-1 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs text-purple-900 font-bold">★</div>}
          </div>
        ))}
        {photos.length < 10 && (
          <div onClick={() => fileRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-purple-500 flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
            <span className="text-3xl text-purple-400">+</span>
          </div>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

      {uploading && <p className="text-yellow-400 text-center text-sm animate-pulse">업로드 중...</p>}

      <button onClick={onNext} disabled={photos.length === 0 || uploading}
        className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold rounded-xl text-lg transition-colors disabled:opacity-50">
        다음 단계 →
      </button>
    </div>
  )
}
