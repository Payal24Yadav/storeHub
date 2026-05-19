import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiUser, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  {
    label: 'Categories', path: '#',
    children: [
      { label: '✏️ Stationery', path: '/category/stationery' },
      { label: '🧹 Home Care', path: '/category/home-care' },
      { label: '🏠 Home Essentials', path: '/category/home-essentials' },
      { label: '🍿 Snacks', path: '/category/snacks' },
      { label: '💡 Lights & Electricals', path: '/category/lights-electricals' },
      { label: '📱 Electronics', path: '/category/electronics' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#FF7A00]/15 shadow-[0_8px_30px_rgba(11,31,92,0.04)] py-2'
            : 'bg-white/30 backdrop-blur-md border-b border-white/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo.png" 
                alt="99 Store Hub Logo" 
                className="h-11 w-auto max-h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&q=80"; // fallback
                }}
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'text-[#FF7A00] bg-orange-50/50'
                        : 'text-[#0B1F5C]/80 hover:text-[#FF7A00] hover:bg-orange-50/30'
                    }`}
                  >
                    {link.label}
                    {link.children && <FiChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden z-50 p-1"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-3 text-sm font-semibold text-[#0B1F5C]/80 hover:bg-orange-50/50 hover:text-[#FF7A00] rounded-xl transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl hover:bg-orange-50/30 text-[#0B1F5C]/80 hover:text-[#FF7A00] transition-all"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl hover:bg-orange-50/30 text-[#0B1F5C]/80 hover:text-rose-500 transition-all"
              >
                <FiHeart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF7A00] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Page Link */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl hover:bg-orange-50/30 text-[#0B1F5C]/80 hover:text-[#FF7A00] transition-all"
              >
                <FiShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-[#FF7A00] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Profile Account */}
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r from-[#0B1F5C] to-[#152e78] text-white hover:from-[#FF7A00] hover:to-[#FFC107] transition-all duration-300 shadow-md shadow-blue-900/10 hover:shadow-orange-500/10 hover:-translate-y-0.5 active:scale-95 ml-1"
              >
                <FiUser className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-orange-50/30 text-[#0B1F5C]"
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label} className="py-1">
                    {link.children ? (
                      <div>
                        <div className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gray-400">
                          {link.label}
                        </div>
                        <div className="pl-4 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="block px-4 py-2.5 rounded-xl font-semibold text-[#0B1F5C] hover:bg-orange-50/50 hover:text-[#FF7A00] transition-all"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-4 py-2.5 rounded-xl font-semibold text-[#0B1F5C] hover:bg-orange-50/50 hover:text-[#FF7A00] transition-all"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modern Search Modal Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4 pointer-events-auto"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_24px_70px_rgba(11,31,92,0.12)] border border-gray-100 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="flex items-center p-5 gap-3 border-b border-gray-50">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for stationery, home care, electricals..."
                  className="flex-1 text-base outline-none bg-transparent text-[#0B1F5C] font-semibold placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </form>
              <div className="p-5 bg-gray-50/50">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-2">
                  {['Ball Pen', 'LED Bulb', 'Lunch Box', 'Snacks', 'Earbuds'].map(t => (
                    <button
                      key={t}
                      onClick={() => { setSearchQuery(t); navigate(`/shop?q=${encodeURIComponent(t)}`); setSearchOpen(false); }}
                      className="px-3.5 py-2 bg-white hover:bg-[#FF7A00] rounded-xl text-xs font-semibold text-[#0B1F5C]/80 hover:text-white shadow-sm border border-gray-100 hover:border-transparent transition-all cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
