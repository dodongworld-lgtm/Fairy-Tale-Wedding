import { Router } from 'express'
import { prisma } from '../lib/prisma'

export const projectsRouter = Router()

projectsRouter.post('/', async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { coupleInfo, styleOptions } = req.body

  const project = await prisma.project.create({
    data: { userId, coupleInfo, styleOptions }
  })

  res.status(201).json(project)
})

projectsRouter.get('/:id', async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  const project = await prisma.project.findFirst({
    where: { id: req.params.id, userId },
    include: { photos: true, scenes: true, videos: true }
  })

  if (!project) return res.status(404).json({ error: 'Not found' })
  res.json(project)
})

projectsRouter.patch('/:id', async (req, res) => {
  const userId = req.headers['x-user-id'] as string
  const { coupleInfo, styleOptions } = req.body

  const result = await prisma.project.updateMany({
    where: { id: req.params.id, userId },
    data: { coupleInfo, styleOptions }
  })

  if (result.count === 0) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})
