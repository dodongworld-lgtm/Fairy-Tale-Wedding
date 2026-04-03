'use client'

interface TabsProps {
  tabs: { key: string; label: string }[]
  active: string
  onChange: (key: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex bg-bg-subtle rounded-lg p-1 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer ${active === tab.key ? 'bg-bg-card shadow-sm text-text' : 'text-text-secondary hover:text-text'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
