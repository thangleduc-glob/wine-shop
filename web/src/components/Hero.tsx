import React from 'react'
import heroImg from '../assets/hero.png'

type Props = {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTarget?: string
}

export default function Hero({ title, subtitle, ctaLabel, ctaTarget }: Props) {
  return (
    <header className="hero-root" aria-labelledby="hero-title">
      <div className="hero-decor" aria-hidden="true">
        <img src={heroImg} alt="decorative wine" />
      </div>
      <div className="hero-inner">
        <h1 data-testid="hero-title" id="hero-title">{title}</h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {ctaLabel && (
          <a
            data-testid="hero-cta"
            className="hero-cta"
            href={ctaTarget || '#'}
            aria-label={ctaLabel}
          >
            {ctaLabel}
            <span className="arrow" aria-hidden>→</span>
          </a>
        )}
      </div>
    </header>
  )
}
