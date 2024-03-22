import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QuickViewProductModalComponent } from "../quick-view-product-modal/quick-view-product-modal.component";
import { Router } from "@angular/router";
import { createCloudinaryThumbLink } from "../../public/helpers/images";
import { ProductsService } from "../../services/products/products.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;
  public productPrices: any[] = [];
  public createCloudinaryThumbLink = createCloudinaryThumbLink;
  public priceOfThisProduct: any[] = [];
  public productSizes = new BehaviorSubject([]);

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getListProductPrice();
  }

  public onOpenQuickViewProductModal(event: Event) {
    event.preventDefault();
    const modalRef = this.modalService.open(QuickViewProductModalComponent, {
      centered: true,
      size: "lg",
    });

    modalRef.componentInstance.productItem = this.productItem;
    modalRef.componentInstance.productPrices = this.productPrices;
  }

  public redirectDetail(id: string) {
    this.router.navigate([`/product/${id}`]).then();
  }

  private getListProductPrice() {
    this.productsService.getProductPrices().subscribe((res: any) => {
      this.productPrices = res.filter(
        (p: any) => p.productId === this.productItem.id
      );
    });
  }
}
