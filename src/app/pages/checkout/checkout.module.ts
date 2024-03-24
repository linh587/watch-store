import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../../public/pipes/pipes.module";

const routes: Routes = [
  { path: "", component: CheckoutComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [CheckoutComponent],
})
export class CheckoutModule {}
