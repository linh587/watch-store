import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CartService } from "../../services/cart/cart.service";
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
  throwError,
} from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../../services/storage/storage.service";
import { MapService } from "../../services/map/map.service";
import { OrderService } from "../../services/order/order.service";
import { ToastrService } from "ngx-toastr";
import { PHONE_REGEX } from "../../public/constants/regex";
import { calculateDeliveryCharge } from "../../public/helpers/utils";
import { BranchService } from "../../services/branch/branch.service";
import { createCloudinaryImageLink } from "../../public/helpers/images.helper";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification/notification.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public productList$!: Observable<any[]>;
  public orderForm!: FormGroup;
  public userInfo!: any;
  public searchSuggestion$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public subscriptions$ = new Subject();
  public showSuggestion: boolean = false;
  @ViewChild("suggestionSearch")
  public searchElementRef!: ElementRef;
  public total!: number;
  public deliveryCharge!: number;
  public branchs$ = new BehaviorSubject<any>(null);
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public coupons$ = new BehaviorSubject<any>(null);
  public couponSuggestion: boolean = false;
  public decreaseMoney: any;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private mapService: MapService,
    private orderService: OrderService,
    private toastService: ToastrService,
    private branchService: BranchService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getProductList();
    this.getUserInfo();
    this.initForm();
    this.patchProductCartToForm();
    this.observerInputSearchChange();
    this.calculateTotal();
    this.calculateDeliveryCharge();
    this.observeChangeDeliveryCharge();
    this.getAllBranchs();
    this.couponRelation();
  }

  get orderGroup() {
    return this.orderForm.get("order") as FormGroup;
  }

  get latlngGroup() {
    return this.orderForm.get("receivedAddressCoordinate") as FormGroup;
  }

  private couponRelation() {
    if (this.orderGroup.controls["details"].value.length) {
      this.orderService
        .couponRelation({
          order: this.orderGroup.getRawValue(),
        })
        .subscribe((res: any) => {
          this.coupons$.next(res);
        });
    }
  }

  public getAllBranchs() {
    this.branchService.getAllBranch().subscribe((res: any) => {
      this.branchs$.next(res);
    });
  }

  private getProductList() {
    this.productList$ = this.cartService.getProductList$();
  }

  private initForm() {
    this.orderForm = this.fb.group({
      order: this.fb.group({
        customerName: [this.userInfo?.name, Validators.required],
        phone: [
          this.userInfo?.phone,
          Validators.compose([
            Validators.required,
            Validators.pattern(PHONE_REGEX),
          ]),
        ],
        branchId: ["00lu07vqv0a46crjdi6f", Validators.required],
        receivedType: ["delivery"],
        receivedAddress: [this.userInfo?.address, Validators.required],
        details: [[]],
        paymentType: ["0", Validators.required],
        bankCode: ["NCB"],
        language: ["vn"],
        couponCode: [null],
        note: [""],
      }),
      receivedAddressCoordinate: this.fb.group({
        latitude: [this.userInfo?.latitude, Validators.required],
        longitude: [this.userInfo?.longitude, Validators.required],
      }),
    });
  }

  private observeChangeDeliveryCharge() {
    this.orderGroup.controls["branchId"].valueChanges
      .pipe(
        takeUntil(this.subscriptions$),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((branch: any) => {
        this.branchService.getBranchDetail(branch).subscribe((res: any) => {
          this.calculateDeliveryCharge(res.latitude, res.longitude);
        });
      });

    this.orderForm.controls["receivedAddressCoordinate"].valueChanges
      .pipe(
        takeUntil(this.subscriptions$),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.calculateDeliveryCharge();
      });

    this.orderGroup.controls["couponCode"].valueChanges.subscribe(() => {
      this.orderService
        .decreaseMoney({
          couponCode: this.orderGroup.get("couponCode")?.value,
          order: this.orderGroup.getRawValue(),
        })
        .subscribe((res) => {
          this.decreaseMoney = res;
        });
    });
  }

  private calculateDeliveryCharge(branchLat?: any, branchLng?: any) {
    this.mapService
      .getLengthFromOriginToDestinationGoongIo(
        {
          latitude: branchLat || "21.00418966600006",
          longitude: branchLng || "105.84547508400004",
        },
        {
          latitude: this.latlngGroup.controls["latitude"].value,
          longitude: this.latlngGroup.controls["longitude"].value,
        }
      )
      .subscribe((res) => {
        const deliveryCharge = calculateDeliveryCharge(res);
        this.deliveryCharge = deliveryCharge;
      });
  }

  private getUserInfo() {
    this.userInfo = this.storageService.get("USER_LOGIN");
  }

  public onPlaceOrder() {
    if (
      this.orderForm.valid &&
      this.orderGroup.controls["details"].value.length
    ) {
      this.orderService
        .createOrder(this.orderForm.value)
        .pipe(
          tap(() => {
            this.toastService.success("Đặt đơn hàng thành công");
            this.cartService.getCartProducts();
            this.notificationService.getListNotification();
          }),
          catchError((error) => {
            this.toastService.error("Đặt đơn hàng thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((res: any) => {
          if (res.vpnUrl) {
            window.location.href = res.vpnUrl;
          } else {
            this.router.navigate(["/"]).then();
          }
        });
    }
  }

  public patchProductCartToForm() {
    let productList;

    this.productList$.subscribe((products) => {
      productList = products.map((product: any) => {
        return {
          productPriceId: product.productPriceId,
          quality: product.quality,
        };
      });
    });
    this.orderGroup.controls["details"].setValue(productList);
  }

  public observerInputSearchChange() {
    this.orderGroup.controls["receivedAddress"].valueChanges
      .pipe(
        takeUntil(this.subscriptions$),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((address: string) => {
        this.mapService.searchAddressGoongIo(address).subscribe((res: any) => {
          this.searchSuggestion$.next(res);
        });
      });
  }

  public patchAddressToForm(search: any) {
    this.orderGroup.controls["receivedAddress"].setValue(
      search.formattedAddress
    );
    this.latlngGroup.controls["latitude"].setValue(search.latitude);
    this.latlngGroup.controls["longitude"].setValue(search.longitude);

    this.hideSearchSuggestion();
  }

  public showSearchSuggestion() {
    this.showSuggestion = true;
  }

  public hideSearchSuggestion() {
    this.showSuggestion = false;
  }

  private calculateTotal() {
    this.productList$.subscribe((res) => {
      const orderTotal = res?.reduce((total: number, item: any) => {
        const itemTotal = item.price * item.quality;
        return total + itemTotal;
      }, 0);
      this.total = orderTotal;
    });
  }

  public onRedirectProductDetail(productId: string) {
    this.router.navigate([`/product/${productId}`]).then();
  }

  public onClickItem(couponCode: string) {
    this.couponSuggestion = false;
    this.orderGroup.get("couponCode")?.setValue(couponCode);
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(null);
    this.subscriptions$.complete();
  }
}
