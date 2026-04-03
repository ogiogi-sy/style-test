export interface CustomerInfo {
  name: string
  id: string
  vintage: string
  assignedRm: string
  badges: { label: string; variant: 'success' | 'warning' }[]
}

export interface AlertBannerData {
  variant: 'warning' | 'error'
  title: string
  description: string
  action?: { label: string }
}

export interface FeeBreakdownItem {
  label: string
  percentage: number
  color: string
}

export interface FeeTrendPoint {
  month: string
  value: number
}

export interface OpportunityItem {
  title: string
  description: string
  icon: string
}

export interface AccountOpRow {
  name: string
  role: string
  email: string
  phone: string
  accessLevel: 'Full Access' | 'View Only' | 'Payments'
}

export interface ApplicationItem {
  name: string
  amount?: string
  status: string
  statusColor: 'warning' | 'info'
}

export interface ProductItem {
  label: string
  count: number
  icon: 'accounts' | 'savings' | 'loan'
}

export const customerInfo: CustomerInfo = {
  name: 'Green Solution Ltd',
  id: '12345678',
  vintage: 'Since 2012',
  assignedRm: 'Sarah Mitchell',
  badges: [
    { label: 'Active', variant: 'success' },
    { label: 'Vulnerable', variant: 'warning' },
  ],
}

export const alertBanners: AlertBannerData[] = [
  {
    variant: 'warning',
    title: 'Posting Restriction',
    description: "Account set to 'Post no Debits' - Pending annual Review completion.",
  },
  {
    variant: 'error',
    title: 'Compliance',
    description: 'Large inflow of \u00a350k detected from unknown source',
    action: { label: 'Review Transaction' },
  },
]

export const kpiCards = [
  { icon: 'dollar', label: 'Relationship Value', value: '\u00a32,845,230.00', trend: '+25.2%' },
  { icon: 'briefcase', label: 'Active Accounts', value: '8', subtitle: '5 current, 2 Savings, 1 Loan' },
  { icon: 'shield', label: 'Risk Status', value: 'Low', subtitle: 'Last review 15 days ago' },
  { icon: 'clock', label: 'KYC Status', value: 'Amber - Review Due', subtitle: 'Due: 15 May 2026', valueColor: 'warning' as const },
  { icon: 'chart', label: 'Account Health', value: '95%', subtitle: 'Excellent Standing' },
]

export const feeInsights = {
  ytdTotal: '\u00a34,120.00',
  priorYear: '\u00a33,680.00',
  growth: '+12%',
}

export const feeBreakdown: FeeBreakdownItem[] = [
  { label: 'FX Income', percentage: 50, color: 'bg-metro-primary' },
  { label: 'Account Maintenance', percentage: 25, color: 'bg-metro-success' },
  { label: 'CHAPS/Service Charges', percentage: 75, color: 'bg-metro-primary' },
]

export const feeTrendData: FeeTrendPoint[] = [
  { month: 'Oct', value: 320 },
  { month: 'Nov', value: 280 },
  { month: 'Dec', value: 350 },
  { month: 'Jan', value: 420 },
  { month: 'Feb', value: 680 },
  { month: 'Mar', value: 950 },
]

export const fanDetails = {
  address: {
    label: 'Correspondence Address',
    lines: ['Unit 12, Metro Business Park Eastern Avenue', 'London, E14 5 United Kingdom'],
  },
  contact: {
    label: 'Primary Contact',
    name: 'John Smith',
    email: 'j.smith@techsolutions.com',
    phone: '+44 20 7123 4567',
  },
  preferences: {
    label: 'Contact Preferences',
    lines: ['Email preferred (9am-5pm)', 'Phone only in emergencies'],
  },
}

export const productFootprint: ProductItem[] = [
  { label: 'Current Accounts', count: 5, icon: 'accounts' },
  { label: 'Savings', count: 2, icon: 'savings' },
  { label: 'Commercial Loan', count: 1, icon: 'loan' },
]

export const activeApplications: ApplicationItem[] = [
  { name: 'Commercial Loan', amount: '\u00a3150k', status: 'In Review', statusColor: 'info' },
  { name: 'Asset Finance', status: 'Awaiting Signature', statusColor: 'warning' },
]

export const loanSummary = {
  amount: '\u00a3150k',
  type: 'Term Loan',
  utilization: 75,
  status: 'In Review',
  estClose: 'March 2026',
}

export const opportunities: OpportunityItem[] = [
  { title: 'Invoice Finance', description: 'High turnover & B2B activity detected', icon: 'fileText' },
  { title: 'Business Credit Card', description: 'Eligible for up to \u00a325k limit', icon: 'creditCard' },
  { title: 'Key Person Insurance', description: 'Recommended for multi-director firms', icon: 'shield' },
  { title: 'Invoice Finance', description: 'High turnover & B2B activity detected', icon: 'fileText' },
]

export const accountOps: AccountOpRow[] = [
  { name: 'John Smith', role: 'Managing Director', email: 'j.smith@techsolutions.com', phone: '+44 20 7123 4567', accessLevel: 'Full Access' },
  { name: 'Sarah Williams', role: 'Chief Financial Officer', email: 's.williams@techsolutions.com', phone: '+44 20 7123 4568', accessLevel: 'Full Access' },
  { name: 'Mark Johnson', role: 'Accountant', email: 'm.johnson@techsolutions.com', phone: '+44 20 7123 4569', accessLevel: 'View Only' },
  { name: 'Emily Davis', role: 'Operation Director', email: 'e.davis@techsolutions.com', phone: '+44 20 7123 4570', accessLevel: 'Payments' },
]

export const fanOverviewTabs = [
  'Overview',
  'Account & Balances',
  'Transactions',
  'Mandates & Access',
  'Statements',
  'Company',
] as const

export const fanSidebarNavGroups = [
  {
    label: 'Account overview',
    items: [
      { icon: 'usersGroup', label: 'Fans', active: true },
      { icon: 'box', label: 'Workbench', active: false },
      { icon: 'telescope', label: 'Prospecting', active: false },
      { icon: 'settings', label: 'Security', active: false },
    ],
  },
] as const
