import type { Product, Category, Brand, Order, Review, PromoBanner, FlashDeal } from '@/types';

// ============================================
// Mock Data for TechStore
// ============================================
// This file contains all mock data for the e-commerce frontend.
// Each section includes comments explaining how to replace with real API calls.
//
// General Pattern for Backend Integration:
// ```typescript
// // Instead of importing from mockData:
// import { products } from '@/data/mockData';
//
// // Use React Query or similar:
// const { data: products } = useQuery(['products'], () => 
//   fetch('/api/products').then(res => res.json())
// );
// ```

// ============================================
// Categories
// ============================================
// TODO: Replace with: const { data: categories } = useQuery(['categories'], fetchCategories);

export const categories: Category[] = [
  {
    id: 'cat_1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones from top brands',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    icon: 'Smartphone',
    subcategories: [
      { id: 'sub_1_1', name: 'Android', slug: 'android', productCount: 24 },
      { id: 'sub_1_2', name: 'iOS', slug: 'ios', productCount: 12 },
      { id: 'sub_1_3', name: 'Foldable', slug: 'foldable', productCount: 6 },
    ],
    productCount: 42,
    featured: true,
  },
  {
    id: 'cat_2',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Powerful laptops for work and gaming',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    icon: 'Laptop',
    subcategories: [
      { id: 'sub_2_1', name: 'Gaming', slug: 'gaming-laptops', productCount: 18 },
      { id: 'sub_2_2', name: 'Business', slug: 'business-laptops', productCount: 15 },
      { id: 'sub_2_3', name: 'Ultrabooks', slug: 'ultrabooks', productCount: 12 },
    ],
    productCount: 45,
    featured: true,
  },
  {
    id: 'cat_3',
    name: 'Audio',
    slug: 'audio',
    description: 'Premium audio equipment',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    icon: 'Headphones',
    subcategories: [
      { id: 'sub_3_1', name: 'Headphones', slug: 'headphones', productCount: 28 },
      { id: 'sub_3_2', name: 'Earbuds', slug: 'earbuds', productCount: 22 },
      { id: 'sub_3_3', name: 'Speakers', slug: 'speakers', productCount: 15 },
    ],
    productCount: 65,
    featured: true,
  },
  {
    id: 'cat_4',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming consoles and accessories',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
    icon: 'Gamepad2',
    subcategories: [
      { id: 'sub_4_1', name: 'Consoles', slug: 'consoles', productCount: 8 },
      { id: 'sub_4_2', name: 'Controllers', slug: 'controllers', productCount: 20 },
      { id: 'sub_4_3', name: 'Gaming Chairs', slug: 'gaming-chairs', productCount: 12 },
    ],
    productCount: 40,
    featured: true,
  },
  {
    id: 'cat_5',
    name: 'Wearables',
    slug: 'wearables',
    description: 'Smartwatches and fitness trackers',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    icon: 'Watch',
    subcategories: [
      { id: 'sub_5_1', name: 'Smartwatches', slug: 'smartwatches', productCount: 18 },
      { id: 'sub_5_2', name: 'Fitness Trackers', slug: 'fitness-trackers', productCount: 12 },
    ],
    productCount: 30,
    featured: false,
  },
  {
    id: 'cat_6',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential tech accessories',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    icon: 'Cable',
    subcategories: [
      { id: 'sub_6_1', name: 'Chargers', slug: 'chargers', productCount: 25 },
      { id: 'sub_6_2', name: 'Cases', slug: 'cases', productCount: 40 },
      { id: 'sub_6_3', name: 'Cables', slug: 'cables', productCount: 30 },
    ],
    productCount: 95,
    featured: false,
  },
];

// ============================================
// Brands
// ============================================
// TODO: Replace with: const { data: brands } = useQuery(['brands'], fetchBrands);

export const brands: Brand[] = [
  { id: 'brand_1', name: 'Apple', slug: 'apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', productCount: 45 },
  { id: 'brand_2', name: 'Samsung', slug: 'samsung', logo: 'https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?w=100&h=50&fit=crop', productCount: 52 },
  { id: 'brand_3', name: 'Sony', slug: 'sony', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=50&fit=crop', productCount: 38 },
  { id: 'brand_4', name: 'Microsoft', slug: 'microsoft', logo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=50&fit=crop', productCount: 28 },
  { id: 'brand_5', name: 'Dell', slug: 'dell', logo: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&h=50&fit=crop', productCount: 22 },
  { id: 'brand_6', name: 'Bose', slug: 'bose', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=50&fit=crop', productCount: 18 },
];

// ============================================
// Products
// ============================================
// TODO: Replace with API calls:
// - All products: useQuery(['products'], fetchProducts)
// - By category: useQuery(['products', categorySlug], () => fetchProductsByCategory(categorySlug))
// - Single product: useQuery(['product', productId], () => fetchProduct(productId))
// - Search: useQuery(['products', 'search', query], () => searchProducts(query))

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'The most powerful iPhone ever. Featuring the A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    shortDescription: 'Pro. Beyond. 6.7" Super Retina XDR display with ProMotion.',
    price: 1199,
    originalPrice: 1299,
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
    ],
    category: 'smartphones',
    subcategory: 'ios',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 2847,
    stock: 45,
    specs: [
      { name: 'Display', value: '6.7" Super Retina XDR' },
      { name: 'Chip', value: 'A17 Pro' },
      { name: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP Telephoto' },
      { name: 'Battery', value: 'Up to 29 hours video playback' },
      { name: 'Storage', value: '256GB / 512GB / 1TB' },
    ],
    variants: [
      { id: 'var_1_1', name: 'Natural Titanium', color: 'Natural Titanium', colorHex: '#8B8680', storage: '256GB', price: 1199, stock: 15 },
      { id: 'var_1_2', name: 'Blue Titanium', color: 'Blue Titanium', colorHex: '#3B4A5C', storage: '256GB', price: 1199, stock: 12 },
      { id: 'var_1_3', name: 'White Titanium', color: 'White Titanium', colorHex: '#F0EDE8', storage: '512GB', price: 1399, stock: 8 },
      { id: 'var_1_4', name: 'Black Titanium', color: 'Black Titanium', colorHex: '#3C3C3C', storage: '1TB', price: 1599, stock: 10 },
    ],
    tags: ['bestseller', '5g', 'pro'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-09-15T00:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 200MP camera. It\'s an icons Icons icons icons.',
    shortDescription: 'Galaxy AI is here. 200MP camera. S Pen included.',
    price: 1299,
    originalPrice: 1399,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop',
    ],
    category: 'smartphones',
    subcategory: 'android',
    brand: 'Samsung',
    rating: 4.8,
    reviewCount: 1923,
    stock: 38,
    specs: [
      { name: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { name: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { name: 'Camera', value: '200MP Main + 12MP Ultra Wide + 50MP Telephoto' },
      { name: 'Battery', value: '5000mAh' },
      { name: 'Storage', value: '256GB / 512GB / 1TB' },
    ],
    tags: ['5g', 'ai', 's-pen'],
    featured: true,
    bestSeller: true,
    newArrival: true,
    createdAt: '2024-01-17T00:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    description: 'The most powerful MacBook Pro ever with the M3 Max chip. Up to 22 hours of battery life and a stunning Liquid Retina XDR display.',
    shortDescription: 'Supercharged for pros. M3 Max chip with up to 128GB unified memory.',
    price: 3499,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop',
    ],
    category: 'laptops',
    subcategory: 'ultrabooks',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 856,
    stock: 12,
    specs: [
      { name: 'Display', value: '16.2" Liquid Retina XDR' },
      { name: 'Chip', value: 'Apple M3 Max' },
      { name: 'Memory', value: 'Up to 128GB unified memory' },
      { name: 'Storage', value: 'Up to 8TB SSD' },
      { name: 'Battery', value: 'Up to 22 hours' },
    ],
    tags: ['pro', 'creator', 'm3'],
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-10-30T00:00:00Z',
  },
  {
    id: 'prod_4',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation with Auto NC Optimizer. Exceptional sound quality with LDAC. Up to 30 hours battery life.',
    shortDescription: 'Industry-leading noise canceling headphones.',
    price: 349,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    ],
    category: 'audio',
    subcategory: 'headphones',
    brand: 'Sony',
    rating: 4.8,
    reviewCount: 3421,
    stock: 67,
    specs: [
      { name: 'Type', value: 'Over-ear, Wireless' },
      { name: 'Driver Size', value: '30mm' },
      { name: 'Noise Cancellation', value: 'Active (Auto NC Optimizer)' },
      { name: 'Battery', value: 'Up to 30 hours' },
      { name: 'Connectivity', value: 'Bluetooth 5.2, LDAC' },
    ],
    variants: [
      { id: 'var_4_1', name: 'Black', color: 'Black', colorHex: '#1C1C1C', price: 349, stock: 35 },
      { id: 'var_4_2', name: 'Silver', color: 'Silver', colorHex: '#C0C0C0', price: 349, stock: 32 },
    ],
    tags: ['bestseller', 'anc', 'wireless'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2023-05-12T00:00:00Z',
  },
  {
    id: 'prod_5',
    name: 'PlayStation 5 Console',
    slug: 'playstation-5-console',
    description: 'Experience lightning-fast loading, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio. Explore an all-new generation of incredible PlayStation games.',
    shortDescription: 'Play has no limits. Next-gen gaming console.',
    price: 499,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop',
    ],
    category: 'gaming',
    subcategory: 'consoles',
    brand: 'Sony',
    rating: 4.9,
    reviewCount: 5678,
    stock: 23,
    specs: [
      { name: 'CPU', value: 'AMD Zen 2, 8 cores @ 3.5GHz' },
      { name: 'GPU', value: '10.28 TFLOPs, RDNA 2' },
      { name: 'Storage', value: '825GB SSD' },
      { name: 'Resolution', value: 'Up to 8K' },
      { name: 'Frame Rate', value: 'Up to 120fps' },
    ],
    tags: ['gaming', 'console', '4k'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2023-11-12T00:00:00Z',
  },
  {
    id: 'prod_6',
    name: 'Apple Watch Ultra 2',
    slug: 'apple-watch-ultra-2',
    description: 'The most rugged and capable Apple Watch pushes the limits with adventure-ready titanium case, precision dual-frequency GPS, and up to 36 hours of battery life.',
    shortDescription: 'Adventure awaits. 49mm titanium case. Action button.',
    price: 799,
    originalPrice: 849,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    ],
    category: 'wearables',
    subcategory: 'smartwatches',
    brand: 'Apple',
    rating: 4.7,
    reviewCount: 1245,
    stock: 34,
    specs: [
      { name: 'Case', value: '49mm Titanium' },
      { name: 'Display', value: 'Always-On Retina LTPO OLED' },
      { name: 'Water Resistance', value: '100m' },
      { name: 'Battery', value: 'Up to 36 hours' },
      { name: 'GPS', value: 'Precision dual-frequency' },
    ],
    tags: ['adventure', 'fitness', 'premium'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-09-22T00:00:00Z',
  },
  {
    id: 'prod_7',
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Stunning 15.6-inch OLED display with InfinityEdge. Powered by 13th Gen Intel Core processors and NVIDIA GeForce RTX graphics.',
    shortDescription: 'Stunning design. Powerful performance.',
    price: 1899,
    originalPrice: 2099,
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
    ],
    category: 'laptops',
    subcategory: 'ultrabooks',
    brand: 'Dell',
    rating: 4.6,
    reviewCount: 892,
    stock: 18,
    specs: [
      { name: 'Display', value: '15.6" 3.5K OLED' },
      { name: 'Processor', value: '13th Gen Intel Core i7/i9' },
      { name: 'Memory', value: 'Up to 64GB DDR5' },
      { name: 'Graphics', value: 'NVIDIA GeForce RTX 4070' },
      { name: 'Storage', value: 'Up to 4TB SSD' },
    ],
    tags: ['creator', 'oled', 'premium'],
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'prod_8',
    name: 'AirPods Pro 2nd Gen',
    slug: 'airpods-pro-2nd-gen',
    description: 'Active Noise Cancellation up to 2x more than the previous generation. Adaptive Audio dynamically blends Transparency mode and Active Noise Cancellation.',
    shortDescription: 'Rebuilt from the sound up. H2 chip. USB-C.',
    price: 249,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop',
    ],
    category: 'audio',
    subcategory: 'earbuds',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 4521,
    stock: 89,
    specs: [
      { name: 'Chip', value: 'H2' },
      { name: 'Noise Cancellation', value: 'Active (2x improved)' },
      { name: 'Battery', value: 'Up to 6 hours (30 with case)' },
      { name: 'Water Resistance', value: 'IPX4' },
      { name: 'Connectivity', value: 'Bluetooth 5.3' },
    ],
    tags: ['bestseller', 'anc', 'wireless'],
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2023-09-22T00:00:00Z',
  },
  {
    id: 'prod_9',
    name: 'ASUS ROG Strix G16',
    slug: 'asus-rog-strix-g16',
    description: 'Dominate the battlefield with the ROG Strix G16. Featuring Intel Core i9-13980HX and NVIDIA GeForce RTX 4080 for ultimate gaming performance.',
    shortDescription: 'For Those Who Dare. 16" 240Hz QHD display.',
    price: 2299,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop',
    ],
    category: 'laptops',
    subcategory: 'gaming-laptops',
    brand: 'ASUS',
    rating: 4.7,
    reviewCount: 567,
    stock: 8,
    specs: [
      { name: 'Display', value: '16" QHD 240Hz' },
      { name: 'Processor', value: 'Intel Core i9-13980HX' },
      { name: 'Memory', value: '32GB DDR5' },
      { name: 'Graphics', value: 'NVIDIA RTX 4080' },
      { name: 'Storage', value: '1TB NVMe SSD' },
    ],
    tags: ['gaming', 'rgb', 'high-refresh'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'prod_10',
    name: 'Bose QuietComfort Ultra',
    slug: 'bose-quietcomfort-ultra',
    description: 'World-class noise cancellation. Immersive Audio. Luxuriously comfortable. The ultimate in premium headphones.',
    shortDescription: 'Immerse yourself in world-class sound.',
    price: 429,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    ],
    category: 'audio',
    subcategory: 'headphones',
    brand: 'Bose',
    rating: 4.7,
    reviewCount: 1823,
    stock: 42,
    specs: [
      { name: 'Type', value: 'Over-ear, Wireless' },
      { name: 'Noise Cancellation', value: 'CustomTune technology' },
      { name: 'Battery', value: 'Up to 24 hours' },
      { name: 'Connectivity', value: 'Bluetooth 5.3, aptX Adaptive' },
      { name: 'Features', value: 'Immersive Audio, Aware Mode' },
    ],
    variants: [
      { id: 'var_10_1', name: 'Black', color: 'Black', colorHex: '#1C1C1C', price: 429, stock: 22 },
      { id: 'var_10_2', name: 'White Smoke', color: 'White Smoke', colorHex: '#E8E8E8', price: 429, stock: 20 },
    ],
    tags: ['premium', 'anc', 'immersive'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-10-10T00:00:00Z',
  },
  {
    id: 'prod_11',
    name: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    description: 'The best of Google AI in a phone. Pro-level camera with advanced computational photography. 7 years of OS and security updates.',
    shortDescription: 'The best of Google. Now even better.',
    price: 999,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    ],
    category: 'smartphones',
    subcategory: 'android',
    brand: 'Google',
    rating: 4.6,
    reviewCount: 1456,
    stock: 29,
    specs: [
      { name: 'Display', value: '6.7" LTPO OLED 120Hz' },
      { name: 'Chip', value: 'Google Tensor G3' },
      { name: 'Camera', value: '50MP Main + 48MP Ultra Wide + 48MP Telephoto' },
      { name: 'Battery', value: '5050mAh' },
      { name: 'AI Features', value: 'Magic Eraser, Best Take, Audio Magic Eraser' },
    ],
    tags: ['ai', 'camera', 'clean-android'],
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-10-12T00:00:00Z',
  },
  {
    id: 'prod_12',
    name: 'Xbox Series X',
    slug: 'xbox-series-x',
    description: 'The fastest, most powerful Xbox ever. Play thousands of games from four generations of Xbox with true 4K gaming.',
    shortDescription: 'Power your dreams. 12 teraflops of raw power.',
    price: 499,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=600&fit=crop',
    ],
    category: 'gaming',
    subcategory: 'consoles',
    brand: 'Microsoft',
    rating: 4.8,
    reviewCount: 3892,
    stock: 15,
    specs: [
      { name: 'CPU', value: '8-core AMD Zen 2 @ 3.8GHz' },
      { name: 'GPU', value: '12 TFLOPs RDNA 2' },
      { name: 'Storage', value: '1TB NVMe SSD' },
      { name: 'Resolution', value: 'Up to 8K' },
      { name: 'Features', value: 'Quick Resume, Smart Delivery' },
    ],
    tags: ['gaming', 'console', '4k', 'game-pass'],
    featured: true,
    bestSeller: false,
    newArrival: false,
    createdAt: '2023-11-10T00:00:00Z',
  },
];

// ============================================
// Reviews
// ============================================
// TODO: Replace with: useQuery(['reviews', productId], () => fetchReviews(productId));

export const reviews: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_1',
    userId: 'user_1',
    userName: 'Alex M.',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    rating: 5,
    title: 'Best iPhone ever!',
    comment: 'The camera is absolutely incredible. The titanium design feels premium and the Action button is super useful. Battery life is amazing too.',
    helpful: 234,
    verified: true,
    createdAt: '2024-10-15T10:30:00Z',
  },
  {
    id: 'rev_2',
    productId: 'prod_1',
    userId: 'user_2',
    userName: 'Sarah K.',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    rating: 4,
    title: 'Great phone, pricey upgrade',
    comment: 'Coming from the 14 Pro, the improvements are noticeable but subtle. The USB-C is a welcome change. Great for new buyers, consider if upgrading.',
    helpful: 156,
    verified: true,
    createdAt: '2024-10-20T15:45:00Z',
  },
  {
    id: 'rev_3',
    productId: 'prod_4',
    userId: 'user_3',
    userName: 'Mike R.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    rating: 5,
    title: 'Silence is golden',
    comment: 'The noise cancellation on these is unreal. I use them daily for work and travel. Sound quality is excellent and they\'re so comfortable for all-day wear.',
    helpful: 445,
    verified: true,
    createdAt: '2024-09-05T08:20:00Z',
  },
];

// ============================================
// Orders (Mock user order history)
// ============================================
// TODO: Replace with: useQuery(['orders'], fetchOrders);

export const orders: Order[] = [
  {
    id: 'order_1',
    orderNumber: 'TS-2024-001234',
    items: [
      {
        productId: 'prod_1',
        productName: 'iPhone 15 Pro Max',
        productImage: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&h=100&fit=crop',
        quantity: 1,
        price: 1199,
        variant: 'Natural Titanium, 256GB',
      },
      {
        productId: 'prod_8',
        productName: 'AirPods Pro 2nd Gen',
        productImage: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop',
        quantity: 1,
        price: 249,
      },
    ],
    status: 'delivered',
    subtotal: 1448,
    shipping: 0,
    tax: 115.84,
    total: 1563.84,
    shippingAddress: {
      id: 'addr_1',
      fullName: 'John Doe',
      addressLine1: '123 Tech Street',
      addressLine2: 'Apt 456',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: 'TRK928374650',
    trackingEvents: [
      { date: '2024-10-28T09:00:00Z', status: 'Delivered', location: 'San Francisco, CA', description: 'Package delivered' },
      { date: '2024-10-28T06:30:00Z', status: 'Out for Delivery', location: 'San Francisco, CA', description: 'Package is out for delivery' },
      { date: '2024-10-27T18:00:00Z', status: 'In Transit', location: 'Oakland, CA', description: 'Package in transit to destination' },
      { date: '2024-10-26T10:00:00Z', status: 'Shipped', location: 'Los Angeles, CA', description: 'Package shipped from fulfillment center' },
    ],
    createdAt: '2024-10-25T14:30:00Z',
    updatedAt: '2024-10-28T09:00:00Z',
  },
  {
    id: 'order_2',
    orderNumber: 'TS-2024-001289',
    items: [
      {
        productId: 'prod_4',
        productName: 'Sony WH-1000XM5',
        productImage: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop',
        quantity: 1,
        price: 349,
        variant: 'Black',
      },
    ],
    status: 'shipped',
    subtotal: 349,
    shipping: 9.99,
    tax: 27.92,
    total: 386.91,
    shippingAddress: {
      id: 'addr_1',
      fullName: 'John Doe',
      addressLine1: '123 Tech Street',
      addressLine2: 'Apt 456',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    paymentMethod: 'Apple Pay',
    trackingNumber: 'TRK738291046',
    estimatedDelivery: '2024-11-02',
    trackingEvents: [
      { date: '2024-10-30T14:00:00Z', status: 'In Transit', location: 'Phoenix, AZ', description: 'Package in transit' },
      { date: '2024-10-29T08:00:00Z', status: 'Shipped', location: 'Dallas, TX', description: 'Package shipped' },
    ],
    createdAt: '2024-10-29T10:15:00Z',
    updatedAt: '2024-10-30T14:00:00Z',
  },
  {
    id: 'order_3',
    orderNumber: 'TS-2024-001156',
    items: [
      {
        productId: 'prod_5',
        productName: 'PlayStation 5 Console',
        productImage: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop',
        quantity: 1,
        price: 499,
      },
    ],
    status: 'processing',
    subtotal: 499,
    shipping: 0,
    tax: 39.92,
    total: 538.92,
    shippingAddress: {
      id: 'addr_1',
      fullName: 'John Doe',
      addressLine1: '123 Tech Street',
      addressLine2: 'Apt 456',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    paymentMethod: 'Visa ending in 4242',
    createdAt: '2024-10-31T16:45:00Z',
    updatedAt: '2024-10-31T16:45:00Z',
  },
];

// ============================================
// Promo Banners
// ============================================
// TODO: Replace with: useQuery(['banners'], fetchBanners);

export const promoBanners: PromoBanner[] = [
  {
    id: 'banner_1',
    title: 'Black Friday Sale',
    subtitle: 'Up to 40% Off',
    description: 'Get incredible deals on the latest tech. Limited time only.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    backgroundColor: 'hsl(4 84% 55%)',
    endDate: '2024-11-30T23:59:59Z',
  },
  {
    id: 'banner_2',
    title: 'New iPhone 15 Pro',
    subtitle: 'Titanium. So Strong. So Light.',
    description: 'Experience the future of smartphones.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200&h=500&fit=crop',
    ctaText: 'Learn More',
    ctaLink: '/product/iphone-15-pro-max',
    backgroundColor: 'hsl(240 10% 10%)',
  },
];

// ============================================
// Flash Deals
// ============================================
// TODO: Replace with: useQuery(['flash-deals'], fetchFlashDeals);

export const flashDeals: FlashDeal[] = [
  {
    id: 'deal_1',
    productId: 'prod_4',
    product: products.find(p => p.id === 'prod_4')!,
    discountPercent: 20,
    startDate: '2024-10-30T00:00:00Z',
    endDate: '2024-11-05T23:59:59Z',
  },
  {
    id: 'deal_2',
    productId: 'prod_7',
    product: products.find(p => p.id === 'prod_7')!,
    discountPercent: 15,
    startDate: '2024-10-30T00:00:00Z',
    endDate: '2024-11-03T23:59:59Z',
  },
];

// ============================================
// Helper Functions
// ============================================

export const getProductById = (id: string): Product | undefined => {
  // TODO: Replace with: await api.get(`/products/${id}`)
  return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  // TODO: Replace with: await api.get(`/products/slug/${slug}`)
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  // TODO: Replace with: await api.get(`/products?category=${categorySlug}`)
  return products.filter(p => p.category === categorySlug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  // TODO: Replace with: await api.get(`/categories/${slug}`)
  return categories.find(c => c.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  // TODO: Replace with: await api.get(`/products/search?q=${query}`)
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getFeaturedProducts = (): Product[] => {
  // TODO: Replace with: await api.get('/products/featured')
  return products.filter(p => p.featured);
};

export const getBestSellers = (): Product[] => {
  // TODO: Replace with: await api.get('/products/bestsellers')
  return products.filter(p => p.bestSeller);
};

export const getNewArrivals = (): Product[] => {
  // TODO: Replace with: await api.get('/products/new-arrivals')
  return products.filter(p => p.newArrival);
};

export const getReviewsByProduct = (productId: string): Review[] => {
  // TODO: Replace with: await api.get(`/products/${productId}/reviews`)
  return reviews.filter(r => r.productId === productId);
};
