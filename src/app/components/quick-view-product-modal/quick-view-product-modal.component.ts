import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-quick-view-product-modal",
  templateUrl: "./quick-view-product-modal.component.html",
  styleUrls: ["./quick-view-product-modal.component.scss"],
})
export class QuickViewProductModalComponent implements OnInit {
  @Input() productItem: any;
  public initialSlide: number = 0;
  public thumbsSwiper: any;
  public slidesPerView: number = 10;

  constructor() {}

  ngOnInit() {}

  public activeIndexChange(event: any) {}
}
