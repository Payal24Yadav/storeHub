import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiSend, FiCheckCircle } from 'react-icons/fi';
import { showToast } from '../components/Toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address!', 'error');
      return;
    }
    showToast('Sending recovery link...', 'info');
    setTimeout(() => {
      setSubmitted(true);
      showToast('Recovery link sent! Please check your inbox.', 'success');
    }, 1200);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white border border-gray-150/40 shadow-[0_12px_45px_rgba(11,31,92,0.04)] space-y-6">
        
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F5C]/60 hover:text-[#FF7A00] transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-[#0B1F5C] tracking-tight">Reset Password</h1>
              <p className="text-xs font-semibold text-gray-400">
                Enter your registered email address to receive password recovery details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs shadow-md shadow-blue-900/5 hover:-translate-y-0.5 active:scale-95 transition-all select-none cursor-pointer"
              >
                <FiSend className="w-4 h-4" />
                Send Recovery Link
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <FiCheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#0B1F5C] tracking-tight">Recovery Email Sent!</h2>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                We have dispatched password recovery instructions to <strong className="text-[#0B1F5C]">{email}</strong>. Please check your inbox and spam folder.
              </p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 rounded-xl border border-gray-200 hover:border-[#FF7A00]/25 text-[#0B1F5C] hover:bg-orange-50/20 font-bold text-xs transition-all active:scale-98"
            >
              Resend recovery mail
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
