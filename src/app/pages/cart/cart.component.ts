import { Component, OnInit } from "@angular/core";
import { CART_TABLE_HEADER, COLLECTIONS } from "../../public/constants/common";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  public HEADER = CART_TABLE_HEADER

  public COLLECTIONS = COLLECTIONS

  constructor() {}

  ngOnInit() {}
}
