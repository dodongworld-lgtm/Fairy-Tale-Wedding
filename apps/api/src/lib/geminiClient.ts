import { GoogleGenAI } from '@google/genai'

const KEY_ENV_NAMES = [
  'GEMINI_API_KEY',
  'GEMINI_API_KEY_2',
  'GEMINI_API_KEY_3',
  'GEMINI_API_KEY_4',
]

let _keys: string[] = []
let _currentIdx = 0

export function getAvailableKeys(): string[] {
  if (_keys.length === 0) {
    _keys = KEY_ENV_NAMES
      .map(name => process.env[name])
      .filter((k): k is string => !!k && k.length > 0)
  }
  return _keys
}

export function getCurrentKeyIndex(): number {
  return _currentIdx
}

export function rotateKey(): void {
  const keys = getAvailableKeys()
  _currentIdx = (_currentIdx + 1) % keys.length
}

export function getClient(): GoogleGenAI {
  const keys = getAvailableKeys()
  if (keys.length === 0) throw new Error('No Gemini API keys configured')
  return new GoogleGenAI({ apiKey: keys[_currentIdx] })
}

export async function callWithRetry<T>(
  fn: (client: GoogleGenAI) => Promise<T>,
  maxRetriesPerKey = 3
): Promise<T> {
  const keys = getAvailableKeys()
  const triedKeys = new Set<number>()

  while (triedKeys.size < keys.length) {
    const client = getClient()
    triedKeys.add(_currentIdx)

    for (let attempt = 0; attempt < maxRetriesPerKey; attempt++) {
      try {
        return await fn(client)
      } catch (err: any) {
        const msg = String(err?.message || err)
        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`[geminiClient] Key ${_currentIdx} exhausted, rotating...`)
          break
        }
        if (attempt < maxRetriesPerKey - 1) {
          console.warn(`[geminiClient] Attempt ${attempt + 1} failed, retrying in 3s...`)
          await new Promise(r => setTimeout(r, 3000))
        }
      }
    }
    rotateKey()
  }

  throw new Error('All Gemini API keys exhausted after retries')
}
