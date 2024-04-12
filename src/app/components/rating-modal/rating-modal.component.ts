import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { RatingService } from "../../services/rating/rating.service";
import { catchError, tap, throwError } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-rating-modal",
  templateUrl: "./rating-modal.component.html",
  styleUrls: ["./rating-modal.component.scss"],
})
export class RatingModalComponent implements OnInit {
  public ratingForm!: FormGroup;
  public productId!: string;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private ratingService: RatingService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.ratingForm = this.fb.group({
      productId: [this.productId, Validators.required],
      star: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  public onPostRating(event: Event) {
    event.preventDefault();
    if (this.ratingForm.valid) {
      this.ratingService
        .postRating(this.ratingForm.getRawValue())
        .pipe(
          tap(() => {
            this.toastService.success("Thêm đánh giá thành công");
            this.modalService.dismissAll();
          }),
          catchError((error) => {
            this.toastService.error("Thêm đánh giá thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

  public cancelChange() {
    this.modalService.dismissAll();
  }
}
