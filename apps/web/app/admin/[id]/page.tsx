'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Tab = 'refs' | 'story' | 'scenes' | 'tts' | 'bgm'

export default function AdminProjectPage() {
  const { id } = useParams()
  const [tab, setTab] = useState<Tab>('refs')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  // Step 1: Character references
  const [groomRefs, setGroomRefs] = useState<any[]>([])
  const [brideRefs, setBrideRefs] = useState<any[]>([])
  const [selectedGroom, setSelectedGroom] = useState<number | null>(null)
  const [selectedBride, setSelectedBride] = useState<number | null>(null)
  const [groomFixed, setGroomFixed] = useState('')
  const [brideFixed, setBrideFixed] = useState('')

  // Step 2-3: Story & Scenes
  const [story, setStory] = useState<any>(null)
  const [sceneImages, setSceneImages] = useState<any[]>([])

  // Step 4: TTS
  const [voiceSamples, setVoiceSamples] = useState<any[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)

  // Step 5: BGM
  const [bgmCandidates, setBgmCandidates] = useState<any[]>([])
  const [selectedBgm, setSelectedBgm] = useState<string | null>(null)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'refs', label: '1. 캐릭터 선택' },
    { key: 'story', label: '2. 스토리' },
    { key: 'scenes', label: '3. 씬 이미지' },
    { key: 'tts', label: '4. TTS 선택' },
    { key: 'bgm', label: '5. BGM 선택' },
  ]

  // Generate refs (step 1)
  async function handleGenerateRefs() {
    setLoading(true)
    setStatus('캐릭터 레퍼런스 생성 중...')
    try {
      const res = await fetch(`${API}/api/projects/${id}/generate-refs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'admin' },
        body: JSON.stringify({
          groomPhotoBase64: '',
          bridePhotoBase64: '',
          coupleInfo: { person1: '', person2: '', proposeMessage: '' },
          styleOptions: { mood: 'fantasy', background: 'castle' },
        }),
      })
      const data = await res.json()
      setGroomRefs(data.groomRefs || [])
      setBrideRefs(data.brideRefs || [])
      setGroomFixed(data.groomFixed || '')
      setBrideFixed(data.brideFixed || '')
      setStatus('레퍼런스 생성 완료! 선택해주세요.')
    } catch (err) {
      setStatus('오류 발생: ' + String(err))
    }
    setLoading(false)
  }

  // Generate assets after ref selection (step 2)
  async function handleGenerateAssets() {
    if (selectedGroom === null || selectedBride === null) {
      setStatus('신랑/신부 레퍼런스를 모두 선택해주세요.')
      return
    }
    setLoading(true)
    setStatus('이미지 + TTS + BGM 생성 중...')
    try {
      const res = await fetch(`${API}/api/projects/${id}/generate-assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'admin' },
        body: JSON.stringify({
          coupleInfo: { person1: '', person2: '', proposeMessage: '' },
          styleOptions: { mood: 'fantasy', background: 'castle' },
          groomFixedPrompt: groomFixed,
          brideFixedPrompt: brideFixed,
          groomRefPath: groomRefs[selectedGroom]?.path,
          brideRefPath: brideRefs[selectedBride]?.path,
        }),
      })
      const data = await res.json()
      setStory(data.story)
      setSceneImages(data.sceneImages || [])
      setVoiceSamples(data.voiceSamples || [])
      setBgmCandidates(data.bgmCandidates || [])
      setStatus('소재 생성 완료!')
      setTab('scenes')
    } catch (err) {
      setStatus('오류 발생: ' + String(err))
    }
    setLoading(false)
  }

  // Generate full narration after voice selection (step 4)
  async function handleGenerateNarration() {
    if (!selectedVoice || !story) return
    setLoading(true)
    setStatus('전체 나레이션 생성 중...')
    try {
      const scenes = story.acts.flatMap((a: any) =>
        a.scenes.map((s: any, si: number) => ({
          sceneId: `act${a.act}_scene${si + 1}`,
          narration: s.narration,
          emotion: s.emotion,
        }))
      )
      await fetch(`${API}/api/projects/${id}/generate-narration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'admin' },
        body: JSON.stringify({ scenes, voiceName: selectedVoice }),
      })
      setStatus('나레이션 생성 완료!')
    } catch (err) {
      setStatus('오류 발생: ' + String(err))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-subtle">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-base font-semibold text-text">관리자</Link>
            <span className="text-text-muted">/</span>
            <span className="text-sm text-text-secondary">프로젝트 소재 관리</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-text">프로젝트 소재 관리</h1>
          <p className="text-sm text-text-muted mt-1">ID: {id}</p>
        </div>

        {/* Status banner */}
        {status && (
          <div className="my-4 p-3 bg-primary-light/30 text-primary rounded-xl text-sm flex items-center gap-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
            )}
            {status}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mt-6 mb-6 border-b border-border overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'bg-bg-card border border-border border-b-bg-card -mb-px text-primary'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-bg-card rounded-2xl border border-border p-6">

          {/* Tab 1: Character References */}
          {tab === 'refs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-text">캐릭터 레퍼런스</h2>
                <button
                  onClick={handleGenerateRefs}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  생성하기
                </button>
              </div>

              {groomRefs.length > 0 && (
                <>
                  <h3 className="font-medium text-text mb-2">신랑 후보</h3>
                  <p className="text-xs text-text-muted mb-2">{groomFixed}</p>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {groomRefs.map((ref: any, i: number) => (
                      <div
                        key={i}
                        onClick={() => setSelectedGroom(i)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                          selectedGroom === i
                            ? 'border-primary ring-2 ring-primary-light/50'
                            : 'border-border hover:border-border-hover'
                        }`}
                      >
                        <img
                          src={`${API}/files/${ref.path}`}
                          alt={`Groom v${i + 1}`}
                          className="w-full aspect-[3/4] object-cover"
                        />
                        <p className="text-xs text-center py-1 text-text-secondary">v{i + 1}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-medium text-text mb-2">신부 후보</h3>
                  <p className="text-xs text-text-muted mb-2">{brideFixed}</p>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {brideRefs.map((ref: any, i: number) => (
                      <div
                        key={i}
                        onClick={() => setSelectedBride(i)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                          selectedBride === i
                            ? 'border-accent ring-2 ring-accent/30'
                            : 'border-border hover:border-border-hover'
                        }`}
                      >
                        <img
                          src={`${API}/files/${ref.path}`}
                          alt={`Bride v${i + 1}`}
                          className="w-full aspect-[3/4] object-cover"
                        />
                        <p className="text-xs text-center py-1 text-text-secondary">v{i + 1}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleGenerateAssets}
                    disabled={loading || selectedGroom === null || selectedBride === null}
                    className="w-full py-3 bg-success text-white rounded-xl hover:bg-success/90 disabled:opacity-50 font-semibold text-sm transition-colors"
                  >
                    선택 완료 → 소재 생성 시작
                  </button>
                </>
              )}
            </div>
          )}

          {/* Tab 2: Story */}
          {tab === 'story' && (
            <div>
              <h2 className="text-lg font-bold text-text mb-4">스토리</h2>
              {story ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-text text-lg">{story.title}</h3>
                  {story.acts?.map((act: any) => (
                    <div key={act.act} className="border border-border rounded-xl p-4">
                      <h4 className="font-medium text-text mb-2">Act {act.act}: {act.title}</h4>
                      {act.scenes?.map((scene: any, si: number) => (
                        <div key={si} className="ml-4 mb-3 text-sm">
                          <p className="text-text-secondary">{scene.narration}</p>
                          <p className="text-xs text-text-muted mt-1">
                            [{scene.emotion}] {scene.durationSec}s
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">아직 스토리가 생성되지 않았습니다.</p>
              )}
            </div>
          )}

          {/* Tab 3: Scene Images */}
          {tab === 'scenes' && (
            <div>
              <h2 className="text-lg font-bold text-text mb-4">씬 이미지</h2>
              {sceneImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {sceneImages.map((img: any, i: number) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-border">
                      <img
                        src={`${API}/files/${img.s3Key}`}
                        alt={`Scene ${i + 1}`}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-sm text-text-secondary">Scene {i + 1}</span>
                        <button className="text-xs px-3 py-1 border border-border text-text-secondary rounded-lg hover:bg-bg-subtle transition-colors">
                          재생성
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">아직 이미지가 생성되지 않았습니다.</p>
              )}
            </div>
          )}

          {/* Tab 4: TTS Voice Selection */}
          {tab === 'tts' && (
            <div>
              <h2 className="text-lg font-bold text-text mb-4">TTS 음성 선택</h2>
              {voiceSamples.length > 0 ? (
                <div className="space-y-3">
                  {voiceSamples.map((sample: any) => (
                    <div
                      key={sample.voice}
                      onClick={() => setSelectedVoice(sample.voice)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedVoice === sample.voice
                          ? 'border-primary bg-primary-light/30'
                          : 'border-border hover:border-border-hover'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-text">{sample.voice}</p>
                        <p className="text-sm text-text-secondary">{sample.desc}</p>
                      </div>
                      <audio controls src={`${API}/files/${sample.path}`} className="h-8" />
                    </div>
                  ))}
                  <button
                    onClick={handleGenerateNarration}
                    disabled={loading || !selectedVoice}
                    className="w-full py-3 bg-success text-white rounded-xl hover:bg-success/90 disabled:opacity-50 font-semibold text-sm transition-colors mt-4"
                  >
                    {selectedVoice} 음성으로 전체 나레이션 생성
                  </button>
                </div>
              ) : (
                <p className="text-text-muted">아직 음성 샘플이 생성되지 않았습니다.</p>
              )}
            </div>
          )}

          {/* Tab 5: BGM Selection */}
          {tab === 'bgm' && (
            <div>
              <h2 className="text-lg font-bold text-text mb-4">BGM 선택</h2>
              {bgmCandidates.length > 0 ? (
                <div className="space-y-3">
                  {bgmCandidates.map((bgm: any) => (
                    <div
                      key={bgm.mood}
                      onClick={() => setSelectedBgm(bgm.mood)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedBgm === bgm.mood
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-border-hover'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-text capitalize">{bgm.mood}</p>
                        <p className="text-sm text-text-secondary">{bgm.desc}</p>
                      </div>
                      <audio controls src={`${API}/files/${bgm.path}`} className="h-8" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">아직 BGM이 생성되지 않았습니다.</p>
              )}
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="mt-6 text-center">
          <a
            href={`${API}/api/projects/${id}/download-assets`}
            className="inline-block px-6 py-3 bg-text text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            전체 소재 다운로드
          </a>
        </div>
      </div>
    </div>
  )
}
