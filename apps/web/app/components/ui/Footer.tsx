import Link from 'next/link'

interface FooterLink { label: string; href: string }

interface FooterProps { links?: FooterLink[] }

export function Footer({ links = [] }: FooterProps) {
  return (
    <footer className="py-16 px-5 sm:px-6 border-t border-border/50 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <span className="text-xl font-bold text-text tracking-[-0.01em]">Once Upon Us</span>
          <p className="text-sm text-text-muted max-w-xs">AI가 만드는 세상에 하나뿐인 우리의 러브스토리 영상</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-6 text-sm text-text-muted">
            {links.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-text transition-colors duration-200">{link.label}</Link>
            ))}
          </div>
          <p className="text-sm text-text-muted">&copy; 2025 Once Upon Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
