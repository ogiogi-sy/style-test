import { Button } from '@base-ui/react/button'
import { EyeIcon, ExportIcon, ChevronRightIcon } from '../../shared/Icons'
import type { CustomerInfo } from '../data/fanOverviewData'
import { fanOverviewTabs } from '../data/fanOverviewData'

interface CustomerHeaderProps {
  customer: CustomerInfo
  activeTab?: string
}

export function CustomerHeader({ customer, activeTab = 'Overview' }: CustomerHeaderProps) {
  const badgeStyles = {
    success: 'bg-metro-success-soft text-metro-green-800',
    warning: 'bg-metro-warning-soft text-metro-amber-800',
  }

  return (
    <div className="flex flex-col gap-metro-sm">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-metro-xs text-metro-xs text-metro-foreground-muted">
        <span className="text-metro-primary cursor-pointer hover:underline">Fans</span>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-metro-foreground">{customer.name}</span>
      </nav>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-metro-sm">
        <div className="flex flex-col gap-metro-sm min-w-0">
          <div className="flex flex-wrap items-center gap-metro-sm">
            <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground m-0">
              {customer.name}
            </h1>
            <div className="flex items-center gap-metro-xs">
              {customer.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`${badgeStyles[badge.variant]} text-metro-xs font-semibold px-2 py-0.5 rounded-metro-button whitespace-nowrap`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-metro-sm text-metro-xs text-metro-foreground-muted">
            <span className="text-metro-foreground font-semibold">ID: {customer.id}</span>
            <span className="w-1 h-1 rounded-full bg-metro-border hidden sm:block" />
            <span>Customer Vintage: {customer.vintage}</span>
            <span className="w-1 h-1 rounded-full bg-metro-border hidden sm:block" />
            <span>Assigned RM: <span className="text-metro-foreground">{customer.assignedRm}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-metro-sm shrink-0">
          <Button className="inline-flex items-center gap-1.5 px-metro-md py-1.5 border border-metro-border rounded-metro-button text-metro-xs text-metro-foreground bg-metro-surface cursor-pointer hover:bg-metro-surface-element transition-colors whitespace-nowrap">
            <EyeIcon className="w-3.5 h-3.5" />
            View Audit
          </Button>
          <Button className="inline-flex items-center gap-1.5 px-metro-md py-1.5 border border-metro-border rounded-metro-button text-metro-xs text-metro-foreground bg-metro-surface cursor-pointer hover:bg-metro-surface-element transition-colors whitespace-nowrap">
            <ExportIcon className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Tab bar — horizontally scrollable */}
      <div className="overflow-x-auto -mx-metro-lg px-metro-lg mt-metro-xs">
        <div className="flex items-center border-b border-metro-border min-w-max">
          {fanOverviewTabs.map((tab) => (
            <button
              key={tab}
              className={`px-metro-md py-metro-sm text-metro-sm font-semibold border-b-2 cursor-pointer bg-transparent border-x-0 border-t-0 transition-colors whitespace-nowrap ${
                tab === activeTab
                  ? 'border-b-metro-primary text-metro-primary'
                  : 'border-b-transparent text-metro-foreground-muted hover:text-metro-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-metro-xs text-metro-primary font-semibold cursor-pointer hover:underline whitespace-nowrap pl-metro-lg">
            Relationship Engagement
          </span>
        </div>
      </div>
    </div>
  )
}
