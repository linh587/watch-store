import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProdCategoryManagementComponent } from "./prod-category-management.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminSharedModule } from "../../components/admin-shared.module";
import { ProdCategoryModalComponent } from "./prod-category-modal/prod-category-modal.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProdCategoryManagementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AdminSharedModule],
  declarations: [ProdCategoryManagementComponent, ProdCategoryModalComponent],
})
export class ProdCategoryManagementModule {}
