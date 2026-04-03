# Refined Elegance Redesign

**Date:** 2026-04-03
**Approach:** A. Refined Elegance — 현재 Elegant Romance 아이덴티티 유지 + 모던 럭셔리 절제 추가
**Scope:** 컴포넌트 시스템 → 페이지 적용

---

## 1. Color System

채도 10-15% 다운, rose → warm taupe 전환

| Token | Before | After |
|-------|--------|-------|
| `--color-primary` | `#9B7B5B` | `#8C7055` |
| `--color-primary-light` | `#C4A882` | `#B8A48A` |
| `--color-primary-dark` | `#7A5F42` | `#6B5740` |
| `--color-accent` | `#C9A0A0` | `#C4A69A` |
| `--color-accent-light` | `#E8D4D4` | `#E8DDD6` |
| `--color-bg` | `#FFF8F0` | `#FAFAF7` |
| `--color-bg-card` | `#FFFFFF` | `#FFFFFF` |
| `--color-bg-subtle` | (none) | `#F5F4F0` |
| `--color-text` | `#2D2520` | `#1A1714` |
| `--color-text-secondary` | `#8B7E74` | `#7A7268` |
| `--color-text-muted` | `#B8AFA6` | `#A8A09A` |
| `--color-border` | `#E8DFD6` | `#E8E5E0` |
| `--color-border-hover` | `#C4A882` | `#B8A48A` |
| `--color-success` | `#6B8F71` | `#5B8A63` |
| `--color-error` | `#C75C5C` | `#C45555` |

## 2. Typography

| Element | Style |
|---------|-------|
| H1 | `clamp(2.5rem, 5vw, 4rem)` / `letter-spacing: -0.03em` / serif |
| H2 | `clamp(2rem, 4vw, 3rem)` / `letter-spacing: -0.02em` / serif |
| H3 | `clamp(1.25rem, 2.5vw, 1.75rem)` / `letter-spacing: -0.01em` / sans |
| Body | `1rem` / `line-height: 1.7` |
| Small | `0.875rem` / `line-height: 1.5` / `letter-spacing: 0.02em` |
| Label | `0.75rem` / `letter-spacing: 0.08em` / uppercase / `font-weight: 500` |

## 3. Component Changes

### Button
- `rounded-xl` → `rounded-lg` (8px)
- padding 증가 (px-6 py-3 → px-8 py-3.5)
- `transition-all duration-300 ease-out`
- primary hover: `shadow-lg` 추가
- ghost: `opacity-70 hover:opacity-100` (밑줄 제거)

### Card
- `rounded-2xl` → `rounded-xl` (12px)
- 기본: border만 (shadow 없음), hover: `shadow-lg` + `translate-y: -2px`
- border: 투명도 50%

### Input / Textarea
- focus: `ring-1 ring-primary/50`
- label: Label 스타일 (uppercase, tracking-wide)
- placeholder: 더 연한 색

### Navbar
- `bg-bg/70` (투명도 증가)
- border-bottom: `border-border/50`
- 레터스페이싱 추가

### Modal
- overlay: `bg-black/40 backdrop-blur-sm`
- padding 증가

### Badge / StatusBadge
- Label 폰트 스타일 적용
- 배경: 10% opacity

### SectionHeader
- label: uppercase + tracking-widest + Label 크기
- title: serif + negative letter-spacing

## 4. Spacing & Layout

- 섹션 간: `py-16` → `py-24 lg:py-32`
- 컨테이너: `max-w-7xl` → `max-w-6xl`
- 카드 그리드 gap: `gap-6` → `gap-8`
- 컴포넌트 내부 padding: 20-30% 증가

## 5. Implementation Order

1. `globals.css` — 디자인 토큰 업데이트
2. UI 컴포넌트 14개 리파인 (Button → Card → Input → 나머지)
3. 데코러티브 컴포넌트 opacity/scale 조정
4. 랜딩 페이지 적용 (간격, 레이아웃)
5. Create 위저드 적용
6. 나머지 페이지 적용 (dashboard, auth, mypage, blog)
