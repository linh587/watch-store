import { Component, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
})
export class ConfirmModalComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() hasClose!: boolean;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  public confirmModal(confirm?: boolean): void {
    this.activeModal.close(confirm);
  }

  public staticModal(StaticDataModal: any) {
    this.modalService.open(StaticDataModal, { centered: true });
  }

  public closeModal() {
    this.activeModal.close(false);
  }
}
