import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
})
export class VerifyEmailComponent implements OnInit {
  public token!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getToken();
    this.verifyEmail();
  }

  private getToken() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
    });
  }

  private verifyEmail() {
    this.authService.verify(this.token).subscribe(() => {
      this.toastService.success("Xác thực email thành công");
      this.router.navigate(["/"]).then();
    });
  }
}
