export function FloatingRing({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="16" stroke="currentColor" strokeWidth="2" opacity="0.12" />
      <path d="M26 20l6-12 6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
    </svg>
  )
}
