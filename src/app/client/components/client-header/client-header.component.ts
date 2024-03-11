import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../../public/constants/common";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth/auth.service";
import { StorageService } from "../../../services/storage/storage.service";

@Component({
  selector: "app-client-header",
  templateUrl: "./client-header.component.html",
  styleUrls: ["./client-header.component.scss"],
})
export class ClientHeaderComponent {
  public userInfo$!: Observable<any>;

  constructor(
    public router: Router,
    public modalService: NgbModal,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userInfo$ = this.authService.getUserInfo();

    this.userInfo$.subscribe((res) => {
      this.authService
        .currentUserInfo(res._id)
        .subscribe((res) => console.log(res));
    });
  }

  public subMenu = SUB_MENU;
  public menuFixed: boolean = false;

  public openAuthenicationModal() {
    this.modalService.open(AuthenticationModalComponent, {
      centered: true,
      backdrop: "static",
      windowClass: "customize-modal",
    });
  }

  @HostListener("window:scroll") onWindowScroll() {
    window.scrollY > 165 ? (this.menuFixed = true) : (this.menuFixed = false);
  }

  public logout() {
    this.storageService.delete("authUser");
    window.location.reload();
  }
}
