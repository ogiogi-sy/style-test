import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { ScreenHeader } from './shared/ScreenHeader'
import { CalendarIcon, ClockIcon } from './shared/Icons'

export function PaymentFormScreen() {
  const [reference, setReference] = useState('')

  function handleReferenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (/^[a-zA-Z0-9 ]*$/.test(val) && val.length <= 18) {
      setReference(val)
    }
  }

  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={33} />

      <div className="flex-1 px-metro-lg pb-[100px] overflow-y-auto">
        {/* Title + subtitle */}
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs mt-metro-lg">
          Payment details
        </h2>
        <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
          Paying <span className="font-semibold text-metro-foreground">Jane Smith</span>.
        </p>

        {/* Paying from */}
        <p className="text-metro-sm font-medium text-metro-foreground mb-metro-sm">
          Paying from
        </p>
        <div className="rounded-metro-card border border-metro-border bg-white p-metro-md flex items-center justify-between mb-metro-lg">
          <div>
            <p className="text-metro-sm font-medium text-metro-foreground">Current account</p>
            <p className="text-metro-xs text-metro-foreground-muted">
              ••7823 · Available £1,500.00
            </p>
          </div>
          <button className="text-metro-sm font-medium text-metro-primary cursor-pointer">
            Change
          </button>
        </div>

        {/* Amount */}
        <Field.Root>
          <Field.Label className="text-metro-sm font-medium text-metro-foreground mb-metro-sm block">
            Amount
          </Field.Label>
          <div className="bg-metro-surface-element rounded-metro-card p-metro-lg mb-metro-lg">
            <p className="text-[32px] font-metro-display font-semibold text-metro-foreground">
              £ 250<span className="text-metro-foreground-muted">.00</span>
            </p>
          </div>
        </Field.Root>

        {/* Reference */}
        <Field.Root>
          <Field.Label className="text-metro-xs text-metro-foreground-muted mb-metro-xs block">
            Reference (optional)
          </Field.Label>
          <Input
            value={reference}
            onChange={handleReferenceChange}
            placeholder="e.g. Invoice 1234"
            className="w-full px-metro-md py-metro-sm bg-metro-surface-element rounded-metro-input text-metro-sm text-metro-foreground outline-none border border-transparent focus:border-metro-primary transition-colors"
          />
        </Field.Root>

        {/* Date */}
        <Field.Root className="mt-metro-md">
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

        {/* Estimated arrival banner */}
        <div className="mt-metro-lg rounded-metro-card bg-metro-success-soft/40 p-metro-md">
          <div className="flex gap-metro-sm">
            <ClockIcon className="w-5 h-5 text-metro-success shrink-0 mt-0.5" />
            <div>
              <p className="text-metro-sm text-metro-success">
                Typically received within two hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="px-metro-lg py-metro-lg bg-metro-surface">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Continue
        </Button>
      </div>
    </div>
  )
}
