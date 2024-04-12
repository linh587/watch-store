import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaymentService } from "../../services/payment/payment.service";

@Component({
  selector: "app-order-return",
  templateUrl: "./order-return.component.html",
})
export class OrderReturnComponent implements OnInit {
  public params: any;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.observeRoute();
    this.checkPaymentStatus();
  }

  private observeRoute() {
    this.route.queryParams.subscribe((res) => {
      this.params = res;
    });
  }

  private checkPaymentStatus() {
    this.paymentService
      .checkPaymentStatus({
        orderId: this.params.vnp_TxnRef,
        transDate: this.params.vnp_PayDate,
      })
      .subscribe();
  }
}
