import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CartIcon } from "@/components/cart-button";
import { getSessionId } from "@/lib/cart";
import { apiRequest } from "@/lib/queryClient";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const sessionId = getSessionId();

  // Get cart item count
  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", `/api/cart/${sessionId}`);
        return await response.json();
      } catch {
        return [];
      }
    },
  });

  const cartItemCount = cartItems.length;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-playfair font-bold text-rich-brown">JJ Furnitures</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium"
                data-testid="nav-products"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
              <CartIcon 
                itemCount={cartItemCount} 
                onClick={() => setLocation('/cart')} 
              />
            </div>
          </div>
          
          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center gap-2">
            <CartIcon 
              itemCount={cartItemCount} 
              onClick={() => setLocation('/cart')} 
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal hover:text-rich-brown"
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium w-full text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block px-3 py-2 text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium w-full text-left"
                data-testid="mobile-nav-products"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium w-full text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-charcoal hover:text-rich-brown transition-colors duration-200 font-medium w-full text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
