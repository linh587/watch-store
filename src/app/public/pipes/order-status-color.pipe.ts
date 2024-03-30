import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderStatusColor",
})
export class OrderStatusColorPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    switch (value) {
      case "waitVerify":
        return "warning";
      case "verified":
        return "primary";
      case "waitReceive":
        return "info";
      case "received":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "--";
    }
  }
}
