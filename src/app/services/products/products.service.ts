import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseHttpRequest {}
