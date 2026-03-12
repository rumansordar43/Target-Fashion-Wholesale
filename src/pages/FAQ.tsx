import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'পাইকারি মূল্য কত?',
      a: 'আমাদের প্রতিটি ক্যাটাগরির আলাদা পাইকারি মূল্য রয়েছে। সাধারণত টি-শার্টের ডিজাইন এবং পরিমাণের ওপর ভিত্তি করে মূল্য নির্ধারিত হয়। বিস্তারিত জানতে আমাদের হোয়াটসঅ্যাপে যোগাযোগ করুন।'
    },
    {
      q: 'সর্বনিম্ন কত পিস কিনতে হবে?',
      a: 'পাইকারি অর্ডারের ক্ষেত্রে আমাদের MOQ (Minimum Order Quantity) হলো ১২ পিস। আপনি চাইলে বিভিন্ন ডিজাইন এবং সাইজ মিলিয়ে ১২ পিস নিতে পারবেন।'
    },
    {
      q: 'Cash on Delivery কি পাইকারিতেও হয়?',
      a: 'হ্যাঁ, আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা দিই। তবে অর্ডারের ক্ষেত্রে কুরিয়ার চার্জ অগ্রিম প্রদান করতে হয়।'
    },
    {
      q: 'ডেলিভারি কতদিনে পাব?',
      a: 'ঢাকা সিটির মধ্যে ১-২ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।'
    },
    {
      q: 'Custom design বা logo print কি হবে?',
      a: 'হ্যাঁ, আমরা বাল্ক অর্ডারের ক্ষেত্রে কাস্টম ডিজাইন বা লোগো প্রিন্ট করে থাকি। তবে এর জন্য সর্বনিম্ন ১০০ পিস অর্ডার করতে হবে।'
    },
    {
      q: 'Reseller হতে কী লাগবে?',
      a: 'রিসেলার হতে কোনো ফি লাগে না। শুধু আমাদের রিসেলার ফর্মে আপনার নাম, মোবাইল নম্বর এবং ব্যবসার ধরন জানিয়ে আবেদন করলেই হবে।'
    },
    {
      q: 'Payment কীভাবে করতে হবে?',
      a: 'আপনি বিকাশ, নগদ বা সরাসরি ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন।'
    },
    {
      q: 'Quality না মিললে কী করব?',
      a: 'যদি পণ্যের কোয়ালিটি আমাদের প্রতিশ্রুতির সাথে না মেলে বা কোনো ডিফেক্ট থাকে, তবে আমরা ৭ দিনের মধ্যে এক্সচেঞ্জ বা রিটার্ন গ্রহণ করি।'
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
