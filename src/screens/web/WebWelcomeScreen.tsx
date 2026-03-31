import { Button } from '@base-ui/react/button'
import {
  ArrowRightIcon,
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
  BriefcaseIcon,
} from '../shared/Icons'
import heroIllustration from '../../assets/illustration-2.png'
import metroLogo from '../../assets/logo-small.svg'

const features = [
  { icon: UserIcon, label: 'An account that fits your business' },
  { icon: ShieldCheckIcon, label: 'Smart insights powered by AI' },
  { icon: ClockIcon, label: 'Apply in minutes, not days' },
  { icon: BriefcaseIcon, label: 'Your own dedicated manager' },
]

export function WebWelcomeScreen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Top nav bar */}
      <nav className="flex items-center justify-between px-metro-3xl py-metro-lg">
        <img src={metroLogo} alt="Metro Bank" className="h-8 w-auto" />
        <div className="flex items-center gap-metro-md">
          <a
            href="#"
            className="text-metro-sm font-medium text-metro-foreground-muted hover:text-metro-foreground transition-colors no-underline"
          >
            Log in
          </a>
          <Button className="px-metro-lg py-metro-xs bg-transparent text-metro-foreground rounded-full border border-metro-border text-metro-sm font-medium cursor-pointer hover:bg-metro-surface-element transition-colors">
            Open an account
          </Button>
        </div>
      </nav>

      {/* Main content — two panel layout */}
      <div className="flex-1 flex items-stretch px-metro-3xl py-metro-lg gap-metro-3xl">
        {/* Left panel — content */}
        <div className="w-[520px] shrink-0 flex flex-col px-metro-lg">
          {/* Middle — vertically centered */}
          <div className="flex-1 flex flex-col justify-center animate-[fadeUp_0.5s_ease-out]">
            <div className="mb-metro-2xl">
              <h1 className="text-[2.75rem] leading-tight font-metro-display font-light text-metro-foreground mb-metro-sm">
                Business banking built
                <br />
                around you
              </h1>
              <p className="text-metro-md text-metro-foreground-muted">
                Open a business account in minutes with dedicated support and smart tools.
              </p>
            </div>

            <div className="flex flex-col gap-metro-lg">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-metro-md">
                  <div className="w-11 h-11 rounded-full bg-metro-primary/10 text-metro-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-metro-md text-metro-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — CTA */}
          <div className="pb-metro-lg animate-[fadeUp_0.5s_ease-out_0.15s_both] flex flex-col gap-metro-md">
            <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-2xl py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
              Get started
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <button className="w-full flex items-center justify-center text-metro-sm text-metro-foreground-muted underline hover:text-metro-foreground transition-colors cursor-pointer bg-transparent border-none">
              Save for later
            </button>
          </div>
        </div>

        {/* Right panel — blue with illustration */}
        <div className="flex-1 bg-metro-primary rounded-[32px] flex flex-col items-center justify-center overflow-hidden">
          <img
            src={heroIllustration}
            alt="Business banking illustration"
            className="w-[480px] h-auto animate-[fadeUp_0.6s_ease-out_0.2s_both]"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
