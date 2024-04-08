import { Component, Injector, OnInit } from "@angular/core";
import { OrderService } from "../../../services/order/order.service";
import { PURCHASE_ORDER_HEADER } from "../../../public/constants/common";
import { Order } from "../../../models/order.model";
import { StorageService } from "../../../services/storage/storage.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification/notification.service";
import { FormSearchOrderHistoryHelper } from "../../../public/helpers/form-search-order-history.helper";
import { FormGroup } from "@angular/forms";
import { SyncQueryParam } from "../../../public/helpers/params.helper";
import { SyncUrlWithSearchRealEstateHelper } from "../../../public/helpers/sync-url-with-search-real-estate.helper";

@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
  styleUrls: ["./purchase-order.component.scss"],
  providers: [FormSearchOrderHistoryHelper, SyncUrlWithSearchRealEstateHelper],
})
export class PurchaseOrderComponent implements OnInit {
  @SyncQueryParam({
    parseIgnore: [""],
  })
  public searchForm!: FormGroup;

  public page = 1;
  public orderList$ = new BehaviorSubject<Order[]>([]);
  public PURCHASE_ORDER_HEADER = PURCHASE_ORDER_HEADER;

  constructor(
    public injector: Injector,
    private orderService: OrderService,
    private storageService: StorageService,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private notificationService: NotificationService,
    private formSearch: FormSearchOrderHistoryHelper
  ) {
    this.searchForm = this.formSearch.form;
  }

  ngOnInit() {
    this.getListOrder();
    this.initForm();
    this.observeParamsChange();
  }

  private initForm() {
    this.searchForm.patchValue({
      page: "",
      status: "",
      sort: "newest",
      createdFrom: null,
      createdTo: null,
    });
  }

  public observeParamsChange() {
    this.searchForm.valueChanges.subscribe((res) => {
      this.orderService.getOrders(res).subscribe((res: any) => {
        this.orderList$.next(res.data);
      });
    });
  }

  private getListOrder() {
    this.orderService
      .getOrders({
        sort: "newest",
      })
      .subscribe((res: any) => {
        this.orderList$.next(res.data);
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
      .subscribe(() => {
        this.getListOrder();
        this.notificationService.getListNotification();
      });
  }

  public directOrderDetail(orderId: string) {
    this.router.navigate([`/order-history/${orderId}`]).then();
  }
}
