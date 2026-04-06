export type EntityType = 'organisations' | 'individuals'
export type CustomerStatus = 'Active' | 'Restricted' | 'Prospective'

export interface OrganisationResult {
  id: string
  name: string
  cif?: string
  crn: string
  address: string
  status: CustomerStatus
  assignedRm: string
}

export interface IndividualResult {
  id: string
  name: string
  cif: string
  email: string
  status: CustomerStatus
  assignedRm: string
}

export type SearchResult = OrganisationResult | IndividualResult

export interface RecentSearch {
  id: string
  name: string
  entityType: EntityType
  identifier: string // CRN for orgs, CIF for individuals
}

const RECENT_SEARCHES_KEY = 'metro-recent-searches'
const ENTITY_TYPE_KEY = 'metro-search-entity-type'
const MAX_RECENTS = 5

export function getRecentSearches(): RecentSearch[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addRecentSearch(item: RecentSearch) {
  const recents = getRecentSearches().filter((r) => r.id !== item.id)
  recents.unshift(item)
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recents.slice(0, MAX_RECENTS)))
}

export function getSavedEntityType(): EntityType {
  const saved = localStorage.getItem(ENTITY_TYPE_KEY)
  return saved === 'individuals' ? 'individuals' : 'organisations'
}

export function saveEntityType(type: EntityType) {
  localStorage.setItem(ENTITY_TYPE_KEY, type)
}

export const organisations: OrganisationResult[] = [
  { id: 'org-001', name: 'Metric Solutions UK', crn: '08765432', address: '12 High Street, SW1', status: 'Prospective', assignedRm: 'Sarah Jenkins' },
  { id: 'org-002', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-003', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Restricted', assignedRm: 'Sarah Jenkins' },
  { id: 'org-004', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Restricted', assignedRm: 'Sarah Jenkins' },
  { id: 'org-005', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-006', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-007', name: 'Metric Solutions UK', cif: '12345678', crn: '08765432', address: '12 High Street, SW1', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-008', name: 'Green Solution Ltd', cif: '12345678', crn: '09876543', address: '45 Victoria Road, EC2', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'org-009', name: 'Apex Industries', cif: '23456789', crn: '07654321', address: '8 King Street, WC1', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-010', name: 'Nova Financial Group', cif: '34567890', crn: '06543210', address: '22 Queen Street, E1', status: 'Prospective', assignedRm: 'Sarah Jenkins' },
  { id: 'org-011', name: 'Meridian Partners', cif: '45678901', crn: '05432109', address: '3 Bridge Lane, SW3', status: 'Restricted', assignedRm: 'Mark Owen' },
  { id: 'org-012', name: 'Bluewater Holdings', cif: '56789012', crn: '04321098', address: '17 Park Avenue, W1', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'org-013', name: 'Orion Enterprises', cif: '67890123', crn: '03210987', address: '91 Fleet Street, EC4', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'org-014', name: 'Metro Capital Ltd', crn: '02109876', address: '5 Lombard Street, EC3', status: 'Prospective', assignedRm: 'Sarah Jenkins' },
  { id: 'org-015', name: 'Sterling & Co', cif: '78901234', crn: '01098765', address: '14 Chancery Lane, WC2', status: 'Active', assignedRm: 'Mark Owen' },
]

export const individuals: IndividualResult[] = [
  { id: 'ind-001', name: 'Jane Metron', cif: '12345678', email: 'j***@example.com', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'ind-002', name: 'John Smith', cif: '23456789', email: 'j***@techsolutions.com', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'ind-003', name: 'Sarah Williams', cif: '34567890', email: 's***@techsolutions.com', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'ind-004', name: 'Mark Johnson', cif: '45678901', email: 'm***@techsolutions.com', status: 'Restricted', assignedRm: 'Mark Owen' },
  { id: 'ind-005', name: 'Emily Davis', cif: '56789012', email: 'e***@techsolutions.com', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'ind-006', name: 'Michael Brown', cif: '67890123', email: 'm***@brownco.co.uk', status: 'Prospective', assignedRm: 'Mark Owen' },
  { id: 'ind-007', name: 'Rachel Green', cif: '78901234', email: 'r***@greeninvest.com', status: 'Active', assignedRm: 'Sarah Jenkins' },
  { id: 'ind-008', name: 'David Metro', cif: '89012345', email: 'd***@metrocap.com', status: 'Active', assignedRm: 'Mark Owen' },
  { id: 'ind-009', name: 'Lisa Chen', cif: '90123456', email: 'l***@chengroup.com', status: 'Restricted', assignedRm: 'Sarah Jenkins' },
  { id: 'ind-010', name: 'James Meridian', cif: '01234567', email: 'j***@meridian.co.uk', status: 'Active', assignedRm: 'Mark Owen' },
]

export function searchOrganisations(query: string): OrganisationResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return organisations.filter(
    (o) =>
      o.name.toLowerCase().includes(q) ||
      o.crn.includes(q) ||
      (o.cif && o.cif.includes(q)) ||
      o.address.toLowerCase().includes(q)
  )
}

export function searchIndividuals(query: string): IndividualResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return individuals.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.cif.includes(q) ||
      i.email.toLowerCase().includes(q)
  )
}
