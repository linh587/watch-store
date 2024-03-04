import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QuickViewProductModalComponent } from "../quick-view-product-modal/quick-view-product-modal.component";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  public onOpenQuickViewProductModal(event: Event) {
    event.preventDefault();
    const modalRef = this.modalService.open(QuickViewProductModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.productItem = this.productItem;
  }
}
