import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem, WishlistState, Product } from '@/types';

// ============================================
// Wishlist Slice
// ============================================
// Manages wishlist state with localStorage persistence.
// 
// TODO: Backend Integration Points:
// - Replace localStorage with API calls when user is authenticated
// - Sync wishlist across devices for logged-in users
// - Example: await api.post('/wishlist/items', { productId })

const WISHLIST_STORAGE_KEY = 'techstore_wishlist';

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistState => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load wishlist from storage:', error);
  }
  return { items: [] };
};

// Save wishlist to localStorage
const saveWishlistToStorage = (state: WishlistState) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save wishlist to storage:', error);
  }
};

const initialState: WishlistState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      
      // Check if already in wishlist
      const exists = state.items.some(item => item.productId === product.id);
      
      if (!exists) {
        state.items.push({
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
          priceAtAdd: product.price,
        });
        saveWishlistToStorage(state);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      saveWishlistToStorage(state);
    },

    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.productId === product.id
      );

      if (existingIndex !== -1) {
        // Remove if exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add if not exists
        state.items.push({
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
          priceAtAdd: product.price,
        });
      }
      
      saveWishlistToStorage(state);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state);
    },

    // Update product data in wishlist (e.g., when prices change)
    updateWishlistProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const item = state.items.find(item => item.productId === product.id);
      
      if (item) {
        item.product = product;
        // Note: priceAtAdd stays the same to show price changes
        saveWishlistToStorage(state);
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  updateWishlistProduct,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistItemCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.length;

export const selectIsInWishlist = (productId: string) =>
  (state: { wishlist: WishlistState }) =>
    state.wishlist.items.some(item => item.productId === productId);

// Check if price dropped since adding to wishlist
export const selectPriceDropItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.filter(item => item.product.price < item.priceAtAdd);

export default wishlistSlice.reducer;
