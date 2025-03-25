export type Medicine = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
};

export type CartItem = {
  medicine: Medicine;
  quantity: number;
}; 