import { useState, useRef, useEffect, useCallback } from 'react'
import { SearchIcon, ChevronDownIcon, BuildingIcon, UserIcon, ClockIcon, XIcon } from '../../shared/Icons'
import {
  type EntityType,
  type CustomerStatus,
  type SearchResult,
  searchOrganisations,
  searchIndividuals,
  getRecentSearches,
  addRecentSearch,
  getSavedEntityType,
  saveEntityType,
} from '../data/searchData'

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

const entityLabels: Record<EntityType, string> = {
  organisations: 'Organisations',
  individuals: 'Individuals',
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

function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-metro-xs font-medium ${statusStyles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[status]}`} />
      {status}
    </span>
  )
}

function EntityIcon({ type, className }: { type: EntityType; className?: string }) {
  return type === 'organisations'
    ? <BuildingIcon className={className || 'w-4 h-4 text-metro-foreground-muted shrink-0'} />
    : <UserIcon className={className || 'w-4 h-4 text-metro-foreground-muted shrink-0'} />
}

export function GlobalSearch() {
  const [entityType, setEntityType] = useState<EntityType>(getSavedEntityType)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showRecents, setShowRecents] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const MIN_QUERY_LENGTH = 2

  // Debounce search query (min 2 chars)
  useEffect(() => {
    if (!query.trim() || query.trim().length < MIN_QUERY_LENGTH) {
      setDebouncedQuery('')
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      setIsSearching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const results: SearchResult[] =
    entityType === 'organisations'
      ? searchOrganisations(debouncedQuery)
      : searchIndividuals(debouncedQuery)

  const displayResults = results.slice(0, 8)
  const totalMatches = results.length

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [debouncedQuery, entityType])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setShowResults(false)
        setShowRecents(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDropdown(false)
        setShowResults(false)
        setShowRecents(false)
        setMobileExpanded(false)
        inputRef.current?.blur()
        return
      }

      if (!showResults || displayResults.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, displayResults.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, -1))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()
        handleResultClick(displayResults[highlightedIndex])
      }
    },
    [showResults, displayResults, highlightedIndex]
  )

  function handleInputChange(value: string) {
    setQuery(value)
    if (value.trim()) {
      setShowResults(true)
      setShowRecents(false)
    } else {
      setShowResults(false)
      setShowRecents(true)
    }
  }

  function handleInputFocus() {
    setShowDropdown(false)
    if (query.trim()) {
      setShowResults(true)
    } else {
      setShowRecents(true)
    }
  }

  function handleResultClick(result: SearchResult) {
    const isOrg = 'crn' in result
    addRecentSearch({
      id: result.id,
      name: result.name,
      entityType: isOrg ? 'organisations' : 'individuals',
      identifier: isOrg ? (result as any).crn : result.cif,
    })
    setShowResults(false)
    setShowRecents(false)
    setQuery('')
    setDebouncedQuery('')
    setMobileExpanded(false)
    window.location.hash = `#/web/fan-overview?id=${result.id}`
  }

  function handleRecentClick(recent: { id: string; entityType: EntityType }) {
    setShowRecents(false)
    setQuery('')
    setMobileExpanded(false)
    window.location.hash = `#/web/fan-overview?id=${recent.id}`
  }

  function handleViewAll() {
    setShowResults(false)
    setShowRecents(false)
    setMobileExpanded(false)
    window.location.hash = `#/web/search?q=${encodeURIComponent(query)}&type=${entityType}`
  }

  function handleEntityTypeChange(type: EntityType) {
    setEntityType(type)
    saveEntityType(type)
    setShowDropdown(false)
    setQuery('')
    setDebouncedQuery('')
    setShowResults(false)
    inputRef.current?.focus()
  }

  function handleMobileToggle() {
    setMobileExpanded((prev) => !prev)
    if (!mobileExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const recents = getRecentSearches()

  return (
    <div ref={containerRef} className="relative min-w-0">
      {/* Mobile: search icon toggle */}
      <button
        onClick={handleMobileToggle}
        className="md:hidden w-8 h-8 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors"
      >
        <SearchIcon className="w-4 h-4" />
      </button>

      {/* Desktop: always visible | Mobile: shown when expanded */}
      <div className={`${mobileExpanded ? 'absolute left-0 top-10 z-50 w-[calc(100vw-2rem)]' : 'hidden md:block w-full'}`}>
        <div
          className="relative flex items-center rounded-full bg-metro-surface-element border border-metro-border"
          onKeyDown={handleKeyDown}
        >
          {/* Entity type dropdown trigger */}
          <button
            onClick={() => {
              setShowDropdown((prev) => !prev)
              setShowResults(false)
              setShowRecents(false)
            }}
            className="flex items-center gap-1 px-3 py-metro-sm text-metro-xs font-medium text-metro-foreground bg-metro-surface-element rounded-l-full cursor-pointer hover:bg-metro-border transition-colors whitespace-nowrap border-none"
            style={{ borderRight: '1px solid var(--color-metro-border)' }}
          >
            <EntityIcon type={entityType} className="w-3.5 h-3.5 text-metro-foreground-muted" />
            {entityLabels[entityType]}
            <ChevronDownIcon className="w-3 h-3" />
          </button>

          {/* Search input */}
          <div className="relative flex-1 min-w-0 bg-metro-surface rounded-r-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder={entityType === 'organisations' ? 'Search by name, CIF, CRN, or address...' : 'Search by name, CIF, or email...'}
              className="w-full pl-3 pr-9 py-metro-sm text-metro-sm text-metro-foreground bg-transparent outline-none border-none"
              role="combobox"
              aria-expanded={showResults && displayResults.length > 0}
              aria-haspopup="listbox"
              aria-controls="search-results-listbox"
              aria-activedescendant={highlightedIndex >= 0 ? `search-result-${highlightedIndex}` : undefined}
              aria-label={`Search ${entityLabels[entityType].toLowerCase()}`}
            />
            {query ? (
              <button
                onClick={() => {
                  setQuery('')
                  setDebouncedQuery('')
                  setShowResults(false)
                  setShowRecents(false)
                  inputRef.current?.focus()
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-metro-surface-element flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors"
                aria-label="Clear search"
              >
                <XIcon className="w-3 h-3 text-metro-foreground-muted" />
              </button>
            ) : (
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-metro-foreground-muted pointer-events-none" />
            )}
          </div>
        </div>

        {/* Entity type dropdown menu */}
        {showDropdown && (
          <div className="absolute left-0 top-full mt-1 w-48 bg-metro-surface border border-metro-border rounded-metro-input shadow-metro-md z-50">
            {(['organisations', 'individuals'] as EntityType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleEntityTypeChange(type)}
                className={`w-full text-left px-metro-md py-metro-sm text-metro-sm cursor-pointer border-none transition-colors flex items-center gap-metro-sm ${
                  entityType === type
                    ? 'bg-metro-surface-element text-metro-foreground font-medium'
                    : 'bg-transparent text-metro-foreground hover:bg-metro-surface-element'
                }`}
              >
                <EntityIcon type={type} className="w-4 h-4 text-metro-foreground-muted" />
                {entityLabels[type]}
              </button>
            ))}
          </div>
        )}

        {/* Recent searches (shown on focus with empty query) */}
        {showRecents && recents.length > 0 && !query.trim() && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-metro-surface border border-metro-border rounded-metro-card shadow-metro-lg z-50">
            <div className="px-metro-lg py-metro-sm">
              <span className="text-metro-xs font-medium text-metro-foreground-muted uppercase tracking-wider">Recent</span>
            </div>
            {recents.map((recent) => (
              <button
                key={recent.id}
                onClick={() => handleRecentClick(recent)}
                className="w-full text-left px-metro-lg py-metro-sm border-none bg-transparent cursor-pointer hover:bg-metro-slate-50 transition-colors flex items-center gap-metro-sm"
              >
                <ClockIcon className="w-4 h-4 text-metro-foreground-muted shrink-0" />
                <EntityIcon type={recent.entityType} className="w-3.5 h-3.5 text-metro-foreground-muted shrink-0" />
                <span className="text-metro-sm text-metro-foreground truncate">{recent.name}</span>
                <span className="text-metro-xs text-metro-foreground-muted ml-auto shrink-0">
                  {recent.entityType === 'organisations' ? `CRN: ${recent.identifier}` : `CIF: ${recent.identifier}`}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {showResults && isSearching && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-metro-surface border border-metro-border rounded-metro-card shadow-metro-lg z-50 px-metro-lg py-metro-md">
            <div className="flex items-center gap-metro-sm">
              <div className="w-4 h-4 border-2 border-metro-border border-t-metro-primary rounded-full animate-spin" />
              <span className="text-metro-sm text-metro-foreground-muted">Searching...</span>
            </div>
          </div>
        )}

        {/* Search results dropdown */}
        {showResults && !isSearching && displayResults.length > 0 && (
          <div
            id="search-results-listbox"
            role="listbox"
            aria-label="Search results"
            className="absolute left-0 right-0 top-full mt-1 bg-metro-surface border border-metro-border rounded-metro-card shadow-metro-lg z-50 max-h-[480px] overflow-y-auto"
          >
            {displayResults.map((result, i) => (
              <button
                key={result.id}
                id={`search-result-${i}`}
                role="option"
                aria-selected={i === highlightedIndex}
                onClick={() => handleResultClick(result)}
                className={`w-full text-left px-metro-lg py-metro-md border-none bg-transparent cursor-pointer transition-colors ${
                  i === highlightedIndex ? 'bg-metro-slate-50' : 'hover:bg-metro-slate-50'
                }`}
                style={{ borderBottom: i < displayResults.length - 1 ? '1px solid var(--color-metro-border)' : 'none' }}
                onMouseEnter={() => setHighlightedIndex(i)}
              >
                <div className="flex items-start gap-metro-sm">
                  <EntityIcon type={entityType} className="w-4 h-4 text-metro-foreground-muted shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-metro-sm text-metro-foreground leading-tight">
                      <HighlightedName name={result.name} query={debouncedQuery} />
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
            ))}

            {/* View all link */}
            <button
              onClick={handleViewAll}
              className="w-full text-center px-metro-lg py-metro-md text-metro-sm font-medium text-metro-primary bg-transparent border-none cursor-pointer hover:bg-metro-slate-50 transition-colors"
              style={{ borderTop: '1px solid var(--color-metro-border)' }}
            >
              View all search results ({totalMatches} matches)
            </button>
          </div>
        )}

        {/* Min chars hint */}
        {showResults && !isSearching && query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-metro-surface border border-metro-border rounded-metro-card shadow-metro-lg z-50 px-metro-lg py-metro-md text-center">
            <p className="text-metro-sm text-metro-foreground-muted">Type at least {MIN_QUERY_LENGTH} characters to search</p>
          </div>
        )}

        {/* No results */}
        {showResults && !isSearching && debouncedQuery.trim() && displayResults.length === 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-metro-surface border border-metro-border rounded-metro-card shadow-metro-lg z-50 px-metro-lg py-metro-xl text-center">
            <p className="text-metro-sm text-metro-foreground-muted">No {entityLabels[entityType].toLowerCase()} found for "{debouncedQuery}"</p>
            <p className="text-metro-xs text-metro-foreground-muted mt-1">Try searching by {entityType === 'organisations' ? 'CIF, CRN, or address' : 'CIF or email address'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
