import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResetPasswordComponent } from "./reset-password.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: ":token",
    pathMatch: "full",
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
