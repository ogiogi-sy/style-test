import { Button } from '@base-ui/react/button'
import { ScreenHeader } from './shared/ScreenHeader'
import { PersonCard } from './shared/PersonCard'

export function YourTeamScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={41} />
      <div className="flex-1 px-metro-lg overflow-y-auto pb-[140px]">
        <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground mt-metro-lg mb-metro-xs">
          Who needs access?
        </h2>
        <p className="text-metro-sm text-metro-foreground-muted mb-metro-xl">
          Choose who can manage this account. You can update this anytime.
        </p>

        <p className="text-metro-sm font-medium text-metro-foreground-muted mb-metro-md">
          Directors from Companies House
        </p>

        <div className="flex flex-col gap-metro-md mb-metro-lg">
          <PersonCard
            initials="JD"
            name="James Davidson"
            subtitle={<>Director · <span className="text-metro-success">Verified</span></>}
            bg="bg-violet-100"
            text="text-violet-600"
          />

          <PersonCard
            initials="SL"
            name="Sarah Langford"
            bg="bg-emerald-100"
            text="text-emerald-600"
            subtitle="Director · Pending"
            actions={
              <button className="px-metro-md py-metro-xs bg-metro-primary text-metro-primary-foreground text-metro-xs font-medium rounded-metro-button cursor-pointer border-none hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
                Invite
              </button>
            }
          />

          <button className="w-full flex items-center justify-center gap-metro-sm text-metro-primary text-metro-sm font-medium underline cursor-pointer bg-transparent border-none hover:text-metro-primary-hover transition-colors">
            Add another person
          </button>
        </div>
      </div>

      <div className="px-metro-lg py-metro-lg bg-metro-surface flex flex-col gap-metro-md">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Review and continue
        </Button>
        <button className="w-full text-center text-metro-sm text-metro-foreground-muted underline hover:text-metro-foreground transition-colors py-metro-xs cursor-pointer bg-transparent border-none">
          Skip for now
        </button>
      </div>
    </div>
  )
}
