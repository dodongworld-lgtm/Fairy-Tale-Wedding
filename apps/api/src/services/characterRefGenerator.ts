import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

const REF_PROMPT_TEMPLATE = (fixedPrompt: string) =>
`Upper body bust-up character portrait. Disney Pixar 3D animation style.
Must have Pixar-style features:
  - Large expressive eyes with light reflections
  - Smooth rounded facial features
  - Soft subsurface skin scattering
  - Stylized hair with volume and shine
NOT photorealistic. NOT 2D flat. NOT anime.
Think Pixar/Disney 3D animated movie character.
Plain white background, no objects, no scenery.
Character reference sheet. High quality, cinematic lighting.
No text, no watermark.

Character: ${fixedPrompt}`

export function buildRefPrompt(fixedPrompt: string): string {
  return REF_PROMPT_TEMPLATE(fixedPrompt)
}

export async function generateCharacterRefs({
  projectId,
  role,
  fixedPrompt,
  photoBase64,
  count = 4,
}: {
  projectId: string
  role: 'groom' | 'bride'
  fixedPrompt: string
  photoBase64: string
  count?: number
}): Promise<Array<{ path: string; url: string }>> {
  if (process.env.DEMO_MODE === 'true') {
    return Array.from({ length: count }, (_, i) => ({
      path: `character_refs/${projectId}/${role}_v${i + 1}.png`,
      url: `/local/character_refs/${projectId}/${role}_v${i + 1}.png`,
    }))
  }

  const prompt = buildRefPrompt(fixedPrompt)
  const results: Array<{ path: string; url: string }> = []

  for (let i = 0; i < count; i++) {
    const buffer = await callWithRetry(async (client) => {
      const response = await client.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: photoBase64 } },
              {
                text: `Use this photo as reference for the character's face and features.
Convert into Disney Pixar 3D animation style while preserving distinctive features.
Do not copy the photo — reimagine as an animated character.

${prompt}`,
              },
            ],
          },
        ],
        config: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '3:4', imageSize: '1K' },
        },
      })

      const part = response.candidates?.[0]?.content?.parts?.find(
        (p: any) => p.inlineData
      )
      if (!part?.inlineData) throw new Error('No image in response')
      return Buffer.from(part.inlineData.data!, 'base64')
    })

    const subPath = `character_refs/${projectId}/${role}_v${i + 1}_${uuid().slice(0, 8)}.png`
    const url = saveFile(subPath, buffer)
    results.push({ path: subPath, url })
  }

  return results
}
