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
