import { Component, OnInit } from "@angular/core";
import { COLLECTIONS } from "../../public/constants/common";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  public CART_HEADER_TABLE = [
    "Images",
    "Product",
    "Unit Price",
    "Quantity",
    "Total",
    "Remove",
  ];

  public COLLECTIONS = COLLECTIONS

  constructor() {}

  ngOnInit() {}
}
