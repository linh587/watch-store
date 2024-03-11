import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AdminHeaderComponent } from "./admin-header/admin-header.component";
import { SimplebarAngularModule } from "simplebar-angular";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { AdminFooterComponent } from "./admin-footer/admin-footer.component";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TableComponent } from "./table/table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const COMPONENTS = [
  SidebarComponent,
  AdminHeaderComponent,
  BreadcrumbsComponent,
  AdminFooterComponent,
  TableComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SimplebarAngularModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class AdminSharedModule {}
