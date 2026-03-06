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
