import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class PromotionService extends BaseHttpRequest {
  public getPromotions(params?: any) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.PROMOTION}`, {
      params,
    });
  }

  public getDetailPromotion(promotionId: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.PROMOTION}/${promotionId}`
    );
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
