import { Router, Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { prisma } from '../lib/prisma'
import { getUploadPresignedUrl } from '../lib/s3'

export const photosRouter = Router({ mergeParams: true })

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

photosRouter.post('/', asyncHandler(async (req, res) => {
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

  const { fileName, contentType, isFacePrimary, order } = req.body

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId }
  })
  if (!project) {
    res.status(404).json({ error: 'Project not found' })
    return
  }

  const s3Key = `photos/${projectId}/${uuid()}-${fileName}`
  const uploadUrl = await getUploadPresignedUrl(s3Key, contentType)

  const photo = await prisma.photo.create({
    data: { projectId, s3Key, isFacePrimary: isFacePrimary ?? false, order: order ?? 0 }
  })

  res.json({ photoId: photo.id, uploadUrl, s3Key })
}))
