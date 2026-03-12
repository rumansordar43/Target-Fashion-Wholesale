export default function SizeGuide() {
  const sizes = [
    { size: 'M', chest: '38"', length: '27"' },
    { size: 'L', chest: '40"', length: '28"' },
    { size: 'XL', chest: '42"', length: '29"' },
    { size: 'XXL', chest: '44"', length: '30"' },
  ];

  return (
    <div className="py-24 px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-8xl font-black mb-12 leading-none uppercase text-center">Size <span className="text-royal-gold">Guide</span></h1>
      
      <p className="text-center text-off-white/60 mb-16 bangla">আমাদের টি-শার্টগুলোর সঠিক মাপ নিশ্চিত করতে নিচের চার্টটি অনুসরণ করুন।</p>

      <div className="bg-dark-card rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-royal-gold text-deep-black">
              <th className="p-8 font-black uppercase tracking-widest">Size</th>
              <th className="p-8 font-black uppercase tracking-widest">Chest (Inch)</th>
              <th className="p-8 font-black uppercase tracking-widest">Length (Inch)</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {sizes.map((s, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-8 font-bold">{s.size}</td>
                <td className="p-8 text-off-white/70">{s.chest}</td>
                <td className="p-8 text-off-white/70">{s.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 p-10 bg-steel-blue/10 rounded-3xl border border-steel-blue/20">
        <h3 className="text-steel-blue font-bold mb-4 uppercase tracking-widest">Important Note:</h3>
        <ul className="list-disc list-inside space-y-2 text-off-white/60 text-sm">
          <li>Sizes may vary by +/- 0.5 inches due to manufacturing processes.</li>
          <li>For oversized fit, we recommend choosing one size larger than your regular fit.</li>
          <li>Wash in cold water and avoid direct sunlight for long-lasting color.</li>
        </ul>
      </div>
    </div>
  );
}
