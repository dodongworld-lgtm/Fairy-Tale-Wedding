import { Badge } from './Badge'

type ProjectStatus = 'DRAFT' | 'GENERATING' | 'EDITING' | 'PAID' | 'COMPLETED'

interface StatusBadgeProps {
  status: ProjectStatus
  className?: string
}

const statusConfig: Record<ProjectStatus, { label: string; variant: 'gold' | 'success'; pulse?: boolean }> = {
  DRAFT: { label: 'Draft', variant: 'gold' },
  GENERATING: { label: 'Generating', variant: 'gold', pulse: true },
  EDITING: { label: 'Editing', variant: 'gold' },
  PAID: { label: 'Paid', variant: 'success' },
  COMPLETED: { label: 'Completed', variant: 'success' },
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={className}>
      {config.pulse && <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />}
      {config.label}
    </Badge>
  )
}
