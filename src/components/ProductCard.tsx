import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onInquiry: (product?: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInquiry }) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessage = `আমি ${product.title} এর পাইকারি মূল্য জানতে চাই। Quantity: ___ পিস।`;
  const whatsappUrl = `https://wa.me/8801856078978?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-dark-card rounded-[2rem] overflow-hidden border border-white/5 flex flex-col h-full"
    >
      <Link to={`/product/${product.slug}`} className="block aspect-[3/4] overflow-hidden relative">
        <img 
          src={isHovered && product.image_url_2 ? product.image_url_2 : product.image_url} 
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge === 'NEW' && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              NEW
            </span>
          )}
          {product.badge === 'HOT' && (
            <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              HOT
            </span>
          )}
          {product.badge === 'BEST SELLER' && (
            <span className="bg-yellow-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              BEST SELLER
            </span>
          )}
          {product.badge === 'LIMITED STOCK' && (
            <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              LIMITED STOCK
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <span className="bg-deep-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
            {product.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-bold mb-2 group-hover:text-maroon transition-colors line-clamp-1">{product.title}</h3>
        </Link>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-off-white/40 uppercase tracking-widest">Retail Price</span>
            <span className="text-xl font-black text-maroon">৳{product.retail_price} <span className="text-xs font-normal">থেকে</span></span>
          </div>
        </div>

        <div className="mt-auto">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white/5 hover:bg-maroon text-white hover:text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm bangla"
          >
            <MessageSquare size={18} /> Wholesale Price জানুন
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
