import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, ShippingAddress } from '@/types';

// ============================================
// Auth Slice (Mocked)
// ============================================
// This slice manages authentication state with MOCK functionality.
// All auth operations are simulated for front-end demo purposes.
//
// TODO: Backend Integration Points:
// - Replace mock login with real API authentication
// - Implement JWT token storage and refresh
// - Add OAuth providers (Google, Apple, etc.)
// - Connect to your auth service (Auth0, Firebase Auth, custom, etc.)
//
// Example integration:
// ```typescript
// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials: { email: string; password: string }) => {
//     const response = await api.post('/auth/login', credentials);
//     localStorage.setItem('token', response.data.token);
//     return response.data.user;
//   }
// );
// ```

const AUTH_STORAGE_KEY = 'techstore_auth';

// Mock user for demo
const mockUser: User = {
  id: 'user_1',
  email: 'demo@techstore.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  phone: '+1 (555) 123-4567',
  addresses: [
    {
      id: 'addr_1',
      fullName: 'John Doe',
      addressLine1: '123 Tech Street',
      addressLine2: 'Apt 456',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
  ],
  createdAt: '2024-01-15T10:00:00Z',
};

// Load auth state from localStorage
const loadAuthFromStorage = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load auth from storage:', error);
  }
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

// Save auth state to localStorage
const saveAuthToStorage = (state: AuthState) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save auth to storage:', error);
  }
};

const initialState: AuthState = loadAuthFromStorage();

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Mock login - simulates API authentication
    // TODO: Replace with createAsyncThunk and real API call
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email } = action.payload;
      
      // Simulate successful login with mock user
      // In real app: validate credentials against API
      state.user = {
        ...mockUser,
        email,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      
      saveAuthToStorage(state);
    },

    // Mock register - simulates user registration
    // TODO: Replace with createAsyncThunk and real API call
    register: (state, action: PayloadAction<RegisterPayload>) => {
      const { email, firstName, lastName } = action.payload;
      
      // Simulate successful registration
      // In real app: send registration data to API
      state.user = {
        ...mockUser,
        id: `user_${Date.now()}`,
        email,
        firstName,
        lastName,
        addresses: [],
        createdAt: new Date().toISOString(),
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      
      saveAuthToStorage(state);
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      
      // Clear auth storage
      localStorage.removeItem(AUTH_STORAGE_KEY);
      
      // TODO: Invalidate token on server
      // Example: await api.post('/auth/logout');
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateProfile: (state, action: PayloadAction<UpdateProfilePayload>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        saveAuthToStorage(state);
        
        // TODO: Sync with backend
        // Example: await api.patch('/user/profile', action.payload);
      }
    },

    addAddress: (state, action: PayloadAction<Omit<ShippingAddress, 'id'>>) => {
      if (state.user) {
        const newAddress: ShippingAddress = {
          ...action.payload,
          id: `addr_${Date.now()}`,
        };
        
        // If this is set as default, update other addresses
        if (newAddress.isDefault) {
          state.user.addresses.forEach(addr => {
            addr.isDefault = false;
          });
        }
        
        state.user.addresses.push(newAddress);
        saveAuthToStorage(state);
        
        // TODO: Sync with backend
        // Example: await api.post('/user/addresses', action.payload);
      }
    },

    updateAddress: (state, action: PayloadAction<ShippingAddress>) => {
      if (state.user) {
        const index = state.user.addresses.findIndex(
          addr => addr.id === action.payload.id
        );
        
        if (index !== -1) {
          // If setting as default, update other addresses
          if (action.payload.isDefault) {
            state.user.addresses.forEach(addr => {
              addr.isDefault = false;
            });
          }
          
          state.user.addresses[index] = action.payload;
          saveAuthToStorage(state);
          
          // TODO: Sync with backend
          // Example: await api.put(`/user/addresses/${action.payload.id}`, action.payload);
        }
      }
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.filter(
          addr => addr.id !== action.payload
        );
        saveAuthToStorage(state);
        
        // TODO: Sync with backend
        // Example: await api.delete(`/user/addresses/${action.payload}`);
      }
    },
  },
});

export const {
  login,
  register,
  logout,
  setLoading,
  setError,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
} = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectUserAddresses = (state: { auth: AuthState }) =>
  state.auth.user?.addresses ?? [];
export const selectDefaultAddress = (state: { auth: AuthState }) =>
  state.auth.user?.addresses.find(addr => addr.isDefault);

export default authSlice.reducer;
