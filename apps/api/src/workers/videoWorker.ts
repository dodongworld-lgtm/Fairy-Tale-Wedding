import { Worker, Job } from 'bullmq'
import { bullmqConnection } from '../lib/redis'
import { prisma } from '../lib/prisma'
import { generateStory } from '../services/storyGenerator'
import { generateSceneImage } from '../services/imageGenerator'
import { generateNarration } from '../services/narrationGenerator'
import type { VideoJobData } from '../queues/videoQueue'

// Lazy import io to avoid circular dependency
function getIo() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('../index').io
}

function emit(projectId: string, event: string, data: unknown) {
  try {
    getIo().to(`project:${projectId}`).emit(event, data)
  } catch {
    // io not ready yet in tests
  }
}

export const videoWorker = new Worker<VideoJobData>(
  'video-generation',
  async (job: Job<VideoJobData>) => {
    const { projectId } = job.data

    try {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'GENERATING' }
      })

      emit(projectId, 'progress', { step: 'story', percent: 10, message: '스토리 생성 중...' })

      const project = await prisma.project.findUniqueOrThrow({
        where: { id: projectId }
      })

      const story = await generateStory(project.coupleInfo as any, project.styleOptions as any)

      emit(projectId, 'progress', { step: 'images', percent: 20, message: '이미지 생성 시작...' })

      const styleOptions = project.styleOptions as Record<string, string>
      let completedScenes = 0
      const totalScenes = story.acts.reduce((acc: number, act: any) => acc + act.scenes.length, 0)

      for (const act of story.acts) {
        for (const sceneData of act.scenes) {
          const scene = await prisma.scene.create({
            data: {
              projectId,
              act: act.act,
              order: act.scenes.indexOf(sceneData),
              narrationText: sceneData.narration,
              imagePrompt: sceneData.imagePrompt,
              durationSec: sceneData.durationSec
            }
          })

          const [imageResult, narrationResult] = await Promise.all([
            generateSceneImage({ projectId, sceneId: scene.id, prompt: sceneData.imagePrompt }),
            generateNarration({
              projectId,
              text: sceneData.narration,
              emotion: sceneData.emotion,
              narratorGender: (styleOptions.narratorGender as 'female' | 'male') || 'female',
              language: (styleOptions.language as 'ko' | 'en') || 'ko'
            })
          ])

          await prisma.scene.update({
            where: { id: scene.id },
            data: { imageS3Key: imageResult.s3Key, narrationS3Key: narrationResult.s3Key }
          })

          completedScenes++
          emit(projectId, 'progress', {
            step: 'images',
            percent: 20 + Math.floor((completedScenes / totalScenes) * 60),
            message: `장면 생성 중... (${completedScenes}/${totalScenes})`
          })
        }
      }

      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'EDITING' }
      })

      emit(projectId, 'progress', { step: 'done', percent: 100, message: '생성 완료!' })
      emit(projectId, 'completed', { projectId })

    } catch (error) {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'DRAFT' }
      }).catch(() => {})
      emit(projectId, 'error', { message: '생성 중 오류가 발생했습니다.' })
      throw error
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { connection: bullmqConnection as any, concurrency: 3 }
)
