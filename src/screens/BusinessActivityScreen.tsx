import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { Checkbox } from '@base-ui/react/checkbox'
import { ScreenHeader } from './shared/ScreenHeader'
import { ArrowRightIcon, CheckIcon, SparklesIcon } from './shared/Icons'

const paymentTypes = [
  { id: 'bacs', label: 'BACS payments', description: 'Send and receive payments directly' },
  { id: 'faster', label: 'Faster Payments', description: 'Same-day transfers within the UK' },
  { id: 'chaps', label: 'CHAPS', description: 'Large payments that arrive the same day' },
  { id: 'dd', label: 'Direct Debits', description: 'Collect regular payments from customers' },
  { id: 'intl', label: 'International payments', description: 'Send money abroad' },
  { id: 'cards', label: 'Card payments', description: 'Accept Visa and Mastercard' },
]

export function BusinessActivityScreen() {
  const [checked, setChecked] = useState<string[]>(['bacs', 'faster', 'chaps', 'dd'])

  const toggle = (id: string) => {
    setChecked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={80} />
      <div className="flex-1 px-metro-lg pb-[100px] overflow-y-auto">
        <div className="flex items-center justify-between mt-metro-lg mb-metro-lg">
          <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-xs">
            How will you get paid?
          </h2>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-metro-primary-soft text-metro-primary text-metro-xs font-medium rounded-full">
            <SparklesIcon className="w-3.5 h-3.5" />
            Prefilled
          </span>
        </div>

        <p className="text-metro-sm text-metro-foreground-muted mb-metro-lg">
          We've picked the most common ones for your industry. Add or remove any that don't fit.
        </p>

        <div className="flex flex-col gap-metro-md mb-metro-2xl">
          {paymentTypes.map(type => {
            const isChecked = checked.includes(type.id)
            return (
              <label
                key={type.id}
                className={`flex items-center gap-metro-md p-metro-md rounded-metro-card cursor-pointer transition-colors border ${
                  isChecked
                    ? 'bg-metro-primary-soft border-metro-primary'
                    : 'bg-white border-metro-border'
                }`}
              >
                <Checkbox.Root
                  checked={isChecked}
                  onCheckedChange={() => toggle(type.id)}
                  className="w-5 h-5 rounded-[4px] border-2 border-metro-slate-400 data-[checked]:bg-metro-primary data-[checked]:border-metro-primary flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <Checkbox.Indicator className="text-white">
                    <CheckIcon className="w-3 h-3" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <div className="flex-1 min-w-0">
                  <p className="text-metro-sm font-medium text-metro-foreground">{type.label}</p>
                  <p className="text-metro-xs text-metro-foreground-muted">{type.description}</p>
                </div>
              </label>
            )
          })}
        </div>

      </div>

      <div className="px-metro-lg py-metro-lg bg-metro-surface">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Next
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
