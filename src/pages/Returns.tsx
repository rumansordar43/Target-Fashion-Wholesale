import { motion } from 'motion/react';
import { RefreshCw, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Returns() {
  const rules = [
    {
      title: 'Manufacturing Defect',
      desc: 'পণ্যে কোনো ম্যানুফ্যাকচারিং ত্রুটি থাকলে আমরা তা বিনমূল্যে এক্সচেঞ্জ করে দেব।',
      icon: <AlertCircle className="text-royal-gold" />
    },
    {
      title: 'Wrong Product',
      desc: 'ভুল সাইজ বা ভুল কালার পাঠানো হলে আমরা সম্পূর্ণ ফ্রি-তে রিপ্লেস করে দেব।',
      icon: <RefreshCw className="text-royal-gold" />
    },
    {
      title: 'Time Limit',
      desc: 'ডেলিভারি পাওয়ার ৭ দিনের মধ্যে আমাদের হোয়াটসঅ্যাপে এক্সচেঞ্জের জন্য জানাতে হবে।',
      icon: <CheckCircle2 className="text-royal-gold" />
    }
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">Return & <span className="text-royal-gold">Exchange</span></h1>
        <p className="text-lg text-off-white/60 bangla max-w-2xl mx-auto">
          আমাদের পণ্য নিয়ে আপনার সন্তুষ্টিই আমাদের কাম্য। কোনো সমস্যা হলে আমরা দ্রুত সমাধানের চেষ্টা করি।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-card p-12 rounded-[3rem] border border-white/5 text-center"
          >
            <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              {rule.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 bangla">{rule.title}</h3>
            <p className="text-off-white/50 bangla leading-relaxed">{rule.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-royal-gold text-deep-black p-12 md:p-20 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase leading-tight">How to <br />Request?</h2>
          <p className="text-lg font-medium bangla leading-relaxed">
            এক্সচেঞ্জ বা রিটার্ন রিকোয়েস্ট করতে আপনার অর্ডার আইডি এবং ত্রুটিপূর্ণ পণ্যের ছবিসহ আমাদের হোয়াটসঅ্যাপে মেসেজ দিন। আমাদের টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>
        <a 
          href="https://wa.me/8801234567890" 
          className="flex items-center gap-4 bg-deep-black text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-deep-black transition-all whitespace-nowrap"
        >
          <MessageSquare size={28} />
          WhatsApp Now
        </a>
      </div>
    </div>
  );
}
