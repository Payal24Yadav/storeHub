import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag, FiTag, FiArrowRight, FiShoppingCart, FiGift } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';

export default function CartSidebar({ open, onClose }) {
  const { items, removeItem, increaseQty, decreaseQty, subtotal, total, discount, coupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'PVRS10') {
      applyCoupon('PVRS10');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try PVRS10');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#0f172a] shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="w-5 h-5 text-[#FF7A00]" />
                <h2 className="text-xl font-black text-gray-800 dark:text-white">Your Cart</h2>
                {items.length > 0 && (
                  <span className="w-6 h-6 bg-[#FF7A00] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="flex justify-center text-6xl text-[#FF7A00]/20 mb-2">
                    <FiShoppingCart />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm">Add some amazing products to your cart!</p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      containerClassName="w-16 h-16 rounded-xl shrink-0 bg-transparent"
                      className="w-full h-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 leading-tight">{item.name}</p>
                      <p className="text-[#FF7A00] font-bold mt-1">₹{item.price}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-white dark:bg-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md font-bold transition-colors"
                          >
                            −
                          </button>
                          <span className="px-2 text-sm font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm shrink-0">₹{item.price * item.quantity}</p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-white/10 p-4 space-y-3">
                {/* Coupon */}
                {!coupon ? (
                  <div>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3">
                        <FiTag className="w-4 h-4 text-gray-400" />
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code (PVRS10)"
                          className="flex-1 py-2.5 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200"
                        />
                      </div>
                      <button
                        onClick={handleCoupon}
                        className="px-4 py-2.5 bg-[#0B1F5C] text-white text-sm font-bold rounded-xl hover:bg-[#FF7A00] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-red-500 text-xs mt-1 ml-1">{couponError}</p>}
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-3 py-2">
                    <span className="text-green-700 dark:text-green-400 text-sm font-semibold flex items-center">
                      <FiGift className="w-4 h-4 mr-1.5 text-green-600 dark:text-green-400" /> PVRS10 applied! Save 10%
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>−₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-gray-800 dark:text-white pt-2 border-t border-gray-100 dark:border-white/10">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-[1.02]"
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="block text-center text-sm text-[#0B1F5C] dark:text-blue-300 hover:underline font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
