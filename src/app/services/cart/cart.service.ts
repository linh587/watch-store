import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  Subject,
  catchError,
  debounceTime,
  forkJoin,
  of,
  switchMap,
  takeUntil,
  throwError,
} from "rxjs";
import { ProductsService } from "../products/products.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";
import { Product } from "../../models/product.model";
import {
  InformationToCreateCartDetail,
  InformationToUpdateCartDetail,
} from "../../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService implements OnDestroy {
  public productList$ = new BehaviorSubject<Product[]>([]);
  private subscription$ = new Subject();

  constructor(
    private productsService: ProductsService,
    private toastService: ToastrService,
    private authService: AuthService
  ) {
    this.checkAllowCallAPI();
  }

  private checkAllowCallAPI() {
    this.authService.getUserInfo().subscribe((user) => {
      user && this.getCartProducts();
    });
  }

  public getProductList$() {
    return this.productList$.asObservable();
  }

  public getCartProducts() {
    this.productsService
      .getCart()
      .pipe(
        takeUntil(this.subscription$),
        switchMap((carts: any) => {
          if (carts.length) {
            const requests = carts.map((cart: any) => {
              return this.productsService.getCartDetail(cart.productPriceId);
            });
            return forkJoin(requests);
          }

          return of([]);
        })
      )
      .subscribe((products: any) => {
        this.productList$.next(products);
      });
  }

  public addToCart(payload: InformationToCreateCartDetail) {
    this.productsService
      .addToCart(payload)
      .pipe(
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastService.error("Thêm vào giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
        this.toastService.success("Thêm vào giỏ hàng thành công");
      });
  }

  public updateCartItem(
    productPriceId: string,
    payload: InformationToUpdateCartDetail
  ) {
    this.productsService
      .updateCartItem(productPriceId, payload)
      .pipe(
        debounceTime(500),
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastService.error("Cập nhật giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
      });
  }

  public removeCartItem(productPriceId: string) {
    this.productsService
      .removeCartItem(productPriceId)
      .pipe(
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastService.error("Xoá khỏi giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next(null);
    this.subscription$.complete();
  }
}
