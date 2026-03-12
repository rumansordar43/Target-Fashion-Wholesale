import { motion } from 'motion/react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function Shipping() {
  const policies = [
    {
      title: 'ঢাকা সিটি',
      time: '১–২ কার্যদিবস',
      cost: '৳৬০ (bulk order-এ negotiable)',
      icon: <MapPin className="text-royal-gold" />
    },
    {
      title: 'ঢাকার বাইরে',
      time: '৩–৫ কার্যদিবস',
      cost: '৳১০০–১২০',
      icon: <Truck className="text-royal-gold" />
    },
    {
      title: 'বড় অর্ডার (৫০০+ পিস)',
      time: 'আলোচনা সাপেক্ষে',
      cost: 'Special Courier Arrangement',
      icon: <ShieldCheck className="text-royal-gold" />
    }
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">Shipping <span className="text-royal-gold">Policy</span></h1>
        <p className="text-lg text-off-white/60 bangla max-w-2xl mx-auto">
          সারা বাংলাদেশে দ্রুত এবং নিরাপদ ডেলিভারি নিশ্চিত করাই আমাদের লক্ষ্য।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {policies.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-card p-12 rounded-[3rem] border border-white/5 text-center group hover:border-royal-gold/30 transition-all"
          >
            <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
              {p.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 bangla">{p.title}</h3>
            <div className="space-y-2">
              <p className="text-royal-gold font-bold bangla flex items-center justify-center gap-2">
                <Clock size={16} /> {p.time}
              </p>
              <p className="text-off-white/50 bangla">{p.cost}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-dark-card p-12 md:p-20 rounded-[4rem] border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase leading-tight">Courier <br /><span className="text-royal-gold">Partners</span></h2>
            <p className="text-lg text-off-white/70 bangla leading-relaxed mb-8">
              আমরা বাংলাদেশের নির্ভরযোগ্য কুরিয়ার সার্ভিসগুলোর মাধ্যমে পণ্য ডেলিভারি দিয়ে থাকি। আপনার এলাকা অনুযায়ী সবচেয়ে দ্রুত সার্ভিসটি আমরা সিলেক্ট করি।
            </p>
            <ul className="space-y-4 bangla text-off-white/60">
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-royal-gold rounded-full"></div> Sundarban Courier Service</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-royal-gold rounded-full"></div> Redex Delivery</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-royal-gold rounded-full"></div> SA Paribahan</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-royal-gold rounded-full"></div> Pathao Courier</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-black text-white">REDX</span>
            </div>
            <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-black text-white">SUNDARBAN</span>
            </div>
            <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-black text-white">SA PARIBAHAN</span>
            </div>
            <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xl font-black text-white">PATHAO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
