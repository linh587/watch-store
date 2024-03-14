import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { StorageService } from "../../services/storage/storage.service";
import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    public authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getAuthToken("JWT_TOKEN");

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  private getAuthToken(token: string): string {
    return this.storageService.get(token);
  }
}
