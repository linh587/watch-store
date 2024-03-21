import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { SwiperModule } from "swiper/angular";
import { DirectivesModule } from "../../public/directives/directives.module";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SwiperModule,
    DirectivesModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
