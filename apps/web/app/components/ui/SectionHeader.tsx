interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ label, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      {label && <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{label}</p>}
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text tracking-tight">{title}</h2>
      {subtitle && <p className="text-base text-text-secondary mt-2">{subtitle}</p>}
    </div>
  )
}
