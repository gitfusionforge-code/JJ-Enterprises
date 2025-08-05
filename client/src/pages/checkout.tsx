import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getSessionId, formatPrice, calculateCartTotal, CartItemWithProduct } from "@/lib/cart";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionId = getSessionId();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

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

  // Redirect to cart if no items
  useEffect(() => {
    if (!isLoading && cartItems.length === 0 && !orderComplete) {
      setLocation("/cart");
    }
  }, [cartItems, isLoading, orderComplete, setLocation]);

  // Test payment mutation
  const processPaymentMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/test-payment", {
        cartItems,
        customerInfo
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setOrderComplete(true);
      setOrderId(data.orderId);
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    processPaymentMutation.mutate();
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-beige flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-rich-brown border-t-transparent rounded-full" />
      </div>
    );
  }

  const total = calculateCartTotal(cartItems);

  // Order completion screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-cream-beige flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-rich-brown mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order ID is:
            </p>
            <p className="font-mono text-sm bg-gray-100 p-3 rounded mb-6" data-testid="text-order-id">
              {orderId}
            </p>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-rich-brown hover:bg-rich-brown/90 text-cream-beige">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-beige">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" className="text-rich-brown hover:text-rich-brown/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-rich-brown font-serif">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-rich-brown">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    data-testid="input-customer-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    data-testid="input-customer-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    data-testid="input-customer-phone"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    data-testid="input-customer-address"
                  />
                </div>

                {/* Test Payment Section */}
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Test Payment Mode
                  </h3>
                  <p className="text-sm text-yellow-700 mb-4">
                    This is a test payment system. No real money will be charged.
                  </p>
                  
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-rich-brown hover:bg-rich-brown/90 text-cream-beige"
                    data-testid="button-process-payment"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-cream-beige border-t-transparent rounded-full" />
                        Processing Payment...
                      </div>
                    ) : (
                      `Process Test Payment - ₹${total}`
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-rich-brown">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-sm" data-testid={`text-checkout-product-${item.id}`}>
                        {item.product?.name || "Product"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold" data-testid={`text-checkout-price-${item.id}`}>
                      {item.product ? formatPrice(item.product.price) : "N/A"}
                    </p>
                  </div>
                ))}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-semibold text-rich-brown">
                  <span>Total</span>
                  <span data-testid="text-checkout-total">₹{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}