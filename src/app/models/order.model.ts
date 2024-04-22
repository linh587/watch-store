export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  userAccountId?: string;
  couponCode?: string;
  receivedType: string;
  receivedAddress: string;
  receivedAt?: Date | string;
  deliveryCharge: number;
  subtotalPrice: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  note?: string;
  createdAt: Date | string;
  details: OrderDetail[];
}

export interface OrderDetail {
  orderId: string;
  productPriceId: string;
  quality: number;
  priceAtPurchase: number;
}

export interface TemporaryOrderDetail {
  productPriceId: string;
  quality: number;
  price: number;
}
