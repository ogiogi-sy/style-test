import { useState } from 'react'
import {
  BackArrowIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  LockIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  BriefcaseIcon,
  CheckIcon,
} from '../shared/Icons'
import metroLogo from '../../assets/logo-small.svg'

/* ── Inline icons (not in shared Icons.tsx) ── */

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

function BanknoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 17c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6L3 17l3.592-.888A9.2 9.2 0 0010 17z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 9h.01M10 9h.01M12 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PercentBadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 2l2.09 1.64L15 3l.36 2.91L17 8.09 15.36 10 17 11.91l-1.64 2.18L15 17l-2.91-.36L10 18l-2.09-1.36L5 17l-.36-2.91L3 11.91 4.64 10 3 8.09l1.64-2.18L5 3l2.91.36L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SignatureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M2 15c2-3 4-6 6-6s3 4 5 4 3-3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9h2M9 13h2M13 9h2M13 13h2M10 21v-4h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChartSplineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 18c3-6 6-6 9-2s6-4 9-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M12.667 14H3.333A1.333 1.333 0 012 12.667V3.333A1.333 1.333 0 013.333 2h7.334L14 5.333v7.334A1.333 1.333 0 0112.667 14z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M11.333 14V9.333H4.667V14M4.667 2v3.333h5.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M8 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 14.5l1.5-1.5a3.536 3.536 0 000-5L12 7a3.536 3.536 0 00-5 0L5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 5.5L7 7a3.536 3.536 0 000 5l1 1a3.536 3.536 0 005 0l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Data ── */

const wizardSteps = [
  { label: 'Purpose', icon: TargetIcon, active: true },
  { label: 'Financials', icon: BanknoteIcon, active: false },
  { label: 'Decision', icon: MessageCircleIcon, active: false },
  { label: 'Quote', icon: PercentBadgeIcon, active: false },
  { label: 'Sign & Fund', icon: SignatureIcon, active: false },
]

const loanPurposes = [
  { id: 'expansion', label: 'Business expansion', desc: 'Fund new project or headcount', icon: BuildingIcon },
  { id: 'payroll', label: 'Payroll cover', desc: 'Ensure payroll runs in time', icon: BanknoteIcon },
  { id: 'premises', label: 'Premises & office', desc: 'Fit-out or relocate workplace', icon: BuildingIcon },
  { id: 'marketing', label: 'Marketing growth', desc: 'Accelerate pipeline conversion', icon: ChartSplineIcon },
  { id: 'technology', label: 'Technology & equipment', desc: 'Invest in tools and infrastructure', icon: LaptopIcon },
]

const checklistItems = [
  { label: 'Loan reason', done: true },
  { label: 'Open Banking connected', done: false },
  { label: 'Financial records shared', done: false },
  { label: 'Business details confirmed', done: false },
]

/* ── Screen ── */

export function WebPurposeScreen() {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [confirmed, setConfirmed] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  const doneCount = checklistItems.filter((c) => c.done).length
  const remaining = checklistItems.length - doneCount

  return (
    <div className="h-screen flex flex-col bg-metro-surface font-metro-body">
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-metro-3xl py-metro-md shrink-0">
        <img src={metroLogo} alt="Metro Bank" className="h-8 w-auto" />
        <div className="flex items-center gap-metro-lg">
          <div className="flex items-center gap-metro-xs">
            <SaveIcon className="w-4 h-4 text-metro-success" />
            <span className="text-metro-xs text-metro-success">Live saving on</span>
          </div>
          <div className="flex items-center gap-metro-sm">
            <div className="w-8 h-8 rounded-full bg-metro-primary flex items-center justify-center">
              <span className="text-[11px] font-semibold text-metro-primary-foreground">JD</span>
            </div>
            <span className="text-metro-xs text-metro-foreground">James Doe</span>
          </div>
        </div>
      </nav>

      {/* ── Wizard stepper + Back ── */}
      <div className={`flex items-center gap-metro-xl px-metro-3xl py-metro-md shrink-0 border-b transition-colors ${scrolled ? 'border-metro-border' : 'border-transparent'}`}>
        <button className="flex items-center gap-metro-xs text-metro-primary text-metro-sm font-medium cursor-pointer bg-transparent border-none hover:opacity-80 transition-opacity shrink-0">
          <BackArrowIcon className="w-4 h-4" />
          Back
        </button>

        <div className="flex-1 flex items-center justify-center gap-metro-lg">
          {wizardSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-metro-lg">
              <div className="flex items-center gap-metro-xs">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    step.active
                      ? 'bg-metro-primary text-metro-primary-foreground'
                      : 'bg-metro-surface-element text-metro-foreground-muted'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`text-metro-sm whitespace-nowrap ${step.active ? 'font-medium text-metro-foreground' : 'text-metro-foreground-muted'}`}>
                  {step.label}
                </span>
              </div>
              {i < wizardSteps.length - 1 && (
                <div className="w-10 h-px bg-metro-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrollable content area ── */}
      <div
        className="flex-1 overflow-y-auto px-metro-3xl pb-metro-lg"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
      >
      <div className="max-w-[960px] mx-auto">
        {/* Security banner */}
        {!bannerDismissed && (
          <div className="flex items-start gap-metro-md bg-metro-success-soft/40 rounded-metro-card p-metro-md mt-metro-md mb-metro-xl animate-[fadeUp_0.4s_ease-out]">
            <ShieldCheckIcon className="w-5 h-5 text-metro-success shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-metro-sm text-metro-foreground">
                <span className="font-semibold">Your data is protected. </span>
                <span className="font-light">All connections use 256-bit TLS encryption with read-only access. You can revoke consent anytime.</span>
              </p>
              <p className="text-metro-xs text-metro-foreground-muted mt-0.5">
                FCA-regulated &middot; GDPR compliant &middot; No payment permissions
              </p>
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              className="shrink-0 cursor-pointer bg-transparent border-none p-1 hover:opacity-60 transition-opacity"
            >
              <XIcon className="w-4 h-4 text-metro-foreground-muted" />
            </button>
          </div>
        )}

        {/* Main 2-column layout */}
        <div className="flex gap-metro-2xl animate-[fadeUp_0.5s_ease-out_0.1s_both]">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-metro-2xl min-w-0">

            {/* ── Loan reason section ── */}
            <section>
              <div className="mb-metro-lg">
                <h2 className="text-metro-xl font-metro-display font-light text-metro-foreground">What is the loan for?</h2>
                <p className="text-metro-sm font-light text-metro-foreground-muted mt-metro-xs">
                  Select the primary purpose — we've tailored these based on your cashflow patterns and industry.
                </p>
              </div>

              {/* Choice cards grid */}
              <div className="grid grid-cols-2 gap-metro-md mb-metro-md">
                {loanPurposes.map(({ id, label, desc, icon: Icon }) => {
                  const isSelected = selectedPurpose === id
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedPurpose(isSelected ? null : id)}
                      className={`flex items-center gap-metro-md p-metro-lg rounded-metro-card border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-metro-primary-soft border-metro-primary shadow-metro-md'
                          : 'bg-metro-surface border-metro-border hover:border-metro-primary/40 hover:shadow-metro-sm'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-metro-primary text-metro-primary-foreground' : 'bg-metro-surface-element text-metro-foreground-muted'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-metro-sm font-medium ${
                          isSelected ? 'text-metro-primary' : 'text-metro-foreground'
                        }`}>
                          {label}
                        </p>
                        <p className="text-metro-xs text-metro-foreground-muted truncate">{desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-metro-primary bg-metro-primary' : 'border-metro-slate-400'
                      }`}>
                        {isSelected && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Other purpose */}
              <div className="flex items-start gap-metro-md p-metro-lg rounded-metro-card border border-metro-border bg-metro-surface">
                <div className="w-12 h-12 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0">
                  <BriefcaseIcon className="w-6 h-6 text-metro-foreground-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-metro-sm font-medium text-metro-foreground mb-metro-sm">Other purpose</p>
                  <div className="flex items-center gap-metro-xs border border-metro-border rounded-metro-input bg-metro-surface px-metro-md py-metro-xs">
                    <span className="flex-1 text-metro-xs text-metro-foreground-muted truncate">select from additional categories</span>
                    <ChevronDownIcon className="w-4 h-4 text-metro-foreground-muted shrink-0" />
                  </div>
                </div>
              </div>
            </section>

            {/* ── Open Banking section ── */}
            <section className="border border-metro-border rounded-metro-card p-metro-xl">
              <div className="flex items-start justify-between mb-metro-lg">
                <div>
                  <h3 className="text-metro-lg font-metro-display font-light text-metro-foreground">Link your bank account</h3>
                  <p className="text-metro-sm text-metro-foreground-muted mt-metro-xs">
                    Verify your business income via FCA-regulated Open Banking. Select your bank and securely share read-only transaction data.
                  </p>
                </div>
                <span className="shrink-0 text-metro-xs font-medium text-metro-red-500 bg-metro-red-50 px-metro-sm py-0.5 rounded-metro-button ml-metro-lg">
                  Required
                </span>
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-metro-md mb-metro-xl">
                {[
                  { icon: LockIcon, text: 'Read-only access — we can never move your money' },
                  { icon: ShieldCheckIcon, text: 'FCA-regulated and GDPR compliant' },
                  { icon: LinkIcon, text: 'You can revoke access at any time' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-metro-md">
                    <div className="w-8 h-8 rounded-full bg-metro-primary-soft flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-metro-primary" />
                    </div>
                    <p className="text-metro-sm text-metro-foreground">{text}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full flex items-center justify-center py-metro-md bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium cursor-pointer border-none hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
                Connect your bank account
              </button>
            </section>
          </div>

          {/* ── Right sidebar ── */}
          <aside className="w-[240px] shrink-0 pt-metro-xs animate-[fadeUp_0.5s_ease-out_0.2s_both]">
            <h3 className="text-metro-lg font-metro-display font-light text-metro-foreground mb-metro-xs">Application checklist</h3>
            <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
              Complete {remaining} remaining item{remaining !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-col gap-metro-md">
              {checklistItems.map((item) => (
                <div key={item.label} className="flex items-center gap-metro-sm">
                  {item.done ? (
                    <CheckCircleIcon className="w-5 h-5 text-metro-success shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-metro-slate-300 shrink-0" />
                  )}
                  <span className={`text-metro-sm font-medium ${item.done ? 'text-metro-success' : 'text-metro-foreground-muted'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="shrink-0 border-t border-metro-border px-metro-3xl py-metro-md flex items-center justify-between">
        <label className="flex items-center gap-metro-md cursor-pointer">
          <button
            onClick={() => setConfirmed(!confirmed)}
            className={`w-4 h-4 rounded flex items-center justify-center border cursor-pointer transition-colors ${
              confirmed
                ? 'bg-metro-primary border-metro-primary'
                : 'bg-metro-surface border-metro-slate-400'
            }`}
          >
            {confirmed && <CheckIcon className="w-3 h-3 text-white" />}
          </button>
          <span className="text-metro-sm font-medium text-metro-foreground">
            Please confirm your business meets our minimum lending criteria
          </span>
        </label>

        <button className="px-metro-2xl py-metro-md bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium cursor-pointer border-none hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Submit Application
        </button>
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
