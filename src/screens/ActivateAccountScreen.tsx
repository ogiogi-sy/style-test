import { StatusBar } from './shared/StatusBar'
import {
  ShieldCheckIcon,
  UserIcon,
  ChevronRightIcon,
  HomeIcon,
  WalletIcon,
  ChartIcon,
  ArrowLeftRightIcon,
} from './shared/Icons'
import avatar from '../assets/avatar.png'
import pulseCard1 from '../assets/Pulse-card-1.png'
import pulseCard2 from '../assets/Pulse-card-2.png'
import pulseCard3 from '../assets/Pulse-card-3.png'
import pulseCard4 from '../assets/Pulse-card-4.png'

const tasks = [
  {
    icon: ShieldCheckIcon,
    title: 'Set up payment rules',
    status: 'Requires action',
  },
  {
    icon: UserIcon,
    title: 'Team Verification',
    status: 'Waiting for team members',
  },
]

const tabs = [
  { icon: HomeIcon, label: 'Home', active: true },
  { icon: WalletIcon, label: 'Accounts', active: false },
  { icon: ChartIcon, label: 'Insights', active: false },
  { icon: ArrowLeftRightIcon, label: 'Payments', active: false },
]

function CardFan() {
  return (
    <div className="flex items-center justify-center h-[280px] w-full">
      <div className="relative w-[160px] h-[222px]">
        <img src={pulseCard4} alt="" className="fan-card fan-card-1 absolute inset-0 w-[160px] h-auto max-w-none" />
        <img src={pulseCard3} alt="" className="fan-card fan-card-2 absolute inset-0 w-[160px] h-auto max-w-none" />
        <img src={pulseCard2} alt="" className="fan-card fan-card-3 absolute inset-0 w-[160px] h-auto max-w-none" />
        <img src={pulseCard1} alt="" className="fan-card fan-card-4 absolute inset-0 w-[160px] h-auto max-w-none" />
      </div>

      <style>{`
        .fan-card {
          transform-origin: center center;
          will-change: transform;
        }
        .fan-card-1 {
          transform: rotate(-15deg);
          animation: fanOut1 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .fan-card-2 {
          transform: rotate(-10deg);
          animation: fanOut2 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
        }
        .fan-card-3 {
          transform: rotate(-5deg);
          animation: fanOut3 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both;
        }
        .fan-card-4 {
          transform: rotate(0deg);
          animation: fanOut4 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        @keyframes fanOut1 {
          0%   { transform: rotate(0deg); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: rotate(-15deg); opacity: 1; }
        }
        @keyframes fanOut2 {
          0%   { transform: rotate(0deg); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: rotate(-10deg); opacity: 1; }
        }
        @keyframes fanOut3 {
          0%   { transform: rotate(0deg); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: rotate(-5deg); opacity: 1; }
        }
        @keyframes fanOut4 {
          0%   { transform: rotate(0deg); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export function ActivateAccountScreen() {
  return (
    <div className="flex flex-col h-full bg-metro-surface">
      <StatusBar />

      {/* Header: Greeting + Avatar */}
      <div className="flex items-center justify-between px-metro-lg py-metro-md">
        <h1 className="text-metro-2xl font-metro-display font-light text-metro-foreground">
          Hello Sarah
        </h1>
        <img src={avatar} alt="Sarah" className="w-[40px] h-[40px] rounded-full object-cover" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Cards illustration */}
        <div className="pt-metro-md" />
        <CardFan />

        {/* Title + subtitle */}
        <div className="flex flex-col items-center gap-metro-sm px-metro-lg pb-metro-lg">
          <h2 className="text-metro-2xl font-metro-display font-light text-metro-foreground text-center">
            Activate your account
          </h2>
          <p className="text-metro-sm text-metro-foreground-muted text-center leading-[20px]">
            You're almost there. Complete the remaining 3 tasks to activate your account.
          </p>
        </div>

        {/* Task cards */}
        <div className="px-metro-lg pb-metro-lg">
          <div className="border border-metro-border rounded-metro-card p-metro-md shadow-metro-sm flex flex-col gap-metro-lg">
            {tasks.map((task) => (
              <div key={task.title} className="flex items-center gap-metro-sm">
                <div className="w-[48px] h-[48px] rounded-full bg-metro-primary/5 flex items-center justify-center shrink-0">
                  <task.icon className="w-5 h-5 text-metro-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-metro-lg font-metro-display font-medium text-metro-foreground truncate">
                    {task.title}
                  </p>
                  <p className="text-metro-sm text-[#bd5b00]">
                    {task.status}
                  </p>
                </div>
                <ChevronRightIcon className="w-6 h-6 text-metro-foreground-muted shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div className="border-t border-metro-border bg-metro-surface px-metro-sm pb-metro-lg pt-metro-sm">
        <div className="flex items-start justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`flex flex-col items-center gap-[2px] bg-transparent border-none cursor-pointer ${
                tab.active ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <tab.icon className={`w-6 h-6 ${tab.active ? 'text-metro-primary' : 'text-metro-foreground-muted'}`} />
              </div>
              <span className={`text-metro-xs ${tab.active ? 'font-semibold text-metro-primary' : 'text-metro-foreground-muted'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
