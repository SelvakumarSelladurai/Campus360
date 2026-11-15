import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiShield } from 'react-icons/fi'
import { CampusShowcase } from '../components/CampusShowcase'
import { CampusVisual } from '../components/CampusVisual'
import { loginSchema, type LoginFormValues } from '../schemas/login.schema'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberEmail: false },
  })

  const onSubmit = handleSubmit(async () => {
    setNotice('Sign-in is ready to connect when the institution authentication service is configured.')
  })

  return (
    <main className="grid min-h-dvh grid-cols-1 bg-canvas lg:grid-cols-[48%_1fr]">
      {/* Left Column: Sign-in Form */}
      <section className="flex flex-col justify-between bg-white px-6 py-6 sm:px-10 lg:px-[clamp(42px,7vw,112px)] lg:py-8" aria-labelledby="welcome-title">
        <div className="mx-auto flex w-full max-w-96 flex-1 flex-col justify-center py-4 md:py-8">
          <Link className="inline-flex w-fit items-center gap-2.5 no-underline" to="/" aria-label="Campus360 home">
            <span className="grid size-[31px] rotate-[-8deg] grid-cols-2 grid-rows-2 gap-[3px]" aria-hidden="true">
              <i className="rounded-[3px] bg-brand" />
              <i className="rounded-[8px_3px_3px] bg-brand/70" />
              <i className="rounded-[3px_3px_8px] bg-brand/50" />
              <i className="rounded-[3px] bg-brand/90" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-[-1px] text-[#17243c]">
              campus<span className="text-brand">360</span>
            </span>
          </Link>

          {/* Mobile Visual Header */}
          <div className="mt-5 h-[126px] overflow-hidden rounded-xl border border-[#e6ebf5] bg-[radial-gradient(ellipse_at_50%_50%,#1a2f58,#0f1c37_85%)] shadow-inner lg:hidden" aria-hidden="true">
            <CampusVisual compact />
          </div>

          <div className="mt-8 sm:mt-11">
            <p className="mb-3.5 text-[10px] font-bold tracking-[1.75px] text-[#476be2]">YOUR CAMPUS, CONNECTED</p>
            <h1 id="welcome-title" className="m-0 font-display text-[43px] font-bold leading-[1.08] tracking-[-2.5px] text-ink sm:text-[50px]">
              Welcome<br className="hidden lg:block" /> back.
            </h1>
            <p className="mt-3.5 max-w-sm text-[13px] leading-7 text-muted sm:text-sm">
              One secure place for your campus day. Sign in to continue to your institution’s workspace.
            </p>
          </div>

          <form className="mt-7 grid gap-[19px] sm:mt-9 sm:gap-[22px]" onSubmit={onSubmit} noValidate>
            <div className="grid gap-2">
              <label className="text-xs font-semibold text-[#263650]" htmlFor="email">
                Institutional email
              </label>
              <div className={`flex min-h-[51px] items-center gap-3 rounded-[9px] border bg-white px-3.5 transition-[border-color,box-shadow] focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.email ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
                <FiMail className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]"
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="you@institution.edu"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="-mt-1 text-[11px] text-[#b42332]" id="email-error">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#263650]" htmlFor="password">
                  Password
                </label>
                <Link className="text-[11px] font-semibold text-brand hover:text-brand-dark hover:underline hover:underline-offset-4" to="/auth/forgot-password">
                  Forgot password?
                </Link>
              </div>
              <div className={`flex min-h-[51px] items-center gap-3 rounded-[9px] border bg-white px-3.5 transition-[border-color,box-shadow] focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.password ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
                <FiLock className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                />
                <button
                  className="grid size-[30px] shrink-0 place-items-center rounded-md text-[#8491a6] hover:bg-[#f3f6ff] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <FiEyeOff className="size-[17px]" aria-hidden="true" /> : <FiEye className="size-[17px]" aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p className="-mt-1 text-[11px] text-[#b42332]" id="password-error">{errors.password.message}</p>}
            </div>

            <label className="inline-flex w-fit cursor-pointer items-center gap-2 text-xs text-[#647188]">
              <input className="size-4 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" type="checkbox" {...register('rememberEmail')} />
              <span>Remember my email</span>
            </label>

            {notice && <p className="-my-1 rounded-lg border border-[#dce5ff] bg-[#f5f7ff] px-3 py-2.5 text-[11px] leading-5 text-[#3957a7]" role="status">{notice}</p>}

            <button
              className="group flex min-h-[51px] items-center justify-between rounded-[9px] bg-brand px-[19px] text-[13px] font-semibold text-white shadow-[0_5px_12px_rgb(49_93_232_/_19%)] transition duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_7px_17px_rgb(49_93_232_/_24%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-65"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Signing in…' : 'Sign in to your account'}</span>
              <FiArrowRight className="size-[17px] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted">
            New to Campus360? <Link className="font-semibold text-brand hover:text-brand-dark hover:underline hover:underline-offset-4" to="/auth/register">Create an account</Link>
          </p>

          <div className="mt-7 flex items-center gap-3 border-t border-[#edf0f5] pt-4 sm:mt-9 sm:pt-5">
            <span className="grid size-[34px] shrink-0 place-items-center rounded-[9px] bg-[#f0f4ff] text-[#4e6fdb]">
              <FiShield className="size-4" aria-hidden="true" />
            </span>
            <p className="m-0 text-[10px] leading-[1.65] text-[#8792a5]">
              <strong className="text-[11px] font-semibold text-[#52617a]">Your data stays protected.</strong>
              <br />
              Secure access for your campus community.
            </p>
          </div>
          <p className="mt-3.5 text-[10px] text-[#909bad]">Need help signing in? Contact your institution administrator.</p>
        </div>

        <footer className="mx-auto flex w-full max-w-96 justify-between gap-4 text-[10px] text-[#9ba5b5]">
          <span>© {new Date().getFullYear()} Campus360</span>
          <span>Secure campus access</span>
        </footer>
      </section>

      {/* Right Column: Dynamic Animated Campus360 Overview */}
      <aside
        className="relative isolate hidden min-h-dvh flex-col justify-between overflow-hidden bg-[#091326] px-8 py-9 text-white lg:flex xl:px-14 xl:py-10"
        aria-label="Campus360 platform overview"
      >
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,#1c356b_0%,#112144_45%,#091326_85%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(#8ca6e8_0.75px,transparent_0.75px)] [background-size:24px_24px] [mask-image:linear-gradient(transparent,#000_15%,#000_85%,transparent)]" />
        
        {/* Soft glowing ambient orbs */}
        <div className="pointer-events-none absolute -left-20 top-[12%] -z-10 size-[420px] rounded-full bg-cyan-500/12 blur-[100px] animate-glow-drift" />
        <div
          className="pointer-events-none absolute -right-24 bottom-[10%] -z-10 size-[440px] rounded-full bg-indigo-500/15 blur-[110px] animate-glow-drift"
          style={{ animationDelay: '5s' }}
        />

        {/* Top Header Badge & System Status */}
        <div className="flex items-center justify-between gap-4 animate-[fade-in_.8s_ease-out_both]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-wider text-blue-200 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span>BUILT FOR THE WAY CAMPUSES WORK</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-slate-400">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>CLOUD ERP ACTIVE</span>
          </div>
        </div>

        {/* Center: Animated Campus Ecosystem Visual */}
        <div className="my-auto flex w-full items-center justify-center py-4">
          <CampusVisual />
        </div>

        {/* Bottom: Animated Feature Highlights Carousel */}
        <div className="animate-[rise-in_.8s_.3s_cubic-bezier(.2,.8,.2,1)_both]">
          <CampusShowcase />
        </div>
      </aside>
    </main>
  )
}
