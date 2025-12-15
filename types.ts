export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}
