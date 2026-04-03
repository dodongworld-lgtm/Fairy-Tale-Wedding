interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ label, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      {label && <p className="text-[0.75rem] font-medium text-primary uppercase tracking-[0.08em] mb-4">{label}</p>}
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-serif font-bold text-text tracking-[-0.02em] leading-tight">{title}</h2>
      {subtitle && <p className="text-base text-text-secondary mt-3 leading-relaxed">{subtitle}</p>}
    </div>
  )
}
