import type { ReactNode } from 'react'

interface PhoneFrameProps {
  label: string
  children: ReactNode
}

export function PhoneFrame({ label, children }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-metro-md shrink-0">
      <div className="w-[375px] h-[812px] rounded-[40px] shadow-metro-lg overflow-hidden bg-metro-surface flex flex-col">
        {children}
      </div>
      <span className="text-metro-sm font-medium text-metro-foreground-muted">{label}</span>
    </div>
  )
}
