import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { ClientSharedModule } from "../../components/client-shared.module";
import { SwiperModule } from "swiper/angular";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClientSharedModule,
    SwiperModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
