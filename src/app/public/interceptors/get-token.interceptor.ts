import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "../../services/storage/storage.service";

@Injectable()
export class AppGetTokenInterceptor {
  constructor(
    private jwt: JwtHelperService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res) => {
        const isAuthRequest = this.getTokenKey(request.url);

        if (isAuthRequest && res instanceof HttpResponse) {
          // If is request login.
          const authorization = res.headers.get("authorization");
          const refreshTk = res.headers.get("refresh-token");

          if (authorization) {
            if (this.checkValidToken(authorization)) {
              this.storageService.set(
                isAuthRequest,
                authorization.replace("Bearer ", "").trim()
              );
              this.storageService.set("JWT_REFRESH_TOKEN", refreshTk);
              // this.handlerFireEventSuccess();
            } else {
              throw new Error();
            }
          }
        }
      })
    );
  }

  // Fire event when login success.
  // private handlerFireEventSuccess(): void {
  //   this.eventBus.emit({ name: EVENT_BUS_EVENTS.LOGIN_SUCCESS, value: "null" });
  // }

  getTokenKey(name: string) {
    if (name.includes("user/login")) {
      return "JWT_TOKEN";
    }
    return null;
  }

  checkValidToken(authorization: string) {
    if (!authorization) return false;
    // const { USER_TYPE, USER_STATUS } = this.jwt.decodeToken(authorization);
    // return (
    //   (APP_ACCOUNT_TYPE.ADMIN === USER_TYPE ||
    //     APP_ACCOUNT_TYPE.SUPER_ADMIN == USER_TYPE) &&
    //   APP_USER_STATUS.ACTIVE === USER_STATUS
    // );
    return true;
  }
}
