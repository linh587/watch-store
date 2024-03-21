import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPricePipe } from "./format-price.pipe";

const PIPES = [FormatPricePipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
