import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Category({ openInquiry }: { openInquiry: (product?: Product) => void }) {
  const { name } = useParams<{ name: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert slug back to display name
  const categoryName = name?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  useEffect(() => {
    fetch(`/api/categories/${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching category products:', err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <div className="h-[80vh] flex items-center justify-center text-royal-gold font-bold">Loading...</div>;

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">{categoryName}</h1>
        <p className="text-royal-gold font-semibold tracking-widest uppercase text-sm bangla">পাইকারি কালেকশন</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-off-white/40 font-bold text-2xl">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onInquiry={openInquiry} />
          ))}
        </div>
      )}
    </div>
  );
}
