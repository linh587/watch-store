import { Component, OnInit } from "@angular/core";
import { BC_CUSTOMER } from "../../../public/constants/bread-crumbs";
import { COLUMN_OF_CUSTOMERS } from "../../../public/constants/column-of-table";

@Component({
  selector: "app-customer-management",
  templateUrl: "./customer-management.component.html",
  styleUrls: ["./customer-management.component.scss"],
})
export class CustomerManagementComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_CUSTOMERS;
  public customers = [
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
    {
      id: 1,
      fullName: "Lê Mai Linh",
      phone: "0982842001",
      email: "lemailinh22@gmail.com",
      favorite: 3,
    },
    {
      id: 2,
      fullName: "Vũ Phương Anh",
      phone: "0858099828",
      email: "vpa22@gmail.com",
      favorite: 4,
    },
    {
      id: 3,
      fullName: "Le Quang An",
      phone: "092132121",
      email: "lqa@gmail.com",
      favorite: 2,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.breadCrumbsItem = BC_CUSTOMER;
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }
}
