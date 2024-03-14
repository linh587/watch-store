import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { StorageService } from "../../services/storage/storage.service";

@Injectable()
export class AppGetTokenInterceptor {
  constructor(private storageService: StorageService) {}

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
            } else {
              throw new Error();
            }
          }
        }
      })
    );
  }

  getTokenKey(name: string) {
    if (name.includes("user/login")) {
      return "JWT_TOKEN";
    }
    return null;
  }

  checkValidToken(authorization: string) {
    if (!authorization) return false;
    return true;
  }
}
