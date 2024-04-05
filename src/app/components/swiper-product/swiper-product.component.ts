import { Component, Input, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: "app-swiper-product",
  templateUrl: "./swiper-product.component.html",
  styleUrls: ["./swiper-product.component.scss"],
})
export class SwiperProductComponent implements OnInit {
  @Input() products: any;
  @Input() slidesPerView: number = 2;
  @Input() slidesPerViewBreakPoint!: number;
  @Input() gridOptions: any;
  public productPrice: any[] = [];

  get swiperConfig() {
    return {
      slidesPerView: this.slidesPerView,
      spaceBetween: 16,
      breakpoints: {
        992: {
          slidesPerView: this.slidesPerViewBreakPoint,
        },
      },
      slidesPerColumn: 2,
    };
  }

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
