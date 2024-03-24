import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPricePipe } from "./format-price.pipe";
import { OrderStatusPipe } from "./order-status.pipe";

const PIPES = [FormatPricePipe, OrderStatusPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES, OrderStatusPipe],
  exports: [...PIPES],
})
export class PipesModule {}
