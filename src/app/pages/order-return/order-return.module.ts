import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderReturnComponent } from "./order-return.component";
import { RouterModule, Routes } from "@angular/router";
import { PipesModule } from "../../public/pipes/pipes.module";

const routes: Routes = [
  { path: "", component: OrderReturnComponent, pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PipesModule],
  declarations: [OrderReturnComponent],
})
export class OrderReturnModule {}
