import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageService } from "../../services/storage/storage.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-account-profile",
  templateUrl: "./account-profile.component.html",
  styleUrls: ["./account-profile.component.scss"],
})
export class AccountProfileComponent implements OnInit {
  public active = 1;
  public profileForm!: FormGroup;
  public userLogin$ = new BehaviorSubject<any>(null);
  public userInfo: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public storageService: StorageService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.initForm();
  }

  private getUserInfo() {
    this.authService.getUserInfo().subscribe((res) => {
      this.userInfo = res;
    });
  }

  private initForm() {
    this.profileForm = this.fb.group({
      fullName: [
        this.userInfo?.getaUser?.fullName || this.userInfo?.fullName,
        Validators.required,
      ],
      email: [
        this.userInfo?.getaUser?.email || this.userInfo?.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      mobile: [
        (this.userInfo?.getaUser?.mobile, this.userInfo?.mobile),
        Validators.required,
      ],
      address: [this.userInfo?.getaUser?.address || this.userInfo?.address],
    });
  }

  public onUpdateProfile() {
    if (this.profileForm.valid) {
      this.authService
        .updateUser(this.profileForm.getRawValue())
        .pipe(
          tap((data: any) => {
            this.toastService.success("Chỉnh sửa thông tin thành công!");
            this.authService.setUserInfo({ ...data });
            this.storageService.set("AUTH_USER", data);
            this.storageService.set("USER_LOGIN", data);
          }),
          catchError((error) => {
            this.toastService.error("Chỉnh sửa thông tin thất bại!");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }
}
