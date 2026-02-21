import { ElevenLabsClient } from 'elevenlabs'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY || '' })

const VOICE_IDS: Record<string, string> = {
  female_ko: 'pNInz6obpgDQGcFmaJgB',
  male_ko: 'ErXwobaYiN019PkySvjV'
}

const STABILITY_MAP: Record<string, number> = {
  wonder: 0.3,
  joy: 0.4,
  tension: 0.6,
  love: 0.25
}

export async function generateNarration({
  projectId,
  text,
  emotion,
  narratorGender,
  language
}: {
  projectId: string
  text: string
  emotion: string
  narratorGender: 'female' | 'male'
  language: 'ko' | 'en'
}): Promise<{ s3Key: string; audioUrl: string }> {
  const voiceKey = `${narratorGender}_ko`
  const voiceId = VOICE_IDS[voiceKey] || VOICE_IDS.female_ko

  const audioStream = await elevenlabs.generate({
    voice: voiceId,
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: STABILITY_MAP[emotion] ?? 0.4,
      similarity_boost: 0.8,
      style: 0.5,
      use_speaker_boost: true
    }
  })

  const chunks: Buffer[] = []
  for await (const chunk of audioStream) {
    chunks.push(Buffer.from(chunk))
  }
  const audioBuffer = Buffer.concat(chunks)

  const subPath = `narrations/${projectId}/${uuid()}.mp3`
  const audioUrl = saveFile(subPath, audioBuffer)

  return { s3Key: subPath, audioUrl }
}
