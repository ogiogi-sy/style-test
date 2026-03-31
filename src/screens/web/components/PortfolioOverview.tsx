import { StatCard } from './StatCard'
import { portfolioStats } from '../data/mockData'
import { WalletIcon, PiggyBankIcon, UsersGroupIcon, CalendarIcon } from '../../shared/Icons'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  wallet: <WalletIcon className="w-5 h-5" />,
  piggyBank: <PiggyBankIcon className="w-5 h-5" />,
  users: <UsersGroupIcon className="w-5 h-5" />,
  calendar: <CalendarIcon className="w-5 h-5" />,
}

export function PortfolioOverview() {
  return (
    <section className="flex flex-col gap-metro-md">
      <div>
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">Portfolio Overview</h2>
        <p className="text-metro-sm text-metro-foreground-muted">Monitor your client relationships and portfolio income generation</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-metro-md">
        {portfolioStats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={iconMap[stat.icon]}
            label={stat.label}
            value={stat.value}
            trend={'trend' in stat ? stat.trend : undefined}
            trendLabel={'trendLabel' in stat ? stat.trendLabel : undefined}
          />
        ))}
      </div>
    </section>
  )
}
