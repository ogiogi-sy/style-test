import { Button } from '@base-ui/react/button'
import { StatusBar } from './shared/StatusBar'
import { ArrowRightIcon, UserIcon, ShieldCheckIcon, ClockIcon, BriefcaseIcon } from './shared/Icons'
import heroIllustration from '../assets/illustration-2.png'

export function WelcomeScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-primary">
      <StatusBar variant="dark" />

      <div className="flex-1 px-metro-lg pb-metro-lg overflow-y-auto flex flex-col">
        {/* Hero illustration — centered */}
        <div className="flex justify-center pt-metro-xl pb-metro-lg">
          <img src={heroIllustration} alt="" className="w-64 h-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-[2rem] font-metro-display font-light text-white text-center mb-metro-2xl leading-tight">
          Business banking{'\n'}built around you
        </h1>

        {/* Feature list */}
        <div className="flex flex-col gap-metro-lg mb-auto">
          <div className="flex items-center gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <p className="text-metro-sm font-medium text-white">An account that fits your business</p>
          </div>
          <div className="flex items-center gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <p className="text-metro-sm font-medium text-white">Smart insights powered by AI</p>
          </div>
          <div className="flex items-center gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
              <ClockIcon className="w-5 h-5" />
            </div>
            <p className="text-metro-sm font-medium text-white">Apply in minutes, not days</p>
          </div>
          <div className="flex items-center gap-metro-md">
            <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <p className="text-metro-sm font-medium text-white">Your own dedicated manager</p>
          </div>
        </div>

        {/* Buttons — pinned to bottom */}
        <div className="flex flex-col gap-metro-sm pt-metro-xl">
          <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-white text-metro-primary rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-white/90 active:bg-white/80 transition-colors">
            Get started
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
          <button className="w-full text-center text-metro-sm text-white/80 underline hover:text-white transition-colors py-metro-xs cursor-pointer bg-transparent border-none">
            Save for later
          </button>
        </div>
      </div>
    </div>
  )
}
