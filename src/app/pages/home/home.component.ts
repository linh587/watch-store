import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public productList: any;

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
