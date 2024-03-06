import { Component } from "@angular/core";
import { NgbModal, NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-authentication-modal",
  templateUrl: "./authentication-modal.component.html",
  styleUrls: ["./authentication-modal.component.scss"],
})
export class AuthenticationModalComponent {
  public active = 1;
  public activeNav!: number;
  constructor(private modalService: NgbModal) {}

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public onNavChange(event: NgbNavChangeEvent) {
    this.activeNav = event.nextId;
  }
}
