import { useEffect, useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Separator } from '@base-ui/react/separator'
import { ScreenHeader } from './shared/ScreenHeader'
import { CreditCardIcon, HomeIcon, ReceiptIcon, ArrowRightIcon, ChevronRightIcon, PlusIcon, UserIcon } from './shared/Icons'

const transactions = [
  { icon: <HomeIcon className="w-5 h-5" aria-hidden="true" />, name: 'Office Rent', date: '25 Mar', amount: '-£2,500.00', bg: 'bg-violet-100', text: 'text-violet-600' },
  { icon: <ReceiptIcon className="w-5 h-5" aria-hidden="true" />, name: 'AWS Services', date: '27 Mar', amount: '-£340.00', bg: 'bg-amber-100', text: 'text-amber-600' },
  { icon: <CreditCardIcon className="w-5 h-5" aria-hidden="true" />, name: 'Stripe Payout', date: '28 Mar', amount: '+£4,200.00', bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { icon: <ReceiptIcon className="w-5 h-5" aria-hidden="true" />, name: 'Insurance Ltd', date: '01 Apr', amount: '-£189.00', bg: 'bg-rose-100', text: 'text-rose-600' },
]

const quickActions = [
  {
    label: 'Send',
    icon: <ArrowRightIcon className="w-5 h-5" style={{ transform: 'rotate(-45deg)' }} aria-hidden="true" />,
    bg: 'bg-violet-100',
    text: 'text-violet-600',
  },
  {
    label: 'Request',
    icon: <ArrowRightIcon className="w-5 h-5" style={{ transform: 'rotate(135deg)' }} aria-hidden="true" />,
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
  {
    label: 'Top up',
    icon: <PlusIcon className="w-5 h-5" aria-hidden="true" />,
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
  {
    label: 'More',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <circle cx="4" cy="10" r="2" />
        <circle cx="10" cy="10" r="2" />
        <circle cx="16" cy="10" r="2" />
      </svg>
    ),
    bg: 'bg-slate-100',
    text: 'text-slate-600',
  },
]

function useCountUp(target: number, duration = 1200, delay = 300) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      function tick(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return value
}

export function YourAccountScreen() {
  const balance = useCountUp(1500, 1200, 300)
  const spending = useCountUp(3029, 1200, 500)
  const percent = useCountUp(61, 800, 500)

  return (
    <div className="relative flex flex-col h-full bg-metro-surface">
      <ScreenHeader showBack={false} />

      <main className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto">
        <div className="mt-metro-lg mb-metro-lg">
          <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs">Good afternoon, James</h1>
          <p className="text-metro-sm text-metro-foreground-muted">Current account •• 7823</p>
        </div>

        {/* Balance card + Quick actions combined */}
        <div className="rounded-metro-card overflow-hidden border border-metro-border mb-metro-lg">
          <div className="bg-gradient-to-br from-metro-primary to-metro-navy-200 p-metro-xl">
            <div className="flex items-center gap-1.5 mb-metro-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
              <p className="text-metro-xs text-white uppercase tracking-wider">Available balance</p>
            </div>
            <p className="text-[32px] font-metro-display font-semibold text-white" aria-label="One thousand five hundred pounds">
              £{balance.toLocaleString()}<span className="opacity-60" aria-hidden="true">.00</span>
            </p>
            <div className="flex items-center gap-metro-sm mt-metro-md">
              <span className="text-metro-xs text-white bg-white/20 px-3 py-1 rounded-full">
                Current •• 7823
              </span>
              <span className="text-metro-xs text-emerald-300 bg-emerald-400/20 px-3 py-1 rounded-full">
                +2.4% this month
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 bg-white" role="group" aria-label="Quick actions">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="bg-white p-metro-md flex flex-col items-center gap-metro-sm border-none cursor-pointer hover:bg-slate-50 transition-colors"
                aria-label={action.label}
              >
                <div className={`w-10 h-10 rounded-full ${action.bg} ${action.text} flex items-center justify-center`}>
                  {action.icon}
                </div>
                <span className="text-metro-xs text-metro-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Monthly spending */}
        <section className="mb-metro-lg" aria-label="Monthly spending">
          <h2 className="text-metro-sm font-medium text-metro-foreground mb-metro-md">
            Monthly spending
          </h2>
          <div className="bg-white border border-metro-border rounded-metro-card p-metro-lg">
            <div className="flex items-center gap-metro-lg">
              {/* Donut chart */}
              <div className="relative w-20 h-20 shrink-0" role="img" aria-label="61% of monthly budget spent: £3,029 of £5,000">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(var(--color-metro-accent) 0% ${percent}%, var(--color-metro-border) ${percent}% 100%)`,
                    transition: 'background 0.1s ease-out',
                  }}
                />
                <div className="absolute inset-[6px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-metro-sm font-semibold text-metro-foreground" aria-hidden="true">{percent}%</span>
                </div>
              </div>
              {/* Text column */}
              <div className="flex-1 min-w-0">
                <p className="text-metro-xs text-metro-foreground-muted uppercase tracking-wider mb-metro-xs">
                  Monthly spending
                </p>
                <p className="text-metro-xl font-semibold text-metro-foreground">£{spending.toLocaleString()}</p>
                <p className="text-metro-xs text-metro-foreground-muted mt-0.5">of £5,000 budget</p>
                <div className="flex items-center gap-metro-md mt-metro-sm">
                  <span className="flex items-center gap-1.5 text-metro-xs text-metro-foreground-muted">
                    <span className="w-2 h-2 rounded-full bg-metro-accent inline-block" aria-hidden="true" /> Spent
                  </span>
                  <span className="flex items-center gap-1.5 text-metro-xs text-metro-foreground-muted">
                    <span className="w-2 h-2 rounded-full bg-metro-border inline-block" aria-hidden="true" /> Remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming up transactions */}
        <section className="mb-metro-lg" aria-label="Coming up">
          <h2 className="text-metro-sm font-medium text-metro-foreground mb-metro-md">
            Coming up
          </h2>
          <div className="bg-white border border-metro-border rounded-metro-card p-metro-md">
            <ul className="flex flex-col list-none m-0 p-0">
              {transactions.map((tx, i) => (
                <li key={tx.name}>
                  <div className="flex items-center gap-metro-md py-metro-md">
                    <div className={`w-10 h-10 rounded-full ${tx.bg} ${tx.text} flex items-center justify-center shrink-0`} aria-hidden="true">
                      {tx.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-metro-sm font-medium text-metro-foreground">{tx.name}</p>
                      <p className="text-metro-xs text-metro-foreground-muted">{tx.date}</p>
                    </div>
                    <span className={`text-metro-sm font-medium ${
                      tx.amount.startsWith('+') ? 'text-metro-success' : 'text-metro-foreground'
                    }`}>
                      {tx.amount}
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted shrink-0" aria-hidden="true" />
                  </div>
                  {i < transactions.length - 1 && <Separator className="h-px bg-metro-border ml-14" />}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div>
          <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
            Make a payment
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Spacer for floating nav */}
        <div className="h-20" />
      </main>

      {/* Floating bottom navigation */}
      <nav className="absolute bottom-3 left-2 right-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[28px] shadow-metro-lg px-2 py-1.5" aria-label="Main navigation">
        <div className="grid grid-cols-4">
          <button className="flex flex-col items-center gap-1 py-2 text-metro-primary cursor-pointer bg-transparent border-none rounded-xl" aria-current="page">
            <HomeIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px] font-medium">Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 text-metro-foreground-muted cursor-pointer bg-transparent border-none rounded-xl hover:text-metro-foreground transition-colors">
            <ReceiptIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px]">Payments</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 text-metro-foreground-muted cursor-pointer bg-transparent border-none rounded-xl hover:text-metro-foreground transition-colors">
            <CreditCardIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px]">Cards</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 text-metro-foreground-muted cursor-pointer bg-transparent border-none rounded-xl hover:text-metro-foreground transition-colors">
            <UserIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px]">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
