import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "paymentStatus",
})
export class PaymentStatusPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case "paid":
        return "Đã thanh toán";
      case "not-paid":
        return "Chưa thanh toán";
      default:
        return "Chưa thanh toán";
    }
  }
}
