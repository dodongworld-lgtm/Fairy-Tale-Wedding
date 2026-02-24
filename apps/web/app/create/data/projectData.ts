// ── Section types ──────────────────────────────────────────────────────────
export type SectionKey =
  | 'opening'
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

// ── Project data model ─────────────────────────────────────────────────────
export interface ProjectData {
  groomName: string
  brideName: string
  groomPhoto: string     // object URL or ''
  bridePhoto: string     // object URL or ''
  sections: Record<SectionKey, SectionData>
}

const EMPTY_SECTION: SectionData = { photos: [], narration: '' }

export function createDefaultProject(): ProjectData {
  return {
    groomName: '',
    brideName: '',
    groomPhoto: '',
    bridePhoto: '',
    sections: {
      opening:       { ...EMPTY_SECTION },
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

// ── Step metadata (0~8, total 9 steps) ────────────────────────────────────
export const STEP_META = [
  { key: 'checklist',    label: '준비',     labelEn: 'Prepare'  },  // 0
  { key: 'photos',       label: '사진',     labelEn: 'Photos'   },  // 1
  { key: 'opening',      label: '오프닝',   labelEn: 'Opening'  },  // 2
  { key: 'whoWeAre',     label: '우리는',   labelEn: 'Us'       },  // 3
  { key: 'howWeMet',     label: '만남',     labelEn: 'Meeting'  },  // 4
  { key: 'becameLovers', label: '연인',     labelEn: 'Together' },  // 5
  { key: 'decision',     label: '결심',     labelEn: 'Decision' },  // 6
  { key: 'thanks',       label: '감사',     labelEn: 'Thanks'   },  // 7
  { key: 'review',       label: '완성',     labelEn: 'Finish'   },  // 8
] as const
