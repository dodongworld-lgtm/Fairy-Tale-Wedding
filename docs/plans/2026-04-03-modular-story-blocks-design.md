# 모듈형 스토리 블록 시스템 설계

> 작성일: 2026-04-03
> 상태: 승인됨

## 개요

고정된 위저드 스텝 대신, 유저가 15개 스토리 블록 풀에서 5개를 골라 자신만의 영상을 구성하는 모듈형 시스템.
템플릿 4종으로 자동 추천도 가능.

## 구조

```
[오프닝 (고정)] → [선택 블록 5개] → [아웃트로 (고정)]
```

## 유저 플로우

```
Step 1: 커플 프로필 (이름 + 사진)
    ↓
Step 2: 템플릿 선택 OR 직접 고르기
    - 템플릿 4종 중 하나 선택 → 5개 블록 자동 세팅
    - "직접 고를래요" → 15개 블록 풀에서 5개 선택
    ↓
Step 3: 선택한 블록 순서 조정 (드래그앤드롭)
    ↓
Step 4~8: 오프닝 + 선택 블록 5개 + 아웃트로 순서대로 입력
    - 각 블록마다 질문/사진 업로드
    - 실시간 나레이션 미리보기
    ↓
Step 9: 최종 검토 → 영상 완성하기
```

## 고정 블록

| 블록 | 입력 |
|------|------|
| **오프닝** | 인사 문구 (120자, 자동생성 가능) |
| **아웃트로** | 감사 메시지 (120자) + 엔딩 사진 (선택) |

## 선택 블록 풀 (15개 중 5개)

| ID | 카테고리 | 블록명 | 입력 필드 | 사진 |
|----|----------|--------|----------|------|
| `who-we-are` | 소개 | 우리는 이런 사람 | 각자 한 줄 소개 (60자) + 나레이션 | 없음 |
| `childhood` | 소개 | 어린 시절 | 에피소드 텍스트 | 1~2장 |
| `how-we-met` | 만남 | 첫 만남 | 시기, 장소 | 1~3장 |
| `first-impression` | 만남 | 첫인상 | 신랑→신부, 신부→신랑 첫인상 | 없음 |
| `first-date` | 연애 | 첫 데이트 | 장소, 에피소드 | 1~3장 |
| `fell-in-love` | 연애 | 사랑에 빠진 순간 | 계기 (빠른선택 칩) | 1~3장 |
| `travel` | 연애 | 함께한 여행 | 여행지, 추억 | 1~3장 |
| `daily-life` | 연애 | 일상의 행복 | 에피소드 | 1~3장 |
| `overcome` | 연애 | 위기와 극복 | 상황, 극복 계기 | 1~2장 |
| `pet-hobby` | 특별 | 반려동물/취미 | 이름/활동, 에피소드 | 1~3장 |
| `proposal` | 전환 | 프로포즈 | 장소, 방식, 반응 | 1~2장 |
| `decision` | 전환 | 부부가 되기로 | 결심 계기 | 1~2장 |
| `thanks-parents` | 가족 | 부모님 감사 | 양가 각각 감사 메시지 | 각 1장 |
| `message-to-each` | 약속 | 서로에게 하는 말 | 신랑→신부, 신부→신랑 메시지 | 없음 |
| `future-promise` | 약속 | 미래의 약속 | 소망/버킷리스트 | 선택 |

## 추천 템플릿 4종

| ID | 이름 | 블록 조합 | 한 줄 설명 |
|----|------|----------|-----------|
| `classic` | 클래식 러브스토리 | how-we-met → fell-in-love → proposal → message-to-each → thanks-parents | 정석적인 감동 스토리 |
| `daily` | 우리만의 일상 | who-we-are → daily-life → travel → pet-hobby → future-promise | 따뜻하고 소소한 이야기 |
| `dramatic` | 드라마틱 스토리 | first-impression → first-date → overcome → proposal → message-to-each | 영화같은 극적 전개 |
| `family` | 가족 중심 | childhood → how-we-met → decision → thanks-parents → future-promise | 한국식 전통 스타일 |

## 데이터 모델

```typescript
// 블록 정의
interface StoryBlock {
  id: string;
  category: 'intro' | 'love' | 'special' | 'transition' | 'family' | 'promise';
  name: string;
  description: string;
  fields: BlockField[];
  photoMin: number;
  photoMax: number;
  buildNarration: (data: BlockData) => string;
}

// 템플릿 정의
interface StoryTemplate {
  id: string;
  name: string;
  description: string;
  blockIds: string[]; // 5개
  thumbnail: string;
}

// 프로젝트 데이터 (변경)
interface ProjectData {
  groomName: string;
  brideName: string;
  groomPhoto: string;
  bridePhoto: string;
  templateId: string | null;       // 선택한 템플릿 (null = 직접 선택)
  selectedBlocks: string[];        // 선택한 블록 ID 5개 (순서 포함)
  sections: {
    opening: SectionData;          // 고정
    [blockId: string]: SectionData; // 선택한 블록별 데이터
    outro: SectionData;            // 고정
  };
}

// 블록별 입력 데이터
interface SectionData {
  photos: string[];
  narration: string;
  date?: string;
  place?: string;
  customText?: string;
  customText2?: string; // 신부용 (첫인상, 서로에게 하는 말 등)
}
```

## 기존 코드 매핑

| 기존 컴포넌트 | → 변경 |
|--------------|--------|
| Step0Checklist | 유지 (준비물 안내) |
| Step1Character | 유지 (커플 프로필) |
| Step2Opening | → 오프닝 고정 블록 |
| Step4WhoWeAre | → `who-we-are` 블록 |
| Step5HowWeMet | → `how-we-met` 블록 |
| Step6BecameLovers | → `fell-in-love` 블록 |
| Step7Decision | → `decision` 블록 |
| Step8Thanks | → 아웃트로 고정 블록 |
| Step9Review | 유지 (최종 검토) |
| (신규) | 템플릿 선택 UI |
| (신규) | 블록 선택 UI |
| (신규) | 블록 순서 조정 UI |
| (신규) | 새 블록 10개 컴포넌트 |
