import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  LogOut,
  Lock,
  ChevronRight,
  Save,
  X,
  Image as ImageIcon,
  Tag,
  Layers,
  BarChart3,
  RefreshCw,
  Settings
} from 'lucide-react';
import { LogoName } from '../components/Logo';

const ADMIN_TOKEN = "prism_admin_2025";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    announcement_bar: {
      enabled: true,
      text: '',
      backgroundColor: '#800000',
      textColor: '#ffffff'
    },
    benefits_section_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('prism_admin_token');
    if (savedToken === ADMIN_TOKEN) {
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_TOKEN) {
      setIsLoggedIn(true);
      localStorage.setItem('prism_admin_token', ADMIN_TOKEN);
      fetchAllData();
    } else {
      setLoginError('Invalid Password. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('prism_admin_token');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const headers = { 'x-admin-token': ADMIN_TOKEN };
      const [pRes, oRes, cRes] = await Promise.all([
        fetch('/api/admin/products', { headers }),
        fetch('/api/admin/orders', { headers }),
        fetch('/api/admin/categories', { headers })
      ]);

      if (pRes.ok) setProducts(await pRes.json());
      if (oRes.ok) setOrders(await oRes.json());
      if (cRes.ok) setCategories(await cRes.json());
      
      const sRes = await fetch(`/api/settings?t=${Date.now()}`);
      if (sRes.ok) {
        const data = await sRes.json();
        setSettings({
          announcement_bar: data.announcement_bar || {
            enabled: true,
            text: '',
            backgroundColor: '#800000',
            textColor: '#ffffff'
          },
          benefits_section_image: data.benefits_section_image || ''
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': ADMIN_TOKEN 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': ADMIN_TOKEN }
      });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct.id ? 'PUT' : 'POST';
    const url = editingProduct.id ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
    
    const productToSave = {
      ...editingProduct,
      gallery: (editingProduct.gallery || []).filter((url: string) => url && url.trim() !== '')
    };
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': ADMIN_TOKEN 
        },
        body: JSON.stringify(productToSave)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsProductModalOpen(false);
        fetchAllData();
        alert("Product saved successfully!");
      } else {
        alert("Error saving product: " + (data.error || "Unknown error"));
      }
    } catch (error: any) {
      console.error("Save product error:", error);
      alert("Failed to save product. Please check your connection.");
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingCategory.id ? 'PUT' : 'POST';
    const url = editingCategory.id ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': ADMIN_TOKEN 
        },
        body: JSON.stringify(editingCategory)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsCategoryModalOpen(false);
        fetchAllData();
        alert("Collection saved successfully!");
      } else {
        alert("Error saving collection: " + (data.error || "Unknown error"));
      }
    } catch (error: any) {
      console.error("Save category error:", error);
      alert("Failed to save collection. Please check your connection.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': ADMIN_TOKEN }
      });
      if (res.ok) fetchAllData();
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  const handleSaveSettings = async (key: string, value: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': ADMIN_TOKEN 
        },
        body: JSON.stringify({ key, value })
      });
      if (res.ok) {
        alert('Settings saved successfully!');
        fetchAllData();
      }
    } catch (error) {
      console.error("Save settings error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-black px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card p-12 rounded-[3rem] border border-white/10 w-full max-w-md shadow-2xl"
        >
          <div className="flex items-center justify-center gap-0.5 mb-8 min-w-max">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1cEF5GtBERApKY0qBJPz1JNuFgUk86URX" 
                alt="Prism Kicks Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <LogoName className="scale-75 sm:scale-90 origin-left" />
          </div>
          <h1 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Enter Admin Password" 
                className={`w-full bg-deep-black border rounded-2xl p-5 outline-none transition-all text-center ${loginError ? 'border-red-500' : 'border-white/10 focus:border-royal-gold'}`}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                required
              />
              {loginError && <p className="text-red-500 text-xs text-center mt-2 font-bold">{loginError}</p>}
            </div>
            <button className="w-full bg-royal-gold text-deep-black py-5 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest">
              Login to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black flex">
      {/* Sidebar */}
      <div className="w-20 lg:w-72 bg-dark-card border-r border-white/5 flex flex-col">
        <div className="p-8 flex items-center gap-0.5 min-w-max">
          <img 
            src="https://lh3.googleusercontent.com/d/1cEF5GtBERApKY0qBJPz1JNuFgUk86URX" 
            alt="Prism Kicks Logo" 
            className="w-8 h-8 object-contain shrink-0" 
            referrerPolicy="no-referrer" 
          />
          <LogoName className="hidden lg:flex scale-75 origin-left" />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {[
            { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
            { id: 'products', icon: <Package size={20} />, label: 'Products' },
            { id: 'collections', icon: <Layers size={20} />, label: 'Collections' },
            { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                activeTab === item.id ? 'bg-royal-gold text-deep-black font-bold' : 'text-off-white/50 hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="hidden lg:block text-sm uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="hidden lg:block text-sm uppercase tracking-wider font-bold">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter">
              {activeTab === 'dashboard' && 'Overview'}
              {activeTab === 'products' && 'Inventory Management'}
              {activeTab === 'collections' && 'Collection Management'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'settings' && 'Site Settings'}
            </h2>
            <p className="text-off-white/40 mt-2 bangla">সিস্টেমের বর্তমান অবস্থা এবং ডেটা ম্যানেজমেন্ট।</p>
          </div>
          <button 
            onClick={fetchAllData}
            className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-royal-gold"
          >
            <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard label="Total Products" value={products.length} icon={<Package />} color="blue" />
            <StatCard label="Pending Orders" value={orders.filter(o => o.status === 'Pending').length} icon={<ShoppingBag />} color="orange" />
            <StatCard label="Total Orders" value={orders.length} icon={<CheckCircle />} color="green" />
            <StatCard label="Total Revenue" value={`৳${orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.total_amount, 0)}`} icon={<BarChart3 />} color="purple" />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="relative w-96">
                <Search className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-dark-card border border-white/5 rounded-2xl p-4 pl-12 outline-none focus:border-royal-gold transition-all"
                />
              </div>
              <button 
                onClick={() => {
                  setEditingProduct({
                    title: '', sku: '', slug: '', category: categories[0]?.title || 'Solid', retail_price: 0,
                    image_url: '', image_url_2: '', gallery: [], description: '', badge: '',
                    fabric: '', gsm: '', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: [], stock_count: 0, tags: [], status: 'Active', is_popular: false
                  });
                  setIsProductModalOpen(true);
                }}
                className="bg-royal-gold text-deep-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-white transition-all uppercase tracking-widest"
              >
                <Plus size={20} /> Add Product
              </button>
            </div>

            <div className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-widest text-off-white/40">
                    <th className="p-6">Prism Kicks Product</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Retail Price</th>
                    <th className="p-6">Stock</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-off-white/30 font-bold uppercase tracking-widest">
                        No products found. Add your first product!
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} className="hover:bg-white/5 transition-all group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <img src={product.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-sm">{product.title}</div>
                              <div className="text-xs text-off-white/30">{product.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm text-off-white/60 font-medium">{product.category}</td>
                        <td className="p-6 font-bold text-royal-gold text-lg">৳{product.retail_price}</td>
                        <td className="p-6">
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${product.stock_count < 50 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                            {product.stock_count} in stock
                          </span>
                        </td>
                        <td className="p-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-off-white/40">{product.status}</span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => {
                                setEditingProduct(product);
                                setIsProductModalOpen(true);
                              }}
                              className="p-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500 transition-all hover:text-white"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 transition-all hover:text-white"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setEditingCategory({ title: '', slug: '', image_url: '', description: '' });
                  setIsCategoryModalOpen(true);
                }}
                className="bg-royal-gold text-deep-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-white transition-all uppercase tracking-widest"
              >
                <Plus size={20} /> Add Collection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map(cat => (
                <div key={cat.id} className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={cat.image_url} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6">
                        <h4 className="text-2xl font-black uppercase tracking-tighter">{cat.title}</h4>
                        <p className="text-xs text-off-white/40 font-mono uppercase tracking-widest">/{cat.slug}</p>
                      </div>
                  </div>
                  <div className="p-6 flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsCategoryModalOpen(true);
                      }}
                      className="p-3 bg-blue-500/20 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-dark-card rounded-[2.5rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-off-white/40">
                  <th className="p-6">Order ID</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Items</th>
                  <th className="p-6">Total</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-off-white/30 font-bold uppercase tracking-widest">
                      No orders placed yet.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-all">
                      <td className="p-6 font-mono text-xs text-royal-gold">#ORD-{order.id}</td>
                      <td className="p-6">
                        <div className="font-bold text-sm">{order.customer_name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-[10px] text-off-white/30">{order.customer_phone}</div>
                          <button 
                            onClick={() => copyToClipboard(order.customer_phone)}
                            className="text-[8px] uppercase tracking-widest text-off-white/20 hover:text-royal-gold transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                      <td className="p-6 text-sm text-off-white/60">{order.items.length} items</td>
                      <td className="p-6 font-bold">৳{order.total_amount}</td>
                      <td className="p-6">
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-widest bg-transparent border-none outline-none cursor-pointer ${
                            order.status === 'Pending' ? 'text-orange-500' : 
                            order.status === 'Processing' ? 'text-blue-500' : 
                            order.status === 'Shipped' ? 'text-purple-500' : 'text-green-500'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-6 text-xs text-off-white/30">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-6 text-right">
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8 pb-20">
            {/* Announcement Bar Settings */}
            <div className="bg-dark-card p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                <BarChart3 className="text-royal-gold" /> Announcement Bar
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-deep-black rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold uppercase tracking-widest text-xs mb-1">Enable Banner</p>
                    <p className="text-[10px] text-off-white/40 bangla">ব্যানারটি ওয়েবসাইটে দেখাবে কি না তা নির্ধারণ করুন।</p>
                  </div>
                  <button 
                    onClick={() => setSettings({...settings, announcement_bar: {...settings.announcement_bar, enabled: !settings.announcement_bar.enabled}})}
                    className={`w-16 h-8 rounded-full transition-all relative ${settings.announcement_bar.enabled ? 'bg-royal-gold' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-deep-black transition-all ${settings.announcement_bar.enabled ? 'left-9' : 'left-1'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-widest text-off-white/40 font-bold ml-2">Banner Text</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all resize-none font-bold"
                    value={settings.announcement_bar.text}
                    onChange={e => setSettings({...settings, announcement_bar: {...settings.announcement_bar, text: e.target.value}})}
                    placeholder="Enter announcement text..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 font-bold ml-2">Background Color</label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                        value={settings.announcement_bar.backgroundColor}
                        onChange={e => setSettings({...settings, announcement_bar: {...settings.announcement_bar, backgroundColor: e.target.value}})}
                      />
                      <input 
                        type="text" 
                        className="flex-1 bg-deep-black border border-white/10 rounded-xl px-4 outline-none focus:border-royal-gold transition-all font-mono text-sm uppercase"
                        value={settings.announcement_bar.backgroundColor}
                        onChange={e => setSettings({...settings, announcement_bar: {...settings.announcement_bar, backgroundColor: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 font-bold ml-2">Text Color</label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                        value={settings.announcement_bar.textColor}
                        onChange={e => setSettings({...settings, announcement_bar: {...settings.announcement_bar, textColor: e.target.value}})}
                      />
                      <input 
                        type="text" 
                        className="flex-1 bg-deep-black border border-white/10 rounded-xl px-4 outline-none focus:border-royal-gold transition-all font-mono text-sm uppercase"
                        value={settings.announcement_bar.textColor}
                        onChange={e => setSettings({...settings, announcement_bar: {...settings.announcement_bar, textColor: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => handleSaveSettings('announcement_bar', settings.announcement_bar)}
                    disabled={loading}
                    className="w-full bg-royal-gold text-deep-black py-5 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-royal-gold/20"
                  >
                    <Save size={24} /> {loading ? 'Saving...' : 'Save Banner Settings'}
                  </button>
                </div>
              </div>
            </div>

            {/* Benefits Section Image Settings */}
            <div className="bg-dark-card p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                <ImageIcon className="text-royal-gold" /> Benefits Section Image
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-widest text-off-white/40 font-bold ml-2">Image URL</label>
                  <input 
                    type="url"
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all font-bold"
                    value={settings.benefits_section_image}
                    onChange={e => setSettings({...settings, benefits_section_image: e.target.value})}
                    placeholder="Enter image URL..."
                  />
                </div>

                {settings.benefits_section_image && (
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <img 
                      src={settings.benefits_section_image} 
                      className="w-full h-full object-cover" 
                      alt="Preview" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="pt-8">
                  <button 
                    onClick={() => handleSaveSettings('benefits_section_image', settings.benefits_section_image)}
                    disabled={loading}
                    className="w-full bg-royal-gold text-deep-black py-5 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-royal-gold/20"
                  >
                    <Save size={24} /> {loading ? 'Saving...' : 'Save Image Setting'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-royal-gold/5 p-8 rounded-[2rem] border border-royal-gold/10">
              <h4 className="text-royal-gold font-bold uppercase tracking-widest text-xs mb-4">Banner Preview</h4>
              {!settings.announcement_bar.enabled ? (
                <div className="py-8 text-center text-off-white/20 border border-dashed border-white/10 rounded-xl uppercase tracking-widest text-[10px] font-bold">
                  Banner is currently disabled
                </div>
              ) : (
                <div 
                  className="py-3 px-6 rounded-xl overflow-hidden whitespace-nowrap relative"
                  style={{ backgroundColor: settings.announcement_bar.backgroundColor, color: settings.announcement_bar.textColor }}
                >
                  <div className="animate-marquee inline-block font-bold text-xs uppercase">
                    {settings.announcement_bar.text} &nbsp;&nbsp;&nbsp;&nbsp; {settings.announcement_bar.text}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Collection Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute inset-0 bg-deep-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-card border border-white/10 rounded-[3rem] w-full max-w-2xl shadow-2xl"
            >
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    {editingCategory.id ? 'Edit Collection' : 'Add New Collection'}
                  </h3>
                  <button onClick={() => setIsCategoryModalOpen(false)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSaveCategory} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Collection Title</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                      value={editingCategory.title}
                      onChange={e => setEditingCategory({...editingCategory, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Slug (URL path)</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                      value={editingCategory.slug}
                      onChange={e => setEditingCategory({...editingCategory, slug: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Cover Image URL</label>
                    <input 
                      type="url" 
                      required
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                      value={editingCategory.image_url}
                      onChange={e => setEditingCategory({...editingCategory, image_url: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Description (Optional)</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all resize-none"
                      value={editingCategory.description || ''}
                      onChange={e => setEditingCategory({...editingCategory, description: e.target.value})}
                    />
                  </div>

                  <div className="pt-8">
                    <button className="w-full bg-royal-gold text-text-primary py-6 rounded-2xl font-black hover:bg-text-primary hover:text-deep-black transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                      <Save size={24} /> Save Collection
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="absolute inset-0 bg-deep-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-card border border-white/10 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <button onClick={() => setIsProductModalOpen(false)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Product Title</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.title}
                        onChange={e => setEditingProduct({...editingProduct, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">SKU</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                          value={editingProduct.sku}
                          onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Slug</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                          value={editingProduct.slug}
                          onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Retail Price</label>
                        <input 
                          type="number" 
                          required
                          className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                          value={editingProduct.retail_price}
                          onChange={e => setEditingProduct({...editingProduct, retail_price: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Stock Count</label>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.stock_count}
                        onChange={e => setEditingProduct({...editingProduct, stock_count: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Main Image URL (Required)</label>
                      <input 
                        type="url" 
                        required
                        placeholder="https://example.com/main-image.jpg"
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.image_url}
                        onChange={e => setEditingProduct({...editingProduct, image_url: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index}>
                          <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Gallery Image {index + 2} (Optional)</label>
                          <input 
                            type="url" 
                            placeholder={`https://example.com/image-${index + 2}.jpg`}
                            className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                            value={editingProduct.gallery?.[index] || ''}
                            onChange={e => {
                              const newGallery = [...(editingProduct.gallery || [])];
                              newGallery[index] = e.target.value;
                              setEditingProduct({...editingProduct, gallery: newGallery});
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Category</label>
                      <select 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all appearance-none"
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.title}>{cat.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Badge</label>
                      <select 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all appearance-none"
                        value={editingProduct.badge || ''}
                        onChange={e => setEditingProduct({...editingProduct, badge: e.target.value || null})}
                      >
                        <option value="">No Badge</option>
                        <option value="NEW">NEW</option>
                        <option value="HOT">HOT</option>
                        <option value="BEST SELLER">BEST SELLER</option>
                        <option value="LIMITED STOCK">LIMITED STOCK</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Fabric</label>
                      <input 
                        type="text" 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.fabric}
                        onChange={e => setEditingProduct({...editingProduct, fabric: e.target.value})}
                        placeholder="e.g. 100% Cotton"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">GSM</label>
                      <input 
                        type="text" 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.gsm}
                        onChange={e => setEditingProduct({...editingProduct, gsm: e.target.value})}
                        placeholder="e.g. 180-190"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Sizes (Comma separated)</label>
                      <input 
                        type="text" 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(', ') : ''}
                        onChange={e => setEditingProduct({...editingProduct, sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                        placeholder="S, M, L, XL, XXL"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={Array.isArray(editingProduct.tags) ? editingProduct.tags.join(', ') : ''}
                        onChange={e => setEditingProduct({...editingProduct, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                        placeholder="new-arrival, featured, hot"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Description</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all resize-none"
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                      />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-deep-black rounded-2xl border border-white/5">
                      <input 
                        type="checkbox" 
                        id="is_popular"
                        checked={editingProduct.is_popular}
                        onChange={e => setEditingProduct({...editingProduct, is_popular: e.target.checked})}
                        className="w-5 h-5 accent-royal-gold"
                      />
                      <label htmlFor="is_popular" className="text-sm font-bold uppercase tracking-widest text-off-white/60">Mark as Popular</label>
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-8">
                    <button className="w-full bg-royal-gold text-text-primary py-6 rounded-2xl font-black hover:bg-text-primary hover:text-deep-black transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                      <Save size={24} /> Save Product Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-500/20 text-blue-500',
    orange: 'bg-orange-500/20 text-orange-500',
    green: 'bg-green-500/20 text-green-500',
    purple: 'bg-purple-500/20 text-purple-500',
  };

  return (
    <div className="bg-dark-card p-8 rounded-[2.5rem] border border-white/5">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colors[color]}`}>
        {icon}
      </div>
      <div className="text-4xl font-black mb-1">{value}</div>
      <div className="text-xs uppercase tracking-widest text-off-white/40 font-bold">{label}</div>
    </div>
  );
}
