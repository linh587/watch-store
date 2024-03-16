import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: CheckoutComponent, pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CheckoutComponent],
})
export class CheckoutModule {}
