import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

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

export interface CoupleInfo {
  person1: string
  person2: string
  firstMeetDate?: string
  firstMeetPlace?: string
  memories?: string[]
  proposeMessage: string
}

export interface StyleOptions {
  mood?: string
  background?: string
  language?: string
  narratorGender?: string
}

export interface StoryScene {
  imagePrompt: string
  narration: string
  emotion: string
  durationSec: number
  proposeMessage?: string
}

export interface StoryAct {
  act: number
  title: string
  scenes: StoryScene[]
}

export interface GeneratedStory {
  title: string
  acts: StoryAct[]
}

function getMockStory(coupleInfo: CoupleInfo): GeneratedStory {
  return {
    title: `${coupleInfo.person1}과 ${coupleInfo.person2}의 이야기`,
    acts: [
      {
        act: 1,
        title: '운명적인 만남',
        scenes: [
          {
            imagePrompt: 'Disney Pixar animation style, cinematic, two people meeting for the first time in a magical forest with glowing fireflies, warm golden light, romantic atmosphere',
            narration: `${coupleInfo.person1}과 ${coupleInfo.person2}의 이야기가 시작되었습니다.`,
            emotion: 'wonder',
            durationSec: 5
          }
        ]
      },
      {
        act: 4,
        title: '영원한 약속',
        scenes: [
          {
            imagePrompt: 'Disney Pixar animation style, cinematic, enchanted castle with floating lanterns, magical proposal scene, fireworks, romantic golden hour light',
            narration: coupleInfo.proposeMessage,
            emotion: 'love',
            durationSec: 6,
            proposeMessage: coupleInfo.proposeMessage
          }
        ]
      }
    ]
  }
}

export async function generateStory(
  coupleInfo: CoupleInfo,
  styleOptions: StyleOptions
): Promise<GeneratedStory> {
  if (process.env.DEMO_MODE === 'true') {
    console.log('[storyGenerator] DEMO_MODE: returning mock story')
    return getMockStory(coupleInfo)
  }

  const mood = MOOD_MAP[styleOptions.mood || 'fantasy'] || MOOD_MAP.fantasy
  const background = BACKGROUND_MAP[styleOptions.background || 'castle'] || BACKGROUND_MAP.castle
  const language = styleOptions.language === 'ko' ? '한국어' : 'English'

  const userMessage = `
커플 정보:
- 이름: ${coupleInfo.person1}과 ${coupleInfo.person2}
- 첫 만남: ${coupleInfo.firstMeetDate || '알 수 없음'}, ${coupleInfo.firstMeetPlace || '알 수 없음'}
- 함께한 추억: ${(coupleInfo.memories || []).join(', ') || '없음'}
- 프로포즈 메시지: "${coupleInfo.proposeMessage}"

스타일:
- 분위기: ${mood}
- 배경: ${background}
- 언어: ${language}

각 막마다 2~3개 장면을 만들어주세요. Act 4의 마지막 장면 객체에 "proposeMessage": "${coupleInfo.proposeMessage}" 필드를 추가하세요.
  `.trim()

  const result = await model.generateContent(
    SYSTEM_PROMPT + '\n\n' + userMessage
  )
  const text = result.response.text()
  const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim()

  return JSON.parse(jsonStr) as GeneratedStory
}
