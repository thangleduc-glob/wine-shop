import React from 'react'

type Product = {
  id: string
  name: string
  region?: string
  price: string
  img?: string
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Château Rosette 2018', region: 'Bordeaux', price: '$42', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP33NVow83ctwteQ5lfg3bNf8bytQYVgcEwyqwCB6Gag&s=10' },
  { id: 'p2', name: 'Sunset Pinot Noir', region: 'Willamette Valley', price: '$29', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoMNwgIPy5Sd827QQRcK7rJb06abigpEDTH8VBElIUvQ&s=10' },
  { id: 'p3', name: 'Valley Chardonnay', region: 'Napa', price: '$36', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAT6hu0Sl2rVFhE4eqJFyYTTQnGQk9K8nJMIttxc-bg&s=10' },
  { id: 'p4', name: 'Campo Malbec', region: 'Mendoza', price: '$22', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0ZKPgtLUeJw3hZaN201_C_PQ6TWuPEfjP1IYulbXaw&s=10' },
  { id: 'p5', name: 'Coastal Sauvignon', region: 'Marlborough', price: '$19', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS46Fj_l7LUdCBq5Ealy0jZ_lrD6nhZ9oNK2x0LrX1ZvQ&s=10' },
  { id: 'p6', name: 'Reserve Syrah', region: 'Barossa', price: '$48', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-P9D_Qx5Je2GugEjRbBslTAzm_VCiOFcZLWAEzX2UZg&s=10' },
]

export default function ProductGrid() {
  return (
    <section aria-labelledby="products-heading" className="product-grid-root">
      <h2 id="products-heading" className="products-heading">Selected for you</h2>
      <div className="product-grid-inner">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="product-card" data-testid={`product-${p.id}`} aria-labelledby={`${p.id}-title`}>
            <div className="product-media" aria-hidden>
              {p.img ? (
                <img className="product-thumb-img" src={p.img} alt={`${p.name} thumbnail`} loading="lazy" />
              ) : (
                <div className="product-thumb">🍷</div>
              )}
            </div>
            <div className="product-body">
              <h3 id={`${p.id}-title`} className="product-title">{p.name}</h3>
              <p className="product-meta">{p.region}</p>
            </div>
            <div className="product-actions">
              <div className="product-price">{p.price}</div>
              <a className="btn btn-ghost" href={`/product/${p.id}`} aria-label={`View ${p.name}`}>View</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
