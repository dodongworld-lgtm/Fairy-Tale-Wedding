import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'
import { videoQueue } from '../queues/videoQueue'

export const generateRouter = Router({ mergeParams: true })

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

generateRouter.post('/', asyncHandler(async (req, res) => {
  const userId = Array.isArray(req.headers['x-user-id'])
    ? req.headers['x-user-id'][0]
    : req.headers['x-user-id']

  const projectId = Array.isArray(req.params.projectId)
    ? req.params.projectId[0]
    : req.params.projectId

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    include: { photos: true }
  })

  if (!project) {
    res.status(404).json({ error: 'Not found' })
    return
  }

  if (!project.photos || project.photos.length === 0) {
    res.status(400).json({ error: '사진을 먼저 업로드해주세요' })
    return
  }

  if (!project.photos.find((p: any) => p.isFacePrimary)) {
    res.status(400).json({ error: '얼굴 기준 사진을 선택해주세요' })
    return
  }

  await videoQueue.add('generate', { projectId, userId })

  res.json({ ok: true, message: '영상 생성이 시작되었습니다' })
}))
