import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountProfileComponent } from "./account-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: AccountProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AccountProfileComponent, PurchaseOrderComponent],
})
export class AccountProfileModule {}
