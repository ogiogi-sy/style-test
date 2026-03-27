import { useState } from 'react'
import { Button } from '@base-ui/react/button'
import { ScreenHeader } from './shared/ScreenHeader'
import {
  CheckIcon,
  ReceiptIcon,
  UserIcon,
  SparklesIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  HomeIcon,
} from './shared/Icons'

const categories = [
  { id: 'general', label: 'General', icon: ReceiptIcon },
  { id: 'friends', label: 'Friends and family', icon: UserIcon },
  { id: 'services', label: 'Services', icon: SparklesIcon },
  { id: 'business', label: 'Business', icon: BriefcaseIcon },
  { id: 'savings', label: 'Savings', icon: ShieldCheckIcon },
  { id: 'rent', label: 'Rent', icon: HomeIcon },
]

export function PaymentConfirmedScreen() {
  const [selected, setSelected] = useState('business')

  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader showBack={false} />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto">
        {/* Success icon — outer ring + inner circle + check */}
        <div className="flex justify-center mt-metro-xl mb-metro-md">
          <div className="success-ring w-24 h-24 rounded-full border border-emerald-200 flex items-center justify-center">
            <div className="success-circle w-[72px] h-[72px] rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckIcon className="success-check w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>

        <style>{`
          .success-ring {
            animation: ringPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
          }
          .success-circle {
            animation: circlePop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
          }
          .success-check {
            animation: checkDraw 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
          }
          @keyframes ringPop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes circlePop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes checkDraw {
            0% { transform: scale(0) rotate(-45deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(0deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>

        {/* Title + subtitle */}
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground text-center mb-metro-xs">
          Payment confirmed
        </h2>
        <p className="text-metro-sm text-metro-foreground-muted text-center mb-metro-lg">
          Your payment is on its way
        </p>

        {/* Category label */}
        <p className="text-metro-sm font-medium text-metro-foreground mb-metro-md">
          Choose a category
        </p>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-metro-md">
          {categories.map((cat) => {
            const isSelected = selected === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`flex flex-col items-center gap-metro-sm p-metro-lg rounded-metro-card border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-metro-primary-soft border-metro-primary'
                    : 'bg-white border-metro-border'
                }`}
              >
                <cat.icon className="w-6 h-6 text-metro-primary" />
                <span className="text-metro-xs font-medium text-metro-foreground">
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fixed bottom buttons */}
      <div className="px-metro-lg py-metro-lg bg-metro-surface flex flex-col gap-metro-md">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Finish
        </Button>
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 border border-metro-primary text-metro-primary bg-white rounded-metro-button text-metro-sm font-medium cursor-pointer hover:bg-metro-primary-soft active:bg-metro-primary-soft transition-colors">
          Make another payment
        </Button>
      </div>
    </div>
  )
}
