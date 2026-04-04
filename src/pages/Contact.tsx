import { motion } from 'motion/react';
import { MessageSquare, Phone, Mail, MapPin, Facebook, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">Get In <span className="text-royal-gold">Touch</span></h1>
        <p className="text-lg text-off-white/60 bangla max-w-2xl mx-auto">
          যেকোনো জিজ্ঞাসায় আমাদের সাথে যোগাযোগ করুন। আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করি।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-dark-card p-12 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-tight">Contact Info</h2>
            
            <div className="space-y-8">
              <a href="https://wa.me/8801856078978" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-royal-gold group-hover:text-deep-black transition-all">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <p className="text-sm text-off-white/40 uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                  <p className="text-xl font-bold">+880 1856-078978</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Clock size={28} className="text-royal-gold" />
                </div>
                <div>
                  <p className="text-sm text-off-white/40 uppercase font-bold tracking-widest mb-1">Business Hours</p>
                  <p className="text-xl font-bold bangla">প্রতিদিন সকাল ১০টা - রাত ১০টা</p>
                </div>
              </div>

              <a href="mailto:info@prismkicks.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-deep-black transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm text-off-white/40 uppercase font-bold tracking-widest mb-1">Email</p>
                  <p className="text-xl font-bold">info@prismkicks.com</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                  <MapPin size={28} className="text-royal-gold" />
                </div>
                <div>
                  <p className="text-sm text-off-white/40 uppercase font-bold tracking-widest mb-1">Office</p>
                  <p className="text-xl font-bold bangla">উত্তরা, ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 flex gap-6">
              <a href="https://www.facebook.com/share/1XSmanaXQk/" target="_blank" className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-royal-gold hover:text-deep-black transition-all">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark-card text-text-primary p-12 md:p-16 rounded-[3rem] border border-border-subtle">
          <h2 className="text-3xl font-black mb-8 uppercase">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-3 bangla">আপনার নাম</label>
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-deep-black border-b-2 border-border-subtle p-4 focus:border-royal-gold outline-none transition-all font-bold text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-3 bangla">মোবাইল নম্বর</label>
              <input 
                type="tel" 
                placeholder="Phone Number"
                className="w-full bg-deep-black border-b-2 border-border-subtle p-4 focus:border-royal-gold outline-none transition-all font-bold text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-3 bangla">আপনার মেসেজ</label>
              <textarea 
                rows={4}
                placeholder="How can we help you?"
                className="w-full bg-deep-black border-b-2 border-border-subtle p-4 focus:border-royal-gold outline-none transition-all font-bold resize-none text-text-primary"
              ></textarea>
            </div>
            <button className="w-full bg-royal-gold text-text-primary py-6 rounded-full font-black text-xl uppercase hover:bg-text-primary hover:text-deep-black transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Large WhatsApp CTA */}
      <div className="bg-royal-gold text-text-primary p-12 md:p-24 rounded-[4rem] text-center">
        <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase leading-none">Fastest Support <br />via WhatsApp</h2>
        <p className="text-xl font-medium bangla mb-12 max-w-2xl mx-auto">
          যেকোনো জরুরি প্রয়োজনে আমাদের সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন। আমাদের টিম আপনাকে দ্রুত সহায়তা করবে।
        </p>
        <a 
          href="https://wa.me/8801856078978" 
          className="inline-flex items-center gap-4 bg-deep-black text-off-white px-16 py-8 rounded-full font-black text-2xl hover:bg-off-white hover:text-deep-black transition-all"
        >
          <MessageSquare size={32} />
          WhatsApp Now
        </a>
      </div>
    </div>
  );
}
