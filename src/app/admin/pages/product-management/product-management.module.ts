import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductManagementComponent } from "./product-management.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProductManagementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ProductManagementComponent],
})
export class ProductManagementModule {}
