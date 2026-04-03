// apps/api/src/routes/assets.ts
import { Router } from 'express'
import { runAssetPipeline, continueAfterRefSelection } from '../services/assetPipeline'
import { generateNarration } from '../services/narrationGenerator'
import { generateSceneImage } from '../services/imageGenerator'
import { generateCharacterRefs } from '../services/characterRefGenerator'
import fs from 'fs'
import path from 'path'

const router = Router()
const STORAGE_DIR = process.env.LOCAL_STORAGE_DIR || '/tmp/onceuponus'

// 1단계: 캐릭터 레퍼런스 생성
router.post('/projects/:id/generate-refs', async (req, res) => {
  const { groomPhotoBase64, bridePhotoBase64, coupleInfo, styleOptions } = req.body

  const result = await runAssetPipeline({
    projectId: req.params.id,
    groomPhotoBase64,
    bridePhotoBase64,
    coupleInfo,
    styleOptions,
  })

  res.json(result)
})

// 2단계: 레퍼런스 선택 후 이미지+TTS+BGM 생성
router.post('/projects/:id/generate-assets', async (req, res) => {
  const {
    coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  } = req.body

  const result = await continueAfterRefSelection({
    projectId: req.params.id,
    coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  })

  res.json(result)
})

// 3단계: 음성 선택 후 전체 나레이션 생성
router.post('/projects/:id/generate-narration', async (req, res) => {
  const { scenes, voiceName } = req.body
  const projectId = req.params.id
  const results = []

  for (const scene of scenes) {
    const result = await generateNarration({
      projectId,
      sceneId: scene.sceneId,
      text: scene.narration,
      voiceName,
      emotion: scene.emotion,
    })
    results.push(result)
  }

  res.json({ narrations: results })
})

// 개별 씬 이미지 재생성
router.post('/projects/:id/regenerate-scene', async (req, res) => {
  const { sceneId, prompt, groomFixedPrompt, brideFixedPrompt, groomRefPath, brideRefPath } = req.body

  const result = await generateSceneImage({
    projectId: req.params.id,
    sceneId, prompt,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  })

  res.json(result)
})

// 캐릭터 레퍼런스 재생성 (추가 후보)
router.post('/projects/:id/regenerate-ref', async (req, res) => {
  const { role, fixedPrompt, photoBase64, count } = req.body

  const refs = await generateCharacterRefs({
    projectId: req.params.id,
    role, fixedPrompt, photoBase64,
    count: count || 2,
  })

  res.json({ refs })
})

// 전체 소재 ZIP 다운로드 (placeholder)
router.get('/projects/:id/download-assets', async (req, res) => {
  const projectDir = path.join(STORAGE_DIR, 'images', req.params.id)
  if (!fs.existsSync(projectDir)) {
    return res.status(404).json({ error: 'No assets found' })
  }
  res.json({ message: 'Download endpoint — ZIP 생성 구현 필요', projectDir })
})

export default router
