import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-account-profile",
  templateUrl: "./account-profile.component.html",
  styleUrls: ["./account-profile.component.scss"],
})
export class AccountProfileComponent implements OnInit {
  public active = 1;
  public userInfo$!: Observable<any>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userInfo$ = this.authService.getUserInfo();
  }
}
