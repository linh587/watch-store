import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../../public/constants/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    public modalService: NgbModal,
  ) {}

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
