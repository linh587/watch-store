import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { matchingPasswords } from "../../../public/validators/matching-password.validator";
import { AuthService } from "../../../services/auth/auth.service";
import { catchError, tap, throwError } from "rxjs";
import { PASSWORD_REGEX } from "../../../public/constants/regex";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get controls() {
    return this.passwordForm.controls;
  }

  private initForm() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(PASSWORD_REGEX),
          ]),
        ],
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

  public onUpdatePassword() {
    if (this.passwordForm.valid) {
      const payload = {
        oldPassword: this.controls["oldPassword"].value,
        newPassword: this.controls["confirmNewPassword"].value,
      };
      this.authService
        .changePassword(payload)
        .pipe(
          tap(() => {
            this.toastService.success("Đổi mật khẩu thành công");
            this.passwordForm.reset();
          }),
          catchError((error) => {
            this.toastService.error("Đổi mật khẩu thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }
}
