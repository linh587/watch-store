import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_PRODUCTS } from "../../../public/constants/column-of-table";
import { BC_PRODUCT } from "../../../public/constants/bread-crumbs";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"],
})
export class ProductManagementComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_PRODUCTS;
  public customers = [
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

  constructor() {}

  ngOnInit() {
    this.breadCrumbsItem = BC_PRODUCT;
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }
}
