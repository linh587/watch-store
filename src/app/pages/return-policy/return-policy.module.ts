import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReturnPolicyComponent } from "./return-policy.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ReturnPolicyComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ReturnPolicyComponent],
})
export class ReturnPolicyModule {}
