import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";
import {
  InformationToCreateCartDetail,
  InformationToUpdateCartDetail,
} from "../../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseHttpRequest {
  public getProducts() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_LIST_PRODUCTS}`);
  }

  public getDetailProduct(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.DETAIL_PRODUCT}/${id}`);
  }

  public getProductPrices() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_PRODUCT_PRICES}`);
  }

  public getDetailProductPrice(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_PRODUCT_PRICE}/${id}`
    );
  }

  public getProductSizes() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_PRODUCT_SIZES}`);
  }

  public getDetailProductSize(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_PRODUCT_SIZE}/${id}`
    );
  }

  public addToCart(payload: InformationToCreateCartDetail) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.ADD_TO_CART}`,
      payload
    );
  }

  public updateCartItem(
    productPriceId: string,
    payload: InformationToUpdateCartDetail
  ) {
    return this.httpClient.put(
      `${ENVIRONMENT}${API_URL.ADD_TO_CART}/${productPriceId}`,
      payload
    );
  }

  public getCart() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.CART}`);
  }

  public getCartDetail(productPriceId: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.CART}/${productPriceId}`
    );
  }

  public removeCartItem(productPriceId: string) {
    return this.httpClient.delete(
      `${ENVIRONMENT}${API_URL.CART}/${productPriceId}`
    );
  }
}
