import { Pipe, PipeTransform } from "@angular/core";
import { GLASS_SURFACE_MATERIAL } from "../constants/common";

@Pipe({
  name: "glassSurface",
})
export class GlassSurfacePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case GLASS_SURFACE_MATERIAL.SAPPHIRE:
        return "Kính Sapphire";
      case GLASS_SURFACE_MATERIAL.HARDLEX:
        return "Hardlex Crystal";
      case GLASS_SURFACE_MATERIAL.MINERAL:
        return "Kính Khoáng";
      case GLASS_SURFACE_MATERIAL.PLASTIC:
        return "Kính Nhựa";
      default:
        return "--";
    }
  }
}
