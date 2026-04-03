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
