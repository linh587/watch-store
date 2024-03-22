import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { RouterModule, Routes } from "@angular/router";
import { PipesModule } from "../../public/pipes/pipes.module";
import { DirectivesModule } from "../../public/directives/directives.module";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CartComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    DirectivesModule,
  ],
  declarations: [CartComponent],
})
export class CartModule {}
