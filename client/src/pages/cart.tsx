import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getSessionId, formatPrice, calculateCartTotal, CartItemWithProduct } from "@/lib/cart";

export default function CartPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/cart/${sessionId}`);
      const items = await response.json();
      
      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        items.map(async (item: any) => {
          try {
            const productResponse = await apiRequest("GET", `/api/products/${item.productId}`);
            const product = await productResponse.json();
            return { ...item, product };
          } catch {
            return item;
          }
        })
      );
      
      return itemsWithProducts;
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return apiRequest("PUT", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  });

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity: newQuantity });
  };

  const handleRemoveItem = (id: string) => {
    removeItemMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-beige flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-rich-brown border-t-transparent rounded-full" />
      </div>
    );
  }

  const total = calculateCartTotal(cartItems);

  return (
    <div className="min-h-screen bg-cream-beige">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-rich-brown hover:text-rich-brown/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-rich-brown font-serif">
            Shopping Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          // Empty cart
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding some beautiful furniture to your collection!
            </p>
            <Link href="/">
              <Button className="bg-rich-brown hover:bg-rich-brown/90 text-cream-beige">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product?.imageUrl && (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            data-testid={`img-cart-product-${item.id}`}
                          />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-rich-brown mb-2" data-testid={`text-cart-product-name-${item.id}`}>
                          {item.product?.name || "Product"}
                        </h3>
                        <p className="text-lg font-semibold text-rich-brown" data-testid={`text-cart-product-price-${item.id}`}>
                          {item.product ? formatPrice(item.product.price) : "Price unavailable"}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                            data-testid={`button-decrease-quantity-${item.id}`}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={updateQuantityMutation.isPending}
                            data-testid={`button-increase-quantity-${item.id}`}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removeItemMutation.isPending}
                        data-testid={`button-remove-item-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-rich-brown mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Items ({cartItems.length})</span>
                      <span data-testid="text-cart-subtotal">₹{total}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    <div className="flex justify-between text-lg font-semibold text-rich-brown">
                      <span>Total</span>
                      <span data-testid="text-cart-total">₹{total}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button 
                      className="w-full mt-6 bg-rich-brown hover:bg-rich-brown/90 text-cream-beige"
                      data-testid="button-proceed-checkout"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}