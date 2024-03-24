export interface Product {
  id: string;
  name: string;
  description?: string;
  status?: string;
  createdAt?: Date | string;
  categoryId?: string;
  categoryName?: string;
  coverImage?: string;
  images?: string[];
  priceSizeCombines?: PriceSizeCombine[];
}

export interface PriceSizeCombine {
  productPriceId: string;
  productSizeName: string;
  productSizeId: string;
  price: number;
}

export interface ProductPrice {
  id: string;
  productId?: string;
  productSizeId?: string;
  price?: number;
}

export interface ProductSize {
  id: string;
  name: string;
}
