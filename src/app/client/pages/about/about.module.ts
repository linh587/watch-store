import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: AboutComponent, pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AboutComponent],
})
export class AboutModule {}
