import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerifyEmailComponent } from "./verify-email.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: ":token", pathMatch: "full", component: VerifyEmailComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [VerifyEmailComponent],
})
export class VerifyEmailModule {}
