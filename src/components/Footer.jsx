import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const footerLinks = {
  Shop: [
    { label: 'Stationery', path: '/category/stationery' },
    { label: 'Home Care', path: '/category/home-care' },
    { label: 'Home Essentials', path: '/category/home-essentials' },
    { label: 'Snacks', path: '/category/snacks' },
    { label: 'Lights & Electricals', path: '/category/lights-electricals' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/about' },
    { label: 'Blog', path: '/' },
  ],
  Support: [
    { label: 'FAQ', path: '/contact' },
    { label: 'Shipping Policy', path: '/contact' },
    { label: 'Return Policy', path: '/contact' },
    { label: 'Track Order', path: '/dashboard' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0B1F5C] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black mb-1">Stay in the Loop! 🎉</h3>
              <p className="text-blue-200 text-sm">Get exclusive offers, new arrivals and deals delivered to your inbox.</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 outline-none focus:border-[#FF7A00] transition-colors text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FFC107] rounded-xl font-bold text-sm whitespace-nowrap shadow-lg shadow-orange-500/30"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 inline-block">
              <img 
                src="/logo.png" 
                alt="99 Store Hub Logo" 
                className="h-12 w-auto max-h-14 object-contain"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&q=80"; // fallback
                }}
              />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Your one-stop destination for stationery, home essentials, snacks, lights and electronics — all under one roof at unbeatable prices.
            </p>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>PVRS 99StoreHub, Vijayawada, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-[#FF7A00]" />
                <a href="tel:+919999999999" className="hover:text-white transition-colors">+91 99999 99999</a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-[#FF7A00]" />
                <a href="mailto:info@pvrs99storehub.com" className="hover:text-white transition-colors">info@pvrs99storehub.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: FiFacebook, href: '#' },
                { icon: FiInstagram, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiYoutube, href: '#' },
                { icon: FaWhatsapp, href: 'https://wa.me/919999999999' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#FF7A00] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#FFC107] mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-blue-200 text-sm hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-200 text-xs">
            99 storehub copyright@2026. All rights reserved. design and developed by{' '}
            <a 
              href="https://novarsistech.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold hover:text-[#FF7A00] transition-colors inline-block"
            >
              Novarsistechs pvt ltd
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs text-blue-200">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
