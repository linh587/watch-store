import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { ProductsService } from "../../services/products/products.service";
import {
  createCloudinaryImageLink,
  createCloudinaryThumbLink,
} from "../../public/helpers/images";

SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public thumbsSwiper: any;
  public slidesPerView: number = 4;
  public id!: string;
  public productItem: any;
  public active = 1;
  public createCloudinaryThumbLink = createCloudinaryThumbLink;
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public productPrices: any[] = [];
  public priceOfThisProduct: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProductId();
    this.getListProductPrice();
    this.getProductItem();
  }

  private getProductId() {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
  }

  private getProductItem() {
    this.productsService.getDetailProduct(this.id).subscribe((res) => {
      this.productItem = res;
    });
  }

  public onNavChange($event: any) {}

  private getListProductPrice() {
    this.productsService.getProductPrices().subscribe((res: any) => {
      this.productPrices = res.filter(
        (p: any) => p?.productId === this.productItem?.id
      );
    });
  }
}
