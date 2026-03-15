import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  Users, 
  Factory, 
  Package, 
  RefreshCcw,
  Search,
  MessageSquare,
  Facebook,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

export default function Home({ openInquiry }: { openInquiry: (product?: Product) => void }) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  const categories = [
    { name: 'Solid Drop Shoulder', slug: 'drop-shoulder', image: 'https://picsum.photos/seed/drop-shoulder/600/800', price: '350' },
    { name: 'Oversized', slug: 'oversized', image: 'https://picsum.photos/seed/oversized/600/800', price: '380' },
    { name: 'Graphic', slug: 'graphic', image: 'https://picsum.photos/seed/graphic/600/800', price: '400' },
    { name: 'Embroidered', slug: 'embroidered', image: 'https://picsum.photos/seed/embroidered/600/800', price: '450' },
    { name: 'Polo', slug: 'polo', image: 'https://picsum.photos/seed/polo/600/800', price: '500' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-deep-black overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A8A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-maroon/10 text-maroon border border-maroon/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 bangla">
              বাংলাদেশের সেরা T-shirt পাইকারি
            </span>
            
            <h1 className="text-6xl md:text-9xl font-black mb-4 leading-none font-cinzel text-royal-gold tracking-tighter drop-shadow-[0_5px_15px_rgba(30,58,138,0.3)]">
              WHOLESALE<br />YOUR TARGET
            </h1>
            
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-[0.3em] uppercase text-off-white/80">
              TARGET FASHION WHOLESALE
            </h2>
            
            <p className="text-lg md:text-xl mb-12 text-off-white/60 max-w-2xl mx-auto bangla">
              Reseller, দোকানদার ও Online seller-দের জন্য সেরা দামে premium T-shirt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://wa.me/8801234567890" 
                target="_blank"
                className="bg-maroon text-white px-12 py-5 rounded-full font-black text-lg hover:bg-steel-blue transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(128,0,0,0.3)]"
              >
                <MessageSquare size={24} /> পাইকারি মূল্য জানুন
              </a>
              <Link 
                to="/catalog" 
                className="border-2 border-royal-gold text-royal-gold px-12 py-5 rounded-full font-black text-lg hover:bg-royal-gold hover:text-deep-black transition-all"
              >
                Products দেখুন
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-dark-card border-y border-border-subtle py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-steel-blue/10 rounded-2xl flex items-center justify-center text-steel-blue shrink-0">
              <Factory size={24} />
            </div>
            <div>
              <p className="font-bold text-sm bangla">সরাসরি Factory Price</p>
              <p className="text-[10px] text-off-white/40 uppercase tracking-widest">মাঝখানের লাভ নেই</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-maroon/10 rounded-2xl flex items-center justify-center text-maroon shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="font-bold text-sm bangla">Minimum Order 12 Piece</p>
              <p className="text-[10px] text-off-white/40 uppercase tracking-widest">ছোট reseller-রাও পারবে</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-steel-blue/10 rounded-2xl flex items-center justify-center text-steel-blue shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <p className="font-bold text-sm bangla">সারা বাংলাদেশে ডেলিভারি</p>
              <p className="text-[10px] text-off-white/40 uppercase tracking-widest">Courier-এ পাঠানো হবে</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-maroon/10 rounded-2xl flex items-center justify-center text-maroon shrink-0">
              <RefreshCcw size={24} />
            </div>
            <div>
              <p className="font-bold text-sm bangla">Exchange Guarantee</p>
              <p className="text-[10px] text-off-white/40 uppercase tracking-widest">সমস্যা হলে exchange হবে</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-deep-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 bangla">কেন Target Fashion থেকে পাইকারি নেবেন?</h2>
            <div className="w-24 h-1 bg-maroon mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: 'সেরা Quality', desc: '100% cotton, দীর্ঘস্থায়ী রঙ', color: 'text-maroon' },
              { icon: <Factory size={32} />, title: 'সেরা দাম', desc: 'সরাসরি manufacturer থেকে', color: 'text-steel-blue' },
              { icon: <Truck size={32} />, title: 'দ্রুত ডেলিভারি', desc: 'ঢাকা ১-২ দিন, বাইরে ৩-৫ দিন', color: 'text-maroon' },
              { icon: <Users size={32} />, title: 'বিশ্বস্ত ব্র্যান্ড', desc: 'শত শত reseller-এর পছন্দ', color: 'text-steel-blue' },
            ].map((card, i) => (
              <div key={i} className="bg-dark-card p-8 rounded-[2rem] border border-border-subtle hover:border-royal-gold/30 transition-all group">
                <div className={`${card.color} mb-6 group-hover:scale-110 transition-transform`}>{card.icon}</div>
                <h3 className="text-xl font-bold mb-2 bangla">{card.title}</h3>
                <p className="text-off-white/50 text-sm bangla">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog Preview */}
      <section className="py-24 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">আমাদের Collection</h2>
              <div className="w-20 h-1 bg-maroon"></div>
            </div>
            <Link to="/catalog" className="text-maroon font-bold flex items-center gap-2 hover:text-royal-gold transition-colors">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="group bg-deep-black rounded-[2rem] overflow-hidden border border-white/5">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 text-sm">{cat.name}</h3>
                  <p className="text-royal-gold font-black mb-4">Retail from ৳{cat.price}</p>
                  <a 
                    href={`https://wa.me/8801234567890?text=I'm interested in wholesale for ${cat.name}`}
                    target="_blank"
                    className="block w-full bg-white/5 hover:bg-royal-gold hover:text-deep-black text-center py-3 rounded-xl text-xs font-bold transition-all bangla"
                  >
                    Wholesale-এর জন্য WhatsApp করুন
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-deep-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 bangla">কীভাবে অর্ডার করবেন?</h2>
            <div className="w-24 h-1 bg-steel-blue mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border-subtle -translate-y-1/2 z-0"></div>
            
            {[
              { step: 'Step 1', icon: <Search size={24} />, title: 'Products দেখুন', desc: 'Website-এ সব T-shirt দেখুন, পছন্দ করুন' },
              { step: 'Step 2', icon: <MessageSquare size={24} />, title: 'WhatsApp করুন', desc: 'পছন্দের product, color, size, quantity বলুন' },
              { step: 'Step 3', icon: <CheckCircle2 size={24} />, title: 'Confirm করুন', desc: 'আমরা wholesale price জানাব, আপনি confirm করবেন' },
              { step: 'Step 4', icon: <Truck size={24} />, title: 'Delivery পাবেন', desc: 'Advance payment বা COD-এ delivery' },
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-dark-card p-8 rounded-[2.5rem] border border-border-subtle text-center">
                <div className="w-12 h-12 bg-maroon text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black text-sm">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 bangla">{item.title}</h3>
                <p className="text-off-white/50 text-sm bangla">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reseller Benefits */}
      <section className="py-24 bg-steel-blue text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight">Reseller হলে<br />যা পাবেন</h2>
            <div className="space-y-6">
              {[
                'বিশেষ wholesale price (retail-এর চেয়ে অনেক কম)',
                'Regular নতুন design-এর আপডেট',
                'Priority delivery',
                'Dedicated WhatsApp support'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 font-bold text-lg bangla">
                  <div className="w-6 h-6 bg-maroon text-white rounded-full flex items-center justify-center text-xs shrink-0">✓</div>
                  {benefit}
                </div>
              ))}
            </div>
            <Link 
              to="/reseller" 
              className="inline-block mt-12 bg-white text-steel-blue px-12 py-5 rounded-full font-black text-lg hover:bg-maroon hover:text-white transition-all bangla"
            >
              আজই Reseller হন
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/reseller-benefit/1000/1000" 
                className="w-full h-full object-cover" 
                alt="Reseller Benefits"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Page Section */}
      <section className="py-24 bg-deep-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-steel-blue/10 text-steel-blue rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Facebook size={48} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 bangla">আমাদের Facebook Page Follow করুন</h2>
          <p className="text-off-white/60 mb-10 text-lg bangla">নতুন design ও offer সবার আগে পেতে Follow করুন</p>
          <a 
            href="https://www.facebook.com/profile.php?id=61582254746458" 
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-xl"
          >
            <Facebook size={24} /> Follow on Facebook
          </a>
        </div>
      </section>
    </div>
  );
}
