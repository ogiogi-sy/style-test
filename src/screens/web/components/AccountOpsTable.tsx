import { accountOps } from '../data/fanOverviewData'

const accessLevelTagStyles = {
  'Full Access': 'bg-metro-primary-soft text-metro-primary',
  'View Only': 'bg-metro-surface-element text-metro-foreground-muted',
  'Payments': 'bg-metro-warning-soft text-metro-amber-800',
}

export function AccountOpsTable() {
  return (
    <section className="flex flex-col gap-metro-md">
      <h2 className="text-metro-lg font-metro-display font-semibold text-metro-foreground">
        Account Operations
      </h2>
      <div className="border border-metro-border rounded-metro-card overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-metro-border">
              <th className="py-metro-md pl-metro-lg pr-metro-md text-metro-xs font-semibold uppercase text-metro-foreground tracking-wider">Name</th>
              <th className="py-metro-md px-metro-md text-metro-xs font-semibold uppercase text-metro-foreground tracking-wider">Role</th>
              <th className="py-metro-md px-metro-md text-metro-xs font-semibold uppercase text-metro-foreground tracking-wider">Email</th>
              <th className="py-metro-md px-metro-md text-metro-xs font-semibold uppercase text-metro-foreground tracking-wider">Phone</th>
              <th className="py-metro-md pl-metro-md pr-metro-lg text-metro-xs font-semibold uppercase text-metro-foreground tracking-wider text-right">Access Level</th>
            </tr>
          </thead>
          <tbody>
            {accountOps.map((row, i) => (
              <tr key={i} className="border-b border-metro-border last:border-b-0 hover:bg-metro-slate-50 transition-colors">
                <td className="pl-metro-lg pr-metro-md py-metro-md text-metro-sm text-metro-foreground">{row.name}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground-muted">{row.role}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground-muted">{row.email}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground-muted tabular-nums">{row.phone}</td>
                <td className="pl-metro-md pr-metro-lg py-metro-md text-right">
                  <span className={`inline-block text-metro-xs font-semibold px-2.5 py-0.5 rounded-metro-button ${accessLevelTagStyles[row.accessLevel]}`}>
                    {row.accessLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
