import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getSessionId } from "@/lib/cart";

interface CartButtonProps {
  productId: string;
  className?: string;
}

export function CartButton({ productId, className }: CartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", {
        productId,
        quantity: 1,
        sessionId: getSessionId()
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsAdding(false);
    }
  });

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCartMutation.mutate();
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`bg-rich-brown hover:bg-rich-brown/90 text-cream-beige flex items-center gap-2 ${className}`}
      data-testid={`button-add-to-cart-${productId}`}
    >
      {isAdding ? (
        <div className="animate-spin w-4 h-4 border-2 border-cream-beige border-t-transparent rounded-full" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to Cart
    </Button>
  );
}

interface CartIconProps {
  itemCount?: number;
  onClick?: () => void;
}

export function CartIcon({ itemCount = 0, onClick }: CartIconProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-rich-brown hover:text-rich-brown/80 transition-colors"
      data-testid="button-cart-icon"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-rich-brown text-cream-beige text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}