import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { z } from 'zod'

const recoverySchema = z.object({ email: z.email('Enter a valid institutional email address.') })
type RecoveryFormValues = z.infer<typeof recoverySchema>

export function ForgotPasswordPage() {
  const [notice, setNotice] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: { email: '' },
  })

  return (
    <main className="grid min-h-dvh place-items-center bg-[radial-gradient(ellipse_at_50%_0%,#e9efff,#f6f8fc_55%)] p-6">
      <section className="w-full max-w-md rounded-2xl border border-[#e8edf5] bg-white p-7 shadow-[0_20px_60px_rgb(26_47_91_/_8%)] sm:p-[42px]" aria-labelledby="recovery-title">
        <Link className="inline-flex w-fit items-center gap-2.5 no-underline" to="/auth/login" aria-label="Campus360 sign in">
          <span className="grid size-[31px] rotate-[-8deg] grid-cols-2 grid-rows-2 gap-[3px]" aria-hidden="true"><i className="rounded-[3px] bg-brand" /><i className="rounded-[8px_3px_3px] bg-brand/70" /><i className="rounded-[3px_3px_8px] bg-brand/50" /><i className="rounded-[3px] bg-brand/90" /></span>
          <span className="font-display text-xl font-extrabold tracking-[-1px] text-[#17243c]">campus<span className="text-brand">360</span></span>
        </Link>
        <span className="mt-10 grid size-[46px] place-items-center rounded-xl bg-[#eff3ff] text-brand"><FiMail className="size-5" aria-hidden="true" /></span>
        <p className="mb-3.5 mt-6 text-[10px] font-bold tracking-[1.75px] text-[#476be2]">ACCOUNT RECOVERY</p>
        <h1 id="recovery-title" className="m-0 font-display text-[27px] font-bold tracking-[-1px] text-[#15233b]">Forgot your password?</h1>
        <p className="mt-2.5 text-[13px] leading-6 text-muted">Enter your institutional email and your campus administrator can help you regain access.</p>
        <form className="mt-7 grid gap-5" onSubmit={handleSubmit(() => setNotice('Password recovery is not connected until the institution authentication service is configured.'))} noValidate>
          <div className="grid gap-2">
            <label className="text-xs font-semibold text-[#263650]" htmlFor="recovery-email">Institutional email</label>
            <div className={`flex min-h-[51px] items-center gap-3 rounded-[9px] border bg-white px-3.5 focus-within:border-[#7290ef] focus-within:shadow-[0_0_0_3px_rgb(49_93_232_/_10%)] ${errors.email ? 'border-[#d95561]' : 'border-[#e2e7f0]'}`}>
              <FiMail className="size-4 shrink-0 text-[#98a4b8]" aria-hidden="true" />
              <input className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-[#1c2b45] outline-none placeholder:text-[#a6afbd]" id="recovery-email" type="email" autoComplete="email" placeholder="you@institution.edu" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'recovery-email-error' : undefined} {...register('email')} />
            </div>
            {errors.email && <p className="-mt-1 text-[11px] text-[#b42332]" id="recovery-email-error">{errors.email.message}</p>}
          </div>
          {notice && <p className="-my-1 rounded-lg border border-[#dce5ff] bg-[#f5f7ff] px-3 py-2.5 text-[11px] leading-5 text-[#3957a7]" role="status">{notice}</p>}
          <button className="flex min-h-[51px] items-center justify-between rounded-[9px] bg-brand px-[19px] text-[13px] font-semibold text-white shadow-[0_5px_12px_rgb(49_93_232_/_19%)] transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" type="submit"><span>Continue</span><FiArrowLeft className="size-[17px] rotate-180" aria-hidden="true" /></button>
        </form>
        <Link className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#68768d] no-underline hover:text-brand" to="/auth/login"><FiArrowLeft className="size-[15px]" aria-hidden="true" /> Back to sign in</Link>
      </section>
    </main>
  )
}
