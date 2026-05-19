import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiGrid, FiList, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States from URL or Default
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [sortBy, setSortBy] = useState('featured');

  // Badge list from products
  const badgeList = useMemo(() => {
    const list = new Set();
    products.forEach((p) => p.badge && list.add(p.badge));
    return Array.from(list);
  }, []);

  // Update search query param
  const handleSearchChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) params.set('q', val);
    else params.delete('q');
    setSearchParams(params);
  };

  // Update category param
  const handleCategorySelect = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug !== 'all') params.set('category', slug);
    else params.delete('category');
    setSearchParams(params);
  };

  // Toggle badge list
  const toggleBadge = (badge) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search term check
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category check
    if (categoryFilter !== 'all') {
      list = list.filter((p) => p.category === categoryFilter);
    }

    // Price check
    list = list.filter((p) => p.price <= priceRange);

    // Badges check
    if (selectedBadges.length > 0) {
      list = list.filter((p) => selectedBadges.includes(p.badge));
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, categoryFilter, priceRange, selectedBadges, sortBy]);

  return (
    <div className="min-h-screen pb-20 mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ─── SEARCH HEADER & CONTROLS ─── */}
      <section className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Full-width Search Bar */}
        <div className="relative w-full md:max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search our catalog stationery, cleaning care, light accessories..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
          />
        </div>

        {/* Sort Select and Mobile Drawer toggle button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-orange-50 hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white transition-all text-xs font-bold w-full sm:w-auto cursor-pointer"
          >
            <FiSliders className="w-4 h-4" />
            Filter catalog
          </button>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-400 whitespace-nowrap">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-black text-[#0B1F5C]"
            >
              <option value="featured">Featured Items</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      </section>

      {/* ─── DOUBLE-PANED CONTENT LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DESKTOP FILTERS SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-6 hidden lg:block">
          
          {/* Categories directory */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Departments</h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-orange-50 text-[#FF7A00] font-bold'
                    : 'text-[#0B1F5C]/80 hover:bg-gray-50 hover:text-[#FF7A00]'
                }`}
              >
                <span>📦 All Categories</span>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{products.length}</span>
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategorySelect(c.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    categoryFilter === c.slug
                      ? 'bg-orange-50 text-[#FF7A00] font-bold'
                      : 'text-[#0B1F5C]/80 hover:bg-gray-50 hover:text-[#FF7A00]'
                  }`}
                >
                  <span>{c.icon} {c.name}</span>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing slider */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Price Limit</h3>
              <span className="text-xs font-black text-[#FF7A00]">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#FF7A00]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>₹20</span>
              <span>₹1000</span>
            </div>
          </div>

          {/* Special Badges */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Special Offers</h3>
            <div className="space-y-2">
              {badgeList.map((badge) => (
                <button
                  key={badge}
                  onClick={() => toggleBadge(badge)}
                  className="w-full flex items-center gap-2 text-xs font-semibold text-[#0B1F5C]/80 hover:text-[#FF7A00]"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    selectedBadges.includes(badge)
                      ? 'bg-[#FF7A00] border-transparent text-white'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedBadges.includes(badge) && <FiCheck className="w-3 h-3" />}
                  </div>
                  <span className="capitalize">{badge}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: SEARCH CATALOG GRIDS */}
        <main className="lg:col-span-9 space-y-6">
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-4">
              <FiSearch className="w-12 h-12 text-[#FF7A00] mx-auto animate-pulse" />
              <h3 className="text-lg font-black text-[#0B1F5C]">No Matches Found</h3>
              <p className="text-xs text-gray-400 font-semibold max-w-xs mx-auto">
                No items match your selected pricing or search criteria. Try adjusting the filter parameters!
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                  setPriceRange(1000);
                  setSelectedBadges([]);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-50 hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white transition-all text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* ─── MOBILE FILTERS DRAWER MODAL ─── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex justify-end pointer-events-auto"
            onClick={() => setMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 space-y-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="font-black text-lg text-[#0B1F5C]">Catalog Filter</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Categories directory */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Departments</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => { handleCategorySelect('all'); setMobileFilterOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      categoryFilter === 'all' ? 'bg-orange-50 text-[#FF7A00] font-bold' : 'text-[#0B1F5C]'
                    }`}
                  >
                    <span>📦 All Categories</span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{products.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { handleCategorySelect(c.slug); setMobileFilterOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        categoryFilter === c.slug ? 'bg-orange-50 text-[#FF7A00] font-bold' : 'text-[#0B1F5C]'
                      }`}
                    >
                      <span>{c.icon} {c.name}</span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Price Limit</h3>
                  <span className="text-xs font-black text-[#FF7A00]">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#FF7A00]"
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
