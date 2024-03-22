import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../public/constants/common";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { createCloudinaryImageLink } from "../../public/helpers/images";
import { CartService } from "../../services/cart/cart.service";
import { UserAccount } from "../../models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userInfo$!: Observable<UserAccount>;
  public productList$!: Observable<any>;
  public subMenu = SUB_MENU;
  public menuFixed: boolean = false;
  public createCloudinaryThumbLink = createCloudinaryImageLink;
  public total!: number;

  constructor(
    public router: Router,
    public modalService: NgbModal,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getCart();
    this.calculateTotal();
  }

  private getUserInfo() {
    this.userInfo$ = this.authService.getUserInfo();
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
    this.authService.logout();
  }

  private getCart() {
    this.productList$ = this.cartService.getProductList$();
  }

  public removeCartItem(productPriceId: string) {
    this.cartService.removeCartItem(productPriceId);
  }
}
