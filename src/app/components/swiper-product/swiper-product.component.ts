import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-swiper-product",
  templateUrl: "./swiper-product.component.html",
  styleUrls: ["./swiper-product.component.scss"],
})
export class SwiperProductComponent implements OnInit {
  @Input() slidesPerView: number = 4;

  constructor() {}

  ngOnInit() {}
}
