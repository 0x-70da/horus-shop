import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState, Product, ProductVariant } from '@/types';

// ============================================
// Cart Slice
// ============================================
// Manages shopping cart state with localStorage persistence.
// 
// TODO: Backend Integration Points:
// - Replace localStorage with API calls to persist cart server-side
// - Add user-specific cart syncing when authenticated
// - Example: await api.post('/cart/items', { productId, quantity })

const CART_STORAGE_KEY = 'techstore_cart';

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
  }
  return {
    items: [],
    promoCode: null,
    promoDiscount: 0,
  };
};

// Save cart to localStorage
const saveCartToStorage = (state: CartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

const initialState: CartState = loadCartFromStorage();

interface AddToCartPayload {
  product: Product;
  quantity?: number;
  variant?: ProductVariant;
}

interface UpdateQuantityPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

interface RemoveFromCartPayload {
  productId: string;
  variantId?: string;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity = 1, variant } = action.payload;
      
      // Check if item already exists in cart
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedVariant?.id === variant?.id
      );

      if (existingIndex !== -1) {
        // Update quantity if item exists
        state.items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          productId: product.id,
          product,
          quantity,
          selectedVariant: variant,
        });
      }

      saveCartToStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.selectedVariant?.id === variantId)
      );
      saveCartToStorage(state);
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.selectedVariant?.id === variantId
      );

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(
            (i) =>
              !(i.productId === productId && i.selectedVariant?.id === variantId)
          );
        } else {
          item.quantity = quantity;
        }
      }

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.promoDiscount = 0;
      saveCartToStorage(state);
    },

    applyPromoCode: (state, action: PayloadAction<string>) => {
      // TODO: Replace with API call to validate promo code
      // Example: const discount = await api.post('/promo/validate', { code })
      const code = action.payload.toUpperCase();
      
      // Mock promo codes for demo
      const promoCodes: Record<string, number> = {
        'TECH10': 10,
        'SAVE20': 20,
        'NEWUSER': 15,
      };

      if (promoCodes[code]) {
        state.promoCode = code;
        state.promoDiscount = promoCodes[code];
      }

      saveCartToStorage(state);
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.promoDiscount = 0;
      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    const price = item.selectedVariant?.price ?? item.product.price;
    return total + price * item.quantity;
  }, 0);
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const discount = (subtotal * state.cart.promoDiscount) / 100;
  return subtotal - discount;
};
export const selectPromoCode = (state: { cart: CartState }) => state.cart.promoCode;
export const selectPromoDiscount = (state: { cart: CartState }) => state.cart.promoDiscount;

export default cartSlice.reducer;
