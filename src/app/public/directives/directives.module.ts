import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvoidQuantityDirective } from "./avoid-quantity.directive";

const DIRECTIVES = [AvoidQuantityDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES, AvoidQuantityDirective],
  exports: [...DIRECTIVES],
})
export class DirectivesModule {}
