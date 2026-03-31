import type { ReactNode } from 'react'
import { TrendUpIcon } from '../../shared/Icons'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
  trend?: string
  trendLabel?: string
  subtitle?: string
  variant?: 'default' | 'muted'
}

export function StatCard({ icon, label, value, trend, trendLabel, subtitle, variant = 'default' }: StatCardProps) {
  return (
    <div className={`border border-metro-border rounded-metro-card p-metro-lg flex flex-col gap-metro-md ${
      variant === 'muted' ? 'bg-metro-surface-element' : 'bg-metro-surface'
    }`}>
      <div className="flex items-center gap-metro-sm">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-metro-foreground shrink-0 ${
          variant === 'muted' ? 'bg-metro-surface' : 'bg-metro-surface-element'
        }`}>
          {icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-metro-sm text-metro-foreground leading-tight">{label}</span>
          {subtitle && (
            <span className="text-metro-xs text-metro-foreground-muted leading-tight">{subtitle}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-metro-xs">
        <span className="text-metro-2xl font-metro-display font-normal text-metro-foreground tabular-nums">{value}</span>
        {trend && (
          <span className="inline-flex items-center gap-1 text-metro-success text-metro-xs">
            <TrendUpIcon className="w-3.5 h-3.5" />
            {trend}
          </span>
        )}
        {trendLabel && (
          <span className="inline-flex items-center gap-1 text-metro-success text-metro-xs">
            <TrendUpIcon className="w-3.5 h-3.5" />
            {trendLabel}
          </span>
        )}
      </div>
    </div>
  )
}
