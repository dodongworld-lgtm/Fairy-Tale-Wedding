# Create Page Reskin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Visually align the `/create` wizard page with the new landing page design system (warm romantic tone, refined typography, polished cards) while keeping all existing logic intact.

**Architecture:** Pure CSS/Tailwind class changes across 11 files. No logic, props, or state changes. Every step component gets updated headings (font-serif), refined inputs/buttons, card grouping, and narration preview styling. The header bar gets a glass-morphism treatment with a continuous progress bar. The live preview gets a softer frame and background.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 with `@theme inline` design tokens. Fonts: Cormorant Garamond (serif), Inter/Pretendard (sans).

**Design tokens reference** (`apps/web/app/globals.css`):
- `primary: #9B7B5B`, `primary-light: #C4A882`, `primary-dark: #7A5F42`
- `bg: #FFF8F0`, `bg-card: #FFFFFF`, `bg-subtle: #FDF5ED`
- `border: #E8DFD6`, `border-hover: #C4A882`
- `font-serif` = Cormorant Garamond, `font-sans` = Pretendard/Inter

---

### Task 1: Header Bar + Progress Bar Reskin

**Files:**
- Modify: `apps/web/app/create/page.tsx:94-148` (header section only)

**What to change:**

Replace the entire `<header>` block (lines 94-148) with this updated version:

```tsx
{/* Top bar */}
<header className="flex-shrink-0 h-16 border-b border-border/60 flex items-center px-4 sm:px-6 justify-between backdrop-blur-md bg-bg/80 z-10">
  {/* Left: back + brand */}
  <div className="flex items-center gap-3">
    {step > 0 && (
      <button
        onClick={prev}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text transition-colors cursor-pointer group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        <span className="hidden sm:block">이전</span>
      </button>
    )}
    <a href="/" className="text-lg font-serif font-semibold text-text tracking-wide">Once Upon Us</a>
  </div>

  {/* Center: continuous progress bar (steps 1-7 only) */}
  {step >= 1 && step <= 7 && (
    <div className="hidden sm:flex flex-col items-center gap-1">
      <div className="w-48 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / 6) * 100}%` }}
        />
      </div>
      <span className="text-[10px] text-text-muted font-medium">
        {STEP_META[step]?.label}
      </span>
    </div>
  )}

  {/* Right: step counter + lang */}
  <div className="flex items-center gap-3">
    {step >= 1 && step <= 8 && (
      <span className="text-xs text-text-muted font-medium hidden sm:block">
        {step} / {TOTAL_STEPS - 1}
      </span>
    )}
    <LangSwitcher />
  </div>
</header>
```

**Key changes:**
- `h-14` -> `h-16` for breathing room
- `bg-bg` -> `backdrop-blur-md bg-bg/80` for glass effect
- Logo: add `font-serif tracking-wide text-lg`
- Back button: add `group` + hover translate animation
- Progress: replace circle indicators with continuous bar using `width` percentage
- Right side: show `step / total` counter instead of step label

**Step 1:** Open `apps/web/app/create/page.tsx`, replace lines 94-148 with the code above.

**Step 2:** Verify build succeeds:
```bash
cd apps/web && npx next build
```
Expected: Build succeeds with 0 errors.

**Step 3:** Commit:
```bash
git add apps/web/app/create/page.tsx
git commit -m "design: reskin create page header with glass effect + progress bar"
```

---

### Task 2: Login Gate Modal Polish

**Files:**
- Modify: `apps/web/app/create/page.tsx:240-346` (LoginGateModal function)

**What to change:**

In the `LoginGateModal` function, make these specific class changes:

1. **Modal title** (line 268): Change `text-xl font-bold` to `text-xl font-serif font-bold`

2. **Social login buttons** — Google button (line 291): Change
   `"w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-bg-subtle transition-colors flex items-center justify-center gap-2 cursor-pointer"`
   to
   `"w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-bg-subtle shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"`

3. **Kakao button** (line 303): Change
   `"w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-primary-light/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"`
   to
   `"w-full py-3 border border-border rounded-xl text-sm font-medium text-text hover:bg-primary-light/20 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"`

**Step 1:** Edit the 3 class strings in `LoginGateModal` as described above.

**Step 2:** Verify build succeeds:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/page.tsx
git commit -m "design: polish login modal with serif title + button shadows"
```

---

### Task 3: Step0Checklist Reskin

**Files:**
- Modify: `apps/web/app/create/components/steps/Step0Checklist.tsx`

**What to change:**

Replace the entire component return JSX with:

```tsx
return (
  <div className="w-full space-y-6">
    {/* Header */}
    <div>
      <h2 className="text-2xl font-serif font-bold text-text mb-1.5">이것만 준비하면 돼요</h2>
      <p className="text-sm text-text-muted">사진 3가지로 세상에 하나뿐인 영상이 만들어져요</p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-3 gap-3">
      {CARDS.map(card => (
        <div key={card.number} className="bg-bg-card rounded-2xl border border-border p-3 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
          {/* Illustration placeholder */}
          <div className={`w-full aspect-[5/6] rounded-xl ${card.placeholder} flex items-center justify-center`}>
            <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
            </svg>
          </div>
          {/* Label */}
          <div className="text-center">
            <span className={`text-[10px] font-black tracking-widest ${card.numColor}`}>{card.number}</span>
            <p className="text-xs font-bold text-text leading-tight mt-0.5">{card.title}</p>
            <p className="text-[10px] text-text-muted mt-0.5 leading-tight">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Tip */}
    <div className="p-4 bg-bg-subtle rounded-2xl border-l-4 border-primary flex items-start gap-3">
      <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
      </svg>
      <p className="text-xs text-text-secondary leading-relaxed">
        <span className="font-semibold text-text">사진이 없어도 괜찮아요.</span> 나중에 추가하거나 샘플로 먼저 체험해볼 수 있어요.
      </p>
    </div>

    {/* CTA */}
    <button
      onClick={onNext}
      className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
    >
      준비됐어요, 시작하기
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>
    </button>

    {/* Expert consultation */}
    <a
      href="mailto:hello@onceuponus.com?subject=식전 애니메이션 영상 제작 문의&body=안녕하세요, 식전 영상 제작 전문가 상담을 요청합니다.%0A%0A신랑 이름:%0A신부 이름:%0A결혼식 날짜:%0A문의 내용:"
      className="w-full py-3 border border-border hover:border-border-hover hover:bg-bg-subtle text-text-secondary hover:text-text font-medium rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
      </svg>
      전문가에게 생성 문의하기
    </a>
  </div>
)
```

**Key changes:**
- Title: add `font-serif`
- Cards: `bg-bg-card border border-border` instead of colored bg/border, add `hover:shadow-md`
- Tip: `bg-bg-subtle border-l-4 border-primary` quote style instead of colored bg
- CTA button: add arrow icon + `hover:shadow-lg`
- Expert link: simpler hover to `border-hover` + `bg-bg-subtle`

**Step 1:** Replace the return JSX in Step0Checklist.

**Step 2:** Verify build:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/components/steps/Step0Checklist.tsx
git commit -m "design: reskin Step0Checklist with serif headings + card styling"
```

---

### Task 4: Step1Character Reskin

**Files:**
- Modify: `apps/web/app/create/components/steps/Step1Character.tsx`

**What to change in the `Step1Character` component (lines 116-158):**

1. **Title** (line 122): Change `text-2xl font-bold` to `text-2xl font-serif font-bold`

2. **Demo info box** (lines 141-148): Change
   `"p-3 bg-bg-subtle rounded-2xl border border-border flex items-start gap-3"`
   to
   `"p-4 bg-bg-subtle rounded-2xl border-l-4 border-primary flex items-start gap-3"`

3. **Next button** (lines 150-156): Change
   `"w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"`
   to
   `"w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer flex items-center justify-center gap-2"`

4. **Add arrow icon** inside the button, after "다음":
   ```tsx
   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
   </svg>
   ```

5. **Photo upload card border** — in `PhotoUploadCard` (line 72), add `hover:shadow-md transition-shadow` to the outer `<div>` (line 65): Change
   `"flex-1 flex flex-col gap-3"`
   to
   `"flex-1 flex flex-col gap-3"`
   (keep as-is, the card button already has good styling)

**Step 1:** Edit Step1Character.tsx with the 4 changes above.

**Step 2:** Verify build:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/components/steps/Step1Character.tsx
git commit -m "design: reskin Step1Character with serif title + polished button"
```

---

### Task 5: Story Step Components Reskin (Step2-Step8)

**Files:**
- Modify: `apps/web/app/create/components/steps/Step2Opening.tsx`
- Modify: `apps/web/app/create/components/steps/Step4WhoWeAre.tsx`
- Modify: `apps/web/app/create/components/steps/Step5HowWeMet.tsx`
- Modify: `apps/web/app/create/components/steps/Step6BecameLovers.tsx`
- Modify: `apps/web/app/create/components/steps/Step7Decision.tsx`
- Modify: `apps/web/app/create/components/steps/Step8Thanks.tsx`

**Common pattern for ALL 6 files:**

Apply these exact same changes to each file:

**A. Section title** — Every `<h2>` currently has `text-2xl font-bold`. Change to:
```
text-2xl font-serif font-bold
```

**B. Narration preview box** — Every narration preview currently has:
```
p-4 bg-primary-light/30 rounded-2xl border border-primary-light/30
```
Change to:
```
p-5 bg-bg-subtle rounded-2xl border-l-4 border-primary
```
And the preview label inside (currently `text-xs font-semibold text-primary`) stays the same.
And the text inside (currently `text-sm text-primary-dark`) changes to `text-sm text-text leading-relaxed`.

**C. "다음" / "최종 검토하기" button** — Every primary button currently has:
```
w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-colors [disabled classes] cursor-pointer
```
Change to:
```
w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer flex items-center justify-center gap-2
```
And add an arrow icon SVG inside:
```tsx
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
</svg>
```

**D. Photo upload add button** (Step5, Step6, Step7, Step8) — Currently:
```
w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary-light hover:bg-primary-light/20 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1
```
Change to:
```
w-24 h-24 rounded-2xl border-2 border-dashed border-border-hover hover:border-primary hover:bg-primary-light/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-1
```

**E. Trigger chips** (Step6 only, line 68) — Currently unselected state:
```
bg-white text-text-secondary border-border hover:border-primary-light hover:text-primary
```
Change to:
```
bg-bg-card text-text-secondary border-border hover:bg-primary-light/10 hover:border-primary-light hover:text-primary
```

**Specific changes per file:**

**Step2Opening.tsx:**
- Line 23 h2: add `font-serif`
- Line 41 narration box: `p-5 bg-bg-subtle rounded-2xl border-l-4 border-primary`
- Line 43 narration text: `text-sm text-text leading-relaxed`
- Lines 49-54 button: update classes + add arrow SVG

**Step4WhoWeAre.tsx:**
- Line 25 h2: add `font-serif`
- Line 60 narration box: `p-5 bg-bg-subtle rounded-2xl border-l-4 border-primary`
- Line 62 narration text: `text-sm text-text leading-relaxed`
- Lines 77-82 button: update classes + add arrow SVG

**Step5HowWeMet.tsx:**
- Line 33 h2: add `font-serif`
- Line 81 photo add button: update rounded + border classes
- Lines 109-115 button: update classes + add arrow SVG

**Step6BecameLovers.tsx:**
- Line 34 h2: add `font-serif`
- Lines 68-71 chips: update unselected class
- Line 99 photo add button: update rounded + border classes
- Lines 128-133 button: update classes + add arrow SVG

**Step7Decision.tsx:**
- Line 33 h2: add `font-serif`
- Line 81 photo add button: update rounded + border classes
- Lines 110-116 button: update classes + add arrow SVG

**Step8Thanks.tsx:**
- Line 19 h2: add `font-serif`
- Line 56 photo add button: update rounded + border classes (note: w-32 h-24 dimensions, keep those)
- Lines 73-78 button: update classes + add arrow SVG

**Step 1:** Edit all 6 files with the changes above. Apply the common pattern systematically.

**Step 2:** Verify build:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/components/steps/Step2Opening.tsx apps/web/app/create/components/steps/Step4WhoWeAre.tsx apps/web/app/create/components/steps/Step5HowWeMet.tsx apps/web/app/create/components/steps/Step6BecameLovers.tsx apps/web/app/create/components/steps/Step7Decision.tsx apps/web/app/create/components/steps/Step8Thanks.tsx
git commit -m "design: reskin story steps with serif headings + quote-style narration + polished buttons"
```

---

### Task 6: Step9Review Reskin

**Files:**
- Modify: `apps/web/app/create/components/steps/Step9Review.tsx`

**What to change:**

1. **Title** (line 65): `text-2xl font-bold` -> `text-2xl font-serif font-bold`

2. **Section checklist items** (line 76): Change
   `"flex items-center justify-between px-4 py-3 rounded-xl border"`
   to
   `"flex items-center justify-between px-4 py-3.5 rounded-2xl border"`

3. **OK state bg** (line 76): Change `bg-bg-subtle border-border` to `bg-bg-card border-border hover:shadow-sm transition-shadow`

4. **Success done state** (line 42): Change `w-20 h-20 bg-primary-light/20` to `w-20 h-20 bg-bg-subtle border border-border`

5. **Done title** (line 48): `text-xl font-bold` -> `text-xl font-serif font-bold`

6. **Render button** (lines 110-121): Change to:
   ```tsx
   <button
     onClick={handleRender}
     disabled={!canRender || rendering}
     className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-base transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer flex items-center justify-center gap-2"
   >
     {rendering ? (
       <>
         <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
         영상 생성 중...
       </>
     ) : (
       <>
         영상 완성하기
         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
         </svg>
       </>
     )}
   </button>
   ```

**Step 1:** Edit Step9Review.tsx with the changes above.

**Step 2:** Verify build:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/components/steps/Step9Review.tsx
git commit -m "design: reskin Step9Review with serif headings + card hover + polished button"
```

---

### Task 7: LiveMockPlayer Reskin

**Files:**
- Modify: `apps/web/app/create/components/LiveMockPlayer.tsx`

**What to change:**

1. **Right panel background** in `page.tsx` (line 223): Change
   `"hidden md:flex md:w-1/2 bg-bg-subtle border-l border-border items-center justify-center overflow-hidden relative"`
   to
   `"hidden md:flex md:w-1/2 bg-gradient-to-br from-bg-subtle to-primary-light/5 border-l border-border items-center justify-center overflow-hidden relative"`

2. **Preview frame** in `LiveMockPlayer.tsx` (line 225): Change
   `"w-full max-w-[480px] aspect-video rounded-2xl overflow-hidden relative shadow-2xl shadow-black/40"`
   to
   `"w-full max-w-[480px] aspect-video rounded-3xl overflow-hidden relative shadow-2xl shadow-black/20 border border-border"`

3. **Toggle buttons container** (line 251): Change
   `"flex items-center gap-1 bg-bg-subtle rounded-xl p-1"`
   to
   `"flex items-center gap-1 bg-bg-card rounded-full p-1 shadow-md border border-border"`

4. **Toggle button active** (lines 254-256): Change
   `bg-white text-text shadow-sm`
   to
   `bg-primary text-white shadow-sm`

5. **Toggle button inactive** (lines 255, 263): Change
   `text-text-muted hover:text-text-secondary`
   to
   `text-text-secondary hover:text-text`

6. **Toggle button shape** (lines 254, 262): Change `rounded-lg` to `rounded-full`

**Step 1:** Edit `page.tsx` line 223 (right panel bg) and `LiveMockPlayer.tsx` with the changes above.

**Step 2:** Verify build:
```bash
cd apps/web && npx next build
```

**Step 3:** Commit:
```bash
git add apps/web/app/create/page.tsx apps/web/app/create/components/LiveMockPlayer.tsx
git commit -m "design: reskin live preview with gradient bg + refined frame + pill toggle"
```
