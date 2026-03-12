import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const FloatingWhatsApp: React.FC = () => {
  const message = "আমি Target Fashion থেকে পাইকারি নিতে চাই";
  const whatsappUrl = `https://wa.me/8801234567890?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group animate-pulse-green"
      title="Chat on WhatsApp"
    >
      <MessageSquare size={32} />
      <span className="absolute right-full mr-4 bg-white text-deep-black px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none bangla">
        পাইকারি নিতে চান? হোয়াটসঅ্যাপ করুন
      </span>
    </motion.a>
  );
};

export default FloatingWhatsApp;
