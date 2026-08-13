import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Header() {
  const [email, setEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (mounted) setEmail(data.user?.email ?? null)
      } catch (e) {
        // ignore
      }
    })()

    const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
    })

    return () => {
      mounted = false
      if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setEmail(null)
    navigate('/')
  }

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Wine Shop home">Wine Shop</Link>
        <nav aria-label="Main Navigation" className="main-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#shop" className="nav-link">Shop</a>
        </nav>
        <div className="auth-actions">
          {email ? (
            <>
              <span className="user-email">{email}</span>
              <button className="btn btn-ghost" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login">Log in</Link>
              <Link className="btn btn-primary" to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
