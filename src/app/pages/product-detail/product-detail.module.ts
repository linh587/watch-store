import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductDetailComponent } from "./product-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../components/shared.module";

const routes: Routes = [
  {
    path: ":id",
    component: ProductDetailComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    NgbNavModule,
    SharedModule,
  ],
  declarations: [ProductDetailComponent],
})
export class ProductDetailModule {}
