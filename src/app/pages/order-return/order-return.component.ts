import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-return",
  templateUrl: "./order-return.component.html",
  styleUrls: ["./order-return.component.scss"],
})
export class OrderReturnComponent implements OnInit {
  public params: any;
  public orderReturn: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.observeRoute();
    this.checkPaymentStatus();
    console.log(this.params);
  }

  private observeRoute() {
    this.route.queryParams.subscribe((res) => {
      this.params = res;
    });
  }

  private checkPaymentStatus() {
    this.httpClient
      .post("http://localhost:8080/order/querydr", {
        orderId: this.params.vnp_TxnRef,
        transDate: this.params.vnp_PayDate,
      })
      .subscribe();
  }
}
