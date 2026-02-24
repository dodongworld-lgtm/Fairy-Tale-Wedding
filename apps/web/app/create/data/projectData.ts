import { DISNEY_CHARACTERS, DisneyCharacter } from './storyData'

// ── Section types ──────────────────────────────────────────────────────────
export type SectionKey =
  | 'opening'
  | 'trailer'
  | 'whoWeAre'
  | 'howWeMet'
  | 'becameLovers'
  | 'decision'
  | 'thanks'

export interface SectionData {
  photos: string[]       // object URLs from local files
  narration: string      // auto-generated or user-edited
  date?: string          // "YYYY-MM" or free text like "그 해 여름"
  place?: string
  customText?: string    // extra 1-liner from user
}

// ── Character variants ─────────────────────────────────────────────────────
export interface CharacterVariants {
  variants: DisneyCharacter[]  // always 4 items
  selectedIdx: number          // 0-3
}

export function generateVariants(): CharacterVariants {
  const shuffled = [...DISNEY_CHARACTERS].sort(() => Math.random() - 0.5)
  return { variants: shuffled.slice(0, 4), selectedIdx: 0 }
}

// ── Project data model ─────────────────────────────────────────────────────
export interface ProjectData {
  groomName: string
  brideName: string
  groom: CharacterVariants
  bride: CharacterVariants
  trailerEnabled: boolean
  sections: Record<SectionKey, SectionData>
}

const EMPTY_SECTION: SectionData = { photos: [], narration: '' }

export function createDefaultProject(): ProjectData {
  return {
    groomName: '',
    brideName: '',
    groom: generateVariants(),
    bride: generateVariants(),
    trailerEnabled: true,
    sections: {
      opening:       { ...EMPTY_SECTION },
      trailer:       { ...EMPTY_SECTION },
      whoWeAre:      { ...EMPTY_SECTION },
      howWeMet:      { ...EMPTY_SECTION },
      becameLovers:  { ...EMPTY_SECTION },
      decision:      { ...EMPTY_SECTION },
      thanks:        { ...EMPTY_SECTION, narration: '와주셔서 감사합니다.' },
    },
  }
}

// ── Narration auto-generators ──────────────────────────────────────────────
export const buildNarration = {
  opening: (groom: string, bride: string) =>
    `안녕하세요, ${groom || '신랑'}과 ${bride || '신부'}입니다.`,

  whoWeAre: (groom: string, bride: string) =>
    `${groom || '신랑'}과 ${bride || '신부'}의 이야기를 시작합니다.`,

  howWeMet: (date: string, place: string) => {
    const d = date || '어느 날'
    const p = place || '어느 곳'
    return `${d}, 우리는 ${p}에서 처음 만났습니다.`
  },

  becameLovers: (trigger: string) => {
    const t = trigger || '서로의 소중함'
    return `함께한 시간 속에서 ${t}을(를) 느꼈고, 우리는 연인이 되었습니다.`
  },

  decision: (date: string, reason: string) => {
    const d = date || '그 순간'
    const r = reason || '평생 함께하고 싶다는 확신'
    return `${d}, ${r}을(를) 확신했고 우리는 부부가 되기로 했습니다.`
  },

  thanks: () => '와주셔서 감사합니다.',
}

// ── Step metadata ──────────────────────────────────────────────────────────
export const STEP_META = [
  { key: 'checklist',    label: '준비',     labelEn: 'Prepare'  },
  { key: 'character',    label: '캐릭터',   labelEn: 'Character'},
  { key: 'opening',      label: '오프닝',   labelEn: 'Opening'  },
  { key: 'trailer',      label: '예고편',   labelEn: 'Trailer'  },
  { key: 'whoWeAre',     label: '우리는',   labelEn: 'Us'       },
  { key: 'howWeMet',     label: '만남',     labelEn: 'Meeting'  },
  { key: 'becameLovers', label: '연인',     labelEn: 'Together' },
  { key: 'decision',     label: '결심',     labelEn: 'Decision' },
  { key: 'thanks',       label: '감사',     labelEn: 'Thanks'   },
  { key: 'review',       label: '완성',     labelEn: 'Finish'   },
] as const
