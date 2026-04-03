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
