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
    expect(softenEmotionTag('Gentle')).toBe('Gentle')
  })

  it('should build sample text', () => {
    const text = buildSampleText()
    expect(text.length).toBeGreaterThan(20)
  })
})
