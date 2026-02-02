import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/hooks/useStore';
import { selectCartItemCount } from '@/store/cartSlice';
import { selectWishlistItemCount } from '@/store/wishlistSlice';
import { cn } from '@/lib/utils';

// ============================================
// Mobile Bottom Navigation
// ============================================
// Fixed bottom navigation bar for mobile devices.
// Shows on screens smaller than lg breakpoint.

const MobileNav = () => {
  const location = useLocation();
  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistItemCount = useAppSelector(selectWishlistItemCount);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartItemCount },
    { path: '/wishlist', icon: Heart, label: 'Wishlist', badge: wishlistItemCount },
    { path: '/profile', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map(({ path, icon: Icon, label, badge }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'relative flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {badge !== undefined && badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 text-[9px]"
                  >
                    {badge > 99 ? '99+' : badge}
                  </Badge>
                )}
              </div>
              <span>{label}</span>
              {isActive && (
                <span className="absolute -bottom-2 h-0.5 w-8 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
