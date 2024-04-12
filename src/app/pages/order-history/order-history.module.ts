import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderHistoryComponent } from "./order-history.component";
import { RouterModule, Routes } from "@angular/router";
import { PipesModule } from "../../public/pipes/pipes.module";
import { SharedModule } from "../../components/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: ":orderId", component: OrderHistoryComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [OrderHistoryComponent],
})
export class OrderHistoryModule {}
