import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [category, setCategory] = useState('All');
  const [size, setSize] = useState('All');
  const [color, setColor] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');

  const categories = ['All', 'Solid', 'Graphic', 'Embroidered', 'Oversized', 'Polo', 'Full Sleeve'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'All', hex: 'transparent' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Royal Blue', hex: '#4169E1' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Grey', hex: '#808080' }
  ];
  const sortOptions = ['Newest First', 'Most Popular', 'Price Low→High', 'Price High→Low'];

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Size Filter
    if (size !== 'All') {
      result = result.filter(p => p.sizes?.includes(size));
    }

    // Color Filter
    if (color !== 'All') {
      result = result.filter(p => p.colors?.some(c => c.name === color));
    }

    // Sorting
    if (sortBy === 'Newest First') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'Most Popular') {
      result.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
    } else if (sortBy === 'Price Low→High') {
      result.sort((a, b) => a.retail_price - b.retail_price);
    } else if (sortBy === 'Price High→Low') {
      result.sort((a, b) => b.retail_price - a.retail_price);
    }

    setFilteredProducts(result);
  }, [category, size, color, sortBy, products]);

  if (loading) return <div className="h-screen flex items-center justify-center text-maroon font-bold">Loading Catalog...</div>;

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">Product Catalog</h1>
        <p className="text-maroon font-semibold tracking-widest uppercase text-sm bangla">আমাদের প্রিমিয়াম কালেকশন</p>
      </div>

      {/* Filters & Sort */}
      <div className="bg-dark-card border border-white/5 rounded-[2.5rem] p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Category */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-3 font-bold">Category</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-deep-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-maroon appearance-none text-sm"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/40" size={16} />
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-3 font-bold">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(s => (
                <button 
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-10 h-10 rounded-lg border text-[10px] font-bold transition-all ${size === s ? 'bg-maroon text-white border-maroon' : 'border-white/10 hover:border-white/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-3 font-bold">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button 
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  className={`w-8 h-8 rounded-full border-2 transition-all relative ${color === c.name ? 'border-maroon scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }}
                >
                  {c.name === 'All' && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">ALL</div>}
                  {c.name === 'White' && <div className="absolute inset-0 border border-black/10 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-3 font-bold">Sort By</label>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-deep-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-maroon appearance-none text-sm"
              >
                {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-off-white/40" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-2xl font-bold text-off-white/20">No products match your filters.</p>
          <button 
            onClick={() => { setCategory('All'); setSize('All'); setColor('All'); }}
            className="mt-4 text-royal-gold font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
