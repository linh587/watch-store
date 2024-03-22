import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationModalComponent } from "../../components/authentication-modal/authentication-modal.component";

@Injectable({
  providedIn: "root",
})
export class AuthGuard
  implements CanActivate, CanLoad, CanDeactivate<any>, CanActivateChild
{
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: NgbModal
  ) {}

  // Check can active route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogin = this.authService.isLogin();

    if (isLogin && Object.keys(isLogin).length) {
      return true;
    } else {
      this.router.navigate(["/"]).then();
      this.dialog.open(AuthenticationModalComponent, {
        centered: true,
        backdrop: "static",
        windowClass: "customize-modal",
      });

      return false;
    }
  }

  // Check children can active
  canActivateChild():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  // Check can deactive
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  // Check can load module lazyloading.
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLogin();
  }
}
