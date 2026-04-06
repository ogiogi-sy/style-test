import { useState, useEffect } from 'react'
import { Button } from '@base-ui/react/button'
import { BellIcon, MenuIcon, SearchIcon } from '../../shared/Icons'
import { CmdKSearch } from './CmdKSearch'

interface NavbarCmdKProps {
  onMenuToggle?: () => void
}

export function NavbarCmdK({ onMenuToggle }: NavbarCmdKProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="flex items-center justify-between py-metro-sm pr-metro-lg gap-metro-md">
        {/* Hamburger — visible only below md */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden w-8 h-8 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
          </button>
        )}

        {/* Search trigger button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-metro-sm text-metro-sm text-metro-foreground-muted bg-metro-surface-element border border-metro-border rounded-full cursor-pointer hover:bg-metro-border/50 hover:border-metro-foreground-muted/30 transition-colors max-w-[320px] w-full"
        >
          <SearchIcon className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left truncate">Search customers...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-metro-surface text-metro-foreground-muted text-[11px] font-mono border border-metro-border">
            ⌘K
          </kbd>
        </button>

        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <Button className="w-8 h-8 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors">
              <BellIcon className="w-4 h-4" />
            </Button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-metro-accent rounded-full" />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#c7b9da] overflow-hidden flex items-center justify-center ml-1">
            <span className="text-metro-xs font-medium text-white">SJ</span>
          </div>
        </div>
      </div>

      <CmdKSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
