import { useState } from 'react'
import { Separator } from '@base-ui/react/separator'
import { ScreenHeader } from './shared/ScreenHeader'

const MAX_PIN = 6

export function ConfirmIdentityScreen() {
  const [pin, setPin] = useState('123')
  function handleDigit(digit: string) {
    if (pin.length < MAX_PIN) {
      setPin((prev) => prev + digit)
    }
  }

  function handleDelete() {
    setPin((prev) => prev.slice(0, -1))
  }

  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={66} />

      <div className="flex-1 px-metro-lg overflow-y-auto">
        {/* Title + subtitle */}
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs mt-metro-lg">
          Confirm it&#8217;s you
        </h2>
        <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
          Authentication required for this payment.
        </p>

        {/* Biometric button */}
        <button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 border border-metro-primary text-metro-primary bg-white rounded-metro-button text-metro-sm font-medium cursor-pointer hover:bg-metro-primary-soft active:bg-metro-primary-soft transition-colors mb-metro-lg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <rect x="1.5" y="1.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Use Face ID / fingerprint
        </button>

        {/* Divider with text */}
        <div className="flex items-center gap-metro-md mb-metro-xl">
          <Separator className="flex-1 h-px bg-metro-border" />
          <span className="text-metro-xs text-metro-foreground-muted">Or enter your PIN</span>
          <Separator className="flex-1 h-px bg-metro-border" />
        </div>

        {/* PIN dots */}
        <div className="flex justify-center gap-3 mb-metro-xl">
          {Array.from({ length: MAX_PIN }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full ${
                i < pin.length
                  ? 'bg-metro-primary'
                  : 'border-2 border-metro-primary'
              }`}
            />
          ))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-metro-md max-w-[240px] mx-auto justify-items-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].map(
            (key) => {
              if (key === 'ok') {
                return (
                  <button
                    key={key}
                    className="w-16 h-16 rounded-full bg-metro-primary text-metro-primary-foreground text-metro-sm font-medium flex items-center justify-center cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors"
                  >
                    OK
                  </button>
                )
              }
              if (key === 'del') {
                return (
                  <button
                    key={key}
                    onClick={handleDelete}
                    className="w-16 h-16 rounded-full border border-metro-border bg-white text-metro-foreground flex items-center justify-center cursor-pointer hover:bg-metro-surface-element active:bg-metro-surface-element transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M7 4l-5 6 5 6h11V4H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 8l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )
              }
              return (
                <button
                  key={key}
                  onClick={() => handleDigit(key)}
                  className="w-16 h-16 rounded-full border border-metro-border bg-white text-metro-lg font-medium text-metro-foreground flex items-center justify-center cursor-pointer hover:bg-metro-surface-element active:bg-metro-surface-element transition-colors"
                >
                  {key}
                </button>
              )
            }
          )}
        </div>
      </div>

    </div>
  )
}
