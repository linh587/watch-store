import { Component, Input, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: "app-swiper-product",
  templateUrl: "./swiper-product.component.html",
  styleUrls: ["./swiper-product.component.scss"],
})
export class SwiperProductComponent implements OnInit {
  @Input() products: any;
  @Input() slidesPerView: number = 4;
  @Input() gridOptions: any;
  public productPrice: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProductPrices();
  }

  private getProductPrices() {
    this.productsService.getProductPrices().subscribe((res: any) => {
      this.productPrice = res;
    });
  }
}
