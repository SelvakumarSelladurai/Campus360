import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface SlideItem {
  id: string
  tag: string
  number: string
  quote: string
  highlight: string
  description: string
  accentColor: string
  accentBorder: string
}

const slides: SlideItem[] = [
  {
    id: 'academics',
    tag: 'ACADEMICS',
    number: '01',
    quote: 'Every part of campus life,',
    highlight: 'moving in sync.',
    description: 'Unified admissions, academic governance, and daily classroom operations on one intuitive platform.',
    accentColor: 'bg-blue-400',
    accentBorder: 'border-blue-400/30',
  },
  {
    id: 'people',
    tag: 'PEOPLE',
    number: '02',
    quote: 'Real-time visibility for faculty,',
    highlight: 'zero administrative delay.',
    description: 'Instant attendance analytics, grade approvals, and direct communication for teachers and parents.',
    accentColor: 'bg-emerald-400',
    accentBorder: 'border-emerald-400/30',
  },
  {
    id: 'possibility',
    tag: 'POSSIBILITY',
    number: '03',
    quote: 'Enterprise-grade trust,',
    highlight: 'built for higher education.',
    description: 'Single sign-on, institutional role-based governance, audit logging, and high-availability cloud.',
    accentColor: 'bg-indigo-400',
    accentBorder: 'border-indigo-400/30',
  },
]

const SLIDE_DURATION_MS = 6000

export function CampusShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length)
      setProgressKey((k) => k + 1)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(timer)
  }, [isPaused, activeIdx])

  const goToSlide = (idx: number) => {
    setActiveIdx(idx)
    setProgressKey((k) => k + 1)
  }

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length)
    setProgressKey((k) => k + 1)
  }

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % slides.length)
    setProgressKey((k) => k + 1)
  }

  const current = slides[activeIdx]

  return (
    <section
      className="mt-6 flex flex-col gap-6"
      aria-label="Campus360 platform highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Quote & Navigation Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Animated vertical accent bar */}
            <span
              className={`mt-1.5 h-12 w-1 shrink-0 rounded-full transition-colors duration-500 ${current.accentColor}`}
              aria-hidden="true"
            />

            {/* Dynamic Animated Quote Block */}
            <div key={current.id} className="animate-[rise-in_400ms_cubic-bezier(.2,.8,.2,1)_both]">
              <p className="m-0 font-display text-[clamp(18px,2.1vw,24px)] font-normal leading-[1.35] text-slate-200">
                {current.quote}
                <br />
                <strong className="font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                  {current.highlight}
                </strong>
              </p>
              <p className="mt-2 max-w-md text-xs leading-5 text-slate-400">{current.description}</p>
            </div>
          </div>

          {/* Slide Indicator & Controls */}
          <div className="flex shrink-0 flex-col items-end gap-2.5">
            <div className="flex items-center gap-2 text-xs tracking-wider text-slate-400">
              <span className="font-semibold text-white">{current.number}</span>

              {/* Animated Progress Bar */}
              <div className="relative h-[3px] w-12 overflow-hidden rounded-full bg-slate-700/60">
                <div
                  key={progressKey}
                  style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                  className={`h-full rounded-full transition-all duration-300 ${current.accentColor} ${
                    isPaused ? 'w-full' : 'w-full animate-[progress-timer_6000ms_linear_both]'
                  }`}
                />
              </div>

              <span>03</span>
            </div>

            {/* Interactive Previous / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous highlight slide"
                className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-brand"
              >
                <FiChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next highlight slide"
                className="grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-brand"
              >
                <FiChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter / Jump Tabs */}
      <nav className="flex flex-wrap items-center gap-2 pt-2" aria-label="Campus feature categories">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-current={isActive ? 'true' : undefined}
              className={`group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? 'border border-blue-400/30 bg-blue-500/20 text-white shadow-[0_0_12px_rgba(59,130,246,0.25)]'
                  : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <span
                className={`size-1.5 rounded-full transition-all duration-300 ${
                  isActive ? `${slide.accentColor} shadow-[0_0_8px_currentColor]` : 'bg-slate-600 group-hover:bg-slate-400'
                }`}
              />
              <span>{slide.tag}</span>
            </button>
          )
        })}
      </nav>
    </section>
  )
}
