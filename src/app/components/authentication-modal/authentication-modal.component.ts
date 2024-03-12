import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth/auth.service";
import { Subject, catchError, takeUntil, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage/storage.service";

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
    private router: Router,
    private storageService: StorageService
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
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });

    this.registerForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      mobile: [null, Validators.required],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
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
          this.storageService.set("authUser", data);
          this.storageService.set("JWT_TOKEN", data.token);
          window.location.reload();
          this.handleCallAPISuccess("Bạn đã đăng nhập thành công!");
        });
    }
  }

  public onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      const payload: any = this.registerForm.getRawValue();

      this.authService
        .register(payload)
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

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public onNavChange(event: NgbNavChangeEvent) {
    this.activeNav = event.nextId;
  }
}
