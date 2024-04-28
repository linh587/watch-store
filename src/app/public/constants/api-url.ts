export const ENVIRONMENT = "http://localhost:8080/";

export const API_URL = {
  // AUTH
  LOGIN: "sign-in/user",
  REGISTER: "sign-up",
  REFRESH_TOKEN: "refresh/user",
  GET_DETAIL_USER: "user/information",
  EDIT_USER: "user/information",
  CHANGE_PASSWORD: "user/password",
  FORGOT_PASSWORD: "sign-in/forgot",
  RESET_PASSWORD: "sign-in/reset",
  VERIFY: "sign-up/verify",
  USER: "user",
  NOTIFICATION: "user/notification",
  MARK_IS_SEEN: "mark-is-seen",

  // PRODUCT
  GET_LIST_PRODUCTS: "product",
  DETAIL_PRODUCT: "product",

  // PRODUCT PRICE
  GET_PRODUCT_PRICES: "product-price",
  GET_DETAIL_PRODUCT_PRICE: "product-price",

  //CART
  ADD_TO_CART: "user/cart",
  CART: "user/cart",

  // ORDER
  GET_ORDER_LIST: "user/order",
  ORDER: "order",
  CANCEL: "cancel",
  CREATE_ORDER: "user/order",

  // CATEGORY
  GET_LIST_CATEGORY: "category",

  // PAYMENT STATUS
  PAYMENT: "order/querydr",

  // COUPON
  COUPON: "coupon",
  RELATION: "coupon/relation",
  DECREASE_MONEY: "coupon/decrease-money",

  // RATING
  USER_RATING: "user/rating",
  RATING: "rating",
};
