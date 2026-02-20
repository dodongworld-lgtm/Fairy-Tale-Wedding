import path from 'path'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import { s3, getDownloadUrl } from '../lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function renderProposalVideo({
  projectId,
  scenes,
  bgmUrl,
  title,
  resolution
}: {
  projectId: string
  scenes: Array<{ imageUrl: string; narrationUrl: string; narrationText: string; durationSec: number }>
  bgmUrl: string
  title: string
  resolution: 'HD' | 'FHD' | 'FOURK'
}): Promise<{ s3Key: string; videoUrl: string }> {
  // Dynamic imports to avoid loading Remotion at startup
  const { bundle } = await import('@remotion/bundler')
  const { renderMedia, selectComposition } = await import('@remotion/renderer')

  const resolutionMap: Record<string, [number, number]> = {
    HD: [1280, 720],
    FHD: [1920, 1080],
    FOURK: [3840, 2160]
  }
  const [width, height] = resolutionMap[resolution]
  const fps = 30

  const scenesWithFrames = scenes.map(s => ({
    ...s,
    durationFrames: Math.round(s.durationSec * fps)
  }))

  const bundled = await bundle({
    entryPoint: path.join(__dirname, '../../remotion/src/index.ts'),
    onProgress: () => {}
  })

  const inputProps = { scenes: scenesWithFrames, bgmUrl, title }

  const composition = await selectComposition({
    serveUrl: bundled,
    id: 'ProposalVideo',
    inputProps
  })

  const outputPath = `/tmp/video-${uuid()}.mp4`

  await renderMedia({
    composition: { ...composition, width, height },
    serveUrl: bundled,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps,
    overwrite: true
  })

  const s3Key = `videos/${projectId}/${resolution}-${uuid()}.mp4`
  const videoBuffer = fs.readFileSync(outputPath)

  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: s3Key,
    Body: videoBuffer,
    ContentType: 'video/mp4'
  }))

  fs.unlinkSync(outputPath)

  return { s3Key, videoUrl: await getDownloadUrl(s3Key) }
}
