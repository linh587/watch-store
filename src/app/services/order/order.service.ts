import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class OrderService extends BaseHttpRequest {
  public createOrder(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.CREATE_ORDER}`,
      payload
    );
  }

  public getOrders() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ORDER_LIST}`);
  }

  public cancelOrder(orderId: string, payload: any) {
    return this.httpClient.patch(
      `${ENVIRONMENT}${API_URL.USER}/${API_URL.ORDER}/${orderId}/${API_URL.CANCEL}`,
      payload
    );
  }

  public getOrderDetail(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.ORDER}/${id}`);
  }

  public couponRelation(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.RELATION}`, payload);
  }

  public decreaseMoney(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.DECREASE_MONEY}`,
      payload
    );
  }

  public couponDetail(couponCode: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.COUPON}/${couponCode}`);
  }
}
