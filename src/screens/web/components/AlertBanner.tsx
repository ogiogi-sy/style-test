import { Button } from '@base-ui/react/button'
import { InfoIcon, AlertTriangleIcon, XIcon } from '../../shared/Icons'

interface AlertBannerProps {
  variant: 'warning' | 'error'
  title: string
  description: string
  action?: { label: string }
  onDismiss?: () => void
}

export function AlertBanner({ variant, title, description, action, onDismiss }: AlertBannerProps) {
  const styles = {
    warning: {
      bg: 'bg-metro-amber-50',
      icon: 'text-metro-warning',
      border: 'border-metro-amber-200',
    },
    error: {
      bg: 'bg-metro-red-50',
      icon: 'text-metro-error',
      border: 'border-metro-red-200',
    },
  }

  const s = styles[variant]
  const Icon = variant === 'warning' ? InfoIcon : AlertTriangleIcon

  return (
    <div className={`${s.bg} ${s.border} border rounded-metro-input px-metro-lg py-metro-md flex items-center gap-metro-md`}>
      <Icon className={`w-4 h-4 ${s.icon} shrink-0`} />
      <div className="flex-1 min-w-0">
        <span className="text-metro-sm font-semibold text-metro-foreground">{title}</span>
        <span className="text-metro-sm text-metro-foreground-muted ml-metro-sm">{description}</span>
      </div>
      {action && (
        <Button className="shrink-0 px-metro-md py-1.5 bg-metro-accent text-white text-metro-xs font-semibold rounded-metro-button border-none cursor-pointer hover:opacity-90 transition-opacity">
          {action.label}
        </Button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 p-1 text-metro-foreground-muted hover:text-metro-foreground cursor-pointer bg-transparent border-none transition-colors">
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
