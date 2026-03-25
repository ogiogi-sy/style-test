import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { Separator } from '@base-ui/react/separator'
import { ScreenHeader } from './shared/ScreenHeader'
import { CheckCircleIcon } from './shared/Icons'

const payeeDetails = [
  { label: 'Payee', value: 'Jane Smith', extra: 'Individual' },
  { label: 'Type', value: 'Individual' },
  { label: 'Sort code', value: '12-34-56' },
  { label: 'Account number', value: '12345678' },
]

export function PayeeDetailsScreen() {
  const [reference, setReference] = useState('')

  function handleReferenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (/^[a-zA-Z0-9 ]*$/.test(val) && val.length <= 18) {
      setReference(val)
    }
  }

  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader />

      <div className="flex-1 px-metro-lg pb-[140px] overflow-y-auto">
        {/* Title + subtitle */}
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs">
          Payee details
        </h2>
        <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
          Check the details below. Only the reference can be changed.
        </p>

        {/* Details card */}
        <div className="rounded-metro-card border border-metro-border bg-white overflow-hidden mb-metro-lg">
          {payeeDetails.map((row, i) => (
            <div key={row.label}>
              <div className="flex items-start justify-between p-metro-md">
                <span className="text-metro-sm text-metro-foreground-muted">
                  {row.label}
                </span>
                <div className="text-right">
                  <span className="text-metro-sm font-medium text-metro-foreground">
                    {row.value}
                  </span>
                  {row.extra && (
                    <p className="text-metro-xs text-metro-foreground-muted mt-0.5">
                      {row.extra}{' '}
                      <span className="text-metro-success inline-flex items-center gap-0.5">
                        · <CheckCircleIcon className="w-3.5 h-3.5 inline" /> Verified
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {i < payeeDetails.length - 1 && (
                <Separator className="h-px bg-metro-border" />
              )}
            </div>
          ))}
        </div>

        {/* Reference input */}
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

      </div>

      {/* Fixed bottom buttons */}
      <div className="px-metro-lg py-metro-lg bg-metro-surface flex flex-col gap-metro-md">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Continue
        </Button>
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 border border-metro-primary text-metro-primary bg-white rounded-metro-button text-metro-sm font-medium cursor-pointer hover:bg-metro-primary-soft active:bg-metro-primary-soft transition-colors">
          Change payee
        </Button>
      </div>
    </div>
  )
}
