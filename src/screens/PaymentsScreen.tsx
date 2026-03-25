import { Button } from '@base-ui/react/button'
import { Input } from '@base-ui/react/input'
import { Separator } from '@base-ui/react/separator'
import { ScreenHeader } from './shared/ScreenHeader'
import { PlusIcon, SearchIcon, ShieldCheckIcon, WarningIcon, SortAZIcon, ChevronRightIcon } from './shared/Icons'

const payees = [
  { initials: 'AC', name: 'Acme Corp', sortCode: '20-30-40 · 12345678', status: 'verified' as const, bg: 'bg-violet-100', text: 'text-violet-600' },
  { initials: 'BW', name: 'Bob Williams', sortCode: '10-20-30 · 87654321', status: 'verified' as const, bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { initials: 'CL', name: 'City Landlords', sortCode: '40-50-60 · 11223344', status: 'recheck' as const, bg: 'bg-amber-100', text: 'text-amber-600' },
  { initials: 'DP', name: 'Digital Press Ltd', sortCode: '30-40-50 · 55667788', status: 'verified' as const, bg: 'bg-sky-100', text: 'text-sky-600' },
  { initials: 'EK', name: 'Emma Knight', sortCode: '20-10-40 · 99887766', status: 'verified' as const, bg: 'bg-rose-100', text: 'text-rose-600' },
]

export function PaymentsScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto">
        <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs mt-metro-lg">
          Who are you paying?
        </h1>
        <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
          Pick someone you've paid before, or add a new payee
        </p>

        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-metro-sm border border-metro-primary text-metro-primary bg-white rounded-metro-button text-metro-sm font-medium cursor-pointer hover:bg-metro-primary-soft active:bg-metro-primary-soft transition-colors mb-metro-xl">
          <PlusIcon className="w-4 h-4" />
          Pay someone new
        </Button>

        <div className="flex items-center gap-metro-sm mb-metro-lg">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-metro-foreground-muted" />
            <Input
              placeholder="Search payees"
              className="w-full pl-9 pr-metro-md py-metro-sm border border-metro-border rounded-metro-input text-metro-sm text-metro-foreground bg-white outline-none focus:border-metro-primary transition-colors"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-metro-surface-element text-metro-foreground-muted hover:bg-metro-border transition-colors cursor-pointer border-none">
            <SortAZIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white border border-metro-border rounded-metro-card p-metro-md">
          <div className="flex flex-col">
            {payees.map((payee, i) => (
            <div key={payee.name}>
              <div className="flex items-center gap-metro-md py-metro-md cursor-pointer px-metro-xs">
                <div className={`w-10 h-10 rounded-full ${payee.bg} ${payee.text} flex items-center justify-center text-metro-sm font-semibold shrink-0`}>
                  {payee.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-metro-sm font-medium text-metro-foreground truncate">{payee.name}</p>
                  <p className="text-metro-xs text-metro-foreground-muted truncate">{payee.sortCode}</p>
                </div>
                {payee.status === 'verified' ? (
                  <span className="inline-flex items-center gap-0.5 text-metro-success text-metro-xs shrink-0">
                    <ShieldCheckIcon className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-metro-amber-700 text-metro-xs font-medium shrink-0 whitespace-nowrap">
                    <WarningIcon className="w-3.5 h-3.5 shrink-0" />
                    Check details
                  </span>
                )}
                <ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted shrink-0" />
              </div>
              {i < payees.length - 1 && <Separator className="h-px bg-metro-border ml-14" />}
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
