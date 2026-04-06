import { useState, useRef, useEffect, useCallback } from 'react'
import { SearchIcon, XIcon, BuildingIcon, UserIcon } from '../../shared/Icons'
import {
  type EntityType,
  type CustomerStatus,
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-metro-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  )
}

interface CmdKSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function CmdKSearch({ isOpen, onClose }: CmdKSearchProps) {
  const [entityType, setEntityType] = useState<EntityType>(getSavedEntityType)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results =
    entityType === 'organisations'
      ? searchOrganisations(query)
      : searchIndividuals(query)

  const recentSearches = getRecentSearches()
  const displayResults = results.slice(0, 8)
  const totalMatches = results.length
  const showRecents = !query.trim() && recentSearches.length > 0

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(-1)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const itemCount = showRecents ? recentSearches.length : displayResults.length

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1))
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        if (showRecents) {
          const recent = recentSearches[activeIndex]
          if (recent) {
            setEntityType(recent.entityType)
            saveEntityType(recent.entityType)
            handleResultClick()
          }
        } else if (displayResults[activeIndex]) {
          handleResultClick()
        }
      } else if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        setEntityType((prev) => {
          const next = prev === 'organisations' ? 'individuals' : 'organisations'
          saveEntityType(next)
          return next
        })
        setActiveIndex(-1)
      }
    },
    [activeIndex, displayResults, showRecents, recentSearches, onClose]
  )

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-result-item]')
      items[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  function handleResultClick() {
    const result = displayResults[activeIndex >= 0 ? activeIndex : 0]
    if (result) {
      addRecentSearch({
        id: result.id,
        name: result.name,
        entityType,
        identifier: entityType === 'organisations' ? ('crn' in result ? (result as any).crn : '') : ('cif' in result ? result.cif : ''),
      })
    }
    onClose()
    setQuery('')
    window.location.hash = '#/web/fan-overview'
  }

  function handleViewAll() {
    onClose()
    setQuery('')
    window.location.hash = `#/web/search?q=${encodeURIComponent(query)}&type=${entityType}`
  }

  function handleEntitySwitch(type: EntityType) {
    setEntityType(type)
    saveEntityType(type)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[620px] mx-metro-md bg-metro-surface rounded-metro-card shadow-metro-lg border border-metro-border overflow-hidden animate-[cmdk-in_150ms_ease-out]"
        onKeyDown={handleKeyDown}
      >
        {/* Entity type tabs */}
        <div className="flex items-center gap-1 px-metro-lg pt-metro-md pb-0">
          <button
            onClick={() => handleEntitySwitch('organisations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-metro-xs font-medium border-none cursor-pointer transition-colors ${
              entityType === 'organisations'
                ? 'bg-metro-primary text-white'
                : 'bg-metro-surface-element text-metro-foreground-muted hover:bg-metro-border'
            }`}
          >
            <BuildingIcon className="w-3.5 h-3.5" />
            Organisations
          </button>
          <button
            onClick={() => handleEntitySwitch('individuals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-metro-xs font-medium border-none cursor-pointer transition-colors ${
              entityType === 'individuals'
                ? 'bg-metro-primary text-white'
                : 'bg-metro-surface-element text-metro-foreground-muted hover:bg-metro-border'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            Individuals
          </button>
          <span className="ml-auto text-metro-xs text-metro-foreground-muted">
            Tab to switch
          </span>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-3 px-metro-lg py-metro-md">
          <SearchIcon className="w-5 h-5 text-metro-foreground-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIndex(-1)
            }}
            placeholder={
              entityType === 'organisations'
                ? 'Search by name, CIF, CRN, or address...'
                : 'Search by name, CIF, or email...'
            }
            className="flex-1 text-metro-base text-metro-foreground bg-transparent outline-none border-none placeholder:text-metro-foreground-muted"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="w-6 h-6 rounded-full bg-metro-surface-element text-metro-foreground-muted flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="h-px bg-metro-border" />

        {/* Results area */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto">
          {/* Recent searches (shown when no query) */}
          {showRecents && (
            <div>
              <div className="px-metro-lg py-metro-sm">
                <span className="text-metro-xs font-medium text-metro-foreground-muted uppercase tracking-wider">
                  Recent
                </span>
              </div>
              {recentSearches.map((recent, i) => (
                <button
                  key={recent.id}
                  data-result-item
                  onClick={() => {
                    setEntityType(recent.entityType)
                    saveEntityType(recent.entityType)
                    handleResultClick()
                  }}
                  className={`w-full text-left px-metro-lg py-metro-sm border-none cursor-pointer transition-colors flex items-center gap-3 ${
                    activeIndex === i
                      ? 'bg-metro-surface-element'
                      : 'bg-transparent hover:bg-metro-surface-element/50'
                  }`}
                >
                  <ClockIconSmall />
                  <div className="flex-1 min-w-0">
                    <span className="text-metro-sm text-metro-foreground">{recent.name}</span>
                    <span className="text-metro-xs text-metro-foreground-muted ml-2">{recent.identifier}</span>
                  </div>
                  <span className="text-metro-xs text-metro-foreground-muted capitalize">{recent.entityType}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search results */}
          {query.trim() && displayResults.length > 0 && (
            <div>
              <div className="px-metro-lg py-metro-sm flex items-center justify-between">
                <span className="text-metro-xs font-medium text-metro-foreground-muted uppercase tracking-wider">
                  {entityType === 'organisations' ? 'Organisations' : 'Individuals'}
                </span>
                <span className="text-metro-xs text-metro-foreground-muted">
                  {totalMatches} result{totalMatches !== 1 ? 's' : ''}
                </span>
              </div>
              {displayResults.map((result, i) => (
                <button
                  key={result.id}
                  data-result-item
                  onClick={() => {
                    setActiveIndex(i)
                    handleResultClick()
                  }}
                  className={`w-full text-left px-metro-lg py-metro-md border-none cursor-pointer transition-colors ${
                    activeIndex === i
                      ? 'bg-metro-surface-element'
                      : 'bg-transparent hover:bg-metro-surface-element/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-metro-md">
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
                          <>CIF: {('cif' in result) ? result.cif : ''}</>
                        )}
                      </p>
                      <p className="text-metro-xs text-metro-foreground-muted leading-tight mt-0.5">
                        {entityType === 'organisations'
                          ? ('address' in result ? (result as any).address : '')
                          : ('email' in result ? `Email: ${(result as any).email}` : '')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StatusBadge status={result.status} />
                      <span className="text-metro-xs text-metro-foreground-muted">RM: {result.assignedRm}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() && displayResults.length === 0 && (
            <div className="px-metro-lg py-metro-xl text-center">
              <p className="text-metro-sm text-metro-foreground-muted">
                No {entityType === 'organisations' ? 'organisations' : 'individuals'} found for "{query}"
              </p>
              <p className="text-metro-xs text-metro-foreground-muted mt-1">
                Try searching by {entityType === 'organisations' ? 'name, CIF, CRN, or address' : 'name, CIF, or email'}
              </p>
            </div>
          )}

          {/* Empty state — no query, no recents */}
          {!query.trim() && recentSearches.length === 0 && (
            <div className="px-metro-lg py-metro-xl text-center">
              <p className="text-metro-sm text-metro-foreground-muted">
                Search {entityType === 'organisations' ? 'organisations' : 'individuals'} by {entityType === 'organisations' ? 'name, CIF, CRN, or address' : 'name, CIF, or email'}
              </p>
            </div>
          )}
        </div>

        {/* View all link (when results exist) */}
        {query.trim() && totalMatches > 0 && (
          <>
            <div className="h-px bg-metro-border" />
            <button
              onClick={handleViewAll}
              className="w-full text-center px-metro-lg py-metro-sm text-metro-sm font-medium text-metro-primary bg-transparent border-none cursor-pointer hover:bg-metro-surface-element transition-colors"
            >
              View all search results ({totalMatches} matches)
            </button>
          </>
        )}

        {/* Footer with keyboard hints */}
        <div className="h-px bg-metro-border" />
        <div className="flex items-center gap-metro-md px-metro-lg py-metro-sm">
          <span className="flex items-center gap-1 text-metro-xs text-metro-foreground-muted">
            <kbd className="px-1.5 py-0.5 rounded bg-metro-surface-element text-metro-foreground-muted text-[10px] font-mono border border-metro-border">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-metro-xs text-metro-foreground-muted">
            <kbd className="px-1.5 py-0.5 rounded bg-metro-surface-element text-metro-foreground-muted text-[10px] font-mono border border-metro-border">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1 text-metro-xs text-metro-foreground-muted">
            <kbd className="px-1.5 py-0.5 rounded bg-metro-surface-element text-metro-foreground-muted text-[10px] font-mono border border-metro-border">Tab</kbd>
            switch type
          </span>
          <span className="flex items-center gap-1 text-metro-xs text-metro-foreground-muted ml-auto">
            <kbd className="px-1.5 py-0.5 rounded bg-metro-surface-element text-metro-foreground-muted text-[10px] font-mono border border-metro-border">Esc</kbd>
            close
          </span>
        </div>
      </div>

      <style>{`
        @keyframes cmdk-in {
          from { opacity: 0; transform: scale(0.98) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

function ClockIconSmall() {
  return (
    <svg className="w-4 h-4 text-metro-foreground-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}
