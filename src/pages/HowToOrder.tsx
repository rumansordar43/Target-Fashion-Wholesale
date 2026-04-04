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
      title: 'Step 1: প্রোডাক্ট পছন্দ করুন', 
      desc: 'আমাদের ক্যাটালগ ব্রাউজ করুন এবং আপনার পছন্দের ডিজাইন ও সাইজ খুঁজে বের করুন।', 
      icon: <Search size={32} /> 
    },
    { 
      title: 'Step 2: কার্টে যুক্ত করুন', 
      desc: 'পছন্দমতো প্রোডাক্টের সাইজ সিলেক্ট করে "Add to Cart" বাটনে ক্লিক করুন।', 
      icon: <ShoppingBag size={32} /> 
    },
    { 
      title: 'Step 3: চেকআউট করুন', 
      desc: 'কার্ট পেজ থেকে "Checkout" বাটনে ক্লিক করে আপনার নাম, ঠিকানা এবং মোবাইল নম্বর দিন।', 
      icon: <CheckSquare size={32} /> 
    },
    { 
      title: 'Step 4: অর্ডার কনফার্ম করুন', 
      desc: 'পেমেন্ট মেথড (ক্যাশ অন ডেলিভারি বা অনলাইন) সিলেক্ট করে অর্ডারটি কনফার্ম করুন।', 
      icon: <CreditCard size={32} /> 
    },
    { 
      title: 'Step 5: কনফার্মেশন কল', 
      desc: 'অর্ডার করার পর আমাদের কাস্টমার কেয়ার থেকে আপনাকে কল করে অর্ডারটি কনফার্ম করা হবে।', 
      icon: <MessageSquare size={32} /> 
    },
    { 
      title: 'Step 6: ডেলিভারি বুঝে নিন', 
      desc: '১-৫ কার্যদিবসের মধ্যে সারা বাংলাদেশে কুরিয়ারের মাধ্যমে আপনার ঠিকানায় ডেলিভারি পৌঁছে যাবে।', 
      icon: <Truck size={32} /> 
    },
  ];

  const template = `আমি Prism Kicks থেকে এই প্রোডাক্টটি অর্ডার করতে চাই:
Product: [নাম]
Size: [S/M/L/XL/XXL]
আমার নাম: [নাম]
ঠিকানা: [বিস্তারিত ঠিকানা]
মোবাইল: [নম্বর]`;

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
          প্রিজম কিকস থেকে আপনার পছন্দের টি-শার্ট অর্ডার করার সহজ ধাপগুলো নিচে দেওয়া হলো। আমাদের প্রসেস অত্যন্ত স্বচ্ছ এবং দ্রুত।
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

      <div className="bg-royal-gold text-text-primary p-16 rounded-[4rem] text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">Ready to Order?</h2>
        <p className="text-xl mb-10 font-medium bangla max-w-2xl mx-auto">অর্ডার করতে কোনো সমস্যা হলে সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন।</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+8801234567890" className="bg-deep-black text-off-white px-12 py-5 rounded-full font-black text-lg hover:bg-off-white hover:text-deep-black transition-all">
            Call: +880 1234-567890
          </a>
          <a href="https://wa.me/8801234567890" className="bg-off-white text-deep-black px-12 py-5 rounded-full font-black text-lg hover:bg-deep-black hover:text-off-white transition-all">
            WhatsApp Message
          </a>
        </div>
      </div>
    </div>
  );
}
