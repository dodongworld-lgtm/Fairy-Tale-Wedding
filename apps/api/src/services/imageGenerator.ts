import { HfInference } from '@huggingface/inference'
import { saveFile } from '../lib/localFiles'
import { v4 as uuid } from 'uuid'

const hf = new HfInference(process.env.HF_TOKEN || '')

const DISNEY_STYLE_SUFFIX = ', Disney Pixar 3D animation style, cinematic lighting, vibrant colors, high quality render, dreamlike atmosphere, professional animation'

export async function generateSceneImage({
  projectId,
  sceneId,
  prompt,
}: {
  projectId: string
  sceneId: string
  prompt: string
  faceImageUrl?: string | null
}): Promise<{ s3Key: string; imageUrl: string }> {
  const fullPrompt = prompt + DISNEY_STYLE_SUFFIX

  // HuggingFace FLUX.1-schnell (무료 inference)
  const blob = await hf.textToImage({
    model: 'black-forest-labs/FLUX.1-schnell',
    inputs: fullPrompt,
    parameters: {
      num_inference_steps: 4,
      width: 1280,
      height: 720,
    }
  })

  const buffer = Buffer.from(await (blob as unknown as Blob).arrayBuffer())
  const subPath = `images/${projectId}/${sceneId}-${uuid()}.png`
  const imageUrl = saveFile(subPath, buffer)

  return { s3Key: subPath, imageUrl }
}
