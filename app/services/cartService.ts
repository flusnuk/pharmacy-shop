import { Medicine, CartItem } from "../types/types";

const CART_STORAGE_KEY = 'pharmacy_cart';

export const cartService = {
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  setCart: (cart: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  addItem: (medicine: Medicine) => {
    const cart = cartService.getCart();
    const existingItem = cart.find(item => item.medicine.id === medicine.id);

    if (existingItem) {
      existingItem.quantity += 1;
      cartService.setCart(cart);
    } else {
      cart.push({ medicine, quantity: 1 });
      cartService.setCart(cart);
    }
    return cart;
  },

  removeItem: (medicineId: number) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter(item => item.medicine.id !== medicineId);
    cartService.setCart(updatedCart);
    return updatedCart;
  },

  updateQuantity: (medicineId: number, quantity: number) => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.medicine.id === medicineId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        return cartService.removeItem(medicineId);
      }
      cartService.setCart(cart);
    }
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getTotalItems: (): number => {
    return cartService.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: (): number => {
    return cartService.getCart().reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  }
}; 