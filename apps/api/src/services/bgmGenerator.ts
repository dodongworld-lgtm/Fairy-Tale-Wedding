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
