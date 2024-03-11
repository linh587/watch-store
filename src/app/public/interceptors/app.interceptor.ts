import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";
// import { JWT_TOKEN } from "../constants/common.constant";
// import { API_URL } from "../constants/api-url.constant";
import { IS_CALL_API } from "../../services/http/base-http-request.service";
import { StorageService } from "../../services/storage/storage.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getAuthToken("JWT_TOKEN");

    console.log(token)

    // Check if this is a request API
    if (req.context.get(IS_CALL_API)) {
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `${token}` },
        });
      }

      // if (req.url === API_URL.CHANGE_PWD) {
      //   const _token = this.getAuthToken(JWT_RESET_PWD);
      //   req = req.clone({
      //     setHeaders: { Authorization: `${_token}` },
      //   });
      // }

      req = req.clone({
        url: `http://localhost:5000/${req.url}`,
      });
    }
    req = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "user-type-agent": "System",
      },
    });
    return next.handle(req);
  }

  private getAuthToken(token: string): string {
    return this.storageService.get(token);
  }
}
