import { useRef, useState, useCallback } from 'react'
import { Button } from '@base-ui/react/button'
import { ScreenHeader } from './shared/ScreenHeader'
import { InfoIcon, CheckIcon, LockIcon } from './shared/Icons'
import pulseCard from '../assets/pulse@2x.png'
import hsbcLogo from '../assets/hsbc-logo.png'
import barclaysLogo from '../assets/barclays-logo.png'
import lloydsLogo from '../assets/lloyds-logo.png'

const benefits = [
  'Reduces the amount of form filling for you',
  'Instant verification of your business',
  'Works with UK banks offering Open Banking',
]

function BankPill({ logo, name, bg = 'bg-[#f5f5f5]' }: { logo: string; name: string; bg?: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-[#e7e7e7] bg-white/90 backdrop-blur-[3px] py-[4px] pl-[4px] pr-2">
      <div className={`${bg} border-[2px] border-white rounded-full p-[4px] shrink-0`}>
        <img src={logo} alt={name} className="w-[22px] h-[22px] rounded-[4px] object-cover" />
      </div>
      <span className="text-[9px] font-medium text-metro-foreground whitespace-nowrap">{name}</span>
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
      className="relative h-[315px] w-full flex items-center justify-center"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Centered container — all elements positioned relative to this */}
      <div
        className="relative w-[282px] h-[282px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Concentric circles — static rings */}
        <div className="hero-ring hero-ring-outer absolute inset-0 rounded-full border border-metro-primary/20" />
        <div className="hero-ring hero-ring-mid absolute inset-[26px] rounded-full border border-metro-primary/20" />
        <div className="hero-ring hero-ring-inner absolute inset-[53px] rounded-full border border-metro-primary/20" />

        {/* Pulse Business card — centered, entrance animation */}
        <div className="hero-card absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%) translateZ(30px)' }}>
          <img src={pulseCard} alt="Pulse Business card" className="w-[220px] max-w-none h-auto" />
        </div>

        {/* Bank pills — positioned around the circles with depth + entrance */}
        <div className="hero-pill hero-pill-1 absolute -left-[10px] top-[56px]" style={{ transform: 'translateZ(40px)' }}>
          <BankPill logo={hsbcLogo} name="HSBC" />
        </div>
        <div className="hero-pill hero-pill-2 absolute -right-[32px] top-1/2" style={{ transform: 'translateY(-50%) translateZ(45px)' }}>
          <BankPill logo={barclaysLogo} name="Barclays" />
        </div>
        <div className="hero-pill hero-pill-3 absolute left-1/2 -bottom-[6px]" style={{ transform: 'translateX(-50%) translateZ(35px)' }}>
          <BankPill logo={lloydsLogo} name="Lloyds" bg="bg-[#11b67a]" />
        </div>
      </div>

      <style>{`
        /* Rings fade in sequentially */
        .hero-ring {
          opacity: 0;
          animation: ringFadeIn 0.6s ease-out forwards;
        }
        .hero-ring-inner { animation-delay: 0.1s; }
        .hero-ring-mid   { animation-delay: 0.25s; }
        .hero-ring-outer  { animation-delay: 0.4s; }

        @keyframes ringFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 0.6; transform: scale(1); }
        }

        /* Card scales up */
        .hero-card {
          opacity: 0;
          animation: cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) translateZ(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) translateZ(30px) scale(1);
          }
        }

        /* Pills slide in from their direction */
        .hero-pill {
          opacity: 0;
        }
        .hero-pill-1 {
          animation: pillFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }
        .hero-pill-2 {
          animation: pillFromRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards;
        }
        .hero-pill-3 {
          animation: pillFromBottom 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
        }

        @keyframes pillFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px) translateZ(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(40px);
          }
        }
        @keyframes pillFromRight {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(20px) translateZ(45px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0) translateZ(45px);
          }
        }
        @keyframes pillFromBottom {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(15px) translateZ(35px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) translateZ(35px);
          }
        }
      `}</style>
    </div>
  )
}

export function ConnectBankScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <ScreenHeader
        progress={25}
        rightIcon={<InfoIcon className="w-5 h-5 text-metro-foreground" />}
      />

      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Hero illustration */}
        <div className="pt-metro-lg" />
        <HeroIllustration />

        {/* Title + benefits */}
        <div className="flex-1 flex flex-col px-metro-lg pt-metro-lg pb-metro-lg">
          <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground text-center mb-metro-md">
            Connect your bank
          </h1>

          <div className="flex flex-col gap-metro-md w-full">
            {benefits.map((text) => (
              <div key={text} className="flex items-center gap-metro-md">
                <div className="w-5 h-5 rounded-full border-[1.5px] border-metro-primary flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-metro-primary" />
                </div>
                <p className="text-metro-sm text-metro-foreground-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA area */}
      <div className="px-metro-lg pt-metro-md pb-metro-xl bg-metro-surface flex flex-col items-center gap-metro-sm">
        {/* Security note */}
        <div className="flex items-center gap-metro-xs mb-metro-xs">
          <LockIcon className="w-4 h-4 text-metro-foreground-muted" />
          <span className="text-metro-xs text-metro-foreground-muted">
            Secure Open Banking connection
          </span>
        </div>

        {/* Primary CTA */}
        <Button className="w-full flex items-center justify-center gap-metro-sm px-metro-lg py-3.5 bg-metro-primary text-metro-primary-foreground rounded-metro-button text-metro-sm font-medium shadow-metro-sm cursor-pointer hover:bg-metro-primary-hover active:bg-metro-primary-active transition-colors">
          Connect bank account
        </Button>

        {/* Ghost CTA */}
        <button className="w-full flex items-center justify-center gap-metro-sm text-metro-primary text-metro-sm font-medium underline cursor-pointer bg-transparent border-none hover:text-metro-primary-hover transition-colors py-metro-xs">
          Skip
        </button>
      </div>
    </div>
  )
}
