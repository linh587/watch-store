import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-product-modal",
  templateUrl: "./product-modal.component.html",
  styleUrls: ["./product-modal.component.scss"],
})
export class ProductModalComponent implements OnInit {
  constructor(public modalService: NgbModal) {}

  ngOnInit() {}

  public handleCloseModal() {
    this.modalService.dismissAll();
  }
}
