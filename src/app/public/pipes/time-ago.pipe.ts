import { DatePipe } from "@angular/common";
import {
  Pipe,
  PipeTransform,
  NgZone,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
@Pipe({
  name: "timeAgo",
  pure: false,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer!: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private datePipe: DatePipe
  ) {}
  transform(value: Date) {
    this.removeTimer();
    let d = new Date(value);
    let now = new Date();
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    let timeToUpdate = Number.isNaN(seconds)
      ? 1000
      : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== "undefined") {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    let minutes = Math.round(Math.abs(seconds / 60));
    let hours = Math.round(Math.abs(minutes / 60));
    let days = Math.round(Math.abs(hours / 24));
    if (Number.isNaN(seconds)) {
      return "";
    } else if (seconds <= 45) {
      return "Vài giây trước";
    } else if (seconds <= 90) {
      return "1 phút trước";
    } else if (minutes <= 45) {
      return minutes + " phút trước";
    } else if (minutes <= 90) {
      return "1 giờ trước";
    } else if (hours <= 22) {
      return hours + " giờ trước";
    } else if (hours <= 36) {
      return "1 ngày trước";
    } else if (days < 7) {
      return days + " ngày trước";
    } else if (days === 7) {
      return "1 tuần trước";
    } else {
      return this.datePipe.transform(value, "dd-MM-YYYY");
    }
  }
  ngOnDestroy(): void {
    this.removeTimer();
  }
  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  private getSecondsUntilUpdate(seconds: number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) {
      // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) {
      // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) {
      // less then a day, update every 5 mins
      return 300;
    } else {
      // update every hour
      return 3600;
    }
  }
}
