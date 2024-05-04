import { Component, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";
import { Promotion } from "../../models/promotion.model";
import { PromotionService } from "../../services/promotion/promotion.service";
import { createCloudinaryImageLink } from "../../public/helpers/images.helper";
import { Router } from "@angular/router";

@Component({
  selector: "app-promotion-area",
  templateUrl: "./promotion-area.component.html",
  styleUrls: ["./promotion-area.component.scss"],
})
export class PromotionAreaComponent implements OnInit {
  public promotions$!: Observable<Promotion[]>;
  public createLinkImage = createCloudinaryImageLink;

  constructor(
    private promotionService: PromotionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  private getPromotions() {
    this.promotions$ = this.promotionService
      .getPromotions({ sort: "newest" })
      .pipe(map((res: any) => res.data.slice(0, 3)));
  }

  public onRedirectDetail(id: string) {
    this.router.navigate([`/promotions/${id}`]).then();
  }
}
