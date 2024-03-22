import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import {
  createCloudinaryImageLink,
  createCloudinaryThumbLink,
} from "../../public/helpers/images";
import { ProductsService } from "../../services/products/products.service";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../../services/cart/cart.service";
import { ToastrService } from "ngx-toastr";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: "app-quick-view-product-modal",
  templateUrl: "./quick-view-product-modal.component.html",
  styleUrls: ["./quick-view-product-modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickViewProductModalComponent implements OnInit {
  public createCloudinaryThumbLink = createCloudinaryThumbLink;
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public thumbsSwiper: any;
  public slidesPerView: number = 4;
  public productItem: any;
  public productPrices: any[] = [];
  public productSizes$ = new BehaviorSubject<any[]>([]);
  public selectedPrice: any;
  public selectedSize!: string;
  public addToCartForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private cartService: CartService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getProductSizes();
    this.initForm();
  }

  private initForm() {
    this.addToCartForm = this.fb.group({
      quantity: [1, Validators.required],
    });
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public getProductSizes() {
    let productSizes: any = [];
    this.productPrices.forEach((res) => {
      this.productsService
        .getDetailProductSize(res.productSizeId)
        .subscribe((data) => {
          productSizes.push({
            ...data,
            price: res.price,
            priceId: res.id,
          });
          this.productSizes$.next(productSizes);
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
}
