export interface CustomerRow {
  name: string
  id: string
  profitabilityTier: 'Gold' | 'Silver' | 'Bronze'
  turnover: string
  nibls: string
  ibls: string
  lendingExposure: string
  oif: string
  lastContactDate: string
  assignedRm: string
}

export const portfolioStats = [
  { icon: 'wallet', label: 'Total Lending', value: '£285.85M', trend: '+8.4%' },
  { icon: 'piggyBank', label: 'Total Deposits', value: '£204.82M', trend: '+8.4%' },
  { icon: 'users', label: 'Active Accounts', value: '140', trend: '+3' },
  { icon: 'calendar', label: 'Review', value: '45', trendLabel: 'This month' },
  { icon: 'userX', label: 'Dormant / Inactive', value: '10', trendLabel: '90+ days' },
] as const

export const incomeStats = [
  { icon: 'wallet', label: 'Transactional Fees', subtitle: '47% of total income', value: '£9.99M', trend: '+8.4%' },
  { icon: 'calculator', label: 'Avg. Lending Margin', subtitle: 'Across all lending products', value: '3.45%', trend: '+0.3%' },
  { icon: 'piggyBank', label: 'Avg. interest Margin on Deposits', subtitle: 'Weighted average across portfolios', value: '4.18%', trend: '+0.15%' },
] as const

export const customerTabs = [
  'Active Accounts',
  'Total Lending',
  'Total Deposits',
  'Review',
  'Dormant / Inactive',
  'OI&F',
] as const

export const tableColumns = [
  { key: 'name', label: 'Customer name & ID', sortable: true },
  { key: 'profitabilityTier', label: 'Profitability tier', sortable: false },
  { key: 'turnover', label: 'Turnover', sortable: true },
  { key: 'nibls', label: 'NIBLS', sortable: true },
  { key: 'ibls', label: 'IBLS', sortable: true },
  { key: 'lendingExposure', label: 'Lending Exposure', sortable: true },
  { key: 'oif', label: 'OI&F', sortable: true },
  { key: 'lastContactDate', label: 'Last contact date', sortable: false },
  { key: 'assignedRm', label: 'Assigned RM', sortable: false },
] as const

export const customers: CustomerRow[] = [
  { name: 'Green Solution Ltd', id: '12345678', profitabilityTier: 'Gold', turnover: '£5,938,365', nibls: '£87,306', ibls: '£79,542', lendingExposure: '£2,863,938', oif: '£125,811', lastContactDate: '27 Dec 2025', assignedRm: 'Sarah Mitchell' },
  { name: 'Apex Industries', id: '23456789', profitabilityTier: 'Silver', turnover: '£3,214,800', nibls: '£52,140', ibls: '£41,300', lendingExposure: '£1,450,000', oif: '£78,500', lastContactDate: '15 Jan 2026', assignedRm: 'James Chen' },
  { name: 'Nova Financial Group', id: '34567890', profitabilityTier: 'Gold', turnover: '£8,120,500', nibls: '£112,400', ibls: '£95,200', lendingExposure: '£4,200,000', oif: '£198,300', lastContactDate: '02 Feb 2026', assignedRm: 'Sarah Mitchell' },
  { name: 'Meridian Partners', id: '45678901', profitabilityTier: 'Bronze', turnover: '£1,850,200', nibls: '£28,600', ibls: '£22,100', lendingExposure: '£620,000', oif: '£34,200', lastContactDate: '20 Dec 2025', assignedRm: 'Priya Kapoor' },
  { name: 'Bluewater Holdings', id: '56789012', profitabilityTier: 'Silver', turnover: '£4,560,100', nibls: '£64,300', ibls: '£58,700', lendingExposure: '£2,100,000', oif: '£92,400', lastContactDate: '08 Mar 2026', assignedRm: 'James Chen' },
  { name: 'Orion Enterprises', id: '67890123', profitabilityTier: 'Gold', turnover: '£6,780,900', nibls: '£98,200', ibls: '£82,600', lendingExposure: '£3,500,000', oif: '£156,700', lastContactDate: '12 Mar 2026', assignedRm: 'Priya Kapoor' },
]

export const sidebarNavGroups = [
  {
    label: 'Account overview',
    items: [
      { icon: 'home', label: 'Home', active: true, expandable: true, subItems: ['History', 'Starred'] },
      { icon: 'bot', label: 'Chatbot', active: false, expandable: true },
      { icon: 'bookOpen', label: 'Documentation', active: false, expandable: true },
      { icon: 'settings', label: 'Settings', active: false, expandable: true },
    ],
  },
  {
    label: 'Manage payments',
    items: [
      { icon: 'arrowLeftRight', label: 'Payments', active: false, badge: '3' },
      { icon: 'trendUp', label: 'Lending', active: false },
      { icon: 'ellipsis', label: 'More', active: false },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { icon: 'chart', label: 'Insights', active: false },
      { icon: 'box', label: 'Propositions', active: false },
    ],
  },
] as const
