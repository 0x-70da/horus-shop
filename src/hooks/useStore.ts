import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';

// ============================================
// Typed Redux Hooks
// ============================================
// Use these hooks throughout the app instead of plain `useDispatch` and `useSelector`.
// They provide proper TypeScript types automatically.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
