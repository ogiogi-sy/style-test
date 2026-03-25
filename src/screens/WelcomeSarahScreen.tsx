import { Button } from '@base-ui/react/button'
import { ScreenHeader } from './shared/ScreenHeader'
import { BriefcaseIcon, UserIcon, ClockIcon, ArrowRightIcon } from './shared/Icons'
import heroIllustration from '../assets/illustration-1.png'

export function WelcomeSarahScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={33} />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto flex flex-col">
        {/* Hero illustration — centered, Wise style */}
        <div className="flex justify-center pt-metro-md pb-metro-xl">
          <img src={heroIllustration} alt="" className="w-44 h-auto" />
        </div>

        {/* Heading — large, bold, centered */}
        <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground text-center mb-metro-sm">
          Hey Sarah, let's go
        </h1>
        <p className="text-metro-sm text-metro-foreground-muted text-center mb-metro-2xl">
          We'll get your business account ready. Here's what we'll need:
        </p>

        {/* Checklist items — icon + bold title + subtitle */}
        <div className="flex flex-col gap-metro-lg mb-auto">
          <div className="flex items-start gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center shrink-0">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <div className="pt-0.5">
              <p className="text-metro-sm font-semibold text-metro-foreground">Your business details</p>
              <p className="text-metro-xs text-metro-foreground-muted mt-0.5">Company name and registration number</p>
            </div>
          </div>
          <div className="flex items-start gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="pt-0.5">
              <p className="text-metro-sm font-semibold text-metro-foreground">Who's involved</p>
              <p className="text-metro-xs text-metro-foreground-muted mt-0.5">We'll need to check the identity of each director</p>
            </div>
          </div>
          <div className="flex items-start gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-metro-surface-element text-metro-foreground flex items-center justify-center shrink-0">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div className="pt-0.5">
              <p className="text-metro-sm font-semibold text-metro-foreground">About 10 minutes</p>
              <p className="text-metro-xs text-metro-foreground-muted mt-0.5">Save and come back whenever you like</p>
            </div>
          </div>
        </div>

        {/* Buttons — pinned to bottom */}
        <div className="flex flex-col gap-metro-sm pt-metro-xl">
          <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
            Let's start
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
          <button className="w-full text-center text-metro-sm text-metro-foreground-muted underline hover:text-metro-foreground transition-colors py-metro-xs cursor-pointer bg-transparent border-none">
            Save and exit
          </button>
        </div>
      </div>
    </div>
  )
}
