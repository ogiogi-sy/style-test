import { useRef, useState, useCallback } from 'react'
import { Button } from '@base-ui/react/button'
import { CheckIcon, InfoIcon, BackArrowIcon, LockIcon } from '../shared/Icons'
import pulseCard from '../../assets/pulse@2x.png'
import hsbcLogo from '../../assets/hsbc-logo.png'
import barclaysLogo from '../../assets/barclays-logo.png'
import lloydsLogo from '../../assets/lloyds-logo.png'
import metroLogo from '../../assets/logo-small.svg'

const benefits = [
  'Reduces the amount of form filling for you',
  'Instant verification of your business',
  'Works with UK banks offering Open Banking',
]

function BankPill({ logo, name, bg = 'bg-[#f5f5f5]' }: { logo: string; name: string; bg?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#e7e7e7] bg-white/90 backdrop-blur-[3px] py-[5px] pl-[5px] pr-3">
      <div className={`${bg} border-[2px] border-white rounded-full p-[5px] shrink-0`}>
        <img src={logo} alt={name} className="w-[28px] h-[28px] rounded-[5px] object-cover" />
      </div>
      <span className="text-[12px] font-medium text-metro-foreground whitespace-nowrap">{name}</span>
    </div>
  )
}

function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -10, y: dx * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-[500px] flex items-center justify-center"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="relative w-[360px] h-[360px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        <div className="hero-ring hero-ring-outer absolute inset-0 rounded-full border border-metro-primary/20" />
        <div className="hero-ring hero-ring-mid absolute inset-[28px] rounded-full border border-metro-primary/20" />
        <div className="hero-ring hero-ring-inner absolute inset-[56px] rounded-full border border-metro-primary/20" />
        <div className="hero-card absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%) translateZ(30px)' }}>
          <img src={pulseCard} alt="Pulse Business card" className="w-[280px] max-w-none h-auto" />
        </div>
        <div className="hero-pill hero-pill-1 absolute -left-[20px] top-[65px]" style={{ transform: 'translateZ(40px)' }}>
          <BankPill logo={hsbcLogo} name="HSBC" />
        </div>
        <div className="hero-pill hero-pill-2 absolute -right-[46px] top-1/2" style={{ transform: 'translateY(-50%) translateZ(45px)' }}>
          <BankPill logo={barclaysLogo} name="Barclays" />
        </div>
        <div className="hero-pill hero-pill-3 absolute left-1/2 -bottom-[12px]" style={{ transform: 'translateX(-50%) translateZ(35px)' }}>
          <BankPill logo={lloydsLogo} name="Lloyds" bg="bg-[#11b67a]" />
        </div>
      </div>
      <style>{`
        .hero-ring { opacity: 0; animation: ringFadeIn 0.6s ease-out forwards; }
        .hero-ring-inner { animation-delay: 0.1s; }
        .hero-ring-mid   { animation-delay: 0.25s; }
        .hero-ring-outer  { animation-delay: 0.4s; }
        @keyframes ringFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 0.6; transform: scale(1); }
        }
        .hero-card { opacity: 0; animation: cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translate(-50%, -50%) translateZ(30px) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) translateZ(30px) scale(1); }
        }
        .hero-pill { opacity: 0; }
        .hero-pill-1 { animation: pillFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; }
        .hero-pill-2 { animation: pillFromRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards; }
        .hero-pill-3 { animation: pillFromBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards; }
        @keyframes pillFromLeft {
          from { opacity: 0; transform: translateX(-20px) translateZ(40px); }
          to { opacity: 1; transform: translateX(0) translateZ(40px); }
        }
        @keyframes pillFromRight {
          from { opacity: 0; transform: translateY(-50%) translateX(20px) translateZ(45px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0) translateZ(45px); }
        }
        @keyframes pillFromBottom {
          from { opacity: 0; transform: translateX(-50%) translateY(15px) translateZ(35px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) translateZ(35px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function WebConnectBankScreen() {
  return (
    <div className="min-h-screen bg-metro-surface flex flex-col">
      {/* Top nav */}
      <nav className="px-metro-3xl py-metro-lg flex items-center justify-between">
        <img src={metroLogo} alt="Metro Bank" className="h-8 w-auto" />
        <button className="text-metro-sm font-medium text-metro-foreground rounded-full border border-metro-border px-metro-md py-metro-xs bg-transparent cursor-pointer hover:bg-metro-surface-element transition-colors">Sign In</button>
      </nav>

      {/* Main content — two panel layout */}
      <div className="flex-1 flex items-stretch px-metro-3xl py-metro-lg gap-metro-3xl">
        {/* Left panel */}
        <div className="w-[480px] shrink-0 flex flex-col px-metro-lg">
          {/* Top — progress bar */}
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

          {/* Middle — content (vertically centered) */}
          <div className="flex-1 flex flex-col justify-center animate-[fadeUp_0.5s_ease-out_0.1s_both]">
            <h1 className="text-metro-3xl font-metro-display font-light text-metro-foreground mb-metro-sm">
              Connect your bank
            </h1>
            <p className="text-metro-md text-metro-foreground-muted mb-metro-2xl">
              Speed things up by connecting your business bank account securely through Open Banking.
            </p>

            <div className="flex flex-col gap-metro-md">
              {benefits.map((text) => (
                <div key={text} className="flex items-center gap-metro-md">
                  <div className="w-5 h-5 rounded-full bg-metro-primary/10 flex items-center justify-center shrink-0">
                    <CheckIcon className="w-3 h-3 text-metro-primary" />
                  </div>
                  <p className="text-metro-md text-metro-foreground-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — CTA + Skip + Security */}
          <div className="pb-metro-sm animate-[fadeUp_0.5s_ease-out_0.2s_both] flex flex-col gap-metro-md">
            <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-md font-medium cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
              Connect bank account
            </Button>

            <button className="w-full flex items-center justify-center text-metro-foreground-muted text-metro-sm underline cursor-pointer bg-transparent border-none hover:text-metro-foreground transition-colors">
              Skip
            </button>

            <div className="flex items-center justify-center gap-metro-xs mt-metro-sm">
              <LockIcon className="w-3.5 h-3.5 text-metro-foreground-muted/50" />
              <span className="text-metro-xs text-metro-foreground-muted/50">
                Secure Open Banking connection
              </span>
            </div>
          </div>
        </div>

        {/* Right panel — illustration box */}
        <div className="flex-1 bg-metro-surface-element rounded-[32px] flex flex-col items-center justify-center">
          <HeroIllustration />
        </div>
      </div>
    </div>
  )
}
