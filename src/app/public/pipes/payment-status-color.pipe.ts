import { Pipe, PipeTransform } from "@angular/core";
import { PAYMENT_STATUS } from "../constants/common";

@Pipe({
  name: "paymentStatusColor",
})
export class PaymentStatusColorPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case PAYMENT_STATUS.PAID:
        return "dark";
      case PAYMENT_STATUS.NOT_PAID:
        return "danger";
      default:
        return "--";
    }
  }
}
