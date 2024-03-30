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

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
})
export class OrderHistoryComponent implements OnInit {
  public orderId!: string;
  public orderDetail$ = new BehaviorSubject<any>(null);
  public subscription$ = new Subject();
  public detailProducts$ = new BehaviorSubject<any>(null);
  public createCloudinaryImageLink = createCloudinaryImageLink

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductsService
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
      this.getProduct();
    });
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
                    productSize: this.productService.getDetailProductSize(
                      productPrice?.productSizeId
                    ),
                  }).pipe(
                    map((data: any) => {
                      return {
                        detail: detail,
                        productPrice: productPrice,
                        productInfo: data.productInfo,
                        productSize: data.productSize,
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
