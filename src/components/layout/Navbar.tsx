
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User, ShoppingBag, Home, Palette } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Avatar Studio', href: '/avatar', icon: <User className="h-4 w-4 mr-2" /> },
    { name: 'Clothing Catalog', href: '/catalog', icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: 'Profile', href: '/profile', icon: <Palette className="h-4 w-4 mr-2" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-background/0'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <span className="font-bold text-xl">Avatar Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors flex items-center',
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div
          className={cn(
            'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden transform transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="container h-full flex flex-col pt-20 pb-8 px-4">
            <nav className="flex flex-col space-y-6 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center py-3 text-base font-medium border-b border-border',
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Close Menu
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
