import { Twitter, Facebook, Instagram, BookmarkPlus } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-playfair font-bold mb-4">JJ Enterprises</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md text-sm sm:text-base">
              Creating beautiful, functional spaces with exceptional furniture that stands the test of time. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="bg-rich-brown p-2 sm:p-3 rounded-lg hover:bg-opacity-80 hover:scale-105 transition-all duration-200 tap-target"
                data-testid="link-twitter"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-2 sm:p-3 rounded-lg hover:bg-opacity-80 hover:scale-105 transition-all duration-200 tap-target"
                data-testid="link-facebook"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-2 sm:p-3 rounded-lg hover:bg-opacity-80 hover:scale-105 transition-all duration-200 tap-target"
                data-testid="link-pinterest"
                aria-label="Follow us on Pinterest"
              >
                <BookmarkPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-2 sm:p-3 rounded-lg hover:bg-opacity-80 hover:scale-105 transition-all duration-200 tap-target"
                data-testid="link-instagram"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-playfair font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left text-sm sm:text-base tap-target"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left text-sm sm:text-base tap-target"
                  data-testid="footer-link-products"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left text-sm sm:text-base tap-target"
                  data-testid="footer-link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left text-sm sm:text-base tap-target"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">
                  Design Services
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-playfair font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">Living Room</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">Dining Room</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">Bedroom</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">Office</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base tap-target">Custom Orders</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-300 text-xs sm:text-sm">
            &copy; 2024 JJ Enterprises. All rights reserved. | 
            <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200"> Privacy Policy </Link> | 
            <Link href="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors duration-200"> Terms of Service </Link> | 
            <Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors duration-200"> Refund Policy </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
