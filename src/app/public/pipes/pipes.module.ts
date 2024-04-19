import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPricePipe } from "./format-price.pipe";
import { OrderStatusPipe } from "./order-status.pipe";
import { PaymentStatusPipe } from "./payment-status.pipe";
import { TimeAgoPipe } from "./time-ago.pipe";
import { OrderStatusColorPipe } from "./order-status-color.pipe";
import { GetTypePriceCouponPipe } from "./get-type-price-coupon.pipe";
import { PaymentStatusColorPipe } from "./payment-status-color.pipe";
import { FaceShapePipe } from "./face-shape.pipe";
import { GlassSurfacePipe } from "./glass-surface.pipe";

const PIPES = [
  FormatPricePipe,
  OrderStatusPipe,
  PaymentStatusPipe,
  TimeAgoPipe,
  OrderStatusColorPipe,
  GetTypePriceCouponPipe,
  PaymentStatusColorPipe,
  TimeAgoPipe,
  FaceShapePipe,
  GlassSurfacePipe,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
