import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Wine Shop home">Wine Shop</Link>
        <nav aria-label="Main Navigation" className="main-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#shop" className="nav-link">Shop</a>
        </nav>
        <div className="auth-actions">
          <Link className="btn btn-ghost" to="/login">Log in</Link>
          <Link className="btn btn-primary" to="/signup">Sign up</Link>
        </div>
      </div>
    </header>
  )
}
