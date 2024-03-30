import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../../services/order/order.service";
import { PURCHASE_ORDER_HEADER } from "../../../public/constants/common";
import { Order } from "../../../models/order.model";
import { StorageService } from "../../../services/storage/storage.service";
import { ToastrService } from "ngx-toastr";
import { catchError, tap, throwError } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
  styleUrls: ["./purchase-order.component.scss"],
})
export class PurchaseOrderComponent implements OnInit {
  public orderList: Order[] = [];
  public PURCHASE_ORDER_HEADER = PURCHASE_ORDER_HEADER;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.getListOrder();
  }

  private getListOrder() {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orderList = res.data;
    });
  }

  public onOpenConfirmModal(title?: string, content?: string) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modal.componentInstance.title = title;
    modal.componentInstance.content = content;

    return modal;
  }

  public onCancelOrder(id: string) {
    this.onOpenConfirmModal("Huỷ đơn", "Bạn có chắc chắn muốn huỷ đơn này?")
      .closed.pipe(
        tap((state: boolean) => {
          state && this.handleCancelOrder(id);
        })
      )
      .subscribe();
  }
  public handleCancelOrder(id: string) {
    const userAccountId = this.storageService.get("USER_LOGIN").id;
    this.orderService
      .cancelOrder(id, userAccountId)
      .pipe(
        tap((_) => this.toastService.success("Huỷ đơn thành công")),
        catchError((error) => {
          this.toastService.error("Huỷ thất bại vui lòng liên hệ shop");
          return throwError(() => error);
        })
      )
      .subscribe(() => this.getListOrder());
  }

  public directOrderDetail(orderId: string) {
    this.router.navigate([`/order-history/${orderId}`]).then();
  }
}
