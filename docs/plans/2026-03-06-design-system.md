# Design System: "Elegant Romance" for Once Upon Us

**Date:** 2026-03-06
**Approach:** Tailwind 4 custom theme + shared UI components
**Scope:** Full redesign of all pages

---

## 1. Color System

Warm ivory base with antique gold and dusty rose accents. Replaces the current cold indigo palette.

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#9B7B5B` (Antique Gold) | Main buttons, accent text, icons |
| `primary-light` | `#C4A882` | Hover states, badge backgrounds |
| `primary-dark` | `#7A5F42` | Active states, strong emphasis |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#C9A0A0` (Dusty Rose) | Secondary emphasis, event badges, tags |
| `accent-light` | `#E8D4D4` | Light accent backgrounds |

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#FFF8F0` (Linen) | Page background |
| `bg-card` | `#FFFFFF` | Card/modal background |
| `bg-subtle` | `#FDF5ED` | Section dividers (replaces gray-50) |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `text` | `#2D2520` (Warm Black) | Body text |
| `text-secondary` | `#8B7E74` | Supporting text |
| `text-muted` | `#B8AFA6` | Hints, disabled text |

### Borders

| Token | Hex | Usage |
|-------|-----|-------|
| `border` | `#E8DFD6` | Card/input borders |
| `border-hover` | `#C4A882` | Hover borders (= primary-light) |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#6B8F71` | Completion/success states |
| `error` | `#C75C5C` | Error states |

### Dark Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-bg` | `#1E1A16` (Warm Dark) | Hero video, B2B card |
| `dark-text` | `#F5EDE4` | Text on dark surfaces |

---

## 2. Typography

### Font Stack

| Role | Font | Notes |
|------|------|-------|
| **Display** | Cormorant Garamond (serif) | Hero titles, section headings only |
| **Body (KR)** | Pretendard | Replaces Noto Sans KR. Cleaner sans-serif |
| **Body (EN)** | Inter | Kept from current system |

### Size Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-display` | 48-80px | Hero main title |
| `text-heading-1` | 32-40px | Section titles |
| `text-heading-2` | 24-28px | Sub-sections |
| `text-heading-3` | 18-20px | Card titles |
| `text-body` | 15-16px | Body text |
| `text-small` | 13-14px | Supporting text |
| `text-caption` | 11-12px | Labels, badges, hints |

### Weight Rules

- Display headings: `font-semibold` to `font-bold` (600-700)
- Body UI: `font-normal` to `font-semibold` (400-600)

---

## 3. Spacing & Radius

### Border Radius (standardized)

| Usage | Value |
|-------|-------|
| Buttons, inputs | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Modals | `rounded-3xl` (24px) |
| Badges, tags | `rounded-full` |

### Shadow

| Usage | Value |
|-------|-------|
| Cards (default) | `shadow-sm` with warm tint |
| Cards (hover) | `shadow-md` |
| Modals | `shadow-2xl` |
| Navbar | `shadow-sm` |

---

## 4. Components (`components/ui/`)

### 4.1 Button

Variants: `primary`, `secondary`, `ghost`, `dark`, `danger`
Sizes: `sm`, `md`, `lg`

```
primary:   bg-primary text-white hover:bg-primary-dark rounded-xl
secondary: bg-white border-border text-primary hover:bg-bg-subtle rounded-xl
ghost:     bg-transparent text-primary hover:underline
dark:      bg-dark-bg text-dark-text hover:bg-dark-bg/90 rounded-xl
danger:    bg-error text-white hover:bg-error/90 rounded-xl
```

### 4.2 Input

- Background: `bg-bg` (Linen)
- Border: `border-border`
- Focus: `ring-2 ring-primary/30 border-border-hover`
- Label: `text-text-secondary text-small`
- Hint: `text-text-muted text-caption`

### 4.3 Card

- Background: `bg-bg-card`
- Border: `border-border rounded-2xl`
- Hover: `border-border-hover shadow-md`
- Padding: `p-6`

### 4.4 Badge

Variants: `gold`, `rose`, `dark`, `success`, `error`

```
gold:    bg-primary-light/30 text-primary-dark
rose:    bg-accent-light text-accent
dark:    bg-dark-bg text-dark-text
success: bg-success/10 text-success
error:   bg-error/10 text-error
```

### 4.5 Modal

- Backdrop: `bg-black/40 backdrop-blur-sm`
- Card: `bg-bg-card rounded-3xl shadow-2xl`
- Close button: top-right, ghost style

### 4.6 SectionHeader

Props: `label` (caption), `title` (serif heading), `subtitle`

```
label:    text-caption uppercase tracking-widest font-bold text-primary
title:    text-heading-1 font-serif font-bold text-text
subtitle: text-body text-text-secondary
```

### 4.7 Stepper

- Circle: numbered, `bg-bg-subtle text-text-muted` (pending)
- Active: `bg-primary text-white`
- Done: `bg-text text-white` with check icon
- Connector: `bg-border` (pending), `bg-text` (done)

### 4.8 Tabs

- Container: `bg-bg-subtle rounded-xl p-1`
- Active tab: `bg-bg-card shadow-sm text-text font-semibold`
- Inactive: `text-text-secondary`

### 4.9 Navbar

- Fixed top, `bg-bg/90 backdrop-blur-md border-border rounded-2xl shadow-sm`
- Brand: Cormorant Garamond serif
- Links: `text-text-secondary hover:text-text`
- CTA: Button primary

### 4.10 Footer

- `border-t border-border bg-bg`
- Brand serif + links + copyright

### 4.11 PricingCard

Variants: `default`, `recommended`, `premium`

```
default:      Card + border-border
recommended:  border-2 border-primary bg-primary (dark text)
premium:      Card + border-border
```

Event badge uses Badge `rose` variant.

### 4.12 PhotoUploader

- Dashed border area: `border-2 border-dashed border-border rounded-2xl`
- Hover: `border-primary-light bg-bg-subtle`
- Preview: thumbnail grid with remove button

### 4.13 VideoPreview

- Dark container: `bg-dark-bg rounded-3xl`
- Play button: `bg-white/20 rounded-full hover:bg-white/30`
- Progress bar: `bg-white/20` track, `bg-primary-light` fill

### 4.14 StatusBadge

Maps project status to Badge variants:

```
DRAFT:      gold "Draft"
GENERATING: gold "Generating" (with pulse animation)
EDITING:    gold "Editing"
PAID:       success "Paid"
COMPLETED:  success "Completed"
```

---

## 5. Page Redesign Summary

### Landing Page
- Background: Linen
- Hero title: Cormorant Garamond serif, gold accent
- Feature cards: Card component with warm hover
- Samples: bg-subtle section
- Pricing: PricingCard components, gold recommended
- B2B: dark surface with warm-dark
- Navbar/Footer: shared components

### Create Wizard (/create)
- Header: Stepper component
- All steps: Input/Button/Card shared components
- Photo upload: PhotoUploader component
- Right panel: bg-subtle background

### Login/Signup
- Modal component with Tabs (social/email)
- Button components for social login

### Dashboard
- Navbar shared component
- Project cards: Card + StatusBadge
- Empty state: centered with illustration placeholder

### Checkout
- PricingCard components
- Button primary for payment CTA

### Complete
- Card for download/share sections
- Button components

### My Page
- Tabs component (profile/orders/account)
- Input/Button for profile editing
- Card for sections

---

## 6. Implementation Notes

### Tailwind 4 @theme Configuration

All tokens defined in `globals.css` via `@theme inline {}`.
Components use semantic token names (e.g., `bg-primary` not `bg-[#9B7B5B]`).

### Font Loading

```tsx
// layout.tsx
import { Cormorant_Garamond } from 'next/font/google'
// Pretendard via CDN or next/font/local
```

### File Structure

```
apps/web/app/
  components/
    ui/
      Button.tsx
      Input.tsx
      Card.tsx
      Badge.tsx
      Modal.tsx
      SectionHeader.tsx
      Stepper.tsx
      Tabs.tsx
      Navbar.tsx
      Footer.tsx
      PricingCard.tsx
      PhotoUploader.tsx
      VideoPreview.tsx
      StatusBadge.tsx
```

### Migration Strategy

1. Define tokens in globals.css
2. Build ui/ components
3. Migrate pages one by one (landing first)
4. Remove all inline color/style hardcoding
