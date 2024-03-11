import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_PRODUCTS } from "../../../public/constants/column-of-table";
import { BC_PRODUCT } from "../../../public/constants/bread-crumbs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductModalComponent } from "./product-modal/product-modal.component";
import { ConfirmModalComponent } from "../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"],
})
export class ProductManagementComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_PRODUCTS;
  public products = [
    {
      id: 1,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 2,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 3,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 4,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 1,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 2,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 3,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 4,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 1,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 2,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 3,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 4,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 1,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 2,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 3,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
    {
      id: 4,
      photo:
        "https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg",
      name: "Đồng hồ",
      price: 1200000,
      quantity: 3,
      category: "Man Watch",
      description: "This is description",
    },
  ];

  constructor(public modalService: NgbModal) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_PRODUCT;
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenAddModal() {
    this.modalService.open(ProductModalComponent, {
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
}
