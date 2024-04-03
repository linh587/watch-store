import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public notification$ = new BehaviorSubject<any[]>([]);

  constructor(private authService: AuthService) {
    this.checkAllowCallAPI();
  }

  private checkAllowCallAPI() {
    this.authService.getUserInfo().subscribe((user) => {
      user && this.getListNotification();
    });
  }

  public getNotifications$() {
    return this.notification$.asObservable();
  }

  public getListNotification() {
    this.authService.getNotifications().subscribe((res: any) => {
      this.notification$.next(res.data);
    });
  }
}
