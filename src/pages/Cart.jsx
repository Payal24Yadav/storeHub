import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/Toast';

import ImageWithFallback from '../components/ImageWithFallback';

export default function Cart() {
  const { items: cart, increaseQty, decreaseQty, removeItem, totalItems } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Compute Subtotal
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Apply Coupon code
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'STORE99') {
      setAppliedDiscount(Math.round(subtotal * 0.1)); // 10% discount
      showToast('Coupon STORE99 applied successfully! 10% OFF.', 'success');
    } else {
      showToast('Invalid Coupon Code! Try STORE99.', 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your Cart is empty!', 'error');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pb-20 mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#0B1F5C]">Shopping Cart</h1>
        <p className="text-xs font-semibold text-gray-400 mt-1">Manage your selected items inside PVRS 99StoreHub.</p>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SELECTED ITEMS DIRECTORY LIST */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Thumbnails */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.name} 
                      containerClassName="w-full h-full bg-transparent"
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0B1F5C] leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mt-0.5 block">
                      {item.category}
                    </span>
                    <span className="text-xs font-black text-[#FF7A00] sm:hidden block mt-1">
                      ₹{item.price}
                    </span>
                  </div>
                </div>

                {/* Quantities counters and actions */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white select-none">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 hover:bg-gray-50 font-black text-[#0B1F5C]"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-black text-[#0B1F5C]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 hover:bg-gray-50 font-black text-[#0B1F5C]"
                    >
                      +
                    </button>
                  </div>

                  <span className="hidden sm:block font-black text-sm text-[#0B1F5C] min-w-[60px] text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => {
                      removeItem(item.id);
                      showToast(`Removed ${item.name} from Cart`, 'info');
                    }}
                    className="p-2.5 rounded-xl hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: PRICING DETAILS SUMMARY CARD */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo voucher coupon panel */}
            <div className="p-4 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <FiTag className="w-4 h-4 text-[#FF7A00]" />
                Promo Coupon Code
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full items-center">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Code (STORE99)"
                  className="flex-grow min-w-0 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs transition-colors whitespace-nowrap text-center flex-shrink-0"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Calculations summaries */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4 text-xs font-semibold text-gray-500">
              <h3 className="text-xs font-black text-[#0B1F5C] uppercase tracking-wider pb-3 border-b border-gray-50">
                Order Summary
              </h3>
              <div className="flex justify-between items-center">
                <span>Subtotal ({totalItems} items):</span>
                <span className="font-extrabold text-[#0B1F5C]">₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-600">
                  <span>Coupon Discount (10%):</span>
                  <span className="font-extrabold">- ₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Estimated Taxes (GST 5%):</span>
                <span className="font-extrabold text-[#0B1F5C]">₹{Math.round(subtotal * 0.05)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Shipping:</span>
                <span className="text-emerald-600 font-extrabold">FREE</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-sm font-black text-[#0B1F5C]">
                <span>Total Amount:</span>
                <span className="text-base text-[#FF7A00]">
                  ₹{subtotal - appliedDiscount + Math.round(subtotal * 0.05)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-sm shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 select-none cursor-pointer"
              >
                Proceed to Checkout
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-4 max-w-lg mx-auto">
          <FiShoppingBag className="w-12 h-12 text-[#FF7A00] mx-auto animate-pulse" />
          <h2 className="text-xl font-black text-[#0B1F5C]">Your Cart is Empty</h2>
          <p className="text-xs text-gray-400 font-semibold max-w-xs mx-auto">
            You haven't added any items to your PVRS 99StoreHub cart yet! Browse the latest premium categories.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-xs shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
          >
            Start Shopping
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

    </div>
  );
}
