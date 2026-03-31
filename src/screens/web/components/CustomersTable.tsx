import { useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { Input } from '@base-ui/react/input'
import { Button } from '@base-ui/react/button'
import { FilterIcon, SearchIcon, ChevronUpDownIcon } from '../../shared/Icons'
import { customerTabs, tableColumns, customers } from '../data/mockData'

const avatarColors: Record<string, string> = {
  'Sarah Mitchell': 'bg-[#c7b9da]',
  'James Chen': 'bg-metro-primary',
  'Priya Kapoor': 'bg-[#4db6ac]',
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('')
}

function CustomerTableContent() {
  const [activePage, setActivePage] = useState(3)
  const totalPages = 4
  const totalEntries = 26

  return (
    <div className="border border-metro-border rounded-metro-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-metro-border">
              {tableColumns.map((col, i) => (
                <th
                  key={col.key}
                  className={`py-metro-md text-metro-xs font-medium uppercase text-metro-foreground tracking-wider whitespace-nowrap ${
                    i === 0 ? 'pl-metro-lg pr-metro-md' : i === tableColumns.length - 1 ? 'pl-metro-md pr-metro-lg' : 'px-metro-md'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && <ChevronUpDownIcon className="w-3 h-3 text-metro-foreground-muted" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((row, i) => (
              <tr key={i} className="border-b border-metro-border last:border-b-0 hover:bg-metro-slate-50 transition-colors">
                <td className="pl-metro-lg pr-metro-md py-metro-md">
                  <p className="text-metro-sm text-metro-foreground leading-tight">{row.name}</p>
                  <p className="text-metro-xs text-metro-foreground-muted leading-tight">ID: {row.id}</p>
                </td>
                <td className="px-metro-md py-metro-md">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-metro-xs font-medium ${
                    row.profitabilityTier === 'Gold'
                      ? 'bg-metro-amber-500/10 text-metro-amber-600'
                      : row.profitabilityTier === 'Silver'
                        ? 'bg-metro-slate-200/60 text-metro-slate-600'
                        : 'bg-metro-amber-200/30 text-metro-amber-800'
                  }`}>
                    {row.profitabilityTier}
                  </span>
                </td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.turnover}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.nibls}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.ibls}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.lendingExposure}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.oif}</td>
                <td className="px-metro-md py-metro-md text-metro-sm text-metro-foreground whitespace-nowrap">{row.lastContactDate}</td>
                <td className="pl-metro-md pr-metro-lg py-metro-md">
                  <div className="flex items-center gap-metro-sm">
                    <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden flex items-center justify-center ${avatarColors[row.assignedRm] || 'bg-metro-slate-400'}`}>
                      <span className="text-[10px] font-medium text-white">{getInitials(row.assignedRm)}</span>
                    </div>
                    <span className="text-metro-sm text-metro-foreground whitespace-nowrap">{row.assignedRm}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-metro-lg py-metro-md border-t border-metro-border">
        <span className="text-metro-xs text-metro-foreground-muted">
          Showing 1 to {customers.length} of {totalEntries} entries
        </span>
        <div className="flex items-center gap-metro-xs">
          <Button className="px-metro-sm py-1 text-metro-xs text-metro-primary bg-transparent border-none cursor-pointer hover:text-metro-primary-hover transition-colors font-medium">
            &lt; Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 rounded-metro-input text-metro-xs font-medium flex items-center justify-center cursor-pointer border transition-colors ${
                page === activePage
                  ? 'bg-metro-primary text-metro-primary-foreground border-metro-primary'
                  : 'bg-metro-surface border-metro-border text-metro-foreground hover:bg-metro-surface-element'
              }`}
            >
              {page}
            </Button>
          ))}
          <Button className="px-metro-sm py-1 text-metro-xs text-metro-primary bg-transparent border-none cursor-pointer hover:text-metro-primary-hover transition-colors font-medium">
            Next &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CustomersTable() {
  const [activeTab, setActiveTab] = useState<number>(customerTabs.indexOf('Active Accounts'))

  return (
    <section className="flex flex-col gap-metro-md">
      <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">Customers</h2>

      <Tabs.Root value={activeTab} onValueChange={(val) => setActiveTab(val as number)}>
        <div className="flex items-end justify-between gap-metro-md flex-wrap">
          <Tabs.List className="flex items-center gap-metro-xs overflow-x-auto">
            {customerTabs.map((tab, i) => (
              <Tabs.Tab
                key={tab}
                value={i}
                className="px-metro-md py-1.5 text-metro-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer border-none text-metro-foreground-muted hover:text-metro-foreground hover:bg-metro-surface-element data-[active]:bg-metro-surface-element data-[active]:text-metro-foreground"
              >
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* Search + Filter */}
          <div className="flex items-center gap-metro-sm shrink-0">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-metro-foreground-muted" />
              <Input
                placeholder="Search customers"
                className="w-72 pl-9 pr-metro-md py-metro-sm border border-metro-border rounded-full text-metro-sm text-metro-foreground bg-metro-surface outline-none focus:border-metro-primary transition-colors"
              />
            </div>
            <Button className="w-9 h-9 rounded-full border border-metro-border bg-metro-surface flex items-center justify-center cursor-pointer text-metro-foreground-muted hover:bg-metro-surface-element transition-colors">
              <FilterIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {customerTabs.map((tab, i) => (
          <Tabs.Panel key={tab} value={i} className="mt-metro-md">
            <CustomerTableContent />
          </Tabs.Panel>
        ))}
      </Tabs.Root>

      <p className="text-metro-xs text-metro-foreground-muted">
        Showing: {customerTabs[activeTab]}
      </p>
    </section>
  )
}
