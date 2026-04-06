import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { NavbarCmdK } from './components/NavbarCmdK'
import { CustomerHeader } from './components/CustomerHeader'
import { AlertBanner } from './components/AlertBanner'
import { StatCard } from './components/StatCard'
import { FeeInsights } from './components/FeeInsights'
import { FanDetailsPanel } from './components/FanDetailsPanel'
import { GrowthOpportunities } from './components/GrowthOpportunities'
import { AccountOpsTable } from './components/AccountOpsTable'
import {
  DollarIcon,
  BriefcaseIcon,
  ShieldIcon,
  ClockIcon,
  ChartIcon,
} from '../shared/Icons'
import { customerInfo, alertBanners, kpiCards, fanSidebarNavGroups } from './data/fanOverviewData'
import type { ReactNode } from 'react'

const kpiIconMap: Record<string, ReactNode> = {
  dollar: <DollarIcon className="w-5 h-5" />,
  briefcase: <BriefcaseIcon className="w-5 h-5" />,
  shield: <ShieldIcon className="w-5 h-5" />,
  clock: <ClockIcon className="w-5 h-5" />,
  chart: <ChartIcon className="w-5 h-5" />,
}

export function WebFanOverviewCmdKScreen() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set())

  const handleDismiss = (index: number) => {
    setDismissedAlerts((prev) => new Set(prev).add(index))
  }

  return (
    <div className="flex h-full bg-metro-surface font-metro-body">
      <Sidebar
        navGroups={fanSidebarNavGroups}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-metro-lg pb-metro-lg">
          <NavbarCmdK onMenuToggle={() => setMobileOpen(true)} />

          <div className="flex flex-col gap-metro-lg">
            <CustomerHeader customer={customerInfo} />

            {alertBanners.map((alert, i) =>
              !dismissedAlerts.has(i) ? (
                <AlertBanner
                  key={i}
                  variant={alert.variant}
                  title={alert.title}
                  description={alert.description}
                  action={alert.action}
                  onDismiss={() => handleDismiss(i)}
                />
              ) : null
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-metro-md">
              {kpiCards.map((card) => (
                <StatCard
                  key={card.label}
                  icon={kpiIconMap[card.icon]}
                  label={card.label}
                  value={card.value}
                  trend={card.trend}
                  subtitle={card.subtitle}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-metro-lg">
              <div className="flex flex-col gap-metro-xl">
                <FeeInsights />
                <GrowthOpportunities />
              </div>
              <FanDetailsPanel />
            </div>

            <AccountOpsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
