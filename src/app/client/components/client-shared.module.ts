import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientHeaderComponent } from "./client-header/client-header.component";
import { ClientFooterComponent } from "./client-footer/client-footer.component";
import { SwiperModule } from "swiper/angular";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper";
import { HeaderSwiperSlideComponent } from "./header-swiper-slide/header-swiper-slide.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { SwiperProductComponent } from "./swiper-product/swiper-product.component";
import { SeasonCollectionBannerComponent } from "./season-collection-banner/season-collection-banner.component";
import { CategoryBannerComponent } from "./category-banner/category-banner.component";
import { BlogComponent } from "./blog/blog.component";
import { OurPartnersComponent } from "./our-partners/our-partners.component";
import { AuthenticationModalComponent } from "./authentication-modal/authentication-modal.component";
import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { QuickViewProductModalComponent } from "./quick-view-product-modal/quick-view-product-modal.component";

SwiperCore.use([Pagination, Navigation, Virtual, Autoplay]);

const COMPONENTS = [
  ClientHeaderComponent,
  ClientFooterComponent,
  HeaderSwiperSlideComponent,
  ProductItemComponent,
  SwiperProductComponent,
  SeasonCollectionBannerComponent,
  CategoryBannerComponent,
  BlogComponent,
  OurPartnersComponent,
  AuthenticationModalComponent,
  QuickViewProductModalComponent,
];

@NgModule({
  imports: [CommonModule, SwiperModule, NgbNavModule, NgbDropdownModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class ClientSharedModule {}
