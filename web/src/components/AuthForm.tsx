import React, { useState } from 'react'

type Props = {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

export default function AuthForm({ mode, onSubmit }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function validate() {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return false
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return false
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must include at least one letter and one number.')
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    try {
      await onSubmit(email, password)
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label={`${mode}-form`}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {error && <div role="alert">{error}</div>}
      <button type="submit">{mode === 'signup' ? 'Sign up' : 'Log in'}</button>
    </form>
  )
}
