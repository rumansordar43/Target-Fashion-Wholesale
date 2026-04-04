import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ডেলিভারি চার্জ কত?',
      a: 'ঢাকার ভিতরে ডেলিভারি চার্জ ৭০ টাকা এবং ঢাকার বাইরে ১৫০ টাকা।'
    },
    {
      q: 'ডেলিভারি কতদিনে পাব?',
      a: 'ঢাকা সিটির মধ্যে ১-২ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।'
    },
    {
      q: 'সাইজ চার্ট কোথায় পাব?',
      a: 'প্রতিটি প্রোডাক্টের ডেসক্রিপশনে সাইজ চার্ট দেওয়া আছে। এছাড়া মেনু থেকে সাইজ গাইড দেখে নিতে পারেন।'
    },
    {
      q: 'পণ্য হাতে পেয়ে টাকা দেওয়ার সুবিধা আছে কি?',
      a: 'হ্যাঁ, আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা দিই। আপনি পণ্য হাতে পেয়ে চেক করে টাকা দিতে পারবেন।'
    },
    {
      q: 'পণ্য পছন্দ না হলে কি রিটার্ন করা যাবে?',
      a: 'হ্যাঁ, যদি পণ্যের কোনো ডিফেক্ট থাকে বা সাইজ না মেলে, তবে আমরা ৭ দিনের মধ্যে এক্সচেঞ্জ বা রিটার্ন গ্রহণ করি। তবে এক্ষেত্রে পণ্যটি অব্যবহৃত থাকতে হবে।'
    },
    {
      q: 'পেমেন্ট কীভাবে করতে হবে?',
      a: 'আপনি বিকাশ, নগদ বা সরাসরি ক্যাশ অন ডেলিভারির মাধ্যমে পেমেন্ট করতে পারবেন।'
    },
    {
      q: 'অর্ডার ট্র্যাকিং কীভাবে করব?',
      a: 'অর্ডার করার পর আপনাকে একটি কনফার্মেশন মেসেজ দেওয়া হবে। এছাড়া আমাদের হোয়াটসঅ্যাপে যোগাযোগ করে আপনার অর্ডারের আপডেট জানতে পারবেন।'
    }
  ];

  return (
    <div className="py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase">F.A.<span className="text-royal-gold">Q</span></h1>
        <p className="text-lg text-off-white/60 bangla">
          আপনার মনে থাকা সাধারণ কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো।
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i}
            className={`bg-dark-card rounded-3xl border transition-all duration-500 overflow-hidden ${openIndex === i ? 'border-royal-gold/50 shadow-2xl shadow-royal-gold/5' : 'border-white/5'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-8 flex items-center justify-between text-left"
            >
              <span className="text-xl font-bold bangla">{faq.q}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-royal-gold text-deep-black rotate-180' : 'bg-white/5 text-off-white'}`}>
                {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 text-off-white/60 bangla leading-relaxed border-t border-white/5 pt-6">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center p-12 bg-white/5 rounded-[3rem] border border-white/10">
        <p className="text-lg text-off-white/60 bangla mb-6">আরও কিছু জানার আছে?</p>
        <a 
          href="https://wa.me/8801234567890" 
          className="text-royal-gold font-black text-2xl hover:underline underline-offset-8 transition-all"
        >
          সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন
        </a>
      </div>
    </div>
  );
}
