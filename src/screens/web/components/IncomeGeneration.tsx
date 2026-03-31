import { StatCard } from './StatCard'
import { incomeStats } from '../data/mockData'
import { WalletIcon, CalculatorIcon, PiggyBankIcon } from '../../shared/Icons'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  wallet: <WalletIcon className="w-5 h-5" />,
  calculator: <CalculatorIcon className="w-5 h-5" />,
  piggyBank: <PiggyBankIcon className="w-5 h-5" />,
}

export function IncomeGeneration() {
  return (
    <section className="flex flex-col gap-metro-md">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">Portfolio Income Generation</h2>
          <p className="text-metro-sm text-metro-foreground-muted">Annual revenue from all income stream across your portfolios</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-metro-sm text-metro-foreground-muted">Total Annual Income</p>
          <p className="text-metro-2xl font-metro-display font-light text-metro-foreground tabular-nums">£21.09M</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-metro-md">
        {incomeStats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={iconMap[stat.icon]}
            label={stat.label}
            subtitle={stat.subtitle}
            value={stat.value}
            trend={stat.trend}
            variant="muted"
          />
        ))}
      </div>
    </section>
  )
}
