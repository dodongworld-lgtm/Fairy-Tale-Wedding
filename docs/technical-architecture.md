# Once Upon Us - 기술 아키텍처

## 1. 시스템 구조

```
┌─────────────────────────────────────────────────────────────┐
│                        클라이언트                             │
│  Next.js 16 (React 19) + Tailwind CSS 4                     │
│  Vercel 배포 | SSG + CSR                                    │
└──────────────┬──────────────────────┬───────────────────────┘
               │ REST API             │ WebSocket
               ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      API 서버                                │
│  Express 5 + TypeScript                                     │
│  Docker 컨테이너 | Node 20 Alpine                            │
├─────────────────┬───────────────────┬───────────────────────┤
│   Routes        │   Services        │   Workers             │
│  /projects      │  storyGenerator   │  videoWorker          │
│  /photos        │  imageGenerator   │  (BullMQ consumer)    │
│  /generate      │  narrationGen     │                       │
│  /orders        │  videoRenderer    │                       │
└────────┬────────┴────────┬──────────┴────────┬──────────────┘
         │                 │                    │
         ▼                 ▼                    ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│ PostgreSQL   │  │    Redis     │  │     AWS S3           │
│ (Prisma 7)   │  │  (BullMQ)   │  │  사진/이미지/영상     │
│ 사용자/프로젝트│  │  작업 큐     │  │  Presigned URL       │
└──────────────┘  └──────────────┘  └──────────────────────┘
```

---

## 2. 모노레포 구조

```
once-upon-us/
├── apps/
│   ├── web/                    # Next.js 프론트엔드
│   │   ├── app/
│   │   │   ├── page.tsx        # 랜딩 페이지
│   │   │   ├── create/         # 영상 생성 위저드
│   │   │   │   ├── page.tsx    # 위저드 메인 (9 steps)
│   │   │   │   ├── components/ # Step0~9, LiveMockPlayer
│   │   │   │   └── data/       # projectData, storyData
│   │   │   ├── dashboard/      # 대시보드
│   │   │   ├── projects/[id]/  # 생성중/완료/편집/결제
│   │   │   ├── login/          # 로그인
│   │   │   ├── signup/         # 회원가입
│   │   │   ├── mypage/         # 마이페이지
│   │   │   ├── blog/           # 블로그
│   │   │   ├── components/     # 공용 UI 컴포넌트
│   │   │   │   ├── ui/         # Button, Card, Input 등 14종
│   │   │   │   └── decorative/ # FloatingHeart, Ring, Star
│   │   │   ├── i18n/           # 다국어 (ko/en/ja)
│   │   │   ├── globals.css     # 디자인 토큰 (@theme inline)
│   │   │   └── layout.tsx      # 루트 레이아웃 (폰트 로딩)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── api/                    # Express 백엔드
│       ├── src/
│       │   ├── index.ts        # 서버 진입점 (Express + Socket.io)
│       │   ├── routes/
│       │   │   ├── projects.ts # CRUD + 생성 요청
│       │   │   ├── photos.ts   # S3 업로드 URL
│       │   │   ├── generate.ts # 생성 작업 트리거
│       │   │   └── orders.ts   # 결제 처리
│       │   ├── services/
│       │   │   ├── storyGenerator.ts   # Gemini AI
│       │   │   ├── imageGenerator.ts   # FLUX.1
│       │   │   ├── narrationGenerator.ts # ElevenLabs
│       │   │   └── videoRenderer.ts    # Remotion
│       │   └── workers/
│       │       └── videoWorker.ts      # BullMQ 작업자
│       ├── prisma/
│       │   └── schema.prisma   # DB 스키마
│       ├── Dockerfile
│       └── package.json
│
├── docs/                       # 문서
│   ├── service-plan.md         # 서비스 기획서
│   ├── roadmap.md              # 로드맵
│   ├── technical-architecture.md # 이 문서
│   └── plans/                  # 구현 계획서들
│
├── docker-compose.yml          # PostgreSQL + Redis
├── .env.example                # 환경변수 템플릿
└── package.json                # 워크스페이스 루트
```

---

## 3. 프론트엔드 아키텍처

### 기술 스택
| 항목 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| UI 라이브러리 | React | 19.2.3 |
| 스타일링 | Tailwind CSS | 4.x |
| 폼 관리 | React Hook Form | 7.71.1 |
| HTTP | Axios | 1.13.5 |
| WebSocket | Socket.io Client | 4.8.3 |

### 디자인 시스템
- **색상:** Warm ivory 기반 (`bg: #FFF8F0`, `primary: #9B7B5B`, `accent: #C9A0A0`)
- **폰트:** Cormorant Garamond (serif), Pretendard (sans), Inter (fallback)
- **컴포넌트:** 14개 공용 UI (`Button`, `Card`, `Input`, `Modal`, `Navbar`, `Footer` 등)
- **데코레이티브:** `FloatingHeart`, `FloatingRing`, `FloatingStar` SVG 컴포넌트
- **다국어:** `LangContext` + `translations.ts` (ko/en/ja)

### 라우팅

| 경로 | 렌더링 | 설명 |
|------|--------|------|
| `/` | SSG | 랜딩 페이지 |
| `/create` | SSG | 영상 생성 위저드 |
| `/login` | SSG | 로그인 |
| `/signup` | SSG | 회원가입 |
| `/dashboard` | SSG | 대시보드 |
| `/mypage` | SSG | 마이페이지 |
| `/blog` | SSG | 블로그 |
| `/projects/[id]/generating` | Dynamic | 생성 진행 |
| `/projects/[id]/complete` | Dynamic | 완성 확인 |
| `/projects/[id]/edit` | Dynamic | 편집 |
| `/projects/[id]/checkout` | Dynamic | 결제 |

---

## 4. 백엔드 아키텍처

### 기술 스택
| 항목 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Express | 5.2.1 |
| ORM | Prisma | 7.4.1 |
| DB | PostgreSQL | 16 |
| 캐시/큐 | Redis (BullMQ) | 7 |
| WebSocket | Socket.io | 4.8.3 |

### API 엔드포인트

```
GET  /api/health                    # 헬스체크
POST /api/projects                  # 프로젝트 생성
GET  /api/projects/:id              # 프로젝트 조회
PATCH /api/projects/:id             # 프로젝트 수정
POST /api/projects/:id/photos       # 사진 업로드 URL 발급
POST /api/projects/:id/generate     # 영상 생성 시작
POST /api/orders                    # 주문 생성
POST /api/orders/confirm            # 결제 확인
```

### 인증
- `x-user-id` 헤더 기반 (임시)
- 향후: NextAuth / JWT 토큰 기반

### DB 스키마

```
User ──< Project ──< Photo
                  ──< Scene
                  ──< Video
                  ──< Order
```

**주요 모델:**
- `User`: id, email, name, provider
- `Project`: id, userId, status(DRAFT/GENERATING/EDITING/PAID/COMPLETED), coupleInfo(JSON), styleOptions(JSON)
- `Photo`: id, projectId, s3Key, isFacePrimary, order
- `Scene`: id, projectId, act, order, imageS3Key, imagePrompt, narrationText, narrationS3Key, durationSec
- `Video`: id, projectId, resolution, s3Key, shareToken, expiresAt
- `Order`: id, projectId, userId, plan(BASIC/STANDARD/PREMIUM), amount, status(PENDING/PAID/REFUNDED), tossPaymentKey

---

## 5. AI 파이프라인

### 영상 생성 플로우

```
POST /generate
    │
    ▼
BullMQ 큐 등록 (videoWorker)
    │
    ▼
Step 1: 스토리 생성 (Gemini)
    │  입력: coupleInfo (이름, 만남, 연애, 결심)
    │  출력: 4막 구조 (각 막: narration + imagePrompt)
    │  Socket: progress 10%
    │
    ▼
Step 2: 장면 이미지 생성 (FLUX.1) — 병렬 처리
    │  입력: imagePrompt + 스타일 프리픽스
    │  출력: PNG 이미지 (각 장면)
    │  Socket: progress 30-70%
    │
    ▼
Step 3: 나레이션 생성 (ElevenLabs) — 병렬 처리
    │  입력: narrationText + 감정 파라미터
    │  출력: MP3 오디오 (각 장면)
    │  Socket: progress 70-85%
    │
    ▼
Step 4: 영상 렌더링 (Remotion)
    │  입력: 이미지 + 오디오 + 자막 + BGM
    │  출력: MP4 (선택된 해상도)
    │  Socket: progress 85-100%
    │
    ▼
결과 저장 (S3 또는 로컬) + DB 업데이트
    │
    ▼
Socket: completed 이벤트 → 클라이언트 리다이렉트
```

### AI 서비스 상세

| 서비스 | 제공자 | 모델 | 용도 | 비용 |
|--------|--------|------|------|------|
| 스토리 생성 | Google | Gemini 2.0 Flash | 4막 스토리 구조화 | 무료 티어 |
| 이미지 생성 | HuggingFace | FLUX.1-schnell | 디즈니 스타일 일러스트 | 무료 티어 |
| 나레이션 | ElevenLabs | Multilingual v2 | 감정 TTS | 무료 10K자/월 |
| (예비) 고급 AI | Anthropic | Claude | 고급 스토리 | 미사용 |
| (예비) 프리미엄 이미지 | FAL.ai | FLUX Pro | 고품질 이미지 | 미사용 |
| (예비) BGM | SoundRaw | - | AI BGM 생성 | 미사용 |

---

## 6. 실시간 통신

### Socket.io 구조

```
서버: io.to(`project:${projectId}`).emit(event, data)
클라이언트: socket.on(event, handler)

이벤트:
- progress: { step: string, percent: number, message: string }
- completed: { videoId: string, url: string }
- error: { message: string }
```

### 방(Room) 관리
- 클라이언트가 `/projects/[id]/generating` 진입 시 join
- 생성 완료/에러 시 leave

---

## 7. 스토리지 전략

### 개발 환경 (Demo Mode)
```
LOCAL_STORAGE_DIR=/tmp/onceuponus
Express static: /files/* → 로컬 파일 서빙
```

### 프로덕션
```
AWS S3 (ap-northeast-2)
├── photos/         # 원본 사진 (presigned URL 업로드)
├── scenes/         # 생성된 장면 이미지
├── narrations/     # 생성된 나레이션 오디오
└── videos/         # 최종 렌더링 영상
```

---

## 8. 배포 아키텍처

### 현재
```
프론트엔드: Vercel (자동 배포, main 브랜치)
백엔드: 미배포 (로컬 개발)
DB/Redis: docker-compose 로컬
```

### 프로덕션 목표
```
프론트엔드: Vercel
백엔드: Railway / Fly.io / AWS ECS (Docker)
DB: Supabase PostgreSQL / AWS RDS
Redis: Upstash / AWS ElastiCache
스토리지: AWS S3
CDN: CloudFront (영상 전송 최적화)
```

---

## 9. 환경 변수

| 변수 | 용도 | 필수 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 | ✅ |
| `REDIS_URL` | Redis/BullMQ 연결 | ✅ |
| `GEMINI_API_KEY` | 스토리 생성 | ✅ |
| `HF_TOKEN` | 이미지 생성 | ✅ |
| `ELEVENLABS_API_KEY` | 나레이션 생성 | ✅ |
| `AWS_ACCESS_KEY_ID` | S3 접근 | 프로덕션 |
| `AWS_SECRET_ACCESS_KEY` | S3 접근 | 프로덕션 |
| `AWS_REGION` | S3 리전 | 프로덕션 |
| `S3_BUCKET_NAME` | S3 버킷 | 프로덕션 |
| `TOSS_CLIENT_KEY` | 결제 클라이언트 | 프로덕션 |
| `TOSS_SECRET_KEY` | 결제 시크릿 | 프로덕션 |
| `NEXTAUTH_SECRET` | 세션 암호화 | 프로덕션 |
| `KAKAO_CLIENT_ID` | 카카오 OAuth | 프로덕션 |
| `GOOGLE_CLIENT_ID` | 구글 OAuth | 프로덕션 |
| `NEXT_PUBLIC_API_URL` | API 엔드포인트 | ✅ |
| `LOCAL_STORAGE_DIR` | 로컬 파일 저장 | 개발용 |

---

## 10. 보안 고려사항

- S3 presigned URL로 직접 업로드 (서버 부하 최소화)
- `x-user-id` 헤더 → JWT 토큰 인증으로 전환 필요
- 환경 변수로 API 키 관리 (절대 코드에 하드코딩 금지)
- CORS 설정 (프론트엔드 도메인만 허용)
- Rate limiting (API 남용 방지)
- 결제 webhook 검증 (토스 시크릿 키)
