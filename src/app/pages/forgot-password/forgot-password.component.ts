import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });
  }

  public onSubmitForgotPassword(payload: any) {
    if (this.forgotPasswordForm.valid) {
      this.authService
        .forgotPassword(payload)
        .pipe(
          tap((_) => {
            this.toastService.success(
              "Kiểm tra email của bạn để đặt lại mật khẩu"
            );
            this.forgotPasswordForm.reset();
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
