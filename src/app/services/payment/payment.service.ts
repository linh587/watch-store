import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class PaymentService extends BaseHttpRequest {
  public checkPaymentStatus(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.PAYMENT}`, payload);
  }
}
