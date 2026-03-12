import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  ChevronLeft, 
  Truck, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../CartContext';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'Cash on Delivery'
  });

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          shipping_address: `${form.address}, ${form.city}`,
          total_amount: totalPrice,
          items: cart.map(item => ({
            product_id: item.product.id,
            title: item.product.title,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.product.retail_price
          }))
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        clearCart();
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-32 px-4 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Order Placed!</h1>
        <p className="text-xl text-off-white/50 mb-12 bangla">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 bg-royal-gold text-deep-black px-8 py-4 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest"
        >
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Check<span className="text-royal-gold">out</span></h1>
        <Link to="/cart" className="text-off-white/50 hover:text-royal-gold flex items-center gap-2 font-bold transition-colors">
          <ChevronLeft size={20} /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Form */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
              <Truck className="text-royal-gold" /> Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  className="w-full bg-dark-card border border-white/10 rounded-2xl p-5 outline-none focus:border-royal-gold transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  className="w-full bg-dark-card border border-white/10 rounded-2xl p-5 outline-none focus:border-royal-gold transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>
              <input 
                type="text" 
                placeholder="Full Address" 
                required
                className="w-full bg-dark-card border border-white/10 rounded-2xl p-5 outline-none focus:border-royal-gold transition-all"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="City" 
                required
                className="w-full bg-dark-card border border-white/10 rounded-2xl p-5 outline-none focus:border-royal-gold transition-all"
                value={form.city}
                onChange={e => setForm({...form, city: e.target.value})}
              />

              <div className="pt-8">
                <h2 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                  <CreditCard className="text-royal-gold" /> Payment Method
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <label className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${form.paymentMethod === 'Cash on Delivery' ? 'border-royal-gold bg-royal-gold/5' : 'border-white/5 bg-dark-card hover:border-white/20'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.paymentMethod === 'Cash on Delivery' ? 'border-royal-gold' : 'border-white/20'}`}>
                        {form.paymentMethod === 'Cash on Delivery' && <div className="w-3 h-3 bg-royal-gold rounded-full" />}
                      </div>
                      <span className="font-bold">Cash on Delivery</span>
                    </div>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden"
                      checked={form.paymentMethod === 'Cash on Delivery'}
                      onChange={() => setForm({...form, paymentMethod: 'Cash on Delivery'})}
                    />
                  </label>
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-royal-gold text-deep-black py-6 rounded-2xl font-black hover:bg-white transition-all flex items-center justify-center gap-3 text-xl uppercase tracking-widest mt-12"
              >
                {isSubmitting ? 'Processing...' : 'Place Order Now'}
              </button>
            </form>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:pl-12">
          <div className="bg-dark-card p-10 rounded-[3rem] border border-white/10">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Order Summary</h2>
            <div className="space-y-6 mb-8">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-16 h-20 rounded-xl overflow-hidden border border-white/5 shrink-0">
                    <img src={item.product.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-tight">{item.product.title}</h4>
                    <p className="text-[10px] text-off-white/40 uppercase tracking-widest">{item.size} / {item.color} x {item.quantity}</p>
                  </div>
                  <div className="font-bold">৳{item.product.retail_price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div className="h-px bg-white/5 my-8"></div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-off-white/60">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-off-white/60">
                <span>Shipping</span>
                <span>৳0 (Free)</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4">
                <span>Total</span>
                <span className="text-royal-gold">৳{totalPrice}</span>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4">
              <ShieldCheck className="text-royal-gold shrink-0" size={24} />
              <p className="text-xs text-off-white/50 leading-relaxed bangla">
                আপনার পেমেন্ট এবং তথ্য সম্পূর্ণ সুরক্ষিত। অর্ডার করার পর আমাদের কাস্টমার সাপোর্ট থেকে কনফার্মেশন কল দেওয়া হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
