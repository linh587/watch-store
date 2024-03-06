import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../../public/constants/common";

@Component({
  selector: "app-client-header",
  templateUrl: "./client-header.component.html",
  styleUrls: ["./client-header.component.scss"],
})
export class ClientHeaderComponent {
  constructor(public router: Router, public modalService: NgbModal) {}

  public subMenu = SUB_MENU;
  public menuFixed: boolean = false;

  public openAuthenicationModal() {
    this.modalService.open(AuthenticationModalComponent, {
      centered: true,
      backdrop: "static",
      windowClass: "customize-modal",
    });
  }

  @HostListener("window:scroll") onWindowScroll() {
    window.scrollY > 165 ? (this.menuFixed = true) : (this.menuFixed = false);
  }
}
