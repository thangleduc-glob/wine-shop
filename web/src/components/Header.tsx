import React from 'react'

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        <a href="/" className="brand" aria-label="Wine Shop home">Wine Shop</a>
        <nav aria-label="Main Navigation" className="main-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#shop" className="nav-link">Shop</a>
        </nav>
        <div className="auth-actions">
          <a className="btn btn-ghost" href="/login">Log in</a>
          <a className="btn btn-primary" href="/signup">Sign up</a>
        </div>
      </div>
    </header>
  )
}
