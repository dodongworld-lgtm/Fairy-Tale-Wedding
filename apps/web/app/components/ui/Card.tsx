import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-bg-card border border-border rounded-2xl p-6 ${hover ? 'hover:border-border-hover hover:shadow-md transition-all duration-200' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
