import { Separator } from '@base-ui/react/separator'
import {
  HomeIcon,
  BotIcon,
  BookOpenIcon,
  SettingsIcon,
  ArrowLeftRightIcon,
  TrendUpIcon,
  EllipsisIcon,
  ChartIcon,
  BoxIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  SidebarIcon,
  XIcon,
} from '../../shared/Icons'
import metroLogoSmall from '../../../assets/logo-small.svg'
import { sidebarNavGroups } from '../data/mockData'
import { useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  UsersGroupIcon,
  TelescopeIcon,
} from '../../shared/Icons'

const iconMap: Record<string, ReactNode> = {
  home: <HomeIcon className="w-4 h-4" />,
  bot: <BotIcon className="w-4 h-4" />,
  bookOpen: <BookOpenIcon className="w-4 h-4" />,
  settings: <SettingsIcon className="w-4 h-4" />,
  arrowLeftRight: <ArrowLeftRightIcon className="w-4 h-4" />,
  trendUp: <TrendUpIcon className="w-4 h-4" />,
  ellipsis: <EllipsisIcon className="w-4 h-4" />,
  chart: <ChartIcon className="w-4 h-4" />,
  box: <BoxIcon className="w-4 h-4" />,
  usersGroup: <UsersGroupIcon className="w-4 h-4" />,
  telescope: <TelescopeIcon className="w-4 h-4" />,
}

interface NavItem {
  icon: string
  label: string
  active?: boolean
  expandable?: boolean
  subItems?: readonly string[]
  badge?: string
}

interface NavGroup {
  label: string
  items: readonly NavItem[]
}

interface SidebarProps {
  navGroups?: readonly NavGroup[]
  mobileOpen?: boolean
  onMobileClose?: () => void
}

/** Returns true when the viewport is below the given breakpoint (in px). */
function useBreakpoint(breakpoint: number) {
  const [below, setBelow] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setBelow(e.matches)
    setBelow(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return below
}

function SidebarContent({ collapsed, onToggle, navGroups }: { collapsed: boolean; onToggle: () => void; navGroups: readonly NavGroup[] }) {
  return (
    <div className="bg-metro-slate-50 rounded-metro-card flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-metro-sm">
        <div className={`flex items-center gap-metro-sm p-metro-sm rounded-metro-input ${collapsed ? 'justify-center' : ''}`}>
          {collapsed ? (
            <button
              onClick={onToggle}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            >
              <ChevronRightIcon className="w-5 h-5 text-metro-foreground-muted hover:text-metro-foreground transition-colors" />
            </button>
          ) : (
            <>
              <img src={metroLogoSmall} alt="Metro Bank" className="w-9 h-9 shrink-0 object-contain" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-metro-lg font-metro-display font-bold text-metro-foreground leading-tight">Metro Bank</span>
                <span className="text-metro-xs font-metro-display font-light text-metro-foreground-muted leading-tight">Enterprise</span>
              </div>
              <button
                onClick={onToggle}
                className="w-7 h-7 rounded-full bg-metro-surface-element text-metro-foreground-muted flex items-center justify-center cursor-pointer border-none hover:bg-metro-border hover:text-metro-foreground transition-colors shrink-0"
              >
                <SidebarIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Nav groups */}
      <div className="flex-1 px-metro-sm overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={group.label} className={`p-metro-sm ${gi > 0 ? '' : ''}`}>
            {!collapsed && (
              <div className="px-metro-sm h-8 flex items-center">
                <span className="text-metro-xs text-metro-foreground-muted">{group.label}</span>
              </div>
            )}
            {collapsed && gi > 0 && (
              <Separator className="h-px bg-metro-border mb-metro-sm" />
            )}
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => (
                <div key={item.label}>
                  <button
                    className={`flex items-center gap-metro-sm p-metro-sm rounded-metro-input transition-colors cursor-pointer border-none w-full text-left ${
                      item.active
                        ? 'bg-metro-surface-element text-metro-foreground'
                        : 'text-metro-foreground hover:bg-metro-surface-element'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <span className="shrink-0">{iconMap[item.icon]}</span>
                    {!collapsed && (
                      <>
                        <span className="text-metro-sm flex-1 whitespace-nowrap">{item.label}</span>
                        {'badge' in item && item.badge && (
                          <span className="bg-metro-primary text-white text-metro-xs rounded-full px-1.5 py-0.5 leading-none font-medium min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )}
                        {'expandable' in item && item.expandable && (
                          item.active
                            ? <ChevronDownIcon className="w-4 h-4 text-metro-foreground-muted shrink-0" />
                            : <ChevronRightIcon className="w-4 h-4 text-metro-foreground-muted shrink-0" />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && item.active && 'subItems' in item && item.subItems && (
                    <div className="ml-[22px] pl-metro-sm border-l border-metro-border">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub}
                          className="flex items-center w-full text-left px-metro-sm h-7 rounded-metro-input text-metro-sm text-metro-foreground hover:bg-metro-surface-element transition-colors cursor-pointer border-none"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-metro-sm mt-auto">
        <div className={`flex items-center gap-metro-sm p-metro-sm rounded-metro-input ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-[#c7b9da] shrink-0 overflow-hidden flex items-center justify-center">
            <span className="text-metro-xs font-medium text-white">SJ</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-metro-sm text-metro-foreground truncate">Sara Jones</span>
                <span className="text-metro-xs font-light text-metro-foreground-muted truncate">mb@example.com</span>
              </div>
              <ChevronUpDownIcon className="w-4 h-4 text-metro-foreground-muted shrink-0" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ navGroups, mobileOpen, onMobileClose }: SidebarProps) {
  const groups = navGroups ?? sidebarNavGroups
  const isMedium = useBreakpoint(1024) // true when < lg (768–1023)

  // Manual toggle only works on large screens; on medium it's forced collapsed
  const [manualCollapsed, setManualCollapsed] = useState(false)
  const collapsed = isMedium || manualCollapsed

  const handleToggle = useCallback(() => {
    if (isMedium) return // can't expand on medium — not enough room
    setManualCollapsed((prev) => !prev)
  }, [isMedium])

  return (
    <>
      {/* Desktop / tablet sidebar — hidden below md (768px) */}
      <aside className={`hidden md:flex flex-col h-full p-metro-sm shrink-0 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[237px]'}`}>
        <SidebarContent collapsed={collapsed} onToggle={handleToggle} navGroups={groups} />
      </aside>

      {/* Mobile overlay — visible below md when open */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <div className="relative w-[280px] h-full p-metro-sm flex flex-col animate-slide-in-left">
            <div className="absolute top-metro-sm right-metro-sm z-10">
              <button
                onClick={onMobileClose}
                className="w-8 h-8 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent collapsed={false} onToggle={() => {}} navGroups={groups} />
          </div>
        </div>
      )}
    </>
  )
}
