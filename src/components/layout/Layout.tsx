import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

// ============================================
// Main Layout Component
// ============================================
// Wraps all pages with consistent header, footer, and mobile navigation.
// Uses Outlet from react-router-dom to render child routes.

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Layout;
