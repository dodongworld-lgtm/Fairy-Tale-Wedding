import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })

const SYSTEM_PROMPT = `당신은 디즈니 예고편 스타일의 감성적인 사랑 이야기를 만드는 스토리작가입니다.
커플 정보를 받아 4막 구조(만남-여정-시련-프로포즈)의 60~90초 분량 영상 스토리를 만들어주세요.

반드시 다음 JSON 형식으로만 응답하세요 (마크다운 없이 순수 JSON):
{
  "title": "스토리 제목",
  "acts": [
    {
      "act": 1,
      "title": "막 제목",
      "scenes": [
        {
          "imagePrompt": "영어로 된 이미지 생성 프롬프트. 반드시 Disney Pixar animation style, cinematic 포함",
          "narration": "한국어 나레이션 텍스트",
          "emotion": "wonder",
          "durationSec": 4
        }
      ]
    }
  ]
}`

const MOOD_MAP: Record<string, string> = {
  fantasy: 'fairy tale fantasy world with magical elements',
  romantic: 'romantic European cityscape at golden hour',
  adventure: 'epic adventure landscape with mountains and sky'
}

const BACKGROUND_MAP: Record<string, string> = {
  castle: 'enchanted castle with floating lanterns',
  forest: 'magical forest with glowing fireflies',
  sea: 'breathtaking coastal cliffs with sparkling ocean'
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
