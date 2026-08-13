import AuthForm from '../components/AuthForm'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

type Props = {
  initialMode?: 'login' | 'signup'
}

export default function AuthPage({ initialMode }: Props) {
  const navigate = useNavigate()

  async function handleSignup(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    // Supabase configured to not require email verification per spec
    navigate('/products')
  }

  async function handleLogin(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    navigate('/products')
  }

  return (
    <div className="auth-page-root">
      <div className="auth-hero">
        <div className="auth-hero-inner">
          <h1>{initialMode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth-sub">Fast sign in to access product list and personalized features.</p>
        </div>
      </div>

      <div className="auth-card">
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

        <div className="auth-switch">
          {initialMode === 'signup' ? (
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          ) : initialMode === 'login' ? (
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          ) : (
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link> · Already have an account? <Link to="/login">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
