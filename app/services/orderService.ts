import { Order } from '@prisma/client';

interface CreateOrderData {
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  paymentStatus: string;
  deliveryType: string;
  paymentType: string;
  trackingNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  userId?: number | null;
}

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}; 