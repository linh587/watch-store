import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseHttpRequest {
  public getAllCategories() {
    return this.httpClient.get("http://localhost:5000/api/category");
  }

  public createCategory(payload: any) {
    return this.httpClient.post("http://localhost:5000/api/category", payload);
  }

  public updateCategory(id: string, payload: any) {
    return this.httpClient.put(
      `http://localhost:5000/api/category/${id}`,
      payload
    );
  }

  public deleteCategory(id: string) {
    return this.httpClient.delete(`http://localhost:5000/api/category/${id}`);
  }

  public getDetailCategory(id: string) {
    return this.httpClient.get(`http://localhost:5000/api/category/${id}`);
  }
}
