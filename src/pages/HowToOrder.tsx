import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  CheckSquare, 
  MessageSquare, 
  CreditCard, 
  Truck, 
  Copy, 
  CheckCircle2 
} from 'lucide-react';
import { useState } from 'react';

export default function HowToOrder() {
  const [copied, setCopied] = useState(false);

  const steps = [
    { 
      title: 'Step 1: Products দেখুন', 
      desc: 'আমাদের ক্যাটালগ browse করুন এবং আপনার পছন্দের ডিজাইনগুলো খুঁজে বের করুন।', 
      icon: <Search size={32} /> 
    },
    { 
      title: 'Step 2: পছন্দ করুন', 
      desc: 'পছন্দমতো product name, color, size এবং quantity একটি লিস্টে নোট করুন।', 
      icon: <CheckSquare size={32} /> 
    },
    { 
      title: 'Step 3: WhatsApp করুন', 
      desc: 'আমাদের হোয়াটসঅ্যাপ নম্বরে আপনার পছন্দের লিস্টটি পাঠিয়ে দিন।', 
      icon: <MessageSquare size={32} /> 
    },
    { 
      title: 'Step 4: Wholesale Price জানুন', 
      desc: 'আমরা আপনার লিস্ট অনুযায়ী পাইকারি মূল্য এবং স্টক আপডেট সাথে সাথে জানিয়ে দেব।', 
      icon: <ShoppingBag size={32} /> 
    },
    { 
      title: 'Step 5: Order Confirm করুন', 
      desc: 'অর্ডার কনফার্ম করতে আংশিক অগ্রিম বা COD (শর্তসাপেক্ষে) কনফার্ম করুন।', 
      icon: <CreditCard size={32} /> 
    },
    { 
      title: 'Step 6: Delivery পাবেন', 
      desc: '১-৫ কার্যদিবসের মধ্যে সারা বাংলাদেশে কুরিয়ারের মাধ্যমে ডেলিভারি বুঝে নিন।', 
      icon: <Truck size={32} /> 
    },
  ];

  const template = `আমি Target Fashion থেকে পাইকারি নিতে চাই।
Product: [নাম]
Color: [রঙ]
Size: [S/M/L/XL/XXL]
Quantity: [কত পিস]
আমার নাম: [নাম]
জেলা: [জেলা]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">How to <span className="text-royal-gold">Order</span></h1>
        <p className="text-lg text-off-white/60 bangla max-w-2xl mx-auto">
          টার্গেট ফ্যাশন থেকে পাইকারি অর্ডার করার সহজ ধাপগুলো নিচে দেওয়া হলো। আমাদের প্রসেস অত্যন্ত স্বচ্ছ এবং দ্রুত।
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-card p-10 rounded-[3rem] border border-white/5 relative group hover:border-royal-gold/30 transition-all"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-royal-gold text-deep-black rounded-full flex items-center justify-center font-black text-xl shadow-xl">
              {i + 1}
            </div>
            <div className="w-16 h-16 bg-royal-gold/10 text-royal-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 bangla">{step.title}</h3>
            <p className="text-off-white/50 text-sm bangla leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp Template Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-dark-card p-12 md:p-20 rounded-[4rem] border border-white/5 mb-32">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase leading-tight">WhatsApp <br /><span className="text-royal-gold">Template</span></h2>
          <p className="text-lg text-off-white/60 mb-8 bangla">
            দ্রুত অর্ডারের জন্য নিচের টেমপ্লেটটি কপি করে প্রয়োজনীয় তথ্যসহ আমাদের হোয়াটসঅ্যাপে পাঠিয়ে দিন।
          </p>
          <div className="flex items-center gap-4 text-royal-gold font-bold bangla">
            <CheckCircle2 size={20} />
            <span>সহজ এবং দ্রুত অর্ডার প্রসেস</span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-deep-black p-8 rounded-3xl border border-white/10 font-mono text-sm text-off-white/80 whitespace-pre-wrap leading-relaxed">
            {template}
          </div>
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all flex items-center gap-2 text-xs uppercase font-bold tracking-widest"
          >
            {copied ? <><CheckCircle2 size={16} className="text-green-500" /> Copied</> : <><Copy size={16} /> Copy Template</>}
          </button>
        </div>
      </div>

      <div className="bg-royal-gold text-deep-black p-16 rounded-[4rem] text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">Ready to Order?</h2>
        <p className="text-xl mb-10 font-medium bangla max-w-2xl mx-auto">অর্ডার করতে কোনো সমস্যা হলে সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন।</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+8801234567890" className="bg-deep-black text-white px-12 py-5 rounded-full font-black text-lg hover:bg-white hover:text-deep-black transition-all">
            Call: +880 1234-567890
          </a>
          <a href="https://wa.me/8801234567890" className="bg-white text-deep-black px-12 py-5 rounded-full font-black text-lg hover:bg-deep-black hover:text-white transition-all">
            WhatsApp Message
          </a>
        </div>
      </div>
    </div>
  );
}
