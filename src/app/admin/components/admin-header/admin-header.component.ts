import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.scss"],
})
export class AdminHeaderComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  public logout() {}
}
