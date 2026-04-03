# 소재 생성 파이프라인 구현 플랜

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 유저 입력 → 디즈니 Pixar 3D 스타일 이미지/TTS/BGM 소재 자동 생성 파이프라인 구축

**Architecture:** Express API 서비스에서 Gemini Pro Image(이미지), Gemini TTS(나레이션), Lyria 3 Pro(BGM)를 호출하여 소재를 생성하고, 관리자 대시보드에서 후보 선택/재생성을 수행하는 구조. 모든 AI 생성물은 3~5개 후보 생성 → 선택 패턴.

**Tech Stack:** Express 5, TypeScript, @google/genai SDK, Prisma 7, Next.js 16, React 19

**기존 코드베이스:**
- API: `apps/api/src/` (routes, services, workers, lib)
- Web: `apps/web/app/` (Next.js pages, create wizard, dashboard)
- 이미 변경됨: `imageGenerator.ts` (Gemini Pro Image), `storyGenerator.ts` (서술형 프롬프트)

---

## Task 1: Gemini Client — API 키 로테이션 + 재시도

**Files:**
- Create: `apps/api/src/lib/geminiClient.ts`
- Test: `apps/api/src/tests/geminiClient.test.ts`

모든 Gemini API 호출의 기반. img_gen의 `gemini_client.py` 패턴을 TypeScript로 포팅.

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/geminiClient.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('GeminiClient', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'key1'
    process.env.GEMINI_API_KEY_2 = 'key2'
    process.env.GEMINI_API_KEY_3 = 'key3'
  })

  it('should collect all available API keys', async () => {
    const { getAvailableKeys } = await import('../lib/geminiClient')
    const keys = getAvailableKeys()
    expect(keys.length).toBe(3)
  })

  it('should rotate to next key', async () => {
    const { rotateKey, getCurrentKeyIndex } = await import('../lib/geminiClient')
    expect(getCurrentKeyIndex()).toBe(0)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(1)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(2)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(0) // wraps around
  })
})
```

**Step 2: 테스트 실패 확인**

```bash
cd apps/api && npx vitest run src/tests/geminiClient.test.ts
```
Expected: FAIL — module not found

**Step 3: 구현**

```typescript
// apps/api/src/lib/geminiClient.ts
import { GoogleGenAI } from '@google/genai'

const KEY_ENV_NAMES = [
  'GEMINI_API_KEY',
  'GEMINI_API_KEY_2',
  'GEMINI_API_KEY_3',
  'GEMINI_API_KEY_4',
]

let _keys: string[] = []
let _currentIdx = 0

export function getAvailableKeys(): string[] {
  if (_keys.length === 0) {
    _keys = KEY_ENV_NAMES
      .map(name => process.env[name])
      .filter((k): k is string => !!k && k.length > 0)
  }
  return _keys
}

export function getCurrentKeyIndex(): number {
  return _currentIdx
}

export function rotateKey(): void {
  const keys = getAvailableKeys()
  _currentIdx = (_currentIdx + 1) % keys.length
}

export function getClient(): GoogleGenAI {
  const keys = getAvailableKeys()
  if (keys.length === 0) throw new Error('No Gemini API keys configured')
  return new GoogleGenAI({ apiKey: keys[_currentIdx] })
}

export async function callWithRetry<T>(
  fn: (client: GoogleGenAI) => Promise<T>,
  maxRetriesPerKey = 3
): Promise<T> {
  const keys = getAvailableKeys()
  const triedKeys = new Set<number>()

  while (triedKeys.size < keys.length) {
    const client = getClient()
    triedKeys.add(_currentIdx)

    for (let attempt = 0; attempt < maxRetriesPerKey; attempt++) {
      try {
        return await fn(client)
      } catch (err: any) {
        const msg = String(err?.message || err)
        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`[geminiClient] Key ${_currentIdx} exhausted, rotating...`)
          break // try next key
        }
        if (attempt < maxRetriesPerKey - 1) {
          console.warn(`[geminiClient] Attempt ${attempt + 1} failed, retrying in 3s...`)
          await new Promise(r => setTimeout(r, 3000))
        }
      }
    }
    rotateKey()
  }

  throw new Error('All Gemini API keys exhausted after retries')
}
```

**Step 4: 테스트 통과 확인**

```bash
cd apps/api && npx vitest run src/tests/geminiClient.test.ts
```
Expected: PASS

**Step 5: 커밋**

```bash
git add apps/api/src/lib/geminiClient.ts apps/api/src/tests/geminiClient.test.ts
git commit -m "feat: add Gemini client with API key rotation and retry"
```

---

## Task 2: Fixed Prompt 추출기 — Gemini Vision으로 외형 분석

**Files:**
- Create: `apps/api/src/services/fixedPromptExtractor.ts`
- Test: `apps/api/src/tests/fixedPromptExtractor.test.ts`

유저 사진에서 캐릭터 외형을 영어 텍스트로 자동 추출. 모든 씬 이미지 프롬프트에 삽입되어 캐릭터 일관성의 핵심.

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/fixedPromptExtractor.test.ts
import { describe, it, expect } from 'vitest'
import { buildExtractionPrompt } from '../services/fixedPromptExtractor'

describe('fixedPromptExtractor', () => {
  it('should build extraction prompt with role', () => {
    const prompt = buildExtractionPrompt('groom')
    expect(prompt).toContain('age')
    expect(prompt).toContain('hair')
    expect(prompt).toContain('build')
    expect(prompt).toContain('groom')
  })

  it('should build extraction prompt for bride', () => {
    const prompt = buildExtractionPrompt('bride')
    expect(prompt).toContain('bride')
  })
})
```

**Step 2: 테스트 실패 확인**

**Step 3: 구현**

```typescript
// apps/api/src/services/fixedPromptExtractor.ts
import { callWithRetry } from '../lib/geminiClient'

const EXTRACTION_PROMPT = (role: string) => `Analyze this photo of the ${role} and describe their appearance in a single English sentence for use as a character description in Disney Pixar 3D animation style image generation.

Format (follow exactly):
Korean [man/woman] [age range], [build], [face shape], [eye description], [hair style and color], [skin tone], [overall vibe/aura]

Example:
Korean man early 30s, athletic build, angular jaw, warm brown eyes, short neat dark hair parted to the side, tan skin, confident warm smile

Rules:
- English only, one sentence
- Be specific about hair (length, style, color, parting)
- Include approximate age range
- Describe build/body type
- Note distinctive features
- Keep it under 40 words
- Do NOT include clothing (clothing changes per scene)`

export function buildExtractionPrompt(role: 'groom' | 'bride'): string {
  return EXTRACTION_PROMPT(role)
}

export async function extractFixedPrompt(
  photoBase64: string,
  role: 'groom' | 'bride'
): Promise<string> {
  if (process.env.DEMO_MODE === 'true') {
    return role === 'groom'
      ? 'Korean man early 30s, athletic build, angular jaw, warm brown eyes, short neat dark hair, tan skin, confident warm smile'
      : 'Korean woman late 20s, petite build, soft oval face, large gentle brown eyes, long straight black hair with middle part, fair skin, bright lovely smile'
  }

  const prompt = buildExtractionPrompt(role)

  return callWithRetry(async (client) => {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-preview-05-20',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: photoBase64 } },
            { text: prompt },
          ],
        },
      ],
    })

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) throw new Error('Failed to extract appearance description')
    return text.trim()
  })
}
```

**Step 4: 테스트 통과 확인**

**Step 5: 커밋**

```bash
git add apps/api/src/services/fixedPromptExtractor.ts apps/api/src/tests/fixedPromptExtractor.test.ts
git commit -m "feat: add fixed prompt extractor using Gemini Vision"
```

---

## Task 3: 캐릭터 레퍼런스 생성기

**Files:**
- Create: `apps/api/src/services/characterRefGenerator.ts`
- Test: `apps/api/src/tests/characterRefGenerator.test.ts`

유저 사진 → 디즈니 Pixar 3D bust-up 포트레이트 3~5장 생성.

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/characterRefGenerator.test.ts
import { describe, it, expect } from 'vitest'
import { buildRefPrompt } from '../services/characterRefGenerator'

describe('characterRefGenerator', () => {
  it('should build reference prompt with fixed_prompt', () => {
    const prompt = buildRefPrompt('Korean man early 30s, athletic build, short dark hair')
    expect(prompt).toContain('Disney Pixar 3D')
    expect(prompt).toContain('bust-up')
    expect(prompt).toContain('Korean man early 30s')
    expect(prompt).toContain('No text')
  })
})
```

**Step 2: 테스트 실패 확인**

**Step 3: 구현**

```typescript
// apps/api/src/services/characterRefGenerator.ts
import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

const REF_PROMPT_TEMPLATE = (fixedPrompt: string) =>
`Upper body bust-up character portrait. Disney Pixar 3D animation style.
Must have Pixar-style features:
  - Large expressive eyes with light reflections
  - Smooth rounded facial features
  - Soft subsurface skin scattering
  - Stylized hair with volume and shine
NOT photorealistic. NOT 2D flat. NOT anime.
Think Pixar/Disney 3D animated movie character.
Plain white background, no objects, no scenery.
Character reference sheet. High quality, cinematic lighting.
No text, no watermark.

Character: ${fixedPrompt}`

export function buildRefPrompt(fixedPrompt: string): string {
  return REF_PROMPT_TEMPLATE(fixedPrompt)
}

export async function generateCharacterRefs({
  projectId,
  role,
  fixedPrompt,
  photoBase64,
  count = 4,
}: {
  projectId: string
  role: 'groom' | 'bride'
  fixedPrompt: string
  photoBase64: string
  count?: number
}): Promise<Array<{ path: string; url: string }>> {
  if (process.env.DEMO_MODE === 'true') {
    return Array.from({ length: count }, (_, i) => ({
      path: `character_refs/${projectId}/${role}_v${i + 1}.png`,
      url: `/local/character_refs/${projectId}/${role}_v${i + 1}.png`,
    }))
  }

  const prompt = buildRefPrompt(fixedPrompt)
  const results: Array<{ path: string; url: string }> = []

  for (let i = 0; i < count; i++) {
    const buffer = await callWithRetry(async (client) => {
      const response = await client.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: photoBase64 } },
              {
                text: `Use this photo as reference for the character's face and features.
Convert into Disney Pixar 3D animation style while preserving distinctive features.
Do not copy the photo — reimagine as an animated character.

${prompt}`,
              },
            ],
          },
        ],
        config: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '3:4', imageSize: '1K' },
        },
      })

      const part = response.candidates?.[0]?.content?.parts?.find(
        (p: any) => p.inlineData
      )
      if (!part?.inlineData) throw new Error('No image in response')
      return Buffer.from(part.inlineData.data!, 'base64')
    })

    const subPath = `character_refs/${projectId}/${role}_v${i + 1}_${uuid().slice(0, 8)}.png`
    const url = saveFile(subPath, buffer)
    results.push({ path: subPath, url })
  }

  return results
}
```

**Step 4: 테스트 통과 확인**

**Step 5: 커밋**

```bash
git add apps/api/src/services/characterRefGenerator.ts apps/api/src/tests/characterRefGenerator.test.ts
git commit -m "feat: add character reference generator with multi-candidate support"
```

---

## Task 4: imageGenerator 리팩토링 — geminiClient + 레퍼런스 + 네거티브 프롬프트

**Files:**
- Modify: `apps/api/src/services/imageGenerator.ts`
- Test: `apps/api/src/tests/imageGenerator.test.ts`

이미 Gemini Pro Image로 교체했지만, geminiClient 키 로테이션 적용 + 레퍼런스 이미지 2장(신랑+신부) 첨부 + 네거티브 프롬프트 추가.

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/imageGenerator.test.ts
import { describe, it, expect } from 'vitest'
import { buildScenePrompt } from '../services/imageGenerator'

describe('imageGenerator', () => {
  it('should build prompt with style header and negative rules', () => {
    const prompt = buildScenePrompt(
      'Two people walking in a park',
      'Korean man early 30s, athletic build',
      'Korean woman late 20s, petite build'
    )
    expect(prompt).toContain('Disney Pixar 3D')
    expect(prompt).toContain('ABSOLUTELY NO TEXT')
    expect(prompt).toContain('TWO people only')
    expect(prompt).toContain('Korean man early 30s')
    expect(prompt).toContain('Korean woman late 20s')
  })
})
```

**Step 2: 테스트 실패 확인**

**Step 3: 구현**

```typescript
// apps/api/src/services/imageGenerator.ts
import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'

const STYLE_HEADER = `Disney Pixar 3D animation style, cinematic composition with professional camera work,
rich warm color palette, golden-hour lighting, volumetric light rays, lens flare,
film-quality depth of field with soft bokeh, detailed environmental storytelling.`

const NEGATIVE_RULES = `ABSOLUTELY NO TEXT, NO DIALOGUE, NO SUBTITLES, NO WATERMARKS.
No speech bubbles, no logos, no signage, no writing of any kind.
No distorted faces, no wrong anatomy, no extra limbs.`

export function buildScenePrompt(
  scenePrompt: string,
  groomFixed: string,
  brideFixed: string
): string {
  return `${STYLE_HEADER}

Scene description:
${scenePrompt}

Character consistency:
TWO people only — Groom: ${groomFixed} / Bride: ${brideFixed}

${NEGATIVE_RULES}`
}

export async function generateSceneImage({
  projectId,
  sceneId,
  prompt,
  groomFixedPrompt,
  brideFixedPrompt,
  groomRefPath,
  brideRefPath,
}: {
  projectId: string
  sceneId: string
  prompt: string
  groomFixedPrompt: string
  brideFixedPrompt: string
  groomRefPath?: string | null
  brideRefPath?: string | null
}): Promise<{ s3Key: string; imageUrl: string }> {
  if (process.env.DEMO_MODE === 'true') {
    const subPath = `images/${projectId}/${sceneId}-demo.png`
    return { s3Key: subPath, imageUrl: `/local/${subPath}` }
  }

  const fullPrompt = buildScenePrompt(prompt, groomFixedPrompt, brideFixedPrompt)

  // 레퍼런스 이미지 로드
  const refParts: any[] = []
  const storageDir = process.env.LOCAL_STORAGE_DIR || '/tmp/onceuponus'

  for (const refPath of [groomRefPath, brideRefPath]) {
    if (!refPath) continue
    try {
      const absPath = path.join(storageDir, refPath)
      const buf = fs.readFileSync(absPath)
      refParts.push({
        inlineData: { mimeType: 'image/png', data: buf.toString('base64') },
      })
    } catch {
      // 레퍼런스 없으면 텍스트만으로 진행
    }
  }

  const buffer = await callWithRetry(async (client) => {
    const contents = [
      {
        role: 'user' as const,
        parts: [
          ...refParts,
          ...(refParts.length > 0
            ? [{
                text: `Use these character reference images. Match their faces exactly in Disney Pixar 3D style.\n\n${fullPrompt}`,
              }]
            : [{ text: fullPrompt }]),
        ],
      },
    ]

    const response = await client.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
      },
    })

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )
    if (!part?.inlineData) throw new Error('No image in response')
    return Buffer.from(part.inlineData.data!, 'base64')
  })

  const subPath = `images/${projectId}/${sceneId}-${uuid()}.png`
  const imageUrl = saveFile(subPath, buffer)
  return { s3Key: subPath, imageUrl }
}
```

**Step 4: 테스트 통과 확인**

**Step 5: 커밋**

```bash
git add apps/api/src/services/imageGenerator.ts apps/api/src/tests/imageGenerator.test.ts
git commit -m "refactor: imageGenerator with key rotation, ref images, negative prompts"
```

---

## Task 5: 나레이션 생성기 — ElevenLabs → Gemini TTS

**Files:**
- Rewrite: `apps/api/src/services/narrationGenerator.ts`
- Test: `apps/api/src/tests/narrationGenerator.test.ts`

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/narrationGenerator.test.ts
import { describe, it, expect } from 'vitest'
import {
  VOICE_CANDIDATES,
  softenEmotionTag,
  buildSampleText,
} from '../services/narrationGenerator'

describe('narrationGenerator', () => {
  it('should have 5 voice candidates', () => {
    expect(VOICE_CANDIDATES.length).toBeGreaterThanOrEqual(5)
  })

  it('should soften extreme emotion tags', () => {
    expect(softenEmotionTag('Screaming')).toBe('Excited')
    expect(softenEmotionTag('Furious')).toBe('Firm and angry')
    expect(softenEmotionTag('Gentle')).toBe('Gentle') // no change
  })

  it('should build sample text', () => {
    const text = buildSampleText()
    expect(text.length).toBeGreaterThan(20)
  })
})
```

**Step 2: 테스트 실패 확인**

**Step 3: 구현**

```typescript
// apps/api/src/services/narrationGenerator.ts
import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

export const VOICE_CANDIDATES = [
  { name: 'Kore', desc: '차분하고 따뜻한 여성 (스토리텔링)', gender: 'female' },
  { name: 'Leda', desc: '부드러운 젊은 여성 (설레는 톤)', gender: 'female' },
  { name: 'Achernar', desc: '밝고 활발한 여성 (경쾌)', gender: 'female' },
  { name: 'Alnilam', desc: '중후한 중년 남성 (격식)', gender: 'male' },
  { name: 'Sadachbia', desc: '세련된 젊은 남성 (모던)', gender: 'male' },
]

const EMOTION_SOFTEN_MAP: Record<string, string> = {
  Screaming: 'Excited',
  Shouting: 'Emphatic',
  Incensed: 'Annoyed',
  Enraged: 'Frustrated',
  Furious: 'Firm and angry',
}

export function softenEmotionTag(tag: string): string {
  return EMOTION_SOFTEN_MAP[tag] || tag
}

export function buildSampleText(): string {
  return '두 사람의 이야기가 시작됩니다. 운명처럼 만난 그 날부터, 함께한 모든 순간이 기적이었습니다.'
}

export async function generateVoiceSamples({
  projectId,
}: {
  projectId: string
}): Promise<Array<{ voice: string; desc: string; path: string; url: string }>> {
  if (process.env.DEMO_MODE === 'true') {
    return VOICE_CANDIDATES.map(v => ({
      voice: v.name,
      desc: v.desc,
      path: `tts/${projectId}/samples/${v.name}.wav`,
      url: `/local/tts/${projectId}/samples/${v.name}.wav`,
    }))
  }

  const sampleText = buildSampleText()
  const results = []

  for (const voice of VOICE_CANDIDATES) {
    const buffer = await callWithRetry(async (client) => {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-pro-preview-tts',
        contents: [{ role: 'user', parts: [{ text: sampleText }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceName: voice.name,
          },
        } as any,
      })

      const part = response.candidates?.[0]?.content?.parts?.find(
        (p: any) => p.inlineData
      )
      if (!part?.inlineData) throw new Error(`TTS failed for voice ${voice.name}`)
      return Buffer.from(part.inlineData.data!, 'base64')
    })

    const subPath = `tts/${projectId}/samples/${voice.name}_${uuid().slice(0, 8)}.wav`
    const url = saveFile(subPath, buffer)
    results.push({ voice: voice.name, desc: voice.desc, path: subPath, url })
  }

  return results
}

export async function generateNarration({
  projectId,
  sceneId,
  text,
  voiceName,
  emotion,
}: {
  projectId: string
  sceneId: string
  text: string
  voiceName: string
  emotion?: string
}): Promise<{ path: string; url: string }> {
  if (process.env.DEMO_MODE === 'true') {
    const subPath = `tts/${projectId}/${sceneId}.wav`
    return { path: subPath, url: `/local/${subPath}` }
  }

  const emotionTag = emotion ? softenEmotionTag(emotion) : undefined
  const narrationText = emotionTag
    ? `[${emotionTag}] ${text}`
    : text

  const buffer = await callWithRetry(async (client) => {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-pro-preview-tts',
      contents: [{ role: 'user', parts: [{ text: narrationText }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceName,
        },
      } as any,
    })

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )
    if (!part?.inlineData) throw new Error('TTS generation failed')
    return Buffer.from(part.inlineData.data!, 'base64')
  })

  const subPath = `tts/${projectId}/${sceneId}_${uuid().slice(0, 8)}.wav`
  const url = saveFile(subPath, buffer)
  return { path: subPath, url }
}
```

**Step 4: 테스트 통과 확인**

**Step 5: 커밋**

```bash
git add apps/api/src/services/narrationGenerator.ts apps/api/src/tests/narrationGenerator.test.ts
git commit -m "feat: replace ElevenLabs with Gemini TTS, add voice candidate system"
```

---

## Task 6: BGM 생성기 — Lyria 3 Pro

**Files:**
- Create: `apps/api/src/services/bgmGenerator.ts`
- Test: `apps/api/src/tests/bgmGenerator.test.ts`

**Step 1: 테스트 작성**

```typescript
// apps/api/src/tests/bgmGenerator.test.ts
import { describe, it, expect } from 'vitest'
import { BGM_MOODS, buildBgmPrompt } from '../services/bgmGenerator'

describe('bgmGenerator', () => {
  it('should have wedding-appropriate mood presets', () => {
    expect(BGM_MOODS).toHaveProperty('romantic')
    expect(BGM_MOODS).toHaveProperty('emotional')
    expect(BGM_MOODS).toHaveProperty('celebration')
  })

  it('should build prompt with mood description', () => {
    const prompt = buildBgmPrompt('romantic')
    expect(prompt).toContain('romantic')
    expect(prompt).toContain('60')
  })
})
```

**Step 2: 테스트 실패 확인**

**Step 3: 구현**

```typescript
// apps/api/src/services/bgmGenerator.ts
import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

export const BGM_MOODS: Record<string, { desc: string; prompt: string }> = {
  romantic: {
    desc: '로맨틱 피아노 + 스트링',
    prompt: 'Gentle romantic piano melody with soft string accompaniment, warm and dreamy, wedding love story, Disney fairy tale feeling',
  },
  joyful: {
    desc: '밝고 경쾌한 오케스트라',
    prompt: 'Bright joyful orchestral piece with playful woodwinds and light percussion, happy adventure, Disney animated movie feeling',
  },
  emotional: {
    desc: '감동적인 첼로 + 피아노',
    prompt: 'Emotional cello solo with gentle piano accompaniment, touching and heartfelt, tears of joy, cinematic wedding moment',
  },
  climax: {
    desc: '풀 오케스트라 클라이맥스',
    prompt: 'Grand orchestral build-up to emotional climax, sweeping strings and brass, magical proposal moment, Disney fairy tale finale',
  },
  celebration: {
    desc: '따뜻한 축하 앙상블',
    prompt: 'Warm celebratory ensemble with acoustic guitar, gentle bells, and soft choir, gratitude and blessing, wedding reception warmth',
  },
}

export function buildBgmPrompt(mood: string): string {
  const moodConfig = BGM_MOODS[mood] || BGM_MOODS.romantic
  return `Create a 60-second background music track. ${moodConfig.prompt}. Instrumental only, no vocals, no lyrics. Suitable for wedding video background. Smooth loop-friendly ending.`
}

export async function generateBgmCandidates({
  projectId,
  count = 4,
}: {
  projectId: string
  count?: number
}): Promise<Array<{ mood: string; desc: string; path: string; url: string }>> {
  if (process.env.DEMO_MODE === 'true') {
    return Object.entries(BGM_MOODS).slice(0, count).map(([mood, config]) => ({
      mood,
      desc: config.desc,
      path: `bgm/${projectId}/${mood}.mp3`,
      url: `/local/bgm/${projectId}/${mood}.mp3`,
    }))
  }

  const results = []
  const moods = Object.entries(BGM_MOODS).slice(0, count)

  for (const [mood, config] of moods) {
    const prompt = buildBgmPrompt(mood)

    const buffer = await callWithRetry(async (client) => {
      const response = await client.models.generateContent({
        model: 'lyria-3-pro-preview',
        contents: prompt,
        config: {
          responseModalities: ['AUDIO'],
        } as any,
      })

      const part = response.candidates?.[0]?.content?.parts?.find(
        (p: any) => p.inlineData
      )
      if (!part?.inlineData) throw new Error(`BGM generation failed for mood: ${mood}`)
      return Buffer.from(part.inlineData.data!, 'base64')
    })

    const subPath = `bgm/${projectId}/${mood}_${uuid().slice(0, 8)}.mp3`
    const url = saveFile(subPath, buffer)
    results.push({ mood, desc: config.desc, path: subPath, url })
  }

  return results
}
```

**Step 4: 테스트 통과 확인**

**Step 5: 커밋**

```bash
git add apps/api/src/services/bgmGenerator.ts apps/api/src/tests/bgmGenerator.test.ts
git commit -m "feat: add BGM generator with Lyria 3 Pro and mood presets"
```

---

## Task 7: 파이프라인 오케스트레이터 — 새로운 워크플로우

**Files:**
- Create: `apps/api/src/services/assetPipeline.ts`
- Modify: `apps/api/src/workers/videoWorker.ts` (→ `assetWorker.ts`로 리네임)

기존 videoWorker의 "스토리→이미지→나레이션→영상 렌더링" 파이프라인을
"레퍼런스 생성→스토리→이미지→TTS 샘플→BGM" 소재 생성 파이프라인으로 교체.

**Step 1: 구현**

```typescript
// apps/api/src/services/assetPipeline.ts
import { extractFixedPrompt } from './fixedPromptExtractor'
import { generateCharacterRefs } from './characterRefGenerator'
import { generateStory, CoupleInfo, StyleOptions } from './storyGenerator'
import { generateSceneImage } from './imageGenerator'
import { generateVoiceSamples } from './narrationGenerator'
import { generateBgmCandidates } from './bgmGenerator'

export interface PipelineInput {
  projectId: string
  groomPhotoBase64: string
  bridePhotoBase64: string
  coupleInfo: CoupleInfo
  styleOptions: StyleOptions
}

export interface PipelineProgress {
  step: string
  percent: number
  message: string
}

type ProgressCallback = (progress: PipelineProgress) => void

export async function runAssetPipeline(
  input: PipelineInput,
  onProgress?: ProgressCallback
) {
  const { projectId, groomPhotoBase64, bridePhotoBase64, coupleInfo, styleOptions } = input

  // Step 1: 외형 추출 (5%)
  onProgress?.({ step: 'extract', percent: 5, message: '캐릭터 외형 분석 중...' })
  const groomFixed = await extractFixedPrompt(groomPhotoBase64, 'groom')
  const brideFixed = await extractFixedPrompt(bridePhotoBase64, 'bride')

  // Step 2: 캐릭터 레퍼런스 생성 (20%)
  onProgress?.({ step: 'refs', percent: 10, message: '캐릭터 레퍼런스 생성 중...' })
  const groomRefs = await generateCharacterRefs({
    projectId, role: 'groom', fixedPrompt: groomFixed, photoBase64: groomPhotoBase64, count: 4,
  })
  onProgress?.({ step: 'refs', percent: 20, message: '캐릭터 레퍼런스 생성 완료' })
  const brideRefs = await generateCharacterRefs({
    projectId, role: 'bride', fixedPrompt: brideFixed, photoBase64: bridePhotoBase64, count: 4,
  })

  // ⏸ 여기서 대기 — 관리자가 레퍼런스 선택할 때까지
  return {
    status: 'awaiting_ref_selection',
    groomFixed,
    brideFixed,
    groomRefs,
    brideRefs,
  }
}

export async function continueAfterRefSelection(input: {
  projectId: string
  coupleInfo: CoupleInfo
  styleOptions: StyleOptions
  groomFixedPrompt: string
  brideFixedPrompt: string
  groomRefPath: string
  brideRefPath: string
}, onProgress?: ProgressCallback) {
  const {
    projectId, coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  } = input

  // Step 3: 스토리 생성 (30%)
  onProgress?.({ step: 'story', percent: 30, message: '스토리 생성 중...' })
  const story = await generateStory(coupleInfo, styleOptions)

  // Step 4: 씬별 이미지 생성 (30-70%)
  const allScenes = story.acts.flatMap(a => a.scenes)
  const sceneImages = []

  for (let i = 0; i < allScenes.length; i++) {
    const scene = allScenes[i]
    const percent = 30 + Math.round((i / allScenes.length) * 40)
    onProgress?.({ step: 'images', percent, message: `이미지 생성 중... (${i + 1}/${allScenes.length})` })

    const result = await generateSceneImage({
      projectId,
      sceneId: `act${story.acts.find(a => a.scenes.includes(scene))!.act}_scene${i + 1}`,
      prompt: scene.imagePrompt,
      groomFixedPrompt,
      brideFixedPrompt,
      groomRefPath,
      brideRefPath,
    })
    sceneImages.push(result)
  }

  // Step 5: TTS 음성 샘플 생성 (75%)
  onProgress?.({ step: 'tts', percent: 75, message: 'TTS 음성 샘플 생성 중...' })
  const voiceSamples = await generateVoiceSamples({ projectId })

  // Step 6: BGM 후보 생성 (90%)
  onProgress?.({ step: 'bgm', percent: 90, message: 'BGM 생성 중...' })
  const bgmCandidates = await generateBgmCandidates({ projectId, count: 4 })

  onProgress?.({ step: 'done', percent: 100, message: '소재 생성 완료!' })

  // ⏸ 다시 대기 — TTS 음성/BGM 선택 후 전체 나레이션 생성
  return {
    status: 'awaiting_voice_bgm_selection',
    story,
    sceneImages,
    voiceSamples,
    bgmCandidates,
  }
}
```

**Step 2: 커밋**

```bash
git add apps/api/src/services/assetPipeline.ts
git commit -m "feat: add asset pipeline orchestrator with selection checkpoints"
```

---

## Task 8: API 라우트 — 소재 생성 + 후보 선택

**Files:**
- Create: `apps/api/src/routes/assets.ts`
- Modify: `apps/api/src/routes/index.ts` (라우트 등록)

**Step 1: 구현**

```typescript
// apps/api/src/routes/assets.ts
import { Router } from 'express'
import { runAssetPipeline, continueAfterRefSelection } from '../services/assetPipeline'
import { generateNarration } from '../services/narrationGenerator'
import { generateSceneImage } from '../services/imageGenerator'
import { generateCharacterRefs } from '../services/characterRefGenerator'
import fs from 'fs'
import path from 'path'

const router = Router()
const STORAGE_DIR = process.env.LOCAL_STORAGE_DIR || '/tmp/onceuponus'

// 1단계: 캐릭터 레퍼런스 생성
router.post('/projects/:id/generate-refs', async (req, res) => {
  const { groomPhotoBase64, bridePhotoBase64, coupleInfo, styleOptions } = req.body

  const result = await runAssetPipeline({
    projectId: req.params.id,
    groomPhotoBase64,
    bridePhotoBase64,
    coupleInfo,
    styleOptions,
  })

  res.json(result)
})

// 2단계: 레퍼런스 선택 후 이미지+TTS+BGM 생성
router.post('/projects/:id/generate-assets', async (req, res) => {
  const {
    coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  } = req.body

  const result = await continueAfterRefSelection({
    projectId: req.params.id,
    coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  })

  res.json(result)
})

// 3단계: 음성 선택 후 전체 나레이션 생성
router.post('/projects/:id/generate-narration', async (req, res) => {
  const { scenes, voiceName } = req.body
  const projectId = req.params.id
  const results = []

  for (const scene of scenes) {
    const result = await generateNarration({
      projectId,
      sceneId: scene.sceneId,
      text: scene.narration,
      voiceName,
      emotion: scene.emotion,
    })
    results.push(result)
  }

  res.json({ narrations: results })
})

// 개별 씬 이미지 재생성
router.post('/projects/:id/regenerate-scene', async (req, res) => {
  const { sceneId, prompt, groomFixedPrompt, brideFixedPrompt, groomRefPath, brideRefPath } = req.body

  const result = await generateSceneImage({
    projectId: req.params.id,
    sceneId, prompt,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  })

  res.json(result)
})

// 캐릭터 레퍼런스 재생성 (추가 후보)
router.post('/projects/:id/regenerate-ref', async (req, res) => {
  const { role, fixedPrompt, photoBase64, count } = req.body

  const refs = await generateCharacterRefs({
    projectId: req.params.id,
    role, fixedPrompt, photoBase64,
    count: count || 2,
  })

  res.json({ refs })
})

// 전체 소재 ZIP 다운로드 (간단 구현)
router.get('/projects/:id/download-assets', async (req, res) => {
  const projectDir = path.join(STORAGE_DIR, 'images', req.params.id)
  if (!fs.existsSync(projectDir)) {
    return res.status(404).json({ error: 'No assets found' })
  }
  // 실제로는 archiver 등으로 ZIP 생성
  res.json({ message: 'Download endpoint — ZIP 생성 구현 필요', projectDir })
})

export default router
```

**Step 2: routes/index.ts 수정**

```typescript
// apps/api/src/routes/index.ts 에 추가
import assetsRouter from './assets'
router.use(assetsRouter)
```

**Step 3: 커밋**

```bash
git add apps/api/src/routes/assets.ts apps/api/src/routes/index.ts
git commit -m "feat: add asset generation API routes with selection endpoints"
```

---

## Task 9: 관리자 대시보드 — 후보 선택 UI

**Files:**
- Create: `apps/web/app/admin/[id]/page.tsx`
- Create: `apps/web/app/admin/page.tsx`

**Step 1: 관리자 주문 목록 페이지**

```tsx
// apps/web/app/admin/page.tsx
// 프로젝트 목록 + 상태 표시 (기존 dashboard 패턴 참고)
// GET /api/projects → 목록 렌더
```

**Step 2: 프로젝트별 소재 관리 페이지**

```tsx
// apps/web/app/admin/[id]/page.tsx
// 5단계 탭 인터페이스:
// Tab 1: 캐릭터 선택 — 3~5개 썸네일 → 클릭 선택 / 재생성 버튼
// Tab 2: 스토리 확인 — JSON 미리보기 / 재생성 버튼
// Tab 3: 씬 이미지 — 씬별 이미지 갤러리 / 개별 재생성
// Tab 4: TTS 선택 — 음성 후보 오디오 플레이어 → 선택
// Tab 5: BGM 선택 — BGM 후보 오디오 플레이어 → 선택
// 하단: 전체 소재 ZIP 다운로드 버튼
```

이 페이지의 상세 구현은 기존 `apps/web/app/dashboard/page.tsx`와 `apps/web/app/projects/[id]/edit/page.tsx`의 패턴을 따르되, 관리자 전용 기능(후보 선택, 재생성)을 추가.

**Step 3: 커밋**

```bash
git add apps/web/app/admin/
git commit -m "feat: add admin dashboard for asset selection and management"
```

---

## Task 10: .env 업데이트 + 통합 테스트

**Files:**
- Modify: `.env.example`
- Modify: `apps/api/src/tests/e2e.test.ts`

**Step 1: .env.example 최종 업데이트**

```env
# Gemini API (이미지 + 스토리 + TTS + BGM 통합)
GEMINI_API_KEY=          # https://aistudio.google.com — 메인 키
GEMINI_API_KEY_2=        # 백업 키 (선택)
GEMINI_API_KEY_3=        # 백업 키 (선택)
GEMINI_API_KEY_4=        # 백업 키 (선택)
```

**Step 2: 데모 모드 통합 테스트**

```typescript
// DEMO_MODE=true로 전체 파이프라인 흐름 검증
// 실제 API 호출 없이 mock 데이터로 파이프라인 동작 확인
```

**Step 3: 커밋**

```bash
git add .env.example apps/api/src/tests/
git commit -m "chore: update env config and add integration test"
```

---

## 구현 순서 요약

| Task | 내용 | 의존성 | 예상 시간 |
|------|------|--------|----------|
| 1 | Gemini Client (키 로테이션) | 없음 | 기반 |
| 2 | Fixed Prompt 추출기 | Task 1 | |
| 3 | 캐릭터 레퍼런스 생성기 | Task 1 | |
| 4 | imageGenerator 리팩토링 | Task 1 | |
| 5 | 나레이션 생성기 (Gemini TTS) | Task 1 | |
| 6 | BGM 생성기 (Lyria 3 Pro) | Task 1 | |
| 7 | 파이프라인 오케스트레이터 | Task 2-6 | |
| 8 | API 라우트 | Task 7 | |
| 9 | 관리자 대시보드 UI | Task 8 | |
| 10 | 환경설정 + 통합 테스트 | Task 1-9 | |

**병렬 가능:** Task 2, 3, 4, 5, 6은 모두 Task 1에만 의존하므로 병렬 실행 가능.
