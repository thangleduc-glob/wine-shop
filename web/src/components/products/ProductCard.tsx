import React from 'react'
import type { Product } from '../../lib/productsClient'
import './productCard.css'

type Props = {
  product: Product
}

function deterministicSeed(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  return h
}

export default function ProductCard({ product }: Props) {
  const price = (product.price_cents ?? 0) / 100
  const formatted = new Intl.NumberFormat(undefined, { style: 'currency', currency: product.currency ?? 'USD' }).format(price)

  // deterministic values derived from id so visuals stay stable across renders
  const seed = deterministicSeed(product.id)
  const rating = (seed % 5) + 1 // 1-5 stars
  const thumbSrc = `https://picsum.photos/seed/${encodeURIComponent(product.id)}/600/400`
  const inStock = (product.stock ?? 0) > 0

  return (
    <article className="product-card" role="article" aria-labelledby={`product-${product.id}`}>
      <div className="product-thumb">
        <img src={thumbSrc} alt={`Thumbnail of ${product.name}`} loading="lazy" />
        <span className={`badge ${inStock ? 'in' : 'out'}`}>{inStock ? 'IN STOCK' : 'OUT OF STOCK'}</span>
      </div>

      <div className="product-body">
        <h3 id={`product-${product.id}`} className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description ? (product.description.length > 140 ? product.description.slice(0, 137) + '...' : product.description) : 'No description'}</p>

        <div className="product-row">
          <div>
            <div className="product-price">{formatted}</div>
            <div className="product-stock">{inStock ? `${product.stock} available` : '0 available'}</div>
          </div>

          <div aria-hidden className="product-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: i < rating ? '#f59e0b' : '#e6e6e6', fontSize: 14 }}>★</span>
            ))}
          </div>
        </div>

        <div className="product-actions">
          <div className="actions-right">
            <button className="btn-primary" disabled={!inStock} aria-disabled={!inStock}>Buy</button>
          </div>
        </div>
      </div>
    </article>
  )
}
