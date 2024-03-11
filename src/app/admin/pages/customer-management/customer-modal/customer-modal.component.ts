import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../../../services/auth/auth.service";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-customer-modal",
  templateUrl: "./customer-modal.component.html",
  styleUrls: ["./customer-modal.component.scss"],
})
export class CustomerModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public titleHeading: string = "";
  public customerForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.customerForm = this.fb.group({
      fullName: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      mobile: ["", Validators.required],
      password: ["", Validators.required],
      role: ["user"],
    });
  }

  public handleCloseModal() {
    this.modalService.dismissAll();
  }

  public onSubmitCustomerForm() {
    if (this.customerForm.valid) {
      const payload: any = this.customerForm.getRawValue();

      this.authService
        .register(payload)
        .pipe(
          tap((data: any) => {
            this.listChanged.emit()
            this.handleRegisterSuccess();
          }),
          catchError((error) => {
            this.toastService.error("Thêm tài khoản thất bại!");
            return throwError(error);
          })
        )
        .subscribe((_) => {});
    }
  }

  private handleRegisterSuccess() {
    this.toastService.success("Thêm tài khoản thành công");
    this.onCloseModal();
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
