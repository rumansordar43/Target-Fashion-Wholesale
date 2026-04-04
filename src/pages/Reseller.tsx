import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  BadgePercent, 
  Zap, 
  Headphones, 
  Store, 
  Smartphone, 
  User,
  MapPin,
  Briefcase,
  BarChart3,
  Link as LinkIcon
} from 'lucide-react';

export default function Reseller() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    businessType: 'Online',
    monthlyVolume: '12–50',
    shopLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    { title: 'Special wholesale price', icon: <BadgePercent size={24} />, desc: 'রিসেলারদের জন্য বিশেষ পাইকারি মূল্য যা আপনাকে দিবে সর্বোচ্চ প্রফিট।' },
    { title: 'Early Access', icon: <Zap size={24} />, desc: 'সব নতুন ডিজাইন এবং কালেকশন সবার আগে দেখার এবং বুক করার সুযোগ।' },
    { title: 'Priority Processing', icon: <Truck size={24} />, desc: 'রিসেলারদের অর্ডার সবার আগে প্রসেস এবং ডেলিভারি করা হয়।' },
    { title: 'Dedicated Support', icon: <Headphones size={24} />, desc: 'যেকোনো সমস্যায় আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ সাপোর্ট টিম সবসময় পাশে আছে।' },
    { title: 'Extra Bulk Discount', icon: <ShieldCheck size={24} />, desc: 'বেশি পরিমাণে অর্ডার করলে পাইকারি মূল্যের উপর অতিরিক্ত ডিসকাউন্ট।' },
  ];

  const whoCanJoin = [
    { title: 'Online Seller', icon: <Smartphone size={24} />, desc: 'Facebook, Instagram বা Website-এ যারা টি-শার্ট বিক্রি করেন।' },
    { title: 'Shopkeeper', icon: <Store size={24} />, desc: 'যাদের নিজস্ব ফিজিক্যাল শপ বা শোরুম আছে।' },
    { title: 'Boutique Owner', icon: <Users size={24} />, desc: 'বুটিক শপ বা ফ্যাশন হাউসের মালিকগণ।' },
    { title: 'Aspiring Entrepreneur', icon: <ShoppingBag size={24} />, desc: 'যেকেউ যে নতুন করে টি-শার্টের ব্যবসা শুরু করতে চায়।' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reseller-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          location: form.location,
          business_name: form.businessType,
          experience: form.monthlyVolume,
          message: `Shop Link: ${form.shopLink || 'N/A'}`
        })
      });

      if (response.ok) {
        const message = `New Reseller Registration:
Name: ${form.name}
Phone: ${form.phone}
Location: ${form.location}
Business Type: ${form.businessType}
Monthly Volume: ${form.monthlyVolume}
Shop Link: ${form.shopLink || 'N/A'}`;
        
        const whatsappUrl = `https://wa.me/8801856078978?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setSubmitted(true);
        setForm({
          name: '',
          phone: '',
          location: '',
          businessType: 'Online',
          monthlyVolume: '12–50',
          shopLink: ''
        });
      }
    } catch (error) {
      console.error("Reseller submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight uppercase">
          Prism Kicks Reseller হন — <br />
          <span className="text-royal-gold">নিজের ব্যবসা শুরু করুন</span>
        </h1>
        <p className="text-lg md:text-xl text-off-white/70 max-w-3xl mx-auto bangla">
          প্রিজম কিকসের সাথে আপনার ব্যবসা শুরু করুন। আমরা রিসেলারদের জন্য সেরা পাইকারি মূল্য এবং পূর্ণ সাপোর্ট প্রদান করি।
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {benefits.map((benefit, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="bg-dark-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full blur-3xl group-hover:bg-royal-gold/10 transition-all"></div>
            <div className="w-14 h-14 bg-royal-gold/20 text-royal-gold rounded-2xl flex items-center justify-center mb-6">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{benefit.title}</h3>
            <p className="text-off-white/50 text-sm bangla leading-relaxed">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Who Can Join */}
      <div className="mb-32">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center uppercase">কারা Reseller হতে পারবেন?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whoCanJoin.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-deep-black border border-white/10 text-royal-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 bangla">{item.title}</h3>
              <p className="text-off-white/50 text-sm bangla">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-none">Reseller <br /><span className="text-royal-gold">Registration</span></h2>
          <p className="text-lg text-off-white/60 mb-12 bangla">
            রিসেলার হিসেবে জয়েন করতে নিচের ফর্মটি পূরণ করুন। আমাদের টিম আপনার তথ্য যাচাই করে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-off-white/80">
              <div className="w-10 h-10 bg-royal-gold/10 text-royal-gold rounded-full flex items-center justify-center shrink-0">✓</div>
              <p className="bangla">সরাসরি ফ্যাক্টরি রেটে পণ্য কেনার সুবিধা</p>
            </div>
            <div className="flex items-center gap-4 text-off-white/80">
              <div className="w-10 h-10 bg-royal-gold/10 text-royal-gold rounded-full flex items-center justify-center shrink-0">✓</div>
              <p className="bangla">প্রিমিয়াম কোয়ালিটি এবং এক্সপোর্ট ফিনিশিং</p>
            </div>
            <div className="flex items-center gap-4 text-off-white/80">
              <div className="w-10 h-10 bg-royal-gold/10 text-royal-gold rounded-full flex items-center justify-center shrink-0">✓</div>
              <p className="bangla">সারা বাংলাদেশে দ্রুত ডেলিভারি সাপোর্ট</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-card p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-royal-gold"></div>
          
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={48} />
              </div>
              <h3 className="text-3xl font-black mb-4 bangla">ধন্যবাদ!</h3>
              <p className="text-off-white/60 mb-8 bangla">আপনার রেজিস্ট্রেশন সফল হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-royal-gold font-bold hover:underline"
              >
                আরেকটি ফর্ম পূরণ করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Smartphone className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="tel" 
                  placeholder="মোবাইল নম্বর" 
                  required
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="text" 
                  placeholder="জেলা/এলাকা" 
                  required
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.location}
                  onChange={e => setForm({...form, location: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">ব্যবসার ধরন</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-4 text-off-white/30" size={18} />
                    <select 
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all appearance-none text-sm"
                      value={form.businessType}
                      onChange={e => setForm({...form, businessType: e.target.value})}
                    >
                      <option value="Online">Online</option>
                      <option value="Physical Shop">Physical Shop</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-off-white/40 mb-2 ml-2 font-bold">মাসে কত পিস সম্ভাবনা</label>
                  <div className="relative">
                    <BarChart3 className="absolute left-4 top-4 text-off-white/30" size={18} />
                    <select 
                      className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all appearance-none text-sm"
                      value={form.monthlyVolume}
                      onChange={e => setForm({...form, monthlyVolume: e.target.value})}
                    >
                      <option value="12–50">12–50 Pcs</option>
                      <option value="50–100">50–100 Pcs</option>
                      <option value="100+">100+ Pcs</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="relative">
                <LinkIcon className="absolute left-4 top-4 text-off-white/30" size={20} />
                <input 
                  type="url" 
                  placeholder="Facebook Page / Shop link (ঐচ্ছিক)" 
                  className="w-full bg-deep-black border border-white/10 rounded-2xl p-4 pl-12 focus:border-royal-gold outline-none transition-all"
                  value={form.shopLink}
                  onChange={e => setForm({...form, shopLink: e.target.value})}
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-royal-gold text-text-primary py-5 rounded-2xl font-black hover:bg-text-primary hover:text-deep-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? 'Processing...' : 'Reseller হিসেবে Register করুন'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
