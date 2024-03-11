import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerManagementComponent } from "./customer-management.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminSharedModule } from "../../components/admin-shared.module";
import { CustomerModalComponent } from "./customer-modal/customer-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CustomerManagementComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CustomerManagementComponent, CustomerModalComponent],
})
export class CustomerManagementModule {}
