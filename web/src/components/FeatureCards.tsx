
type Card = {
  id: string
  title: string
  desc: string
  highlight?: string
}

const CARDS: Card[] = [
  {
    id: 'taste-our-wines',
    title: 'Curated Selection',
    desc: "Hand-picked wines from boutique growers — discover flavors you won't find elsewhere.",
    highlight: 'Expert picks',
  },
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    desc: 'Reliable, eco-friendly shipping so your bottle arrives ready to enjoy.',
    highlight: '2–4 day shipping',
  },
  {
    id: 'satisfaction',
    title: 'Satisfaction Promise',
    desc: 'Love it or return it — simple returns and helpful support.',
    highlight: 'Hassle-free',
  },
]

function Icon({ name }: { name: string }) {
  // Small inline SVGs for each card to keep assets self-contained
  if (name === 'bottle') {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M9 2h6v2h1v3c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V4h1V2z" fill="#8b5cf6" />
        <path d="M8 9h8v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9z" fill="#f97316" />
      </svg>
    )
  }
  if (name === 'truck') {
    return (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 7h11v7H3z" fill="#f97316" />
        <path d="M14 9h4l2 3v3h-6z" fill="#8b5cf6" />
        <circle cx="6.5" cy="17" r="1.5" fill="#111827" />
        <circle cx="17.5" cy="17" r="1.5" fill="#111827" />
      </svg>
    )
  }
  // shield
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2l7 4v5c0 5-3.6 9.7-7 11-3.4-1.3-7-6-7-11V6l7-4z" fill="#10b981" />
      <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function FeatureCards() {
  const icons = ['bottle', 'truck', 'shield']
  return (
    <section aria-labelledby="features-heading" className="feature-cards-root">
      <h2 id="features-heading" className="features-heading">Features & Benefits</h2>
      <div className="feature-cards-inner">
        {CARDS.map((c, i) => (
          <article key={c.id} className="feature-card" data-testid={`feature-${c.id}`} aria-labelledby={`${c.id}-title`}>
            <div className="feature-icon" aria-hidden>
              <div className="feature-icon-bg">
                <Icon name={icons[i] || 'bottle'} />
              </div>
            </div>
            <div className="feature-body">
              <h3 id={`${c.id}-title`} className="feature-title">{c.title}</h3>
              <p className="feature-desc">{c.desc}</p>
            </div>
            {c.highlight && (
              <div className="feature-flag" aria-hidden>
                {c.highlight}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
