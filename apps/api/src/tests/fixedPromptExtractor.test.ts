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
