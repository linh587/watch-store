import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BC_PRODUCT } from "../../../public/constants/bread-crumbs";
import { ProdCategoryModalComponent } from "./prod-category-modal/prod-category-modal.component";
import { ConfirmModalComponent } from "../../components/confirm-modal/confirm-modal.component";
import { COLUMN_OF_CATEGORIES } from "../../../public/constants/column-of-table";
import { ProductsService } from "../../../services/products/products.service";

@Component({
  selector: "app-prod-category-management",
  templateUrl: "./prod-category-management.component.html",
  styleUrls: ["./prod-category-management.component.scss"],
})
export class ProdCategoryManagementComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public categories: any[] = [];
  public COLUMNS = COLUMN_OF_CATEGORIES;

  constructor(
    public modalService: NgbModal,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_PRODUCT;
    this.getListCategory();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenAddModal() {
    this.modalService.open(ProdCategoryModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
    });
  }

  public onOpenConfirmModal() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: "static",
    });

    modalRef.componentInstance.title = "Xoá sản phẩm";
    modalRef.componentInstance.content =
      "Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi hệ thống?";
  }

  public getListCategory() {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }
}
