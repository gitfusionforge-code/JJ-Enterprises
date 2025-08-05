import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
          Crafting Your
          <span className="block text-cream-beige mt-2">Perfect Home</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Discover exceptional furniture that transforms your space into a reflection of your style and personality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <Button 
            onClick={() => scrollToSection('products')}
            className="bg-rich-brown text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-200 font-medium text-base sm:text-lg w-full sm:w-auto"
            data-testid="button-shop-collection"
          >
            Shop Collection
          </Button>
          <Button 
            onClick={() => scrollToSection('about')}
            variant="outline"
            className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-charcoal hover:scale-105 transition-all duration-200 font-medium text-base sm:text-lg w-full sm:w-auto"
            data-testid="button-our-story"
          >
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
}
