import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CartButton } from "@/components/cart-button";
import type { Product } from "@shared/schema";

export default function ProductsGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = allProducts?.filter(product => 
    activeCategory === "all" || product.category === activeCategory
  ) || [];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "sofas", label: "Sofas" },
    { id: "chairs", label: "Chairs" },
    { id: "tables", label: "Tables" },
    { id: "bedroom", label: "Bedroom" },
    { id: "office", label: "Office" }
  ];

  if (isLoading) {
    return (
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Our Collections</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our carefully curated furniture categories</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Skeleton key={category.id} className="h-12 w-32" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i}>
                <Skeleton className="w-full h-64 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-1" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our carefully curated furniture categories</p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "secondary"}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                activeCategory === category.id
                  ? "bg-rich-brown text-white hover:bg-opacity-90 scale-105"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200 hover:scale-105"
              }`}
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden" data-testid={`product-${product.id}`}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured === 1 && (
                  <div className="absolute top-3 right-3 bg-rich-brown text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-playfair font-semibold text-base sm:text-lg mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-testid={`text-product-description-${product.id}`}>
                  {product.description}
                </p>
                <p className="text-lg sm:text-xl font-semibold text-rich-brown mb-4" data-testid={`text-product-price-${product.id}`}>
                  ₹{product.price}
                </p>
                <CartButton productId={product.id} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
