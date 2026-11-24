import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../utils/validation/authSchema.js'
import { getDemoAccount, getDemoLogin } from '../../services/auth/authService.js'

export default function Login({ onSignIn }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema, undefined, { raw: true }),
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const account = getDemoAccount()

  async function submit(values) {
    setError('')

    try {
      await onSignIn(values)
    } catch (error) {
      setError(error.message || 'Unable to sign in. Please try again.')
    }
  }

  function fillDemoAccount() {
    reset(getDemoLogin())
    setShowPassword(false)
    setError('')
  }

  return (
    <main className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-page tw:p-6 tw:login-mobile:p-4">
      <section className="tw:w-full tw:max-w-[420px] tw:rounded-xl tw:border tw:border-solid tw:border-border tw:bg-surface tw:p-9
          tw:shadow-login tw:login-mobile:p-6" aria-labelledby="login-title">
        <img className="tw:mb-4 tw:block" src="/favicon.svg" alt="" width="42" height="42" />
        <p className="tw:mb-3 tw:text-[13px] tw:font-semibold tw:text-primary">Hadiya Science HRMS</p>
        <h1 id="login-title">Admin login</h1>
        <p className="tw:mt-[10px] tw:text-[13px] tw:leading-[1.6] tw:text-text-secondary">Welcome back. Sign in to your HR workspace.</p>

        <form className="tw:mt-7" onSubmit={handleSubmit(submit)} aria-busy={isSubmitting} noValidate>
          <label className="tw:mb-2 tw:block tw:text-[13px] tw:font-medium" htmlFor="login-email">Email address</label>
          <input
            className="tw:mb-5 tw:w-full tw:rounded-md tw:border tw:border-solid tw:border-border tw:bg-surface tw:p-3
          tw:text-text-primary tw:focus:border-primary"
            id="login-email"
            {...register('email', { onChange: () => setError('') })}
            type="email"
            autoComplete="username"
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.email && <small id="login-email-error" className="tw:mb-4 tw:text-[13px] tw:leading-[1.6] tw:text-[#b43643]">{errors.email.message}</small>}

          <label className="tw:mb-2 tw:block tw:text-[13px] tw:font-medium" htmlFor="login-password">Password</label>
          <input
            className="tw:mb-5 tw:w-full tw:rounded-md tw:border tw:border-solid tw:border-border tw:bg-surface tw:p-3
          tw:text-text-primary tw:focus:border-primary"
            id="login-password"
            {...register('password', { onChange: () => setError('') })}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.password && <small id="login-password-error" className="tw:mb-4 tw:text-[13px] tw:leading-[1.6] tw:text-[#b43643]">{errors.password.message}</small>}

          <label className="tw:mb-5 tw:flex tw:items-center tw:gap-2 tw:text-[13px] tw:font-medium">
            <input
              type="checkbox"
              className="tw:m-0 tw:accent-primary"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              disabled={isSubmitting}
            />
            Show password
          </label>

          {error && <p className="tw:mb-4 tw:text-[13px] tw:leading-[1.6] tw:text-[#b43643]" role="alert">{error}</p>}

          <button className="tw:w-full tw:rounded-md tw:border tw:border-solid tw:border-primary tw:bg-primary tw:p-3 tw:font-semibold
          tw:text-white tw:hover:bg-primary-hover" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <button className="tw:mt-3 tw:w-full tw:rounded-md tw:border tw:border-solid tw:border-primary tw:bg-surface tw:p-3 tw:font-semibold
          tw:text-primary tw:hover:bg-icon-bg" type="button" onClick={fillDemoAccount} disabled={isSubmitting}>
          {account.passwordChangedAt ? 'Use current demo email' : 'Use demo account'}
        </button>
        <p className="tw:mt-4 tw:text-center tw:text-[11px] tw:leading-[1.6] tw:text-text-secondary">Demo only · {account.profile.fullName}, {account.role}</p>
        <p className="tw:mt-4 tw:text-center tw:text-[11px] tw:leading-[1.6] tw:text-text-secondary">{account.passwordChangedAt ? 'Enter the password you saved in this tab. Reload to restore the original demo account.' : 'Reloading restores the original demo account. Live password recovery requires backend integration.'}</p>
      </section>
    </main>
  )
}
