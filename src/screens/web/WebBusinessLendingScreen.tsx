import { ArrowRightIcon, ClockIcon, InfoIcon } from '../shared/Icons'
import metroLogo from '../../assets/logo-small.svg'

function PoundIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M13.5 4.5A4 4 0 006 7v3H5m0 0h8m-8 0v3a2 2 0 002 2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PercentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const infoCards = [
  { icon: ClockIcon, title: 'Quick decision', desc: 'About 3 minutes for your personalised quote' },
  { icon: PoundIcon, title: 'Money arrives fast', desc: 'About 30 minutes for funds to reach your account' },
  { icon: PercentIcon, title: 'Your rate', desc: '6.7% – 12% APR representative' },
]

const steps = [
  { title: 'Set up your loan', desc: "Choose the amount, term, and what it's for — we've pre-filled a recommendation" },
  { title: 'Connect your bank', desc: 'Authorise read-only access via Open Banking — takes about 30 seconds' },
  { title: 'Review and submit', desc: "We'll run a full credit check — your final offer may differ from the indicative amount" },
  { title: 'Accept and sign', desc: 'Review your offer, choose your account, sign digitally and release funds' },
]

export function WebBusinessLendingScreen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-metro-3xl py-metro-lg">
        <img src={metroLogo} alt="Metro Bank" className="h-10 w-auto" />
        <div className="flex items-center gap-metro-sm">
          <div className="w-8 h-8 rounded-full bg-metro-primary flex items-center justify-center">
            <span className="text-metro-xs font-semibold text-metro-primary-foreground">J</span>
          </div>
          <span className="text-metro-sm text-metro-foreground">James Doe</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-metro-3xl py-metro-2xl">
        <div className="w-full max-w-3xl flex flex-col gap-metro-2xl">

          {/* Greeting */}
          <div className="flex flex-col gap-metro-sm animate-[fadeUp_0.5s_ease-out_both]">
            <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
              James, we've been planning ahead for you
            </h1>
            <p className="text-metro-md text-metro-foreground-muted">
              Based on your six years with us and your recent account activity, we've run a soft credit check and prepared an indicative funding offer for Riverside Consulting Ltd. No impact to your credit file.
            </p>
          </div>

          {/* Info Cards — icons top-aligned, neutral style matching other sections */}
          <div className="grid grid-cols-3 gap-metro-md animate-[fadeUp_0.5s_ease-out_0.1s_both]">
            {infoCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-metro-md bg-metro-surface-element rounded-metro-card p-metro-lg">
                <div className="w-10 h-10 rounded-full bg-metro-surface text-metro-foreground flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <span className="text-metro-sm font-semibold text-metro-foreground">{title}</span>
                  <span className="text-metro-xs text-metro-foreground-muted">{desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Offer Banner */}
          <div className="bg-metro-primary rounded-metro-card p-metro-2xl flex items-center justify-between animate-[fadeUp_0.5s_ease-out_0.2s_both]">
            <div className="flex flex-col gap-metro-xs">
              <span className="text-metro-xs font-semibold text-metro-primary-foreground/60 uppercase tracking-wider">
                Your indicative offer
              </span>
              <span className="text-metro-3xl font-metro-display font-light text-metro-primary-foreground">
                Up to £60,000
              </span>
              <span className="text-metro-xs text-metro-primary-foreground/70 mt-metro-xs">
                Based on soft pre-assessment · Subject to full credit check · 7.6% APR fixed
              </span>
              <div className="flex items-center gap-metro-xs mt-metro-sm">
                <InfoIcon className="w-3.5 h-3.5 text-metro-primary-foreground/40" />
                <span className="text-metro-xs text-metro-primary-foreground/40">
                  No commitment · Soft check only · No impact on your credit file
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 shrink-0 pl-metro-2xl">
              <span className="text-metro-xs text-metro-primary-foreground/60">Est. monthly from</span>
              <span className="text-metro-xl font-semibold text-metro-primary-foreground">£1,090.33</span>
              <span className="text-metro-xs text-metro-primary-foreground/60">over 36 months</span>
            </div>
          </div>

          {/* How it works */}
          <div className="flex flex-col gap-metro-lg animate-[fadeUp_0.5s_ease-out_0.3s_both]">
            <div className="flex items-center justify-between">
              <h2 className="text-metro-lg font-semibold text-metro-foreground">How it works</h2>
              <span className="text-metro-xs font-semibold text-metro-primary bg-metro-primary/5 px-metro-md py-metro-xs rounded-full">
                Takes about 4 min.
              </span>
            </div>
            <div className="flex flex-col gap-metro-lg">
              {steps.map(({ title, desc }, i) => (
                <div key={title} className="flex items-start gap-metro-md">
                  <div className="w-8 h-8 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-metro-xs font-semibold text-metro-foreground">{i + 1}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-metro-sm font-semibold text-metro-foreground">{title}</span>
                    <span className="text-metro-sm text-metro-foreground-muted">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-metro-md pt-metro-sm animate-[fadeUp_0.5s_ease-out_0.4s_both]">
            <button className="flex items-center justify-center gap-metro-sm px-metro-3xl py-metro-md bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer border-none hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
              Get your personalised quote
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="text-metro-sm text-metro-foreground-muted underline hover:text-metro-foreground transition-colors cursor-pointer bg-transparent border-none">
              Not now, remind me later
            </button>
            <div className="flex items-center gap-metro-xs">
              <InfoIcon className="w-3.5 h-3.5 text-metro-foreground-muted/40" />
              <span className="text-metro-xs text-metro-foreground-muted/60">
                No commitment at this stage · Soft check only · No impact on credit file
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
