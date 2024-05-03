import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "getTypePriceCoupon",
})
export class GetTypePriceCouponPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "money":
        return "đ";
      case "percent":
        return "%";
      default:
        return "đ";
    }
  }
}
