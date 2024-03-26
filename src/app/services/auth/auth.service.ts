import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";
import { UserAccount } from "../../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpRequest {
  private userLogin$ = new BehaviorSubject<any>(null);

  public login(payload: UserAccount) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.LOGIN}`, payload);
  }

  public logout() {
    this.storageService.deleteAll();
    window.location.reload();
  }

  public register(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.REGISTER}`, payload);
  }

  public getUserInfo() {
    if (this.userLogin$.value) {
      return this.userLogin$ as Observable<UserAccount>;
    } else {
      const user = this.storageService.get("USER_LOGIN");
      this.setUserInfo(user);

      return this.userLogin$ as Observable<UserAccount>;
    }
  }

  public setUserInfo(data: UserAccount) {
    this.userLogin$.next(data);
  }

  public currentUserInfo() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_DETAIL_USER}`);
  }

  public refreshToken() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.REFRESH_TOKEN}`);
  }

  public updateUser(payload: any) {
    return this.httpClient.put(`${ENVIRONMENT}${API_URL.EDIT_USER}`, payload);
  }

  public isLogin(): boolean {
    return this.storageService.get("USER_LOGIN");
  }

  public changePassword(payload: any) {
    return this.httpClient.patch(
      `${ENVIRONMENT}${API_URL.CHANGE_PASSWORD}`,
      payload
    );
  }

  public forgotPassword(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.FORGOT_PASSWORD}`,
      payload
    );
  }

  public resetPassword(token: string, payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.RESET_PASSWORD}/${token}`,
      payload
    );
  }

  public verify(token: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.VERIFY}/${token}`);
  }
}
