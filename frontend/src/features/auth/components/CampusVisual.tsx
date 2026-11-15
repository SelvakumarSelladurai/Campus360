import { FiBookOpen, FiCheckCircle, FiShield, FiUsers } from 'react-icons/fi'

interface CampusVisualProps {
  compact?: boolean
}

export function CampusVisual({ compact = false }: CampusVisualProps) {
  if (compact) {
    return (
      <div className="relative flex size-full items-center justify-center overflow-hidden" aria-hidden="true">
        {/* Background ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.18)_0%,transparent_70%)]" />

        {/* Orbit ring */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-400/30 animate-spin-cw">
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* Radar ping */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 animate-radar-1" />

        {/* Core emblem */}
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-blue-400/40 bg-gradient-to-br from-[#1d3568] via-[#142345] to-[#0d162d] shadow-[0_0_24px_rgba(59,130,246,0.35)] backdrop-blur-md">
          <span className="grid size-6 rotate-[-8deg] grid-cols-2 grid-rows-2 gap-1" aria-hidden="true">
            <i className="rounded-[2px] bg-brand" />
            <i className="rounded-[5px_2px_2px] bg-cyan-400" />
            <i className="rounded-[2px_2px_5px] bg-blue-300" />
            <i className="rounded-[2px] bg-indigo-400" />
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative isolate mx-auto flex aspect-[1.12/1] w-full max-w-[560px] select-none items-center justify-center"
      aria-hidden="true"
    >
      {/* Dynamic SVG Data Streaming Beams connecting Core to Satellite Cards */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 560 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="streamGrad1" x1="280" y1="250" x2="130" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="streamGrad2" x1="280" y1="250" x2="430" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="streamGrad3" x1="280" y1="250" x2="130" y2="395" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="streamGrad4" x1="280" y1="250" x2="430" y2="395" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Connector to Top-Left (Students) */}
        <path
          id="pathStudents"
          d="M 280 250 C 220 220, 175 165, 130 105"
          stroke="url(#streamGrad1)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-data-stream"
        />
        <circle r="3" fill="#a5b4fc" className="shadow-[0_0_8px_#818cf8]">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 280 250 C 220 220, 175 165, 130 105" />
        </circle>

        {/* Connector to Top-Right (Attendance) */}
        <path
          id="pathAttendance"
          d="M 280 250 C 340 220, 385 165, 430 105"
          stroke="url(#streamGrad2)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-data-stream"
        />
        <circle r="3" fill="#6ee7b7" className="shadow-[0_0_8px_#34d399]">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 280 250 C 340 220, 385 165, 430 105" />
        </circle>

        {/* Connector to Bottom-Left (Security) */}
        <path
          id="pathSecurity"
          d="M 280 250 C 220 280, 175 335, 130 395"
          stroke="url(#streamGrad3)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-data-stream"
        />
        <circle r="3" fill="#7dd3fc" className="shadow-[0_0_8px_#38bdf8]">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 280 250 C 220 280, 175 335, 130 395" />
        </circle>

        {/* Connector to Bottom-Right (Academics) */}
        <path
          id="pathAcademics"
          d="M 280 250 C 340 280, 385 335, 430 395"
          stroke="url(#streamGrad4)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-data-stream"
        />
        <circle r="3" fill="#fde68a" className="shadow-[0_0_8px_#fbbf24]">
          <animateMotion dur="3.1s" repeatCount="indefinite" path="M 280 250 C 340 280, 385 335, 430 395" />
        </circle>
      </svg>

      {/* Pulsing Radar Expansion Rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-48 rounded-full border border-blue-400/25 animate-radar-1" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-48 rounded-full border border-cyan-400/20 animate-radar-2" />

      {/* Orbit 1: Inner Stable Ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/15">
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-400/40" />
        <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-blue-400/40" />
        <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-blue-400/40" />
        <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full bg-blue-400/40" />
      </div>

      {/* Orbit 2: Mid Dashed Orbit with Satellite (Clockwise) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[340px] rounded-full border border-dashed border-blue-400/25 animate-spin-cw">
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] ring-2 ring-cyan-400/40" />
      </div>

      {/* Orbit 3: Outer Fine Dotted Orbit with Satellite (Counter-Clockwise) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[470px] rounded-full border border-dotted border-indigo-400/20 animate-spin-ccw">
        <span className="absolute -bottom-1.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-indigo-300 shadow-[0_0_10px_#818cf8] ring-2 ring-indigo-400/40" />
      </div>

      {/* Central Campus360 Hub Emblem */}
      <div className="group relative z-10 flex flex-col items-center">
        {/* Breathing glowing halo */}
        <div className="absolute left-1/2 top-1/2 size-28 rounded-full bg-brand/30 blur-xl animate-core-pulse" />

        <div className="relative flex size-24 items-center justify-center rounded-3xl border border-blue-300/35 bg-gradient-to-br from-[#1d3770] via-[#14264e] to-[#0c1833] p-1.5 shadow-[0_0_36px_rgba(49,93,232,0.45)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-105">
          {/* Inner ring highlight */}
          <div className="absolute inset-1.5 rounded-[20px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent" />

          {/* Signature Campus360 tile logo */}
          <span className="relative grid size-10 rotate-[-8deg] grid-cols-2 grid-rows-2 gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <i className="rounded-[3px] bg-brand shadow-[0_0_10px_#315de8]" />
            <i className="rounded-[8px_3px_3px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <i className="rounded-[3px_3px_8px] bg-blue-300 shadow-[0_0_8px_#93c5fd]" />
            <i className="rounded-[3px] bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
          </span>
        </div>

        {/* Center Live Core Status Badge */}
        <div className="mt-3.5 flex items-center gap-2 rounded-full border border-blue-400/25 bg-[#0e1c38]/90 px-3 py-1 text-[10px] font-semibold tracking-wider text-blue-200 shadow-lg backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span>CAMPUS 360 CORE</span>
        </div>
      </div>

      {/* Satellite Card 1: Students & Faculty (Top-Left) */}
      <div className="absolute left-0 top-3 z-20 sm:left-2 animate-card-float-1">
        <div className="group flex items-center gap-3 rounded-xl border border-indigo-400/25 bg-[#122244]/85 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-[#162a54] hover:shadow-[0_14px_32px_rgba(99,102,241,0.25)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
            <FiUsers className="size-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400">Students & Faculty</span>
            <b className="text-xs font-semibold tracking-tight text-white">12,450+ Enrolled</b>
            <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Directory Sync
            </span>
          </div>
        </div>
      </div>

      {/* Satellite Card 2: Smart Attendance (Top-Right) */}
      <div className="absolute right-0 top-3 z-20 sm:right-2 animate-card-float-2">
        <div className="group flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-[#122244]/85 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-[#162a54] hover:shadow-[0_14px_32px_rgba(16,185,129,0.25)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
            <FiCheckCircle className="size-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400">Smart Attendance</span>
            <b className="text-xs font-semibold tracking-tight text-white">98.4% Checked In</b>
            <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Period 3 In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Satellite Card 3: Security & Governance (Bottom-Left) */}
      <div className="absolute bottom-3 left-0 z-20 sm:left-2 animate-card-float-3">
        <div className="group flex items-center gap-3 rounded-xl border border-cyan-400/25 bg-[#122244]/85 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#162a54] hover:shadow-[0_14px_32px_rgba(6,182,212,0.25)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30">
            <FiShield className="size-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400">Institution Security</span>
            <b className="text-xs font-semibold tracking-tight text-white">SSO & 2FA Enforced</b>
            <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-cyan-300">
              <span className="size-1.5 rounded-full bg-cyan-400" />
              FERPA / GDPR Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Satellite Card 4: Academic Workflows (Bottom-Right) */}
      <div className="absolute bottom-3 right-0 z-20 sm:right-2 animate-card-float-4">
        <div className="group flex items-center gap-3 rounded-xl border border-amber-400/25 bg-[#122244]/85 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-[#162a54] hover:shadow-[0_14px_32px_rgba(245,158,11,0.25)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30">
            <FiBookOpen className="size-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400">Academic Workflows</span>
            <b className="text-xs font-semibold tracking-tight text-white">Gradebooks Synced</b>
            <span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-amber-300">
              <span className="size-1.5 rounded-full bg-amber-400" />
              Automated GPA Calculation
            </span>
          </div>
        </div>
      </div>

      {/* Ambient Twinkling Cosmic Particles */}
      <span className="pointer-events-none absolute right-[22%] top-[18%] size-1.5 rounded-full bg-blue-300 shadow-[0_0_8px_#93c5fd] animate-twinkle" />
      <span
        className="pointer-events-none absolute bottom-[24%] left-[20%] size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9] animate-twinkle"
        style={{ animationDelay: '1.2s' }}
      />
      <span
        className="pointer-events-none absolute bottom-[32%] right-[16%] size-1 rounded-full bg-indigo-300 shadow-[0_0_6px_#a5b4fc] animate-twinkle"
        style={{ animationDelay: '2.1s' }}
      />
      <span
        className="pointer-events-none absolute left-[26%] top-[28%] size-1 rounded-full bg-amber-300 shadow-[0_0_6px_#fde68a] animate-twinkle"
        style={{ animationDelay: '0.7s' }}
      />
    </div>
  )
}
