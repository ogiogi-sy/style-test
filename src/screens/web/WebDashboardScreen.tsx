import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { PortfolioOverview } from './components/PortfolioOverview'
import { IncomeGeneration } from './components/IncomeGeneration'
import { CustomersTable } from './components/CustomersTable'

export function WebDashboardScreen() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-full bg-metro-surface font-metro-body">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-metro-lg pb-metro-lg">
          <Navbar />
          <div className="flex flex-col gap-metro-xl">
            <PortfolioOverview />
            <IncomeGeneration />
            <CustomersTable />
          </div>
        </main>
      </div>
    </div>
  )
}
