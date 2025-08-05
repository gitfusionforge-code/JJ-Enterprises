import { stats } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-cream-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4 sm:mb-6">Our Story</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              For over two decades, JJ Furnitures has been crafting exceptional pieces that transform houses into homes. Founded in 2003 by James and Julia Johnson, our company began with a simple vision: to create furniture that combines timeless design with contemporary functionality.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Every piece in our collection is carefully curated or custom-crafted by skilled artisans who share our passion for quality and attention to detail. We believe that furniture should not only be beautiful but also built to last generations.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-playfair font-bold text-rich-brown" data-testid="text-years-experience">
                  {stats.yearsExperience}
                </div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">Years of Excellence</div>
              </div>
              <div className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-playfair font-bold text-rich-brown" data-testid="text-happy-customers">
                  {stats.happyCustomers}
                </div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="JJ Furnitures showroom" 
              className="rounded-xl shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-rich-brown text-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="text-xl sm:text-2xl font-playfair font-bold">Est. 2003</div>
              <div className="text-xs sm:text-sm opacity-90">Crafting Dreams</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
