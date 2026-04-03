# Create Page Reskin Design

**Goal:** Visually align the `/create` wizard page with the new landing page design system while keeping the current flow/logic intact.

**Approach:** Component-level reskin (Option A) - update visuals only, no flow changes.

---

## 1. Header Bar

**Current:** h-14, plain bg-bg, small circle step indicators, text-only "back" button.

**New:**
- Match landing Navbar: `backdrop-blur-md bg-bg/80 h-16 border-b border-border`
- "Once Upon Us" logo in `font-serif` (Cormorant Garamond)
- Replace circle step indicators with a **continuous progress bar** filling left-to-right
- Step counter text: `Step 2 / 9` style
- Back button with subtle hover state

## 2. Step Form Panels (Step0-Step9)

**Current:** Basic inputs, low density, minimal styling.

**New:**
- Section titles: `font-serif` large heading + subtitle (SectionHeader pattern from landing)
- Input fields: `rounded-xl border-border hover:border-border-hover focus:ring-primary/30`
- Primary buttons: `bg-primary hover:bg-primary-dark rounded-xl font-semibold` + arrow icon
- Group related items in cards: `bg-bg-card rounded-2xl border border-border p-6`
- Photo upload zones: `rounded-2xl border-2 border-dashed border-border-hover` + `hover:bg-primary-light/10`
- Quick-select chips (Step6): `rounded-full bg-bg-subtle hover:bg-primary-light/20 border border-border`
- Narration preview: `bg-bg-subtle rounded-2xl p-5 border-l-4 border-primary` quote style

## 3. Live Preview Panel (Right Side)

**Current:** Plain bg-bg-subtle, basic 16:9 frame.

**New:**
- Background: `bg-gradient-to-br from-bg-subtle to-primary-light/5`
- Frame: `rounded-3xl shadow-2xl border border-border`
- Toggle buttons (example/my input): `rounded-full bg-bg-card shadow-md` pill style
- Current step badge at top of preview
- Decorative elements (FloatingHeart, FloatingRing) in preview area

## 4. Login Gate Modal

**Current:** Already decent (rounded-3xl, blur backdrop).

**Minimal changes:**
- Social login buttons: add `shadow-sm hover:shadow-md`
- Title: apply `font-serif` for landing consistency

---

## Files to Modify

1. `apps/web/app/create/page.tsx` - header bar, layout wrapper
2. `apps/web/app/create/components/steps/Step0Checklist.tsx` - card styling
3. `apps/web/app/create/components/steps/Step1Character.tsx` - photo upload, inputs
4. `apps/web/app/create/components/steps/Step2Opening.tsx` - textarea, preview
5. `apps/web/app/create/components/steps/Step4WhoWeAre.tsx` - inputs, preview
6. `apps/web/app/create/components/steps/Step5HowWeMet.tsx` - inputs, photos, preview
7. `apps/web/app/create/components/steps/Step6BecameLovers.tsx` - chips, photos, preview
8. `apps/web/app/create/components/steps/Step7Decision.tsx` - inputs, photos, preview
9. `apps/web/app/create/components/steps/Step8Thanks.tsx` - textarea, photo
10. `apps/web/app/create/components/steps/Step9Review.tsx` - checklist cards, button
11. `apps/web/app/create/components/LiveMockPlayer.tsx` - frame, background, toggle

## Constraints

- No flow/logic changes
- No new dependencies
- Use existing design tokens from globals.css
- Responsive: mobile-first (already single-column on mobile)
