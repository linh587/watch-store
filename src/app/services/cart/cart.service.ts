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
import { StorageService } from "../storage/storage.service";
import { UserAccount } from "../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class CartService implements OnDestroy {
  public productList$ = new BehaviorSubject<Product[]>([]);
  private subscription$ = new Subject();
  public currentUser!: UserAccount;

  constructor(
    private productsService: ProductsService,
    private toastService: ToastrService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.checkAllowCallAPI();
  }

  private checkAllowCallAPI() {
    this.authService.getUserInfo().subscribe((user) => {
      this.currentUser = user;
      user ? this.getCartProducts() : this.getCartStorage();
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

  public getCartStorage() {
    const cartProducts = this.storageService.get("CART_DETAIL") || [];

    if (cartProducts.length) {
      const requests: any = cartProducts.map((cart: any) => {
        return this.productsService.getDetailProductPrice(cart.productPriceId);
      });

      forkJoin(requests)
        .pipe(takeUntil(this.subscription$))
        .subscribe((details: any) => {
          const updatedCart = cartProducts.map((cart: any, index: number) => {
            return {
              ...details[index],
              productPriceId: cart.productPriceId,
              quality: cart.quality,
            };
          });

          this.productList$.next(updatedCart);
        });
    } else {
      this.productList$.next([]);
    }
  }

  public addToCart(payload: InformationToCreateCartDetail) {
    this.currentUser
      ? this.userAddToCart(payload)
      : this.guestAddToCart(payload);
  }

  private userAddToCart(payload: InformationToCreateCartDetail) {
    this.productsService
      .addToCart(payload)
      .pipe(
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastError("Thêm vào giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
        this.toastSuccess("Thêm vào giỏ hàng thành công");
      });
  }

  private guestAddToCart(payload: InformationToCreateCartDetail) {
    const cartItems = this.storageService.get("CART_DETAIL") || [];
    const index = cartItems.findIndex(
      (item: any) => item.productPriceId === payload.productPriceId
    );
    if (index !== -1) {
      cartItems[index].quality += payload.quality;
    } else {
      cartItems.push({
        productPriceId: payload.productPriceId,
        quality: payload.quality,
      });
    }
    this.storageService.set("CART_DETAIL", cartItems);
    this.getCartStorage();
    this.toastSuccess("Thêm vào giỏ hàng thành công");
  }

  public updateCartItem(
    productPriceId: string,
    payload: InformationToUpdateCartDetail
  ) {
    this.currentUser
      ? this.userUpdateCartItem(productPriceId, payload)
      : this.guestUpdateCartItem(productPriceId, payload);
  }

  private userUpdateCartItem(
    productPriceId: string,
    payload: InformationToUpdateCartDetail
  ) {
    this.productsService
      .updateCartItem(productPriceId, payload)
      .pipe(
        debounceTime(500),
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastError("Cập nhật giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
      });
  }

  private guestUpdateCartItem(
    productPriceId: string,
    payload: InformationToUpdateCartDetail
  ) {
    let cartItems = this.storageService.get("CART_DETAIL") || [];

    const index = cartItems.findIndex(
      (item: any) => item.productPriceId === productPriceId
    );

    if (index !== -1) {
      cartItems[index].quality = payload.quality;

      this.storageService.set("CART_DETAIL", cartItems);
      this.getCartStorage();
    }
  }

  public removeCartItem(productPriceId: string) {
    this.currentUser
      ? this.userRemoveCartItem(productPriceId)
      : this.guestRemoveCartItem(productPriceId);
  }

  private userRemoveCartItem(productPriceId: string) {
    this.productsService
      .removeCartItem(productPriceId)
      .pipe(
        takeUntil(this.subscription$),
        catchError((error) => {
          this.toastError("Xoá khỏi giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.getCartProducts();
      });
  }

  private guestRemoveCartItem(productPriceId: string) {
    let cartItems = this.storageService.get("CART_DETAIL") || [];
    cartItems = cartItems.filter(
      (item: any) => item.productPriceId !== productPriceId
    );
    this.storageService.set("CART_DETAIL", cartItems);
    this.getCartStorage();
    this.toastSuccess("Xoá khỏi giỏ hàng thành công");
  }

  private toastSuccess(message: string) {
    this.toastService.success(message);
  }

  private toastError(message: string) {
    this.toastService.error(message);
  }

  ngOnDestroy(): void {
    this.subscription$.next(null);
    this.subscription$.complete();
  }
}
