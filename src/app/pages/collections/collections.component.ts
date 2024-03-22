import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  public productList: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getListProduct();
  }

  private getListProduct() {
    this.productsService.getProducts().subscribe((res: any) => {
      this.productList = res.data;
    });
  }
}
