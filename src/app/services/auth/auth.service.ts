import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseHttpRequest } from "../http/base-http-request.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpRequest {
  private userLogin$ = new BehaviorSubject<any>(null);

  public login(payload: any) {
    return this.httpClient.post(
      "http://localhost:5000/api/user/login",
      payload
    );
  }

  public register(payload: any) {
    return this.httpClient.post(
      "http://localhost:5000/api/user/register",
      payload
    );
  }

  public getUserInfo() {
    if (this.userLogin$.value) {
      return this.userLogin$ as Observable<any>;
    } else {
      const user = this.storageService.get("authUser");
      this.setUserInfo(user);

      return this.userLogin$ as Observable<any>;
    }
  }

  public setUserInfo(data: any) {
    this.userLogin$.next(data);
  }

  public currentUserInfo(id: number) {
    return this.httpClient.get(`http://localhost:5000/api/user/${id}`);
  }

  public getAllUser() {
    return this.httpClient.get("http://localhost:5000/api/user/all-users");
  }

  public refreshToken() {
    return this.httpClient.get("http://localhost:5000/api/user/refresh-token");
  }
}
