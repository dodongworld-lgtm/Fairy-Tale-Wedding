import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

export const VOICE_CANDIDATES = [
  { name: 'Kore', desc: '차분하고 따뜻한 여성 (스토리텔링)', gender: 'female' },
  { name: 'Leda', desc: '부드러운 젊은 여성 (설레는 톤)', gender: 'female' },
  { name: 'Achernar', desc: '밝고 활발한 여성 (경쾌)', gender: 'female' },
  { name: 'Alnilam', desc: '중후한 중년 남성 (격식)', gender: 'male' },
  { name: 'Sadachbia', desc: '세련된 젊은 남성 (모던)', gender: 'male' },
]

const EMOTION_SOFTEN_MAP: Record<string, string> = {
  Screaming: 'Excited',
  Shouting: 'Emphatic',
  Incensed: 'Annoyed',
  Enraged: 'Frustrated',
  Furious: 'Firm and angry',
}

export function softenEmotionTag(tag: string): string {
  return EMOTION_SOFTEN_MAP[tag] || tag
}

export function buildSampleText(): string {
  return '두 사람의 이야기가 시작됩니다. 운명처럼 만난 그 날부터, 함께한 모든 순간이 기적이었습니다.'
}

/** Gemini TTS returns raw PCM (L16, 24kHz). Add WAV header for playback. */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const byteRate = sampleRate * channels * (bitsPerSample / 8)
  const blockAlign = channels * (bitsPerSample / 8)
  const header = Buffer.alloc(44)
  header.write('RIFF', 0)
  header.writeUInt32LE(36 + pcmBuffer.length, 4)
  header.write('WAVE', 8)
  header.write('fmt ', 12)
  header.writeUInt32LE(16, 16)
  header.writeUInt16LE(1, 20)
  header.writeUInt16LE(channels, 22)
  header.writeUInt32LE(sampleRate, 24)
  header.writeUInt32LE(byteRate, 28)
  header.writeUInt16LE(blockAlign, 32)
  header.writeUInt16LE(bitsPerSample, 34)
  header.write('data', 36)
  header.writeUInt32LE(pcmBuffer.length, 40)
  return Buffer.concat([header, pcmBuffer])
}

async function callTTS(text: string, voiceName: string): Promise<Buffer> {
  return callWithRetry(async (client) => {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: text,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      } as any,
    })

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )
    if (!part?.inlineData) throw new Error(`TTS failed for voice ${voiceName}`)
    const pcm = Buffer.from(part.inlineData.data!, 'base64')
    return pcmToWav(pcm)
  })
}

export async function generateVoiceSamples({
  projectId,
}: {
  projectId: string
}): Promise<Array<{ voice: string; desc: string; path: string; url: string }>> {
  if (process.env.DEMO_MODE === 'true') {
    return VOICE_CANDIDATES.map(v => ({
      voice: v.name,
      desc: v.desc,
      path: `tts/${projectId}/samples/${v.name}.wav`,
      url: `/local/tts/${projectId}/samples/${v.name}.wav`,
    }))
  }

  const sampleText = buildSampleText()
  const results = []

  for (const voice of VOICE_CANDIDATES) {
    const wav = await callTTS(sampleText, voice.name)
    const subPath = `tts/${projectId}/samples/${voice.name}_${uuid().slice(0, 8)}.wav`
    const url = saveFile(subPath, wav)
    results.push({ voice: voice.name, desc: voice.desc, path: subPath, url })
  }

  return results
}

export async function generateNarration({
  projectId,
  sceneId,
  text,
  voiceName,
  emotion,
}: {
  projectId: string
  sceneId: string
  text: string
  voiceName: string
  emotion?: string
}): Promise<{ path: string; url: string }> {
  if (process.env.DEMO_MODE === 'true') {
    const subPath = `tts/${projectId}/${sceneId}.wav`
    return { path: subPath, url: `/local/${subPath}` }
  }

  const emotionTag = emotion ? softenEmotionTag(emotion) : undefined
  const narrationText = emotionTag
    ? `[${emotionTag}] ${text}`
    : text

  const wav = await callTTS(narrationText, voiceName)
  const subPath = `tts/${projectId}/${sceneId}_${uuid().slice(0, 8)}.wav`
  const url = saveFile(subPath, wav)
  return { path: subPath, url }
}
