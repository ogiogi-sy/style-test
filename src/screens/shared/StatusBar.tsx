import { SignalIcon, WifiIcon, BatteryIcon } from './Icons'

interface StatusBarProps {
  variant?: 'light' | 'dark'
}

export function StatusBar({ variant = 'light' }: StatusBarProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-metro-foreground'

  return (
    <div className={`flex items-center justify-between px-metro-lg py-metro-xs ${textColor}`}>
      <span className="text-metro-sm font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon className="w-4 h-3" />
        <WifiIcon className="w-4 h-3" />
        <BatteryIcon className="w-6 h-3" />
      </div>
    </div>
  )
}
