import { Component } from "@angular/core";
import { OUR_PARTNERS } from "../../public/constants/common";

@Component({
  selector: "app-our-partners",
  templateUrl: "./our-partners.component.html",
})
export class OurPartnersComponent {
  public PARTNERS = OUR_PARTNERS;
}
