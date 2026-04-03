# Once Upon Us — 소재 생성 파이프라인 설계

> 날짜: 2026-04-03
> 목표: 유저 입력 → 고품질 디즈니 Pixar 3D 소재 자동 생성 → 수동 Flow+CapCut 편집 → 메일 발송
> 기반: img_gen 프로젝트 검증 기법 + Gemini Pro API

---

## 1. 서비스 모델

### 운영 방식
- **초반**: 유저가 웹폼으로 사진+스토리 입력 → API가 소재 자동 생성 → 본인이 Flow+CapCut으로 편집 → 2일 내 메일 발송
- **향후**: 자동화 범위 확대 (CapCut draft 자동 생성 → 러프컷 자동 → 완전 자동)

### 핵심 원칙
- 모든 AI 생성물에 **3~5개 후보 생성 → 선택** 패턴 적용
- 캐릭터 일관성은 **레퍼런스 이미지 + fixed_prompt**로 보장
- 이미지 스타일: **디즈니 Pixar 3D** (숨고 잇다CG 수준 목표)

---

## 2. 전체 파이프라인

```
[유저 웹폼]  사진 업로드 + 스토리 입력 + 스타일 선택
     ↓
[Step 1] 캐릭터 레퍼런스 생성 + 선택
     커플 사진 → Gemini Pro Image로 디즈니 3D bust-up 포트레이트
     신랑/신부 각 3~5버전 → 본인이 최적 1개 선택
     ↓
[Step 2] 스토리 생성
     Gemini Flash로 4막 구조 스토리 JSON
     씬별 서술형 imagePrompt + 한국어 나레이션 + 감정 태그
     ↓
[Step 3] 씬별 이미지 생성
     Gemini Pro Image + 선택된 레퍼런스 첨부
     fixed_prompt + 네거티브 프롬프트 적용
     ↓
[Step 4] TTS 음성 선택 + 나레이션 생성
     후보 음성 3~5개로 샘플 생성 → 선택
     선택된 음성으로 전체 나레이션 생성 (Gemini TTS)
     향후: 직접 녹음 WAV 업로드로 대체 가능
     ↓
[Step 5] BGM 선택
     Lyria 3 Pro로 무드별 BGM 3~5곡 생성 → 선택
     ↓
[출력] output/{projectId}/
     ├── character_refs/    (선택된 레퍼런스 + old/)
     ├── scenes/            (씬별 이미지 PNG)
     ├── tts/               (나레이션 WAV)
     ├── bgm/               (배경음악)
     └── story.json         (스토리 메타데이터)
     ↓
[수동] Flow + CapCut 편집 → 메일 발송
```

---

## 3. 이미지 생성 상세

### 3.1 캐릭터 레퍼런스 생성

**Step 1: 외형 자동 추출** (Gemini Vision)
```
유저 사진 → Gemini Vision으로 외형 분석 → fixed_prompt 텍스트 생성
```

**fixed_prompt 형식:**
```
[나이] + [체형] + [얼굴형] + [눈] + [머리] + [피부] + [표정/분위기]

예: "Korean man early 30s, athletic build, angular jaw,
warm brown eyes, short neat dark hair parted to the side,
tan skin, confident warm smile"
```

**Step 2: 레퍼런스 이미지 생성**

프롬프트:
```
Upper body bust-up character portrait. Disney Pixar 3D animation style.
Must have Pixar-style features:
  - Large expressive eyes with light reflections
  - Smooth rounded facial features
  - Soft subsurface skin scattering
  - Stylized hair with volume and shine
NOT photorealistic. NOT 2D flat. NOT anime.
Think Pixar/Disney 3D animated movie character.
Plain white background, no objects, no scenery.
Character reference sheet. High quality, cinematic lighting.
No text, no watermark.

{fixed_prompt}
```

- 신랑/신부 각 3~5버전 생성
- 유저 사진을 레퍼런스로 첨부하여 외형 유사도 향상
- 선택된 버전: `{name}_pro.png`, 나머지: `old/`

### 3.2 씬 이미지 프롬프트 구조

```
[STYLE_INSTRUCTION] — 시스템 프롬프트 (모든 씬 공통)
Disney Pixar 3D animation style, cinematic composition,
rule of thirds, rich warm color palette, golden-hour lighting,
volumetric light rays, film-quality depth of field, soft bokeh.

[씬 프롬프트] — storyGenerator가 서술형으로 생성 (60단어 이상)
필수 5요소: 캐릭터 묘사, 배경/환경, 카메라 구도, 조명/색감, 감정/분위기

[네거티브 규칙]
ABSOLUTELY NO TEXT, NO DIALOGUE, NO SUBTITLES, NO WATERMARKS.
No speech bubbles, no logos, no signage, no writing of any kind.

[인물 수 명시]
TWO people only — {groom_fixed_prompt} and {bride_fixed_prompt}
```

**API 호출 시 첨부물:**
- 신랑 레퍼런스 (`groom_pro.png`)
- 신부 레퍼런스 (`bride_pro.png`)
- 씬 프롬프트 텍스트

### 3.3 스토리 생성 프롬프트

SYSTEM_PROMPT에 포함할 imagePrompt 작성 규칙:
- 서술형 문장 (키워드 나열 금지)
- 필수 5요소 (캐릭터, 배경, 카메라, 조명, 감정)
- BAD/GOOD 예시 제공
- 캐릭터 외형 일관성 유지 지시
- Act 1→4 색감 변화 (cool blue → warm gold → magical sparkle)
- 카메라 구도 변화 (단조로움 방지)

### 3.4 MOOD_MAP / BACKGROUND_MAP

서술형으로 강화 (한 줄 → 2~3문장):
```typescript
fantasy: 'an enchanted fairy tale world where magic shimmers in the air,
  with floating crystals, glowing flora, and a sky painted in pastel aurora colors'
```

### 3.5 씬별 카메라/색감 가이드

| Act | 감정 | 카메라 | 색감 |
|-----|------|--------|------|
| 1. 만남 | wonder | medium close-up, eye-level | soft daylight, cool blue-white |
| 2. 여정 | joy, nostalgia | wide shot, tracking | warm golden hour, amber |
| 3. 시련 | tension, hope | close-up, dutch angle | moody blue, dim warm lamp |
| 4. 프로포즈 | love | dramatic wide → intimate close-up | magical sparkle, floating lights |

### 3.6 텍스트 삽입 방지 (img_gen 검증 규칙)

- 폰 화면 → 캐릭터 반응 표정으로 대체
- 문서/편지 → 캐릭터가 든 채 표정으로 표현
- 간판/표지판 → 블러 또는 생략
- 프롬프트에 `ABSOLUTELY NO TEXT` 항상 포함

---

## 4. TTS 상세

### 4.1 Gemini TTS 음성 후보

결혼 영상 내레이터에 적합한 음성 3~5개 샘플 생성:

| Voice | 느낌 | 추천 용도 |
|-------|------|----------|
| Kore | 차분하고 따뜻한 여성 | 감성적 내레이션 |
| Leda | 부드러운 젊은 여성 | 밝고 설레는 톤 |
| Achernar | 밝고 활발한 여성 | 경쾌한 스토리 |
| Alnilam | 중후한 중년 남성 | 격식있는 내레이션 |
| Sadachbia | 세련된 젊은 남성 | 모던한 톤 |

**샘플 문장**: "두 사람의 이야기가 시작됩니다. 운명처럼 만난 그 날부터, 함께한 모든 순간이 기적이었습니다."

### 4.2 감정 태그 시스템

- 스토리 생성 시 씬별 emotion 필드 활용
- 과격 태그 자동 완화 (Screaming→Excited, Furious→Firm)
- TTS speaking_rate, pitch를 감정에 따라 미세 조절

### 4.3 향후 확장: 직접 녹음

- 유저가 녹음 WAV 업로드 시 해당 씬 TTS 스킵
- 업로드 파일은 `tts/custom/` 폴더에 저장

---

## 5. BGM 상세

### 5.1 Lyria 3 Pro BGM 생성

섹션별 무드에 맞는 BGM 3~5곡 생성:

| 섹션 | 무드 | BGM 스타일 |
|------|------|-----------|
| 오프닝 | 설렘 | 잔잔한 피아노 + 스트링, 동화적 |
| 만남 | 로맨스 | 따뜻한 어쿠스틱 기타 |
| 여정 | 달달함 | 밝은 오케스트라, 경쾌 |
| 시련 | 감성 | 첼로 솔로, 잔잔한 피아노 |
| 프로포즈 | 감동 | 풀 오케스트라, 클라이맥스 |
| 감사 | 따뜻함 | 부드러운 스트링 + 피아노, 여운 |

### 5.2 재사용 전략

- 무드별 BGM은 범용적으로 생성 → 여러 주문에서 재사용 가능
- 라이브러리로 축적: `bgm/library/{mood}_{번호}.mp3`
- 특별 요청 시에만 커스텀 생성

---

## 6. API 관리

### 6.1 키 로테이션

```
GEMINI_API_KEY=      # 메인
GEMINI_API_KEY_2=    # 백업 1
GEMINI_API_KEY_3=    # 백업 2
GEMINI_API_KEY_4=    # 백업 3
```

- 429/RESOURCE_EXHAUSTED 시 자동 다음 키로 전환
- 키당 3회 재시도 → 전체 키 소진 시 에러

### 6.2 안전 필터 대응

- 이미지 생성 실패 시 카메라를 와이드로 변경하여 재시도
- 최대 2회 재시도 후 에러 리포트

---

## 7. 관리자 대시보드 (선택 UI)

주문별 소재 생성 진행 상황 + 후보 선택 인터페이스:

```
주문 목록 → 주문 상세
  ├── [Step 1] 캐릭터 선택: 3~5개 후보 썸네일 → 클릭 선택 / 재생성
  ├── [Step 2] 스토리 확인: JSON 미리보기 → 수정 요청 / 재생성
  ├── [Step 3] 씬 이미지: 씬별 이미지 갤러리 → 개별 재생성 가능
  ├── [Step 4] TTS 선택: 음성 후보 오디오 플레이어 → 선택 / 녹음 업로드
  ├── [Step 5] BGM 선택: BGM 후보 오디오 플레이어 → 선택
  └── [다운로드] 전체 소재 ZIP 다운로드
```

현재 Next.js 프론트엔드의 기존 대시보드 페이지를 활용.

---

## 8. 데이터 구조

### 출력 폴더

```
output/{projectId}/
├── character_refs/
│   ├── groom_pro.png          # 선택된 신랑 레퍼런스
│   ├── bride_pro.png          # 선택된 신부 레퍼런스
│   └── old/                   # 미선택 버전들
├── scenes/
│   ├── act1_scene1.png
│   ├── act1_scene2.png
│   └── ...
├── tts/
│   ├── scene_01.wav
│   ├── scene_02.wav
│   ├── custom/                # 직접 녹음 (향후)
│   └── samples/               # 음성 후보 샘플
├── bgm/
│   ├── selected.mp3           # 선택된 BGM
│   └── candidates/            # 후보 BGM들
├── story.json                 # 스토리 메타데이터
└── project.json               # 프로젝트 설정 (fixed_prompts, 선택 결과 등)
```

### project.json

```json
{
  "projectId": "uuid",
  "createdAt": "2026-04-03",
  "couple": {
    "groom": {
      "name": "동현",
      "fixedPrompt": "Korean man early 30s, athletic build...",
      "selectedRef": "groom_pro.png"
    },
    "bride": {
      "name": "수연",
      "fixedPrompt": "Korean woman late 20s, petite build...",
      "selectedRef": "bride_pro.png"
    }
  },
  "style": {
    "mood": "fantasy",
    "background": "castle"
  },
  "tts": {
    "selectedVoice": "Kore",
    "emotion": "auto"
  },
  "bgm": {
    "selectedFile": "romantic_piano_02.mp3"
  },
  "status": "scenes_generated"
}
```

---

## 9. 기술 스택 변경 요약

| 항목 | AS-IS | TO-BE |
|------|-------|-------|
| 이미지 생성 | HuggingFace FLUX.1-schnell | Gemini 3 Pro Image |
| 이미지 SDK | @huggingface/inference | @google/genai |
| TTS | ElevenLabs | Gemini TTS |
| BGM | 없음 | Lyria 3 Pro |
| 영상 렌더링 | Remotion (자동) | Flow + CapCut (수동) |
| 캐릭터 일관성 | 없음 | 레퍼런스 이미지 + fixed_prompt |
| API 관리 | 단일 키 | 키 로테이션 (최대 4개) |
| 선택 시스템 | 없음 | 3~5 후보 → 선택 |

---

## 10. 비용 예측 (주문 1건)

| 항목 | 단가 | 수량 | 소계 |
|------|------|------|------|
| 캐릭터 레퍼런스 | ~$0.04/장 | 10장 (5+5) | ~$0.40 |
| 씬 이미지 | ~$0.04/장 | 10~20장 | ~$0.40~0.80 |
| 스토리 생성 | ~$0.001 | 1회 | ~$0.001 |
| TTS 샘플 | ~$0.01/건 | 5건 | ~$0.05 |
| TTS 전체 | ~$0.05 | 1회 | ~$0.05 |
| BGM | ~$0.05/곡 | 5곡 | ~$0.25 |
| **합계** | | | **~$1.15~1.55** |

---

## 11. 불필요한 것 (YAGNI)

현재 단계에서 제거/보류:
- Remotion 영상 렌더링 파이프라인
- BullMQ 작업 큐 (소량이므로 동기 처리 가능)
- Socket.io 실시간 진행률 (관리자 대시보드에서 새로고침으로 충분)
- 결제 시스템 (수동 입금 확인)
- OAuth 인증 (관리자 1명이므로 단순 비밀번호)
