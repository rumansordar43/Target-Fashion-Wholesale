import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Building, Send } from 'lucide-react';
import { Product, Inquiry } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

export default function InquiryModal({ isOpen, onClose, selectedProduct }: InquiryModalProps) {
  const [form, setForm] = useState<Inquiry>({
    name: '',
    phone: '',
    business_name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: selectedProduct?.id })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setForm({ name: '', phone: '', business_name: '', message: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-black/90 backdrop-blur-sm"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-dark-card w-full max-w-lg rounded-[2.5rem] p-8 border border-white/10 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-off-white/40 hover:text-white"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-2 bangla text-royal-gold">
              {selectedProduct ? 'পণ্য সম্পর্কে ইনকোয়ারি করুন' : 'পাইকারি ইনকোয়ারি'}
            </h3>
            {selectedProduct && (
              <div className="flex items-center gap-4 mb-6 p-4 bg-deep-black rounded-2xl border border-white/5">
                <img src={selectedProduct.image_url} className="w-16 h-16 object-cover rounded-xl" alt="" />
                <div>
                  <p className="font-bold">{selectedProduct.title}</p>
                  <p className="text-xs text-off-white/40">{selectedProduct.category}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="ফোন নম্বর" 
                  required
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>
              <div className="relative">
                <Building className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="ব্যবসার নাম (ঐচ্ছিক)" 
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.business_name}
                  onChange={e => setForm({...form, business_name: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="আপনার মেসেজ" 
                rows={3}
                className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 focus:border-royal-gold outline-none transition-all"
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
              ></textarea>
              <button 
                disabled={isSubmitting}
                className="w-full bg-royal-gold text-deep-black py-4 rounded-2xl font-black hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? 'Submitting...' : <><Send size={20} /> Send Inquiry</>}
              </button>
              {submitStatus === 'success' && <p className="text-green-500 text-center font-bold bangla">ইনকোয়ারি সফলভাবে পাঠানো হয়েছে!</p>}
              {submitStatus === 'error' && <p className="text-red-500 text-center font-bold bangla">আবার চেষ্টা করুন।</p>}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
