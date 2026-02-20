import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'

export const projectsRouter = Router()

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

projectsRouter.post('/', asyncHandler(async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const { coupleInfo, styleOptions } = req.body
  const project = await prisma.project.create({
    data: { userId, coupleInfo, styleOptions }
  })

  res.status(201).json(project)
}))

projectsRouter.get('/:id', asyncHandler(async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, userId },
    include: { photos: true, scenes: true, videos: true }
  })

  if (!project) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.json(project)
}))

projectsRouter.patch('/:id', asyncHandler(async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  const { coupleInfo, styleOptions } = req.body

  const result = await prisma.project.updateMany({
    where: { id: req.params.id, userId },
    data: { coupleInfo, styleOptions }
  })

  if (result.count === 0) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.json({ ok: true })
}))
