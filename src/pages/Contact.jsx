import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { showToast } from '../components/Toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out the required fields!', 'error');
      return;
    }
    showToast('Sending message...', 'info');
    setTimeout(() => {
      showToast('Message sent successfully! We will contact you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-20 mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header Info */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-black text-[#FF7A00] tracking-widest">Connect with us</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F5C] leading-tight">
          How can we Help You?
        </h1>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">
          Have an inquiry about bulk orders, custom retail packages, or delivery logs? Get in touch with our helpdesk.
        </p>
      </section>

      {/* Main Split Layout: Cards & messaging form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE INFORMATION CARDS */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Support Phone */}
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF7A00] flex-shrink-0 shadow-inner">
              <FiPhone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase">Call support</div>
              <div className="font-extrabold text-sm text-[#0B1F5C]">+91 99999 99999</div>
            </div>
          </div>

          {/* Support Email */}
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0B1F5C] flex-shrink-0 shadow-inner">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase">Email helpdesk</div>
              <div className="font-extrabold text-sm text-[#0B1F5C]">support@pvrs99storehub.com</div>
            </div>
          </div>

          {/* Local Address */}
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF7A00] flex-shrink-0 shadow-inner">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase">Store address</div>
              <div className="font-extrabold text-sm text-[#0B1F5C]">Main retail center, Vijayawada, AP</div>
            </div>
          </div>

          {/* Store timings */}
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0B1F5C] flex-shrink-0 shadow-inner">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-black uppercase">Helpdesk Hours</div>
              <div className="font-extrabold text-sm text-[#0B1F5C]">9:00 AM - 9:00 PM (Daily)</div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MESSAGING CONTACT FORM */}
        <main className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
          <h2 className="font-black text-lg text-[#0B1F5C] pb-3 border-b border-gray-50">
            Send us a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-gray-400">Subject</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Bulk order inquiry, etc."
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-gray-400">Your Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Type your message details here..."
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-black text-sm transition-colors mt-4 select-none cursor-pointer"
            >
              <FiSend className="w-4 h-4" />
              Submit message
            </button>
          </form>
        </main>

      </section>

      {/* WhatsApp banner CTA */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm max-w-4xl mx-auto select-none">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="font-black text-[#0B1F5C] text-lg">Instant WhatsApp Chat support</h3>
          <p className="text-xs text-gray-500 font-semibold max-w-md leading-relaxed">Skip messaging forms! Reach directly to our live chat representative on WhatsApp.</p>
        </div>
        <a
          href="https://wa.me/919999999999?text=Hi%20PVRS%2099StoreHub%2C%20I%20have%20an%20inquiry!"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-500/10 transition-colors"
        >
          <FaWhatsapp className="w-4.5 h-4.5" />
          Chat Now
        </a>
      </section>

    </div>
  );
}
