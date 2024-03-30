import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class BranchService extends BaseHttpRequest {
  public getAllBranch() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.BRANCH}`);
  }
}
