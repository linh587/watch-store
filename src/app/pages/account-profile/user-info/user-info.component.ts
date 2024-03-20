import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../../../services/storage/storage.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
})
export class UserInfoComponent implements OnInit {
  public profileForm!: FormGroup;
  public userInfo: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService
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
      name: [this.userInfo?.name, Validators.required],
      email: [
        this.userInfo?.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: [this.userInfo?.phone, Validators.required],
      address: [this.userInfo?.address],
      gender: [this.userInfo?.gender, Validators.required],
      avatar: [this.userInfo?.avatar],
      dateOfBirth: [this.userInfo?.dateOfBirth],
    });
  }

  public onUpdateProfile() {
    if (this.profileForm.valid) {
      const formData = new FormData();

      formData.append("name", this.profileForm.get("name")?.value);
      formData.append("email", this.profileForm.get("email")?.value);
      formData.append("phone", this.profileForm.get("phone")?.value);
      formData.append("gender", this.profileForm.get("gender")?.value);
      formData.append("avatar", this.profileForm.get("avatar")?.value);
      formData.append("address", this.profileForm.get("address")?.value);
      formData.append(
        "dateOfBirth",
        this.profileForm.get("dateOfBirth")?.value
      );

      this.authService
        .updateUser(formData)
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
