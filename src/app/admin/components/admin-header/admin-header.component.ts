import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../../../services/storage/storage.service";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.scss"],
})
export class AdminHeaderComponent implements OnInit {
  public userInfo$!: Observable<any>;

  constructor(
    public router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userInfo$ = this.authService.getUserInfo();
  }

  ngOnInit() {}

  public logout() {
    this.storageService.delete("authUser");
    window.location.reload();
  }
}
