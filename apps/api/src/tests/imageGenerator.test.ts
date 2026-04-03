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

  it('should include scene description in prompt', () => {
    const prompt = buildScenePrompt(
      'A romantic sunset scene on a beach',
      'groom desc',
      'bride desc'
    )
    expect(prompt).toContain('A romantic sunset scene on a beach')
  })
})
