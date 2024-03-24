import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../../services/order/order.service";
import { PURCHASE_ORDER_HEADER } from "../../../public/constants/common";
import { Order } from "../../../models/order.model";

@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
  styleUrls: ["./purchase-order.component.scss"],
})
export class PurchaseOrderComponent implements OnInit {
  public orderList: Order[] = [];
  public PURCHASE_ORDER_HEADER = PURCHASE_ORDER_HEADER;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getListOrder();
  }

  private getListOrder() {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orderList = res.data;
    });
  }
}
