import { Router } from 'express'
import { projectsRouter } from './projects'
import { photosRouter } from './photos'
import { generateRouter } from './generate'

export const router = Router()

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'once-upon-us-api' })
})

router.use('/projects', projectsRouter)
router.use('/projects/:projectId/photos', photosRouter)
router.use('/projects/:projectId/generate', generateRouter)
