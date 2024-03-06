import { Component, Input, OnInit } from "@angular/core";
import { COLLECTIONS } from "../../../public/constants/common";


@Component({
  selector: "app-swiper-product",
  templateUrl: "./swiper-product.component.html",
  styleUrls: ["./swiper-product.component.scss"],
})
export class SwiperProductComponent implements OnInit {
  public collections = COLLECTIONS;
  @Input() slidesPerView: number = 4;
  @Input() gridOptions: any;

  constructor() {}

  ngOnInit() {}
}
