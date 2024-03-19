import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about.component";
import { RouterModule, Routes } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { SharedModule } from "../../components/shared.module";

const routes: Routes = [
  { path: "", component: AboutComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    SharedModule,
  ],
  declarations: [AboutComponent],
})
export class AboutModule {}
