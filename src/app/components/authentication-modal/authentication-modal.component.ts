import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth/auth.service";
import {
  BehaviorSubject,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
  throwError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../../services/storage/storage.service";
import { PASSWORD_REGEX, PHONE_REGEX } from "../../public/constants/regex";
import { Router } from "@angular/router";
import { MapService } from "../../services/map/map.service";

@Component({
  selector: "app-authentication-modal",
  templateUrl: "./authentication-modal.component.html",
  styleUrls: ["./authentication-modal.component.scss"],
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {
  public active = 1;
  public activeNav!: number;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public subscription$ = new Subject();
  public searchSuggestion$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public subscriptions$ = new Subject();
  public showSuggestion: boolean = false;
  @ViewChild("suggestionSearch")
  public searchElementRef!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService,
    public router: Router,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.observerInputSearchChange();
  }

  get loginControl() {
    return this.loginForm.controls;
  }

  get registerControl() {
    return this.registerForm.controls;
  }

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
      phone: [null, Validators.pattern(PHONE_REGEX)],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(PASSWORD_REGEX),
        ]),
      ],
      gender: ["male", Validators.required],
      dateOfBirth: ["", Validators.required],
      address: [""],
      longitude: [""],
      latitude: [""],
    });
  }

  public onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const payload: any = this.loginForm.getRawValue();

      this.authService
        .login(payload)
        .pipe(
          tap((data: any) => {
            this.storageService.set("JWT_TOKEN", data.accessToken);
            this.storageService.set("JWT_REFRESH_TOKEN", data.refreshToken);
            this.getCurrentUserLogin();
            this.handleCallAPISuccess("Bạn đã đăng nhập thành công!");
          }),
          catchError((error) => {
            return throwError(() => {
              if (error === "Not Found") {
                this.toastService.error("Không tìm thấy người dùng");
              } else {
                this.toastService.error("Email đã được đăng ký");
              }
            });
          })
        )
        .subscribe((_) => {});
    }
  }

  public onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();

      formData.append("name", this.registerControl["name"]?.value);
      formData.append("email", this.registerControl["email"]?.value);
      formData.append("password", this.registerControl["password"]?.value);
      formData.append("phone", this.registerControl["phone"]?.value);
      formData.append("gender", this.registerControl["gender"]?.value);
      formData.append("address", this.registerControl["address"]?.value);
      formData.append("latitude", this.registerControl["latitude"]?.value);
      formData.append("longitude", this.registerControl["longitude"]?.value);
      formData.append(
        "dateOfBirth",
        this.registerControl["dateOfBirth"]?.value
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
            return throwError(() => {
              if (error === "Bad Request") {
                this.toastService.error("Không tìm thấy địa chỉ");
              }
            });
          })
        )
        .subscribe((_) => {});
    }
  }

  private handleCallAPISuccess(message: string) {
    this.toastService.success(message);
    this.onCloseModal();
  }

  private getCurrentUserLogin(): void {
    this.authService
      .currentUserInfo()
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

  public observerInputSearchChange() {
    this.registerForm.controls["address"].valueChanges
      .pipe(
        takeUntil(this.subscriptions$),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((address: string) => {
        this.mapService.searchAddressGoongIo(address).subscribe((res: any) => {
          this.searchSuggestion$.next(res);
        });
      });
  }

  public patchAddressToForm(search: any) {
    this.registerForm.controls["address"].setValue(search.formattedAddress);
    this.registerForm.controls["latitude"].setValue(search.latitude);
    this.registerForm.controls["longitude"].setValue(search.longitude);

    this.hideSearchSuggestion();
  }

  public showSearchSuggestion() {
    this.showSuggestion = true;
  }

  public hideSearchSuggestion() {
    this.showSuggestion = false;
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(null);
    this.subscriptions$.complete();
  }
}
