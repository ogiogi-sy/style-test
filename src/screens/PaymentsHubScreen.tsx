import { ScreenHeader } from './shared/ScreenHeader'
import { PersonCard } from './shared/PersonCard'
import {
  UserIcon,
  CreditCardIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  GlobeIcon,
} from './shared/Icons'

const actions = [
  {
    icon: UserIcon,
    label: 'Pay someone',
    subtitle: 'By bank transfer or link',
    bg: 'bg-violet-100',
    text: 'text-violet-600',
  },
  {
    icon: CreditCardIcon,
    label: 'Move money',
    subtitle: 'Move between your accounts',
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
  {
    icon: GlobeIcon,
    label: 'Pay international',
    subtitle: 'By bank transfer or link',
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
]

export function PaymentsHubScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto">
        {/* Title row */}
        <div className="flex items-center justify-between mb-metro-lg">
          <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">
            Payments
          </h2>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-metro-surface-element rounded-metro-button text-metro-sm font-medium text-metro-foreground cursor-pointer">
            Business account
            <ChevronDownIcon className="w-4 h-4 text-metro-foreground-muted" />
          </button>
        </div>

        {/* Segmented tab bar */}
        <div className="flex bg-metro-surface-element rounded-metro-button p-0.5 mb-metro-xl">
          <button className="flex-1 py-2 text-metro-sm font-medium text-metro-foreground bg-white rounded-metro-button shadow-metro-sm cursor-pointer">
            Payments
          </button>
          <button className="flex-1 py-2 text-metro-sm font-medium text-metro-foreground-muted bg-transparent rounded-metro-button cursor-pointer">
            Scheduled
          </button>
        </div>

        {/* Action cards */}
        <div className="flex flex-col gap-metro-md">
          {actions.map((action) => (
            <PersonCard
              key={action.label}
              compact
              initials={<action.icon className="w-5 h-5" />}
              name={action.label}
              subtitle={action.subtitle}
              bg={action.bg}
              text={action.text}
              actions={<ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted" />}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
