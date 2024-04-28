import { Component, Input } from "@angular/core";

@Component({
  selector: "app-swiper-product",
  templateUrl: "./swiper-product.component.html",
  styleUrls: ["./swiper-product.component.scss"],
})
export class SwiperProductComponent {
  @Input() products: any;
  @Input() slidesPerView: number = 2;
  @Input() slidesPerViewBreakPoint!: number;
  @Input() gridOptions: any;

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
}
