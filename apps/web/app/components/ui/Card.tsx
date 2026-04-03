import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-bg-card border border-border/50 rounded-xl p-7 ${hover ? 'hover:border-border-hover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
