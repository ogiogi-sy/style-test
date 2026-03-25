import type { ReactNode } from 'react'

interface PersonCardProps {
  initials: ReactNode
  name: string
  subtitle?: ReactNode
  bordered?: boolean
  compact?: boolean
  badges?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  bg?: string
  text?: string
}

export function PersonCard({ initials, name, subtitle, bordered, compact, badges, actions, children, bg = 'bg-metro-primary-soft', text = 'text-metro-primary' }: PersonCardProps) {
  return (
    <div
      className={`rounded-metro-card ${compact ? 'p-metro-md' : 'p-metro-lg'} ${
        bordered
          ? 'bg-white border-l-[3px] border-metro-primary'
          : 'bg-white border border-metro-border'
      }`}
    >
      <div className="flex items-center gap-metro-md">
        <div className={`${compact ? 'w-9 h-9' : 'w-10 h-10'} rounded-full ${bg} ${text} flex items-center justify-center text-metro-sm font-semibold shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-metro-base font-medium text-metro-foreground">{name}</p>
          {subtitle && (
            <p className="text-metro-sm text-metro-foreground-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        {badges && <div className="shrink-0">{badges}</div>}
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {children && <div className="mt-metro-lg">{children}</div>}
    </div>
  )
}
