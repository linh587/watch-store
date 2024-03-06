import { Component, OnInit } from "@angular/core";
import { COLLECTIONS } from "../../../public/constants/common";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  public collections = COLLECTIONS;
  constructor() {}

  ngOnInit() {}
}
