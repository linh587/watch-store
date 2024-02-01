import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SwiperModule } from "swiper/angular";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper";
import { HeaderSwiperSlideComponent } from "./header-swiper-slide/header-swiper-slide.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { SwiperProductComponent } from "./swiper-product/swiper-product.component";
import { SeasonCollectionBannerComponent } from "./season-collection-banner/season-collection-banner.component";
import { CategoryBannerComponent } from "./category-banner/category-banner.component";
import { BlogComponent } from "./blog/blog.component";
import { OurPartnersComponent } from "./our-partners/our-partners.component";

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
];

@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
