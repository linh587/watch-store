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
} from "../../public/helpers/images.helper";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../../services/cart/cart.service";
import { ToastrService } from "ngx-toastr";
import { Rating } from "../../models/rating.model";
import { RatingService } from "../../services/rating/rating.service";

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
  public listRating: Rating[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private cartService: CartService,
    private toastService: ToastrService,
    private ratingService: RatingService
  ) {}

  ngOnInit() {
    this.getProductSizes();
    this.initForm();
    this.getRatingsOfProduct(this.productItem.id);
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
    this.productPrices.forEach((price) => {
      productSizes.push({
        id: price.productSizeId,
        name: price.productSizeName,
        price: price.price,
        priceId: price.id,
      });

      this.productSizes$.next(productSizes);
      this.selectedPrice = {
        price: productSizes[0].price,
        id: productSizes[0].priceId,
      };

      this.selectedSize = productSizes[0].name;
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

  private getRatingsOfProduct(id: string) {
    this.ratingService.getRatingsOfProduct(id).subscribe((res: any) => {
      this.listRating = res.data;
    });
  }
}
