import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
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
import { StorageService } from "../../../services/storage/storage.service";
import { DatePipe } from "@angular/common";
import { PHONE_REGEX } from "../../../public/constants/regex";
import { UserAccount } from "../../../models/user.model";
import { MapService } from "../../../services/map/map.service";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
  providers: [DatePipe],
})
export class UserInfoComponent implements OnInit {
  public profileForm!: FormGroup;
  public userInfo!: UserAccount;
  public subscription$ = new Subject();

  public searchSuggestion$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public subscriptions$ = new Subject();
  public showSuggestion: boolean = false;
  @ViewChild("suggestionSearch")
  public searchElementRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService,
    private datePipe: DatePipe,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.initForm();
    this.observerInputSearchChange();
  }

  get controls() {
    return this.profileForm.controls;
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
      phone: [
        this.userInfo?.phone,
        Validators.compose([
          Validators.required,
          Validators.pattern(PHONE_REGEX),
        ]),
      ],
      address: [this.userInfo?.address],
      longitude: [this.userInfo?.longitude],
      latitude: [this.userInfo?.latitude],
      gender: [this.userInfo?.gender, Validators.required],
      dateOfBirth: [
        this.datePipe.transform(this.userInfo?.dateOfBirth, "YYYY-MM-dd"),
        Validators.required,
      ],
    });
  }

  public onUpdateProfile() {
    if (this.profileForm.valid) {
      const formData = new FormData();

      formData.append("name", this.profileForm.get("name")?.value);
      formData.append("email", this.profileForm.get("email")?.value);
      formData.append("phone", this.profileForm.get("phone")?.value);
      formData.append("gender", this.profileForm.get("gender")?.value);
      formData.append("address", this.profileForm.get("address")?.value);
      formData.append("latitude", this.profileForm.get("latitude")?.value);
      formData.append("longitude", this.profileForm.get("longitude")?.value);
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

  public observerInputSearchChange() {
    this.controls["address"].valueChanges
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
    this.controls["address"].setValue(search.formattedAddress);
    this.controls["latitude"].setValue(search.latitude);
    this.controls["longitude"].setValue(search.longitude);

    console.log(search);
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
