import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountProfileComponent } from "./account-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: AccountProfileComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "orders" },
      { path: "orders", pathMatch: "full", component: PurchaseOrderComponent },
      { path: "user-info", pathMatch: "full", component: UserInfoComponent },
      {
        path: "change-password",
        pathMatch: "full",
        component: ChangePasswordComponent,
      },
    ],
  },
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
  declarations: [
    AccountProfileComponent,
    PurchaseOrderComponent,
    UserInfoComponent,
    ChangePasswordComponent,
  ],
})
export class AccountProfileModule {}
