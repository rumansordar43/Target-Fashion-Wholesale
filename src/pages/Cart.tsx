import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ChevronLeft,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../CartContext';

export default function Cart() {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-32 px-4 max-w-7xl mx-auto text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-off-white/20">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Your Cart is Empty</h1>
        <p className="text-off-white/50 mb-12 bangla">আপনার কার্টে কোনো পণ্য নেই। শপিং শুরু করতে ক্যাটালগ দেখুন।</p>
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 bg-royal-gold text-deep-black px-8 py-4 rounded-2xl font-black hover:bg-white transition-all uppercase tracking-widest"
        >
          Browse Catalog <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your <span className="text-royal-gold">Cart</span></h1>
        <Link to="/catalog" className="text-off-white/50 hover:text-royal-gold flex items-center gap-2 font-bold transition-colors">
          <ChevronLeft size={20} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div 
                key={`${item.product.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-dark-card p-6 rounded-[2rem] border border-white/5 flex gap-6 items-center"
              >
                <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <img src={item.product.image_url} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight">{item.product.title}</h3>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-off-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-off-white/40 mb-4 uppercase tracking-widest font-bold">
                    <span className="bg-white/5 px-3 py-1 rounded-full">Size: {item.size}</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full">Color: {item.color}</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full">Qty: {item.quantity}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xl font-black text-royal-gold">৳{item.product.retail_price * item.quantity}</div>
                    <div className="text-[10px] text-off-white/30">৳{item.product.retail_price} / pc</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card p-10 rounded-[3rem] border border-white/10 sticky top-32">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-off-white/60">
                <span>Subtotal ({totalItems} items)</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-off-white/60">
                <span>Shipping</span>
                <span className="text-green-500">Calculated at checkout</span>
              </div>
              <div className="h-px bg-white/5 my-4"></div>
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-royal-gold">৳{totalPrice}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-royal-gold text-deep-black py-5 rounded-2xl font-black hover:bg-white transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
            >
              Proceed to Checkout <ArrowRight size={24} />
            </Link>
            
            <p className="mt-6 text-center text-xs text-off-white/30 bangla">
              * পাইকারি অর্ডারের জন্য চেকআউট করার পর আমাদের টিম যোগাযোগ করবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
