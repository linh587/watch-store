import { Pipe, PipeTransform } from "@angular/core";
import { FACE_SHAPE } from "../constants/common";

@Pipe({
  name: "faceShape",
})
export class FaceShapePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case FACE_SHAPE.ROUND:
        return "Hình tròn";
      case FACE_SHAPE.RECTANGULAR:
        return "Hình chữ nhật";
      default:
        return "--";
    }
  }
}
