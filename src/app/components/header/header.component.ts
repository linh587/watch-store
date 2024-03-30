import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../public/constants/common";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { createCloudinaryImageLink } from "../../public/helpers/images.helper";
import { CartService } from "../../services/cart/cart.service";
import { UserAccount } from "../../models/user.model";
import { ProductsService } from "../../services/products/products.service";
import { DatePipe } from "@angular/common";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  public userInfo$!: Observable<UserAccount>;
  public productList$!: Observable<any>;
  public subMenu = SUB_MENU;
  public menuFixed: boolean = false;
  public createCloudinaryThumbLink = createCloudinaryImageLink;
  public total!: number;
  public categories: any[] = [];
  @ViewChild("inputSearch") inputSearch!: ElementRef;
  public notifications: any[] = [];

  constructor(
    public router: Router,
    public modalService: NgbModal,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getCart();
    this.calculateTotal();
    this.getAllCategory();
    this.getNotifications();
  }

  private getUserInfo() {
    this.userInfo$ = this.authService.getUserInfo();
  }

  private getAllCategory() {
    this.productService.getCategory().subscribe((res: any) => {
      this.categories = res;
    });
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

  public onSearch() {
    const inputSearch = this.inputSearch.nativeElement.value;

    this.router
      .navigate(["/collections"], {
        relativeTo: this.route,
        queryParamsHandling: "merge",
        queryParams: { s: inputSearch },
      })
      .then();
  }

  public onSearchCategory(id: string) {
    this.router
      .navigate(["/collections"], {
        relativeTo: this.route,
        queryParamsHandling: "merge",
        queryParams: { categoryId: id },
      })
      .then();
  }

  public getNotifications() {
    const userInfo = this.storageService.get("AUTH_USER")?.id;
    if (userInfo) {
      this.authService.getNotifications().subscribe((res: any) => {
        this.notifications = res.data;
      });
    }
  }

  public redirectOrderHistory(linkTo: string) {
    window.location.href = linkTo;
  }
}
