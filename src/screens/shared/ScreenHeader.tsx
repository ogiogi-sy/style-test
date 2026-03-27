import type { ReactNode } from 'react'
import { Progress } from '@base-ui/react/progress'
import { StatusBar } from './StatusBar'
import { BackArrowIcon } from './Icons'

interface ScreenHeaderProps {
  /** Progress percentage (0–100). Omit to hide the progress bar. */
  progress?: number
  showBack?: boolean
  /** Optional label displayed next to the back button. */
  title?: string
  /** Optional icon or element rendered on the right side of the header. */
  rightIcon?: ReactNode
}

export function ScreenHeader({ progress, showBack = true, title, rightIcon }: ScreenHeaderProps) {
  return (
    <div className="bg-metro-surface">
      <StatusBar variant="light" />
      <div className="flex items-center justify-between px-metro-lg py-metro-md">
        <div className="flex items-center">
          {showBack ? (
            <button className="w-10 h-10 rounded-full bg-metro-surface-element flex items-center justify-center">
              <BackArrowIcon className="w-5 h-5 text-metro-foreground" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          {title && (
            <span className="ml-metro-sm text-metro-sm font-medium text-metro-foreground">
              {title}
            </span>
          )}
        </div>
        {rightIcon && (
          <div className="flex items-center">{rightIcon}</div>
        )}
      </div>
      {progress != null && (
        <Progress.Root value={progress} className="w-full px-metro-lg">
          <Progress.Track className="h-1 w-full rounded-metro-button bg-metro-border">
            <Progress.Indicator
              className="h-full rounded-metro-button bg-metro-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </Progress.Track>
        </Progress.Root>
      )}
    </div>
  )
}
