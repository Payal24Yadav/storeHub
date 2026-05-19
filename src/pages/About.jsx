import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiUsers, FiHeart, FiZap } from 'react-icons/fi';

function Counter({ end, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-black text-[#0B1F5C]">
      {isInView ? end : '0'}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div className="min-h-screen pb-20 mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* ─── HERO HEADER ─── */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-black text-[#FF7A00] tracking-widest">About Our Brand</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F5C] leading-tight select-none">
          Vijayawada's Ultimate <br />
          <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC107] bg-clip-text text-transparent drop-shadow-sm">
            E-commerce retail Hub
          </span>
        </h1>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">
          At PVRS 99StoreHub, we believe quality daily essentials shouldn't be expensive. We handpick everyday stationery items, home cleaning supplies, kitchenware, electrical accessories, and tasty snacks starting at just ₹99!
        </p>
      </section>

      {/* ─── DYNAMIC STATISTICS COUNTING GRIDS ─── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none">
        
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-2">
          <Counter end="10" suffix="K+" />
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Premium Products</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-2">
          <Counter end="5" suffix="K+" />
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Happy Customers</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-2">
          <Counter end="24" suffix="h" />
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Local Deliveries</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-2">
          <Counter end="100" suffix="%" />
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Quality Assured</div>
        </div>

      </section>

      {/* ─── OUR TARGET & VISION ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50/30 to-amber-50/30 border border-orange-100/50 flex flex-col justify-between space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100/80 flex items-center justify-center text-[#FF7A00] shadow-inner">
            <FiTarget className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-black text-lg text-[#0B1F5C]">Our Mission</h3>
            <p className="text-xs font-semibold text-gray-500 leading-relaxed">
              To bring a scalable, modern, and pocket-friendly retail and e-commerce shopping experience across Andhra Pradesh, simplifying standard grocery and stationery procurement.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/20 to-indigo-50/20 border border-blue-100/30 flex flex-col justify-between space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100/50 flex items-center justify-center text-[#0B1F5C] shadow-inner">
            <FiEye className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-black text-lg text-[#0B1F5C]">Our Vision</h3>
            <p className="text-xs font-semibold text-gray-500 leading-relaxed">
              To emerge as the premier retail brand in Southern India, blending traditional retail hospitality with rapid, reliable digital web shop portals and same-day express delivery logs.
            </p>
          </div>
        </div>

      </section>

      {/* ─── BRAND TIMELINE HISTORY ─── */}
      <section className="space-y-8 select-none">
        <h2 className="text-xl md:text-2xl font-black text-[#0B1F5C] text-center">Our Milestone Journey</h2>
        
        <div className="relative border-l-2 border-gray-150 pl-6 space-y-8 max-w-2xl mx-auto">
          
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FF7A00] border-4 border-white shadow" />
            <div className="space-y-1">
              <span className="text-xs font-black text-[#FF7A00]">2024 - Foundation</span>
              <h4 className="font-extrabold text-sm text-[#0B1F5C]">PVRS 99StoreHub Launched</h4>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Opened our first physical retail store outlet in Vijayawada offering select products under one single roof.</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FFC107] border-4 border-white shadow" />
            <div className="space-y-1">
              <span className="text-xs font-black text-[#FFC107]">2025 - Catalog Overhaul</span>
              <h4 className="font-extrabold text-sm text-[#0B1F5C]">Expanding to 10K+ Stocks</h4>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Integrated daily home care items, kitchen utensils, electronics cables, and local snack packs into the catalog.</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0B1F5C] border-4 border-white shadow" />
            <div className="space-y-1">
              <span className="text-xs font-black text-[#0B1F5C]">2026 - Going Digital</span>
              <h4 className="font-extrabold text-sm text-[#0B1F5C]">React E-commerce Launch</h4>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Booted up our dynamic premium React e-commerce web portal to facilitate rapid delivery logs inside Vijayawada region.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
