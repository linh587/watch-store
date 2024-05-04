import { Component, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";
import { Router } from "@angular/router";
import { createCloudinaryImageLink } from "../../../public/helpers/images.helper";
import { Promotion } from "../../../models/promotion.model";
import { PromotionService } from "../../../services/promotion/promotion.service";

@Component({
  selector: "app-promotion-list",
  templateUrl: "./promotion-list.component.html",
  styleUrls: ["./promotion-list.component.scss"],
})
export class PromotionListComponent implements OnInit {
  public promotions$!: Observable<Promotion[]>;
  public createCloudinaryLink = createCloudinaryImageLink;
  public page = 1;

  constructor(
    private promotionService: PromotionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getPromotions();
  }

  private getPromotions() {
    this.promotions$ = this.promotionService
      .getPromotions()
      .pipe(map((res: any) => res.data));
  }

  public redirectPromotionDetail(promotionId: string) {
    this.router.navigate([`/promotions/${promotionId}`]).then();
  }
}
