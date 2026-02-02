// ============================================
// TechStore - TypeScript Type Definitions
// ============================================
// These types define the shape of all data models used in the application.
// When connecting to a real backend, these types should match your API response shapes.

// ============================================
// Product Related Types
// ============================================

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  colorHex?: string;
  storage?: string;
  price: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number; // For showing discounts
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  specs: ProductSpec[];
  variants?: ProductVariant[];
  tags: string[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  createdAt: string;
}

// ============================================
// Category Related Types
// ============================================

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string; // Lucide icon name
  subcategories: Subcategory[];
  productCount: number;
  featured?: boolean;
}

// ============================================
// Brand Types
// ============================================

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
}

// ============================================
// Review Types
// ============================================

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

// ============================================
// Wishlist Types
// ============================================

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
  priceAtAdd: number;
}

export interface WishlistState {
  items: WishlistItem[];
}

// ============================================
// Order Types
// ============================================

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber?: string;
  trackingEvents?: TrackingEvent[];
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// User / Auth Types
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  addresses: ShippingAddress[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// Filter / Search Types
// ============================================

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: PriceRange;
  rating: number | null;
  inStock: boolean;
  tags: string[];
}

export type SortOption = 
  | 'popularity'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'rating';

export interface SearchState {
  query: string;
  filters: ProductFilters;
  sort: SortOption;
  recentSearches: string[];
}

// ============================================
// Promo / Deal Types
// ============================================

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  endDate?: string;
}

export interface FlashDeal {
  id: string;
  productId: string;
  product: Product;
  discountPercent: number;
  startDate: string;
  endDate: string;
}
