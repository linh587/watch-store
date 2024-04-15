import { Component } from "@angular/core";
import { PARTNERS } from "../../public/constants/common";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  public PARTNERS = PARTNERS;

  constructor() {}
}
