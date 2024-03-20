import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpRequest {
  private userLogin$ = new BehaviorSubject<any>(null);

  public login(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.LOGIN}`, payload);
  }

  public register(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.REGISTER}`, payload);
  }

  public getUserInfo() {
    if (this.userLogin$.value) {
      return this.userLogin$ as Observable<any>;
    } else {
      const user = this.storageService.get("USER_LOGIN");
      this.setUserInfo(user);

      return this.userLogin$ as Observable<any>;
    }
  }

  public setUserInfo(data: any) {
    this.userLogin$.next(data);
  }

  public currentUserInfo(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_USER}/${id}`
    );
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
    return this.post(`${ENVIRONMENT}${API_URL.FORGOT_PASSWORD}`, payload);
  }

  public resetPassword(token: string, payload: any) {
    return this.post(`${ENVIRONMENT}${API_URL.RESET_PASSWORD}/${token}`, payload);
  }
}
