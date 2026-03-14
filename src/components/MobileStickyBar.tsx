import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const MobileStickyBar: React.FC = () => {
  const whatsappMessage = "আমি Target Fashion থেকে পাইকারি নিতে চাই";
  const whatsappUrl = `https://wa.me/8801234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 w-full bg-deep-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-[90] flex items-center gap-4 shadow-2xl"
    >
      <a 
        href="tel:+8801234567890" 
        className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10"
      >
        <Phone size={24} />
      </a>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow bg-royal-gold text-deep-black h-14 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm"
      >
        <MessageSquare size={20} />
        <span className="bangla">পাইকারি ইনকোয়ারি</span>
      </a>
    </motion.div>
  );
};

export default MobileStickyBar;
