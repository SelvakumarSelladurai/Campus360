import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { FiArrowRight, FiEye, FiEyeOff, FiKey, FiMail, FiUser } from 'react-icons/fi'
import { createAccountSchema, type CreateAccountFormValues } from '../schemas/create-account.schema'

export function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { fullName: '', email: '', inviteCode: '', password: '', confirmPassword: '', acceptTerms: false },
  })

  const onSubmit = handleSubmit(async () => {
    setNotice('Account creation is ready to connect when the institution authentication service is configured. Your invite will be validated by the server.')
  })

  return (
    <main className="grid min-h-dvh place-items-center bg-[radial-gradient(ellipse_at_50%_0%,#e9efff,#f6f8fc_55%)] p-5 sm:p-8">
      <section className="w-full max-w-lg rounded-2xl border border-[#e8edf5] bg-white p-6 shadow-[0_20px_60px_rgb(26_47_91_/_8%)] sm:p-9" aria-labelledby="create-account-title">
        <Link className="inline-flex w-fit items-center gap-2.5 no-underline" to="/auth/login" aria-label="Campus360 sign in">
          <span className="grid size-[31px] rotate-[-8deg] grid-cols-2 grid-rows-2 gap-[3px]" aria-hidden="true"><i className="rounded-[3px] bg-brand" /><i className="rounded-[8px_3px_3px] bg-brand/70" /><i className="rounded-[3px_3px_8px] bg-brand/50" /><i className="rounded-[3px] bg-brand/90" /></span>
          <span className="font-display text-xl font-extrabold tracking-[-1px] text-[#17243c]">campus<span className="text-brand">360</span></span>
        </Link>

        <div className="mt-8">
          <p className="mb-2 text-[10px] font-bold tracking-[1.75px] text-[#476be2]">JOIN YOUR CAMPUS</p>
          <h1 id="create-account-title" className="m-0 font-display text-3xl font-bold tracking-tight text-ink">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Use the invite code provided by your institution to get started.</p>
        </div>

        <form className="mt-7 grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="full-name">Full name</label>
            <div className={`flex min-h-13 items-center gap-3 rounded-lg border bg-white px-3.5 focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.fullName ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
              <FiUser className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]" id="full-name" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'full-name-error' : undefined} {...register('fullName')} />
            </div>
            {errors.fullName && <p className="text-[11px] text-[#b42332]" id="full-name-error">{errors.fullName.message}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="account-email">Institutional email</label>
            <div className={`flex min-h-13 items-center gap-3 rounded-lg border bg-white px-3.5 focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.email ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
              <FiMail className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]" id="account-email" type="email" autoComplete="email" placeholder="you@institution.edu" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'account-email-error' : undefined} {...register('email')} />
            </div>
            {errors.email && <p className="text-[11px] text-[#b42332]" id="account-email-error">{errors.email.message}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="invite-code">Institution invite code</label>
            <div className={`flex min-h-13 items-center gap-3 rounded-lg border bg-white px-3.5 focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.inviteCode ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
              <FiKey className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]" id="invite-code" autoComplete="one-time-code" placeholder="Enter your invite code" aria-invalid={Boolean(errors.inviteCode)} aria-describedby={errors.inviteCode ? 'invite-code-error' : undefined} {...register('inviteCode')} />
            </div>
            {errors.inviteCode && <p className="text-[11px] text-[#b42332]" id="invite-code-error">{errors.inviteCode.message}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="account-password">Password</label>
            <PasswordInput id="account-password" name="password" placeholder="At least 12 characters" visible={showPassword} onToggle={() => setShowPassword((visible) => !visible)} register={register} error={errors.password?.message} />
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="confirm-password">Confirm password</label>
            <PasswordInput id="confirm-password" name="confirmPassword" placeholder="Re-enter your password" visible={showConfirmPassword} onToggle={() => setShowConfirmPassword((visible) => !visible)} register={register} error={errors.confirmPassword?.message} />
          </div>

          <div>
            <label className="inline-flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-[#647188]">
              <input className="mt-0.5 size-4 shrink-0 accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" type="checkbox" {...register('acceptTerms')} />
              <span>I agree to the institution’s terms of access and privacy policy.</span>
            </label>
            {errors.acceptTerms && <p className="mt-1 text-[11px] text-[#b42332]" role="alert">{errors.acceptTerms.message}</p>}
          </div>

          {notice && <p className="rounded-lg border border-[#dce5ff] bg-[#f5f7ff] px-3 py-2.5 text-[11px] leading-5 text-[#3957a7]" role="status">{notice}</p>}

          <button className="group mt-1 flex min-h-13 items-center justify-between rounded-lg bg-brand px-4 text-[13px] font-semibold text-white shadow-[0_5px_12px_rgb(49_93_232_/_19%)] transition duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_7px_17px_rgb(49_93_232_/_24%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Creating account…' : 'Create account'}</span><FiArrowRight className="size-[17px] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-6 border-t border-[#edf0f5] pt-5 text-center text-xs text-muted">Already have an account? <Link className="font-semibold text-brand hover:text-brand-dark hover:underline hover:underline-offset-4" to="/auth/login">Sign in</Link></p>
      </section>
    </main>
  )
}

type PasswordInputProps = {
  id: string
  name: 'password' | 'confirmPassword'
  placeholder: string
  visible: boolean
  onToggle: () => void
  register: ReturnType<typeof useForm<CreateAccountFormValues>>['register']
  error?: string
}

function PasswordInput({ id, name, placeholder, visible, onToggle, register, error }: PasswordInputProps) {
  const errorId = `${id}-error`
  return (
    <>
      <div className={`flex min-h-13 items-center gap-3 rounded-lg border bg-white px-3.5 focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${error ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
        <FiKey className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
        <input className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]" id={id} type={visible ? 'text' : 'password'} autoComplete={name === 'password' ? 'new-password' : 'new-password'} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...register(name)} />
        <button className="grid size-8 shrink-0 place-items-center rounded-md text-[#8491a6] hover:bg-[#f3f6ff] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={onToggle}>{visible ? <FiEyeOff className="size-[17px]" aria-hidden="true" /> : <FiEye className="size-[17px]" aria-hidden="true" />}</button>
      </div>
      {error && <p className="text-[11px] text-[#b42332]" id={errorId}>{error}</p>}
    </>
  )
}
