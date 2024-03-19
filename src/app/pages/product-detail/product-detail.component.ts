import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { COLLECTIONS } from "../../public/constants/common";
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public thumbsSwiper: any;
  public slidesPerView: number = 4;
  public id!: number;
  public productItem: any;
  public COLLECTIONS = COLLECTIONS;
  public active = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getProductId();
    this.getProductItem();
  }

  private getProductId() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });
  }

  private getProductItem() {
    this.productItem = this.COLLECTIONS.find((p) => p.id === this.id);

    console.log(this.productItem);
  }

  public onNavChange($event: any) {

  }
}
