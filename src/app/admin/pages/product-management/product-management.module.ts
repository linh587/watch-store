import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductManagementComponent } from "./product-management.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminSharedModule } from "../../components/admin-shared.module";
import { ProductModalComponent } from "./product-modal/product-modal.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProductManagementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AdminSharedModule],
  declarations: [ProductManagementComponent, ProductModalComponent],
})
export class ProductManagementModule {}
