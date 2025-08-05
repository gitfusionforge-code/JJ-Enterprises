import { type Product, type InsertProduct, type Contact, type InsertContact, type CartItem, type InsertCartItem, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Cart
  addToCart(item: InsertCartItem): Promise<CartItem>;
  getCartItems(sessionId: string): Promise<CartItem[]>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const initialProducts: Product[] = [
      {
        id: "1",
        name: "Harper Sectional Sofa",
        description: "Premium comfort meets contemporary design",
        price: "241,917.00",
        category: "sofas",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: 1
      },
      {
        id: "2",
        name: "Madison Dining Set",
        description: "Crafted walnut wood with luxury seating",
        price: "292,067.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: 1
      },
      {
        id: "3",
        name: "Aurora Platform Bed",
        description: "Minimalist elegance for peaceful rest",
        price: "166,783.00",
        category: "bedroom",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: 1
      },
      {
        id: "4",
        name: "Contemporary Sectional",
        description: "Premium fabric upholstery",
        price: "191,833.00",
        category: "sofas",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "5",
        name: "Luxe Dining Chair",
        description: "Velvet upholstery, oak legs",
        price: "33,292.00",
        category: "chairs",
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "6",
        name: "Walnut Dining Table",
        description: "Solid wood construction",
        price: "158,508.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "7",
        name: "Platform Bed Set",
        description: "Includes nightstands",
        price: "216,883.00",
        category: "bedroom",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "8",
        name: "Executive Desk",
        description: "Solid oak construction",
        price: "108,408.00",
        category: "office",
        imageUrl: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "9",
        name: "Comfort Sofa",
        description: "Plush cushioning",
        price: "150,158.00",
        category: "sofas",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "10",
        name: "Round Coffee Table",
        description: "Glass top, metal base",
        price: "75,067.00",
        category: "tables",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      },
      {
        id: "11",
        name: "Accent Armchair",
        description: "Premium fabric, solid wood",
        price: "58,342.00",
        category: "chairs",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: 0
      }
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured === 1
    );
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone || null,
      interest: insertContact.interest || null,
      message: insertContact.message || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Cart methods
  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([, item]) => item.sessionId === sessionId)
      .map(([id]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
    return itemsToDelete.length > 0;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status || "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
