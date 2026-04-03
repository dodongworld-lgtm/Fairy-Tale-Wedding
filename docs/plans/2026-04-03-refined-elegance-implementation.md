# Refined Elegance Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the existing Elegant Romance design system to Modern Luxury level — muted colors, tighter typography, refined components, generous spacing.

**Architecture:** Update design tokens in globals.css first, then refine all 14 UI components and 3 decorative components in-place. No new files needed. All changes are CSS/Tailwind class modifications.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 (@theme inline), TypeScript

**Base Path:** `/Users/donghyunahn/Library/CloudStorage/GoogleDrive-inyourstorykor2@gmail.com/내 드라이브/Fairy-Tale-Wedding/Fairy-Tale-Wedding`

---

### Task 1: Update Design Tokens in globals.css

**Files:**
- Modify: `apps/web/app/globals.css`

**Step 1: Update color tokens**

Replace the entire `@theme inline` block and `:root` block with refined values:

```css
:root {
  --background: #FAFAF7;
  --foreground: #1A1714;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Primary — muted champagne */
  --color-primary: #8C7055;
  --color-primary-light: #B8A48A;
  --color-primary-dark: #6B5740;

  /* Accent — warm taupe */
  --color-accent: #C4A69A;
  --color-accent-light: #E8DDD6;

  /* Backgrounds */
  --color-bg: #FAFAF7;
  --color-bg-card: #FFFFFF;
  --color-bg-subtle: #F5F4F0;

  /* Text — deeper contrast */
  --color-text: #1A1714;
  --color-text-secondary: #7A7268;
  --color-text-muted: #A8A09A;

  /* Borders — neutral */
  --color-border: #E8E5E0;
  --color-border-hover: #B8A48A;

  /* Semantic */
  --color-success: #5B8A63;
  --color-error: #C45555;

  /* Dark surfaces */
  --color-dark-bg: #1E1A16;
  --color-dark-text: #F5EDE4;

  /* Fonts */
  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-serif: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
}
```

**Step 2: Update body styles and add typography utilities**

Replace body styles and add new utility classes after the `@theme inline` block:

```css
body {
  background: var(--background);
  color: var(--foreground);
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.7;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

**Step 3: Verify dev server starts**

Run: `cd apps/web && npm run dev`
Expected: App loads with updated colors (slightly muted, off-white background)

**Step 4: Commit**

```bash
git add apps/web/app/globals.css
git commit -m "design: update tokens to Refined Elegance palette"
```

---

### Task 2: Refine Button Component

**Files:**
- Modify: `apps/web/app/components/ui/Button.tsx`

**Step 1: Update variant styles**

Replace:
```typescript
const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/90',
  secondary: 'bg-bg-card border border-border text-primary hover:bg-bg-subtle hover:border-border-hover',
  ghost: 'bg-transparent text-primary hover:underline',
  dark: 'bg-dark-bg text-dark-text hover:bg-dark-bg/90',
  danger: 'bg-error text-white hover:bg-error/90',
}
```

With:
```typescript
const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg active:bg-primary-dark/90',
  secondary: 'bg-bg-card border border-border/60 text-primary hover:bg-bg-subtle hover:border-border-hover',
  ghost: 'bg-transparent text-primary opacity-80 hover:opacity-100',
  dark: 'bg-dark-bg text-dark-text hover:bg-dark-bg/90',
  danger: 'bg-error text-white hover:bg-error/90',
}
```

**Step 2: Update size styles**

Replace:
```typescript
const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
}
```

With:
```typescript
const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
}
```

**Step 3: Update base classes**

Replace:
```
rounded-xl transition-colors duration-200
```

With:
```
rounded-lg transition-all duration-300 ease-out
```

**Step 4: Commit**

```bash
git add apps/web/app/components/ui/Button.tsx
git commit -m "design: refine Button — tighter radius, generous padding, smoother transitions"
```

---

### Task 3: Refine Card Component

**Files:**
- Modify: `apps/web/app/components/ui/Card.tsx`

**Step 1: Update Card styles**

Replace the entire className:
```
bg-bg-card border border-border rounded-2xl p-6 ${hover ? 'hover:border-border-hover hover:shadow-md transition-all duration-200' : ''}
```

With:
```
bg-bg-card border border-border/50 rounded-xl p-7 ${hover ? 'hover:border-border-hover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out' : ''}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Card.tsx
git commit -m "design: refine Card — subtle border, lift on hover, more padding"
```

---

### Task 4: Refine Input & Textarea

**Files:**
- Modify: `apps/web/app/components/ui/Input.tsx`

**Step 1: Update Input label style**

Replace (in both Input and Textarea):
```
<label className="block text-sm text-text-secondary font-medium">
```

With:
```
<label className="block text-xs text-text-secondary font-medium uppercase tracking-wide">
```

**Step 2: Update Input field classes**

Replace (Input field):
```
w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow
```

With:
```
w-full px-4 py-3.5 bg-bg border border-border/60 rounded-lg text-text placeholder-text-muted/70 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-border-hover transition-all duration-300
```

**Step 3: Update Textarea field classes**

Replace (Textarea field):
```
w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow resize-none
```

With:
```
w-full px-4 py-3.5 bg-bg border border-border/60 rounded-lg text-text placeholder-text-muted/70 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-border-hover transition-all duration-300 resize-none
```

**Step 4: Commit**

```bash
git add apps/web/app/components/ui/Input.tsx
git commit -m "design: refine Input/Textarea — uppercase labels, thinner focus ring, smoother transitions"
```

---

### Task 5: Refine Badge Component

**Files:**
- Modify: `apps/web/app/components/ui/Badge.tsx`

**Step 1: Update variant styles**

Replace:
```typescript
const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-primary-light/30 text-primary-dark',
  rose: 'bg-accent-light text-accent',
  dark: 'bg-dark-bg text-dark-text',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
}
```

With:
```typescript
const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-primary/10 text-primary-dark',
  rose: 'bg-accent/10 text-accent',
  dark: 'bg-dark-bg text-dark-text',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
}
```

**Step 2: Update base badge classes**

Replace:
```
inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold
```

With:
```
inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-medium uppercase tracking-wide
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/Badge.tsx
git commit -m "design: refine Badge — label-style typography, subtle backgrounds"
```

---

### Task 6: Refine Modal Component

**Files:**
- Modify: `apps/web/app/components/ui/Modal.tsx`

**Step 1: Update modal container**

The overlay already has `bg-black/40 backdrop-blur-sm` — keep as is.

Update the modal body class. Replace:
```
relative bg-bg-card rounded-3xl shadow-2xl w-full max-w-sm p-8
```

With:
```
relative bg-bg-card rounded-2xl shadow-2xl w-full max-w-sm p-10
```

**Step 2: Update close button**

Replace:
```
absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer
```

With:
```
absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-lg hover:bg-bg-subtle transition-all duration-300 cursor-pointer
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/Modal.tsx
git commit -m "design: refine Modal — tighter radius, more padding"
```

---

### Task 7: Refine SectionHeader Component

**Files:**
- Modify: `apps/web/app/components/ui/SectionHeader.tsx`

**Step 1: Update SectionHeader render**

Replace the entire return block:
```tsx
<div className={className}>
  {label && <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{label}</p>}
  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text tracking-tight">{title}</h2>
  {subtitle && <p className="text-base text-text-secondary mt-2">{subtitle}</p>}
</div>
```

With:
```tsx
<div className={className}>
  {label && <p className="text-[0.75rem] font-medium text-primary uppercase tracking-[0.08em] mb-4">{label}</p>}
  <h2 className="text-[clamp(2rem,4vw,3rem)] font-serif font-bold text-text tracking-[-0.02em] leading-tight">{title}</h2>
  {subtitle && <p className="text-base text-text-secondary mt-3 leading-relaxed">{subtitle}</p>}
</div>
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/SectionHeader.tsx
git commit -m "design: refine SectionHeader — clamp sizing, negative tracking, label spacing"
```

---

### Task 8: Refine Navbar Component

**Files:**
- Modify: `apps/web/app/components/ui/Navbar.tsx`

**Step 1: Update navbar container**

Replace:
```
max-w-6xl mx-auto px-4 bg-bg/90 backdrop-blur-md border border-border rounded-2xl shadow-sm
```

With:
```
max-w-6xl mx-auto px-5 bg-bg/70 backdrop-blur-md border border-border/50 rounded-2xl
```

**Step 2: Update brand link**

Replace:
```
text-base font-serif font-bold tracking-tight text-text
```

With:
```
text-base font-serif font-bold tracking-[-0.01em] text-text
```

**Step 3: Update nav links**

Replace:
```
hidden md:flex items-center gap-5 text-sm text-text-secondary
```

With:
```
hidden md:flex items-center gap-6 text-sm text-text-secondary
```

**Step 4: Commit**

```bash
git add apps/web/app/components/ui/Navbar.tsx
git commit -m "design: refine Navbar — more transparency, subtle border, letter-spacing"
```

---

### Task 9: Refine Footer Component

**Files:**
- Modify: `apps/web/app/components/ui/Footer.tsx`

**Step 1: Update footer container**

Replace:
```
py-12 px-5 sm:px-6 border-t border-border bg-bg
```

With:
```
py-16 px-5 sm:px-6 border-t border-border/50 bg-bg
```

**Step 2: Update brand title**

Replace:
```
text-xl font-serif font-bold text-text
```

With:
```
text-xl font-serif font-bold text-text tracking-[-0.01em]
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/Footer.tsx
git commit -m "design: refine Footer — more padding, subtle border"
```

---

### Task 10: Refine Tabs Component

**Files:**
- Modify: `apps/web/app/components/ui/Tabs.tsx`

**Step 1: Update container**

Replace:
```
flex bg-bg-subtle rounded-xl p-1
```

With:
```
flex bg-bg-subtle rounded-lg p-1
```

**Step 2: Update tab button classes**

Replace:
```
flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${active === tab.key ? 'bg-bg-card shadow-sm text-text' : 'text-text-secondary hover:text-text'}
```

With:
```
flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer ${active === tab.key ? 'bg-bg-card shadow-sm text-text' : 'text-text-secondary hover:text-text'}
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/Tabs.tsx
git commit -m "design: refine Tabs — tighter radius, medium weight, smoother transition"
```

---

### Task 11: Refine Stepper Component

**Files:**
- Modify: `apps/web/app/components/ui/Stepper.tsx`

**Step 1: Update step circle classes**

Replace:
```
w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isDone ? 'bg-text text-white' : isActive ? 'bg-primary text-white' : 'bg-bg-subtle text-text-muted'}
```

With:
```
w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${isDone ? 'bg-text text-white' : isActive ? 'bg-primary text-white' : 'bg-bg-subtle text-text-muted'}
```

**Step 2: Update connector line**

Replace:
```
w-4 h-px ${current > n ? 'bg-text' : 'bg-border'}
```

With:
```
w-5 h-px ${current > n ? 'bg-text' : 'bg-border/60'}
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/Stepper.tsx
git commit -m "design: refine Stepper — slightly larger dots, wider connectors"
```

---

### Task 12: Refine PricingCard Component

**Files:**
- Modify: `apps/web/app/components/ui/PricingCard.tsx`

**Step 1: Update variant styles**

Replace:
```typescript
const variantStyles: Record<PricingVariant, string> = {
  default: 'border-2 border-border bg-bg-card',
  recommended: 'border-2 border-primary bg-primary shadow-lg shadow-primary/20',
  premium: 'border-2 border-border bg-bg-card',
}
```

With:
```typescript
const variantStyles: Record<PricingVariant, string> = {
  default: 'border border-border/50 bg-bg-card',
  recommended: 'border-2 border-primary bg-primary shadow-xl shadow-primary/15',
  premium: 'border border-border/50 bg-bg-card',
}
```

**Step 2: Update container classes**

Replace:
```
rounded-2xl p-6 sm:p-7 relative
```

With:
```
rounded-xl p-7 sm:p-8 relative
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/PricingCard.tsx
git commit -m "design: refine PricingCard — thinner borders, more padding, tighter radius"
```

---

### Task 13: Refine PhotoUploader Component

**Files:**
- Modify: `apps/web/app/components/ui/PhotoUploader.tsx`

**Step 1: Update label**

Replace:
```
text-sm text-text-secondary font-medium mb-2
```

With:
```
text-xs text-text-secondary font-medium uppercase tracking-wide mb-3
```

**Step 2: Update photo thumbnail**

Replace:
```
relative w-20 h-20 rounded-xl overflow-hidden border border-border
```

With:
```
relative w-20 h-20 rounded-lg overflow-hidden border border-border/50
```

**Step 3: Update add button**

Replace:
```
w-20 h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-muted hover:border-primary-light hover:bg-bg-subtle transition-colors cursor-pointer
```

With:
```
w-20 h-20 border-2 border-dashed border-border/60 rounded-lg flex items-center justify-center text-text-muted hover:border-primary-light hover:bg-bg-subtle transition-all duration-300 cursor-pointer
```

**Step 4: Commit**

```bash
git add apps/web/app/components/ui/PhotoUploader.tsx
git commit -m "design: refine PhotoUploader — label style, tighter radius, smoother transitions"
```

---

### Task 14: Refine VideoPreview Component

**Files:**
- Modify: `apps/web/app/components/ui/VideoPreview.tsx`

**Step 1: Update container**

Replace:
```
w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/20
```

With:
```
w-full aspect-video rounded-2xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/15
```

**Step 2: Update play button**

Replace:
```
w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200
```

With:
```
w-8 h-8 bg-white/15 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/25 transition-all duration-300
```

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/VideoPreview.tsx
git commit -m "design: refine VideoPreview — tighter radius, subtler controls"
```

---

### Task 15: Refine Decorative Components

**Files:**
- Modify: `apps/web/app/components/decorative/FloatingHeart.tsx`
- Modify: `apps/web/app/components/decorative/FloatingRing.tsx`
- Modify: `apps/web/app/components/decorative/FloatingStar.tsx`

**Step 1: FloatingHeart — reduce opacity**

Replace `opacity="0.15"` with `opacity="0.08"`

**Step 2: FloatingRing — reduce opacity**

Replace both `opacity="0.12"` with `opacity="0.06"`

**Step 3: FloatingStar — reduce opacity**

Replace `opacity="0.1"` with `opacity="0.05"`

**Step 4: Commit**

```bash
git add apps/web/app/components/decorative/
git commit -m "design: reduce decorative opacity for subtler elegance"
```

---

### Task 16: Visual Verification

**Step 1: Start dev server**

Run: `cd apps/web && npm run dev`

**Step 2: Check landing page**

Open browser → verify:
- Background is off-white (#FAFAF7), not cream
- Text is deeper contrast
- Buttons are rounded-lg (not rounded-xl)
- Cards lift on hover with shadow
- SectionHeader labels are uppercase with wide tracking
- Navbar is more transparent
- Decorative elements are barely visible (subtle)

**Step 3: Check create page**

Navigate to /create → verify:
- Input labels are uppercase
- Focus rings are thin (ring-1)
- Stepper dots are slightly larger
- Tabs have tighter radius

**Step 4: Report findings**

List any remaining hardcoded colors or inconsistencies found during review.
