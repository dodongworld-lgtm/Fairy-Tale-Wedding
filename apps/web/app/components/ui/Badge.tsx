import { type HTMLAttributes } from 'react'

type BadgeVariant = 'gold' | 'rose' | 'dark' | 'success' | 'error'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-primary/10 text-primary-dark',
  rose: 'bg-accent/10 text-accent',
  dark: 'bg-dark-bg text-dark-text',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
}

export function Badge({ variant = 'gold', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-medium uppercase tracking-wide ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
