import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderStatusColor",
})
export class OrderStatusColorPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "waitVerify":
        return "warning";
      case "verified":
        return "primary";
      case "waitReceive":
        return "info";
      case "received":
        return "success";
      case "completed":
        return "info";
      case "cancelled":
        return "danger";
      default:
        return "--";
    }
  }
}
