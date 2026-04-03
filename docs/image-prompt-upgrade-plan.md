# 이미지 프롬프트 & 생성 파이프라인 업그레이드 최종안

> 목표: 숨고 잇다CG 수준의 디즈니 애니메이션 스타일 결과물 달성
> 모델: Google Gemini Pro Image (`gemini-3-pro-image-preview`)

---

## 1. 현재 → 변경 요약

| 항목 | AS-IS | TO-BE |
|------|-------|-------|
| 이미지 모델 | HuggingFace FLUX.1-schnell | Google Gemini 3 Pro Image |
| SDK | `@huggingface/inference` | `@google/genai` (신규 설치) |
| 해상도 | 1280x720 | 1K~2K (16:9) |
| 프롬프트 길이 | ~20단어 + 짧은 suffix | 60~100단어 서술형 |
| 스타일 지시 | suffix 한 줄 | 씬별 맞춤 서술 |
| 캐릭터 일관성 | 없음 | 레퍼런스 이미지 활용 |

---

## 2. SDK 변경

현재 설치된 `@google/generative-ai@0.24.1`은 텍스트 전용 구버전.
Gemini 3 Pro Image는 **새로운 SDK**가 필요:

```bash
npm install @google/genai
```

API 호출 형식:

```typescript
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents: fullPrompt,
  config: {
    responseModalities: ['IMAGE'],
    imageConfig: {
      aspectRatio: '16:9',
      imageSize: '1K',       // '512' | '1K' | '2K' | '4K'
    },
  },
})

// 이미지 추출
const imagePart = response.candidates[0].content.parts
  .find(p => p.inlineData)
const buffer = Buffer.from(imagePart.inlineData.data, 'base64')
```

---

## 3. imageGenerator.ts 변경안

```typescript
import { GoogleGenAI } from '@google/genai'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const STYLE_INSTRUCTION = `You are generating a single frame from a Disney Pixar 3D animated short film.
Follow these visual rules strictly:
- Pixar-quality 3D character design: large expressive eyes, smooth rounded features, soft subsurface skin scattering
- Cinematic composition with professional camera work (rule of thirds, leading lines)
- Rich warm color palette with golden-hour lighting, volumetric light rays, lens flare
- Detailed environmental storytelling: every background element reinforces the emotion
- Film-quality depth of field with soft bokeh on background elements
- Characters should convey emotion through body language, facial expression, and posture
- NO text, watermarks, or UI elements in the image`

export async function generateSceneImage({
  projectId,
  sceneId,
  prompt,
}: {
  projectId: string
  sceneId: string
  prompt: string
  faceImageUrl?: string | null
}): Promise<{ s3Key: string; imageUrl: string }> {

  const fullPrompt = `${STYLE_INSTRUCTION}\n\nScene description:\n${prompt}`

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: fullPrompt,
    config: {
      responseModalities: ['IMAGE'],
      imageConfig: {
        aspectRatio: '16:9',
        imageSize: '1K',
      },
    },
  })

  const imagePart = response.candidates![0].content!.parts!
    .find((p: any) => p.inlineData)

  if (!imagePart?.inlineData) {
    throw new Error('Image generation failed: no image in response')
  }

  const buffer = Buffer.from(imagePart.inlineData.data!, 'base64')
  const subPath = `images/${projectId}/${sceneId}-${uuid()}.png`
  const imageUrl = saveFile(subPath, buffer)

  return { s3Key: subPath, imageUrl }
}
```

---

## 4. storyGenerator.ts SYSTEM_PROMPT 변경안

핵심 변경: `imagePrompt` 생성 규칙을 **서술형(narrative)** 으로 전면 교체.
Google 공식 가이드에서도 "키워드 나열보다 서술형 문장이 훨씬 좋은 결과를 낸다"고 명시.

```typescript
const SYSTEM_PROMPT = `당신은 디즈니 예고편 스타일의 감성적인 사랑 이야기를 만드는 스토리작가입니다.
커플 정보를 받아 4막 구조(만남-여정-시련-프로포즈)의 60~90초 분량 영상 스토리를 만들어주세요.

## imagePrompt 작성 규칙 (매우 중요 - 반드시 준수)

모든 imagePrompt는 영어로, 서술형 문장(narrative paragraph)으로 작성하세요.
키워드 나열이 아니라, 하나의 영화 장면을 묘사하듯 자연스러운 문장으로 써야 합니다.

필수 포함 요소 (5가지):
1. 캐릭터 묘사: 성별, 머리 스타일(black hair 등), 의상(casual dress, suit 등), 표정(smiling warmly, eyes sparkling with tears of joy), 포즈와 제스처
2. 배경/환경: 구체적 장소, 시간대(golden hour, starlit night), 날씨, 계절감, 소품
3. 카메라 구도: medium close-up, wide establishing shot, low-angle, over-the-shoulder 등
4. 조명/색감: warm amber glow, soft pink sunset, cool moonlight blue 등
5. 감정/분위기: 장면이 전달하는 핵심 감정을 분위기로 표현

작성 예시:
- BAD: "Disney style, couple meeting, cafe, romantic"
- GOOD: "A medium close-up of a young Korean woman with long black hair in a cream knit sweater, turning around in surprise at a cozy wooden cafe. A young man with short dark hair in a navy coat stands in the doorway holding a single rose, afternoon sunlight streaming through the window casting warm golden rays across both their faces. Their eyes meet for the first time, capturing a moment of instant connection. Shallow depth of field with blurred cafe patrons and hanging Edison bulbs in the background."

주의사항:
- 두 주인공의 외형(머리색: black hair, 피부: East Asian features)을 모든 씬에서 일관되게 유지
- 매 씬마다 카메라 구도를 변화시켜 시각적 단조로움 방지
- Act 1→4로 갈수록 색감을 점점 따뜻하고 화려하게 (cool blue → warm gold → vibrant sunset → magical sparkle)
- 프로포즈 씬은 반드시 dramatic wide shot + magical elements(floating lanterns, sparkles, aurora) 포함

반드시 다음 JSON 형식으로만 응답하세요 (마크다운 없이 순수 JSON):
{
  "title": "스토리 제목",
  "acts": [
    {
      "act": 1,
      "title": "막 제목",
      "scenes": [
        {
          "imagePrompt": "위 규칙을 따른 60단어 이상의 서술형 영어 프롬프트",
          "narration": "한국어 나레이션 텍스트",
          "emotion": "wonder | joy | tension | love | nostalgia | hope",
          "durationSec": 4
        }
      ]
    }
  ]
}`
```

---

## 5. 씬별 카메라/색감 가이드

스토리 생성 시 Gemini에게 전달할 씬 연출 가이드:

| Act | 감정 | 카메라 구도 | 색감/조명 | 배경 키워드 |
|-----|------|------------|----------|------------|
| 1. 만남 | wonder, curiosity | medium close-up, eye-level | soft natural daylight, cool blue-white | cafe, campus, park, bookstore |
| 2. 여정 | joy, nostalgia | wide shot, tracking shot | warm golden hour, amber tones | travel, beach sunset, cherry blossoms, night market |
| 3. 시련 | tension, hope | close-up (표정), dutch angle | moody blue, rain, dim warm lamp | rainy window, empty bench, phone screen glow |
| 4. 프로포즈 | love, wonder | dramatic wide → intimate close-up | magical warm sparkle, floating lights | castle terrace, rooftop sunset, lantern-lit garden |

---

## 6. MOOD_MAP / BACKGROUND_MAP 개선안

```typescript
const MOOD_MAP: Record<string, string> = {
  fantasy: 'an enchanted fairy tale world where magic shimmers in the air, with floating crystals, glowing flora, and a sky painted in pastel aurora colors',
  romantic: 'a dreamy European old town at golden hour, with cobblestone streets reflecting warm light, flower-filled balconies, and the distant sound of a violin',
  adventure: 'a breathtaking panoramic landscape with snow-capped mountains, vast green valleys, and dramatic clouds parting to reveal golden sunbeams',
}

const BACKGROUND_MAP: Record<string, string> = {
  castle: 'a magnificent fairy tale castle on a hilltop surrounded by floating lanterns, with a grand staircase leading to a moonlit terrace overlooking a sparkling kingdom below',
  forest: 'a magical ancient forest where tall trees arch into a natural cathedral, with bioluminescent fireflies dancing among moss-covered roots and a crystal-clear stream',
  sea: 'dramatic coastal cliffs overlooking a turquoise ocean at sunset, with waves crashing into sea stacks, golden light painting the rocky shore, and wildflowers swaying in the breeze',
}
```

---

## 7. 캐릭터 일관성 전략

Gemini 3 Pro는 레퍼런스 이미지를 최대 5장까지 지원.
커플 사진을 레퍼런스로 전달하여 캐릭터 외형 일관성 확보:

```typescript
// 레퍼런스 이미지가 있는 경우
const contents = [
  {
    role: 'user',
    parts: [
      // 커플 사진 레퍼런스
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: couplePhotoBase64,
        },
      },
      {
        text: `Use the couple in this reference photo as the basis for the characters.
Convert them into Disney Pixar 3D animation style while preserving their distinctive features
(hairstyle, face shape, build). Do not copy the photo - reimagine them as animated characters.

${fullPrompt}`,
      },
    ],
  },
]

const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents,
  config: {
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
  },
})
```

---

## 8. 안전 필터 대응

Gemini Pro Image는 SynthID 워터마크를 자동 삽입하며, 안전 필터에 걸리면 이미지 없이 응답합니다.
프로포즈/결혼 콘텐츠는 대체로 안전하지만, 간혹 "사람 얼굴 근접" 등에서 필터링될 수 있습니다.

```typescript
// 재시도 로직 (최대 2회, 프롬프트 완화)
async function generateWithRetry(prompt: string, maxRetries = 2): Promise<Buffer> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const adjustedPrompt = attempt === 0
      ? prompt
      : prompt + '\nNote: Show the characters from a slightly wider angle, emphasizing the scenic background.'

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: adjustedPrompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
      },
    })

    const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)
    if (imagePart?.inlineData) {
      return Buffer.from(imagePart.inlineData.data!, 'base64')
    }

    console.warn(`[imageGenerator] Attempt ${attempt + 1} failed - no image returned, retrying...`)
  }

  throw new Error('Image generation failed after retries: safety filter or empty response')
}
```

---

## 9. 비용 예측

| 항목 | 단가 | 영상 1건 (10씬) | 영상 1건 (20씬) |
|------|------|-----------------|-----------------|
| Gemini Pro Image | ~$0.04/장 | ~$0.40 | ~$0.80 |
| Gemini Flash (스토리) | ~$0.001/req | ~$0.001 | ~$0.001 |
| ElevenLabs TTS | 무료 10K자/월 | 무료 범위 내 | 유료 전환 필요 |
| **합계** | | **~$0.40** | **~$0.80** |

FLUX.1 대비 유료지만, 품질 대비 매우 합리적.

---

## 10. 구현 체크리스트

- [ ] `npm install @google/genai` 설치
- [ ] `imageGenerator.ts` → Gemini Pro Image로 전면 교체
- [ ] `storyGenerator.ts` → SYSTEM_PROMPT 서술형 프롬프트 규칙 적용
- [ ] `storyGenerator.ts` → MOOD_MAP / BACKGROUND_MAP 서술형으로 강화
- [ ] 커플 사진 레퍼런스 이미지 파이프라인 연결
- [ ] `.env.example`에 `GEMINI_API_KEY` 용도 주석 업데이트 (스토리 + 이미지 공용)
- [ ] 데모 모드 이미지 생성 mock 유지 확인
- [ ] 전체 파이프라인 테스트 (스토리 → 이미지 → 나레이션 → 영상)
