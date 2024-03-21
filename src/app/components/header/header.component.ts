import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../public/constants/common";
import { BehaviorSubject, Observable, forkJoin, map, switchMap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { StorageService } from "../../services/storage/storage.service";
import { ProductsService } from "../../services/products/products.service";
import { createCloudinaryImageLink } from "../../public/helpers/images";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userInfo$!: Observable<any>;
  public productList$ = new BehaviorSubject<any>(null);
  public subMenu = SUB_MENU;
  public menuFixed: boolean = false;
  public createCloudinaryThumbLink = createCloudinaryImageLink;
  public total: any;

  constructor(
    public router: Router,
    public modalService: NgbModal,
    private authService: AuthService,
    private storageService: StorageService,
    private productsService: ProductsService
  ) {
    this.userInfo$ = this.authService.getUserInfo();
  }

  ngOnInit(): void {
    this.getCart();
    this.calculateTotal();
  }

  private calculateTotal() {
    this.productList$.subscribe((res) => {
      const orderTotal = res?.reduce((total: any, item: any) => {
        const itemTotal = item.price * item.quantity;
        return total + itemTotal;
      }, 0);

      this.total = orderTotal;
    });
  }

  public openAuthenicationModal(type: string) {
    const modal = this.modalService.open(AuthenticationModalComponent, {
      centered: true,
      backdrop: "static",
      windowClass: "customize-modal",
    });

    if (type === "sign-in") {
      modal.componentInstance.active = 1;
    } else modal.componentInstance.active = 2;
  }

  @HostListener("window:scroll") onWindowScroll() {
    window.scrollY > 165 ? (this.menuFixed = true) : (this.menuFixed = false);
  }

  public logout() {
    this.storageService.deleteAll();
    window.location.reload();
  }

  private getCart() {
    this.productsService
      .getCart()
      .pipe(
        switchMap((carts: any) => {
          const requests = carts.map((cart: any) => {
            return this.productsService
              .getDetailProductPrice(cart.productPriceId)
              .pipe(
                switchMap((p: any) => {
                  const productWithPrice = {
                    ...p,
                    price: p.price,
                    quantity: cart.quality,
                  };
                  return this.productsService
                    .getDetailProduct(p.productId)
                    .pipe(
                      map((product: any) => {
                        return { ...product, ...productWithPrice };
                      })
                    );
                })
              );
          });
          return forkJoin(requests);
        })
      )
      .subscribe((productListWithPrice: any) => {
        this.productList$.next(productListWithPrice);
      });
  }
}
