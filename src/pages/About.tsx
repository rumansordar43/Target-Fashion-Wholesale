import { motion } from 'motion/react';
import { ShieldCheck, Facebook } from 'lucide-react';

export default function About() {
  const promises = [
    { title: '100% Cotton', desc: 'আমরা শুধুমাত্র প্রিমিয়াম কম্বড কটন ফেব্রিক ব্যবহার করি।', icon: <ShieldCheck className="text-royal-gold" /> },
    { title: 'Pre-shrunk', desc: 'ধোয়ার পর ছোট হয়ে যাওয়ার ভয় নেই, ফেব্রিক আগে থেকেই শ্রিঙ্ক করা।', icon: <ShieldCheck className="text-royal-gold" /> },
    { title: 'Color-fast', desc: 'রঙ ওঠার কোনো ভয় নেই, আমরা হাই-কোয়ালিটি ডাইং ব্যবহার করি।', icon: <ShieldCheck className="text-royal-gold" /> },
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase"
        >
          Our <span className="text-royal-gold">Story</span>
        </motion.h1>
        <p className="text-xl text-off-white/60 bangla max-w-3xl mx-auto leading-relaxed">
          "আমরা বাংলাদেশের Reseller-দের সেরা দামে সেরা quality T-shirt দিতে প্রতিশ্রুতিবদ্ধ"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase leading-tight">Prism Kicks <br /><span className="text-royal-gold">কেন আলাদা?</span></h2>
          <div className="space-y-6 text-off-white/70 bangla leading-relaxed">
            <p>প্রিজম কিকস শুধুমাত্র একটি টি-শার্ট ব্র্যান্ড নয়, এটি একটি আস্থার নাম। আমরা জানি একজন রিসেলার বা পাইকারি বিক্রেতার জন্য কোয়ালিটি কতটা গুরুত্বপূর্ণ।</p>
            <p>আমাদের প্রতিটি টি-শার্ট নিজস্ব তত্ত্বাবধানে তৈরি করা হয়। ফেব্রিক সিলেকশন থেকে শুরু করে স্টিচিং এবং ফিনিশিং—প্রতিটি ধাপে আমরা সর্বোচ্চ সতর্কতা অবলম্বন করি।</p>
            <p>আমাদের লক্ষ্য হলো বাংলাদেশের টি-শার্ট মার্কেটকে আরও আধুনিক এবং কোয়ালিটি-ফোকাসড করা, যাতে আমাদের রিসেলাররা গর্বের সাথে তাদের কাস্টমারদের কাছে পণ্য বিক্রি করতে পারে।</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden aspect-square border border-white/10"
        >
          <img 
            src="https://picsum.photos/seed/factory/1000/1000" 
            alt="Factory" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent"></div>
        </motion.div>
      </div>

      <div className="bg-dark-card p-12 md:p-24 rounded-[4rem] border border-white/5 mb-32">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter">Quality <span className="text-royal-gold">Promise</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {promises.map((p, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-royal-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 bangla">{p.title}</h3>
              <p className="text-off-white/50 bangla leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-royal-gold text-text-primary p-16 rounded-[4rem] text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-none">Join Our Community</h2>
        <p className="text-xl mb-12 font-medium bangla max-w-2xl mx-auto">আমাদের নতুন ডিজাইন এবং আপডেট সবার আগে পেতে ফেসবুক পেজে যুক্ত হোন।</p>
        <a 
          href="https://www.facebook.com/share/1XSmanaXQk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-deep-black text-off-white px-12 py-6 rounded-full font-black text-xl hover:bg-off-white hover:text-deep-black transition-all shadow-2xl"
        >
          <Facebook size={28} />
          Follow on Facebook
        </a>
      </div>
    </div>
  );
}
