export type Cart = CartDetail[];

export interface CartDetail {
  productPriceId?: string;
  quality?: number;
}

export interface ExtraCartDetail extends CartDetail {
  price?: number;
  productName?: string;
  productSizeId?: string;
  productSizeName?: string;
  productCoverImage?: string;
}

export type InformationToCreateCartDetail = CartDetail;
export type InformationToUpdateCartDetail = CartDetail;
