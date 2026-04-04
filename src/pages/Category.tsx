import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { name: slug } = useParams<{ name: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch category details to get the correct title
        const cRes = await fetch('/api/categories');
        const categories = await cRes.json();
        const currentCat = categories.find((c: any) => c.slug === slug);
        
        if (currentCat) {
          setCategory(currentCat);
          const pRes = await fetch(`/api/categories/${currentCat.title}`);
          const pData = await pRes.json();
          setProducts(pData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="h-[80vh] flex items-center justify-center text-royal-gold font-bold">Loading...</div>;

  const categoryTitle = category ? category.title : slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">{categoryTitle}</h1>
        <p className="text-royal-gold font-semibold tracking-widest uppercase text-sm bangla">কালেকশন</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-off-white/40 font-bold text-2xl">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
