import { Button } from '@base-ui/react/button'
import { ScreenHeader } from './shared/ScreenHeader'
import { InfoIcon, CheckIcon, CreditCardIcon } from './shared/Icons'
import cardBg from '../assets/card bg.png'

const addons = [
  { name: 'Merchant services', price: '£7/mo' },
  { name: 'Automate accounting', price: '£7/mo' },
]

const agreements = [
  'I agree to the Terms & Conditions',
  'I consent to recurring monthly billing',
  'I can cancel anytime with no exit fees',
]

function PlanCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[18px]"
      style={{
        boxShadow: 'none',
      }}
    >
      {/* Card background layers matching Figma blend modes */}
      <div className="absolute inset-0 rounded-[18px]" style={{ background: '#fff' }} />
      <div className="absolute inset-0 rounded-[18px]" style={{ background: 'linear-gradient(114deg, rgba(0,0,0,0.05) 2.64%, rgba(255,255,255,0.05) 38.59%, rgba(255,255,255,0.05) 62.02%, rgba(0,0,0,0.05) 96.13%)', mixBlendMode: 'multiply' }} />
      <img src={cardBg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[18px]" style={{ mixBlendMode: 'color' }} />
      <img src={cardBg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[18px] opacity-30" style={{ mixBlendMode: 'luminosity' }} />
      <div className="absolute inset-0 rounded-[18px] bg-black/[0.03]" />
      {/* Content */}
      <div className="relative flex flex-col">
        <div className="flex items-start justify-between p-5">
          <p className="text-metro-2xl font-metro-display font-light text-metro-foreground">
            Start
          </p>
          <CreditCardIcon className="w-6 h-6 text-metro-foreground-muted" />
        </div>
        <div className="flex items-baseline gap-metro-sm px-6 py-2">
          <p className="text-[32px] font-metro-display font-semibold text-metro-foreground">£9</p>
          <p className="text-metro-sm text-metro-foreground-muted">/month</p>
        </div>
        <div className="flex justify-end p-5">
          <p className="font-metro-display font-medium text-metro-lg text-metro-foreground-muted">
            Everyday
          </p>
        </div>
      </div>
    </div>
  )
}

export function ReviewConfirmScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader
        progress={97}
        rightIcon={<InfoIcon className="w-5 h-5 text-metro-foreground" />}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Title */}
        <div className="px-metro-lg pt-metro-lg pb-metro-md">
          <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground">
            Review &amp; confirm
          </h1>
        </div>

        {/* Cards */}
        <div className="px-metro-lg flex flex-col gap-metro-lg pb-metro-lg">
          {/* Plan card */}
          <PlanCard />

          {/* Add-ons card */}
          <div className="border border-metro-border rounded-metro-card p-metro-md shadow-metro-sm">
            <p className="text-metro-sm text-metro-foreground-muted mb-metro-sm">Add-ons:</p>
            <div className="flex flex-col gap-metro-sm">
              {addons.map((addon) => (
                <div key={addon.name} className="flex items-center justify-between">
                  <p className="text-metro-base text-metro-foreground">{addon.name}</p>
                  <p className="text-metro-base font-medium text-metro-foreground">{addon.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total card */}
          <div className="border border-metro-border rounded-metro-card p-metro-md shadow-metro-sm">
            <div className="flex items-center justify-between">
              <p className="text-metro-base font-medium text-metro-foreground">Total</p>
              <p className="text-metro-base font-medium text-metro-foreground">£23/mo</p>
            </div>
          </div>

          {/* Agreements card */}
          <div className="border border-metro-border rounded-metro-card p-metro-md shadow-metro-sm flex flex-col gap-metro-md">
            {agreements.map((text) => (
              <div key={text} className="flex items-start gap-metro-sm">
                <div className="w-5 h-5 rounded bg-metro-primary flex items-center justify-center shrink-0 shadow-metro-sm">
                  <CheckIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-metro-sm text-metro-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-metro-lg pt-metro-md pb-metro-xl bg-metro-surface">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Place Order £23
        </Button>
      </div>
    </div>
  )
}
