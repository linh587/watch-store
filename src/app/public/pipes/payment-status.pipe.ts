import { Pipe, PipeTransform } from "@angular/core";
import { PAYMENT_STATUS } from "../constants/common";

@Pipe({
  name: "paymentStatus",
})
export class PaymentStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case PAYMENT_STATUS.PAID:
        return "Đã thanh toán";
      case PAYMENT_STATUS.NOT_PAID:
        return "Chưa thanh toán";
      default:
        return "Chưa thanh toán";
    }
  }
}
