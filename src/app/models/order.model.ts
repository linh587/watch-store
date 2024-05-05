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
  priceAtPurchase: any;
  orderId: string;
  productPriceId: string;
  quality: number;
  price: number;
  productName: string;
  productSizeName: string;
  categoryName: string;
  productCoverImage: string;
}

export interface TemporaryOrderDetail {
  productPriceId: string;
  quality: number;
  price: number;
}
