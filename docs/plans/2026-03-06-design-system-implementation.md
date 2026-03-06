# Elegant Romance Design System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the cold indigo Tailwind palette with a warm "Elegant Romance" design system (antique gold + dusty rose + linen), build 14 shared UI components, and redesign all pages.

**Architecture:** Tailwind 4 `@theme inline` for design tokens in `globals.css`. Shared React components in `apps/web/app/components/ui/`. Pages migrated one-by-one, largest first (landing page), then wizard, then secondary pages.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Cormorant Garamond + Pretendard (fonts)

---

## Phase 1: Foundation (Tokens + Fonts)

### Task 1: Define design tokens in globals.css

**Files:**
- Modify: `apps/web/app/globals.css`

**Step 1: Replace globals.css with new token system**

```css
@import "tailwindcss";

:root {
  --background: #FFF8F0;
  --foreground: #2D2520;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Primary */
  --color-primary: #9B7B5B;
  --color-primary-light: #C4A882;
  --color-primary-dark: #7A5F42;

  /* Accent */
  --color-accent: #C9A0A0;
  --color-accent-light: #E8D4D4;

  /* Backgrounds */
  --color-bg: #FFF8F0;
  --color-bg-card: #FFFFFF;
  --color-bg-subtle: #FDF5ED;

  /* Text */
  --color-text: #2D2520;
  --color-text-secondary: #8B7E74;
  --color-text-muted: #B8AFA6;

  /* Borders */
  --color-border: #E8DFD6;
  --color-border-hover: #C4A882;

  /* Semantic */
  --color-success: #6B8F71;
  --color-error: #C75C5C;

  /* Dark surfaces */
  --color-dark-bg: #1E1A16;
  --color-dark-text: #F5EDE4;

  /* Fonts */
  --font-sans: var(--font-pretendard), var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-serif: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
}

body {
  background: var(--background);
  color: var(--foreground);
  word-break: keep-all;
  overflow-wrap: break-word;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

**Step 2: Verify the file saved correctly**

Run: `head -40 apps/web/app/globals.css`

**Step 3: Commit**

```bash
git add apps/web/app/globals.css
git commit -m "design: define Elegant Romance tokens in Tailwind 4 @theme"
```

---

### Task 2: Add Cormorant Garamond + Pretendard fonts

**Files:**
- Modify: `apps/web/app/layout.tsx`

**Step 1: Update layout.tsx to load new fonts**

Replace the current font imports and config:

```tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const pretendard = localFont({
  src: [
    { path: "../public/fonts/PretendardVariable.woff2", weight: "45 920" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Once Upon Us",
  description: "AI turns your love story into a one-of-a-kind animated film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} ${pretendard.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Step 2: Download Pretendard font file**

Run:
```bash
mkdir -p apps/web/public/fonts
curl -L -o apps/web/public/fonts/PretendardVariable.woff2 \
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
```

**Step 3: Verify fonts load**

Run: `cd apps/web && npm run build 2>&1 | tail -20`
Expected: Build succeeds without font-related errors.

**Step 4: Commit**

```bash
git add apps/web/app/layout.tsx apps/web/public/fonts/
git commit -m "design: add Cormorant Garamond + Pretendard fonts"
```

---

## Phase 2: Shared UI Components

### Task 3: Create Button component

**Files:**
- Create: `apps/web/app/components/ui/Button.tsx`

**Step 1: Create Button.tsx**

```tsx
'use client'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark/90',
  secondary: 'bg-bg-card border border-border text-primary hover:bg-bg-subtle hover:border-border-hover',
  ghost: 'bg-transparent text-primary hover:underline',
  dark: 'bg-dark-bg text-dark-text hover:bg-dark-bg/90',
  danger: 'bg-error text-white hover:bg-error/90',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Button.tsx
git commit -m "design: add Button component (primary/secondary/ghost/dark/danger)"
```

---

### Task 4: Create Input component

**Files:**
- Create: `apps/web/app/components/ui/Input.tsx`

**Step 1: Create Input.tsx**

```tsx
'use client'
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm text-text-secondary font-medium">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm text-text-secondary font-medium">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow resize-none ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Input.tsx
git commit -m "design: add Input and Textarea components"
```

---

### Task 5: Create Card component

**Files:**
- Create: `apps/web/app/components/ui/Card.tsx`

**Step 1: Create Card.tsx**

```tsx
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-bg-card border border-border rounded-2xl p-6 ${hover ? 'hover:border-border-hover hover:shadow-md transition-all duration-200' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Card.tsx
git commit -m "design: add Card component"
```

---

### Task 6: Create Badge component

**Files:**
- Create: `apps/web/app/components/ui/Badge.tsx`

**Step 1: Create Badge.tsx**

```tsx
import { type HTMLAttributes } from 'react'

type BadgeVariant = 'gold' | 'rose' | 'dark' | 'success' | 'error'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-primary-light/30 text-primary-dark',
  rose: 'bg-accent-light text-accent',
  dark: 'bg-dark-bg text-dark-text',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
}

export function Badge({ variant = 'gold', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Badge.tsx
git commit -m "design: add Badge component (gold/rose/dark/success/error)"
```

---

### Task 7: Create Modal component

**Files:**
- Create: `apps/web/app/components/ui/Modal.tsx`

**Step 1: Create Modal.tsx**

```tsx
'use client'
import { type ReactNode, useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bg-card rounded-3xl shadow-2xl w-full max-w-sm p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Modal.tsx
git commit -m "design: add Modal component"
```

---

### Task 8: Create SectionHeader component

**Files:**
- Create: `apps/web/app/components/ui/SectionHeader.tsx`

**Step 1: Create SectionHeader.tsx**

```tsx
interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ label, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{label}</p>
      )}
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-base text-text-secondary mt-2">{subtitle}</p>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/SectionHeader.tsx
git commit -m "design: add SectionHeader component (label/title/subtitle)"
```

---

### Task 9: Create Stepper component

**Files:**
- Create: `apps/web/app/components/ui/Stepper.tsx`

**Step 1: Create Stepper.tsx**

```tsx
interface StepperProps {
  steps: number
  current: number
  className?: string
}

export function Stepper({ steps, current, className = '' }: StepperProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: steps }, (_, i) => {
        const n = i + 1
        const isActive = current === n
        const isDone = current > n
        return (
          <div key={n} className="flex items-center gap-0.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                isDone
                  ? 'bg-text text-white'
                  : isActive
                    ? 'bg-primary text-white'
                    : 'bg-bg-subtle text-text-muted'
              }`}
            >
              {isDone ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                n
              )}
            </div>
            {n < steps && (
              <div className={`w-4 h-px ${current > n ? 'bg-text' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Stepper.tsx
git commit -m "design: add Stepper component"
```

---

### Task 10: Create Tabs component

**Files:**
- Create: `apps/web/app/components/ui/Tabs.tsx`

**Step 1: Create Tabs.tsx**

```tsx
'use client'

interface TabsProps {
  tabs: { key: string; label: string }[]
  active: string
  onChange: (key: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex bg-bg-subtle rounded-xl p-1 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            active === tab.key
              ? 'bg-bg-card shadow-sm text-text'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Tabs.tsx
git commit -m "design: add Tabs component"
```

---

### Task 11: Create Navbar component

**Files:**
- Create: `apps/web/app/components/ui/Navbar.tsx`

**Step 1: Create Navbar.tsx**

```tsx
'use client'
import Link from 'next/link'
import { type ReactNode } from 'react'

interface NavbarProps {
  brand?: string
  children?: ReactNode
  actions?: ReactNode
}

export function Navbar({ brand = 'Once Upon Us', children, actions }: NavbarProps) {
  return (
    <header className="fixed top-3 left-4 right-4 z-50">
      <div className="max-w-6xl mx-auto px-4 bg-bg/90 backdrop-blur-md border border-border rounded-2xl shadow-sm">
        <div className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="text-base font-serif font-bold tracking-tight text-text">
              {brand}
            </Link>
            {children && (
              <nav className="hidden md:flex items-center gap-5 text-sm text-text-secondary">
                {children}
              </nav>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Navbar.tsx
git commit -m "design: add Navbar component"
```

---

### Task 12: Create Footer component

**Files:**
- Create: `apps/web/app/components/ui/Footer.tsx`

**Step 1: Create Footer.tsx**

```tsx
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  links?: FooterLink[]
}

export function Footer({ links = [] }: FooterProps) {
  return (
    <footer className="py-12 px-5 sm:px-6 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <span className="text-xl font-serif font-bold text-text">Once Upon Us</span>
          <p className="text-sm text-text-muted max-w-xs">
            Your love story, animated into a one-of-a-kind film.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
          <div className="flex items-center gap-6 text-sm text-text-muted">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-text transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-text-muted">&copy; 2024 Once Upon Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/Footer.tsx
git commit -m "design: add Footer component"
```

---

### Task 13: Create PricingCard component

**Files:**
- Create: `apps/web/app/components/ui/PricingCard.tsx`

**Step 1: Create PricingCard.tsx**

```tsx
import { type ReactNode } from 'react'

type PricingVariant = 'default' | 'recommended' | 'premium'

interface PricingCardProps {
  variant?: PricingVariant
  name: string
  description: string
  price: string
  originalPrice?: string
  features: string[]
  badge?: ReactNode
  className?: string
}

const variantStyles: Record<PricingVariant, string> = {
  default: 'border-2 border-border bg-bg-card',
  recommended: 'border-2 border-primary bg-primary shadow-lg shadow-primary/20',
  premium: 'border-2 border-border bg-bg-card',
}

export function PricingCard({
  variant = 'default',
  name,
  description,
  price,
  originalPrice,
  features,
  badge,
  className = '',
}: PricingCardProps) {
  const isRecommended = variant === 'recommended'
  const textColor = isRecommended ? 'text-white' : 'text-text'
  const descColor = isRecommended ? 'text-white/70' : 'text-text-muted'
  const featureColor = isRecommended ? 'text-white/90' : 'text-text-secondary'
  const checkColor = isRecommended ? 'text-white/60' : 'text-primary'

  return (
    <div className={`rounded-2xl p-6 sm:p-7 relative ${variantStyles[variant]} ${className}`}>
      {badge && <div className="absolute -top-3 right-6">{badge}</div>}
      <h3 className={`font-bold text-xl mb-0.5 ${textColor}`}>{name}</h3>
      <p className={`text-xs mb-4 ${descColor}`}>{description}</p>
      <div className="mb-5 flex items-baseline gap-2">
        {originalPrice && (
          <span className={`text-base line-through ${isRecommended ? 'text-white/40' : 'text-text-muted'}`}>
            {originalPrice}
          </span>
        )}
        <span className={`text-4xl font-bold ${textColor}`}>{price}</span>
      </div>
      <ul className="space-y-2">
        {features.map(f => (
          <li key={f} className={`flex items-center gap-2 text-sm ${featureColor}`}>
            <svg className={`w-4 h-4 flex-shrink-0 ${checkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/PricingCard.tsx
git commit -m "design: add PricingCard component (default/recommended/premium)"
```

---

### Task 14: Create PhotoUploader component

**Files:**
- Create: `apps/web/app/components/ui/PhotoUploader.tsx`

**Step 1: Create PhotoUploader.tsx**

```tsx
'use client'
import { useRef } from 'react'

interface PhotoUploaderProps {
  photos: string[]
  onChange: (photos: string[]) => void
  max?: number
  label?: string
  className?: string
}

export function PhotoUploader({ photos, onChange, max = 3, label, className = '' }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const urls = Array.from(files).map(f => URL.createObjectURL(f))
    onChange([...photos, ...urls].slice(0, max))
    e.target.value = ''
  }

  const remove = (idx: number) => {
    onChange(photos.filter((_, i) => i !== idx))
  }

  return (
    <div className={className}>
      {label && <p className="text-sm text-text-secondary font-medium mb-2">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {photos.map((url, i) => (
          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => remove(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-dark-bg/70 text-dark-text rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-dark-bg"
            >
              &times;
            </button>
          </div>
        ))}
        {photos.length < max && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-text-muted hover:border-primary-light hover:bg-bg-subtle transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/PhotoUploader.tsx
git commit -m "design: add PhotoUploader component"
```

---

### Task 15: Create VideoPreview component

**Files:**
- Create: `apps/web/app/components/ui/VideoPreview.tsx`

**Step 1: Create VideoPreview.tsx**

```tsx
import { type ReactNode } from 'react'

interface VideoPreviewProps {
  title?: string
  progress?: number
  duration?: string
  currentTime?: string
  children?: ReactNode
  className?: string
}

export function VideoPreview({
  title,
  progress = 0,
  duration = '1:02',
  currentTime = '0:00',
  children,
  className = '',
}: VideoPreviewProps) {
  return (
    <div className={`w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/20 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-dark-bg to-dark-bg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
        {children}
      </div>
      <div className="absolute bottom-4 left-6 right-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200">
            <svg className="w-4 h-4 text-dark-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-dark-text/70 text-xs">{currentTime} / {duration}</span>
          {title && <span className="ml-auto text-dark-text/50 text-xs">{title}</span>}
        </div>
        <div className="h-1 bg-white/20 rounded-full">
          <div className="h-1 bg-primary-light rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/VideoPreview.tsx
git commit -m "design: add VideoPreview component"
```

---

### Task 16: Create StatusBadge component

**Files:**
- Create: `apps/web/app/components/ui/StatusBadge.tsx`

**Step 1: Create StatusBadge.tsx**

```tsx
import { Badge } from './Badge'

type ProjectStatus = 'DRAFT' | 'GENERATING' | 'EDITING' | 'PAID' | 'COMPLETED'

interface StatusBadgeProps {
  status: ProjectStatus
  className?: string
}

const statusConfig: Record<ProjectStatus, { label: string; variant: 'gold' | 'success'; pulse?: boolean }> = {
  DRAFT: { label: 'Draft', variant: 'gold' },
  GENERATING: { label: 'Generating', variant: 'gold', pulse: true },
  EDITING: { label: 'Editing', variant: 'gold' },
  PAID: { label: 'Paid', variant: 'success' },
  COMPLETED: { label: 'Completed', variant: 'success' },
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={className}>
      {config.pulse && <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />}
      {config.label}
    </Badge>
  )
}
```

**Step 2: Commit**

```bash
git add apps/web/app/components/ui/StatusBadge.tsx
git commit -m "design: add StatusBadge component"
```

---

### Task 17: Create barrel export for ui components

**Files:**
- Create: `apps/web/app/components/ui/index.ts`

**Step 1: Create index.ts**

```ts
export { Button } from './Button'
export { Input, Textarea } from './Input'
export { Card } from './Card'
export { Badge } from './Badge'
export { Modal } from './Modal'
export { SectionHeader } from './SectionHeader'
export { Stepper } from './Stepper'
export { Tabs } from './Tabs'
export { Navbar } from './Navbar'
export { Footer } from './Footer'
export { PricingCard } from './PricingCard'
export { PhotoUploader } from './PhotoUploader'
export { VideoPreview } from './VideoPreview'
export { StatusBadge } from './StatusBadge'
```

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add apps/web/app/components/ui/index.ts
git commit -m "design: add barrel export for all ui components"
```

---

## Phase 3: Page Migration

### Task 18: Redesign Landing Page

**Files:**
- Modify: `apps/web/app/page.tsx` (436 lines — full rewrite)

**Step 1: Rewrite page.tsx using new components and tokens**

Key changes:
- Replace `bg-white` body with `bg-bg`
- Replace all `indigo-*` classes with `primary`, `primary-light`, `primary-dark`
- Replace all `gray-*` text with `text-text`, `text-text-secondary`, `text-text-muted`
- Replace all `gray-*` borders with `border-border`
- Replace `bg-gray-50` sections with `bg-bg-subtle`
- Replace `bg-gray-900` with `bg-dark-bg`
- Replace `rose-500` with `accent`
- Use `Navbar` component for header
- Use `Footer` component for footer
- Use `SectionHeader` for each section heading
- Use `Card` for feature cards
- Use `PricingCard` for pricing section
- Use `Badge` for event/status badges
- Use `Button` for all CTAs
- Use `VideoPreview` for hero video mock
- Apply `font-serif` to hero h1 and section headings
- Replace hardcoded `text-5xl sm:text-7xl md:text-8xl font-black` with serif display styling

**Step 2: Verify the page renders**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "design: redesign landing page with Elegant Romance theme"
```

---

### Task 19: Redesign Create Wizard page

**Files:**
- Modify: `apps/web/app/create/page.tsx` (347 lines)

**Step 1: Update create/page.tsx**

Key changes:
- Replace inline stepper with `Stepper` component
- Replace `bg-gray-50` right panel with `bg-bg-subtle`
- Replace `border-gray-100` with `border-border`
- Replace all `indigo-*` with `primary` tokens
- Update LoginGateModal to use `Modal` and `Tabs` components
- Use `Button` for all buttons
- Use `Input` for email/password fields

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/create/page.tsx
git commit -m "design: redesign create wizard with shared components"
```

---

### Task 20: Redesign Step components (Step0-Step9)

**Files:**
- Modify: `apps/web/app/create/components/steps/Step0Checklist.tsx`
- Modify: `apps/web/app/create/components/steps/Step1Character.tsx`
- Modify: `apps/web/app/create/components/steps/Step2Opening.tsx`
- Modify: `apps/web/app/create/components/steps/Step4WhoWeAre.tsx`
- Modify: `apps/web/app/create/components/steps/Step5HowWeMet.tsx`
- Modify: `apps/web/app/create/components/steps/Step6BecameLovers.tsx`
- Modify: `apps/web/app/create/components/steps/Step7Decision.tsx`
- Modify: `apps/web/app/create/components/steps/Step8Thanks.tsx`
- Modify: `apps/web/app/create/components/steps/Step9Review.tsx`

**Step 1: Update all Step components**

Common changes across all steps:
- Replace all `indigo-*` with `primary` tokens
- Replace all `gray-*` with `text-*`, `bg-*`, `border-*` tokens
- Replace `rose-*` error colors with `error` token
- Replace `pink-*` with `accent` tokens
- Use `Button` for next/submit buttons
- Use `Input`/`Textarea` for text fields
- Use `PhotoUploader` for photo upload areas in Step1, Step5-Step8
- Use `Card` for preview cards
- Use `Badge` for status indicators in Step9

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/create/components/steps/
git commit -m "design: redesign all wizard step components"
```

---

### Task 21: Redesign Login and Signup pages

**Files:**
- Modify: `apps/web/app/login/page.tsx` (210 lines)
- Modify: `apps/web/app/signup/page.tsx` (236 lines)

**Step 1: Update both pages**

Key changes:
- Replace left panel `indigo-*` gradient with `primary-dark` / warm dark tones
- Use `Input` for form fields
- Use `Button` for submit and social login buttons
- Replace `indigo-600` CTAs with `primary`
- Replace dot grid decorative colors with warm palette
- Use `font-serif` for the left panel headline

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/login/page.tsx apps/web/app/signup/page.tsx
git commit -m "design: redesign login and signup pages"
```

---

### Task 22: Redesign Dashboard page

**Files:**
- Modify: `apps/web/app/dashboard/page.tsx` (210 lines)

**Step 1: Update dashboard page**

Key changes:
- Use `Navbar` component for header
- Replace project cards with `Card` component
- Use `StatusBadge` for project status
- Use `Button` for action buttons
- Replace all hardcoded gradient backgrounds with warm palette
- Replace empty state styling with warm tokens

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/dashboard/page.tsx
git commit -m "design: redesign dashboard with Card and StatusBadge"
```

---

### Task 23: Redesign MyPage

**Files:**
- Modify: `apps/web/app/mypage/page.tsx` (318 lines)

**Step 1: Update mypage**

Key changes:
- Use `Tabs` component for profile/orders/account tabs
- Use `Card` for section containers
- Use `Input` for form fields
- Use `Button` for actions (save, change password, logout, delete)
- Use `Badge` for provider and order status badges
- Use `Modal` for delete confirmation
- Replace all hardcoded colors with tokens

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/mypage/page.tsx
git commit -m "design: redesign mypage with Tabs, Card, and shared components"
```

---

### Task 24: Redesign remaining pages (blog, checkout, complete, edit, generating)

**Files:**
- Modify: `apps/web/app/blog/page.tsx`
- Modify: `apps/web/app/projects/[id]/checkout/page.tsx`
- Modify: `apps/web/app/projects/[id]/complete/page.tsx`
- Modify: `apps/web/app/projects/[id]/edit/page.tsx`
- Modify: `apps/web/app/projects/[id]/generating/page.tsx`

**Step 1: Update all five pages**

Key changes per page:
- **Blog**: Replace tag badge colors with `Badge` variants, use warm background tokens, `SectionHeader`
- **Checkout**: Use `PricingCard` components, `Button` for payment CTA, warm tokens
- **Complete**: Use `Card` for download/share sections, `Button` for actions, `Badge` for plan
- **Edit**: Replace sidebar indigo highlights with `primary` tokens, use `Button` and `Textarea`
- **Generating**: Replace indigo progress indicators with `primary`, use warm tokens

**Step 2: Verify build**

Run: `cd apps/web && npm run build 2>&1 | tail -20`

**Step 3: Commit**

```bash
git add apps/web/app/blog/ apps/web/app/projects/
git commit -m "design: redesign blog, checkout, complete, edit, and generating pages"
```

---

### Task 25: Update LangSwitcher to use design tokens

**Files:**
- Modify: `apps/web/app/components/LangSwitcher.tsx`

**Step 1: Replace hardcoded colors**

- Replace `indigo-*` with `primary` tokens
- Replace `gray-*` with `text-*`, `bg-*` tokens

**Step 2: Commit**

```bash
git add apps/web/app/components/LangSwitcher.tsx
git commit -m "design: update LangSwitcher to use design tokens"
```

---

## Phase 4: Verification

### Task 26: Full build and visual check

**Step 1: Run full build**

Run: `cd apps/web && npm run build`
Expected: Build succeeds with zero errors.

**Step 2: Run dev server and visually verify all pages**

Run: `cd apps/web && npm run dev`

Check each route:
- `/` — landing page
- `/login` — login
- `/signup` — signup
- `/create` — wizard (all 9 steps)
- `/dashboard` — project list
- `/mypage` — profile/orders/account
- `/blog` — blog listing

**Step 3: Verify no remaining hardcoded indigo/gray references**

Run: `grep -rn "indigo-\|bg-gray-\|text-gray-\|border-gray-" apps/web/app/ --include="*.tsx" | grep -v node_modules | grep -v ".next"`

Expected: Zero matches (all replaced with design tokens).

**Step 4: Final commit if any stragglers found**

```bash
git add -A
git commit -m "design: clean up remaining hardcoded color references"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Foundation | 1-2 | Tokens in globals.css + fonts |
| 2. Components | 3-17 | 14 shared ui components + barrel export |
| 3. Migration | 18-25 | Redesign all pages (landing, wizard, auth, dashboard, etc.) |
| 4. Verification | 26 | Build, visual check, grep for stragglers |

**Total: 26 tasks**
