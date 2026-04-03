export function FloatingHeart({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 56S8 40 8 22a12 12 0 0 1 24-2 12 12 0 0 1 24 2c0 18-24 34-24 34Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.08"
      />
    </svg>
  )
}
