import { Button } from '@base-ui/react/button'
import { Collapsible } from '@base-ui/react/collapsible'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { ScreenHeader } from './shared/ScreenHeader'
import { CheckCircleIcon, ArrowRightIcon, ChevronDownIcon } from './shared/Icons'

function PersonCard({
  initials,
  name,
  subtitle,
  email,
  mobile,
  defaultOpen,
  detailsAdded,
  bg = 'bg-metro-primary-soft',
  text = 'text-metro-primary',
}: {
  initials: string
  name: string
  subtitle: string
  email: string
  mobile: string
  defaultOpen: boolean
  detailsAdded?: boolean
  bg?: string
  text?: string
}) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen} className="rounded-metro-card">
      <div className="rounded-metro-card border border-metro-border bg-white">
        <Collapsible.Trigger className="w-full text-left p-metro-lg cursor-pointer">
          <div className="flex items-center gap-metro-md">
            <div className={`w-10 h-10 rounded-full ${bg} ${text} flex items-center justify-center text-metro-sm font-semibold shrink-0`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-metro-base font-medium text-metro-foreground truncate">{name}</p>
              <p className="text-metro-sm text-metro-foreground-muted mt-0.5">
                {subtitle}
                {detailsAdded && (
                  <span className="text-metro-success"> · <CheckCircleIcon className="w-3 h-3 inline -mt-0.5" /> Details added</span>
                )}
              </p>
            </div>
            <ChevronDownIcon className="w-5 h-5 text-metro-foreground-muted shrink-0 transition-transform duration-300 [[data-panel-open]>&]:rotate-180 [[data-panel-open]>&]:self-start [[data-panel-open]>&]:mt-1" />
          </div>
        </Collapsible.Trigger>

        <Collapsible.Panel className="overflow-hidden h-[var(--collapsible-panel-height)] transition-all duration-300 ease-in-out data-[starting-style]:h-0 data-[ending-style]:h-0">
          <div className="flex flex-col gap-metro-xl px-metro-lg pb-metro-lg">
            <Field.Root>
              <Field.Label className="text-metro-xs text-metro-foreground-muted mb-metro-xs block">
                Email address
              </Field.Label>
              <Input
                defaultValue={email}
                className="w-full px-metro-md py-metro-sm bg-metro-surface-element rounded-metro-input text-metro-sm text-metro-foreground outline-none border border-transparent focus:border-metro-primary transition-colors"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label className="text-metro-xs text-metro-foreground-muted mb-metro-xs block">
                Mobile number
              </Field.Label>
              <Input
                defaultValue={mobile}
                className="w-full px-metro-md py-metro-sm bg-metro-surface-element rounded-metro-input text-metro-sm text-metro-foreground outline-none border border-transparent focus:border-metro-primary transition-colors"
              />
            </Field.Root>
          </div>
        </Collapsible.Panel>
      </div>
    </Collapsible.Root>
  )
}

export function WhosInvolvedScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader progress={55} />

      <div className="flex-1 px-metro-lg overflow-y-auto pb-[100px]">
        <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground mb-metro-lg mt-metro-lg">
          Contact details
        </h1>

        <div className="flex flex-col gap-metro-md">
          <PersonCard
            initials="JD"
            name="James Davidson"
            subtitle="Director"
            email="james.davidson@company.co.uk"
            mobile="+44 7700 900123"
            defaultOpen={true}
            bg="bg-violet-100"
            text="text-violet-600"
          />

          <PersonCard
            initials="SL"
            name="Sarah Langford"
            subtitle="Director"
            email="sarah.langford@company.co.uk"
            mobile="+44 7700 900456"
            defaultOpen={false}
            detailsAdded
            bg="bg-emerald-100"
            text="text-emerald-600"
          />

          <button className="w-full flex items-center justify-center gap-metro-sm text-metro-primary text-metro-sm font-medium underline cursor-pointer bg-transparent border-none hover:text-metro-primary-hover transition-colors">
            Add another person
          </button>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="px-metro-lg py-metro-lg bg-metro-surface">
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Next
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
