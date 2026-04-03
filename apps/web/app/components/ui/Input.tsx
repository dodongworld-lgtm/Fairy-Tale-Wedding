'use client'
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3.5 bg-bg border border-border/60 rounded-lg text-text placeholder-text-muted/70 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-border-hover transition-all duration-300 ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3.5 bg-bg border border-border/60 rounded-lg text-text placeholder-text-muted/70 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-border-hover transition-all duration-300 resize-none ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
