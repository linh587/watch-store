import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-season-collection-banner",
  templateUrl: "./season-collection-banner.component.html",
  styleUrls: ["./season-collection-banner.component.scss"],
})
export class SeasonCollectionBannerComponent {
  constructor(public router: Router) {}
}
