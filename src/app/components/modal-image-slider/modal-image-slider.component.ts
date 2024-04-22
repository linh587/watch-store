import { Component, OnInit, ViewChild } from "@angular/core";
import { createCloudinaryImageLink } from "../../public/helpers/images.helper";
import { SwiperComponent } from "swiper/angular";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-image-slider",
  templateUrl: "./modal-image-slider.component.html",
  styleUrls: ["./modal-image-slider.component.scss"],
})
export class ModalImageSliderComponent implements OnInit {
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public thumbsSwiper: any;
  public images: any[] = [];
  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent;
  public currentSlide!: number;
  public countSlider!: number;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.countSlider = Number(this.currentSlide + 1);
  }

  public slideNext() {
    this.swiper?.swiperRef.slideNext(200);
  }
  public slidePrev() {
    this.swiper?.swiperRef.slidePrev(200);
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public onSlideChange(event: any) {
    this.countSlider = Number(event[0].activeIndex + 1);
  }
}
