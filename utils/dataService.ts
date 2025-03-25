import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'data', 'products.json');
const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  isNew: boolean;
  discount: number | null;
  rating: number;
  details: {
    manufacturer: string;
    dosage: string;
    quantity: string;
    prescription: boolean;
    activeIngredient: string;
    expiryDate: string;
    storageConditions: string;
  };
  usage: {
    indications: string;
    contraindications: string;
    sideEffects: string;
    dosageInstructions: string;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  delivery: {
    type: 'nova' | 'ukrposhta' | 'address';
    city: string;
    address: string;
    department: string;
    cost: number;
  };
  payment: {
    method: 'card' | 'cash';
    status: 'pending' | 'paid' | 'failed';
  };
  items: Array<{
    productId: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  totalAmount: number;
}

export const dataService = {
  // Отримання всіх продуктів
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data.products;
  },

  // Отримання продукту за ID
  getProductById: async (id: number): Promise<Product | null> => {
    const products = await dataService.getAllProducts();
    return products.find(p => p.id === id) || null;
  },

  // Отримання всіх замовлень
  getAllOrders: async (): Promise<Order[]> => {
    const response = await fetch('/api/orders');
    const data = await response.json();
    return data.orders;
  },

  // Створення нового замовлення
  createOrder: async (orderData: Omit<Order, 'id' | 'date'>): Promise<Order> => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    return response.json();
  },

  // Оновлення статусу замовлення
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order | null> => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) return null;
    return response.json();
  }
}; 