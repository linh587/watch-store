import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: "app-quick-view-product-modal",
  templateUrl: "./quick-view-product-modal.component.html",
  styleUrls: ["./quick-view-product-modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickViewProductModalComponent implements OnInit {
  public productItem: any;
  public thumbsSwiper: any;
  public slidesPerView: number = 4;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
