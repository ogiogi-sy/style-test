import { Button } from '@base-ui/react/button'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  UserIcon,
  ClockIcon,
} from '../shared/Icons'
import heroIllustration from '../../assets/illustration-1.png'
import metroLogo from '../../assets/logo-small.svg'

const steps = [
  { label: 'Your details', active: true },
  { label: 'Business info', active: false },
  { label: 'Verification', active: false },
]

const checklist = [
  {
    icon: BriefcaseIcon,
    title: 'Your business details',
    subtitle: 'Company name and registration number',
  },
  {
    icon: UserIcon,
    title: "Who's involved",
    subtitle: "We'll need to check the identity of each director",
  },
  {
    icon: ClockIcon,
    title: 'About 10 minutes',
    subtitle: 'Save and come back whenever you like',
  },
]

export function WebWelcomeSarahScreen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Top nav */}
      <nav className="border-b border-metro-border px-metro-3xl py-metro-lg flex items-center justify-between">
        <img src={metroLogo} alt="Metro Bank" className="h-12 w-auto" />
        <button className="text-metro-sm text-metro-foreground-muted hover:text-metro-foreground transition-colors cursor-pointer bg-transparent border-none">
          Save and exit
        </button>
      </nav>

      {/* Progress stepper */}
      <div className="border-b border-metro-border px-metro-3xl py-metro-md">
        <div className="max-w-3xl mx-auto flex items-center gap-metro-sm">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-metro-sm flex-1">
              <div className="flex items-center gap-metro-sm">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-metro-xs font-medium shrink-0 ${
                    step.active
                      ? 'bg-metro-primary text-metro-primary-foreground'
                      : 'bg-metro-surface-element text-metro-foreground-muted'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-metro-sm whitespace-nowrap ${
                    step.active
                      ? 'font-semibold text-metro-foreground'
                      : 'text-metro-foreground-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-metro-border ml-metro-sm" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-metro-3xl py-metro-xl">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-metro-3xl items-center">
            {/* Left column — copy and checklist */}
            <div className="flex flex-col">
              {/* Heading */}
              <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground mb-metro-sm">
                Hey Sarah, let's go
              </h1>
              <p className="text-metro-md text-metro-foreground-muted mb-metro-2xl">
                We'll get your business account ready. Here's what we'll need:
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-metro-xl mb-metro-2xl">
                {checklist.map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-start gap-metro-lg">
                    <div className="w-12 h-12 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="pt-1">
                      <p className="text-metro-md font-semibold text-metro-foreground">
                        {title}
                      </p>
                      <p className="text-metro-sm text-metro-foreground-muted mt-0.5">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-metro-lg">
                <Button className="flex items-center justify-center gap-metro-sm px-metro-2xl py-4 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
                  Let's start
                  <ArrowRightIcon className="w-5 h-5" />
                </Button>
                <button className="text-metro-sm text-metro-foreground-muted underline hover:text-metro-foreground transition-colors cursor-pointer bg-transparent border-none">
                  Save and exit
                </button>
              </div>
            </div>

            {/* Right column — illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <img
                src={heroIllustration}
                alt="Welcome illustration"
                className="w-96 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
