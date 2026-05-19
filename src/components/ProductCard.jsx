import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from './Toast';
import ImageWithFallback from './ImageWithFallback';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`Added ${product.name} to Cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `Removed ${product.name} from Wishlist`
        : `Added ${product.name} to Wishlist`,
      'info'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-[#FF7A00]/20 shadow-[0_4px_20px_rgba(11,31,92,0.02)] hover:shadow-[0_20px_40px_rgba(11,31,92,0.06)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
    >
      {/* Product Image and Overlay */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-1 sm:gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider rounded bg-[#FF7A00] text-white shadow-md shadow-orange-500/25">
              {product.badge}
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider rounded bg-[#FFC107] text-[#0B1F5C] shadow-md shadow-yellow-500/10">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </span>
          )}
        </div>

        {/* Wishlist Trigger */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-rose-500 border-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/80 border-white/50 backdrop-blur-md text-gray-500 hover:text-rose-500 hover:bg-white hover:scale-105'
          }`}
        >
          <motion.div whileTap={{ scale: 1.3 }}>
            <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.div>
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Quick View Cover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-md text-[#0B1F5C] font-semibold text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-lg shadow-blue-950/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <FiEye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Quick View
            </span>
          </div>
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-[#FF7A00]">
            {product.category}
          </span>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block mt-1">
            <h3 className="font-bold text-xs sm:text-sm text-[#0B1F5C] hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 ml-0.5 sm:ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Pricing and Cart Actions */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-50/50">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-[#0B1F5C]">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through font-semibold">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#3BB77E]/10 hover:bg-[#3BB77E] text-[#3BB77E] hover:text-white transition-all duration-300 active:scale-95 shadow-sm shadow-[#3BB77E]/5 group/btn"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
