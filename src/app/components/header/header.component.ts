import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(public router: Router, public modalService: NgbModal) {}

  public openAuthenicationModal() {
    this.modalService.open(AuthenticationModalComponent, {
      centered: true,
      backdrop: "static",
      windowClass: "customize-modal"
    });
  }
}
