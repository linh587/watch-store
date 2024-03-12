import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../authentication-modal/authentication-modal.component";
import { SUB_MENU } from "../../public/constants/common";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  public userInfo$!: Observable<any>;

  constructor(
    public router: Router,
    public modalService: NgbModal,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userInfo$ = this.authService.getUserInfo();
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
    this.storageService.deleteAll();
    window.location.reload();
  }
}
