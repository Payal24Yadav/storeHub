import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiZap, FiTruck, FiShield, FiRefreshCw, FiChevronDown, FiShoppingBag, FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import ImageWithFallback from '../components/ImageWithFallback';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

// Infinite Brand Slider Logo Items
const brands = [
  'StoreHub Originals',
  'PowerLite Electronics',
  'Nippo Essentials',
  'StationeryPro',
  'DailyBites Snacks',
  'HomeCare Organics',
  'LiteHub Lighting',
];

// FAQS
const faqs = [
  { q: 'What is PVRS 99StoreHub?', a: 'We are a premier retail and e-commerce hub based in Vijayawada, offering high-quality stationery, home essentials, snacks, lights, electronics, and daily essentials starting from just ₹99!' },
  { q: 'How fast do you deliver?', a: 'We offer express delivery across Vijayawada, Guntur, and nearby Krishna District areas within 24 hours. Standard shipping takes 2-3 business days.' },
  { q: 'Is there a minimum order amount?', a: 'No, there is absolutely no minimum order amount! You can shop for any single item starting at ₹99.' },
  { q: 'How can I contact support?', a: 'You can reach us instantly via the floating WhatsApp button on the bottom right of the page, or fill out the messaging form on our Contact Us page.' },
];

const featuredCategories = [
  { name: 'Cake & Milk', items: '11 items', bg: 'bg-[#F2F9E9]', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80', slug: 'snacks' },
  { name: 'Oganic Kiwi', items: '6 items', bg: 'bg-[#FEEFEA]', image: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=300&auto=format&fit=crop&q=80', slug: 'home-essentials' },
  { name: 'Peach', items: '6 items', bg: 'bg-[#ECFFEC]', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&auto=format&fit=crop&q=80', slug: 'home-care' },
  { name: 'Read Apple', items: '10 items', bg: 'bg-[#FEEFEA]', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&q=80', slug: 'snacks' },
  { name: 'Snacks', items: '11 items', bg: 'bg-[#FFF3EB]', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&auto=format&fit=crop&q=80', slug: 'snacks' },
  { name: 'Vegetables', items: '6 items', bg: 'bg-[#FFF3FF]', image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=150&q=80', slug: 'home-care' },
  { name: 'Strawberry', items: '10 items', bg: 'bg-[#F2F9E9]', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&q=80', slug: 'snacks' },
  { name: 'Black plum', items: '10 items', bg: 'bg-[#FEEFEA]', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=150&q=80', slug: 'snacks' },
  { name: 'Custard apple', items: '10 items', bg: 'bg-[#ECFFEC]', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=150&q=80', slug: 'home-care' },
  { name: 'Coffe & Tea', items: '11 items', bg: 'bg-[#FFF3EB]', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80', slug: 'stationery' },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Live Flash Deal Countdown Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // Loop back to 24h
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter featured & trending products
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <div className="space-y-12 pb-20 overflow-x-hidden">
      
      {/* ─── HERO SECTION ─── */}
      <HeroSection />

      {/* ─── FEATURED CATEGORIES SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1F5C] tracking-tight">
              Featured Categories
            </h2>
          </div>`n          <div className="flex items-center gap-2 shrink-0">
              <Link to="/category/snacks" className="hover:text-[#3BB77E] transition-colors">Cake & Milk</Link>
              <Link to="/category/stationery" className="hover:text-[#3BB77E] transition-colors">Coffes & Teas</Link>
              <Link to="/category/home-essentials" className="hover:text-[#3BB77E] transition-colors">Pet Foods</Link>
              <Link to="/category/home-care" className="hover:text-[#3BB77E] transition-colors">Vegetables</Link>
            </div>
          </div>
          
          {/* Scroll Navigation */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button 
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#3BB77E] hover:text-white hover:border-transparent transition-all shadow-sm active:scale-90"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#3BB77E] hover:text-white hover:border-transparent transition-all shadow-sm active:scale-90"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredCategories.map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.slug}`}
              className={`snap-start shrink-0 w-[150px] h-[190px] ${cat.bg} rounded-[2rem] relative overflow-hidden flex flex-col items-center justify-center group shadow-sm hover:shadow-2xl hover:shadow-[#0B1F5C]/10 transition-all duration-500 border border-transparent hover:border-white/50 hover:-translate-y-2`}
            >
              <div className="w-24 h-24 mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                <ImageWithFallback 
                  src={cat.image} 
                  alt={cat.name} 
                  containerClassName="w-full h-full rounded-2xl overflow-hidden bg-white/50"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-5 left-0 right-0 text-center z-20">
                <h3 className="font-black text-xs text-[#0B1F5C] leading-tight group-hover:text-[#FF7A00] transition-colors duration-300 px-2">
                  {cat.name}
                </h3>
                <span className="text-[9px] font-extrabold text-[#0B1F5C]/50 uppercase tracking-widest block mt-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {cat.items}
                </span>
              </div>
              {/* Premium Glass Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white/90 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 backdrop-blur-[2px]" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 3-COLUMN HERO BANNER GRID ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Banner 1 - Onion */}
          <div className="relative overflow-hidden rounded-3xl bg-[#F2EBD9] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[250px] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="max-w-[60%] space-y-4 z-10">
              <h3 className="text-lg md:text-xl font-bold text-[#0B1F5C] leading-snug font-display">
                Everyday Fresh & Clean with Our Products
              </h3>
              <Link 
                to="/category/home-care" 
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3BB77E] hover:bg-[#29A56C] text-white font-bold text-xs transition-colors shadow-sm select-none"
              >
                Shop Now
                <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ImageWithFallback 
              src="/banner1.png" 
              alt="Everyday Fresh & Clean" 
              containerClassName="absolute right-0 bottom-0 w-[50%] md:w-[45%] h-[85%] bg-transparent pointer-events-none"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            />
          </div>

          {/* Banner 2 - Strawberry Juice */}
          <div className="relative overflow-hidden rounded-3xl bg-[#F5E6E8] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[250px] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="max-w-[60%] space-y-4 z-10">
              <h3 className="text-lg md:text-xl font-bold text-[#0B1F5C] leading-snug font-display">
                Make your Breakfast Healthy and Easy
              </h3>
              <Link 
                to="/category/snacks" 
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3BB77E] hover:bg-[#29A56C] text-white font-bold text-xs transition-colors shadow-sm select-none"
              >
                Shop Now
                <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ImageWithFallback 
              src="/banner2.png" 
              alt="Breakfast Healthy and Easy" 
              containerClassName="absolute right-0 bottom-0 w-[50%] md:w-[45%] h-[85%] bg-transparent pointer-events-none"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            />
          </div>

          {/* Banner 3 - Organic Veggies */}
          <div className="relative overflow-hidden rounded-3xl bg-[#E7ECF3] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[250px] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="max-w-[60%] space-y-4 z-10">
              <h3 className="text-lg md:text-xl font-bold text-[#0B1F5C] leading-snug font-display">
                The best Organic Products Online
              </h3>
              <Link 
                to="/category/home-essentials" 
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#3BB77E] hover:bg-[#29A56C] text-white font-bold text-xs transition-colors shadow-sm select-none"
              >
                Shop Now
                <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ImageWithFallback 
              src="/banner3.png" 
              alt="Organic Products Online" 
              containerClassName="absolute right-0 bottom-0 w-[50%] md:w-[45%] h-[85%] bg-transparent pointer-events-none"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* ─── INFINITE BRAND SLIDER MARQUEE ─── */}
      

      {/* ─── DAILY FLASH DEALS SECTION ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#0B1F5C] to-blue-950 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-radial-gradient(at 0% 0%, rgba(255,122,0,0.15), transparent 60%) pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 mb-8 pb-6 border-b border-white/10">
          
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/20 text-[#FF7A00] text-xs font-black uppercase tracking-wider border border-orange-500/30">
              <FiZap className="w-3.5 h-3.5 fill-current" />
              Flash Deal of the Day
            </div>
            <h2 className="text-3xl font-black">
              Limited-Time Super Offers!
            </h2>
          </div>

          {/* Countdown Clock Container */}
          <div className="flex items-center gap-2 select-none">
            <span className="text-xs font-bold text-gray-300 mr-2 uppercase tracking-wider">ENDING IN:</span>
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-12 py-2 rounded-xl bg-white/10 font-black text-lg text-center border border-white/10 shadow-inner">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-[9px] text-gray-400 font-extrabold mt-1">HRS</span>
            </div>
            <span className="font-black text-[#FF7A00] animate-pulse">:</span>
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-12 py-2 rounded-xl bg-white/10 font-black text-lg text-center border border-white/10 shadow-inner">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-[9px] text-gray-400 font-extrabold mt-1">MINS</span>
            </div>
            <span className="font-black text-[#FF7A00] animate-pulse">:</span>
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-12 py-2 rounded-xl bg-white/10 font-black text-lg text-center border border-white/10 shadow-inner">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="text-[9px] text-gray-400 font-extrabold mt-1">SECS</span>
            </div>
          </div>

        </div>

        {/* Deals products list grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl p-1 text-[#0B1F5C]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED AND TRENDING PRODUCTS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs uppercase font-black text-[#FF7A00] tracking-widest">Selected Quality</span>
            <h2 className="text-3xl font-black text-[#0B1F5C]">Trending E-commerce Goods</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 font-extrabold text-sm text-[#FF7A00] hover:text-[#0B1F5C] transition-colors group">
            See All Items
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ─── BRAND STORIES / STATS ─── */}
      <section className="py-16 bg-[#0B1F5C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(at 100% 100%, rgba(255,193,7,0.08), transparent 60%)" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center select-none">
          
          <div className="space-y-2 p-6 border-r border-white/5 md:border-r">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 text-[#FF7A00] mb-2 shadow-inner">
              <FiTruck className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-white">24h Express</h3>
            <p className="text-xs text-gray-400 font-semibold max-w-[200px] mx-auto">Free local courier deliver on all orders inside Vijayawada.</p>
          </div>

          <div className="space-y-2 p-6 border-r border-white/5 md:border-r">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 text-[#FFC107] mb-2 shadow-inner">
              <FiShield className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-white">100% Assured</h3>
            <p className="text-xs text-gray-400 font-semibold max-w-[200px] mx-auto">All e-commerce products checked and packaged with absolute care.</p>
          </div>

          <div className="space-y-2 p-6">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 text-[#FF7A00] mb-2 shadow-inner">
              <FiRefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-white">Easy Returns</h3>
            <p className="text-xs text-gray-400 font-semibold max-w-[200px] mx-auto">No queries asked return policy within 7 calendar days.</p>
          </div>

        </div>
      </section>

      {/* ─── FAQ ACCORDIONS ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-black text-[#FF7A00] tracking-widest">
            Common Inquiries
          </span>
          <h2 className="text-3xl font-black text-[#0B1F5C]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-extrabold text-[#0B1F5C] hover:text-[#FF7A00] transition-colors"
              >
                <span>{faq.q}</span>
                <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#FF7A00]' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="p-5 pt-0 text-sm font-medium text-gray-500 border-t border-gray-50 leading-relaxed bg-gray-50/30">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ─── IN-PAGE WHATSAPP SUPPORT BOARD ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-emerald-900/5">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              🟢 ONLINE SUPPORT
            </span>
            <h2 className="text-2xl font-black text-[#0B1F5C]">
              Need Help With Custom Bulk Orders?
            </h2>
            <p className="text-xs text-gray-500 font-medium max-w-mdLeading leading-relaxed">
              Message us on WhatsApp. Our customer desk is active from 9:00 AM to 9:00 PM every single day to clear any bulk retail inquiries!
            </p>
          </div>

          <a
            href="https://wa.me/919999999999?text=Hi%20PVRS%2099StoreHub%2C%20I%20have%20an%20inquiry!"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm shadow-xl shadow-emerald-500/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-full md:w-auto justify-center select-none"
          >
            <FaWhatsapp className="w-5 h-5" />
            Connect Now
          </a>
        </div>
      </section>
    </div>
  );
}
