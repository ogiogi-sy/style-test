import { useRef, useState, useEffect } from 'react'
import { WebWelcomeScreen } from './web/WebWelcomeScreen'
import { WebWelcomeSarahScreen } from './web/WebWelcomeSarahScreen'
import { WebDashboardScreen } from './web/WebDashboardScreen'
import { WebConnectBankScreen } from './web/WebConnectBankScreen'
import { WebBusinessLendingScreen } from './web/WebBusinessLendingScreen'
import { WebOnboardingStepperScreen } from './web/WebOnboardingStepperScreen'

const FRAME_W = 1512
const FRAME_H = 982

const screens = [
  { name: 'Portfolio Overview Dashboard', component: WebDashboardScreen },
  { name: 'Welcome', component: WebWelcomeScreen },
  { name: 'Welcome Sarah', component: WebWelcomeSarahScreen },
  { name: 'Connect Your Bank', component: WebConnectBankScreen },
  { name: 'Business Lending', component: WebBusinessLendingScreen },
  { name: 'Onboarding Stepper', component: WebOnboardingStepperScreen },
]

function ScaledFrame({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={outerRef} className="w-full rounded-metro-card overflow-hidden shadow-metro-lg border border-metro-border" style={{ aspectRatio: `${FRAME_W}/${FRAME_H}` }}>
      <div style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

export function WebPreviewPage() {
  return (
    <div className="min-h-screen bg-metro-slate-100 p-metro-2xl font-metro-body">
      <header className="mb-metro-2xl flex items-end justify-between">
        <div>
          <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
            Web Screens
          </h1>
          <p className="text-metro-lg text-metro-foreground-muted">
            Desktop-optimised screens using the Metro design system
          </p>
        </div>
        <a
          href="#/"
          className="text-metro-sm font-medium text-metro-primary hover:text-metro-primary-hover transition-colors"
        >
          &larr; View Mobile Screens
        </a>
      </header>
      <div className="flex flex-col gap-metro-2xl">
        {screens.map(({ name, component: Screen }) => (
          <section key={name} className="flex flex-col gap-metro-md">
            <h2 className="text-metro-lg font-semibold text-metro-foreground">{name}</h2>
            <ScaledFrame>
              <Screen />
            </ScaledFrame>
          </section>
        ))}
      </div>
    </div>
  )
}
