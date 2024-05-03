import { Pipe, PipeTransform } from "@angular/core";
import { ORDER_STATUS } from "../constants/common";

@Pipe({
  name: "orderStatus",
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case ORDER_STATUS.WAIT_VERIFY:
        return "Chờ duyệt";
      case ORDER_STATUS.VERIFY:
        return "Đã duyệt";
      case ORDER_STATUS.WAIT_RECEIVE:
        return "Chờ giao hàng";
      case ORDER_STATUS.RECEIVED:
        return "Đã giao hàng";
      case ORDER_STATUS.COMPLETED:
        return "Đã giao hàng";
      case ORDER_STATUS.CANCELLED:
        return "Đã huỷ đơn hàng";
      default:
        return "--";
    }
  }
}
