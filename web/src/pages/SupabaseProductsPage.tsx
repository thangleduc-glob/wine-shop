import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/productsClient';
import type { Product } from '../lib/productsClient';
import ProductCard from '../components/products/ProductCard';
import '../styles/products.css';

export default function SupabaseProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts(50)
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load products');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  function retry() {
    setError(null);
    setLoading(true);
    fetchProducts(50)
      .then(setProducts)
      .catch((err) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }

  if (loading)
    return (
      <div className="products-container">
        <p>Loading products…</p>
      </div>
    );
  if (error)
    return (
      <div className="products-container">
        <p className="error">{error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  if (!products || products.length === 0)
    return (
      <div className="products-container">
        <p>
          No products found. <a href="/">Go back</a>
        </p>
      </div>
    );

  return (
    <main className="products-container">
      <h2>Products</h2>
      <section className="products-grid" aria-live="polite">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
