import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  MessageSquare, 
  Facebook, 
  FileText, 
  Info, 
  Ruler, 
  Truck,
  CheckCircle2,
  ShoppingBag,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProduct(data);
          if (data.sizes?.length) setSelectedSize(data.sizes[0]);
          if (data.colors?.length) setSelectedColor(data.colors[0].name);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-royal-gold font-bold">Loading Product...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center text-crimson-red font-bold">Product not found</div>;

  const whatsappMessage = `আমি ${product.title} এই প্রোডাক্টটি অর্ডার করতে চাই।`;
  const whatsappUrl = `https://wa.me/8801856078978?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-off-white/50 hover:text-royal-gold mb-12 transition-colors">
        <ChevronLeft size={20} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left: Images */}
        <div className="space-y-6">
          <div 
            className="aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5 relative cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={[product.image_url, ...(product.gallery || [])].filter(Boolean)[activeImage]} 
              alt={product.title}
              className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[product.image_url, ...(product.gallery || [])].filter(Boolean).map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-24 h-32 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-royal-gold' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight font-cinzel uppercase tracking-tighter">{product.title}</h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-royal-gold">Price: ৳{product.retail_price}</span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-2">Fabric</p>
              <p className="font-bold">{product.fabric || '100% Cotton'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-2">GSM</p>
              <p className="font-bold">{product.gsm || '180-190'}</p>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-4">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl border font-bold text-sm transition-all ${selectedSize === s ? 'bg-royal-gold text-deep-black border-royal-gold' : 'border-white/10 text-off-white/60 hover:border-white/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-4">Select Color</p>
            <div className="flex flex-wrap gap-3">
              {(product.colors || [{name: 'Black', hex: '#000000'}]).map(c => (
                <button 
                  key={c.name} 
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === c.name ? 'border-royal-gold scale-110' : 'border-white/10'}`} 
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <div className="w-2 h-2 bg-white rounded-full shadow-lg" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-4">Quantity</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-dark-card rounded-2xl border border-border-subtle p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-border-subtle rounded-xl transition-all text-text-primary"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-text-primary">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-border-subtle rounded-xl transition-all text-text-primary"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={handleAddToCart}
                className="bg-text-primary text-deep-black py-5 rounded-2xl font-black hover:bg-royal-gold hover:text-white transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
              >
                <ShoppingBag size={24} /> Add to Cart
              </button>
            </div>
            
            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/20 border border-green-500/30 p-4 rounded-2xl text-green-500 text-center font-bold text-sm"
                >
                  Product added to cart successfully!
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://wa.me/8801856078978"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-royal-gold text-text-primary py-4 rounded-2xl font-bold hover:bg-text-primary hover:text-deep-black transition-all flex items-center justify-center gap-2 text-sm bangla"
              >
                <MessageSquare size={18} /> WhatsApp-এ অর্ডার করুন
              </a>
              <a 
                href="https://www.facebook.com/share/1XSmanaXQk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm bangla"
              >
                <Facebook size={18} /> Facebook-এ মেসেজ দিন
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-white/5 pt-16">
        <div className="flex flex-wrap gap-8 mb-12 border-b border-white/5">
          {[
            { id: 'details', label: 'Product Details', icon: <Info size={18} /> },
            { id: 'size', label: 'Size & Fit', icon: <Ruler size={18} /> },
            { id: 'shipping', label: 'Shipping & Return', icon: <Truck size={18} /> },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-royal-gold' : 'text-off-white/40 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-royal-gold" />}
            </button>
          ))}
        </div>

        <div className="max-w-4xl">
          {activeTab === 'details' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-lg text-off-white/60 leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-dark-card p-8 rounded-3xl border border-white/5">
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-royal-gold text-xs">Fabric & Care</h4>
                  <ul className="space-y-3 text-sm text-off-white/60">
                    <li className="flex items-center gap-2">✓ {product.fabric || '100% Premium Cotton'}</li>
                    <li className="flex items-center gap-2">✓ {product.gsm || '180'} GSM Fabric</li>
                    <li className="flex items-center gap-2">✓ Machine wash cold</li>
                    <li className="flex items-center gap-2">✓ Tumble dry low</li>
                  </ul>
                </div>
                <div className="bg-dark-card p-8 rounded-3xl border border-white/5">
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-royal-gold text-xs">Features</h4>
                  <ul className="space-y-3 text-sm text-off-white/60">
                    <li className="flex items-center gap-2">✓ Reinforced stitching</li>
                    <li className="flex items-center gap-2">✓ Durable screen print</li>
                    <li className="flex items-center gap-2">✓ Pre-shrunk fabric</li>
                    <li className="flex items-center gap-2">✓ Export quality finish</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'size' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-6 text-xs uppercase tracking-widest text-off-white/40 font-bold">Size</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-widest text-off-white/40 font-bold">Chest (Inch)</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-widest text-off-white/40 font-bold">Length (Inch)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { s: 'S', c: '38', l: '26' },
                    { s: 'M', c: '40', l: '27' },
                    { s: 'L', c: '42', l: '28' },
                    { s: 'XL', c: '44', l: '29' },
                    { s: 'XXL', c: '46', l: '30' },
                  ].map(row => (
                    <tr key={row.s} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold">{row.s}</td>
                      <td className="py-4 px-6 text-off-white/60">{row.c}</td>
                      <td className="py-4 px-6 text-off-white/60">{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-xs text-off-white/30 italic">* Measurements may vary by +/- 0.5 inch.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-card p-6 rounded-3xl border border-white/5 text-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-2">Delivery Time</p>
                  <p className="text-2xl font-black text-royal-gold">2-5 Days</p>
                </div>
                <div className="bg-dark-card p-6 rounded-3xl border border-white/5 text-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-2">Return Policy</p>
                  <p className="text-2xl font-black text-royal-gold">7 Days</p>
                </div>
                <div className="bg-dark-card p-6 rounded-3xl border border-white/5 text-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-off-white/40 mb-2">Delivery</p>
                  <p className="text-2xl font-black text-royal-gold">Nationwide</p>
                </div>
              </div>
              <div className="bg-steel-blue/10 p-8 rounded-[2rem] border border-steel-blue/20">
                <h4 className="font-bold mb-4 bangla">ডেলিভারি চার্জ</h4>
                <ul className="space-y-4 text-sm bangla text-off-white/70">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>ঢাকার ভিতরে</span>
                    <span className="font-bold text-white">৳৭০</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>ঢাকার বাইরে</span>
                    <span className="font-bold text-white">৳১৩০</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
