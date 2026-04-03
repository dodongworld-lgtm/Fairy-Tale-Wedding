# 모듈형 스토리 블록 시스템 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 고정 9단계 위저드를 "오프닝(고정) + 선택 블록 5개 + 아웃트로(고정)" 모듈형 시스템으로 전환

**Architecture:** 15개 블록 정의를 데이터로 분리하고, 4종 템플릿 또는 직접 선택으로 5개 블록을 고른 뒤, 동적으로 스텝 컴포넌트를 렌더링. 기존 step 컴포넌트의 공통 패턴(사진 업로드, 나레이션 자동생성, 텍스트 입력)을 재사용 가능한 단일 `BlockEditor` 컴포넌트로 통합.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## Task 1: 블록 정의 데이터 파일 생성

**Files:**
- Create: `apps/web/app/create/data/blockDefs.ts`

**Step 1: 블록 타입 정의 작성**

```typescript
// 블록 필드 타입
export interface BlockFieldDef {
  key: string                // SectionData 내 저장 키 (e.g. 'date', 'place', 'customText')
  type: 'text' | 'textarea' | 'chips' | 'dual-text' | 'dual-textarea'
  label: string
  placeholder: string
  maxLength?: number
  chipOptions?: string[]     // type='chips'일 때
  secondLabel?: string       // type='dual-*'일 때 (신부용)
  secondPlaceholder?: string
}

export interface StoryBlockDef {
  id: string
  category: string
  name: string
  subtitle: string
  icon: string               // emoji
  fields: BlockFieldDef[]
  photoMin: number
  photoMax: number
  buildNarration: (data: SectionData, groom: string, bride: string) => string
}

export interface StoryTemplateDef {
  id: string
  name: string
  subtitle: string
  icon: string
  blockIds: string[]          // 5개
}
```

**Step 2: 15개 블록 정의 작성**

```typescript
export const STORY_BLOCKS: StoryBlockDef[] = [
  {
    id: 'who-we-are',
    category: '소개',
    name: '우리는 이런 사람',
    subtitle: '신랑 신부를 각각 소개해요',
    icon: '👫',
    fields: [
      { key: 'customText', type: 'text', label: '{groom} 한 줄 소개', placeholder: '예: 따뜻하고 유머 넘치는 사람이에요', maxLength: 60 },
      { key: 'customText2', type: 'text', label: '{bride} 한 줄 소개', placeholder: '예: 밝고 사랑스러운 사람이에요', maxLength: 60 },
    ],
    photoMin: 0, photoMax: 0,
    buildNarration: (d, g, b) => `${g}과 ${b}의 이야기를 시작합니다.`,
  },
  {
    id: 'childhood',
    category: '소개',
    name: '어린 시절',
    subtitle: '어릴 때 모습과 에피소드를 담아요',
    icon: '👶',
    fields: [
      { key: 'customText', type: 'textarea', label: '에피소드', placeholder: '예: 어릴 때부터 활발하고 장난기 많은 아이였어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 2,
    buildNarration: (d) => d.customText || '어린 시절의 모습이에요.',
  },
  {
    id: 'how-we-met',
    category: '만남',
    name: '첫 만남',
    subtitle: '처음 만난 이야기를 담아요',
    icon: '🤝',
    fields: [
      { key: 'date', type: 'text', label: '시기', placeholder: '예: 2019년 봄' },
      { key: 'place', type: 'text', label: '장소', placeholder: '예: 대학교 도서관' },
    ],
    photoMin: 1, photoMax: 3,
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
    subtitle: '서로의 첫인상을 솔직하게 담아요',
    icon: '👀',
    fields: [
      { key: 'customText', type: 'text', label: '{groom}이 본 {bride} 첫인상', placeholder: '예: 눈웃음이 너무 예뻤어요', maxLength: 60 },
      { key: 'customText2', type: 'text', label: '{bride}가 본 {groom} 첫인상', placeholder: '예: 키가 크고 웃는 모습이 따뜻했어요', maxLength: 60 },
    ],
    photoMin: 0, photoMax: 0,
    buildNarration: (d) => {
      const g = d.customText || '첫인상이 좋았고'
      const b = d.customText2 || '서로 호감을 느꼈습니다'
      return `${g}, ${b}.`
    },
  },
  {
    id: 'first-date',
    category: '연애',
    name: '첫 데이트',
    subtitle: '첫 데이트의 추억을 담아요',
    icon: '☕',
    fields: [
      { key: 'place', type: 'text', label: '장소', placeholder: '예: 홍대 카페' },
      { key: 'customText', type: 'textarea', label: '에피소드', placeholder: '예: 떨리는 마음으로 만났는데 3시간이 순식간에 지나갔어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 3,
    buildNarration: (d) => {
      const pl = d.place || '설레는 장소'
      return `${pl}에서의 첫 데이트, 시간이 멈춘 것 같았습니다.`
    },
  },
  {
    id: 'fell-in-love',
    category: '연애',
    name: '사랑에 빠진 순간',
    subtitle: '연애를 시작하게 된 계기를 담아요',
    icon: '💕',
    fields: [
      { key: 'date', type: 'text', label: '시기 (선택)', placeholder: '예: 그 해 여름' },
      { key: 'customText', type: 'chips', label: '계기', placeholder: '예: 설레는 마음', chipOptions: ['설레는 마음', '자연스럽게', '운명이라 느껴서', '용기를 냈어요', '직접 고백했어요'] },
    ],
    photoMin: 1, photoMax: 3,
    buildNarration: (d) => {
      const t = d.customText || '서로의 소중함'
      return `함께한 시간 속에서 ${t}을(를) 느꼈고, 우리는 연인이 되었습니다.`
    },
  },
  {
    id: 'travel',
    category: '연애',
    name: '함께한 여행',
    subtitle: '함께 떠난 여행의 추억을 담아요',
    icon: '✈️',
    fields: [
      { key: 'place', type: 'text', label: '여행지', placeholder: '예: 제주도' },
      { key: 'customText', type: 'textarea', label: '추억', placeholder: '예: 바다 앞에서 함께 본 일몰이 가장 기억에 남아요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 3,
    buildNarration: (d) => {
      const pl = d.place || '함께 떠난 여행'
      return `${pl}에서의 시간, 둘만의 소중한 추억이 되었습니다.`
    },
  },
  {
    id: 'daily-life',
    category: '연애',
    name: '일상의 행복',
    subtitle: '소소한 일상 속 행복한 장면을 담아요',
    icon: '🏠',
    fields: [
      { key: 'customText', type: 'textarea', label: '에피소드', placeholder: '예: 주말마다 같이 요리하는 게 가장 행복해요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 3,
    buildNarration: (d) => d.customText || '함께하는 소소한 일상이 가장 큰 행복입니다.',
  },
  {
    id: 'overcome',
    category: '연애',
    name: '위기와 극복',
    subtitle: '힘든 시기를 함께 이겨낸 이야기를 담아요',
    icon: '🌈',
    fields: [
      { key: 'customText', type: 'textarea', label: '상황', placeholder: '예: 장거리 연애를 2년간 했어요', maxLength: 120 },
      { key: 'customText2', type: 'textarea', label: '극복 계기', placeholder: '예: 매일 영상통화하며 서로를 더 알아갔어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 2,
    buildNarration: (d) => {
      const s = d.customText || '힘든 시간'
      return `${s}도 함께여서 이겨낼 수 있었습니다.`
    },
  },
  {
    id: 'pet-hobby',
    category: '특별',
    name: '반려동물/취미',
    subtitle: '함께 키운 반려동물이나 공통 취미를 담아요',
    icon: '🐾',
    fields: [
      { key: 'customText', type: 'text', label: '이름 또는 활동', placeholder: '예: 고양이 몽이 / 함께 캠핑', maxLength: 60 },
      { key: 'customText2', type: 'textarea', label: '에피소드', placeholder: '예: 몽이가 우리 사이를 더 가깝게 만들어줬어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 3,
    buildNarration: (d) => {
      const name = d.customText || '함께하는 시간'
      return `${name}이(가) 우리의 이야기를 더 풍성하게 만들어주었습니다.`
    },
  },
  {
    id: 'proposal',
    category: '전환',
    name: '프로포즈',
    subtitle: '프로포즈 순간을 담아요',
    icon: '💍',
    fields: [
      { key: 'place', type: 'text', label: '장소', placeholder: '예: 남산타워' },
      { key: 'customText', type: 'textarea', label: '어떻게 했나요?', placeholder: '예: 깜짝 이벤트로 준비했어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 2,
    buildNarration: (d) => {
      const pl = d.place || '특별한 장소'
      return `${pl}에서, 평생을 함께하자는 약속을 했습니다.`
    },
  },
  {
    id: 'decision',
    category: '전환',
    name: '부부가 되기로',
    subtitle: '결혼을 결심한 순간을 담아요',
    icon: '💒',
    fields: [
      { key: 'date', type: 'text', label: '시기 (선택)', placeholder: '예: 2023년 겨울' },
      { key: 'customText', type: 'textarea', label: '결심 계기', placeholder: '예: 평생 이 사람과 함께하고 싶다는 확신이 들었어요', maxLength: 120 },
    ],
    photoMin: 1, photoMax: 2,
    buildNarration: (d) => {
      const dt = d.date || '그 순간'
      const r = d.customText || '평생 함께하고 싶다는 확신'
      return `${dt}, ${r}을(를) 확신했고 우리는 부부가 되기로 했습니다.`
    },
  },
  {
    id: 'thanks-parents',
    category: '가족',
    name: '부모님 감사',
    subtitle: '양가 부모님께 감사 인사를 전해요',
    icon: '🙏',
    fields: [
      { key: 'customText', type: 'textarea', label: '{groom}측 부모님께', placeholder: '예: 항상 묵묵히 응원해주셔서 감사합니다', maxLength: 100 },
      { key: 'customText2', type: 'textarea', label: '{bride}측 부모님께', placeholder: '예: 사랑으로 키워주셔서 감사합니다', maxLength: 100 },
    ],
    photoMin: 0, photoMax: 2,
    buildNarration: (d) => '키워주시고 사랑해주신 양가 부모님께 진심으로 감사드립니다.',
  },
  {
    id: 'message-to-each',
    category: '약속',
    name: '서로에게 하는 말',
    subtitle: '서로에게 진심을 전해요',
    icon: '💌',
    fields: [
      { key: 'customText', type: 'textarea', label: '{groom}이 {bride}에게', placeholder: '예: 매일 너를 웃게 해줄게', maxLength: 120 },
      { key: 'customText2', type: 'textarea', label: '{bride}가 {groom}에게', placeholder: '예: 언제나 네 편이 되어줄게', maxLength: 120 },
    ],
    photoMin: 0, photoMax: 0,
    buildNarration: (d, g, b) => `${g}과 ${b}가 서로에게 전하는 마음입니다.`,
  },
  {
    id: 'future-promise',
    category: '약속',
    name: '미래의 약속',
    subtitle: '함께 그리는 미래를 담아요',
    icon: '🌟',
    fields: [
      { key: 'customText', type: 'textarea', label: '소망 / 버킷리스트', placeholder: '예: 아이 둘, 마당 있는 집, 매년 여행 한 번', maxLength: 120 },
    ],
    photoMin: 0, photoMax: 1,
    buildNarration: (d) => d.customText || '함께 그려갈 미래가 기대됩니다.',
  },
]

export const BLOCK_MAP = Object.fromEntries(STORY_BLOCKS.map(b => [b.id, b]))
```

**Step 3: 4종 템플릿 정의 작성**

```typescript
export const STORY_TEMPLATES: StoryTemplateDef[] = [
  {
    id: 'classic',
    name: '클래식 러브스토리',
    subtitle: '정석적인 감동 스토리',
    icon: '📖',
    blockIds: ['how-we-met', 'fell-in-love', 'proposal', 'message-to-each', 'thanks-parents'],
  },
  {
    id: 'daily',
    name: '우리만의 일상',
    subtitle: '따뜻하고 소소한 이야기',
    icon: '☀️',
    blockIds: ['who-we-are', 'daily-life', 'travel', 'pet-hobby', 'future-promise'],
  },
  {
    id: 'dramatic',
    name: '드라마틱 스토리',
    subtitle: '영화같은 극적 전개',
    icon: '🎬',
    blockIds: ['first-impression', 'first-date', 'overcome', 'proposal', 'message-to-each'],
  },
  {
    id: 'family',
    name: '가족 중심',
    subtitle: '한국식 전통 스타일',
    icon: '👨‍👩‍👧‍👦',
    blockIds: ['childhood', 'how-we-met', 'decision', 'thanks-parents', 'future-promise'],
  },
]
```

**Step 4: 빌드 확인**

Run: `cd apps/web && npx tsc --noEmit`
Expected: 타입 에러 없음

**Step 5: 커밋**

```bash
git add apps/web/app/create/data/blockDefs.ts
git commit -m "feat: add story block and template definitions (15 blocks, 4 templates)"
```

---

## Task 2: ProjectData 모델 확장

**Files:**
- Modify: `apps/web/app/create/data/projectData.ts`

**Step 1: SectionData에 customText2 추가, ProjectData에 블록 선택 필드 추가**

기존 `SectionKey` 유니온 → 문자열 인덱스 시그니처로 확장.

```typescript
// projectData.ts 변경 사항

export interface SectionData {
  photos: string[]
  narration: string
  date?: string
  place?: string
  customText?: string
  customText2?: string    // NEW: 신부용 (첫인상, 서로에게 하는 말 등)
}

// 고정 섹션 키
export type FixedSectionKey = 'opening' | 'outro'

export interface ProjectData {
  groomName: string
  brideName: string
  groomPhoto: string
  bridePhoto: string
  templateId: string | null         // NEW: 선택한 템플릿 (null = 직접 선택)
  selectedBlocks: string[]          // NEW: 선택한 블록 ID 5개 (순서 포함)
  sections: Record<string, SectionData>  // CHANGED: dynamic keys
}

export function createDefaultProject(): ProjectData {
  return {
    groomName: '',
    brideName: '',
    groomPhoto: '',
    bridePhoto: '',
    templateId: null,
    selectedBlocks: [],
    sections: {
      opening: { photos: [], narration: '' },
      outro:   { photos: [], narration: '와주셔서 감사합니다.' },
    },
  }
}
```

기존 `SectionKey` 타입, `buildNarration` 객체, `STEP_META`는 제거하거나 deprecated 처리.

**Step 2: STEP_META를 동적으로 생성하는 헬퍼 추가**

```typescript
import { BLOCK_MAP } from './blockDefs'

export function buildStepMeta(selectedBlocks: string[]) {
  return [
    { key: 'checklist', label: '준비' },
    { key: 'photos',    label: '사진' },
    { key: 'template',  label: '템플릿' },   // NEW
    { key: 'opening',   label: '오프닝' },
    ...selectedBlocks.map(id => ({
      key: id,
      label: BLOCK_MAP[id]?.name || id,
    })),
    { key: 'outro',     label: '감사' },
    { key: 'review',    label: '완성' },
  ]
}
// 총 스텝: 3 고정(체크리스트+사진+템플릿) + 1 오프닝 + 5 블록 + 1 아웃트로 + 1 리뷰 = 11
```

**Step 3: 빌드 확인 (타입 에러 있을 수 있음 — 다음 태스크에서 해결)**

Run: `cd apps/web && npx tsc --noEmit 2>&1 | head -30`
Expected: page.tsx 등에서 타입 에러 발생 (예상됨, Task 5에서 해결)

**Step 4: 커밋**

```bash
git add apps/web/app/create/data/projectData.ts
git commit -m "feat: extend ProjectData with templateId, selectedBlocks, dynamic sections"
```

---

## Task 3: 템플릿 선택 UI 컴포넌트

**Files:**
- Create: `apps/web/app/create/components/steps/StepTemplateSelect.tsx`

**Step 1: 컴포넌트 작성**

카드 그리드로 4종 템플릿 + "직접 고를래요" 옵션.
템플릿 선택 시 `selectedBlocks`에 5개 블록 자동 세팅.
"직접 고를래요" 선택 시 → 블록 선택 UI(StepBlockPicker)로 전환.

```typescript
// Props
interface Props {
  project: ProjectData
  onSelectTemplate: (templateId: string, blockIds: string[]) => void
  onCustomSelect: () => void  // "직접 고를래요" 클릭 시
}
```

UI 구조:
- 제목: "어떤 스토리를 만들어볼까요?"
- 부제: "템플릿을 선택하면 AI가 추천하는 구성으로 시작해요"
- 4개 템플릿 카드 (아이콘 + 이름 + 설명 + 포함 블록 태그 5개)
- 하단: "직접 고를래요" 텍스트 버튼

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/steps/StepTemplateSelect.tsx
git commit -m "feat: add template selection step component"
```

---

## Task 4: 블록 선택 UI 컴포넌트

**Files:**
- Create: `apps/web/app/create/components/steps/StepBlockPicker.tsx`

**Step 1: 컴포넌트 작성**

카테고리별로 15개 블록을 보여주고, 유저가 5개를 토글 선택.
선택한 블록은 하단에 순서대로 표시, 드래그앤드롭으로 순서 조정.

```typescript
interface Props {
  selectedBlocks: string[]
  onChangeBlocks: (blockIds: string[]) => void
  onNext: () => void
}
```

UI 구조:
- 제목: "우리 이야기에 담을 장면 5개를 골라주세요"
- 카테고리별 블록 카드 그리드 (소개/만남/연애/특별/전환/가족/약속)
- 각 카드: 아이콘 + 이름 + 부제, 선택 시 체크 표시 + 번호
- 선택 카운터: "3/5 선택됨"
- 하단: 선택한 블록 순서 리스트 (위/아래 화살표로 순서 변경)
- 5개 선택 완료 시 "다음" 버튼 활성화

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/steps/StepBlockPicker.tsx
git commit -m "feat: add block picker step with category grid and ordering"
```

---

## Task 5: 범용 BlockEditor 컴포넌트

**Files:**
- Create: `apps/web/app/create/components/BlockEditor.tsx`

**Step 1: 컴포넌트 작성**

블록 정의(StoryBlockDef)를 받아서 해당 필드들을 자동으로 렌더링하는 범용 에디터.
기존 Step5HowWeMet ~ Step7Decision의 공통 패턴(텍스트 입력, 사진 업로드, 칩 선택, 나레이션 미리보기)을 통합.

```typescript
interface Props {
  block: StoryBlockDef
  data: SectionData
  groomName: string
  brideName: string
  onChange: (data: Partial<SectionData>) => void
  onNext: () => void
}
```

렌더링 로직:
1. 제목: `block.name` + 부제: `block.subtitle`
2. `block.fields` 순회하며 타입별 렌더:
   - `text` → `<input type="text">`
   - `textarea` → `<textarea>`
   - `chips` → 칩 버튼 그룹 + 텍스트 입력 (기존 Step6BecameLovers 패턴)
   - `dual-text` → 2개 텍스트 입력 (customText + customText2)
   - `dual-textarea` → 2개 textarea
3. `block.photoMax > 0` → 사진 업로드 영역 (기존 Step5HowWeMet 패턴 재사용)
4. 나레이션 미리보기 박스 (`block.buildNarration(data, groom, bride)`)
5. 편집 가능한 나레이션 textarea (maxLength 150)
6. 다음 버튼 (photoMin > 0이면 사진 검증)

label 내 `{groom}`, `{bride}` 플레이스홀더를 실제 이름으로 치환.

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/BlockEditor.tsx
git commit -m "feat: add generic BlockEditor component for dynamic story blocks"
```

---

## Task 6: 아웃트로 컴포넌트 (기존 Step8Thanks 리팩터)

**Files:**
- Create: `apps/web/app/create/components/steps/StepOutro.tsx`

**Step 1: 기존 Step8Thanks.tsx를 복사하여 StepOutro.tsx 생성**

섹션 키를 `'thanks'` → `'outro'`로 변경. 나머지 UI 동일.

```typescript
interface Props {
  project: ProjectData
  onSection: (key: string, data: Partial<SectionData>) => void
  onNext: () => void
}
```

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/steps/StepOutro.tsx
git commit -m "feat: add StepOutro component (renamed from thanks)"
```

---

## Task 7: Step9Review 동적 블록 지원

**Files:**
- Modify: `apps/web/app/create/components/steps/Step9Review.tsx`

**Step 1: 고정 섹션 목록 대신 selectedBlocks 기반 동적 체크리스트**

변경 내용:
- 기존 하드코딩된 6개 섹션 목록 → `project.selectedBlocks` 기반 동적 생성
- `BLOCK_MAP`에서 블록 메타 조회하여 이름/아이콘 표시
- 필수 검증: `photoMin > 0`인 블록에 사진이 없으면 에러
- 오프닝/아웃트로는 항상 표시 (선택 사항)

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/steps/Step9Review.tsx
git commit -m "feat: update Step9Review to support dynamic story blocks"
```

---

## Task 8: page.tsx 전면 리팩토링

**Files:**
- Modify: `apps/web/app/create/page.tsx`

**Step 1: 동적 스텝 시스템으로 전환**

핵심 변경:
- `step` 숫자가 이제 동적 스텝 배열의 인덱스
- `buildStepMeta(project.selectedBlocks)`로 스텝 목록 생성
- 스텝 렌더링 로직:

```typescript
const stepMeta = buildStepMeta(project.selectedBlocks)
const currentStep = stepMeta[step]

// 렌더링:
switch (currentStep.key) {
  case 'checklist': return <Step0Checklist onNext={next} />
  case 'photos':    return <Step1Character ... />
  case 'template':  return <StepTemplateSelect ... /> 또는 <StepBlockPicker .../>
  case 'opening':   return <Step2Opening ... />
  case 'outro':     return <StepOutro ... />
  case 'review':    return <Step9Review ... />
  default:          // 선택 블록 → BlockEditor
    const blockDef = BLOCK_MAP[currentStep.key]
    return <BlockEditor block={blockDef} data={project.sections[currentStep.key]} ... />
}
```

- 템플릿 선택 / 직접 선택 분기 처리
- 블록 선택 시 해당 블록의 빈 SectionData를 sections에 초기화
- 프로그레스 바 계산: 동적 스텝 수 기준
- 로그인 게이트: 기존과 동일 (Step 1 이후)

**Step 2: 불필요한 import 정리**

기존 Step4WhoWeAre~Step7Decision import 제거 (BlockEditor로 대체).

**Step 3: 빌드 확인**

Run: `cd apps/web && npx tsc --noEmit`
Expected: 타입 에러 없음

**Step 4: 커밋**

```bash
git add apps/web/app/create/page.tsx
git commit -m "feat: refactor wizard to dynamic step system with modular blocks"
```

---

## Task 9: LiveMockPlayer 동적 블록 지원

**Files:**
- Modify: `apps/web/app/create/components/LiveMockPlayer.tsx`

**Step 1: 동적 스텝에 맞게 미리보기 업데이트**

변경 내용:
- 기존 `STEP_SCENES` 하드코딩 → `buildStepMeta` 기반 동적 씬 매핑
- 템플릿 선택 스텝용 미리보기 씬 추가
- 선택 블록 스텝들: 블록의 아이콘 + 입력된 사진/나레이션 표시 (기존 steps 4-7 패턴과 동일)

**Step 2: 커밋**

```bash
git add apps/web/app/create/components/LiveMockPlayer.tsx
git commit -m "feat: update LiveMockPlayer for dynamic story blocks"
```

---

## Task 10: 최종 통합 테스트 및 정리

**Files:**
- 전체 `apps/web/app/create/` 디렉토리

**Step 1: 개발 서버 실행하여 전체 플로우 수동 테스트**

Run: `cd apps/web && npm run dev`

테스트 시나리오:
1. 체크리스트 → 사진 → 로그인 게이트 → 템플릿 선택 ("클래식 러브스토리")
2. 오프닝 입력 → 5개 블록 순서대로 입력 → 아웃트로 → 최종 검토 → 완성
3. "직접 고를래요" → 블록 5개 선택 → 순서 변경 → 입력 → 완성
4. 블록별 사진 업로드 / 나레이션 자동생성 / 수정 동작 확인
5. 프로그레스 바 정상 표시 확인
6. 뒤로가기/앞으로가기 동작 확인

**Step 2: 사용하지 않는 레거시 컴포넌트 정리 (선택)**

제거 대상: `Step4WhoWeAre.tsx`, `Step5HowWeMet.tsx`, `Step6BecameLovers.tsx`, `Step7Decision.tsx`, `Step8Thanks.tsx`
(BlockEditor로 대체되었으므로)

**Step 3: 커밋**

```bash
git add -A
git commit -m "chore: cleanup legacy step components, finalize modular block system"
```

---

## 태스크 의존성 요약

```
Task 1 (blockDefs.ts)
  ↓
Task 2 (projectData.ts 확장) ─── depends on Task 1
  ↓
Task 3 (TemplateSelect) ──┐
Task 4 (BlockPicker) ─────┤── 모두 Task 1,2에 의존, 서로 독립
Task 5 (BlockEditor) ─────┤
Task 6 (StepOutro) ───────┘
  ↓
Task 7 (Step9Review 수정) ── depends on Task 1,2
  ↓
Task 8 (page.tsx 리팩토링) ── depends on ALL above
  ↓
Task 9 (LiveMockPlayer) ── depends on Task 8
  ↓
Task 10 (통합 테스트) ── depends on ALL
```

**병렬 가능:** Task 3, 4, 5, 6은 동시 진행 가능
