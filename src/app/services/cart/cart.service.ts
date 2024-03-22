import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, catchError, throwError } from "rxjs";
import { ProductsService } from "../products/products.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class CartService implements OnInit {
  private productList: any[] = [];
  private quantityList: number[] = [];

  private productList$ = new BehaviorSubject<any[]>(this.productList);
  private quantityList$ = new BehaviorSubject<number[]>(this.quantityList);

  constructor(
    private productsService: ProductsService,
    private toastService: ToastrService,
    private authService: AuthService
  ) {
    this.authService.hasToken$.subscribe((state: boolean) => {
      state && this.getCartProducts();
    });
  }

  ngOnInit(): void {}

  public getProductList$() {
    return this.productList$.asObservable();
  }

  public getQuantityList$() {
    return this.quantityList$.asObservable();
  }

  public getCartProducts() {
    this.productsService.getCart().subscribe((cartItems: any) => {
      this.productList = cartItems;
      this.quantityList = cartItems.map((item: any) => item.quality);
      this.productList$.next(this.productList);
      this.quantityList$.next(this.productList);
    });
  }

  public addToCart(payload: any) {
    this.productsService
      .addToCart(payload)
      .pipe(
        catchError((error) => {
          this.toastService.error("Thêm vào giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.toastService.success("Thêm vào giỏ hàng thành công");
        this.getCartProducts();
      });
  }

  public updateCartItem(productPriceId: string, payload: any) {
    this.productsService
      .updateCartItem(productPriceId, payload)
      .pipe(
        catchError((error) => {
          this.toastService.error("Cập nhật giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.toastService.success("Cập nhật giỏ hàng thành công");
        this.getCartProducts();
      });
  }

  public removeCartItem(productPriceId: string) {
    this.productsService
      .removeCartItem(productPriceId)
      .pipe(
        catchError((error) => {
          this.toastService.error("Xoá khỏi giỏ hàng thất bại");
          return throwError(() => error);
        })
      )
      .subscribe((_) => {
        this.productList = this.productList.filter(
          (item) => item.productPriceId !== productPriceId
        );

        this.toastService.success("Xoá khỏi giỏ hàng thành công");
        this.productList$.next(this.productList);
      });
  }
}
