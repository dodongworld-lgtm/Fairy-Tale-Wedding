import { fal } from '@fal-ai/client'
import { s3, getDownloadUrl } from '../lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuid } from 'uuid'

fal.config({ credentials: process.env.FAL_KEY || '' })

const DISNEY_STYLE_SUFFIX = ', Disney Pixar 3D animation style, cinematic lighting, vibrant colors, high quality render, dreamlike atmosphere, 8k resolution, professional animation'

export async function generateSceneImage({
  projectId,
  sceneId,
  prompt,
  faceImageUrl
}: {
  projectId: string
  sceneId: string
  prompt: string
  faceImageUrl?: string | null
}): Promise<{ s3Key: string; imageUrl: string }> {
  const fullPrompt = prompt + DISNEY_STYLE_SUFFIX

  const result = await fal.run('fal-ai/flux/dev', {
    input: {
      prompt: fullPrompt,
      ...(faceImageUrl ? { image_url: faceImageUrl } : {}),
      num_inference_steps: 28,
      guidance_scale: 3.5,
      image_size: 'landscape_16_9'
    }
  }) as { data: { images: Array<{ url: string }> } }

  const imageUrl = result.data.images[0].url
  const imageBuffer = await fetch(imageUrl).then(r => r.arrayBuffer())

  const s3Key = `images/${projectId}/${sceneId}-${uuid()}.png`
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: s3Key,
    Body: Buffer.from(imageBuffer),
    ContentType: 'image/png'
  }))

  return { s3Key, imageUrl: await getDownloadUrl(s3Key) }
}
