// apps/api/src/services/assetPipeline.ts
import { extractFixedPrompt } from './fixedPromptExtractor'
import { generateCharacterRefs } from './characterRefGenerator'
import { generateStory, CoupleInfo, StyleOptions } from './storyGenerator'
import { generateSceneImage } from './imageGenerator'
import { generateVoiceSamples } from './narrationGenerator'
import { generateBgmCandidates } from './bgmGenerator'

export interface PipelineInput {
  projectId: string
  groomPhotoBase64: string
  bridePhotoBase64: string
  coupleInfo: CoupleInfo
  styleOptions: StyleOptions
}

export interface PipelineProgress {
  step: string
  percent: number
  message: string
}

type ProgressCallback = (progress: PipelineProgress) => void

export async function runAssetPipeline(
  input: PipelineInput,
  onProgress?: ProgressCallback
) {
  const { projectId, groomPhotoBase64, bridePhotoBase64, coupleInfo, styleOptions } = input

  // Step 1: 외형 추출 (5%)
  onProgress?.({ step: 'extract', percent: 5, message: '캐릭터 외형 분석 중...' })
  const groomFixed = await extractFixedPrompt(groomPhotoBase64, 'groom')
  const brideFixed = await extractFixedPrompt(bridePhotoBase64, 'bride')

  // Step 2: 캐릭터 레퍼런스 생성 (20%)
  onProgress?.({ step: 'refs', percent: 10, message: '캐릭터 레퍼런스 생성 중...' })
  const groomRefs = await generateCharacterRefs({
    projectId, role: 'groom', fixedPrompt: groomFixed, photoBase64: groomPhotoBase64, count: 4,
  })
  onProgress?.({ step: 'refs', percent: 20, message: '캐릭터 레퍼런스 생성 완료' })
  const brideRefs = await generateCharacterRefs({
    projectId, role: 'bride', fixedPrompt: brideFixed, photoBase64: bridePhotoBase64, count: 4,
  })

  // Pause — wait for admin to select references
  return {
    status: 'awaiting_ref_selection',
    groomFixed,
    brideFixed,
    groomRefs,
    brideRefs,
  }
}

export async function continueAfterRefSelection(input: {
  projectId: string
  coupleInfo: CoupleInfo
  styleOptions: StyleOptions
  groomFixedPrompt: string
  brideFixedPrompt: string
  groomRefPath: string
  brideRefPath: string
}, onProgress?: ProgressCallback) {
  const {
    projectId, coupleInfo, styleOptions,
    groomFixedPrompt, brideFixedPrompt,
    groomRefPath, brideRefPath,
  } = input

  // Step 3: 스토리 생성 (30%)
  onProgress?.({ step: 'story', percent: 30, message: '스토리 생성 중...' })
  const story = await generateStory(coupleInfo, styleOptions)

  // Step 4: 씬별 이미지 생성 (30-70%)
  const allScenes = story.acts.flatMap(a => a.scenes)
  const sceneImages = []

  for (let i = 0; i < allScenes.length; i++) {
    const scene = allScenes[i]
    const percent = 30 + Math.round((i / allScenes.length) * 40)
    onProgress?.({ step: 'images', percent, message: `이미지 생성 중... (${i + 1}/${allScenes.length})` })

    const result = await generateSceneImage({
      projectId,
      sceneId: `act${story.acts.find(a => a.scenes.includes(scene))!.act}_scene${i + 1}`,
      prompt: scene.imagePrompt,
      groomFixedPrompt,
      brideFixedPrompt,
      groomRefPath,
      brideRefPath,
    })
    sceneImages.push(result)
  }

  // Step 5: TTS 음성 샘플 생성 (75%)
  onProgress?.({ step: 'tts', percent: 75, message: 'TTS 음성 샘플 생성 중...' })
  const voiceSamples = await generateVoiceSamples({ projectId })

  // Step 6: BGM 후보 생성 (90%)
  onProgress?.({ step: 'bgm', percent: 90, message: 'BGM 생성 중...' })
  const bgmCandidates = await generateBgmCandidates({ projectId, count: 4 })

  onProgress?.({ step: 'done', percent: 100, message: '소재 생성 완료!' })

  // Pause — wait for voice/BGM selection, then generate full narration
  return {
    status: 'awaiting_voice_bgm_selection',
    story,
    sceneImages,
    voiceSamples,
    bgmCandidates,
  }
}
