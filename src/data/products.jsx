import { FiEdit2, FiHome, FiCoffee, FiZap, FiSmartphone } from 'react-icons/fi';
import { MdOutlineCleaningServices } from 'react-icons/md';

export const categories = [
  { id: 1, name: 'Stationery', slug: 'stationery', icon: <FiEdit2 />, color: '#0B1F5C', bgGradient: 'from-blue-900 to-blue-700', count: 120, description: 'Pens, notebooks, files & more' },
  { id: 2, name: 'Home Care', slug: 'home-care', icon: <MdOutlineCleaningServices />, color: '#FF7A00', bgGradient: 'from-orange-600 to-amber-500', count: 85, description: 'Cleaning & hygiene essentials' },
  { id: 3, name: 'Home Essentials', slug: 'home-essentials', icon: <FiHome />, color: '#FFC107', bgGradient: 'from-yellow-500 to-yellow-400', count: 95, description: 'Kitchen, storage & daily needs' },
  { id: 4, name: 'Snacks', slug: 'snacks', icon: <FiCoffee />, color: '#e11d48', bgGradient: 'from-rose-600 to-pink-500', count: 200, description: 'Chips, chocolates, beverages & more' },
  { id: 5, name: 'Lights & Electricals', slug: 'lights-electricals', icon: <FiZap />, color: '#f59e0b', bgGradient: 'from-amber-400 to-yellow-300', count: 60, description: 'LED lights, bulbs, electricals' },
  { id: 6, name: 'Electronics', slug: 'electronics', icon: <FiSmartphone />, color: '#6366f1', bgGradient: 'from-indigo-600 to-purple-500', count: 45, description: 'Gadgets, accessories & cables' },
];

export const products = [
  // Stationery
  { id: 1, name: 'Premium Ball Pen Set (10 Pack)', category: 'stationery', slug: 'premium-ball-pen-set', price: 99, originalPrice: 149, rating: 4.5, reviews: 128, stock: 50, badge: 'bestseller', tags: ['pen', 'writing', 'stationery'], image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80', description: 'Smooth writing experience with these premium ball pens. Perfect for office and school use.', featured: true, trending: true },
  { id: 2, name: 'A4 Ruled Notebook 200 Pages', category: 'stationery', slug: 'a4-ruled-notebook', price: 45, originalPrice: 60, rating: 4.3, reviews: 89, stock: 150, badge: 'new', tags: ['notebook', 'writing'], image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', description: 'High-quality ruled notebook with 200 pages. Perfect for students and professionals.', featured: false, trending: true },
  { id: 3, name: 'Geometry Box Complete Set', category: 'stationery', slug: 'geometry-box-set', price: 120, originalPrice: 160, rating: 4.6, reviews: 210, stock: 80, badge: 'sale', tags: ['geometry', 'math', 'school'], image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', description: 'Complete geometry set with compass, protractor, set squares and ruler.', featured: true, trending: false },
  { id: 4, name: 'Sticky Notes 5-Color Pack', category: 'stationery', slug: 'sticky-notes-5-color', price: 35, originalPrice: 50, rating: 4.2, reviews: 67, stock: 200, badge: null, tags: ['sticky notes', 'office'], image: 'https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400&q=80', description: 'Colorful sticky notes for organizing your thoughts and reminders.', featured: false, trending: false },

  // Home Care
  { id: 5, name: 'Liquid Floor Cleaner 1L', category: 'home-care', slug: 'liquid-floor-cleaner', price: 89, originalPrice: 120, rating: 4.4, reviews: 156, stock: 100, badge: 'sale', tags: ['cleaner', 'floor', 'hygiene'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Powerful floor cleaner with fresh fragrance. Kills 99.9% germs.', featured: true, trending: false },
  { id: 6, name: 'Dish Wash Bar 200g', category: 'home-care', slug: 'dish-wash-bar', price: 22, originalPrice: 30, rating: 4.1, reviews: 245, stock: 300, badge: null, tags: ['dish', 'cleaning'], image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80', description: 'Effective dish wash bar that removes tough grease and stains.', featured: false, trending: true },
  { id: 7, name: 'Microfiber Cleaning Cloth (Pack of 6)', category: 'home-care', slug: 'microfiber-cleaning-cloth', price: 149, originalPrice: 199, rating: 4.7, reviews: 98, stock: 75, badge: 'bestseller', tags: ['microfiber', 'cleaning'], image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=400&q=80', description: 'Ultra-soft microfiber cloths for streak-free cleaning of all surfaces.', featured: true, trending: true },

  // Home Essentials
  { id: 8, name: 'Stainless Steel Lunch Box 3-Tier', category: 'home-essentials', slug: 'stainless-steel-lunch-box', price: 299, originalPrice: 450, rating: 4.8, reviews: 312, stock: 60, badge: 'trending', tags: ['lunchbox', 'kitchen', 'steel'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', description: 'Premium stainless steel lunch box with 3 compartments. Leak-proof and durable.', featured: true, trending: true },
  { id: 9, name: 'Plastic Storage Container Set (5pcs)', category: 'home-essentials', slug: 'plastic-storage-containers', price: 199, originalPrice: 280, rating: 4.3, reviews: 178, stock: 90, badge: null, tags: ['storage', 'container', 'kitchen'], image: 'https://images.unsplash.com/photo-1583845112203-29329902332e?w=400&q=80', description: 'Airtight plastic containers perfect for storing dry food items and spices.', featured: false, trending: false },
  { id: 10, name: 'Non-Stick Frying Pan 24cm', category: 'home-essentials', slug: 'non-stick-frying-pan', price: 349, originalPrice: 499, rating: 4.6, reviews: 201, stock: 45, badge: 'sale', tags: ['pan', 'cookware', 'kitchen'], image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', description: 'High-quality non-stick frying pan with heat-resistant handle.', featured: true, trending: false },

  // Snacks
  { id: 11, name: 'Assorted Biscuits Gift Pack', category: 'snacks', slug: 'assorted-biscuits-gift-pack', price: 180, originalPrice: 220, rating: 4.5, reviews: 456, stock: 200, badge: 'bestseller', tags: ['biscuits', 'snacks', 'gift'], image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', description: 'Premium assorted biscuit gift pack. Perfect for gifting and snacking.', featured: true, trending: true },
  { id: 12, name: 'Mixed Dry Fruits 500g', category: 'snacks', slug: 'mixed-dry-fruits', price: 350, originalPrice: 450, rating: 4.7, reviews: 389, stock: 80, badge: 'premium', tags: ['dry fruits', 'healthy', 'snacks'], image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&q=80', description: 'Premium mixed dry fruits including cashews, almonds, raisins and pistachios.', featured: true, trending: true },
  { id: 13, name: 'Instant Noodles 12-Pack', category: 'snacks', slug: 'instant-noodles-12-pack', price: 120, originalPrice: 144, rating: 4.2, reviews: 567, stock: 500, badge: null, tags: ['noodles', 'instant', 'snacks'], image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', description: 'Delicious instant noodles in various flavors. Ready in 2 minutes.', featured: false, trending: true },

  // Lights & Electricals
  { id: 14, name: '12W LED Bulb (Pack of 4)', category: 'lights-electricals', slug: '12w-led-bulb-pack', price: 199, originalPrice: 280, rating: 4.6, reviews: 234, stock: 120, badge: 'trending', tags: ['led', 'bulb', 'lighting'], image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80', description: 'Energy-efficient 12W LED bulbs. Long life of 25,000 hours. Pure white light.', featured: true, trending: true },
  { id: 15, name: 'Decorative String Lights 10m', category: 'lights-electricals', slug: 'decorative-string-lights', price: 249, originalPrice: 399, rating: 4.8, reviews: 312, stock: 75, badge: 'sale', tags: ['fairy lights', 'decoration', 'lights'], image: 'https://images.unsplash.com/photo-1510120163074-01cd7e87bd0f?w=400&q=80', description: 'Beautiful warm white string lights for room decoration. Waterproof and durable.', featured: true, trending: true },
  { id: 16, name: 'Extension Board 4-Socket with USB', category: 'lights-electricals', slug: 'extension-board-4-socket', price: 349, originalPrice: 499, rating: 4.5, reviews: 178, stock: 55, badge: null, tags: ['extension', 'socket', 'electrical'], image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', description: '4-socket extension board with 2 USB ports and surge protection.', featured: false, trending: false },

  // Electronics
  { id: 17, name: 'USB-C Data Cable 1m', category: 'electronics', slug: 'usb-c-data-cable', price: 149, originalPrice: 250, rating: 4.4, reviews: 456, stock: 200, badge: 'bestseller', tags: ['cable', 'usb', 'charging'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Fast charging USB-C cable with braided nylon coating. Supports 65W charging.', featured: true, trending: true },
  { id: 18, name: 'Wireless Earbuds TWS', category: 'electronics', slug: 'wireless-earbuds-tws', price: 799, originalPrice: 1299, rating: 4.6, reviews: 289, stock: 40, badge: 'hot', tags: ['earbuds', 'wireless', 'audio'], image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', description: 'True wireless earbuds with 6 hours battery life and charging case.', featured: true, trending: true },
  { id: 19, name: 'Portable Power Bank 10000mAh', category: 'electronics', slug: 'power-bank-10000mah', price: 699, originalPrice: 999, rating: 4.7, reviews: 412, stock: 65, badge: 'sale', tags: ['powerbank', 'charging', 'portable'], image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80', description: 'Slim 10000mAh power bank with fast charging and dual USB output.', featured: true, trending: false },
  { id: 20, name: 'Mobile Phone Stand Adjustable', category: 'electronics', slug: 'mobile-phone-stand', price: 199, originalPrice: 299, rating: 4.3, reviews: 187, stock: 100, badge: 'new', tags: ['stand', 'mobile', 'accessories'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', description: 'Universal adjustable phone stand for desk. Compatible with all smartphones.', featured: false, trending: false },
];

export const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'Vijayawada', rating: 5, review: 'PVRS 99StoreHub is my go-to store for everything! From stationery to snacks, they have it all at great prices. The quality is amazing!', avatar: 'PS', date: '2 weeks ago' },
  { id: 2, name: 'Ravi Kumar', location: 'Guntur', rating: 5, review: 'The LED lights I bought here are fantastic. Great quality and amazing prices. The staff is very helpful too!', avatar: 'RK', date: '1 month ago' },
  { id: 3, name: 'Anitha Reddy', location: 'Vijayawada', rating: 4, review: 'Love shopping here! Got all my home essentials in one place. Fast delivery and excellent packaging.', avatar: 'AR', date: '3 weeks ago' },
  { id: 4, name: 'Suresh Babu', location: 'Krishna District', rating: 5, review: 'Best retail store in the area! Wide variety of products at unbeatable prices. Highly recommended!', avatar: 'SB', date: '5 days ago' },
  { id: 5, name: 'Lakshmi Devi', location: 'Vijayawada', rating: 4, review: 'Amazing collection of stationery products. My kids love the school supplies from here. Will definitely shop again!', avatar: 'LD', date: '2 months ago' },
];

export const heroSlides = [
  {
    id: 1,
    title: 'Everything You Need',
    subtitle: 'Under One Roof',
    description: 'From stationery to home essentials, lights to snacks — find it all at PVRS 99StoreHub',
    cta: 'Shop Now',
    ctaLink: '/shop',
    badge: '₹99 Store',
    bgColor: 'from-[#0B1F5C] via-[#1a3a8f] to-[#0d2b7a]',
  },
  {
    id: 2,
    title: 'Power & LightHub',
    subtitle: 'Illuminate Your World',
    description: 'Premium LED lights, decorative strings, and electrical essentials at unbeatable prices',
    cta: 'Explore Lights',
    ctaLink: '/category/lights-electricals',
    badge: 'New Arrivals',
    bgColor: 'from-[#1a0533] via-[#4a1a6e] to-[#0B1F5C]',
  },
  {
    id: 3,
    title: 'Snacks & Beverages',
    subtitle: 'Taste the Goodness',
    description: 'Explore our wide collection of premium snacks, chocolates, and beverages',
    cta: 'View Snacks',
    ctaLink: '/category/snacks',
    badge: 'Hot Deals',
    bgColor: 'from-[#7f1d1d] via-[#b91c1c] to-[#9f1239]',
  },
];

import { FiBookOpen, FiGift } from 'react-icons/fi';

export const banners = [
  { id: 1, title: 'Back to School Sale', subtitle: 'Up to 40% off on Stationery', cta: 'Shop Now', link: '/category/stationery', bg: 'from-blue-900 to-indigo-700', icon: <FiBookOpen /> },
  { id: 2, title: 'Festival Season Sale', subtitle: 'Lights, snacks & gifts for every occasion', cta: 'Explore', link: '/shop', bg: 'from-orange-600 to-amber-500', icon: <FiGift /> },
];
