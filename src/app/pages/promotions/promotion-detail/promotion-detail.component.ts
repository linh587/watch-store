import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PromotionService } from "../../../services/promotion/promotion.service";
import { Promotion } from "../../../models/promotion.model";
import { Observable, map } from "rxjs";
import { createCloudinaryImageLink } from "../../../public/helpers/images.helper";

@Component({
  selector: "app-promotion-detail",
  templateUrl: "./promotion-detail.component.html",
  styleUrls: ["./promotion-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PromotionDetailComponent implements OnInit {
  public promotionId!: string;
  public promotion$!: Observable<Promotion>;
  public createCloudaryLink = createCloudinaryImageLink;

  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionService
  ) {}

  ngOnInit() {
    this.getPromotionId();
    this.getProductDetail();
  }

  private getPromotionId() {
    this.route.params.subscribe((params) => {
      this.promotionId = params["id"];
    });
  }

  private getProductDetail() {
    this.promotion$ = this.promotionService
      .getDetailPromotion(this.promotionId)
      .pipe(map((res: any) => res));
  }
}
