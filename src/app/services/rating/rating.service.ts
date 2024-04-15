import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { CreateRating } from "../../models/rating.model";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class RatingService extends BaseHttpRequest {
  public postRating(payload: CreateRating) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.USER_RATING}`,
      payload
    );
  }

  public getRatingsOfProduct(productId: string, params?: any) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.RATING}/${productId}`, {
      params,
    });
  }
}
