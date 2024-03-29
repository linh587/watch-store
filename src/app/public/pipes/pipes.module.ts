import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPricePipe } from "./format-price.pipe";
import { OrderStatusPipe } from "./order-status.pipe";
import { PaymentStatusPipe } from "./payment-status.pipe";

const PIPES = [FormatPricePipe, OrderStatusPipe, PaymentStatusPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
