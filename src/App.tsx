import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InquiryModal from './components/InquiryModal';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Reseller from './pages/Reseller';
import WholesaleInquiry from './pages/WholesaleInquiry';
import HowToOrder from './pages/HowToOrder';
import About from './pages/About';
import SizeGuide from './pages/SizeGuide';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NewArrivals from './pages/NewArrivals';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Product } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const openInquiry = (product?: Product) => {
    if (product) setSelectedProduct(product);
    else setSelectedProduct(null);
    setShowInquiryModal(true);
  };

  return (
    <Router>
      <Layout openInquiry={() => openInquiry()}>
        <Routes>
          <Route path="/" element={<Home openInquiry={openInquiry} />} />
          <Route path="/catalog" element={<Catalog openInquiry={openInquiry} />} />
          <Route path="/product/:slug" element={<ProductDetail openInquiry={openInquiry} />} />
          <Route path="/category/:name" element={<Category openInquiry={openInquiry} />} />
          <Route path="/reseller" element={<Reseller />} />
          <Route path="/wholesale-inquiry" element={<WholesaleInquiry />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/new-arrivals" element={<NewArrivals openInquiry={openInquiry} />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>

      <InquiryModal 
        isOpen={showInquiryModal} 
        onClose={() => setShowInquiryModal(false)} 
        selectedProduct={selectedProduct} 
      />
    </Router>
  );
}
