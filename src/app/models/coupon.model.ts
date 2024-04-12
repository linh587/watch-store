export interface Coupon {
  couponCode: string;
  type: CouponType;
  beginAt: Date | string;
  finishAt: Date | string;
  decrease: number;
  unit: CouponUnit;
  appliedScopes: string | string[];
}

export const APPLIED_SCOPES = ["order", "product"] as const;
export const COUPON_UNIT = ["percent", "money"] as const;
export const COUPON_TYPE = ["order", "product"] as const;
export type CouponType = (typeof COUPON_TYPE)[number];
export type CouponUnit = (typeof COUPON_UNIT)[number];
