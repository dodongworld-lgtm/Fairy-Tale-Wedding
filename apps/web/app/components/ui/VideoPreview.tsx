import { type ReactNode } from 'react'

interface VideoPreviewProps {
  title?: string
  progress?: number
  duration?: string
  currentTime?: string
  children?: ReactNode
  className?: string
}

export function VideoPreview({ title, progress = 0, duration = '1:02', currentTime = '0:00', children, className = '' }: VideoPreviewProps) {
  return (
    <div className={`w-full aspect-video rounded-3xl bg-dark-bg overflow-hidden relative shadow-2xl shadow-dark-bg/20 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-dark-bg to-dark-bg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">{children}</div>
      <div className="absolute bottom-4 left-6 right-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-200">
            <svg className="w-4 h-4 text-dark-text ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
          <span className="text-dark-text/70 text-xs">{currentTime} / {duration}</span>
          {title && <span className="ml-auto text-dark-text/50 text-xs">{title}</span>}
        </div>
        <div className="h-1 bg-white/20 rounded-full">
          <div className="h-1 bg-primary-light rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
