import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Button } from '@base-ui/react/button'
import { FileTextIcon, CreditCardIcon, ShieldIcon, ArrowRightIcon } from '../../shared/Icons'
import { loanSummary, opportunities } from '../data/fanOverviewData'
import type { ReactNode } from 'react'

const oppIconMap: Record<string, ReactNode> = {
  fileText: <FileTextIcon className="w-4 h-4" />,
  creditCard: <CreditCardIcon className="w-4 h-4" />,
  shield: <ShieldIcon className="w-4 h-4" />,
}

export function GrowthOpportunities() {
  const donutData = [
    { name: 'Used', value: loanSummary.utilization },
    { name: 'Remaining', value: 100 - loanSummary.utilization },
  ]

  return (
    <section className="flex flex-col gap-metro-md">
      <h2 className="text-metro-lg font-metro-display font-semibold text-metro-foreground">
        Growth & Opportunities
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-metro-md">
        {/* Loan Summary Card */}
        <div className="border border-metro-border rounded-metro-card p-metro-xl bg-metro-surface flex flex-col gap-metro-lg">
          <div className="flex items-center gap-metro-xl">
            <div className="flex flex-col gap-metro-xs flex-1">
              <span className="text-metro-3xl font-metro-display font-light text-metro-foreground">{loanSummary.amount}</span>
              <span className="text-metro-sm text-metro-foreground-muted">{loanSummary.type}</span>
            </div>
            <div className="w-[120px] h-[120px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="var(--color-metro-primary)" />
                    <Cell fill="var(--color-metro-surface-element)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-metro-sm font-semibold text-metro-foreground">{loanSummary.utilization}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-metro-xs text-metro-foreground-muted border-t border-metro-border pt-metro-md">
            <div className="flex flex-col gap-0.5">
              <span>Status:</span>
              <span className="text-metro-info font-semibold">{loanSummary.status}</span>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span>Est. Close:</span>
              <span className="text-metro-foreground font-semibold">{loanSummary.estClose}</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border border-metro-border rounded-metro-card bg-metro-surface overflow-hidden">
          {opportunities.map((opp, i) => (
            <div key={i} className={`flex items-center gap-metro-md px-metro-lg py-metro-md ${i < opportunities.length - 1 ? 'border-b border-metro-border' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-metro-surface-element flex items-center justify-center shrink-0 text-metro-foreground-muted">
                {oppIconMap[opp.icon] || <ArrowRightIcon className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-metro-sm font-semibold text-metro-foreground m-0">{opp.title}</p>
                <p className="text-metro-xs text-metro-foreground-muted m-0">{opp.description}</p>
              </div>
              <Button className="shrink-0 px-metro-md py-1.5 border border-metro-primary text-metro-primary bg-metro-surface text-metro-xs font-semibold rounded-metro-button cursor-pointer hover:bg-metro-primary-soft transition-colors">
                Start Application
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
