import { Component } from "@angular/core";
import { BACKGROUND_IMAGE_SLIDE } from "../../public/constants/common";

@Component({
  selector: "app-header-swiper-slide",
  templateUrl: "./header-swiper-slide.component.html",
  styleUrls: ["./header-swiper-slide.component.scss"],
})
export class HeaderSwiperSlideComponent {
  public backgroundImage = BACKGROUND_IMAGE_SLIDE;
}
