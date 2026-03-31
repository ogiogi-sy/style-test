import { Button } from '@base-ui/react/button'
import { SearchIcon, BellIcon } from '../../shared/Icons'

export function Navbar() {
  return (
    <div className="flex items-center justify-end py-metro-sm pr-metro-lg">
      <div className="flex items-center gap-1.5">
        <Button className="w-8 h-8 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center cursor-pointer border-none hover:bg-metro-border transition-colors">
          <SearchIcon className="w-4 h-4" />
        </Button>
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
  )
}
