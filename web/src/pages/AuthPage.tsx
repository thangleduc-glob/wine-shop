import React from 'react'
import AuthForm from '../components/AuthForm'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

type Props = {
  initialMode?: 'login' | 'signup'
}

export default function AuthPage({ initialMode }: Props) {
  const navigate = useNavigate()

  async function handleSignup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    // Supabase configured to not require email verification per spec
    navigate('/products')
  }

  async function handleLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    navigate('/products')
  }

  return (
    <main>
      <h1>Authentication</h1>
      {initialMode === 'signup' ? (
        <section>
          <h2>Sign up</h2>
          <AuthForm mode="signup" onSubmit={handleSignup} />
        </section>
      ) : initialMode === 'login' ? (
        <section>
          <h2>Log in</h2>
          <AuthForm mode="login" onSubmit={handleLogin} />
        </section>
      ) : (
        <>
          <section>
            <h2>Sign up</h2>
            <AuthForm mode="signup" onSubmit={handleSignup} />
          </section>
          <section>
            <h2>Log in</h2>
            <AuthForm mode="login" onSubmit={handleLogin} />
          </section>
        </>
      )}
    </main>
  )
}
