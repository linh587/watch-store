import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SwiperModule } from "swiper/angular";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper";
import { HeaderSwiperSlideComponent } from "./header-swiper-slide/header-swiper-slide.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { SwiperProductComponent } from "./swiper-product/swiper-product.component";

SwiperCore.use([Pagination, Navigation, Virtual, Autoplay]);

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  HeaderSwiperSlideComponent,
  ProductItemComponent,
  SwiperProductComponent,
];

@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
