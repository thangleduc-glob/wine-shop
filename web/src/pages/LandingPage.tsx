import React from 'react'
import Hero from '../components/Hero'
const FeatureCards = React.lazy(() => import('../components/FeatureCards'))
const ProductGrid = React.lazy(() => import('../components/ProductGrid'))
import landing from '../mocks/landing.json'

export default function LandingPage() {
  const data = landing as { hero_title: string; hero_subtitle?: string; hero_cta_label?: string; cta_target?: string }
  return (
    <main>
      <Hero
        title={data.hero_title}
        subtitle={data.hero_subtitle}
        ctaLabel={data.hero_cta_label}
        ctaTarget={data.cta_target}
      />
      {/* <nav aria-label="primary-actions" style={{ marginTop: 16 }}>
        <a href="/login" style={{ marginRight: 12 }}>Log in</a>
        <a href="/signup">Sign up</a>
        <a href="/products" style={{ marginLeft: 24 }}>View products</a>
      </nav> */}
      <section id="shop-placeholder">
        <p>Featured products and shop preview will be here in later iterations.</p>
      </section>
      {/* Feature cards / testimonials */}
      <div style={{ marginTop: 24 }}>
        { /* Lazy-load the feature cards component to keep initial bundle small */ }
        <React.Suspense fallback={<div aria-hidden>Loading features…</div>}>
          <FeatureCards />
        </React.Suspense>
      </div>

      {/* Mock products */}
      <div style={{ marginTop: 18 }}>
        <React.Suspense fallback={<div aria-hidden>Loading products…</div>}>
          <ProductGrid />
        </React.Suspense>
      </div>
    </main>
  )
}
