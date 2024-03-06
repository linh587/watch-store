import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollectionsComponent } from "./collections.component";
import { RouterModule, Routes } from "@angular/router";
import { ClientSharedModule } from "../../components/client-shared.module";

const routes: Routes = [
  { path: "", component: CollectionsComponent, pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ClientSharedModule],
  declarations: [CollectionsComponent],
})
export class CollectionsModule {}
