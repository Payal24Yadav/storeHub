import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { showToast } from '../components/Toast';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      showToast('Please fill out all registration fields!', 'error');
      return;
    }
    showToast('Creating account...', 'info');
    setTimeout(() => {
      showToast('Account registered successfully! Welcome to PVRS 99StoreHub.', 'success');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-white border border-gray-150/40 shadow-[0_20px_50px_rgba(11,31,92,0.04)] overflow-hidden">
        
        {/* LEFT COLUMN: BRAND DETAILS */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#0B1F5C] to-blue-950 text-white p-8 flex-col justify-between relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-radial-gradient(at 100% 0%, rgba(255,122,0,0.18), transparent 60%) pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient(at 0% 100%, rgba(255,193,7,0.08), transparent 65%) pointer-events-none" />
          
          <Link to="/" className="relative z-10 block">
            <img src="/logo.png" alt="99 Store Hub Logo" className="h-10 w-auto object-contain brightness-0 invert select-none" />
          </Link>

          <div className="space-y-3.5 relative z-10 mt-12">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight">Create Member Account</h2>
            <p className="text-[11px] text-blue-200/90 font-medium leading-relaxed">Join us to access member-only vouchers, track your retail delivery courier status, and enjoy express checkout.</p>
          </div>

          <div className="text-[10px] text-blue-300/80 font-bold relative z-10 mt-12">
            © 2026 PVRS 99StoreHub. AP, India.
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION FORM */}
        <main className="md:col-span-7 p-8 sm:p-10 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold text-[#0B1F5C] tracking-tight">Get Started!</h1>
            <p className="text-xs font-semibold text-gray-400">Fill out your details to join PVRS 99StoreHub.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                />
              </div>
            </div>

            {/* Email address */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit number"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Choose Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs shadow-md shadow-blue-900/5 hover:-translate-y-0.5 active:scale-95 transition-all select-none cursor-pointer mt-2"
            >
              Register Account
              <FiArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Social credentials */}
          <div className="space-y-4 select-none">
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-350 tracking-wider">
              <div className="flex-1 h-px bg-gray-100" />
              <span>OR JOIN WITH</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => showToast('Google auth pending integration.', 'info')}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-500 transition-colors active:scale-98"
              >
                <FaGoogle className="w-3.5 h-3.5 text-rose-500" />
                Google
              </button>
              <button
                onClick={() => showToast('Facebook auth pending integration.', 'info')}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-500 transition-colors active:scale-98"
              >
                <FaFacebook className="w-3.5 h-3.5 text-blue-600" />
                Facebook
              </button>
            </div>
          </div>

          <p className="text-center text-xs font-semibold text-gray-400 select-none">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF7A00] font-bold hover:underline">
              Log In Now
            </Link>
          </p>

        </main>

      </div>
    </div>
  );
}
