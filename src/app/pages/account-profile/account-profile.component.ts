import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { StorageService } from "../../services/storage/storage.service";
import { ACCOUNT_TAB } from "../../public/constants/common";
import { UserAccount } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-profile",
  templateUrl: "./account-profile.component.html",
  styleUrls: ["./account-profile.component.scss"],
})
export class AccountProfileComponent implements OnInit {
  public active = 1;
  public userInfo!: UserAccount;
  public ACCOUNT_TAB = ACCOUNT_TAB;

  constructor(
    private authService: AuthService,
    public storageService: StorageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.authService.getUserInfo().subscribe((res) => {
      this.userInfo = res;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
