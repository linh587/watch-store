import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetNameByIdDirective } from "./get-name-by-id.directive";
import { AvoidQuantityDirective } from './avoid-quantity.directive';

const DIRECTIVES = [GetNameByIdDirective, AvoidQuantityDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [	...DIRECTIVES,
      AvoidQuantityDirective
   ],
  exports: [...DIRECTIVES],
})
export class DirectivesModule {}
