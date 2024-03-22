import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { ProductsService } from "../../services/products/products.service";
import {
  createCloudinaryImageLink,
  createCloudinaryThumbLink,
} from "../../public/helpers/images";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../../services/cart/cart.service";
import { ToastrService } from "ngx-toastr";

SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  public createCloudinaryThumbLink = createCloudinaryThumbLink;
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public thumbsSwiper: any;
  public slidesPerView: number = 4;
  public id!: string;
  public productItem!: any;
  public active = 1;
  public productItem$ = new BehaviorSubject<any[]>([]);
  public productPrices: any[] = [];
  public productPrices$ = new BehaviorSubject<any[]>([]);
  public productSizes$ = new BehaviorSubject<any[]>([]);
  public selectedPrice: any;
  public selectedSize!: string;
  public addToCartForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private cartService: CartService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getProductId();
    this.getProductItem();
    this.getListProductPrice();
    this.getProductSizes();
    this.initForm();
  }

  private initForm() {
    this.addToCartForm = this.fb.group({
      quantity: [1, Validators.required],
    });
  }

  private getProductId() {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
  }

  public getProductItem() {
    this.productsService.getDetailProduct(this.id).subscribe((res: any) => {
      this.productItem = res;
    });
  }

  public getProductSizes() {
    let productSizes: any = [];
    this.productPrices$.subscribe((prices) => {
      prices.forEach((price) => {
        this.productsService
          .getDetailProductSize(price.productSizeId)
          .subscribe((data) => {
            productSizes.push({
              ...data,
              price: price.price,
              priceId: price.id,
            });
            this.productSizes$.next(productSizes);
          });
      });
    });
  }

  public onSizeChange(size: any) {
    this.selectedPrice = {
      price: size?.price,
      id: size?.priceId,
    };
    this.selectedSize = size.name;
  }

  public onAddToCart() {
    if (this.addToCartForm.valid && this.selectedPrice?.id) {
      const payload = {
        productPriceId: this.selectedPrice.id,
        quality: this.addToCartForm.controls["quantity"].value,
      };
      this.cartService.addToCart(payload);
    } else {
      this.toastService.info("Vui lòng chọn size sản phẩm");
    }
  }

  public getListProductPrice() {
    this.productsService.getProductPrices().subscribe((res: any) => {
      this.productPrices = res.filter((p: any) => p?.productId === this.id);
      this.productPrices$.next(this.productPrices);
    });
  }
}
