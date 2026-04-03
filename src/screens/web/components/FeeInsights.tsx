import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendUpIcon } from '../../shared/Icons'
import { feeInsights, feeBreakdown, feeTrendData } from '../data/fanOverviewData'

export function FeeInsights() {
  return (
    <section className="flex flex-col gap-metro-md">
      <h2 className="text-metro-lg font-metro-display font-semibold text-metro-foreground">
        Other Income & Fees (OI&F) Insights
      </h2>

      <div className="border border-metro-border rounded-metro-card p-metro-lg flex flex-col gap-metro-lg bg-metro-surface">
        {/* YTD Summary */}
        <div className="flex flex-col gap-metro-xs">
          <span className="text-metro-xs text-metro-foreground-muted">YTD Total</span>
          <div className="flex items-baseline gap-metro-sm">
            <span className="text-metro-2xl font-metro-display font-light text-metro-foreground tabular-nums">
              {feeInsights.ytdTotal}
            </span>
            <span className="text-metro-xs text-metro-foreground-muted">
              vs. {feeInsights.priorYear} Prior Year
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-metro-green-800 text-metro-xs w-fit bg-metro-success-soft px-2 py-0.5 rounded-metro-button">
            <TrendUpIcon className="w-3.5 h-3.5" />
            {feeInsights.growth} Growth
          </span>
        </div>

        {/* Two column: Fee Breakdown + Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-metro-xl">
          {/* Fee Breakdown */}
          <div className="flex flex-col gap-metro-md">
            <div className="flex items-baseline justify-between">
              <span className="text-metro-sm font-semibold text-metro-foreground">Fee Breakdown</span>
              <span className="text-metro-xs text-metro-foreground-muted">Quarterly report overview</span>
            </div>
            <div className="flex flex-col gap-metro-lg">
              {feeBreakdown.map((item) => (
                <div key={item.label} className="flex flex-col gap-metro-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-metro-sm text-metro-foreground">{item.label}</span>
                    <span className="text-metro-sm font-semibold text-metro-foreground tabular-nums">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-metro-surface-element rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Month Fee Trend */}
          <div className="flex flex-col gap-metro-md">
            <div className="flex items-baseline justify-between">
              <span className="text-metro-sm font-semibold text-metro-foreground">6-Month Fee Trend</span>
              <span className="text-metro-xs text-metro-foreground-muted">Monthly report overview</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={feeTrendData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-metro-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-metro-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-metro-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: 'var(--color-metro-foreground-muted)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: 'var(--color-metro-foreground-muted)' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `\u00a3${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-metro-surface)',
                      border: '1px solid var(--color-metro-border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={((value: any) => [`\u00a3${value}`, 'Fee Income']) as any}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-metro-primary)"
                    strokeWidth={2}
                    fill="url(#feeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
