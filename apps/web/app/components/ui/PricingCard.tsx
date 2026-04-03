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
  default: 'border border-border/50 bg-bg-card',
  recommended: 'border-2 border-primary bg-primary shadow-xl shadow-primary/15',
  premium: 'border border-border/50 bg-bg-card',
}

export function PricingCard({ variant = 'default', name, description, price, originalPrice, features, badge, className = '' }: PricingCardProps) {
  const isRec = variant === 'recommended'
  const textColor = isRec ? 'text-white' : 'text-text'
  const descColor = isRec ? 'text-white/70' : 'text-text-muted'
  const featureColor = isRec ? 'text-white/90' : 'text-text-secondary'
  const checkColor = isRec ? 'text-white/60' : 'text-primary'

  return (
    <div className={`rounded-xl p-7 sm:p-8 relative ${variantStyles[variant]} ${className}`}>
      {badge && <div className="absolute -top-3 right-6">{badge}</div>}
      <h3 className={`font-bold text-xl mb-0.5 ${textColor}`}>{name}</h3>
      <p className={`text-xs mb-4 ${descColor}`}>{description}</p>
      <div className="mb-5 flex items-baseline gap-2">
        {originalPrice && <span className={`text-base line-through ${isRec ? 'text-white/40' : 'text-text-muted'}`}>{originalPrice}</span>}
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
