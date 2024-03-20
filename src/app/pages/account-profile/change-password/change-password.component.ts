import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { matchingPasswords } from "../../../public/validators/matching-password.validator";
import { AuthService } from "../../../services/auth/auth.service";
import { catchError, tap, throwError } from "rxjs";

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

  get passwordControls() {
    return this.passwordForm.controls;
  }

  private initForm() {
    this.passwordForm = this.fb.group(
      {
        oldPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)+[a-zA-Z0-9]*$/),
          ]),
        ],
        newPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)+[a-zA-Z0-9]*$/),
          ]),
        ],
        confirmNewPassword: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)+[a-zA-Z0-9]*$/),
          ]),
        ],
      },
      { validator: matchingPasswords("newPassword", "confirmNewPassword") }
    );
  }

  public onUpdatePassword() {
    if (this.passwordForm.valid) {
      const payload = {
        oldPassword: this.passwordControls["oldPassword"].value,
        newPassword: this.passwordControls["confirmNewPassword"].value,
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
