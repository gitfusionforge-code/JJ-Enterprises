// Cart utility functions and types
export interface CartItemWithProduct {
  id: string;
  productId: string;
  quantity: number;
  sessionId: string;
  product?: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  };
}

// Generate a simple session ID for cart management
export function getSessionId(): string {
  let sessionId = localStorage.getItem('cart-session-id');
  if (!sessionId) {
    sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('cart-session-id', sessionId);
  }
  return sessionId;
}

// Format price with INR symbol
export function formatPrice(price: string): string {
  return `₹${price}`;
}

// Calculate cart total
export function calculateCartTotal(items: CartItemWithProduct[]): string {
  const total = items.reduce((sum, item) => {
    if (item.product) {
      const price = parseFloat(item.product.price.replace(/,/g, ''));
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);
  
  return total.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}