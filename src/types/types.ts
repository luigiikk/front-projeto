export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  categoryName?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  createAt: Date;
  products: {
    product: string;
    quantity: number;
  }[];
  total: number;
}

export interface User {
  email: string;
  name?: string;
}

export interface Pedido {
  id: string;
  items: string[];
  total: number;
  status: string;
}