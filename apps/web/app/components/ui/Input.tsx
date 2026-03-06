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
        {label && <label className="block text-sm text-text-secondary font-medium">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow ${error ? 'border-error' : ''} ${className}`}
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
        {label && <label className="block text-sm text-text-secondary font-medium">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover transition-shadow resize-none ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
