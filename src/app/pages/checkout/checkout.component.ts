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
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private mapService: MapService,
    private orderService: OrderService,
    private toastService: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.getProductList();
    this.getUserInfo();
    this.initForm();
    this.observerInputSearchChange();
    this.calculateTotal();
    this.calculateDeliveryCharge();
    this.observeChangeDeliveryCharge();
  }

  get orderGroup() {
    return this.orderForm.get("order") as FormGroup;
  }

  get latlngGroup() {
    return this.orderForm.get("receivedAddressCoordinate") as FormGroup;
  }

  private getProductList() {
    this.productList$ = this.cartService.getProductList$();
  }

  private initForm() {
    this.orderForm = this.fb.group({
      order: this.fb.group({
        customerName: [this.userInfo.name, Validators.required],
        phone: [
          this.userInfo.phone,
          Validators.compose([
            Validators.required,
            Validators.pattern(PHONE_REGEX),
          ]),
        ],
        branchId: ["00lu07vqv0a46crjdi6f", Validators.required],
        userAccountId: [this.userInfo.userAccountId || this.userInfo.id],
        receivedType: ["delivery"],
        receivedAddress: [this.userInfo.address, Validators.required],
        details: [[]],
        paymentType: ["0", Validators.required],
        bankCode: ["NCB"],
        language: ["vn"],
      }),
      receivedAddressCoordinate: this.fb.group({
        latitude: [this.userInfo.latitude, Validators.required],
        longitude: [this.userInfo.longitude, Validators.required],
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
      .subscribe(() => {
        this.calculateDeliveryCharge();
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
  }

  private calculateDeliveryCharge() {
    this.mapService
      .getLengthFromOriginToDestinationGoongIo(
        { latitude: "21.01830435000005", longitude: "105.85120678400006" },
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
    this.patchProductCartToForm();

    if (
      this.orderForm.valid &&
      this.orderGroup.controls["details"].value.length
    ) {
      this.orderService
        .createOrder(this.orderForm.value)
        .pipe(
          tap(() => {
            this.toastService.success("Đặt đơn hàng thành công");
            this.deleteProductCart();
          }),
          catchError((error) => {
            this.toastService.error("Đặt đơn hàng thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((res: any) => {
          if (res.vpnUrl) {
            window.location.href = res.vpnUrl;
          }
        });
    }
  }

  private deleteProductCart() {
    const carts = this.storageService.get("PRODUCT_CART");
    carts.forEach((cart: any) => {
      this.cartService.removeCartItem(cart.productPriceId);
    });
    this.storageService.delete("PRODUCT_CART");
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

  ngOnDestroy(): void {
    this.subscriptions$.next(null);
    this.subscriptions$.complete();
  }
}
