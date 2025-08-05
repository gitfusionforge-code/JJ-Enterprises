import { Twitter, Facebook, Instagram, BookmarkPlus } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-playfair font-bold mb-4">JJ Furnitures</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Creating beautiful, functional spaces with exceptional furniture that stands the test of time. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-rich-brown p-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
                data-testid="link-pinterest"
              >
                <BookmarkPlus className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-rich-brown p-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-products"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Design Services
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Living Room</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Dining Room</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Bedroom</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Office</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Custom Orders</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 JJ Furnitures. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
