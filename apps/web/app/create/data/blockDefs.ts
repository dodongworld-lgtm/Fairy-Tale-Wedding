// ── Block & Template definitions for modular story system ─────────────────

// Inline data type to avoid coupling with SectionData (customText2 added in Task 2)
type BlockSectionData = {
  photos: string[]
  narration: string
  date?: string
  place?: string
  customText?: string
  customText2?: string
}

// ── Type definitions ──────────────────────────────────────────────────────

export interface BlockFieldDef {
  key: string
  type: 'text' | 'textarea' | 'chips'
  label: string
  placeholder: string
  maxLength?: number
  chipOptions?: string[]
}

export interface StoryBlockDef {
  id: string
  category: string
  name: string
  subtitle: string
  icon: string
  fields: BlockFieldDef[]
  photoMin: number
  photoMax: number
  buildNarration: (data: BlockSectionData, groom: string, bride: string) => string
}

export interface StoryTemplateDef {
  id: string
  name: string
  subtitle: string
  icon: string
  blockIds: string[]
}

// ── 15 Story Block Definitions ────────────────────────────────────────────

export const STORY_BLOCKS: StoryBlockDef[] = [
  // ─── 소개 ───
  {
    id: 'who-we-are',
    category: '소개',
    name: '우리는 이런 사람',
    subtitle: '서로를 한 줄로 소개해 보세요',
    icon: '👫',
    fields: [
      {
        key: 'customText',
        type: 'text',
        label: '{groom}을 한 줄로 소개하면',
        placeholder: '예) 웃음이 많은 따뜻한 사람',
        maxLength: 60,
      },
      {
        key: 'customText2',
        type: 'text',
        label: '{bride}를 한 줄로 소개하면',
        placeholder: '예) 세심하고 다정한 사람',
        maxLength: 60,
      },
    ],
    photoMin: 0,
    photoMax: 0,
    buildNarration: (d, g, b) => {
      const gDesc = d.customText || '멋진 사람'
      const bDesc = d.customText2 || '멋진 사람'
      return `${g || '신랑'}은 ${gDesc}, ${b || '신부'}는 ${bDesc}. 그런 두 사람의 이야기를 시작합니다.`
    },
  },
  {
    id: 'childhood',
    category: '소개',
    name: '어린 시절',
    subtitle: '어린 시절의 추억을 나눠 보세요',
    icon: '💒',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '어린 시절 이야기',
        placeholder: '예) 어릴 적 꿈은 과학자였지만, 지금은 당신 옆에 서 있는 게 꿈이 되었어요.',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 2,
    buildNarration: (d, g, b) => {
      const text = d.customText || '각자의 어린 시절을 보내며 서로를 향해 걸어왔습니다'
      return `${g || '신랑'}과 ${b || '신부'}는 ${text}.`
    },
  },

  // ─── 만남 ───
  {
    id: 'how-we-met',
    category: '만남',
    name: '첫 만남',
    subtitle: '우리가 처음 만난 날을 떠올려 보세요',
    icon: '🤝',
    fields: [
      {
        key: 'date',
        type: 'text',
        label: '만난 시기',
        placeholder: '예) 2020년 봄',
      },
      {
        key: 'place',
        type: 'text',
        label: '만난 장소',
        placeholder: '예) 대학교 동아리방',
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d) => {
      const dt = d.date || '어느 날'
      const pl = d.place || '어느 곳'
      return `${dt}, 우리는 ${pl}에서 처음 만났습니다.`
    },
  },
  {
    id: 'first-impression',
    category: '만남',
    name: '첫인상',
    subtitle: '서로의 첫인상을 기억하시나요?',
    icon: '✨',
    fields: [
      {
        key: 'customText',
        type: 'text',
        label: '{groom}이 본 {bride}의 첫인상',
        placeholder: '예) 환하게 웃는 모습이 눈에 들어왔어요',
        maxLength: 60,
      },
      {
        key: 'customText2',
        type: 'text',
        label: '{bride}가 본 {groom}의 첫인상',
        placeholder: '예) 조용하지만 따뜻한 느낌이었어요',
        maxLength: 60,
      },
    ],
    photoMin: 0,
    photoMax: 0,
    buildNarration: (d, g, b) => {
      const gSays = d.customText || '특별한 느낌'
      const bSays = d.customText2 || '따뜻한 인상'
      return `${g || '신랑'}의 눈에 비친 ${b || '신부'}는 "${gSays}", ${b || '신부'}의 눈에 비친 ${g || '신랑'}은 "${bSays}"이었습니다.`
    },
  },

  // ─── 연애 ───
  {
    id: 'first-date',
    category: '연애',
    name: '첫 데이트',
    subtitle: '설레던 첫 데이트를 들려주세요',
    icon: '💕',
    fields: [
      {
        key: 'place',
        type: 'text',
        label: '첫 데이트 장소',
        placeholder: '예) 한강 공원',
      },
      {
        key: 'customText',
        type: 'textarea',
        label: '첫 데이트 이야기',
        placeholder: '예) 어색했지만 헤어지기 싫었던 그날의 기억',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d) => {
      const pl = d.place || '어느 곳'
      const story = d.customText || '설레는 마음으로 함께한 시간'
      return `우리의 첫 데이트는 ${pl}에서. ${story}.`
    },
  },
  {
    id: 'fell-in-love',
    category: '연애',
    name: '사랑에 빠진 순간',
    subtitle: '연인이 된 계기를 알려주세요',
    icon: '💘',
    fields: [
      {
        key: 'date',
        type: 'text',
        label: '사귀기 시작한 시기',
        placeholder: '예) 2020년 가을',
      },
      {
        key: 'customText',
        type: 'chips',
        label: '사랑에 빠진 이유',
        placeholder: '하나를 선택해 주세요',
        chipOptions: [
          '설레는 마음',
          '자연스럽게',
          '운명이라 느껴서',
          '용기를 냈어요',
          '직접 고백했어요',
        ],
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d) => {
      const dt = d.date || '어느 순간'
      const reason = d.customText || '서로의 소중함'
      return `${dt}, "${reason}"이라는 마음으로 우리는 연인이 되었습니다.`
    },
  },
  {
    id: 'travel',
    category: '연애',
    name: '함께한 여행',
    subtitle: '둘이 함께 떠났던 여행 이야기',
    icon: '✈️',
    fields: [
      {
        key: 'place',
        type: 'text',
        label: '여행지',
        placeholder: '예) 제주도',
      },
      {
        key: 'customText',
        type: 'textarea',
        label: '여행 이야기',
        placeholder: '예) 바다 앞에서 영원히 함께하자고 약속했어요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d) => {
      const pl = d.place || '어딘가'
      const story = d.customText || '소중한 추억을 쌓았습니다'
      return `${pl}로 떠난 여행에서 우리는 ${story}.`
    },
  },
  {
    id: 'daily-life',
    category: '연애',
    name: '일상의 행복',
    subtitle: '함께여서 행복했던 일상의 순간들',
    icon: '☕',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '함께한 일상 이야기',
        placeholder: '예) 주말마다 함께 요리하고, 저녁엔 산책하며 하루를 나눴어요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d, g, b) => {
      const story = d.customText || '함께하는 평범한 하루가 가장 행복했습니다'
      return `${g || '신랑'}과 ${b || '신부'}에게 가장 빛나는 순간은 일상 속에 있었습니다. ${story}.`
    },
  },
  {
    id: 'overcome',
    category: '연애',
    name: '위기와 극복',
    subtitle: '함께 이겨낸 어려운 순간들',
    icon: '🌧️',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '어려웠던 순간',
        placeholder: '예) 장거리 연애가 힘들었지만...',
        maxLength: 120,
      },
      {
        key: 'customText2',
        type: 'textarea',
        label: '극복한 이야기',
        placeholder: '예) 매일 영상통화를 하며 마음을 나눴어요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 2,
    buildNarration: (d) => {
      const crisis = d.customText || '힘든 시간'
      const overcome = d.customText2 || '서로를 꼭 붙잡았습니다'
      return `${crisis}도 있었지만, ${overcome}. 그 시간이 우리를 더 단단하게 만들었습니다.`
    },
  },

  // ─── 특별 ───
  {
    id: 'pet-hobby',
    category: '특별',
    name: '반려동물/취미',
    subtitle: '함께 즐기는 취미나 반려동물 이야기',
    icon: '🐾',
    fields: [
      {
        key: 'customText',
        type: 'text',
        label: '반려동물 이름 또는 취미',
        placeholder: '예) 강아지 콩이 / 함께하는 등산',
        maxLength: 60,
      },
      {
        key: 'customText2',
        type: 'textarea',
        label: '함께하는 이야기',
        placeholder: '예) 콩이와 함께 산책하는 시간이 제일 좋아요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 3,
    buildNarration: (d, g, b) => {
      const subject = d.customText || '특별한 취미'
      const story = d.customText2 || '함께하며 더 큰 행복을 느낍니다'
      return `${g || '신랑'}과 ${b || '신부'}에겐 ${subject}이(가) 있습니다. ${story}.`
    },
  },

  // ─── 전환 ───
  {
    id: 'proposal',
    category: '전환',
    name: '프로포즈',
    subtitle: '평생을 함께하자고 한 그 순간',
    icon: '💍',
    fields: [
      {
        key: 'place',
        type: 'text',
        label: '프로포즈 장소',
        placeholder: '예) 남산타워',
      },
      {
        key: 'customText',
        type: 'textarea',
        label: '프로포즈 이야기',
        placeholder: '예) 떨리는 마음으로 반지를 건넸어요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 2,
    buildNarration: (d) => {
      const pl = d.place || '특별한 장소'
      const story = d.customText || '평생을 함께하자는 말을 건넸습니다'
      return `${pl}에서, ${story}.`
    },
  },
  {
    id: 'decision',
    category: '전환',
    name: '부부가 되기로',
    subtitle: '결혼을 결심하게 된 이야기',
    icon: '🎊',
    fields: [
      {
        key: 'date',
        type: 'text',
        label: '결심한 시기',
        placeholder: '예) 2024년 봄',
      },
      {
        key: 'customText',
        type: 'textarea',
        label: '결심하게 된 이야기',
        placeholder: '예) 이 사람과 평생을 함께하고 싶다는 확신이 들었어요',
        maxLength: 120,
      },
    ],
    photoMin: 1,
    photoMax: 2,
    buildNarration: (d) => {
      const dt = d.date || '그 순간'
      const story = d.customText || '평생 함께하고 싶다는 확신'
      return `${dt}, ${story}을(를) 확신했고 우리는 부부가 되기로 했습니다.`
    },
  },

  // ─── 가족 ───
  {
    id: 'thanks-parents',
    category: '가족',
    name: '부모님 감사',
    subtitle: '부모님께 전하는 감사의 마음',
    icon: '🙏',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '{groom}의 부모님께',
        placeholder: '예) 항상 믿어주셔서 감사합니다',
        maxLength: 100,
      },
      {
        key: 'customText2',
        type: 'textarea',
        label: '{bride}의 부모님께',
        placeholder: '예) 사랑으로 키워주셔서 감사합니다',
        maxLength: 100,
      },
    ],
    photoMin: 0,
    photoMax: 2,
    buildNarration: (d, g, b) => {
      const gThanks = d.customText || '감사합니다'
      const bThanks = d.customText2 || '감사합니다'
      return `${g || '신랑'}의 부모님께: ${gThanks}. ${b || '신부'}의 부모님께: ${bThanks}.`
    },
  },

  // ─── 약속 ───
  {
    id: 'message-to-each',
    category: '약속',
    name: '서로에게 하는 말',
    subtitle: '상대방에게 전하고 싶은 한마디',
    icon: '💌',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '{groom}이 {bride}에게',
        placeholder: '예) 매일 웃게 해줄게요',
        maxLength: 120,
      },
      {
        key: 'customText2',
        type: 'textarea',
        label: '{bride}가 {groom}에게',
        placeholder: '예) 언제나 당신 편이 될게요',
        maxLength: 120,
      },
    ],
    photoMin: 0,
    photoMax: 0,
    buildNarration: (d, g, b) => {
      const gMsg = d.customText || '항상 사랑해'
      const bMsg = d.customText2 || '항상 사랑해'
      return `${g || '신랑'}이 ${b || '신부'}에게: "${gMsg}". ${b || '신부'}가 ${g || '신랑'}에게: "${bMsg}".`
    },
  },
  {
    id: 'future-promise',
    category: '약속',
    name: '미래의 약속',
    subtitle: '함께 그리는 미래의 모습',
    icon: '🌅',
    fields: [
      {
        key: 'customText',
        type: 'textarea',
        label: '미래의 약속',
        placeholder: '예) 매일 함께 웃고, 어려울 땐 서로의 버팀목이 되겠습니다',
        maxLength: 120,
      },
    ],
    photoMin: 0,
    photoMax: 1,
    buildNarration: (d, g, b) => {
      const promise = d.customText || '언제나 서로의 편이 되어주겠습니다'
      return `${g || '신랑'}과 ${b || '신부'}가 약속합니다. ${promise}.`
    },
  },
]

// ── 4 Story Template Definitions ──────────────────────────────────────────

export const STORY_TEMPLATES: StoryTemplateDef[] = [
  {
    id: 'classic',
    name: '클래식 러브스토리',
    subtitle: '만남부터 프로포즈까지, 전형적인 러브스토리',
    icon: '💎',
    blockIds: ['how-we-met', 'fell-in-love', 'proposal', 'message-to-each', 'thanks-parents'],
  },
  {
    id: 'daily',
    name: '우리만의 일상',
    subtitle: '소소하지만 확실한 행복을 담은 이야기',
    icon: '🏡',
    blockIds: ['who-we-are', 'daily-life', 'travel', 'pet-hobby', 'future-promise'],
  },
  {
    id: 'dramatic',
    name: '드라마틱 스토리',
    subtitle: '극적인 만남과 감동적인 프로포즈',
    icon: '🎬',
    blockIds: ['first-impression', 'first-date', 'overcome', 'proposal', 'message-to-each'],
  },
  {
    id: 'family',
    name: '가족 중심',
    subtitle: '가족과 함께 만들어가는 이야기',
    icon: '👨‍👩‍👧‍👦',
    blockIds: ['childhood', 'how-we-met', 'decision', 'thanks-parents', 'future-promise'],
  },
]

// ── BLOCK_MAP helper for quick lookup by ID ───────────────────────────────

export const BLOCK_MAP: Record<string, StoryBlockDef> = Object.fromEntries(
  STORY_BLOCKS.map(b => [b.id, b])
)
