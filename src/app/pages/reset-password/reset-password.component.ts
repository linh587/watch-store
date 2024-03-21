import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { PASSWORD_REGEX } from "../../public/constants/regex";
import { matchingPasswords } from "../../public/validators/matching-password.validator";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../../components/authentication-modal/authentication-modal.component";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  public token!: string;
  public resetForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initForm();
    this.getToken();
  }

  private initForm() {
    this.resetForm = this.fb.group(
      {
        newPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(PASSWORD_REGEX),
          ]),
        ],
        confirmNewPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(PASSWORD_REGEX),
          ]),
        ],
      },
      { validator: matchingPasswords("newPassword", "confirmNewPassword") }
    );
  }

  private getToken() {
    this.route.params.subscribe((res: any) => {
      this.token = res.token;
    });
  }

  public onResetPassword() {
    if (this.resetForm.valid) {
      const payload = {
        newPassword: this.resetForm.controls["newPassword"].value,
      };

      this.authService
        .resetPassword(this.token, payload)
        .pipe(
          tap((_) => {
            this.toastService.success("Đặt lại mật khẩu thành công");
            this.resetForm.reset();
            this.router.navigate(["/"]).then();
            this.modalService.open(AuthenticationModalComponent, {
              centered: true,
              backdrop: "static",
            });
          }),
          catchError((error) => {
            this.toastService.error("Đặt lại mật khẩu thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }
}
