import { BLOCK_MAP } from './blockDefs'

// ── Section types ──────────────────────────────────────────────────────────

export interface SectionData {
  photos: string[]       // object URLs from local files
  narration: string      // auto-generated or user-edited
  date?: string          // "YYYY-MM" or free text like "그 해 여름"
  place?: string
  customText?: string    // extra 1-liner from user
  customText2?: string   // second text field (bride side, etc.)
}

// ── Project data model ─────────────────────────────────────────────────────
export interface ProjectData {
  groomName: string
  brideName: string
  groomPhoto: string     // object URL or ''
  bridePhoto: string     // object URL or ''
  templateId: string | null       // selected template (null = custom selection)
  selectedBlocks: string[]        // selected block IDs (ordered, up to 5)
  sections: Record<string, SectionData>  // dynamic keys: opening, outro, + block IDs
}

const EMPTY_SECTION: SectionData = { photos: [], narration: '' }

export function createDefaultProject(): ProjectData {
  return {
    groomName: '',
    brideName: '',
    groomPhoto: '',
    bridePhoto: '',
    templateId: null,
    selectedBlocks: [],
    sections: {
      opening: { ...EMPTY_SECTION },
      outro:   { ...EMPTY_SECTION, narration: '와주셔서 감사합니다.' },
    },
  }
}

// ── Initialize sections for selected blocks ───────────────────────────────
export function initBlockSections(
  current: Record<string, SectionData>,
  blockIds: string[],
): Record<string, SectionData> {
  const sections: Record<string, SectionData> = {
    opening: current.opening || { ...EMPTY_SECTION },
    outro: current.outro || { ...EMPTY_SECTION, narration: '와주셔서 감사합니다.' },
  }
  for (const id of blockIds) {
    sections[id] = current[id] || { ...EMPTY_SECTION }
  }
  return sections
}

// ── Narration auto-generator (used by Step2Opening) ─────────────────────
export const buildNarration = {
  opening: (groom: string, bride: string) =>
    `안녕하세요, ${groom || '신랑'}과 ${bride || '신부'}입니다.`,
}

// ── Dynamic step metadata builder ─────────────────────────────────────────
export function buildStepMeta(selectedBlocks: string[]) {
  return [
    { key: 'template',  label: '스토리',  labelEn: 'Story'    },  // 0
    { key: 'photos',    label: '사진',    labelEn: 'Photos'   },  // 1
    { key: 'opening',   label: '오프닝',  labelEn: 'Opening'  },  // 2
    ...selectedBlocks.map(id => ({
      key: id,
      label: BLOCK_MAP[id]?.name || id,
      labelEn: BLOCK_MAP[id]?.name || id,
    })),
    { key: 'outro',     label: '감사',    labelEn: 'Thanks'   },
    { key: 'review',    label: '완성',    labelEn: 'Finish'   },
  ] as const
}

