import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

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
}
