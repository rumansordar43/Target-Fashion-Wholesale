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
  RefreshCw
} from 'lucide-react';

const ADMIN_TOKEN = "target-admin-secret-2026";

const LogoName = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center leading-none ${className}`}>
    <span className="font-serif font-black text-2xl sm:text-3xl tracking-tighter bg-gradient-to-b from-[#D4AF37] from-50% to-[#1E3A8A] to-50% bg-clip-text text-transparent">
      TARGET
    </span>
    <span className="font-sans font-bold text-[10px] sm:text-[12px] tracking-[0.4em] text-[#800000] mt-0.5">
      FASHION
    </span>
  </div>
);

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<any[]>([]);
  const [wholesaleInquiries, setWholesaleInquiries] = useState<any[]>([]);
  const [resellerInquiries, setResellerInquiries] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
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
      localStorage.setItem('admin_token', ADMIN_TOKEN);
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
    localStorage.removeItem('admin_token');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const headers = { 'x-admin-token': ADMIN_TOKEN };
      const [pRes, wRes, rRes, oRes] = await Promise.all([
        fetch('/api/admin/products', { headers }),
        fetch('/api/admin/inquiries', { headers }),
        fetch('/api/admin/reseller-inquiries', { headers }),
        fetch('/api/admin/orders', { headers })
      ]);

      if (pRes.ok) setProducts(await pRes.json());
      if (wRes.ok) setWholesaleInquiries(await wRes.json());
      if (rRes.ok) setResellerInquiries(await rRes.json());
      if (oRes.ok) setOrders(await oRes.json());
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
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': ADMIN_TOKEN 
        },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        setIsProductModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      console.error("Save product error:", error);
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
          <div className="flex items-center justify-center gap-2 mb-8 min-w-max">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center overflow-hidden shrink-0">
              <img src="https://i.ibb.co/jkF1kQbx/logo.png" alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <LogoName className="scale-90 sm:scale-100 origin-left" />
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
        <div className="p-8 flex items-center gap-2 min-w-max">
          <img src="https://i.ibb.co/jkF1kQbx/logo.png" alt="Logo" className="w-8 h-8 object-contain shrink-0" referrerPolicy="no-referrer" />
          <LogoName className="hidden lg:flex scale-75 origin-left" />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {[
            { id: 'dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
            { id: 'products', icon: <Package size={20} />, label: 'Products' },
            { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
            { id: 'wholesale', icon: <MessageSquare size={20} />, label: 'Wholesale Inquiries' },
            { id: 'resellers', icon: <Users size={20} />, label: 'Reseller Inquiries' },
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
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'wholesale' && 'Wholesale Leads'}
              {activeTab === 'resellers' && 'Reseller Applications'}
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
            <StatCard label="New Inquiries" value={wholesaleInquiries.filter(i => i.status === 'Pending').length} icon={<MessageSquare />} color="green" />
            <StatCard label="Reseller Apps" value={resellerInquiries.filter(i => i.status === 'Pending').length} icon={<Users />} color="purple" />
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
                    title: '', sku: '', slug: '', category: 'Solid', retail_price: 0, wholesale_price_range: '',
                    image_url: '', image_url_2: '', gallery: [], description: '', badge: '',
                    fabric: '', gsm: '', sizes: [], colors: [], stock_count: 0, moq: 12, tags: [], status: 'Active', is_popular: false
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
                  <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-off-white/40">
                    <th className="p-6">Product</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Retail Price</th>
                    <th className="p-6">Wholesale Price</th>
                    <th className="p-6">Stock</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-white/5 transition-all group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={product.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-sm">{product.title}</div>
                            <div className="text-[10px] text-off-white/30">{product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm text-off-white/60">{product.category}</td>
                      <td className="p-6 font-bold text-royal-gold">৳{product.retail_price}</td>
                      <td className="p-6 text-sm text-off-white/60">{product.wholesale_price_range}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${product.stock_count < 50 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                          {product.stock_count} in stock
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-off-white/40">{product.status}</span>
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
                  ))}
                </tbody>
              </table>
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
                {orders.map(order => (
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'wholesale' && (
          <div className="grid grid-cols-1 gap-6">
            {wholesaleInquiries.map(inquiry => (
              <div key={inquiry.id} className="bg-dark-card p-8 rounded-[2rem] border border-white/5 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-royal-gold/20 text-royal-gold text-[10px] font-bold rounded-full uppercase tracking-widest">Wholesale Inquiry</span>
                    <span className="text-[10px] text-off-white/30">{new Date(inquiry.created_at).toLocaleString()}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{inquiry.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-royal-gold font-mono text-sm">{inquiry.phone}</p>
                    <button 
                      onClick={() => copyToClipboard(inquiry.phone)}
                      className="text-[10px] uppercase tracking-widest text-off-white/20 hover:text-royal-gold transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Business:</span> {inquiry.business_name || 'N/A'}</p>
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Message:</span> {inquiry.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all">
                    <CheckCircle size={20} />
                  </button>
                  <button className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resellers' && (
          <div className="grid grid-cols-1 gap-6">
            {resellerInquiries.map(inquiry => (
              <div key={inquiry.id} className="bg-dark-card p-8 rounded-[2rem] border border-white/5 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Reseller App</span>
                    <span className="text-[10px] text-off-white/30">{new Date(inquiry.created_at).toLocaleString()}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{inquiry.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-royal-gold font-mono text-sm">{inquiry.phone}</p>
                    <button 
                      onClick={() => copyToClipboard(inquiry.phone)}
                      className="text-[10px] uppercase tracking-widest text-off-white/20 hover:text-royal-gold transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Location:</span> {inquiry.location}</p>
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Type:</span> {inquiry.business_name}</p>
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Volume:</span> {inquiry.experience}</p>
                    <p className="text-sm text-off-white/60"><span className="text-off-white/30 uppercase text-[10px] tracking-widest mr-2">Details:</span> {inquiry.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all">
                    <CheckCircle size={20} />
                  </button>
                  <button className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Wholesale Range</label>
                        <input 
                          type="text" 
                          placeholder="e.g. ৳200–৳350"
                          className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                          value={editingProduct.wholesale_price_range}
                          onChange={e => setEditingProduct({...editingProduct, wholesale_price_range: e.target.value})}
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
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Main Image URL</label>
                      <input 
                        type="url" 
                        required
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all"
                        value={editingProduct.image_url}
                        onChange={e => setEditingProduct({...editingProduct, image_url: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">Category</label>
                      <select 
                        className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 outline-none focus:border-royal-gold transition-all appearance-none"
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                      >
                        <option value="Solid">Solid</option>
                        <option value="Graphic">Graphic</option>
                        <option value="Polo">Polo</option>
                        <option value="Oversized">Oversized</option>
                        <option value="Full Sleeve">Full Sleeve</option>
                        <option value="Embroidered">Embroidered</option>
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
                    <button className="w-full bg-royal-gold text-deep-black py-6 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3">
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
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-off-white/40 font-bold">{label}</div>
    </div>
  );
}
