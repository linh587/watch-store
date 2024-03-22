import { Component, OnInit } from "@angular/core";
import { CART_TABLE_HEADER } from "../../public/constants/common";
import { CartService } from "../../services/cart/cart.service";
import { Observable } from "rxjs";
import { createCloudinaryImageLink } from "../../public/helpers/images";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public HEADER = CART_TABLE_HEADER;
  public productList$!: Observable<any>;
  public total!: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCart();
    this.calculateTotal();
  }

  private getCart() {
    this.productList$ = this.cartService.getProductList$();
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

  public removeCartItem(priceId: string) {
    this.cartService.removeCartItem(priceId);
  }

  public updateCartItem(event: any, priceId: string) {
    const payload = {
      quality: event.target.value,
    };

    this.cartService.updateCartItem(priceId, payload);
  }
}
