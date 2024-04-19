import { Component } from "@angular/core";
import { BACKGROUND_IMAGE_SLIDE } from "../../public/constants/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-header-swiper-slide",
  templateUrl: "./header-swiper-slide.component.html",
  styleUrls: ["./header-swiper-slide.component.scss"],
})
export class HeaderSwiperSlideComponent {
  public backgroundImage = BACKGROUND_IMAGE_SLIDE;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onClickDetail(event: any) {
    if (event) {
      this.router.navigate(["/collections"], {
        relativeTo: this.route,
        queryParams: { categoryId: "00lubcbtqlzoporwrcyl" },
        queryParamsHandling: "merge",
      });
    }
  }
}
