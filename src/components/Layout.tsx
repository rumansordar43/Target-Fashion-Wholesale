import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  Search, 
  Send,
  ShoppingBag,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import FloatingWhatsApp from './FloatingWhatsApp';
import MobileStickyBar from './MobileStickyBar';
import { useCart } from '../CartContext';
import { LogoName } from './Logo';

export default function Layout({ children, openInquiry }: { children: React.ReactNode, openInquiry: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Offers', path: '/offers' },
    { name: 'Reseller হন', path: '/reseller' },
    { name: 'কীভাবে অর্ডার করবেন', path: '/how-to-order' },
    { name: 'About Us', path: '/about' },
  ];

  const categories = [
    { name: 'Solid Drop Shoulder', path: '/category/drop-shoulder' },
    { name: 'Oversized', path: '/category/oversized' },
    { name: 'Graphic', path: '/category/graphic' },
    { name: 'Embroidered', path: '/category/embroidered' },
    { name: 'Polo', path: '/category/polo' },
  ];

  return (
    <div className="min-h-screen bg-deep-black text-off-white selection:bg-royal-gold selection:text-deep-black transition-colors duration-300">
      {/* Announcement Bar */}
      <div className="bg-maroon py-2 overflow-hidden whitespace-nowrap relative border-b border-royal-gold/20">
        <div className="animate-marquee inline-block px-4 text-xs font-bold tracking-wider uppercase text-white">
          <span className="bangla">🏪 পাইকারি মূল্যে T-shirt নিন | সারা বাংলাদেশে ডেলিভারি | Reseller-দের জন্য বিশেষ অফার &nbsp;&nbsp;&nbsp;&nbsp; 🏪 পাইকারি মূল্যে T-shirt নিন | সারা বাংলাদেশে ডেলিভারি | Reseller-দের জন্য বিশেষ অফার</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-deep-black/95 backdrop-blur-2xl border-b border-border-subtle h-[110px] flex items-center">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center gap-4 xl:gap-8">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-0.5 shrink-0 min-w-max">
              <img 
                src="https://lh3.googleusercontent.com/d/1cEF5GtBERApKY0qBJPz1JNuFgUk86URX" 
                alt="Prism Kicks Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0" 
                referrerPolicy="no-referrer"
              />
              <LogoName className="scale-75 sm:scale-90 origin-left" />
            </Link>
            
            {/* Middle: Nav Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-7 font-bold text-[13px] xl:text-[15px] uppercase tracking-wider">
              <Link to="/" className={`hover:text-royal-gold transition-colors ${location.pathname === '/' ? 'text-royal-gold' : ''}`}>Home</Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-royal-gold transition-colors uppercase">
                  Products <ChevronRight size={14} className="rotate-90" />
                </button>
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 bg-[#080808] border border-white/10 rounded-xl mt-2 py-4 shadow-2xl"
                    >
                      {categories.map(cat => (
                        <Link 
                          key={cat.path} 
                          to={cat.path} 
                          className="block px-6 py-2 hover:bg-royal-gold hover:text-deep-black transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <div className="border-t border-white/5 mt-2 pt-2">
                        <Link to="/catalog" className="block px-6 py-2 hover:text-royal-gold transition-colors font-black">View All</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`hover:text-royal-gold transition-colors ${location.pathname === link.path ? 'text-royal-gold' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Icons & Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 sm:p-3 rounded-full hover:bg-border-subtle transition-colors text-text-primary hover:text-maroon"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="text-text-primary hover:text-maroon transition-colors hidden sm:block p-2">
                <Search size={20} />
              </button>
              <Link to="/cart" className="text-text-primary hover:text-maroon transition-colors relative p-2">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-deep-black">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link 
                to="/reseller"
                className="hidden sm:flex items-center gap-2 bg-royal-gold hover:bg-royal-gold/90 text-deep-black px-6 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-royal-gold/20"
              >
                RESELLER হন
              </Link>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-text-primary"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-deep-black pt-36 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-cinzel text-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <div className="py-2 border-y border-white/5">
                <p className="text-xs text-royal-gold uppercase tracking-widest mb-4">Categories</p>
                <div className="grid grid-cols-1 gap-4">
                  {categories.map(cat => (
                    <Link key={cat.path} to={cat.path} onClick={() => setIsMenuOpen(false)} className="text-lg">{cat.name}</Link>
                  ))}
                </div>
              </div>
              {navLinks.slice(1).map(link => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
              ))}
              <Link 
                to="/reseller" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-royal-gold text-deep-black py-4 rounded-xl font-bold uppercase tracking-widest"
              >
                Reseller হন
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-24 md:pb-0">{children}</main>
      
      <MobileStickyBar />
      <FloatingWhatsApp />

      {/* Footer */}
      <footer className="bg-deep-black border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Col 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-0.5 mb-8 min-w-max">
              <img 
                src="https://lh3.googleusercontent.com/d/1cEF5GtBERApKY0qBJPz1JNuFgUk86URX" 
                alt="Prism Kicks Logo" 
                className="w-12 h-12 object-contain shrink-0" 
                referrerPolicy="no-referrer"
              />
              <LogoName className="items-start" />
            </div>
            <p className="text-off-white/50 text-sm font-medium">
              Bangladesh's Trusted T-shirt Wholesaler. Quality fabric, premium prints, and factory prices.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-maroon font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-off-white/60 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/wholesale-inquiry" className="hover:text-white transition-colors">Wholesale Inquiry</Link></li>
              <li><Link to="/reseller" className="hover:text-white transition-colors">Reseller হন</Link></li>
              <li><Link to="/how-to-order" className="hover:text-white transition-colors">কীভাবে অর্ডার করবেন</Link></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="text-maroon font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-off-white/60 text-sm">
              <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="text-maroon font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/share/1XSmanaXQk/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-royal-gold hover:text-deep-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/8801856078978" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="mailto:info@prismkicks.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-steel-blue hover:text-white transition-all">
                <Send size={18} />
              </a>
            </div>
            
            {/* Facebook Page Embed */}
            <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
              <div 
                className="fb-page" 
                data-href="https://www.facebook.com/share/1XSmanaXQk/" 
                data-tabs="timeline" 
                data-width="" 
                data-height="70" 
                data-small-header="true" 
                data-adapt-container-width="true" 
                data-hide-cover="false" 
                data-show-facepile="false"
              >
                <blockquote cite="https://www.facebook.com/share/1XSmanaXQk/" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/share/1XSmanaXQk/">Prism Kicks</a>
                </blockquote>
              </div>
            </div>
            
            <p className="text-xs text-off-white/40 mt-6">Dhaka, Bangladesh</p>
            <Link to="/admin" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-off-white/10 hover:text-royal-gold mt-4 transition-colors">
              <Settings size={10} /> Admin Panel
            </Link>
          </div>
        </div>
        
        {/* Facebook SDK Script */}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"></script>
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 text-center text-off-white/30 text-[10px] tracking-[0.2em] uppercase">
          &copy; 2025 Prism Kicks. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
