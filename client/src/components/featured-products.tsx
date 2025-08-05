import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-cream-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Featured Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handpicked pieces that define contemporary living</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-80 rounded-xl mb-4" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Featured Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handpicked pieces that define contemporary living</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products?.map((product) => (
            <div key={product.id} className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300" data-testid={`featured-product-${product.id}`}>
              <div className="relative overflow-hidden rounded-t-xl">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-rich-brown text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Featured
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-playfair font-semibold mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2" data-testid={`text-product-description-${product.id}`}>
                  {product.description}
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-rich-brown" data-testid={`text-product-price-${product.id}`}>
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
