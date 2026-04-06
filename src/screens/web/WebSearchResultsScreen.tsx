import { useState, useMemo } from 'react'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { SearchIcon, BuildingIcon, UserIcon, ChevronUpDownIcon } from '../shared/Icons'
import {
  type EntityType,
  type CustomerStatus,
  type SearchResult,
  searchOrganisations,
  searchIndividuals,
  organisations,
  individuals,
  addRecentSearch,
} from './data/searchData'

const statusStyles: Record<CustomerStatus, string> = {
  Active: 'bg-metro-success-soft text-metro-success',
  Restricted: 'bg-metro-error-soft text-metro-error',
  Prospective: 'bg-metro-warning-soft text-metro-warning',
}

const statusDotStyles: Record<CustomerStatus, string> = {
  Active: 'bg-metro-success',
  Restricted: 'bg-metro-error',
  Prospective: 'bg-metro-warning',
}

type SortOption = 'name-asc' | 'name-desc' | 'status' | 'rm'
type StatusFilter = 'All' | CustomerStatus

const sortLabels: Record<SortOption, string> = {
  'name-asc': 'Name A–Z',
  'name-desc': 'Name Z–A',
  status: 'Status',
  rm: 'Assigned RM',
}

function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-metro-xs font-medium ${statusStyles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[status]}`} />
      {status}
    </span>
  )
}

function HighlightedName({ name, query }: { name: string; query: string }) {
  if (!query.trim()) return <>{name}</>
  const idx = name.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{name}</>
  return (
    <>
      {name.slice(0, idx)}
      <span className="font-semibold">{name.slice(idx, idx + query.length)}</span>
      {name.slice(idx + query.length)}
    </>
  )
}

function EntityIcon({ type }: { type: EntityType }) {
  return type === 'organisations'
    ? <BuildingIcon className="w-4 h-4 text-metro-foreground-muted shrink-0 mt-0.5" />
    : <UserIcon className="w-4 h-4 text-metro-foreground-muted shrink-0 mt-0.5" />
}

function getSearchParams(): { q: string; type: EntityType } {
  const hash = window.location.hash
  const queryString = hash.split('?')[1] || ''
  const params = new URLSearchParams(queryString)
  return {
    q: params.get('q') || '',
    type: (params.get('type') as EntityType) || 'organisations',
  }
}

function sortResults(results: SearchResult[], sort: SortOption): SearchResult[] {
  const sorted = [...results]
  switch (sort) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status))
    case 'rm':
      return sorted.sort((a, b) => a.assignedRm.localeCompare(b.assignedRm))
    default:
      return sorted
  }
}

export function WebSearchResultsScreen() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { q: initialQuery, type: initialType } = getSearchParams()
  const [entityType, setEntityType] = useState<EntityType>(initialType)
  const [query, setQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Results for both entity types (for tab counts)
  const orgResults = useMemo(() => {
    if (!query.trim()) return [...organisations]
    return searchOrganisations(query)
  }, [query])

  const indResults = useMemo(() => {
    if (!query.trim()) return [...individuals]
    return searchIndividuals(query)
  }, [query])

  const rawResults = entityType === 'organisations' ? orgResults : indResults

  // Status counts for filter pills
  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = { All: rawResults.length, Active: 0, Restricted: 0, Prospective: 0 }
    for (const r of rawResults) counts[r.status]++
    return counts
  }, [rawResults])

  const filteredResults = useMemo(() => {
    const filtered = statusFilter === 'All'
      ? rawResults
      : rawResults.filter((r) => r.status === statusFilter)
    return sortResults(filtered, sortBy)
  }, [rawResults, statusFilter, sortBy])

  function handleResultClick(result: SearchResult) {
    const isOrg = 'crn' in result
    addRecentSearch({
      id: result.id,
      name: result.name,
      entityType: isOrg ? 'organisations' : 'individuals',
      identifier: isOrg ? (result as any).crn : result.cif,
    })
    window.location.hash = `#/web/fan-overview?id=${result.id}`
  }

  const statusFilters: StatusFilter[] = ['All', 'Active', 'Restricted', 'Prospective']

  return (
    <div className="flex h-full bg-metro-surface font-metro-body">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-metro-lg pb-metro-lg">
          <Navbar onMenuToggle={() => setMobileOpen(true)} />

          <div className="flex flex-col gap-metro-md">
            <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground">
              Search results
            </h2>

            {/* Search input on results page */}
            <div className="relative max-w-lg">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-metro-foreground-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${entityType}...`}
                className="w-full pl-9 pr-metro-md py-metro-sm border border-metro-border rounded-full text-metro-sm text-metro-foreground bg-metro-surface outline-none focus:border-metro-primary transition-colors"
              />
            </div>

            {/* Controls row: entity tabs + status filters + sort */}
            <div className="flex items-center justify-between gap-metro-md flex-wrap">
              <div className="flex items-center gap-metro-md flex-wrap">
                {/* Entity type tabs */}
                <div className="flex items-center gap-metro-xs">
                  {(['organisations', 'individuals'] as EntityType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setEntityType(type); setStatusFilter('All') }}
                      className={`px-metro-md py-1.5 text-metro-sm font-medium whitespace-nowrap rounded-full transition-colors cursor-pointer border-none flex items-center gap-1.5 ${
                        entityType === type
                          ? 'bg-metro-surface-element text-metro-foreground'
                          : 'text-metro-foreground-muted hover:text-metro-foreground hover:bg-metro-surface-element'
                      }`}
                    >
                      {type === 'organisations'
                        ? <BuildingIcon className="w-3.5 h-3.5" />
                        : <UserIcon className="w-3.5 h-3.5" />
                      }
                      {type === 'organisations' ? 'Organisations' : 'Individuals'}
                      <span className="text-metro-xs text-metro-foreground-muted ml-0.5">
                        ({type === 'organisations' ? orgResults.length : indResults.length})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Status filter pills */}
                <div className="flex items-center gap-metro-xs">
                  {statusFilters.map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-metro-sm py-1 text-metro-xs font-medium rounded-full transition-colors cursor-pointer border ${
                        statusFilter === status
                          ? 'bg-metro-primary text-metro-primary-foreground border-metro-primary'
                          : 'bg-transparent text-metro-foreground-muted border-metro-border hover:bg-metro-surface-element'
                      }`}
                    >
                      {status} ({statusCounts[status]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu((prev) => !prev)}
                  className="flex items-center gap-1 px-metro-md py-1.5 text-metro-xs font-medium text-metro-foreground-muted border border-metro-border rounded-full cursor-pointer bg-transparent hover:bg-metro-surface-element transition-colors"
                >
                  <ChevronUpDownIcon className="w-3.5 h-3.5" />
                  {sortLabels[sortBy]}
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-metro-surface border border-metro-border rounded-metro-input shadow-metro-md z-50">
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => { setSortBy(option); setShowSortMenu(false) }}
                        className={`w-full text-left px-metro-md py-metro-sm text-metro-sm cursor-pointer border-none transition-colors ${
                          sortBy === option
                            ? 'bg-metro-surface-element text-metro-foreground font-medium'
                            : 'bg-transparent text-metro-foreground hover:bg-metro-surface-element'
                        }`}
                      >
                        {sortLabels[option]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results count */}
            <p className="text-metro-xs text-metro-foreground-muted">
              {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
              {query && <> for "{query}"</>}
              {statusFilter !== 'All' && <> · {statusFilter}</>}
            </p>

            {/* Results list */}
            <div className="border border-metro-border rounded-metro-card overflow-hidden bg-metro-surface">
              {filteredResults.length === 0 ? (
                <div className="px-metro-lg py-metro-xl text-center">
                  <p className="text-metro-sm text-metro-foreground-muted">
                    No {entityType} found
                    {query && <> for "{query}"</>}
                    {statusFilter !== 'All' && <> with status "{statusFilter}"</>}
                  </p>
                  <p className="text-metro-xs text-metro-foreground-muted mt-1">
                    Try searching by {entityType === 'organisations' ? 'company name, CIF, CRN, or address' : 'name, CIF, or email address'}
                  </p>
                </div>
              ) : (
                filteredResults.map((result, i) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-metro-lg py-metro-md bg-transparent border-none cursor-pointer hover:bg-metro-slate-50 transition-colors"
                    style={{ borderBottom: i < filteredResults.length - 1 ? '1px solid var(--color-metro-border)' : 'none' }}
                  >
                    <div className="flex items-start gap-metro-sm">
                      <EntityIcon type={entityType} />
                      <div className="flex-1 min-w-0">
                        <p className="text-metro-sm text-metro-foreground leading-tight">
                          <HighlightedName name={result.name} query={query} />
                        </p>
                        <p className="text-metro-xs text-metro-foreground-muted leading-tight mt-0.5">
                          {entityType === 'organisations' ? (
                            <>
                              {'cif' in result && result.cif && <>CIF: {result.cif}&nbsp;&nbsp;&nbsp;&nbsp;</>}
                              CRN: {('crn' in result) ? (result as any).crn : ''}
                            </>
                          ) : (
                            <>CIF: {'cif' in result ? result.cif : ''}</>
                          )}
                        </p>
                        <p className="text-metro-xs text-metro-foreground-muted leading-tight mt-0.5">
                          {entityType === 'organisations'
                            ? ('address' in result ? (result as any).address : '')
                            : ('email' in result ? `Email: ${(result as any).email}` : '')
                          }
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <StatusBadge status={result.status} />
                        <span className="text-metro-xs text-metro-foreground-muted">RM: {result.assignedRm}</span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
