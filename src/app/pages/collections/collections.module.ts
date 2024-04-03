import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollectionsComponent } from "./collections.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

const routes: Routes = [
  { path: "", component: CollectionsComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [CollectionsComponent],
})
export class CollectionsModule {}
