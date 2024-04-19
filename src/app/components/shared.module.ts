import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SwiperModule } from "swiper/angular";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper";
import { SwiperProductComponent } from "./swiper-product/swiper-product.component";
import { SeasonCollectionBannerComponent } from "./season-collection-banner/season-collection-banner.component";
import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { QuickViewProductModalComponent } from "./quick-view-product-modal/quick-view-product-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderSwiperSlideComponent } from "./header-swiper-slide/header-swiper-slide.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { BlogComponent } from "./blog/blog.component";
import { OurPartnersComponent } from "./our-partners/our-partners.component";
import { AuthenticationModalComponent } from "./authentication-modal/authentication-modal.component";
import { CategoryBannerComponent } from "./category-banner/category-banner.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivesModule } from "../public/directives/directives.module";
import { PipesModule } from "../public/pipes/pipes.module";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { RatingModalComponent } from "./rating-modal/rating-modal.component";

SwiperCore.use([Pagination, Navigation, Virtual, Autoplay]);

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  HeaderSwiperSlideComponent,
  ProductItemComponent,
  SwiperProductComponent,
  SeasonCollectionBannerComponent,
  CategoryBannerComponent,
  BlogComponent,
  OurPartnersComponent,
  AuthenticationModalComponent,
  QuickViewProductModalComponent,
  ConfirmModalComponent,
  RatingModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    NgbNavModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
