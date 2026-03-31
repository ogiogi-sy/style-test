import { Button } from '@base-ui/react/button'
import { CheckIcon } from '../shared/Icons'
import metroLogo from '../../assets/logo-small.svg'
import blueCard from '../../assets/blue-card.png'

type StepStatus = 'completed' | 'active' | 'inactive'

const steps: { label: string; status: StepStatus }[] = [
  { label: 'Identity verified', status: 'completed' },
  { label: 'Add your business details', status: 'active' },
  { label: 'Add your financial details', status: 'inactive' },
  { label: 'Set up account access', status: 'inactive' },
  { label: 'Set up payments', status: 'inactive' },
  { label: 'Confirm your plan', status: 'inactive' },
]

function StepIndicator({ status }: { status: StepStatus }) {
  if (status === 'completed') {
    return (
      <div className="w-4 h-4 flex items-center justify-center text-metro-primary shrink-0">
        <CheckIcon className="w-4 h-4" />
      </div>
    )
  }
  return (
    <div className="w-4 h-4 flex items-center justify-center shrink-0">
      <div
        className={`w-2 h-2 rounded-full ${
          status === 'active' ? 'bg-metro-primary' : 'bg-metro-slate-300'
        }`}
      />
    </div>
  )
}

function FlipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4.5h9.5m0 0L9 2m2.5 2.5L9 7M14 11.5H4.5m0 0L7 14m-2.5-2.5L7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MetroCreditCard() {
  return (
    <img
      src={blueCard}
      alt="Metro Everyday card"
      className="w-[340px] h-auto"
    />
  )
}

export function WebOnboardingStepperScreen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-metro-3xl py-metro-lg">
        <img src={metroLogo} alt="Metro Bank" className="h-8 w-auto" />
        <div className="w-8 h-8 rounded-full bg-[#c7b9da] overflow-hidden flex items-center justify-center">
          <span className="text-[11px] font-medium text-white leading-none">SJ</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-stretch px-metro-3xl py-metro-2xl gap-metro-3xl">
        {/* Left column — stepper */}
        <div className="w-[480px] shrink-0 flex flex-col pt-metro-lg pl-metro-lg animate-[fadeUp_0.5s_ease-out]">
          {/* Heading */}
          <div className="flex flex-col gap-metro-xs mb-metro-2xl">
            <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
              You're almost there
            </h1>
            <p className="text-metro-md text-metro-foreground-muted">
              Only 5 steps left.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex flex-col flex-1">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="animate-[fadeUp_0.4s_ease-out_both]"
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                {/* Step row */}
                <div className="flex items-center gap-metro-md">
                  <StepIndicator status={step.status} />
                  <span
                    className={`text-metro-md font-medium ${
                      step.status === 'inactive'
                        ? 'text-metro-foreground-muted'
                        : 'text-metro-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex py-[6px]">
                    <div className="w-4 flex justify-center">
                      <div
                        className={`w-[2px] h-8 ${
                          step.status === 'completed'
                            ? 'bg-metro-primary'
                            : 'bg-metro-slate-200'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue button */}
          <div className="pb-metro-2xl pt-metro-lg max-w-[480px]">
            <Button className="w-full flex items-center justify-center px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
              Continue
            </Button>
          </div>
        </div>

        {/* Right column — card showcase */}
        <div className="flex-1 bg-metro-slate-100 rounded-[32px] flex flex-col items-center justify-center gap-metro-md animate-[fadeUp_0.5s_ease-out_0.15s_both]">
          <div className="animate-[cardEnter_0.6s_ease-out_0.3s_both]">
            <MetroCreditCard />
          </div>

          <div className="flex flex-col items-center gap-5 animate-[fadeUp_0.4s_ease-out_0.5s_both]">
            <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">
              Everyday account
            </h2>
            <p className="text-metro-md text-metro-foreground-muted text-center max-w-[320px]">
              An electric ocean blue metal card that turns heads at every checkout.
            </p>
            <button className="flex items-center gap-metro-sm px-metro-lg py-metro-xs border border-metro-primary rounded-metro-button text-metro-sm font-medium text-metro-primary cursor-pointer bg-transparent hover:bg-metro-primary-soft transition-colors shadow-metro-sm">
              <FlipIcon className="w-4 h-4" />
              Show back
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
