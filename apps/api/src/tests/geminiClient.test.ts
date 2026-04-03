import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation((opts: any) => ({ apiKey: opts.apiKey })),
}))

describe('GeminiClient', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env.GEMINI_API_KEY = 'key1'
    process.env.GEMINI_API_KEY_2 = 'key2'
    process.env.GEMINI_API_KEY_3 = 'key3'
    delete process.env.GEMINI_API_KEY_4
  })

  it('should collect all available API keys', async () => {
    const { getAvailableKeys } = await import('../lib/geminiClient')
    const keys = getAvailableKeys()
    expect(keys.length).toBe(3)
  })

  it('should rotate to next key', async () => {
    const { rotateKey, getCurrentKeyIndex } = await import('../lib/geminiClient')
    expect(getCurrentKeyIndex()).toBe(0)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(1)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(2)
    rotateKey()
    expect(getCurrentKeyIndex()).toBe(0)
  })
})
