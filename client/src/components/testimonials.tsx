import { testimonials } from "@/lib/data";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">What Our Customers Say</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">Real stories from families who transformed their homes with JJ Enterprises</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-cream-beige/20 p-6 sm:p-8 rounded-xl hover:shadow-lg transition-shadow duration-300" data-testid={`testimonial-${testimonial.id}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-rich-brown">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base" data-testid={`text-testimonial-${testimonial.id}`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rich-brown rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                  {testimonial.avatar}
                </div>
                <div className="ml-3 sm:ml-4">
                  <div className="font-semibold text-sm sm:text-base" data-testid={`text-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm" data-testid={`text-location-${testimonial.id}`}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
