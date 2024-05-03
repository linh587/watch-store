import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../services/order/order.service";
import {
  BehaviorSubject,
  Subject,
  forkJoin,
  map,
  mergeMap,
  takeUntil,
} from "rxjs";
import { ProductsService } from "../../services/products/products.service";
import { createCloudinaryImageLink } from "../../public/helpers/images.helper";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RatingModalComponent } from "../../components/rating-modal/rating-modal.component";
import { ORDER_STATUS } from "../../public/constants/common";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.scss"],
})
export class OrderHistoryComponent implements OnInit {
  public orderId!: string;
  public orderDetail$ = new BehaviorSubject<any>(null);
  public subscription$ = new Subject();
  public detailProducts$ = new BehaviorSubject<any>(null);
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public couponDetail: any;
  public ORDER_STATUS = ORDER_STATUS

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getOrderId();
    this.getOrderDetail();
  }

  private getOrderId() {
    this.route.params.subscribe((params) => {
      this.orderId = params["orderId"];
    });
  }

  public getOrderDetail() {
    this.orderService.getOrderDetail(this.orderId).subscribe((res: any) => {
      this.orderDetail$.next(res);
      this.getCouponDetail(res);
      this.getProduct();
    });
  }

  private getCouponDetail(response: any) {
    this.orderService
      .couponDetail(response.couponCode)
      .subscribe((res: any) => {
        this.couponDetail = res;
      });
  }

  public onOpenRatingModal(productId: string) {
    const modalRef = this.modalService.open(RatingModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.productId = productId;
  }

  private getProduct() {
    this.orderDetail$
      .pipe(
        takeUntil(this.subscription$),
        mergeMap((res: any) => {
          const detailObservables = res?.details?.map((detail: any) =>
            this.productService
              .getDetailProductPrice(detail?.productPriceId)
              .pipe(
                mergeMap((productPrice: any) =>
                  forkJoin({
                    productInfo: this.productService.getDetailProduct(
                      productPrice?.productId
                    ),
                  }).pipe(
                    map((data: any) => {
                      return {
                        detail: detail,
                        productPrice: productPrice,
                        productInfo: data.productInfo,
                        productSizeName: productPrice.productSizeName,
                      };
                    })
                  )
                )
              )
          );

          return forkJoin(detailObservables);
        })
      )
      .subscribe((combinedData: any) => {
        this.detailProducts$.next(combinedData);
      });
  }
}
