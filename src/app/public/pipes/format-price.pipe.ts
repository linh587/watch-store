import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatPrice",
})
export class FormatPricePipe implements PipeTransform {
  transform(value: number): string {
    if (value || value === 0) {
      const replaceZero = value.toString().replace(".00", "");

      let formattedValue = replaceZero
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      formattedValue += "đ";
      return formattedValue;
    } else {
      return "";
    }
  }
}
