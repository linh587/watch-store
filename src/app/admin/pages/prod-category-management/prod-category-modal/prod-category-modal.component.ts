import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-prod-category-modal",
  templateUrl: "./prod-category-modal.component.html",
  styleUrls: ["./prod-category-modal.component.scss"],
})
export class ProdCategoryModalComponent implements OnInit {
  constructor(public modalService: NgbModal) {}

  ngOnInit() {}

  public handleCloseModal() {
    this.modalService.dismissAll();
  }
}
