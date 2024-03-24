import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderStatus",
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case "waitVerify":
        return "Chờ duyệt";
      case "verified":
        return "Đã duyệt";
      case "waitReceive":
        return "Chờ giao hàng";
      case "received":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã huỷ đơn hàng";
      default:
        return "--";
    }
  }
}
