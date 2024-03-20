import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth/auth.service";
import { Subject, catchError, takeUntil, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../../services/storage/storage.service";
import { PASSWORD_REGEX } from "../../public/constants/regex";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication-modal",
  templateUrl: "./authentication-modal.component.html",
  styleUrls: ["./authentication-modal.component.scss"],
})
export class AuthenticationModalComponent implements OnInit {
  public active = 1;
  public activeNav!: number;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public subscription$ = new Subject();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService,
    public router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm() {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
      ],
    });

    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
      ],
      gender: ["", Validators.required],
      dateOfBirth: [""],
      avatar: [""],
      address: [""],
    });
  }

  public onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const payload: any = this.loginForm.getRawValue();

      this.authService
        .login(payload)
        .pipe(
          takeUntil(this.subscription$),
          catchError((error) => {
            this.toastService.error("Đăng nhập thất bại!");
            return throwError(() => error);
          })
        )
        .subscribe((data: any) => {
          this.storageService.set("AUTH_USER", data);
          this.storageService.set("JWT_TOKEN", data.accessToken);
          this.getCurrentUserLogin(data.id);
          this.handleCallAPISuccess("Bạn đã đăng nhập thành công!");
        });
    }
  }

  public onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();

      formData.append("name", this.registerForm.get("name")?.value);
      formData.append("email", this.registerForm.get("email")?.value);
      formData.append("password", this.registerForm.get("password")?.value);
      formData.append("phone", this.registerForm.get("phone")?.value);
      formData.append("gender", this.registerForm.get("gender")?.value);
      formData.append("avatar", this.registerForm.get("avatar")?.value);
      formData.append("address", this.registerForm.get("address")?.value);
      formData.append(
        "dateOfBirth",
        this.registerForm.get("dateOfBirth")?.value
      );

      this.authService
        .register(formData)
        .pipe(
          tap(() => {
            this.handleCallAPISuccess("Bạn đã đăng ký thành công");
          }),
          takeUntil(this.subscription$),
          catchError((error) => {
            this.toastService.error("Đăng ký thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((_) => {});
    }
  }

  private handleCallAPISuccess(message: string) {
    this.toastService.success(message);
    this.onCloseModal();
  }

  private getCurrentUserLogin(id: string): void {
    this.authService
      .currentUserInfo(id)
      .pipe(
        tap((data: any) => {
          this.storageService.set("USER_LOGIN", { ...data });
          this.authService.setUserInfo({ ...data });
        })
      )
      .subscribe();
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public onNavChange(event: NgbNavChangeEvent) {
    this.activeNav = event.nextId;
  }

  public redirectToResetPassword() {
    this.router.navigate(["/forgot-password"]).then();
    this.onCloseModal();
  }
}
