import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ForgotPasswordComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
