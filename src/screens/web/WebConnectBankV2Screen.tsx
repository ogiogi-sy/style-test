import { Button } from '@base-ui/react/button'
import { CheckIcon, InfoIcon, BackArrowIcon } from '../shared/Icons'
import hsbcLogo from '../../assets/hsbc-logo.png'
import barclaysLogo from '../../assets/barclays-logo.png'
import lloydsLogo from '../../assets/lloyds-logo.png'
import metroLogo from '../../assets/logo-small.svg'
import metroLogoWhite from '../../assets/logo-small-white.svg'
import avatar from '../../assets/avatar.png'
import heroPhoto from '../../assets/connect-bank-hero.png'

const benefits = [
  'Less form filling',
  'Faster verification',
  'Works with UK Open Banking',
]

function BankPill({ logo, name, bg = 'bg-[#f5f5f5]' }: { logo: string; name: string; bg?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#e7e7e7] bg-white/90 backdrop-blur-[4px] py-[6px] pl-[6px] pr-3">
      <div className={`${bg} border-[3px] border-white rounded-full p-[6px] shrink-0`}>
        <img src={logo} alt={name} className="w-[32px] h-[32px] rounded-[6px] object-cover" />
      </div>
      <span className="text-[13px] font-medium text-metro-foreground whitespace-nowrap">{name}</span>
    </div>
  )
}

function MetroAccountCard() {
  return (
    <div className="bg-white/90 backdrop-blur-[4px] border-[1.5px] border-[#e7e7e7] rounded-metro-card overflow-hidden w-[220px]">
      <div className="flex items-center gap-3 p-3 border-b border-[#e7e7e7]">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
          <img src={metroLogoWhite} alt="Metro" className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-metro-foreground leading-tight">Metro Business</p>
          <p className="text-[11px] font-light text-metro-foreground leading-tight mt-1">Main Account</p>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[15px] text-metro-foreground">IBAN 13 07990 78000</p>
      </div>
    </div>
  )
}

export function WebConnectBankV2Screen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Header */}
      <nav className="px-metro-3xl py-metro-lg flex items-center justify-between">
        <img src={metroLogo} alt="Metro Bank" className="h-8 w-auto" />
        <img src={avatar} alt="User" className="w-8 h-8 rounded-full object-cover" />
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-stretch px-metro-3xl py-metro-lg gap-metro-3xl">
        {/* Left panel */}
        <div className="w-[480px] shrink-0 flex flex-col gap-[32px] pt-[24px] px-[24px]">
          {/* Progress bar */}
          <div className="animate-[fadeUp_0.4s_ease-out]">
            <div className="flex items-center gap-metro-2xl pt-metro-sm">
              <button className="shrink-0 cursor-pointer bg-transparent border-none p-0">
                <BackArrowIcon className="w-6 h-6 text-metro-foreground-muted" />
              </button>
              <div className="flex-1 h-1 bg-metro-surface-element rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-metro-primary rounded-full" />
              </div>
              <button className="shrink-0 cursor-pointer bg-transparent border-none p-0">
                <InfoIcon className="w-6 h-6 text-metro-foreground-muted" />
              </button>
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="flex flex-col gap-[10px] animate-[fadeUp_0.5s_ease-out_0.1s_both]">
            <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground">
              Connect your bank
            </h1>
            <p className="text-metro-md text-metro-foreground-muted">
              Connect your bank to speed up your application.
            </p>
          </div>

          {/* Benefits list — flex-1 pushes info box to the bottom */}
          <div className="flex-1 flex flex-col gap-metro-md animate-[fadeUp_0.5s_ease-out_0.15s_both]">
            {benefits.map((text) => (
              <div key={text} className="flex items-center gap-metro-md">
                <div className="w-5 h-5 rounded-full bg-metro-primary/10 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-metro-primary" />
                </div>
                <p className="text-metro-md text-metro-foreground-muted">{text}</p>
              </div>
            ))}
          </div>

          {/* Info box — sits at the bottom, just above CTA */}
          <div className="flex items-start gap-metro-md bg-[#f2f6fb] rounded-metro-card p-metro-md animate-[fadeUp_0.5s_ease-out_0.2s_both]">
            <InfoIcon className="w-6 h-6 text-metro-primary shrink-0 mt-0.5" />
            <p className="text-metro-md text-metro-primary leading-relaxed">
              You can disconnect at any time but please wait until your application has been fully approved.
            </p>
          </div>

          {/* CTA section */}
          <div className="pb-[32px] pt-metro-md animate-[fadeUp_0.5s_ease-out_0.25s_both] flex flex-col gap-[12px]">
            <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
              Connect bank account
            </Button>

            <button className="w-full flex items-center justify-center text-metro-foreground-muted text-metro-sm underline cursor-pointer bg-transparent border-none hover:text-metro-foreground transition-colors">
              Skip
            </button>
          </div>
        </div>

        {/* Right panel — photo with floating overlays */}
        <div className="flex-1 flex items-center justify-center relative animate-[fadeUp_0.5s_ease-out_0.15s_both]">
          {/* Photo card — fixed size, centered */}
          <div className="relative w-[440px] h-[580px] rounded-[24px] overflow-hidden shrink-0">
            <img
              src={heroPhoto}
              alt="Two people banking together"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Bank pills — positioned relative to the photo, overlapping its right edge */}
          <div className="bank-pill absolute top-[calc(50%-250px)] right-[calc(50%-300px)]" style={{ animationDelay: '0.5s' }}>
            <BankPill logo={barclaysLogo} name="Barclays" />
          </div>
          <div className="bank-pill absolute top-[calc(50%-160px)] right-[calc(50%-330px)]" style={{ animationDelay: '0.65s' }}>
            <BankPill logo={hsbcLogo} name="HSBC" />
          </div>
          <div className="bank-pill absolute top-[calc(50%-70px)] right-[calc(50%-310px)]" style={{ animationDelay: '0.8s' }}>
            <BankPill logo={lloydsLogo} name="Lloyds" bg="bg-[#11b67a]" />
          </div>

          {/* Metro Business account card — overlapping bottom-left of photo */}
          <div className="bank-pill absolute bottom-[calc(50%-240px)] left-[calc(50%-280px)]" style={{ animationDelay: '0.9s' }}>
            <MetroAccountCard />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bank-pill {
          opacity: 0;
          animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  )
}
