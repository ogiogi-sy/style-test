import { Button } from '@base-ui/react/button'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { Separator } from '@base-ui/react/separator'
import { ScreenHeader } from './shared/ScreenHeader'
import {
  ArrowRightIcon,
  CreditCardIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CalendarIcon,
} from './shared/Icons'


export function PaymentDetailsScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto">
        {/* Title */}
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-lg">
          Payment details
        </h2>

        {/* Amount card */}
        <div className="bg-metro-surface-element rounded-metro-card p-metro-lg mb-metro-lg text-center">
          <p className="text-metro-xs text-metro-foreground-muted mb-metro-xs">Amount</p>
          <p className="text-[32px] font-metro-display font-semibold text-metro-foreground">
            £100<span className="text-metro-foreground-muted">.00</span>
          </p>
        </div>

        {/* Paying from → To connected card */}
        <div className="rounded-metro-card border border-metro-border bg-white mb-metro-lg overflow-hidden">
          {/* Paying from */}
          <div className="p-metro-md pb-metro-lg">
            <p className="text-metro-xs text-metro-foreground-muted mb-metro-sm">Paying from</p>
            <div className="flex items-center gap-metro-md">
              <div className="w-10 h-10 rounded-full bg-metro-primary-soft text-metro-primary flex items-center justify-center shrink-0">
                <CreditCardIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-metro-sm font-medium text-metro-foreground">Business account</p>
                <p className="text-metro-xs text-metro-foreground-muted">£15,000.00 · 04-00-04 12345678</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted shrink-0" />
            </div>
          </div>

          {/* Divider with arrow */}
          <div className="relative">
            <Separator className="h-px bg-metro-border" />
            <div className="absolute left-8 -translate-y-1/2 w-6 h-6 rounded-full bg-metro-surface-element border border-metro-border flex items-center justify-center">
              <ChevronDownIcon className="w-3.5 h-3.5 text-metro-foreground-muted" />
            </div>
          </div>

          {/* To */}
          <div className="p-metro-md">
            <p className="text-metro-xs text-metro-foreground-muted mb-metro-sm">To</p>
            <div className="flex items-center gap-metro-md">
              <div className="w-10 h-10 rounded-full bg-metro-primary/10 text-metro-primary flex items-center justify-center text-metro-sm font-semibold shrink-0">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-metro-sm font-medium text-metro-foreground">Acme Supplies Ltd</p>
                <p className="text-metro-xs text-metro-foreground-muted">20-00-00 98765432</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted shrink-0" />
            </div>
          </div>
        </div>

        {/* Reference + Date fields */}
        <div className="flex flex-col gap-metro-md mb-metro-lg">
          <Field.Root>
            <Field.Label className="text-metro-xs text-metro-foreground-muted mb-metro-xs block">
              Reference (optional)
            </Field.Label>
            <Input
              placeholder="e.g. Invoice 1234"
              className="w-full px-metro-md py-metro-sm bg-metro-surface-element rounded-metro-input text-metro-sm text-metro-foreground outline-none border border-transparent focus:border-metro-primary transition-colors"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label className="text-metro-xs text-metro-foreground-muted mb-metro-xs block">
              Date
            </Field.Label>
            <div className="relative">
              <Input
                defaultValue="25 Mar 2026"
                readOnly
                className="w-full px-metro-md py-metro-sm bg-metro-surface-element rounded-metro-input text-metro-sm text-metro-foreground outline-none border border-transparent focus:border-metro-primary transition-colors cursor-pointer"
              />
              <CalendarIcon className="w-4 h-4 text-metro-foreground-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </Field.Root>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="px-metro-lg py-metro-lg bg-metro-surface">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Review payment
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
