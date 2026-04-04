export default function Offers() {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl md:text-8xl font-black mb-16 leading-none uppercase text-center">Bundle <span className="text-royal-gold">Deals</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-dark-card p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-red/20 rounded-full blur-3xl group-hover:bg-crimson-red/40 transition-all"></div>
          <span className="bg-crimson-red text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Hot Offer</span>
          <h3 className="text-4xl font-black mb-4 uppercase">Starter Bundle</h3>
          <p className="text-off-white/60 mb-8 bangla">১২ পিস টি-শার্টের স্টার্টার প্যাক। নতুন রিসেলারদের জন্য সেরা অফার।</p>
          <div className="text-5xl font-black text-royal-gold mb-8">৳9,999 <span className="text-sm text-off-white/30 line-through">৳12,000</span></div>
          <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-royal-gold transition-all">Get Offer</button>
        </div>

        <div className="bg-dark-card p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-steel-blue/20 rounded-full blur-3xl group-hover:bg-steel-blue/40 transition-all"></div>
          <span className="bg-steel-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Bestseller</span>
          <h3 className="text-4xl font-black mb-4 uppercase">Business Pack</h3>
          <p className="text-off-white/60 mb-8 bangla">৫০ পিস টি-শার্টের প্রিমিয়াম প্যাক। বড় দোকানদারদের জন্য সেরা ডিল।</p>
          <div className="text-5xl font-black text-royal-gold mb-8">৳39,999 <span className="text-sm text-off-white/30 line-through">৳45,000</span></div>
          <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-royal-gold transition-all">Get Offer</button>
        </div>
      </div>

      <div className="mt-24 p-12 bg-royal-gold text-text-primary rounded-[3rem] text-center">
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">Custom Bundle?</h2>
        <p className="text-lg font-medium mb-8 bangla">আপনার নিজের মতো করে বান্ডেল তৈরি করতে আমাদের সাথে যোগাযোগ করুন।</p>
        <a href="https://wa.me/8801234567890" className="bg-deep-black text-off-white px-12 py-5 rounded-full font-black text-lg hover:bg-off-white hover:text-deep-black transition-all">
          Contact for Custom Deal
        </a>
      </div>
    </div>
  );
}
