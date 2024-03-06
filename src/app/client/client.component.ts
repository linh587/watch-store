import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrl: "./client.component.scss",
})
export class ClientComponent implements OnInit {
  public showBackToTop: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  public scrollToTop() {
    if (isPlatformBrowser(this.platformId)) window.scrollTo(0, 0);
  }

  @HostListener("window:scroll") onWindowScroll() {
    const scrollTop = Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    scrollTop > 300
      ? (this.showBackToTop = true)
      : (this.showBackToTop = false);
  }
}
