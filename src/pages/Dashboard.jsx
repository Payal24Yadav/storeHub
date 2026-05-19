import { useState } from 'react';
import { FiPackage, FiHeart, FiMapPin, FiSettings, FiLogOut, FiUser, FiEdit2, FiChevronRight } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../components/Toast';

export default function Dashboard() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Member profile state
  const [profile, setProfile] = useState({
    name: 'Payal Patel',
    email: 'payal@example.com',
    phone: '+91 99999 99999',
    city: 'Vijayawada',
  });

  // Mock Orders History logs
  const orders = [
    { id: '109823', date: 'May 14, 2026', total: 450, status: 'Delivered', items: 'A4 Notebook (x3), Ball Pen Set (x2)' },
    { id: '109405', date: 'May 10, 2026', total: 199, status: 'Delivered', items: '12W LED Bulbs Pack' },
    { id: '109012', date: 'May 05, 2026', total: 698, status: 'Processing', items: 'Non-Stick Frying Pan' },
  ];

  const handleLogout = () => {
    showToast('Logging out...', 'info');
    setTimeout(() => {
      showToast('Logged out successfully!', 'success');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-20 pt-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Info Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1F5C] to-blue-950 p-8 text-white shadow-xl shadow-blue-950/5">
        <div className="absolute inset-0 bg-radial-gradient(at 100% 0%, rgba(255,122,0,0.15), transparent 50%) pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(at 0% 100%, rgba(255,193,7,0.08), transparent 50%) pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FFC107] text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-orange-500/20 select-none">
              {profile.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC107]">Dashboard</span>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight">{profile.name}</h1>
              <p className="text-xs text-blue-200 font-medium">PVRS Member since 2024</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 self-start sm:self-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-rose-500 text-white hover:text-white font-bold text-xs transition-all duration-300 border border-white/10 hover:border-transparent active:scale-95 shadow-lg shadow-black/5"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </section>

      {/* Split columns layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: TABS CONTROLS SIDEBAR */}
        <aside className="lg:col-span-3 p-4 rounded-3xl bg-white border border-gray-150/40 shadow-sm space-y-1.5 select-none">
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 ${
              activeTab === 'orders' 
                ? 'bg-[#0B1F5C] text-white shadow-lg shadow-blue-950/15' 
                : 'text-[#0B1F5C]/80 hover:bg-gray-50 hover:text-[#0B1F5C]'
            }`}
          >
            <FiPackage className="w-4 h-4" />
            My Orders
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'bg-[#0B1F5C] text-white shadow-lg shadow-blue-950/15' 
                : 'text-[#0B1F5C]/80 hover:bg-gray-50 hover:text-[#0B1F5C]'
            }`}
          >
            <FiUser className="w-4 h-4" />
            Edit Profile
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 ${
              activeTab === 'addresses' 
                ? 'bg-[#0B1F5C] text-white shadow-lg shadow-blue-950/15' 
                : 'text-[#0B1F5C]/80 hover:bg-gray-50 hover:text-[#0B1F5C]'
            }`}
          >
            <FiMapPin className="w-4 h-4" />
            Addresses
          </button>

          <button
            onClick={() => navigate('/wishlist')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs text-[#0B1F5C]/80 hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <FiHeart className="w-4 h-4" />
              Wishlist
            </span>
            <span className="text-[10px] font-bold text-[#FF7A00] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">{wishlist.length}</span>
          </button>

        </aside>

        {/* RIGHT COLUMN: ACTIVE TAB CONTENT */}
        <main className="lg:col-span-9 p-6 md:p-8 rounded-3xl bg-white border border-gray-150/40 shadow-sm space-y-6">
          
          {/* ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] pb-3 border-b border-gray-100">
                Order History Logs
              </h2>
              
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all duration-300 space-y-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B1F5C]">#PVRS-{o.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                          o.status === 'Delivered' ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200/50' : 'bg-orange-100/70 text-orange-800 border border-orange-200/50'
                        }`}>
                          {o.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold">{o.date}</p>
                      <p className="text-xs text-gray-500 font-semibold leading-tight mt-1">{o.items}</p>
                    </div>

                    <div className="text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 sm:gap-1.5">
                      <span className="text-base font-extrabold text-[#0B1F5C]">₹{o.total}</span>
                      <button className="text-[10px] font-extrabold text-[#FF7A00] hover:text-[#0B1F5C] flex items-center gap-0.5 transition-colors">
                        Track Order
                        <FiChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE EDIT */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] pb-3 border-b border-gray-100">
                Member Profile Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Name</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
                  <input
                    readOnly
                    value={profile.email}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 outline-none text-xs font-semibold text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone</label>
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">City Location</label>
                  <input
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FF7A00]/40 focus:bg-white focus:ring-2 focus:ring-[#FF7A00]/10 outline-none text-xs font-semibold text-[#0B1F5C] transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('Profile details updated successfully!', 'success')}
                className="px-6 py-3.5 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-bold text-xs transition-all duration-300 shadow-md shadow-blue-950/5 active:scale-95 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h2 className="font-extrabold text-lg text-[#0B1F5C] pb-3 border-b border-gray-100">
                Delivery Address Directory
              </h2>

              <div className="p-6 rounded-2xl border border-gray-200 relative bg-gray-50/20 hover:border-gray-300 transition-colors">
                <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 border border-emerald-200/45 px-2.5 py-1 rounded-lg">
                  Default Address
                </span>
                <div className="space-y-2.5 text-xs font-medium text-gray-500">
                  <div className="font-extrabold text-sm text-[#0B1F5C]">{profile.name}</div>
                  <div><span className="font-bold text-[#0B1F5C]">Phone:</span> {profile.phone}</div>
                  <div><span className="font-bold text-[#0B1F5C]">Address:</span> Main road residency, Vijayawada - 520001</div>
                </div>
                <button
                  onClick={() => showToast('Address editing pending integration.', 'info')}
                  className="mt-5 flex items-center gap-1 font-bold text-[10px] text-[#FF7A00] hover:text-[#0B1F5C] transition-colors"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                  Edit Address Details
                </button>
              </div>
            </div>
          )}

        </main>

      </section>

    </div>
  );
}
