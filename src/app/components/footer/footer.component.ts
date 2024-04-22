import { Component, OnInit } from "@angular/core";
import { SOCIAL_ICONS } from "../../public/constants/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  public SOCIAL_ICONS = SOCIAL_ICONS;

  constructor(public router: Router) {}

  ngOnInit() {}
}
