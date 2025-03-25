import { Medicine, CartItem } from "../types/types";

const CART_STORAGE_KEY = 'pharmacy_cart';

export const cartService = {
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  setCart: (cart: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error setting cart:', error);
    }
  },

  addItem: (medicine: Medicine) => {
    try {
      const cart = cartService.getCart();
      const existingItem = cart.find(item => item.medicine.id === medicine.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ medicine, quantity: 1 });
      }

      cartService.setCart(cart);
      return cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  removeItem: (medicineId: number) => {
    try {
      const cart = cartService.getCart();
      const updatedCart = cart.filter(item => item.medicine.id !== medicineId);
      cartService.setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  updateQuantity: (medicineId: number, quantity: number) => {
    try {
      const cart = cartService.getCart();
      const item = cart.find(item => item.medicine.id === medicineId);
      
      if (item) {
        if (quantity <= 0) {
          return cartService.removeItem(medicineId);
        }
        item.quantity = quantity;
        cartService.setCart(cart);
      }
      
      return cart;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  clearCart: () => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },

  getTotalItems: (): number => {
    try {
      return cartService.getCart().reduce((sum, item) => sum + item.quantity, 0);
    } catch (error) {
      console.error('Error getting total items:', error);
      return 0;
    }
  },

  getTotalPrice: (): number => {
    try {
      return cartService.getCart().reduce((sum, item) => 
        sum + (item.medicine.price * item.quantity), 0);
    } catch (error) {
      console.error('Error getting total price:', error);
      return 0;
    }
  }
}; 