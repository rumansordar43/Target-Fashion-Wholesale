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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [categories, setCategories] = useState<any[]>([]);
  const [announcement, setAnnouncement] = useState<{ enabled: boolean, text: string, backgroundColor: string, textColor: string }>({
    enabled: false,
    text: "",
    backgroundColor: "#800000",
    textColor: "#ffffff"
  });
  const location = useLocation();

  useEffect(() => {
    const fetchAnnouncement = () => {
      fetch(`/api/announcement-bar?t=${Date.now()}`)
        .then(res => res.json())
        .then(data => setAnnouncement(data))
        .catch(err => console.error('Failed to fetch announcement bar:', err));
    };

    fetchAnnouncement();

    const fetchCategories = () => {
      fetch('/api/categories')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error('Failed to fetch categories:', err));
    };

    fetchCategories();
  }, [location.pathname]);
  const { totalItems } = useCart();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Offers', path: '/offers' },
    { name: 'কীভাবে অর্ডার করবেন', path: '/how-to-order' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-deep-black text-off-white selection:bg-royal-gold selection:text-deep-black transition-colors duration-300">
      {/* Announcement Bar */}
      {announcement.enabled && (
        <div 
          className="py-2 overflow-hidden whitespace-nowrap relative border-b border-royal-gold/20"
          style={{ backgroundColor: announcement.backgroundColor }}
        >
          <div 
            className="animate-marquee inline-block px-4 text-xs font-bold tracking-wider uppercase"
            style={{ color: announcement.textColor }}
          >
            <span className="bangla">
              {announcement.text} &nbsp;&nbsp;&nbsp;&nbsp; {announcement.text}
            </span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-deep-black/95 backdrop-blur-2xl border-b border-border-subtle h-[110px] flex items-center">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center gap-2 xl:gap-8">
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
            <div className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-12 font-bold text-[13px] xl:text-[15px] 2xl:text-[17px] uppercase tracking-wider whitespace-nowrap">
              <Link to="/" className={`hover:text-royal-gold transition-colors ${location.pathname === '/' ? 'text-royal-gold' : ''}`}>Home</Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-royal-gold transition-colors uppercase">
                  Products <ChevronRight size={12} className="rotate-90" />
                </button>
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-56 bg-dark-card border border-border-subtle rounded-xl mt-2 py-4 shadow-2xl"
                    >
                      {categories.map(cat => (
                        <Link 
                          key={cat.id} 
                          to={`/category/${cat.slug}`} 
                          className="block px-6 py-2 hover:bg-royal-gold hover:text-deep-black transition-colors text-text-primary"
                        >
                          {cat.title}
                        </Link>
                      ))}
                      <div className="border-t border-border-subtle mt-2 pt-2">
                        <Link to="/catalog" className="block px-6 py-2 hover:text-royal-gold transition-colors font-black text-text-primary">View All</Link>
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
            <div className="flex items-center gap-1 sm:gap-2 xl:gap-4 shrink-0">
              <button 
                onClick={toggleTheme}
                className="p-2 sm:p-3 rounded-full hover:bg-border-subtle transition-colors text-text-primary hover:text-maroon"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
              <button className="text-text-primary hover:text-maroon transition-colors hidden sm:block p-2">
                <Search size={20} />
              </button>
              <Link to="/cart" className="text-text-primary hover:text-maroon transition-colors relative p-2">
                <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-deep-black">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-text-primary hover:text-maroon transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-7 h-7 sm:w-8 sm:h-8" />
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
            className="fixed inset-0 z-[60] bg-deep-black lg:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col min-h-screen">
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1cEF5GtBERApKY0qBJPz1JNuFgUk86URX" 
                    alt="Logo" 
                    className="w-10 h-10 object-contain" 
                    referrerPolicy="no-referrer"
                  />
                  <LogoName className="scale-75 origin-left" />
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-text-primary hover:text-maroon transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-xl font-cinzel text-center mb-12">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/' ? 'text-royal-gold' : ''}>Home</Link>
                
                <div className="py-4 border-y border-border-subtle">
                  <p className="text-xs text-royal-gold uppercase tracking-widest mb-6 font-bold">Categories</p>
                  <div className="grid grid-cols-1 gap-5">
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} 
                        to={`/category/${cat.slug}`} 
                        onClick={() => setIsMenuOpen(false)} 
                        className={`text-lg ${location.pathname === `/category/${cat.slug}` ? 'text-royal-gold' : ''}`}
                      >
                        {cat.title}
                      </Link>
                    ))}
                    <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-maroon">View All Products</Link>
                  </div>
                </div>

                {navLinks.slice(1).map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={location.pathname === link.path ? 'text-royal-gold' : ''}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-border-subtle flex flex-col gap-4">
                <div className="flex justify-center gap-6 py-4">
                  <a href="https://www.facebook.com/share/1XSmanaXQk/" target="_blank" className="text-text-primary hover:text-royal-gold"><Facebook size={24} /></a>
                  <a href="https://wa.me/8801856078978" target="_blank" className="text-text-primary hover:text-green-500"><MessageSquare size={24} /></a>
                  <a href="mailto:info@prismkicks.com" className="text-text-primary hover:text-steel-blue"><Send size={24} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-24 md:pb-0">{children}</main>
      
      <MobileStickyBar />
      <FloatingWhatsApp />

      {/* Footer */}
      <footer className="bg-deep-black border-t border-border-subtle pt-20 pb-10">
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
              Bangladesh's Trusted T-shirt Retailer. Quality fabric, premium prints, and best prices.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-maroon font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-off-white/60 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/how-to-order" className="hover:text-white transition-colors">কীভাবে অর্ডার করবেন</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
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
            <div className="mt-8 overflow-hidden rounded-xl border border-border-subtle">
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
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-border-subtle text-center text-off-white/30 text-[10px] tracking-[0.2em] uppercase">
          &copy; 2025 Prism Kicks. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
