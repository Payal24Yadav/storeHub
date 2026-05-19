import { useState, useMemo } from 'react';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign, FiPlus, FiTrash2, FiSearch, FiX, FiCheckCircle } from 'react-icons/fi';
import { products, categories } from '../data/products';
import { showToast } from '../components/Toast';
import ImageWithFallback from '../components/ImageWithFallback';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState(products);

  // Modal State for Add Product
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'stationery',
    price: '',
    originalPrice: '',
    badge: '',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=80',
  });

  // KPI Calculations
  const totalSales = useMemo(() => {
    return productList.reduce((acc, item) => acc + item.price * 25, 0); // Mock 25 sales per item
  }, [productList]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productList;
    return productList.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productList, searchQuery]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill out required fields!', 'error');
      return;
    }

    const id = productList.length + 1;
    const slug = newProduct.name.toLowerCase().replace(/ /g, '-');
    const createdItem = {
      id,
      slug,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      badge: newProduct.badge,
      image: newProduct.image,
      rating: 5,
      reviews: 0,
    };

    setProductList([createdItem, ...productList]);
    setModalOpen(false);
    setNewProduct({
      name: '',
      category: 'stationery',
      price: '',
      originalPrice: '',
      badge: '',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=300&q=80',
    });
    showToast(`Added ${createdItem.name} to Catalog!`, 'success');
  };

  const handleDeleteProduct = (id, name) => {
    setProductList(productList.filter((p) => p.id !== id));
    showToast(`Deleted ${name} successfully`, 'info');
  };

  return (
    <div className="min-h-screen pb-20 p-4 sm:p-6 lg:p-8 space-y-8 bg-[#fcfbfc] max-w-7xl mx-auto">
      
      {/* Header with Title and Quick Add Button */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0B1F5C] leading-none">Admin Store Control</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1.5">Perform catalog audits and oversee key store metrics.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-xs shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all select-none cursor-pointer"
        >
          <FiPlus className="w-4.5 h-4.5" />
          Add New Product
        </button>
      </section>

      {/* ─── KPI STATISTICS METRICS GRIDS ─── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 select-none">
        
        {/* KPI 1 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Estimated Sales</span>
            <span className="text-xl sm:text-2xl font-black text-[#0B1F5C]">₹{totalSales}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner flex-shrink-0">
            <FiDollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Active Products</span>
            <span className="text-xl sm:text-2xl font-black text-[#0B1F5C]">{productList.length}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner flex-shrink-0">
            <FiShoppingBag className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Orders Count</span>
            <span className="text-xl sm:text-2xl font-black text-[#0B1F5C]">{productList.length * 3}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF7A00] flex items-center justify-center shadow-inner flex-shrink-0">
            <FiTrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Total Users</span>
            <span className="text-xl sm:text-2xl font-black text-[#0B1F5C]">1,450</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shadow-inner flex-shrink-0">
            <FiUsers className="w-5 h-5" />
          </div>
        </div>

      </section>

      {/* ─── CATALOG AUDIT & TABLE DIRECTORY ─── */}
      <section className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
        
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-50">
          <h2 className="font-black text-lg text-[#0B1F5C]">Catalog Products Directory</h2>
          
          <div className="relative w-full sm:max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
            />
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500 border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-black uppercase tracking-wider">
                <th className="py-4 px-4">Item Details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Pricing Price</th>
                <th className="py-4 px-4">Badges</th>
                <th className="py-4 px-4 text-right">Audits Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100 flex-shrink-0">
                      <ImageWithFallback 
                        src={p.image} 
                        alt={p.name} 
                        containerClassName="w-full h-full bg-transparent"
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-[#0B1F5C] leading-snug line-clamp-1">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold">Slug: {p.slug}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 capitalize font-bold text-[#0B1F5C]/80">{p.category}</td>
                  <td className="py-4 px-4 font-black text-[#0B1F5C]">₹{p.price}</td>
                  <td className="py-4 px-4">
                    {p.badge ? (
                      <span className="px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-orange-50 text-[#FF7A00] tracking-wider">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      className="p-2 rounded-xl hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors"
                      title="Delete Product"
                    >
                      <FiTrash2 className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* ─── ADD NEW PRODUCT MODAL DIALOG ─── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(11,31,92,0.12)] border border-gray-100 overflow-hidden space-y-6 p-6"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="font-black text-lg text-[#0B1F5C]">Add New Catalog Item</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-650"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-gray-400">Product Name *</label>
                <input
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Executive Diary"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-400">Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-black text-[#0B1F5C]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-400">Promo Badge</label>
                  <input
                    name="badge"
                    value={newProduct.badge}
                    onChange={handleInputChange}
                    placeholder="e.g. Sale, New, Bogo"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-400">Sales Price (₹) *</label>
                  <input
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="99"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-400">Original Price (₹)</label>
                  <input
                    name="originalPrice"
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={handleInputChange}
                    placeholder="150"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-transparent focus:border-[#FF7A00]/25 outline-none text-xs font-semibold text-[#0B1F5C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#0B1F5C] hover:bg-[#FF7A00] text-white font-black text-sm shadow-xl shadow-blue-900/5 transition-all select-none cursor-pointer mt-2"
              >
                Publish Product to Live Catalog
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
