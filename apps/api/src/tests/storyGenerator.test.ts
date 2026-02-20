import { describe, it, expect, vi } from 'vitest'

const { mockCreate } = vi.hoisted(() => {
  const mockCreate = vi.fn().mockResolvedValue({
    content: [{
      type: 'text',
      text: JSON.stringify({
        title: '우리의 동화',
        acts: [
          {
            act: 1,
            title: '운명적인 만남',
            scenes: [{
              imagePrompt: 'A magical cafe in Seoul, Disney Pixar animation style, cinematic',
              narration: '봄비가 내리던 그날, 운명처럼 그와 그녀가 만났습니다.',
              emotion: 'wonder',
              durationSec: 4
            }]
          },
          { act: 2, title: '함께한 여정', scenes: [{ imagePrompt: 'Adventure, Disney Pixar animation style, cinematic', narration: '함께라면', emotion: 'joy', durationSec: 4 }] },
          { act: 3, title: '시련과 성장', scenes: [{ imagePrompt: 'Storm, Disney Pixar animation style, cinematic', narration: '힘든 시간도', emotion: 'tension', durationSec: 4 }] },
          { act: 4, title: '프로포즈', scenes: [{ imagePrompt: 'Castle fireworks, Disney Pixar animation style, cinematic', narration: '영원히 함께', emotion: 'love', durationSec: 6, proposeMessage: '평생 내 곁에 있어줄래?' }] }
        ]
      })
    }]
  })
  return { mockCreate }
})

vi.mock('@anthropic-ai/sdk', () => {
  const MockAnthropic = vi.fn().mockImplementation(function () {
    return {
      messages: {
        create: mockCreate
      }
    }
  })
  return { default: MockAnthropic }
})

import { generateStory } from '../services/storyGenerator'

describe('generateStory', () => {
  it('returns a story with 4 acts', async () => {
    const result = await generateStory(
      { person1: '지훈', person2: '수연', proposeMessage: '평생 내 곁에 있어줄래?' },
      { mood: 'fantasy', background: 'castle', language: 'ko' }
    )

    expect(result.acts).toHaveLength(4)
    expect(result.acts[0].act).toBe(1)
  })

  it('act 1 scene has Disney style image prompt', async () => {
    const result = await generateStory(
      { person1: '지훈', person2: '수연', proposeMessage: '함께해요' },
      { mood: 'fantasy', background: 'castle', language: 'ko' }
    )

    expect(result.acts[0].scenes[0].imagePrompt).toContain('Disney')
  })

  it('act 4 last scene has proposeMessage field', async () => {
    const result = await generateStory(
      { person1: '지훈', person2: '수연', proposeMessage: '평생 내 곁에 있어줄래?' },
      { mood: 'fantasy', background: 'castle', language: 'ko' }
    )

    const act4 = result.acts[3]
    const lastScene = act4.scenes[act4.scenes.length - 1]
    expect(lastScene.proposeMessage).toContain('평생')
  })
})
