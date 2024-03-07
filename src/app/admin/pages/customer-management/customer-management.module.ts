import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerManagementComponent } from "./customer-management.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminSharedModule } from "../../components/admin-shared.module";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CustomerManagementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AdminSharedModule],
  declarations: [CustomerManagementComponent],
})
export class CustomerManagementModule {}
