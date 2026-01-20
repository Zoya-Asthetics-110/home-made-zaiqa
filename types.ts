
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  date: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
}

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  EASYPAISA = 'Easypaisa',
  BANK = 'Bank Transfer'
}
