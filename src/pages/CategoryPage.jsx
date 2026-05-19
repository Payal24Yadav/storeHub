import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiSearch, FiSliders, FiShoppingBag, FiArrowLeft, FiStar, FiHeart, FiShoppingCart, FiEye, FiZap, FiEdit2, FiCoffee, FiSmartphone, FiHome, FiBox } from 'react-icons/fi';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Find active category
  const activeCategory = useMemo(() => {
    return categories.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.category === categorySlug);
    
    if (searchQuery.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [categorySlug, searchQuery, sortBy]);

  if (!activeCategory) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-[#0B1F5C]">Category Not Found</h2>
        <Link to="/" className="text-[#FF7A00] font-bold">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 relative overflow-hidden ${
      categorySlug === 'stationery' ? 'bg-amber-50/10' :
      categorySlug === 'home-care' ? 'bg-cyan-50/10' :
      categorySlug === 'snacks' ? 'bg-rose-50/10' :
      categorySlug === 'lights-electricals' ? 'bg-yellow-50/10' :
      categorySlug === 'electronics' ? 'bg-indigo-50/10' : 'bg-gray-50/10'
    }`}>
      
      {/* Category Header Showcase Banner */}
      <section className="relative py-16 bg-[#0B1F5C] text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-radial-gradient(at 0% 0%, rgba(255,122,0,0.1), transparent 60%) pointer-events-none" />
        
        {/* Stationery Grid Paper background SVG */}
        {categorySlug === 'stationery' && (
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)',
            backgroundSize: '20px 20px'
          }} />
        )}

        {/* Home Care Bubble float overlay */}
        {categorySlug === 'home-care' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/5 border border-white/10 bubble-float"
                style={{
                  width: `${30 + i * 20}px`,
                  height: `${30 + i * 20}px`,
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Lights & Electricals Ambient Lamp rays */}
        {categorySlug === 'lights-electricals' && (
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-b from-[#FFC107]/15 to-transparent clip-path-spotlight blur-2xl pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-gray-300 hover:text-white transition-colors">
              <FiArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl">{activeCategory.icon}</span>
              <h1 className="text-3xl md:text-4xl font-black">{activeCategory.name}</h1>
            </div>
            <p className="text-xs text-gray-300 max-w-xl font-medium leading-relaxed">
              {activeCategory.description || 'Explore our custom catalog collections handpicked to bring quality retail right to you.'}
            </p>
          </div>
          <div className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-sm shadow-lg select-none flex items-center gap-1.5">
            <FiZap className="w-4 h-4 text-[#FFC107]" /> {filteredProducts.length} Premium items
          </div>
        </div>
      </section>

      {/* ─── DOUBLE-PANED CONTENT LAYOUT ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DESKTOP-STICKY CATEGORY SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-6 hidden lg:block">
          
          {/* Sidebar Department Directory list */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Departments
            </h3>
            <div className="space-y-1.5">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    c.slug === categorySlug
                      ? 'bg-gradient-to-r from-[#0B1F5C] to-blue-900 text-white shadow-lg shadow-blue-900/10'
                      : 'text-[#0B1F5C]/80 hover:bg-orange-50/50 hover:text-[#FF7A00]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{c.icon}</span>
                    {c.name}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    c.slug === categorySlug ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {c.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Interactive Sticky Note Card */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-3 relative overflow-hidden select-none ${
            categorySlug === 'stationery' ? 'bg-amber-100/50 border-amber-200' :
            categorySlug === 'home-care' ? 'bg-cyan-100/50 border-cyan-200' :
            categorySlug === 'snacks' ? 'bg-rose-100/50 border-rose-200' :
            categorySlug === 'lights-electricals' ? 'bg-yellow-100/50 border-yellow-200' :
            categorySlug === 'electronics' ? 'bg-indigo-100/50 border-indigo-200' : 'bg-gray-100/50 border-gray-200'
          }`}>
            {/* Hanging clip/pin decoration */}
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gray-400/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              {categorySlug === 'stationery' ? <><FiEdit2 className="w-3.5 h-3.5" /> Study Companion</> :
               categorySlug === 'home-care' ? <><MdOutlineCleaningServices className="w-3.5 h-3.5" /> Clean Hygiene</> :
               categorySlug === 'snacks' ? <><FiCoffee className="w-3.5 h-3.5" /> Tasty Bites</> :
               categorySlug === 'lights-electricals' ? <><FiZap className="w-3.5 h-3.5" /> Electric Vibe</> :
               categorySlug === 'electronics' ? <><FiSmartphone className="w-3.5 h-3.5" /> Smart Gadgets</> : <><FiBox className="w-3.5 h-3.5" /> Storage Box</>}
            </span>
            <h4 className="font-extrabold text-sm text-[#0B1F5C] leading-snug">
              {categorySlug === 'stationery' ? 'Write your own stories and draw your maps with high-quality pens.' :
               categorySlug === 'home-care' ? 'Fresh fragrance floors and safe kitchen workspaces.' :
               categorySlug === 'snacks' ? 'Munch crunchy treats and absolute sweet chocolates.' :
               categorySlug === 'lights-electricals' ? 'Brighten up your home corridors with glowing LEDs.' :
               categorySlug === 'electronics' ? 'High-speed fast chargers and ultra stereo audio earbuds.' : 'Daily utility tools.'}
            </h4>
            <div className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
              <FiZap className="w-3 h-3 text-[#FF7A00]" /> Guaranteed quality inside PVRS 99StoreHub
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: CATALOG SEARCH, SORT, AND PRODUCT GRID */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Filters controls bar */}
          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search inputs */}
            <div className="relative w-full sm:max-w-xs">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inside category..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
              />
            </div>

            {/* Sort selectors */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-black text-[#0B1F5C]"
              >
                <option value="featured">Featured Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>

          {/* Catalog Grids display */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <FiSearch className="w-12 h-12 text-[#FF7A00] mx-auto animate-pulse" />
              <h3 className="text-lg font-black text-[#0B1F5C]">No Matches Found</h3>
              <p className="text-xs text-gray-400 font-semibold max-w-xs mx-auto">
                No items match your search "{searchQuery}" inside this category. Try typing another search term!
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-xl bg-orange-50 hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white transition-all text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
