export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  telegramId?: string;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Medicine {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  manufacturer: string;
  isAvailable: boolean;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryType: 'nova_poshta' | 'ukrposhta' | 'courier';
  paymentType: 'card' | 'cash';
  trackingNumber?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  medicineId: number;
  quantity: number;
  pricePerUnit: number;
}

export interface Review {
  id: number;
  userId: number;
  medicineId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface MedicineFilters {
  category?: string;
  sortPrice?: 'asc' | 'desc';
  page?: number;
  limit?: number;
} 