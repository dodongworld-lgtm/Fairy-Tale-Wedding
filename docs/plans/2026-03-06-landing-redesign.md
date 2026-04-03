# Landing Page Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the Once Upon Us landing page to match the Rocket LMS layout structure (90%+) while keeping the warm romantic "Elegant Romance" design tone.

**Architecture:** Single-page rewrite of `apps/web/app/page.tsx` with 15 sections modeled after Rocket LMS. New i18n keys added to `translations.ts` (ko/en/ja). Decorative SVG components created for floating background elements. All existing design tokens from `globals.css` are reused.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, existing i18n system (LangContext + translations.ts)

---

## Context

**Current state:** Landing page has 6 sections (Navbar, Hero centered, Features, Samples, How It Works, Pricing, Footer). Looks generic/AI-generated.

**Target state:** 15 sections matching Rocket LMS layout density. 2-column hero, stats counters, category grids, testimonials carousel, newsletter — all adapted for wedding animation service.

**Key files:**
- `apps/web/app/page.tsx` — Main landing page (complete rewrite)
- `apps/web/app/i18n/translations.ts` — Add new translation keys
- `apps/web/app/globals.css` — No changes needed (tokens already set)
- `apps/web/app/components/ui/` — Existing UI components, reuse where possible

**Design tokens already available:**
- Colors: `primary`, `primary-light`, `primary-dark`, `accent`, `accent-light`, `bg`, `bg-card`, `bg-subtle`, `text`, `text-secondary`, `text-muted`, `border`, `border-hover`, `dark-bg`, `dark-text`, `success`, `error`
- Fonts: `font-serif` (Cormorant Garamond), `font-sans` (Pretendard/Inter)

---

### Task 1: Add i18n Translation Keys

**Files:**
- Modify: `apps/web/app/i18n/translations.ts`

Add the following new keys to the `landing` section of all three languages (ko, en, ja). These keys support the new sections. Insert them after the existing `landing` keys (after `footerContact`).

**New keys to add inside `landing: {` for each language:**

```typescript
// === ko ===
// Nav
navStyles: '스타일',
navReviews: '후기',

// Stats
stat1: '500+',
stat1label: '행복한 커플',
stat2: '4.9',
stat2label: '평균 만족도',
stat3: '3분',
stat3label: '평균 제작 시간',
stat4: '98%',
stat4label: '재구매 의향',

// Featured
featuredLabel: '대표 영상',
featuredTitle: '실제 커플의 감동 스토리',
featuredPlay: '영상 보기',

// Styles
stylesLabel: '애니메이션 스타일',
stylesTitle: '원하는 스타일을 선택하세요',
styleFairytale: '동화풍',
styleWatercolor: '수채화',
styleGhibli: '지브리',
styleDisney: '디즈니',
stylePopart: '팝아트',
styleMinimal: '미니멀',
styleClassic: '클래식',
styleComic: '만화',

// CTA
ctaLabel: '시작하기',
ctaTitle: '두 사람의 이야기를\n세상에 하나뿐인 영상으로',
ctaDesc: '사진 몇 장과 추억만 있으면 충분해요',
ctaBtn: '무료로 시작하기',
ctaStat1: '500+ 커플이 선택했어요',
ctaStat2: '만족하지 않으면 100% 환불',

// Testimonials
testimonialsLabel: '실제 후기',
testimonialsTitle: '커플들의 솔직한 이야기',
testimonialsStat: '500명 이상의 커플이 후기를 남겼어요',
review1name: '김지현 & 박준호',
review1text: '프로포즈 때 틀었는데 여자친구가 울었어요. 진짜 감동적이었습니다.',
review1role: '2024년 12월 프로포즈',
review2name: '이서연 & 최민수',
review2text: '결혼식 하객분들이 다 울으셨어요. 영상 퀄리티가 상상 이상이었습니다.',
review2role: '2025년 1월 결혼식',
review3name: '정하나 & 김태양',
review3text: '3분 만에 나온 게 맞나 싶을 정도로 퀄리티가 좋아요. 강추!',
review3role: '2025년 2월 프로포즈',
review4name: '박소현 & 이준혁',
review4text: '부모님 앞에서 틀었는데 온 가족이 감동받았어요. 인생 영상입니다.',
review4role: '2024년 11월 결혼식',

// Partners
partnersLabel: '파트너',
partnersTitle: '함께하는 파트너사',

// Blog
blogLabel: '블로그',
blogTitle: '이야기와 팁',
blogMore: '더보기 →',
blog1title: '프로포즈 영상, 언제 틀어야 할까?',
blog1desc: '프로포즈 타이밍과 장소별 가이드',
blog1date: '2025.02.15',
blog2title: '결혼식 영상 3가지 유형 비교',
blog2desc: '하객 반응이 가장 좋은 영상 스타일은?',
blog2date: '2025.02.08',
blog3title: '사진 잘 고르는 법 5가지',
blog3desc: 'AI가 더 잘 만들어주는 사진의 조건',
blog3date: '2025.01.28',

// Newsletter
newsletterTitle: '새로운 소식을 받아보세요',
newsletterDesc: '이벤트, 할인, 새 기능 소식을 이메일로 알려드려요',
newsletterPlaceholder: '이메일 주소',
newsletterBtn: '구독하기',

// Footer enhanced
footerDesc: '프로포즈와 결혼식, 두 사람의 이야기를 세상에 하나뿐인 애니메이션으로',
footerLinks: '바로가기',
footerSupport: '고객 지원',
footerFaq: 'FAQ',
footerTerms: '이용약관',
footerPrivacy: '개인정보처리방침',
footerCopyright: '© 2025 Once Upon Us. All rights reserved.',
```

```typescript
// === en ===
navStyles: 'Styles',
navReviews: 'Reviews',

stat1: '500+',
stat1label: 'Happy Couples',
stat2: '4.9',
stat2label: 'Avg Rating',
stat3: '3 min',
stat3label: 'Avg Creation Time',
stat4: '98%',
stat4label: 'Would Recommend',

featuredLabel: 'Featured',
featuredTitle: 'Real Couples, Real Stories',
featuredPlay: 'Watch Video',

stylesLabel: 'Animation Styles',
stylesTitle: 'Choose Your Style',
styleFairytale: 'Fairytale',
styleWatercolor: 'Watercolor',
styleGhibli: 'Ghibli',
styleDisney: 'Disney',
stylePopart: 'Pop Art',
styleMinimal: 'Minimal',
styleClassic: 'Classic',
styleComic: 'Comic',

ctaLabel: 'Get Started',
ctaTitle: 'Turn Your Love Story\nInto a One-of-a-Kind Film',
ctaDesc: 'Just a few photos and your memories are enough',
ctaBtn: 'Start Free',
ctaStat1: '500+ couples chose us',
ctaStat2: '100% refund if not satisfied',

testimonialsLabel: 'Reviews',
testimonialsTitle: 'What Couples Say',
testimonialsStat: '500+ couples shared their experience',
review1name: 'Jihyun & Junho',
review1text: 'I played it during the proposal and she cried. Truly moving.',
review1role: 'Proposal, Dec 2024',
review2name: 'Seoyeon & Minsu',
review2text: 'Every guest at the wedding was in tears. Quality beyond imagination.',
review2role: 'Wedding, Jan 2025',
review3name: 'Hana & Taeyang',
review3text: 'Hard to believe this was made in 3 minutes. Highly recommend!',
review3role: 'Proposal, Feb 2025',
review4name: 'Sohyun & Junhyuk',
review4text: 'We played it for our parents and the whole family was moved. Best video ever.',
review4role: 'Wedding, Nov 2024',

partnersLabel: 'Partners',
partnersTitle: 'Trusted Partners',

blogLabel: 'Blog',
blogTitle: 'Stories & Tips',
blogMore: 'View All →',
blog1title: 'When to Play Your Proposal Video',
blog1desc: 'Timing and location guide for proposals',
blog1date: 'Feb 15, 2025',
blog2title: '3 Types of Wedding Videos Compared',
blog2desc: 'Which style gets the best guest reactions?',
blog2date: 'Feb 8, 2025',
blog3title: '5 Tips for Choosing the Right Photos',
blog3desc: 'What makes AI create better results',
blog3date: 'Jan 28, 2025',

newsletterTitle: 'Stay in the Loop',
newsletterDesc: 'Get updates on events, discounts, and new features',
newsletterPlaceholder: 'Email address',
newsletterBtn: 'Subscribe',

footerDesc: 'Your unique love story, transformed into a one-of-a-kind animation',
footerLinks: 'Quick Links',
footerSupport: 'Support',
footerFaq: 'FAQ',
footerTerms: 'Terms of Service',
footerPrivacy: 'Privacy Policy',
footerCopyright: '© 2025 Once Upon Us. All rights reserved.',
```

```typescript
// === ja ===
navStyles: 'スタイル',
navReviews: 'レビュー',

stat1: '500+',
stat1label: '幸せなカップル',
stat2: '4.9',
stat2label: '平均満足度',
stat3: '3分',
stat3label: '平均制作時間',
stat4: '98%',
stat4label: 'リピート意向',

featuredLabel: '注目の動画',
featuredTitle: '実際のカップルの感動ストーリー',
featuredPlay: '動画を見る',

stylesLabel: 'アニメーションスタイル',
stylesTitle: 'お好みのスタイルを選んでください',
styleFairytale: '童話風',
styleWatercolor: '水彩画',
styleGhibli: 'ジブリ',
styleDisney: 'ディズニー',
stylePopart: 'ポップアート',
styleMinimal: 'ミニマル',
styleClassic: 'クラシック',
styleComic: 'コミック',

ctaLabel: '始める',
ctaTitle: 'ふたりの物語を\n世界にひとつだけの動画に',
ctaDesc: '写真数枚と思い出があれば十分です',
ctaBtn: '無料で始める',
ctaStat1: '500組以上のカップルが選びました',
ctaStat2: '満足できなければ100%返金',

testimonialsLabel: '実際のレビュー',
testimonialsTitle: 'カップルたちの正直な声',
testimonialsStat: '500組以上のカップルがレビューを残しました',
review1name: 'キム・ジヒョン & パク・ジュンホ',
review1text: 'プロポーズの時に流したら彼女が泣きました。本当に感動的でした。',
review1role: '2024年12月プロポーズ',
review2name: 'イ・ソヨン & チェ・ミンス',
review2text: '結婚式のゲスト全員が泣いていました。動画のクオリティが想像以上でした。',
review2role: '2025年1月結婚式',
review3name: 'チョン・ハナ & キム・テヤン',
review3text: '3分で作ったとは思えないクオリティです。強くおすすめします！',
review3role: '2025年2月プロポーズ',
review4name: 'パク・ソヒョン & イ・ジュンヒョク',
review4text: 'ご両親の前で流したら家族全員が感動しました。人生の動画です。',
review4role: '2024年11月結婚式',

partnersLabel: 'パートナー',
partnersTitle: '協力パートナー',

blogLabel: 'ブログ',
blogTitle: 'ストーリーとヒント',
blogMore: 'もっと見る →',
blog1title: 'プロポーズ動画、いつ流すべき？',
blog1desc: 'プロポーズのタイミングと場所別ガイド',
blog1date: '2025.02.15',
blog2title: '結婚式動画3つのタイプ比較',
blog2desc: 'ゲストの反応が一番良い動画スタイルは？',
blog2date: '2025.02.08',
blog3title: '写真の選び方5つのコツ',
blog3desc: 'AIがより良い結果を出す写真の条件',
blog3date: '2025.01.28',

newsletterTitle: '最新情報をお届けします',
newsletterDesc: 'イベント、割引、新機能の情報をメールでお知らせします',
newsletterPlaceholder: 'メールアドレス',
newsletterBtn: '購読する',

footerDesc: 'プロポーズと結婚式、ふたりの物語を世界にひとつだけのアニメーションで',
footerLinks: 'リンク',
footerSupport: 'サポート',
footerFaq: 'FAQ',
footerTerms: '利用規約',
footerPrivacy: 'プライバシーポリシー',
footerCopyright: '© 2025 Once Upon Us. All rights reserved.',
```

**Step 1:** Read the current `translations.ts` file.

**Step 2:** Add all new keys inside the `landing: {` block for `ko`, `en`, and `ja`. Place them after the last existing key (`footerContact`).

**Step 3:** Verify the file compiles:
```bash
cd apps/web && npx tsc --noEmit apps/web/app/i18n/translations.ts
```

**Step 4:** Commit:
```bash
git add apps/web/app/i18n/translations.ts
git commit -m "feat: add i18n keys for landing page redesign"
```

---

### Task 2: Create Decorative SVG Components

**Files:**
- Create: `apps/web/app/components/decorative/FloatingHeart.tsx`
- Create: `apps/web/app/components/decorative/FloatingRing.tsx`
- Create: `apps/web/app/components/decorative/FloatingStar.tsx`
- Create: `apps/web/app/components/decorative/index.ts`

These are simple SVG components used as floating background decorations (like Rocket LMS's floating background elements, but with romantic motifs instead of tech icons).

**FloatingHeart.tsx:**
```tsx
export function FloatingHeart({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 56S8 40 8 22a12 12 0 0 1 24-2 12 12 0 0 1 24 2c0 18-24 34-24 34Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  )
}
```

**FloatingRing.tsx:**
```tsx
export function FloatingRing({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="16" stroke="currentColor" strokeWidth="2" opacity="0.12" />
      <path d="M26 20l6-12 6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
    </svg>
  )
}
```

**FloatingStar.tsx:**
```tsx
export function FloatingStar({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 8l6 18h18l-14 11 5 18-15-10-15 10 5-18L8 26h18z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.1"
      />
    </svg>
  )
}
```

**index.ts:**
```tsx
export { FloatingHeart } from './FloatingHeart'
export { FloatingRing } from './FloatingRing'
export { FloatingStar } from './FloatingStar'
```

**Commit:**
```bash
git add apps/web/app/components/decorative/
git commit -m "feat: add decorative SVG components for landing page"
```

---

### Task 3: Rewrite Landing Page — Sections 1-5

**Files:**
- Modify: `apps/web/app/page.tsx` (complete rewrite, sections 1-5 of 15)

Rewrite `page.tsx` from scratch. This task covers the top 5 sections. The file will be completed in Tasks 4 and 5.

**Section structure for this task:**

1. **Navbar** — Enhanced with more nav links (Styles, Reviews added)
2. **Hero** — 2-column layout (left: text+CTAs+social proof, right: video preview). This is the KEY change from the current centered hero.
3. **Stats** — 4-column animated counter strip
4. **Features** — 4-card grid (simplified from current 5 cards)
5. **Featured Videos** — 2 large showcase cards (like Rocket's Featured Courses)

**The complete page.tsx will have this skeleton:**

```tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { LangSwitcher } from './components/LangSwitcher'
import { useLang } from './contexts/LangContext'
import { FloatingHeart, FloatingRing, FloatingStar } from './components/decorative'

export default function LandingPage() {
  const { t } = useLang()
  const [email, setEmail] = useState('')

  // ... data arrays for samples, process steps, testimonials, etc.

  return (
    <main className="min-h-screen bg-bg text-text overflow-x-hidden">
      {/* 1. NAVBAR */}
      {/* 2. HERO — 2-column */}
      {/* 3. STATS — 4 counters */}
      {/* 4. FEATURES — 4 cards */}
      {/* 5. FEATURED VIDEOS — 2 large cards */}
      {/* 6. ANIMATION STYLES — 8 category icons */}
      {/* 7. POPULAR VIDEOS — 4-card grid */}
      {/* 8. HOW IT WORKS — 4 steps */}
      {/* 9. PRICING — 3 plans + B2B */}
      {/* 10. CTA — full-width banner */}
      {/* 11. TESTIMONIALS — carousel */}
      {/* 12. PARTNERS — logo strip */}
      {/* 13. BLOG — 3 article cards */}
      {/* 14. NEWSLETTER — email signup */}
      {/* 15. FOOTER — enhanced 4-column */}
    </main>
  )
}
```

**Section 1 — Navbar:**
```tsx
{/* Rocket-style: fixed top, logo left, nav center, CTAs right */}
<header className="fixed top-3 left-4 right-4 z-50">
  <div className="max-w-7xl mx-auto px-4 bg-bg/90 backdrop-blur-md border border-border rounded-2xl shadow-sm">
    <div className="h-14 flex items-center justify-between">
      <span className="text-lg font-black tracking-tight text-text font-serif">{t.common.brand}</span>
      <nav className="hidden lg:flex items-center gap-6 text-sm text-text-secondary">
        <a href="#features" className="hover:text-text transition-colors">{t.landing.navFeatures}</a>
        <a href="#styles" className="hover:text-text transition-colors">{t.landing.navStyles}</a>
        <a href="#samples" className="hover:text-text transition-colors">{t.landing.navSample}</a>
        <a href="#reviews" className="hover:text-text transition-colors">{t.landing.navReviews}</a>
        <a href="#pricing" className="hover:text-text transition-colors">{t.landing.navPricing}</a>
        <Link href="/blog" className="hover:text-text transition-colors">{t.common.blog}</Link>
      </nav>
      <div className="flex items-center gap-2">
        <LangSwitcher />
        <Link href="/login" className="hidden sm:block text-sm text-text-secondary hover:text-text px-2">{t.common.login}</Link>
        <Link href="/create" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors">
          {t.common.createVideo}
        </Link>
      </div>
    </div>
  </div>
</header>
```

**Section 2 — Hero (2-column, Rocket-style):**
```tsx
<section className="pt-28 md:pt-36 pb-12 px-5 sm:px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
    {/* Left: Text */}
    <div>
      <div className="inline-flex items-center gap-2 bg-primary-light/30 border border-primary-light/50 rounded-lg px-3 py-1 text-xs font-bold text-primary-dark mb-6 tracking-wide uppercase">
        {t.landing.heroLabel}
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-text mb-5">
        {t.landing.heroTitle1}<br />
        <span className="text-primary">{t.landing.heroTitle2}</span>
      </h1>
      <p className="text-base sm:text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
        {t.landing.heroDesc}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Link href="/create" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base rounded-2xl transition-colors text-center">
          {t.landing.heroBtn}
        </Link>
        <a href="#samples" className="px-8 py-4 bg-bg text-text font-semibold text-base rounded-2xl border border-border hover:border-border-hover transition-colors text-center">
          {t.landing.heroSample}
        </a>
      </div>
      {/* Social proof — avatar stack + text */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-primary-light/40 border-2 border-bg flex items-center justify-center text-xs font-bold text-primary-dark">
              {['J', 'S', 'M', 'H'][i]}
            </div>
          ))}
        </div>
        <span className="text-sm text-text-secondary">{t.landing.ctaStat1}</span>
      </div>
    </div>

    {/* Right: Video preview */}
    <div className="relative">
      <div className="w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-dark-bg to-dark-bg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
          <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-1">{t.landing.videoAct}</p>
          <p className="text-white text-lg sm:text-2xl font-black leading-tight text-center">
            &ldquo;{t.landing.videoNarr1}<br />
            <span className="text-primary-light">{t.landing.videoNarr2}&rdquo;</span>
          </p>
        </div>
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span className="text-dark-text/70 text-xs">0:18 / 1:02</span>
          </div>
          <div className="h-1 bg-white/20 rounded-full">
            <div className="h-1 bg-primary-light rounded-full w-[28%]" />
          </div>
        </div>
      </div>
      {/* Floating decorative element */}
      <FloatingHeart className="absolute -top-6 -right-6 w-20 h-20 text-accent animate-[float_4s_ease-in-out_infinite] hidden lg:block" />
    </div>
  </div>
</section>
```

**Section 3 — Stats (Rocket-style 4-column counter strip):**
```tsx
<section className="py-10 px-5 sm:px-6 bg-bg-subtle border-y border-border">
  <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    {[
      { value: t.landing.stat1, label: t.landing.stat1label, icon: '♥' },
      { value: t.landing.stat2, label: t.landing.stat2label, icon: '★' },
      { value: t.landing.stat3, label: t.landing.stat3label, icon: '⚡' },
      { value: t.landing.stat4, label: t.landing.stat4label, icon: '✓' },
    ].map((s, i) => (
      <div key={i} className="flex flex-col items-center gap-1">
        <span className="text-3xl sm:text-4xl font-black text-primary">{s.value}</span>
        <span className="text-sm text-text-secondary">{s.label}</span>
      </div>
    ))}
  </div>
</section>
```

**Section 4 — Features (4-card grid, like Rocket's "Advanced Learning Features"):**
```tsx
<section id="features" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
  <FloatingRing className="absolute top-10 right-10 w-32 h-32 text-primary hidden lg:block" />
  <div className="max-w-7xl mx-auto">
    <div className="mb-10 sm:mb-14">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.navFeatures}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-text tracking-tight">Once Upon Us가 특별한 이유</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: AI Character */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all group">
        <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat1n1} {t.landing.feat1n2}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-3">{t.landing.feat1desc}</p>
        <Link href="/create" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
          {t.landing.feat1btn}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>
      {/* Card 2: Story */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat2n1} {t.landing.feat2n2}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat2desc}</p>
      </div>
      {/* Card 3: Fast */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-primary-light/30 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat3label}</h3>
        <span className="text-4xl font-black text-primary leading-none block mb-2">{t.landing.feat3time}</span>
        <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat3desc}</p>
      </div>
      {/* Card 4: Cinematic */}
      <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-bg-subtle rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">{t.landing.feat4n1} {t.landing.feat4n2}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{t.landing.feat4desc}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-semibold bg-primary-light/30 text-primary px-2.5 py-1 rounded-full">BGM</span>
          <span className="text-xs font-semibold bg-accent-light text-accent px-2.5 py-1 rounded-full">Narration</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Section 5 — Featured Videos (2 large cards, like Rocket's Featured Courses):**
```tsx
<section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg-subtle">
  <div className="max-w-7xl mx-auto">
    <div className="mb-8 sm:mb-10">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.featuredLabel}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.featuredTitle}</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Featured Video 1 */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group">
        <div className="aspect-video bg-dark-bg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 to-dark-bg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{t.landing.propose}</span>
          <span className="absolute bottom-3 right-3 bg-dark-bg/50 text-white text-xs px-2 py-0.5 rounded font-medium">1:02</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">J</div>
            <div>
              <p className="font-bold text-text text-sm">지훈 & 수연</p>
              <p className="text-text-muted text-xs">2024.12</p>
            </div>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">홍대 카페에서 시작된 운명적인 만남. 5년의 연애 끝에 한강에서의 감동 프로포즈.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium bg-primary-light/30 text-primary px-2 py-0.5 rounded-full">동화풍</span>
            <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2 py-0.5 rounded-full">한국어</span>
          </div>
        </div>
      </div>
      {/* Featured Video 2 */}
      <div className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-lg transition-all group">
        <div className="aspect-video bg-dark-bg/80 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark-bg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <span className="absolute top-3 left-3 bg-text-secondary text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">{t.landing.wedding}</span>
          <span className="absolute bottom-3 right-3 bg-dark-bg/50 text-white text-xs px-2 py-0.5 rounded font-medium">1:05</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-xs font-bold text-accent">M</div>
            <div>
              <p className="font-bold text-text text-sm">민준 & 서연</p>
              <p className="text-text-muted text-xs">2025.01</p>
            </div>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">친구로 시작한 7년, 북한산 정상에서의 감동적인 프로포즈. 결혼식 하객 200명이 함께 감상.</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium bg-accent-light text-accent px-2 py-0.5 rounded-full">수채화</span>
            <span className="text-xs font-medium bg-bg-subtle text-text-secondary px-2 py-0.5 rounded-full">한국어</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Commit:**
```bash
git add apps/web/app/page.tsx
git commit -m "feat: landing page sections 1-5 (navbar, hero, stats, features, featured)"
```

---

### Task 4: Landing Page — Sections 6-10

**Files:**
- Modify: `apps/web/app/page.tsx` (add sections 6-10 after section 5)

**Section 6 — Animation Styles (category grid, like Rocket's Trending Categories):**
```tsx
<section id="styles" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
  <FloatingStar className="absolute bottom-10 left-10 w-24 h-24 text-primary hidden lg:block" />
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 sm:mb-14">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.stylesLabel}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.stylesTitle}</h2>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {[
        { label: t.landing.styleFairytale, emoji: '🏰' },
        { label: t.landing.styleWatercolor, emoji: '🎨' },
        { label: t.landing.styleGhibli, emoji: '🌿' },
        { label: t.landing.styleDisney, emoji: '✨' },
        { label: t.landing.stylePopart, emoji: '💥' },
        { label: t.landing.styleMinimal, emoji: '◻️' },
        { label: t.landing.styleClassic, emoji: '🎞️' },
        { label: t.landing.styleComic, emoji: '💬' },
      ].map((s, i) => (
        <Link key={i} href="/create" className="flex flex-col items-center gap-2 p-4 bg-bg-card border border-border rounded-2xl hover:border-border-hover hover:shadow-md transition-all group">
          <span className="text-2xl group-hover:scale-110 transition-transform">{s.emoji}</span>
          <span className="text-sm font-semibold text-text">{s.label}</span>
        </Link>
      ))}
    </div>
  </div>
</section>
```

**Section 7 — Popular Videos (4-card grid, like Rocket's Bestsellers):**
```tsx
<section id="samples" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg-subtle">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-end justify-between mb-8 sm:mb-10">
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.samplesLabel}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.samplesTitle}</h2>
      </div>
      <Link href="/create" className="hidden md:block text-sm font-bold text-primary hover:text-primary-dark transition-colors">
        {t.landing.samplesBtn}
      </Link>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {SAMPLE_VIDEOS.slice(0, 4).map(v => (
        <div key={v.id} className="group cursor-pointer bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-md transition-all">
          <div className={`w-full aspect-video ${v.bg} flex items-center justify-center relative`}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-white/30">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span className="absolute bottom-2 right-2 bg-dark-bg/50 text-white text-xs px-1.5 py-0.5 rounded font-medium">{v.duration}</span>
            <span className={`absolute top-2 left-2 ${v.moodColor} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>{v.mood}</span>
          </div>
          <div className="p-3">
            <p className="font-bold text-text text-sm">{v.title}</p>
            <p className="text-text-secondary text-xs mt-0.5">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 text-center lg:hidden">
      <Link href="/create" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.samplesBtn}</Link>
    </div>
  </div>
</section>
```

**Section 8 — How It Works (keep existing, cleaned up):**
```tsx
<section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 sm:mb-14">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.processLabel}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.processTitle}</h2>
    </div>
    <div className="relative">
      {/* Connecting line — desktop */}
      <div className="hidden md:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-gradient-to-r from-primary-light/50 via-primary-light to-border-hover z-0" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 relative">
        {PROCESS_STEPS.map((s, i) => (
          <div key={s.n} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 pb-8 md:pb-0">
            {i < PROCESS_STEPS.length - 1 && (
              <div className="md:hidden absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary-light/50 to-border z-0" />
            )}
            <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${s.dark ? 'bg-dark-bg' : i % 2 === 0 ? 'bg-primary-light/30 border border-primary-light/30' : 'bg-bg-subtle border border-border'}`}>
              {s.icon}
            </div>
            <div className="md:mt-4 md:text-center">
              <span className={`block text-xs font-black tracking-widest mb-1 ${s.dark ? 'text-text-muted' : 'text-primary-light'}`}>{s.n}</span>
              <h3 className="font-bold text-text text-sm sm:text-base mb-1">{s.title}</h3>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

**Section 9 — Pricing (keep existing structure, with `max-w-7xl` and Rocket-style layout):**
Keep existing pricing section but change `max-w-5xl` to `max-w-7xl` for consistency.

**Section 10 — Full-width CTA (like Rocket's "Become Instructor"):**
```tsx
<section className="py-16 sm:py-20 px-5 sm:px-6 bg-dark-bg text-dark-text relative overflow-hidden">
  <FloatingHeart className="absolute top-10 left-10 w-40 h-40 text-primary-light/20 hidden lg:block" />
  <FloatingRing className="absolute bottom-10 right-10 w-32 h-32 text-accent/20 hidden lg:block" />
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
    <div>
      <p className="text-xs font-bold text-primary-light uppercase tracking-widest mb-3">{t.landing.ctaLabel}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black leading-tight mb-4 whitespace-pre-line">{t.landing.ctaTitle}</h2>
      <p className="text-dark-text/70 mb-6">{t.landing.ctaDesc}</p>
      <Link href="/create" className="inline-block px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold text-base rounded-2xl transition-colors mb-4">
        {t.landing.ctaBtn}
      </Link>
      <div className="flex flex-col sm:flex-row gap-3 text-sm text-dark-text/60">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {t.landing.ctaStat1}
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {t.landing.ctaStat2}
        </span>
      </div>
    </div>
    <div className="hidden lg:flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-primary/15 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-5xl">💍</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Commit:**
```bash
git add apps/web/app/page.tsx
git commit -m "feat: landing page sections 6-10 (styles, popular, process, pricing, cta)"
```

---

### Task 5: Landing Page — Sections 11-15

**Files:**
- Modify: `apps/web/app/page.tsx` (add sections 11-15 after section 10)

**Section 11 — Testimonials (like Rocket's testimonials section):**
```tsx
<section id="reviews" className="py-16 sm:py-20 px-5 sm:px-6 bg-bg relative">
  <FloatingStar className="absolute top-16 right-16 w-28 h-28 text-primary hidden lg:block" />
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 sm:mb-14">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t.landing.testimonialsLabel}</p>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.testimonialsTitle}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        { name: t.landing.review1name, text: t.landing.review1text, role: t.landing.review1role, initial: 'J' },
        { name: t.landing.review2name, text: t.landing.review2text, role: t.landing.review2role, initial: 'S' },
        { name: t.landing.review3name, text: t.landing.review3text, role: t.landing.review3role, initial: 'H' },
        { name: t.landing.review4name, text: t.landing.review4text, role: t.landing.review4role, initial: 'S' },
      ].map((r, i) => (
        <div key={i} className="bg-bg-card border border-border rounded-2xl p-5 hover:border-border-hover hover:shadow-md transition-all">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, j) => (
              <svg key={j} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
          <p className="text-text text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light/40 flex items-center justify-center text-xs font-bold text-primary-dark">{r.initial}</div>
            <div>
              <p className="text-sm font-bold text-text">{r.name}</p>
              <p className="text-xs text-text-muted">{r.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <p className="text-center text-sm text-text-muted mt-6">{t.landing.testimonialsStat}</p>
  </div>
</section>
```

**Section 12 — Partners (logo strip, like Rocket's Organizations):**
```tsx
<section className="py-12 px-5 sm:px-6 bg-bg-subtle border-y border-border">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.partnersLabel}</p>
      <h2 className="font-serif text-2xl font-black text-text">{t.landing.partnersTitle}</h2>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
      {['The Shilla', 'JW Marriott', 'Lotte Hotel', 'Four Seasons', 'Kuho Studio', 'Bonheur Wedding'].map((name, i) => (
        <div key={i} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
          <div className="w-8 h-8 rounded-lg bg-border/50 flex items-center justify-center text-xs font-bold">{name[0]}</div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Section 13 — Blog (3 article cards, like Rocket's Blog section):**
```tsx
<section className="py-16 sm:py-20 px-5 sm:px-6 bg-bg">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-end justify-between mb-8 sm:mb-10">
      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t.landing.blogLabel}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-black text-text">{t.landing.blogTitle}</h2>
      </div>
      <Link href="/blog" className="hidden md:block text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.blogMore}</Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {[
        { title: t.landing.blog1title, desc: t.landing.blog1desc, date: t.landing.blog1date },
        { title: t.landing.blog2title, desc: t.landing.blog2desc, date: t.landing.blog2date },
        { title: t.landing.blog3title, desc: t.landing.blog3desc, date: t.landing.blog3date },
      ].map((post, i) => (
        <Link key={i} href="/blog" className="group bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-hover hover:shadow-md transition-all">
          <div className="aspect-[16/9] bg-bg-subtle relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-30">{['📖', '🎬', '📸'][i]}</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-text-muted mb-2">{post.date}</p>
            <h3 className="font-bold text-text text-sm mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-text-secondary text-xs">{post.desc}</p>
          </div>
        </Link>
      ))}
    </div>
    <div className="mt-6 text-center md:hidden">
      <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">{t.landing.blogMore}</Link>
    </div>
  </div>
</section>
```

**Section 14 — Newsletter (like Rocket's Newsletter section):**
```tsx
<section className="py-12 sm:py-16 px-5 sm:px-6 bg-bg-subtle">
  <div className="max-w-xl mx-auto text-center">
    <h2 className="font-serif text-2xl sm:text-3xl font-black text-text mb-2">{t.landing.newsletterTitle}</h2>
    <p className="text-text-secondary text-sm mb-6">{t.landing.newsletterDesc}</p>
    <div className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.landing.newsletterPlaceholder}
        className="flex-1 px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-all"
      />
      <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap">
        {t.landing.newsletterBtn}
      </button>
    </div>
  </div>
</section>
```

**Section 15 — Footer (enhanced 4-column, like Rocket's footer):**
```tsx
<footer className="py-12 sm:py-16 px-5 sm:px-6 border-t border-border bg-bg">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {/* Brand */}
      <div>
        <span className="text-xl font-black text-text font-serif block mb-3">{t.common.brand}</span>
        <p className="text-sm text-text-muted leading-relaxed">{t.landing.footerDesc}</p>
      </div>
      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-bold text-text mb-3">{t.landing.footerLinks}</h4>
        <div className="flex flex-col gap-2">
          <a href="#features" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navFeatures}</a>
          <a href="#styles" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navStyles}</a>
          <a href="#samples" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navSample}</a>
          <a href="#pricing" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.navPricing}</a>
        </div>
      </div>
      {/* Support */}
      <div>
        <h4 className="text-sm font-bold text-text mb-3">{t.landing.footerSupport}</h4>
        <div className="flex flex-col gap-2">
          <Link href="/blog" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerBlog}</Link>
          <a href="mailto:hello@onceuponus.kr" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerContact}</a>
          <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerFaq}</a>
        </div>
      </div>
      {/* Legal + CTA */}
      <div>
        <h4 className="text-sm font-bold text-text mb-3">{t.landing.ctaLabel}</h4>
        <Link href="/create" className="inline-block px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors mb-4">
          {t.common.createVideo}
        </Link>
        <div className="flex flex-col gap-2">
          <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerTerms}</a>
          <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">{t.landing.footerPrivacy}</a>
        </div>
      </div>
    </div>
    <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-text-muted">{t.landing.footerCopyright}</p>
      <div className="flex items-center gap-4">
        <LangSwitcher />
      </div>
    </div>
  </div>
</footer>
```

**Commit:**
```bash
git add apps/web/app/page.tsx
git commit -m "feat: landing page sections 11-15 (testimonials, partners, blog, newsletter, footer)"
```

---

### Task 6: Build Verification & Push

**Files:** None (verification only)

**Step 1:** Verify TypeScript compiles:
```bash
cd apps/web && npx next build
```
Expected: Build succeeds with 0 errors.

**Step 2:** Fix any type errors if present.

**Step 3:** Push to GitHub:
```bash
git push origin main
```

**Step 4:** Verify deployment at `https://fairy-tale-wedding-web.vercel.app/`

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Add i18n translation keys (ko/en/ja) | `translations.ts` |
| 2 | Create decorative SVG components | `components/decorative/*.tsx` |
| 3 | Landing sections 1-5: Navbar, Hero, Stats, Features, Featured | `page.tsx` |
| 4 | Landing sections 6-10: Styles, Popular, Process, Pricing, CTA | `page.tsx` |
| 5 | Landing sections 11-15: Testimonials, Partners, Blog, Newsletter, Footer | `page.tsx` |
| 6 | Build verification & push | - |
