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
            <Link href="/" className="text-base font-serif font-bold tracking-tight text-text">{brand}</Link>
            {children && <nav className="hidden md:flex items-center gap-5 text-sm text-text-secondary">{children}</nav>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  )
}
