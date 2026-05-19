import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiCheck, FiMapPin, FiCreditCard, FiPackage, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/Toast';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Checkout() {
  const { cart, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1); // Steps: 1 = Address, 2 = Payment, 3 = Review

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Vijayawada',
    zipCode: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Compute pricing totals
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!formData.name || !formData.phone || !formData.address || !formData.zipCode) {
        showToast('Please fill out all address fields!', 'error');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      setActiveStep(3);
    }
  };

  const handlePlaceOrder = () => {
    showToast('Placing your order...', 'info');
    setTimeout(() => {
      clearCart();
      showToast('Order placed successfully!', 'success');
      navigate('/order-success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-black text-[#0B1F5C]">No Items to Checkout</h2>
        <Link to="/shop" className="text-[#FF7A00] font-bold">Browse Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Back button */}
      <button
        onClick={() => activeStep > 1 ? setActiveStep(activeStep - 1) : navigate('/cart')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F5C]/60 hover:text-[#FF7A00] transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        {activeStep > 1 ? 'Back to Previous Step' : 'Back to Cart'}
      </button>

      {/* Progress tracker steps header */}
      <section className="p-5 rounded-3xl bg-white border border-gray-150/40 shadow-sm flex justify-around items-center select-none">
        
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
            activeStep >= 1 ? 'bg-[#0B1F5C] text-white shadow-md shadow-blue-950/15' : 'bg-gray-100 text-gray-400'
          }`}>
            {activeStep > 1 ? <FiCheck className="w-4 h-4" /> : '1'}
          </div>
          <span className={`text-xs font-bold ${activeStep >= 1 ? 'text-[#0B1F5C]' : 'text-gray-400'} hidden sm:inline`}>Address Details</span>
        </div>

        <FiChevronRight className="w-4 h-4 text-gray-300" />

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
            activeStep >= 2 ? 'bg-[#0B1F5C] text-white shadow-md shadow-blue-950/15' : 'bg-gray-100 text-gray-400'
          }`}>
            {activeStep > 2 ? <FiCheck className="w-4 h-4" /> : '2'}
          </div>
          <span className={`text-xs font-bold ${activeStep >= 2 ? 'text-[#0B1F5C]' : 'text-gray-400'} hidden sm:inline`}>Payment Method</span>
        </div>

        <FiChevronRight className="w-4 h-4 text-gray-300" />

        {/* Step 3 */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${
            activeStep >= 3 ? 'bg-[#0B1F5C] text-white shadow-md shadow-blue-950/15' : 'bg-gray-100 text-gray-400'
          }`}>
            3
          </div>
          <span className={`text-xs font-bold ${activeStep >= 3 ? 'text-[#0B1F5C]' : 'text-gray-400'} hidden sm:inline`}>Review & Order</span>
        </div>

      </section>

      {/* Main Forms Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE STEP FORM */}
        <main className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-white border border-gray-150/40 shadow-sm space-y-6">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          {activeStep === 1 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] flex items-center gap-2 pb-3 border-b border-gray-100">
                <FiMapPin className="w-5 h-5 text-[#FF7A00]" />
                Delivery Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-250 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-250 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Street Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Flat/House no, building, area name"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-250 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">City</label>
                  <input
                    readOnly
                    value={formData.city}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-400 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Zip Code</label>
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="6-digit ZIP code"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-250 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs shadow-md shadow-blue-950/5 hover:-translate-y-0.5 active:scale-95 transition-all select-none cursor-pointer text-center"
              >
                Proceed to Payment Method
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] flex items-center gap-2 pb-3 border-b border-gray-100">
                <FiCreditCard className="w-5 h-5 text-[#FF7A00]" />
                Select Payment Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* COD Card */}
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer flex flex-col justify-between min-h-[140px] transition-all select-none ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#FF7A00] bg-orange-50/10 shadow-lg shadow-orange-500/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-sm text-[#0B1F5C]">Cash On Delivery</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-transparent bg-[#FF7A00] text-white' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'cod' && <FiCheck className="w-3 h-3" />}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                    Pay securely using cash or QR code on delivery at your doorstep. Standard charges apply.
                  </p>
                </div>

                {/* UPI Card */}
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer flex flex-col justify-between min-h-[140px] transition-all select-none ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#FF7A00] bg-orange-50/10 shadow-lg shadow-orange-500/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-sm text-[#0B1F5C]">UPI Online Payment</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      formData.paymentMethod === 'upi' ? 'border-transparent bg-[#FF7A00] text-white' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'upi' && <FiCheck className="w-3 h-3" />}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                    Pay instantly using Google Pay, PhonePe, Paytm, or any standard UPI banking application.
                  </p>
                </div>

              </div>

              <button
                onClick={handleNextStep}
                className="w-full py-3.5 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs shadow-md shadow-blue-950/5 hover:-translate-y-0.5 active:scale-95 transition-all select-none cursor-pointer text-center"
              >
                Proceed to Final Review
              </button>
            </div>
          )}

          {/* STEP 3: ORDER REVIEW */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] flex items-center gap-2 pb-3 border-b border-gray-100">
                <FiPackage className="w-5 h-5 text-[#FF7A00]" />
                Review Your Order
              </h2>

              <div className="space-y-5">
                
                {/* Delivery address details summary */}
                <div className="p-5 rounded-2xl bg-gray-50/60 border border-gray-150/80 space-y-2 text-xs font-semibold text-gray-500">
                  <div className="font-extrabold text-gray-400 uppercase tracking-widest text-[9px] mb-1">DELIVERY SHIPPING TO:</div>
                  <div className="font-extrabold text-sm text-[#0B1F5C]">{formData.name}</div>
                  <div><span className="font-bold text-[#0B1F5C]">Phone:</span> {formData.phone}</div>
                  <div><span className="font-bold text-[#0B1F5C]">Address:</span> {formData.address}, {formData.city} - {formData.zipCode}</div>
                </div>

                {/* Payment method summary */}
                <div className="p-5 rounded-2xl bg-gray-50/60 border border-gray-150/80 space-y-2 text-xs font-semibold text-gray-500">
                  <div className="font-extrabold text-gray-400 uppercase tracking-widest text-[9px] mb-1">SELECTED PAYMENT METHOD:</div>
                  <div className="font-extrabold text-[#0B1F5C] text-sm uppercase tracking-wide">
                    {formData.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '⚡ UPI Online Payment'}
                  </div>
                </div>

              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-extrabold text-sm shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 active:scale-95 transition-all select-none cursor-pointer"
              >
                Place Final Order (₹{subtotal + Math.round(subtotal * 0.05)})
              </button>
            </div>
          )}

        </main>

        {/* RIGHT COLUMN: ITEMS SUMMARY SIDE-CARD */}
        <aside className="lg:col-span-4 p-6 rounded-3xl bg-white border border-gray-150/40 shadow-sm space-y-4">
          <h3 className="text-[10px] font-extrabold text-[#0B1F5C] uppercase tracking-widest pb-3 border-b border-gray-100">
            Order Items ({totalItems})
          </h3>
          
          <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1.5 border border-gray-150 flex-shrink-0">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.name} 
                      containerClassName="w-full h-full bg-transparent"
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0B1F5C] line-clamp-1 leading-tight">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold mt-0.5">{item.quantity} x ₹{item.price}</div>
                  </div>
                </div>
                <span className="font-extrabold text-xs text-[#0B1F5C]">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs font-semibold text-gray-500">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="font-extrabold text-[#0B1F5C]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Taxes (GST 5%):</span>
              <span className="font-extrabold text-[#0B1F5C]">₹{Math.round(subtotal * 0.05)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#0B1F5C] pt-2 border-t border-gray-50">
              <span>Grand Total:</span>
              <span className="text-[#FF7A00] text-base font-black">₹{subtotal + Math.round(subtotal * 0.05)}</span>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
