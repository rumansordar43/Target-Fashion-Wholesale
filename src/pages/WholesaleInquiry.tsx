import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Phone, 
  User, 
  MapPin, 
  Send, 
  Package, 
  Layers, 
  Palette, 
  Hash 
} from 'lucide-react';

export default function WholesaleInquiry() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: '',
    sizeColor: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          business_name: form.location, // Using location as business name or context
          message: `Product: ${form.product}, Quantity: ${form.quantity}, Size/Color: ${form.sizeColor}`
        })
      });

      if (response.ok) {
        const message = `New Wholesale Inquiry:
Name: ${form.name}
Phone: ${form.phone}
Product: ${form.product}
Quantity: ${form.quantity}
Size/Color: ${form.sizeColor}
Location: ${form.location}`;
        
        const whatsappUrl = `https://wa.me/8801856078978?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        setSubmitted(true);
        setForm({
          name: '',
          phone: '',
          product: '',
          quantity: '',
          sizeColor: '',
          location: ''
        });
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">Wholesale <br /><span className="text-royal-gold">Inquiry</span></h1>
          <p className="text-lg text-off-white/60 mb-12 bangla max-w-lg">
            আমাদের পাইকারি মূল্য তালিকা এবং ক্যাটালগ পেতে নিচের ফর্মটি পূরণ করুন। আমাদের টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-dark-card rounded-3xl border border-white/5">
              <div className="w-12 h-12 bg-royal-gold/20 text-royal-gold rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs text-off-white/40 uppercase font-bold tracking-widest mb-1">Call Us Directly</p>
                <p className="text-xl font-bold">+880 1856-078978</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-8 bg-dark-card rounded-3xl border border-white/5">
              <div className="w-12 h-12 bg-steel-blue/20 text-steel-blue rounded-full flex items-center justify-center shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-xs text-off-white/40 uppercase font-bold tracking-widest mb-1">WhatsApp Support</p>
                <p className="text-xl font-bold">+880 1856-078978</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-royal-gold"></div>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Send size={48} />
              </div>
              <h3 className="text-3xl font-black mb-4 bangla">ইনকোয়ারি পাঠানো হয়েছে!</h3>
              <p className="text-off-white/60 mb-8 bangla">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-royal-gold font-bold hover:underline"
              >
                আরেকটি ইনকোয়ারি করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-off-white/30" size={20} />
                  <input 
                    type="text" 
                    placeholder="আপনার নাম" 
                    required
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-off-white/30" size={20} />
                  <input 
                    type="tel" 
                    placeholder="মোবাইল নম্বর" 
                    required
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative">
                <Package className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="কোন প্রোডাক্ট (যেমন: Solid T-shirt)" 
                  required
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.product}
                  onChange={e => setForm({...form, product: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Hash className="absolute left-4 top-4 text-off-white/30" size={20} />
                  <input 
                    type="number" 
                    placeholder="কত পিস লাগবে" 
                    required
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Palette className="absolute left-4 top-4 text-off-white/30" size={20} />
                  <input 
                    type="text" 
                    placeholder="সাইজ/কালার" 
                    required
                    className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                    value={form.sizeColor}
                    onChange={e => setForm({...form, sizeColor: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="বিভাগ/জেলা" 
                  required
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.location}
                  onChange={e => setForm({...form, location: e.target.value})}
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-royal-gold text-deep-black py-5 rounded-2xl font-black hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? 'Submitting...' : <><Send size={20} /> Submit Inquiry</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
