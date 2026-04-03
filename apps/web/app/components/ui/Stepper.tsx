interface StepperProps {
  steps: number
  current: number
  className?: string
}

export function Stepper({ steps, current, className = '' }: StepperProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: steps }, (_, i) => {
        const n = i + 1
        const isActive = current === n
        const isDone = current > n
        return (
          <div key={n} className="flex items-center gap-0.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-300 ${isDone ? 'bg-text text-white' : isActive ? 'bg-primary text-white' : 'bg-bg-subtle text-text-muted'}`}>
              {isDone ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : n}
            </div>
            {n < steps && <div className={`w-5 h-px ${current > n ? 'bg-text' : 'bg-border/60'}`} />}
          </div>
        )
      })}
    </div>
  )
}
