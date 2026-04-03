import { callWithRetry } from '../lib/geminiClient'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'

const STYLE_HEADER = `A beautiful screenshot from a Disney Pixar 3D animated movie.
3D CGI characters with Pixar's signature style — large eyes, smooth rounded features, expressive faces.
Cinematic lighting, golden hour, lens flare, shallow depth of field.`

const NEGATIVE_RULES = `No text, no watermarks, no speech bubbles, no logos.`

export function buildScenePrompt(
  scenePrompt: string,
  groomFixed: string,
  brideFixed: string
): string {
  return `${STYLE_HEADER}

Scene description:
${scenePrompt}

Character consistency:
TWO people only — Groom: ${groomFixed} / Bride: ${brideFixed}

${NEGATIVE_RULES}`
}

export async function generateSceneImage({
  projectId,
  sceneId,
  prompt,
  groomFixedPrompt,
  brideFixedPrompt,
  groomRefPath,
  brideRefPath,
}: {
  projectId: string
  sceneId: string
  prompt: string
  groomFixedPrompt: string
  brideFixedPrompt: string
  groomRefPath?: string | null
  brideRefPath?: string | null
}): Promise<{ s3Key: string; imageUrl: string }> {
  if (process.env.DEMO_MODE === 'true') {
    const subPath = `images/${projectId}/${sceneId}-demo.png`
    return { s3Key: subPath, imageUrl: `/local/${subPath}` }
  }

  const fullPrompt = buildScenePrompt(prompt, groomFixedPrompt, brideFixedPrompt)

  // 레퍼런스 이미지 로드
  const refParts: any[] = []
  const storageDir = process.env.LOCAL_STORAGE_DIR || '/tmp/onceuponus'

  for (const refPath of [groomRefPath, brideRefPath]) {
    if (!refPath) continue
    try {
      const absPath = path.join(storageDir, refPath)
      const buf = fs.readFileSync(absPath)
      refParts.push({
        inlineData: { mimeType: 'image/png', data: buf.toString('base64') },
      })
    } catch {
      // 레퍼런스 없으면 텍스트만으로 진행
    }
  }

  const buffer = await callWithRetry(async (client) => {
    const contents = [
      {
        role: 'user' as const,
        parts: [
          ...refParts,
          ...(refParts.length > 0
            ? [{
                text: `Use these character reference images. Match their faces exactly in Disney Pixar 3D style.\n\n${fullPrompt}`,
              }]
            : [{ text: fullPrompt }]),
        ],
      },
    ]

    const response = await client.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '16:9', imageSize: '1K' },
      },
    })

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )
    if (!part?.inlineData) throw new Error('No image in response')
    return Buffer.from(part.inlineData.data!, 'base64')
  })

  const subPath = `images/${projectId}/${sceneId}-${uuid()}.png`
  const imageUrl = saveFile(subPath, buffer)
  return { s3Key: subPath, imageUrl }
}
