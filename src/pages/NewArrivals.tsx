import { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function NewArrivals({ openInquiry }: { openInquiry: (product?: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4))) // Simulating new arrivals
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">New Arrivals</h1>
        <p className="text-royal-gold font-semibold tracking-widest uppercase text-sm bangla">নতুন কালেকশন</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onInquiry={openInquiry} />
        ))}
      </div>
    </div>
  );
}
